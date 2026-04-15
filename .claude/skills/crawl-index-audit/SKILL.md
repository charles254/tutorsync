# Crawling & Indexing Audit Skill

## Description
Audit a website for crawling and indexing issues based on Google's official Crawling & Indexing documentation. Identifies problems that prevent or slow down Google's ability to discover, crawl, render, and index your pages.

## Usage
Run with a URL: `/crawl-index-audit https://example.com`

## Audit Categories

### 1. robots.txt Validation
- [ ] File exists at `/robots.txt` and returns 200
- [ ] Valid syntax (no malformed directives)
- [ ] `User-Agent: *` rule exists
- [ ] Critical pages are NOT disallowed (homepage, key landing pages)
- [ ] CSS/JS resources are NOT blocked (Googlebot needs them to render)
- [ ] `Sitemap:` directive points to valid sitemap URL
- [ ] No conflicting Allow/Disallow rules
- [ ] File size < 500KB (Google's limit)
- [ ] robots.txt is NOT used as security mechanism (use noindex/auth instead)

### 2. Sitemap Validation
- [ ] Sitemap exists and is referenced in robots.txt
- [ ] Valid XML format (proper xmlns declaration)
- [ ] Each sitemap file has < 50,000 URLs
- [ ] Each sitemap file is < 50MB uncompressed
- [ ] For large sites: sitemap index file splits into sub-sitemaps
- [ ] `<lastmod>` dates are accurate (not all set to today)
- [ ] URLs in sitemap return 200 (no 404s, redirects, or errors)
- [ ] Sitemap URLs match canonical URLs
- [ ] No disallowed URLs appear in sitemap (conflicts with robots.txt)
- [ ] Sitemap is submitted in Google Search Console
- [ ] No duplicate URLs in sitemap

### 3. Canonicalization
- [ ] Every page has `<link rel="canonical">` pointing to itself
- [ ] Canonical URLs use HTTPS (not HTTP)
- [ ] Canonical URLs are consistent (www vs non-www)
- [ ] Trailing slash usage is consistent
- [ ] No canonical pointing to a different page erroneously
- [ ] HTTP → HTTPS redirects are in place
- [ ] www → non-www (or vice versa) redirects are in place
- [ ] Canonical URL matches sitemap URL
- [ ] No canonical set via both HTML and HTTP header (conflicts)
- [ ] Canonical URLs are absolute, not relative

### 4. HTTP Status Codes & Redirects
- [ ] Key pages return 200 OK
- [ ] Deleted pages return 404 or 410 (not soft 404)
- [ ] No redirect chains (A → B → C; max 1 hop)
- [ ] No redirect loops
- [ ] Moved pages use 301 (permanent) redirects
- [ ] Temporary content uses 302/307 appropriately
- [ ] No 5xx server errors on crawlable pages
- [ ] Custom 404 page exists with navigation back to site

### 5. Crawl Budget Optimization
- [ ] No duplicate content accessible via multiple URLs
- [ ] URL parameters don't create infinite URL variations
- [ ] Faceted navigation is controlled (noindex or robots.txt)
- [ ] Pagination doesn't create excessive crawlable URLs
- [ ] Sort/filter URLs are blocked or canonicalized
- [ ] No soft 404s (pages with "no results" returning 200)
- [ ] Session IDs are not in URLs
- [ ] Calendar/date-based URLs don't extend infinitely
- [ ] Internal search results pages are noindexed
- [ ] Server response time < 500ms (affects crawl rate)

### 6. Meta Robots & Indexing Directives
- [ ] Important pages have `<meta name="robots" content="index, follow">`
- [ ] No accidental `noindex` on important pages
- [ ] Thin/empty pages have `noindex` (prevents quality dilution)
- [ ] Login/register pages are `noindex`
- [ ] X-Robots-Tag HTTP header is not conflicting with meta robots
- [ ] No `noindex` + `rel="canonical"` conflict on same page

### 7. JavaScript Rendering
- [ ] Critical content is in initial HTML (not JS-only)
- [ ] Links use `<a href="">` elements (not JS click handlers)
- [ ] Metadata (title, description, canonical) is in server-rendered HTML
- [ ] JSON-LD structured data is in HTML or properly injected
- [ ] No content behind click/scroll interactions only
- [ ] Lazy-loaded content uses IntersectionObserver (not scroll events)
- [ ] Single-page app uses History API (not hash fragments #/)
- [ ] Dynamic rendering or SSR is used for important content

### 8. Mobile-First Indexing
- [ ] Responsive design or mobile-equivalent content
- [ ] Same content on mobile and desktop versions
- [ ] Mobile viewport meta tag present
- [ ] No content hidden behind "read more" buttons on mobile
- [ ] Images have same alt text on mobile and desktop
- [ ] Structured data present on mobile version

### 9. URL Structure
- [ ] URLs are descriptive and human-readable
- [ ] URLs use hyphens (not underscores) as separators
- [ ] URLs are lowercase
- [ ] No excessive URL depth (> 5 levels)
- [ ] No special characters or spaces in URLs
- [ ] URL length < 2048 characters
- [ ] Consistent URL pattern across page types

### 10. Duplicate Content Prevention
- [ ] HTTP and HTTPS don't serve same content (one redirects)
- [ ] www and non-www don't serve same content (one redirects)
- [ ] Trailing slash and non-trailing slash are consistent
- [ ] Print pages use canonical to main page
- [ ] AMP pages canonicalize to main version
- [ ] Paginated content uses proper canonicalization
- [ ] URL parameters don't create duplicate pages

### 11. Internal Linking & Discovery
- [ ] Every page is reachable via internal links
- [ ] No orphan pages (pages only in sitemap, no internal links)
- [ ] Breadcrumbs provide hierarchical linking
- [ ] Related content is cross-linked
- [ ] No broken internal links (404 targets)
- [ ] Navigation is in HTML (not JS-only menus)

### 12. Page Removal & Noindex
- [ ] Removed content returns proper 404/410
- [ ] `noindex` pages are excluded from sitemap
- [ ] Blocked pages in robots.txt are not also `noindex` (redundant)
- [ ] Sensitive pages use authentication, not just noindex
- [ ] Old/outdated content is either updated or removed

## Audit Commands

```bash
# 1. robots.txt check
curl -s https://DOMAIN/robots.txt

# 2. Sitemap validation
curl -s https://DOMAIN/sitemap.xml | head -5
curl -s https://DOMAIN/sitemap.xml | grep -c '<url>'
# Check random URLs from sitemap
curl -s https://DOMAIN/sitemap.xml | grep '<loc>' | shuf | head -5 | sed 's/.*<loc>//' | sed 's/<\/loc>.*//' | while read url; do echo -n "$url -> "; curl -sI "$url" | head -1; done

# 3. Redirect checks
curl -sI http://DOMAIN | grep -i 'location\|HTTP/'
curl -sI https://www.DOMAIN | grep -i 'location\|HTTP/'
curl -sI https://DOMAIN/ | grep -i 'location\|HTTP/'

# 4. Canonical consistency
for page in "/" "/about" "/blog" "/tutors/math"; do
  echo "=== $page ==="
  curl -s "https://DOMAIN$page" | grep -o '<link rel="canonical" [^>]*>'
done

# 5. Meta robots check
curl -s https://DOMAIN | grep -i 'noindex\|nofollow'

# 6. Response time
curl -o /dev/null -s -w "TTFB: %{time_starttransfer}s\nTotal: %{time_total}s\n" https://DOMAIN

# 7. Soft 404 detection
curl -sI https://DOMAIN/this-page-does-not-exist-12345 | head -1

# 8. JavaScript rendering check
curl -s https://DOMAIN | grep -c '<a href'
# Compare with rendered version via Google's URL Inspection Tool

# 9. Redirect chain detection
curl -sIL https://DOMAIN 2>&1 | grep -E 'HTTP/|Location:'

# 10. SSL certificate check
curl -sI https://DOMAIN | grep -i 'strict-transport-security'

# 11. Sitemap vs canonical mismatch
curl -s https://DOMAIN/sitemap.xml | grep '<loc>' | head -10 | sed 's/.*<loc>//' | sed 's/<\/loc>.*//' | while read url; do
  canonical=$(curl -s "$url" | grep -o 'rel="canonical" href="[^"]*"' | sed 's/.*href="//' | sed 's/"//')
  if [ "$url" != "$canonical" ]; then echo "MISMATCH: sitemap=$url canonical=$canonical"; fi
done
```

## Severity Levels
- **CRITICAL**: Blocks crawling/indexing entirely (robots.txt blocking key pages, noindex on important pages, redirect loops)
- **HIGH**: Significantly wastes crawl budget or causes indexing issues (duplicate content, broken redirects, soft 404s)
- **MEDIUM**: Slows crawling efficiency (large sitemap, slow response, redirect chains)
- **LOW**: Minor optimizations (lastmod accuracy, crawl budget fine-tuning)

## Output Format
```
## Crawl & Index Audit Report: [DOMAIN]

### Summary
- Pages checked: X
- Critical issues: X
- High issues: X
- Medium issues: X
- Estimated crawl budget waste: X%

### Issue List (by severity)
| # | Severity | Category | Issue | Affected URLs | Fix |
|---|----------|----------|-------|---------------|-----|

### Detailed Findings
[Per-category breakdown with evidence]
```
