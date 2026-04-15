---
name: security-best-practices
description: Comprehensive security hardening for web applications covering HTTPS, input validation, authentication, and OWASP Top 10 vulnerabilities. Use when building new projects, running security audits, hardening public APIs, or meeting compliance requirements (GDPR, PCI-DSS).
metadata:
  version: 1.0.0
  source: supercent-io/skills-template
---

# Security Best Practices

You are a security-focused developer. Apply these practices to all code you write or review.

## When to Use

- **New projects**: Establish security from the start
- **Security audits**: Identify and remediate vulnerabilities
- **Public APIs**: Harden external-facing endpoints
- **Compliance requirements**: GDPR, PCI-DSS adherence

---

## Step 1: HTTPS & Security Headers

### Enforce HTTPS

All production traffic MUST use HTTPS. Redirect HTTP to HTTPS.

```typescript
// Next.js middleware example
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Enforce HTTPS in production
  if (
    process.env.NODE_ENV === 'production' &&
    request.headers.get('x-forwarded-proto') !== 'https'
  ) {
    return NextResponse.redirect(
      `https://${request.headers.get('host')}${request.nextUrl.pathname}`,
      301
    );
  }
  return NextResponse.next();
}
```

### Security Headers

```typescript
// next.config.js security headers
const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on'
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=31536000; includeSubDomains; preload'
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'Referrer-Policy',
    value: 'origin-when-cross-origin'
  },
  {
    key: 'Content-Security-Policy',
    value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' https://fonts.gstatic.com;"
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()'
  }
];
```

### Rate Limiting

```typescript
// API route rate limiting
const rateLimit = new Map<string, { count: number; lastReset: number }>();

function checkRateLimit(ip: string, limit = 100, windowMs = 15 * 60 * 1000): boolean {
  const now = Date.now();
  const record = rateLimit.get(ip);

  if (!record || now - record.lastReset > windowMs) {
    rateLimit.set(ip, { count: 1, lastReset: now });
    return true;
  }

  if (record.count >= limit) return false;
  record.count++;
  return true;
}

// Auth endpoints: stricter limit (5 per 15 min)
// General API: 100 per 15 min
```

---

## Step 2: Input Validation & Sanitization

### Validate All Input

```typescript
// Zod schema validation (preferred for TypeScript)
import { z } from 'zod';

const userSchema = z.object({
  email: z.string().email(),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Must contain uppercase')
    .regex(/[a-z]/, 'Must contain lowercase')
    .regex(/[0-9]/, 'Must contain number')
    .regex(/[^A-Za-z0-9]/, 'Must contain special character'),
  name: z.string().min(1).max(100).trim(),
});

// Usage in API route
export async function POST(request: Request) {
  const body = await request.json();
  const result = userSchema.safeParse(body);
  if (!result.success) {
    return Response.json({ errors: result.error.flatten() }, { status: 400 });
  }
  // Proceed with validated data: result.data
}
```

### Prevent SQL Injection

ALWAYS use parameterized queries. Never concatenate user input into queries.

```typescript
// ✅ GOOD — Prisma (parameterized by default)
const user = await prisma.user.findUnique({ where: { email } });

// ✅ GOOD — Raw query with parameters
const users = await prisma.$queryRaw`SELECT * FROM users WHERE email = ${email}`;

// ❌ BAD — String concatenation
const users = await prisma.$queryRawUnsafe(`SELECT * FROM users WHERE email = '${email}'`);
```

### Prevent XSS

```typescript
// ✅ React/Next.js escapes by default in JSX
<p>{userInput}</p>  // Safe — auto-escaped

// ❌ NEVER use dangerouslySetInnerHTML with user input
<div dangerouslySetInnerHTML={{ __html: userInput }} />  // XSS vulnerability!

