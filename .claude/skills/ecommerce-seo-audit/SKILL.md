# E-Commerce SEO Audit Skill

## Description
Audit an e-commerce website against Google's official E-Commerce SEO documentation. Covers product data, structured data, URL architecture, site structure, pagination, reviews, Google Merchant Center integration, and shopping surface eligibility.

## Usage
Run with a URL: `/ecommerce-seo-audit https://example.com`

## Audit Categories

### 1. Product Data Sharing with Google
How product information reaches Google's various surfaces.

**Methods (use at least one, ideally multiple):**
- [ ] **Structured data** on product pages (Product schema)
- [ ] **Google Merchant Center** feed uploaded
- [ ] **Automated feed** from structured data (for smaller catalogs)
- [ ] **Content API** for real-time updates (stock levels, pricing)
- [ ] Merchant Center configured to auto-update from website when discrepancies found
- [ ] Product data consistent between website and Merchant Center

### 2. Product Structured Data (JSON-LD)
Schema.org markup for rich results and merchant listings.

**Product Schema — Required:**
- [ ] `@type: Product`
- [ ] `name` — Product title
- [ ] `image` — At least one product image URL
- [ ] `offers` with `@type: Offer`
- [ ] `offers.price` — Numeric price
- [ ] `offers.priceCurrency` — ISO 4217 currency code
- [ ] `offers.availability` — schema.org availability enum

**Product Schema — Recommended (more = better):**
- [ ] `description` — Product description
- [ ] `brand` — Brand name (`@type: Brand`)
- [ ] `sku` — Unique product identifier
- [ ] `gtin` / `gtin13` / `gtin8` / `mpn` — Global product identifiers
- [ ] `offers.url` — Product page URL
- [ ] `offers.seller` — Seller organization
- [ ] `offers.itemCondition` — New/Used/Refurbished
- [ ] `offers.priceValidUntil` — Sale end date
- [ ] `aggregateRating` — Average rating + review count
- [ ] `review` — Individual review(s) with author, rating, body

**Merchant Return Policy:**
- [ ] `offers.hasMerchantReturnPolicy` present
- [ ] `@type: MerchantReturnPolicy`
- [ ] `applicableCountry` — Country code
- [ ] `returnPolicyCategory` — Return window type
- [ ] `merchantReturnDays` — Number of days
- [ ] `returnMethod` — By mail, in store, etc.
- [ ] `returnFees` — Free return or fee amount

**Shipping Details:**
- [ ] `offers.shippingDetails` present
- [ ] `@type: OfferShippingDetails`
- [ ] `shippingRate` — Cost (value + currency)
- [ ] `shippingDestination` — Country/region
- [ ] `deliveryTime` — Handling + transit time
- [ ] Free shipping highlighted (shippingRate.value = 0)

**Product Variants (if applicable):**
- [ ] `@type: ProductGroup` for parent product
- [ ] `hasVariant` linking to individual Product entries
- [ ] Variants have unique URLs (path or query parameter)
- [ ] `variesBy` specifying which properties differ (color, size)

**Supporting Schemas:**
- [ ] `BreadcrumbList` on product pages
- [ ] `Organization` schema on homepage (with logo, contact)
- [ ] `LocalBusiness` if physical stores exist
- [ ] `VideoObject` for product videos

### 3. Product Page Content Quality
What makes a product page rank well.

- [ ] Unique product title (not copied from manufacturer)
- [ ] Unique product description (150+ words, not manufacturer copy)
- [ ] High-quality product images (multiple angles)
- [ ] All images have descriptive `alt` text
- [ ] Price clearly visible on page
- [ ] Availability/stock status displayed
- [ ] Customer reviews visible on page
- [ ] Specifications/details table present
- [ ] Related/recommended products section
- [ ] Breadcrumbs showing category hierarchy
- [ ] Clear call-to-action (Add to Cart button)
- [ ] Mobile-friendly product layout

### 4. URL Architecture
URL structure that avoids crawl budget waste.

**Product URLs:**
- [ ] Descriptive paths (`/product/black-t-shirt` not `/product/3243`)
- [ ] Consistent casing (all lowercase)
- [ ] Hyphens as separators (not underscores)
- [ ] Each product has one canonical URL
- [ ] Product variants use identifiable URLs (`/t-shirt?color=green` or `/t-shirt/green`)

**Category URLs:**
- [ ] Logical hierarchy (`/category/subcategory/product`)
- [ ] Category pages have unique URLs
- [ ] Empty categories return 404 or use `noindex`

**Query Parameters:**
- [ ] Use key-value pairs (`?color=green` not `?green`)
- [ ] No duplicate parameters (`?type=a,b` not `?type=a&type=b`)
- [ ] Session IDs NOT in URLs
- [ ] Tracking parameters NOT in internal links
- [ ] Time-based parameters NOT in indexed URLs

