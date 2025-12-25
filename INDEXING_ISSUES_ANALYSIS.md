# Critical Indexing Issues Analysis

## Issues Breakdown from Google Search Console

### 1. Page with redirect (21 pages) ⚠️
**Cause:** Old URL patterns being redirected to new ones
- `/service/*` → `/services/:splat`
- `/case-study/*` → `/work/case-studies/:splat`
- `/case-studies/*` → `/work/case-studies/:splat`
- `/portfolio` → `/work`
- `/projects` → `/work`

**Solution:** These are correctly configured 301 redirects. This is expected behavior and will resolve over time as Google recrawls.

**Action:**
- Remove old URLs from any internal links
- Update any external backlinks pointing to old URLs
- These pages should eventually drop from this report

---

### 2. Crawled - currently not indexed (26 pages) 🔴 CRITICAL
**This is the biggest problem.** Google crawled these pages but chose not to index them.

**Common Causes:**
1. **Duplicate content** - Multiple pages with similar content
2. **Thin content** - Pages with insufficient unique content
3. **Low quality** - Content doesn't meet Google's quality guidelines
4. **Canonical issues** - Incorrect canonical tags
5. **Internal linking** - Pages not well-linked from other pages

**Action Required:**
1. Identify which 26 pages are affected (check GSC)
2. For each page:
   - Add more unique, valuable content (500+ words minimum)
   - Ensure proper meta descriptions and titles
   - Add internal links from high-authority pages
   - Add images, structured data, and multimedia
   - Check for duplicate content across pages

---

### 3. Server error (5xx) (7 pages) 🔴 CRITICAL
**These pages are returning server errors when Google crawls them.**

**Possible Causes:**
1. **Build errors** - Pages failing during SSR/build
2. **Missing dependencies** - Components trying to import missing files
3. **API failures** - Edge functions or Supabase calls failing
4. **Timeout issues** - Pages taking too long to load

**Immediate Actions:**
1. Check server logs in Netlify/hosting provider
2. Test each affected URL directly
3. Check browser console for errors
4. Verify all dynamic imports work correctly
5. Test edge function endpoints

**To identify affected pages:**
- Go to GSC → Pages → Why pages aren't indexed → Server error (5xx)
- Click to see the list of affected URLs

---

### 4. Soft 404 (2 pages) ⚠️
**Pages returning 200 status but appearing empty or like 404s to Google**

**Possible Causes:**
1. Pages with minimal content that look empty
2. JavaScript rendering issues (content not visible to crawler)
3. Loading states showing instead of content
4. Error boundaries catching issues silently

**Solution:**
1. Ensure all pages have substantial visible content
2. Add server-side rendering or static generation
3. Check that content loads without JavaScript
4. Verify no error boundaries are hiding content

---

### 5. Excluded by 'noindex' tag (1 page) ✅
**This is correct** - Only 404/redirect pages should have noindex (which they do)

**Note:** If the count is higher than expected, check:
- Make sure no production pages accidentally have noindex
- Verify no conditional noindex logic on content pages

---

### 6. Duplicate without user-selected canonical (1 page) ⚠️
**Google found duplicate content but no canonical tag pointing to the preferred version**

**Solution:**
1. Identify the duplicate page in GSC
2. Add proper canonical tag to point to the main version
3. Consider using 301 redirect if the duplicate shouldn't exist

---

### 7. Alternate page with proper canonical tag (1 page) ✅
**This is working correctly** - Page has canonical pointing to another URL

---

## Recommended Action Plan

### Phase 1: Emergency Fixes (Do Now) 🔴

1. **Fix Server Errors (Highest Priority)**
   ```bash
   # Check build logs
   npm run build

   # Test all routes locally
   npm run preview
   ```

2. **Identify Affected Pages in GSC**
   - Export list of "Crawled - currently not indexed" pages
   - Export list of "Server error (5xx)" pages
   - Export list of "Soft 404" pages

3. **Fix Duplicate Content**
   - Find the page with "Duplicate without canonical"
   - Add proper canonical tag

### Phase 2: Content Optimization (This Week) ⚠️

For the 26 "Crawled - currently not indexed" pages:

1. **Audit Content Quality**
   - Minimum 500 words unique content per page
   - Add images and media
   - Ensure proper headings (H1, H2, H3)
   - Add schema markup

2. **Improve Internal Linking**
   - Link from homepage to important pages
   - Create content hubs
   - Add related content sections
   - Use descriptive anchor text

3. **Enhance Meta Data**
   - Unique meta descriptions (150-160 chars)
   - Compelling title tags (50-60 chars)
   - Relevant keywords naturally integrated

### Phase 3: Technical SEO (Ongoing) 📊

1. **Monitor Core Web Vitals**
   - LCP < 2.5s
   - FID < 100ms
   - CLS < 0.1

2. **Improve Crawlability**
   - Add breadcrumbs
   - Create HTML sitemap page
   - Ensure proper heading hierarchy

3. **Build Authority**
   - Get quality backlinks
   - Share content on social media
   - Engage with industry communities

---

## Diagnostic Commands

### Check for Build Errors
```bash
npm run build
```

### Test All Routes
```bash
npm run preview
# Then manually test each route
```

### Check for Duplicate Content
```bash
# Search for similar content across pages
grep -r "specific phrase" src/pages/
```

### Verify Canonical Tags
```bash
# Check all canonical tags are unique
grep -r "canonical" src/pages/ | sort | uniq -d
```

---

## Next Steps

1. **Get Specific URLs from GSC**
   - Go to each error category
   - Export the list of affected URLs
   - Share them so we can fix each one specifically

2. **Run Diagnostics**
   ```bash
   # Test build
   npm run build

   # Check for errors
   npm run lint
   ```

3. **Fix Critical Issues First**
   - Server errors (5xx)
   - Soft 404s
   - Duplicate content

4. **Optimize Content**
   - Expand thin content pages
   - Add more internal links
   - Improve page quality

---

## Monitoring

### Weekly Checks:
- Review GSC coverage report
- Check indexing status of priority pages
- Monitor impressions/clicks trends

### Monthly Audits:
- Full technical SEO audit
- Content quality review
- Backlink profile analysis

---

## Resources

- [Google Search Console](https://search.google.com/search-console)
- [Google's Indexing Guidelines](https://developers.google.com/search/docs/crawling-indexing)
- [Server Errors Guide](https://developers.google.com/search/docs/crawling-indexing/http-network-errors)
- [Soft 404 Guide](https://developers.google.com/search/docs/crawling-indexing/soft-404-errors)

---

**Last Updated:** December 25, 2025
