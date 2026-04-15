# Search Traffic Drop Debugging Skill

## Description
Diagnose and fix Google Search traffic drops using Google's official debugging methodology. Identifies the root cause (algorithmic, technical, security, spam, seasonal, or migration) and provides targeted remediation steps.

## Usage
Run when traffic drops: `/traffic-drop-debug https://example.com`

## Diagnostic Flowchart

```
Traffic Drop Detected
       |
       v
  [1] Compare Impressions vs Clicks
       |                    |
       v                    v
  Both dropped         Same impressions,
  (ranking/indexing     fewer clicks
   issue)              (title/snippet issue)
       |                    |
       v                    v
  [2] Set 16-month       Check title quality,
  date range             meta descriptions,
  (rule out              rich results vs
  seasonality)           competitors
       |
       v
  [3] Apply comparison filters
  (vs previous period + year-over-year)
       |
       v
  [4] Filter by search type
  (Web / Images / Video / News)
       |
       v
  [5] Check average position
  (small shift vs major collapse)
       |
       v
  [6] Analyze Pages table for pattern
       |           |           |
       v           v           v
  Site-wide    Group of     Single page
  drop         pages drop   drop
       |           |           |
       v           v           v
  Check:       URL          Focused
  Crawl Stats  Inspection   page
  Page Index   Tool         investigation
  Report
       |
       v
  [7] Consult cause-specific reports
       |       |       |       |        |
       v       v       v       v        v
  Algorithm  Tech   Security  Spam   Seasonal
  Update     Issue  Threat    Penalty  Shift
```

## Root Cause Categories

### 1. Algorithmic Updates
Google continuously updates ranking algorithms. Core updates can cause significant shifts.