// If you must render HTML, sanitize first:
import DOMPurify from 'isomorphic-dompurify';
const clean = DOMPurify.sanitize(userInput);
```

---

## Step 3: CSRF Protection

```typescript
// Next.js API routes — verify origin
export async function POST(request: Request) {
  const origin = request.headers.get('origin');
  const allowedOrigins = [process.env.NEXT_PUBLIC_URL];

  if (!origin || !allowedOrigins.includes(origin)) {
    return Response.json({ error: 'Forbidden' }, { status: 403 });
  }
  // Process request
}
```

---

## Step 4: Secret Management

### Rules

- NEVER commit secrets to git
- Use environment variables for all credentials
- Add `.env` to `.gitignore`
- Use different secrets per environment

```env
# .env.local (NEVER committed)
DATABASE_URL="postgresql://user:pass@host:5432/db"
NEXTAUTH_SECRET="random-32-character-string"
JWT_SECRET="another-random-string"
```

```gitignore
# .gitignore
.env
.env.local
.env.production
*.pem
```

---

## Step 5: Authentication Best Practices

### JWT with Refresh Tokens

```typescript
// Short-lived access tokens (15 min)
const accessToken = jwt.sign(
  { userId: user.id, role: user.role },
  process.env.JWT_SECRET!,
  { expiresIn: '15m' }
);

// Long-lived refresh tokens (7 days) stored in DB
const refreshToken = crypto.randomBytes(40).toString('hex');
await prisma.refreshToken.create({
  data: {
    token: refreshToken,
    userId: user.id,
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  },
});

// Refresh token rotation — invalidate old token on use
async function refreshAccessToken(oldRefreshToken: string) {
  const stored = await prisma.refreshToken.findUnique({
    where: { token: oldRefreshToken },
  });
  if (!stored || stored.expiresAt < new Date()) {
    throw new Error('Invalid refresh token');
  }
  // Delete old token
  await prisma.refreshToken.delete({ where: { id: stored.id } });
  // Issue new pair
  return generateTokenPair(stored.userId);
}
```

### Password Hashing

```typescript
import bcrypt from 'bcryptjs';

// Hash on registration (cost factor 12)
const hashedPassword = await bcrypt.hash(password, 12);

// Verify on login
const isValid = await bcrypt.compare(inputPassword, hashedPassword);
```

---

## Required Rules (MUST)

- ✅ HTTPS mandatory in production
- ✅ All secrets via environment variables
- ✅ Validate ALL user input (server-side)
- ✅ Parameterized queries only (no string concat)
- ✅ Rate limiting on all API endpoints
- ✅ Security headers on all responses
- ✅ CSRF protection on state-changing endpoints
- ✅ Hash passwords with bcrypt (cost ≥ 12)
- ✅ Short-lived JWTs with refresh token rotation

## Prohibited (MUST NOT)

- ❌ `eval()` — never use
- ❌ `innerHTML` with unsanitized user input
- ❌ Committing secrets to git
- ❌ Storing passwords in plain text
- ❌ Using `queryRawUnsafe` with user input
- ❌ Disabling HTTPS in production
- ❌ Hardcoding API keys in source code

---

## OWASP Top 10 Checklist

| # | Vulnerability | Mitigation |
|---|---------------|------------|
| A01 | Broken Access Control | Role-based access, principle of least privilege |
| A02 | Cryptographic Failures | HTTPS, strong hashing, secure key storage |
| A03 | Injection | Parameterized queries, input validation |
| A04 | Insecure Design | Threat modeling, security requirements |
| A05 | Security Misconfiguration | Security headers, disable debug in prod |
| A06 | Vulnerable Components | Regular `npm audit`, dependency updates |
| A07 | Authentication Failures | MFA, account lockout, strong passwords |
| A08 | Data Integrity Failures | Signed JWTs, CI/CD pipeline security |
| A09 | Logging Failures | Audit logs, monitoring, alerting |
| A10 | SSRF | Allowlist URLs, validate redirects |

---

## Best Practices

- **Principle of Least Privilege**: Grant minimum permissions needed
- **Defense in Depth**: Multiple security layers
- **Regular Audits**: Run `npm audit` weekly, review dependencies
- **Error Handling**: Never expose stack traces or internal errors to users
- **Logging**: Log security events but NEVER log passwords, tokens, or PII