**Consistency:**
- [ ] Same URLs used in internal links, sitemaps, and canonical tags
- [ ] Self-referencing canonical on every indexable page
- [ ] Canonical URL omits optional query parameters

**Faceted Navigation:**
- [ ] Filter combinations don't create infinite URL variations
- [ ] Low-value filter pages use `noindex` or robots.txt block
- [ ] Canonical tags point filtered pages to base category
- [ ] Sort order URLs (`?sort=price`) are noindexed

### 5. Site Structure & Navigation
Architecture that helps Google understand product hierarchy.

- [ ] Homepage links to main categories
- [ ] Categories link to subcategories
- [ ] Subcategories link to products
- [ ] Every product reachable within 3-4 clicks from homepage
- [ ] Breadcrumbs on every product and category page
- [ ] Navigation uses `<a href>` links (not JavaScript-only)
- [ ] Descriptive anchor text (not "click here")
- [ ] Footer includes links to key categories
- [ ] Internal search doesn't generate indexable URLs (noindex search results)
- [ ] Related products create cross-links between products
- [ ] Category pages link to popular/featured products
- [ ] No orphan products (only in sitemap, no internal links)

### 6. Pagination & Loading Patterns
How product listings are loaded and paginated.

- [ ] Paginated pages have unique URLs (`?page=2`, `?page=3`)
- [ ] Sequential `<a href>` links between pages (Page 1 → 2 → 3)
- [ ] Each paginated page has its own canonical (NOT canonical to page 1)
- [ ] First page links back from subsequent pages
- [ ] No URL fragments (#) used for pagination
- [ ] Load more / infinite scroll: fallback paginated URLs exist for Googlebot
- [ ] Filtered/sorted variations use `noindex`
- [ ] Sitemap or Merchant Center feed ensures all products discoverable
- [ ] Preload/prefetch used for performance between pages
- [ ] `rel="next/prev"` no longer needed (Google ignores them)

### 7. Product Reviews
Review content quality and structured data.

- [ ] Reviews are authentic (not generated/fake)
- [ ] Reviews include both pros and cons
- [ ] Reviews show evidence (photos, measurements, test results)
- [ ] Reviews compare with alternatives
- [ ] Reviews address key decision factors
- [ ] Review structured data (`Review` or `AggregateRating`) present
- [ ] Rating values are within declared range (1-5)
- [ ] Review author information included
- [ ] Review dates are accurate
- [ ] Affiliate links disclosed properly
- [ ] Reviews have substantive content (not thin)

### 8. Google Shopping Surfaces
Where your products can appear and eligibility requirements.

**Surfaces:**
| Surface | Requirement | Data Source |
|---------|-------------|-------------|
| Organic Search (product rich results) | Product structured data | Website markup |
| Google Shopping tab | Merchant Center account + feed | Merchant Center |
| Google Images (product badges) | Product structured data + images | Website markup |
| Google Lens | Product images + structured data | Website + MC |
| Free product listings | Merchant Center + feed | Merchant Center |
| Paid Shopping ads | Merchant Center + Google Ads | Merchant Center |

**Checklist:**
- [ ] Google Merchant Center account created and verified
- [ ] Product feed uploaded with required attributes
- [ ] Feed updates scheduled (daily minimum for pricing/stock)
- [ ] Website verification completed in Merchant Center
- [ ] Products approved (no disapprovals/warnings)
- [ ] Free listings enabled in Merchant Center
- [ ] Structured data on website matches Merchant Center feed

### 9. Technical E-Commerce Checks
E-commerce-specific technical requirements.

- [ ] Product pages load under 3 seconds
- [ ] Product images are optimized (WebP/AVIF, lazy loaded)
- [ ] Out-of-stock products handled properly (keep page, show status, suggest alternatives)
- [ ] Discontinued products redirect (301) to replacement or category
- [ ] Seasonal products: keep URLs, update content (don't delete/recreate)
- [ ] Price changes reflected immediately in structured data
- [ ] Cart/checkout pages are `noindex` (no crawl budget waste)
- [ ] Account/login pages are `noindex`
- [ ] Search results pages are `noindex`
- [ ] Wishlist/compare pages are `noindex`
- [ ] HTTPS enforced on all pages (especially checkout)

### 10. Sitemap for E-Commerce
Product sitemap best practices.

- [ ] Product sitemap includes all active products
- [ ] Sitemap uses `<lastmod>` with actual product update dates
- [ ] Discontinued/out-of-stock products removed from sitemap
- [ ] Category pages included in sitemap
- [ ] Sitemap file under 50,000 URLs / 50MB
- [ ] Large catalogs use sitemap index with sub-sitemaps
- [ ] Image sitemap extension for product images (optional but recommended)
- [ ] Sitemap submitted in Google Search Console
- [ ] Sitemap referenced in robots.txt

## Audit Commands

```bash
# 1. Product page structured data check
curl -s https://DOMAIN/product/SLUG | grep -oP '(?<=application/ld\+json">).*?(?=</script>)' | python3 -m json.tool

# 2. Check required Product properties
curl -s https://DOMAIN/product/SLUG | grep -oE '"@type":"Product"' && echo "Product schema: YES" || echo "Product schema: MISSING"
for prop in '"name"' '"image"' '"price"' '"priceCurrency"' '"availability"'; do
  count=$(curl -s https://DOMAIN/product/SLUG | grep -c "$prop")
  echo "$prop: $count matches"
done

# 3. Check merchant return policy and shipping
curl -s https://DOMAIN/product/SLUG | grep -oE 'MerchantReturnPolicy|OfferShippingDetails|shippingRate|returnPolicyCategory'

# 4. Check aggregate rating and reviews
curl -s https://DOMAIN/product/SLUG | grep -oE 'AggregateRating|"review"|ratingValue|reviewCount'

# 5. URL structure check
curl -s https://DOMAIN/sitemap.xml | grep '<loc>' | grep 'product' | head -10
# Check for numeric-only product URLs (bad)
curl -s https://DOMAIN/sitemap.xml | grep '<loc>' | grep -E '/product/[0-9]+$' | head -5

# 6. Category page check
curl -s https://DOMAIN/sitemap.xml | grep '<loc>' | grep 'category' | head -10

# 7. Breadcrumb check
curl -s https://DOMAIN/product/SLUG | grep -oE 'BreadcrumbList|ListItem'

# 8. Pagination check
curl -s https://DOMAIN/category/SLUG | grep -oE 'page=[0-9]+|rel="next"|rel="prev"'

# 9. noindex on non-product pages
for page in "/cart" "/checkout" "/login" "/register" "/search" "/wishlist"; do
  echo -n "$page: "
  curl -s "https://DOMAIN$page" 2>/dev/null | grep -ic 'noindex'
  echo " noindex tags"
done

# 10. Image optimization check
curl -s https://DOMAIN/product/SLUG | grep -oE 'src="[^"]*\.(webp|avif|jpg|png)"' | head -10
curl -s https://DOMAIN/product/SLUG | grep '<img' | grep -vc 'alt='
echo " images missing alt text"

# 11. Out-of-stock handling
# Check a known out-of-stock product URL
curl -sI https://DOMAIN/product/OUT-OF-STOCK-SLUG | head -3
curl -s https://DOMAIN/product/OUT-OF-STOCK-SLUG | grep -oE 'OutOfStock|InStock|availability'

# 12. Google Merchant Center verification
curl -s https://DOMAIN | grep -oE 'google-site-verification|merchant'
```

## Severity Levels
- **CRITICAL**: Missing Product structured data, no Merchant Center, broken product URLs
- **HIGH**: Missing return/shipping in schema, no reviews, empty categories indexed, products not in sitemap
- **MEDIUM**: Missing recommended schema properties, poor product descriptions, image optimization
- **LOW**: Missing video schema, loyalty program schema, variant schema optimization

## Output Format
```
## E-Commerce SEO Audit: [DOMAIN]

### Product Data Coverage
- Total products: X
- With structured data: X (X%)
- In Merchant Center: X (X%)
- In sitemap: X (X%)

### Structured Data Scorecard
| Property | Present | Missing | Coverage |
|----------|---------|---------|----------|

### Product Page Quality
| Check | Sample of 5 Pages | Issues |
|-------|-------------------|--------|

### URL Architecture
| Pattern | Count | Issues |
|---------|-------|--------|

### Issue List (by severity)
| # | Severity | Category | Issue | Affected | Fix |
|---|----------|----------|-------|----------|-----|
```

## References
- [E-Commerce Overview](https://developers.google.com/search/docs/specialty/ecommerce)
- [Product Structured Data](https://developers.google.com/search/docs/appearance/structured-data/product)
- [Merchant Listings](https://developers.google.com/search/docs/appearance/structured-data/merchant-listing)
- [Product Variants](https://developers.google.com/search/docs/appearance/structured-data/product-variants)
- [URL Structure for E-Commerce](https://developers.google.com/search/docs/specialty/ecommerce/designing-a-url-structure-for-ecommerce-sites)
- [Pagination & Loading](https://developers.google.com/search/docs/specialty/ecommerce/pagination-and-incremental-page-loading)
- [Google Merchant Center](https://merchants.google.com/)
