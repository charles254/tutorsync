# Search Appearance Audit Skill

## Description
Audit how a website appears in Google Search results based on Google's official Search Appearance documentation. Covers title links, snippets, structured data, favicons, site names, sitelinks, images, featured snippets, and rich results eligibility.

## Usage
Run with a URL: `/search-appearance-audit https://example.com`

## Audit Categories

### 1. Title Links
How Google generates and displays page titles in search results.

- [ ] Every page has a `<title>` element (never empty)
- [ ] Titles are descriptive and concise (not "Home" or "Untitled")
- [ ] Titles avoid truncation (aim for 50-60 chars for full display)
- [ ] No keyword stuffing in titles
- [ ] Each page has a unique title (no duplicates across pages)
- [ ] Brand name included concisely with delimiter (hyphen, pipe, colon)
- [ ] Title matches page's main visual heading (H1)
- [ ] Title language matches page content language
- [ ] `<title>` element is not blocked by robots.txt
- [ ] No "half-empty" titles (e.g., "| SiteName" with no page-specific text)
- [ ] Main visual title is clearly the largest/most prominent heading

### 2. Meta Descriptions / Snippets
Text previews shown below title links in search results.

- [ ] Every important page has a `<meta name="description">` tag
- [ ] Descriptions are unique per page (not copy-pasted)
- [ ] Descriptions are 70-160 characters (concise but informative)
- [ ] Descriptions contain relevant page-specific information
- [ ] Descriptions are human-readable (not keyword strings)
- [ ] Product pages include: price, manufacturer, availability in description
- [ ] News/article pages include: author, date in description
- [ ] No template variables leaking (empty fields, "undefined", "$0")
- [ ] Programmatic descriptions use page-specific data (not generic)
- [ ] `max-snippet` directive used appropriately if snippet control needed
- [ ] `data-nosnippet` used on sensitive sections if needed

### 3. Structured Data (JSON-LD)
Machine-readable markup for rich result eligibility.