**Diagnosis:**
- [ ] Check [Google ranking updates page](https://developers.google.com/search/updates/ranking) for recent updates
- [ ] Correlate traffic drop date with update rollout dates
- [ ] Determine if drop is small (rank 2→4, normal fluctuation) or major (rank 4→29+)
- [ ] Check if competitors gained for the same queries

**Remediation:**
- Small position shifts: No action needed — normal fluctuation
- Major drops: Self-assess content against "helpful, reliable, people-first" standards
- Review: Is content written for users or search engines?
- Review: Does content demonstrate expertise and first-hand experience?
- Review: Is content substantially better than competitors?
- Timeline: Recovery takes weeks to months, no guarantees
- Do NOT make panic changes if content is already high quality

### 2. Technical Issues
Server problems, crawling errors, or indexing failures.

**Diagnosis:**
- [ ] Check Search Console → Crawl Stats Report for error spikes
- [ ] Check Search Console → Page Indexing Report for indexing changes
- [ ] Check if server returns 5xx errors
- [ ] Check robots.txt for accidental blocks
- [ ] Check for misplaced `noindex` tags
- [ ] Check if recent deployments broke something
- [ ] Check DNS resolution
- [ ] Check SSL certificate validity
- [ ] Check if CDN is blocking Googlebot

**Audit commands:**
```bash
# Server response check
curl -sI https://DOMAIN | head -5
curl -sI https://DOMAIN -A "Googlebot" | head -5

# robots.txt check
curl -s https://DOMAIN/robots.txt

# Check for noindex on key pages
for page in "/" "/about" "/blog" "/tutors"; do
  echo "=== $page ==="
  curl -s "https://DOMAIN$page" | grep -i 'noindex'
done

# SSL check
curl -sI https://DOMAIN | grep -i strict-transport

# DNS check
nslookup DOMAIN

# Response time (slow = reduced crawl rate)
curl -o /dev/null -s -w "TTFB: %{time_starttransfer}s\n" https://DOMAIN

# Check sitemap URLs return 200
curl -s https://DOMAIN/sitemap.xml | grep '<loc>' | shuf | head -5 | \
  sed 's/.*<loc>//' | sed 's/<\/loc>.*//' | \
  while read url; do echo -n "$url -> "; curl -sI "$url" | head -1; done

# Check for soft 404s
curl -sI https://DOMAIN/nonexistent-page-xyz123 | head -1

# Check Googlebot access
curl -s https://DOMAIN -A "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)" | grep '<title>'
```

**Remediation:**
- Fix server errors immediately (5xx → ensure uptime)
- Remove accidental noindex tags
- Fix robots.txt blocks on important content
- Renew expired SSL certificates
- Reduce server response time (< 500ms TTFB target)
- Request recrawl in Search Console after fixes

### 3. Security Threats
Malware, phishing, or hacked content.

**Diagnosis:**
- [ ] Check Search Console → Security Issues Report
- [ ] Check Google Safe Browsing: `https://transparencyreport.google.com/safe-browsing/search?url=DOMAIN`
- [ ] Search `site:DOMAIN` for suspicious pages (pharma spam, casino links)
- [ ] Check for unknown JavaScript injections in page source
- [ ] Check `.htaccess` for malicious redirects
- [ ] Scan server for unauthorized file changes

**Audit commands:**
```bash
# Check for injected content
curl -s https://DOMAIN | grep -iE 'viagra|casino|pharma|payday|porn' | head -5

# Check for suspicious redirects when Googlebot visits
curl -sI https://DOMAIN -A "Googlebot" | grep -i location

# Check Google Safe Browsing status
curl -s "https://transparencyreport.google.com/safe-browsing/search?url=DOMAIN"

# Check for hidden iframes
curl -s https://DOMAIN | grep -i '<iframe' | head -5

# Check for base64 encoded scripts
curl -s https://DOMAIN | grep -i 'base64\|eval(' | head -5
```

**Remediation:**
- Remove all malware/injected content
- Change all passwords (admin, FTP, database, hosting)
- Update all CMS plugins and themes
- Request security review in Search Console
- Request recrawl after cleanup

### 4. Spam Penalties (Manual Actions)
Google reviewers have identified spam policy violations.

**Diagnosis:**
- [ ] Check Search Console → Manual Actions Report
- [ ] Review [Google spam policies](https://developers.google.com/search/docs/essentials/spam-policies)
- [ ] Check for: thin content, keyword stuffing, cloaking, link schemes
- [ ] Check for: hidden text, doorway pages, scraped content
- [ ] Check for: sneaky redirects, auto-generated content

**Audit commands:**
```bash
# Check for hidden text (white text on white bg, tiny font)
curl -s https://DOMAIN | grep -iE 'font-size:\s*0|display:\s*none|visibility:\s*hidden|color:\s*#fff.*background.*#fff'

# Check for cloaking (different content for Googlebot)
diff <(curl -s https://DOMAIN) <(curl -s https://DOMAIN -A "Googlebot")

# Check for keyword stuffing
curl -s https://DOMAIN | grep -oE '\b\w+\b' | sort | uniq -c | sort -rn | head -20

# Check outbound links for link schemes
curl -s https://DOMAIN | grep -oE 'href="http[^"]*"' | grep -v 'DOMAIN' | head -20
```

**Remediation:**
- Fix all identified spam issues
- Remove unnatural links (or add nofollow)
- Rewrite thin/auto-generated content
- Remove hidden text and cloaking
- Submit reconsideration request in Search Console
- Timeline: Review can take weeks

### 5. Seasonal / Interest Changes
External demand shifts unrelated to your site.

**Diagnosis:**
- [ ] Check Google Trends for your top queries
- [ ] Compare current period to same period last year
- [ ] Check if drop affects entire industry or just your site
- [ ] Look for news events that shifted search interest
- [ ] Check if new competitors entered the market

**Audit commands:**
```bash
# Check Google Trends (manual)
# Visit: https://trends.google.com/trends/explore?q=YOUR_QUERY

# Compare year-over-year in Search Console
# Performance → Date: Compare → Previous year

# Check if competitors rank for your dropped queries
# Search your top queries manually and note who ranks
```

**Remediation:**
- If industry-wide: No fix needed — demand shifted
- If seasonal: Plan content calendar for peak seasons
- If competitor-driven: Improve content quality, add unique value
- Identify rising related queries and create content for them
- Diversify traffic sources (not just Google)

### 6. Site Migration Issues
Traffic drops after URL changes, domain moves, or redesigns.

**Diagnosis:**
- [ ] Check if 301 redirects are properly implemented (old → new URLs)
- [ ] Check if redirect chains exist (A → B → C)
- [ ] Check if old sitemap is still submitted (should submit new one)
- [ ] Check if canonical tags point to correct new URLs
- [ ] Check if internal links still reference old URLs
- [ ] Check Search Console for crawl errors on old URLs

**Audit commands:**
```bash
# Check redirect from old URL
curl -sIL https://old-domain.com/old-page | grep -E 'HTTP/|Location'

# Verify no redirect chains
curl -sIL https://DOMAIN/page 2>&1 | grep -c 'Location:'
# Should be 0 or 1, not 2+

# Check for mixed old/new internal links
curl -s https://DOMAIN | grep -oE 'href="[^"]*old-domain[^"]*"' | head -10

# Verify new sitemap submitted
curl -s https://DOMAIN/robots.txt | grep -i sitemap
```

**Remediation:**
- Ensure ALL old URLs 301 redirect to new equivalents
- Fix redirect chains (make single-hop redirects)
- Update internal links to point to new URLs
- Submit new sitemap in Search Console
- Remove old sitemap from Search Console
- Timeline: Medium sites recover in weeks, large sites take longer

## Search Console Reports Checklist

When investigating a traffic drop, check these reports in order:

| Priority | Report | What to Look For |
|----------|--------|-----------------|
| 1 | **Performance** | Impressions vs clicks trend, affected queries/pages |
| 2 | **Data Anomalies** | Google-side processing errors or logging issues |
| 3 | **Page Indexing** | Sudden drop in indexed pages, new errors |
| 4 | **Crawl Stats** | Spike in crawl errors, reduced crawl rate |
| 5 | **Manual Actions** | Any active penalties |
| 6 | **Security Issues** | Malware or phishing warnings |
| 7 | **Rich Results** | Structured data errors causing lost rich results |
| 8 | **Core Web Vitals** | Performance degradation affecting rankings |

## Key Metrics to Monitor

| Metric | Healthy | Warning | Critical |
|--------|---------|---------|----------|
| Impressions trend | Stable/growing | -10% MoM | -30%+ MoM |
| Click-through rate | > 3% | 1-3% | < 1% |
| Indexed pages | Stable | -5% drop | -20%+ drop |
| Crawl errors | < 1% | 1-5% | > 5% |
| Server response | < 500ms | 500ms-2s | > 2s |
| Core Web Vitals | All green | Some orange | Red/failing |
| Manual actions | None | — | Any active |
| Security issues | None | — | Any active |

## Automated Monitoring Setup

```bash
# Weekly traffic comparison script
# Run via cron: 0 9 * * 1 /path/to/check-traffic.sh

# Check server health
echo "=== Server Health ==="
curl -o /dev/null -s -w "Status: %{http_code} TTFB: %{time_starttransfer}s\n" https://DOMAIN

# Check robots.txt hasn't changed
echo "=== robots.txt ==="
curl -s https://DOMAIN/robots.txt | md5sum

# Check key pages aren't noindexed
echo "=== noindex check ==="
for page in "/" "/about" "/blog"; do
  noindex=$(curl -s "https://DOMAIN$page" | grep -ic 'noindex')
  echo "$page: noindex=$noindex"
done

# Check sitemap is accessible
echo "=== Sitemap ==="
curl -sI https://DOMAIN/sitemap.xml | head -1

# Check SSL
echo "=== SSL ==="
curl -sI https://DOMAIN | grep -c 'Strict-Transport'

# Check for soft 404
echo "=== 404 handling ==="
curl -sI https://DOMAIN/nonexistent-xyz | head -1
```

## Recovery Timeline Expectations

| Cause | Expected Recovery | Notes |
|-------|------------------|-------|
| Technical fix (noindex, 5xx) | Days to 2 weeks | After fix + recrawl request |
| Security cleanup | 1-4 weeks | After review request |
| Manual action removal | 2-6 weeks | After reconsideration |
| Algorithm update | Weeks to months | No guarantee; content must improve |
| Migration recovery | 2-8 weeks | Medium sites faster than large |
| Seasonal return | Next cycle | Plan ahead for next year |

## Output Format
```
## Traffic Drop Diagnosis: [DOMAIN]

### Drop Pattern
- Period: [date range]
- Impressions: [X]% change
- Clicks: [X]% change
- Affected scope: [site-wide / page group / single page]

### Root Cause Assessment
| Cause | Likelihood | Evidence |
|-------|-----------|----------|

### Immediate Actions
1. [Highest priority fix]
2. [Second priority fix]
3. [Third priority fix]

### Monitoring Plan
- [ ] Check [specific metric] in [X] days
- [ ] Verify [fix] is working via [tool]
- [ ] Re-assess traffic in [X] weeks
```

## References
- [Debugging Search Traffic Drops](https://developers.google.com/search/docs/monitor-debug/debugging-search-traffic-drops)
- [Google Ranking Updates](https://developers.google.com/search/updates/ranking)
- [Search Console Help](https://support.google.com/webmasters)
- [Google Spam Policies](https://developers.google.com/search/docs/essentials/spam-policies)
- [Google Trends](https://trends.google.com/)