- [ ] JSON-LD format used (Google's recommended format)
- [ ] Markup placed in `<script type="application/ld+json">` tags
- [ ] All required properties present for each schema type
- [ ] Recommended properties included where data is available
- [ ] Data values are accurate and match visible page content
- [ ] No structured data about invisible/hidden content
- [ ] Validates at https://validator.schema.org/
- [ ] Validates with Google Rich Results Test
- [ ] No empty/null values in required fields

**Per page type:**
- [ ] **Homepage**: Organization or WebSite schema with SearchAction
- [ ] **Articles/Blog**: Article schema with headline, datePublished, author, image
- [ ] **Products**: Product schema with name, image, price, availability, review, returnPolicy, shippingDetails
- [ ] **FAQs**: FAQPage schema with actual Q&A pairs (not empty)
- [ ] **Breadcrumbs**: BreadcrumbList matching visual breadcrumbs
- [ ] **Local Business**: LocalBusiness with address, phone, hours
- [ ] **Events**: Event with name, date, location, offers
- [ ] **Recipes**: Recipe with ingredients, instructions, cook time
- [ ] **Reviews**: Review/AggregateRating with valid ratings
- [ ] **Person/Profile**: Person schema for profile pages
- [ ] **Course**: Course schema for educational content
- [ ] **Job Posting**: JobPosting for job listings
- [ ] **Video**: VideoObject with name, description, thumbnailUrl, uploadDate

### 4. Site Name
How your brand name appears in search results.

- [ ] `WebSite` structured data on homepage with `name` property
- [ ] Site name is concise and commonly recognized
- [ ] `url` property matches canonical homepage URL
- [ ] `alternateName` includes common abbreviations/variants
- [ ] Site name consistent across homepage title, OG tags, and structured data
- [ ] Not a generic/descriptive phrase (e.g., "Best Tutors")
- [ ] Structured data on homepage is accessible (not blocked)

### 5. Favicon
Site icon displayed next to search results.

- [ ] Favicon file exists (`/favicon.ico` or linked via `<link rel="icon">`)
- [ ] Favicon is at least 48x48 pixels (Google's minimum)
- [ ] Favicon is square (1:1 aspect ratio)
- [ ] Favicon represents the site's brand (not generic)
- [ ] Favicon is not inappropriate, offensive, or misleading
- [ ] Supported format: ICO, PNG, SVG (recommended)
- [ ] Multiple sizes provided for different contexts (16x16, 32x32, 48x48, 192x192)
- [ ] `<link rel="apple-touch-icon">` for mobile

### 6. Sitelinks Optimization
Additional links shown below main search result.

- [ ] Logical site structure with clear hierarchy
- [ ] Informative, relevant page titles and headings
- [ ] Strong internal linking between key pages
- [ ] Concise, descriptive anchor text on internal links
- [ ] Main navigation covers all important sections
- [ ] Minimal content repetition across pages
- [ ] Important pages linked from homepage
- [ ] No important pages blocked by noindex

### 7. Images in Search
How images appear in Google Images and web search.

- [ ] Images use `<img>` tags with `src` attribute (not CSS backgrounds)
- [ ] All images have descriptive `alt` text
- [ ] Alt text is specific, not keyword-stuffed
- [ ] Image filenames are descriptive (not IMG_1234.jpg)
- [ ] Images placed near relevant text content
- [ ] Responsive images use `srcset` or `<picture>` with fallback `src`
- [ ] Images optimized for size (WebP/AVIF, compressed)
- [ ] `og:image` set for social sharing (1200x630 recommended)
- [ ] Image sitemap submitted (for image-heavy sites)
- [ ] `primaryImageOfPage` schema or `og:image` for preferred image selection
- [ ] No important images rendered only via CSS/JS (invisible to Googlebot)
- [ ] Consistent image URLs across pages (avoid duplicate crawling)

### 8. Open Graph & Social Cards
How pages appear when shared on social media.

- [ ] `og:title` is page-specific (not hardcoded to homepage)
- [ ] `og:description` is page-specific
- [ ] `og:image` exists with quality image (1200x630px minimum)
- [ ] `og:url` matches canonical URL
- [ ] `og:type` is appropriate (website, article, product, profile)
- [ ] `og:site_name` set to brand name
- [ ] `og:locale` set for language targeting
- [ ] `twitter:card` set to `summary_large_image`
- [ ] `twitter:title` is page-specific
- [ ] `twitter:description` is page-specific
- [ ] `twitter:image` set (can differ from og:image)

### 9. Featured Snippets Optimization
Content formatting that increases featured snippet eligibility.

- [ ] FAQ-style content uses clear question headings (H2/H3)
- [ ] Answers are concise (40-60 words for paragraph snippets)
- [ ] Lists use proper `<ol>` or `<ul>` HTML elements
- [ ] Tables use proper `<table>` elements
- [ ] Definitions follow "X is..." pattern near headings
- [ ] Content addresses common user questions directly
- [ ] No `nosnippet` meta tag blocking snippet eligibility (unless intended)

### 10. Google Discover Eligibility
Content that may appear in Google Discover feed.

- [ ] High-quality, unique content with E-E-A-T signals
- [ ] Large, high-quality images (at least 1200px wide)
- [ ] `max-image-preview:large` in robots meta tag
- [ ] Compelling, non-clickbait titles
- [ ] Content is timely and/or evergreen
- [ ] No misleading or sensationalized preview content

### 11. Video Appearance
How videos appear in search results.

- [ ] Videos on dedicated pages (not buried in long content)
- [ ] `VideoObject` structured data with required properties
- [ ] Video title and description are descriptive
- [ ] Thumbnail image is high quality
- [ ] Video is publicly accessible (not behind login)
- [ ] Video sitemap submitted for video-heavy sites

### 12. Byline Dates
Publication date display in search results.

- [ ] Article dates use structured data (`datePublished`, `dateModified`)
- [ ] Dates are visible on page and match structured data
- [ ] `dateModified` updated when content significantly changes
- [ ] Date format is unambiguous (ISO 8601 recommended)
- [ ] No conflicting dates on page (multiple dates confuse Google)

## Audit Commands

```bash
# 1. Title & Description check
curl -s https://DOMAIN | grep -oE '<title>[^<]*</title>'
curl -s https://DOMAIN | grep -oE '<meta name="description" content="[^"]*"'

# 2. Structured data extraction
curl -s https://DOMAIN | grep -oP '(?<=application/ld\+json">).*?(?=</script>)' | python3 -m json.tool

# 3. Favicon check
curl -sI https://DOMAIN/favicon.ico | head -3
curl -s https://DOMAIN | grep -oE '<link rel="(icon|apple-touch-icon|shortcut icon)"[^>]*>'

# 4. OG & Twitter tags
curl -s https://DOMAIN | grep -oE '<meta property="og:[^"]*" content="[^"]*"'
curl -s https://DOMAIN | grep -oE '<meta name="twitter:[^"]*" content="[^"]*"'

# 5. Image alt text audit
curl -s https://DOMAIN | grep -oE '<img [^>]*>' | grep -v 'alt=' | head -10

# 6. WebSite structured data (site name)
curl -s https://DOMAIN | grep -o '"@type":"WebSite"[^}]*}'

# 7. Heading hierarchy
curl -s https://DOMAIN | grep -oE '<h[1-6][^>]*>[^<]*</h[1-6]>'

# 8. Rich Results Test (manual)
# Visit: https://search.google.com/test/rich-results?url=https://DOMAIN

# 9. Discover eligibility check
curl -s https://DOMAIN | grep -oE 'max-image-preview:[^"]*'
```

## Severity Levels
- **CRITICAL**: Missing structured data on key pages, no titles, broken JSON-LD
- **HIGH**: Missing OG images (affects social sharing), duplicate titles, empty meta descriptions
- **MEDIUM**: Title truncation, missing recommended schema properties, no favicon
- **LOW**: Missing alternateName, byline date formatting, Discover optimization

## Output Format
```
## Search Appearance Audit: [DOMAIN]

### Rich Results Eligibility
| Page Type | Schema | Status | Missing Properties |
|-----------|--------|--------|--------------------|

### Title & Snippet Quality
| Page | Title (chars) | Description (chars) | Issues |
|------|--------------|--------------------|---------| 

### Social Sharing Readiness
| Page | og:title | og:desc | og:image | twitter:card |
|------|----------|---------|----------|-------------|

### Issue List (by severity)
| # | Severity | Category | Issue | Fix |
|---|----------|----------|-------|-----|
```

## References
- [Google Title Links](https://developers.google.com/search/docs/appearance/title-link)
- [Google Snippets](https://developers.google.com/search/docs/appearance/snippet)
- [Structured Data Intro](https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data)
- [Site Names](https://developers.google.com/search/docs/appearance/site-names)
- [Sitelinks](https://developers.google.com/search/docs/appearance/sitelinks)
- [Google Images](https://developers.google.com/search/docs/appearance/google-images)
- [Featured Snippets](https://developers.google.com/search/docs/appearance/featured-snippets)
