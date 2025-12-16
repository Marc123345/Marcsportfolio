# Performance Optimization Guide

##  Completed Optimizations

### 1. JavaScript Optimization
- **Removed Termly scripts** (183 KB saved)
- **Deferred Google Analytics** - loads after page interactive (2s delay)
- **Removed Apollo tracking from head**
- **Removed GTM** - using lightweight GA only
- **Removed chunk retry logic** - simplified HTML from 300+ lines to ~110 lines
- **Removed unnecessary preloads and prefetch**

### 2. HTML Optimization
- **Removed cache-busting headers** that prevented proper caching
- **Removed redundant DNS prefetch** (Imgur, Unsplash, Cloudinary, etc.)
- **Kept only ImageKit preconnect** for image hosting
- **Simplified service worker registration**

### 3. Caching Strategy
- Removed `no-cache` headers from HTML
- Assets now cache properly with long TTL
- Service worker provides offline caching

##  Critical Next Steps

### PRIORITY 1: Image Optimization (THE BIGGEST WIN)

All images **MUST** be converted to WebP via ImageKit. Current images are 4-6MB each!

#### Image Conversion Checklist:

1. **Upload to ImageKit**:
   - Go to ImageKit dashboard
   - Upload all project images
   - Get WebP URLs with transformations

2. **ImageKit URL Format**:
   ```
   https://ik.imagekit.io/YOUR_ID/image-name.jpg?tr=f-webp,w-800,q-80
   ```

3. **Required Transformations**:
   - `f-webp` - Convert to WebP
   - `w-{width}` - Resize to display size (400-1200px max)
   - `q-80` - Quality 80% (balance size vs quality)
   - `dpr-2` - Support retina displays

4. **Example Conversions**:
   ```tsx
   //  OLD (4MB, PNG, Imgur)
   <img src="https://i.imgur.com/PW8VUKH.png" />

   //  NEW (150KB, WebP, proper size)
   <img
     src="https://ik.imagekit.io/qcvroy8xpd/hero.jpg?tr=f-webp,w-800,q-80"
     width="800"
     height="600"
     loading="lazy"
     alt="Description"
   />
   ```

5. **Add to ALL Images**:
   - `width` and `height` attributes (prevents CLS)
   - `loading="lazy"` (except hero/above-fold)
   - `alt` text for accessibility

### Files to Update:

Search for `imgur.com` and `unsplash.com` in:
- `src/pages/HomePage.tsx` - Hero images, portfolio grid
- `src/pages/AboutPage.tsx` - Profile photo
- `src/pages/WorkPage.tsx` - Case study thumbnails
- `src/pages/blog/*.tsx` - Blog post images
- `src/pages/work/case-studies/*.tsx` - Case study images
- `src/components/PortfolioShowcase.tsx` - Portfolio images

### PRIORITY 2: Animation Optimization

Replace all animations using:
-  `border-radius`, `box-shadow`, `height`, `width`
-  `transform`, `opacity` only

These are GPU-accelerated and don't cause layout shifts.

**Example Fix**:
```tsx
//  BAD - Causes layout recalculation
<motion.div
  animate={{ borderRadius: '50%', boxShadow: '0 10px 30px' }}
/>

//  GOOD - GPU accelerated
<motion.div
  animate={{ scale: 1.1, opacity: 1 }}
/>
```

### PRIORITY 3: Remove Unused Dependencies

Check and remove if not used:
```bash
npm uninstall @tanstack/react-query  # If not used
npm uninstall uri-js                  # If not used
```

##  Expected Results After Full Optimization

### Before:
- **Page Weight**: 28 MB+
- **Images**: 4-6 MB each (PNG/JPEG from Imgur)
- **JS Blocking**: GTM, GA, Termly (320 KB+ blocking)
- **LCP**: 8-12 seconds
- **CLS**: 0.25+

### After (with image optimization):
- **Page Weight**: 2-3 MB
- **Images**: 100-300 KB each (WebP from ImageKit)
- **JS Blocking**: 0 KB (all deferred)
- **LCP**: 1.5-2.5 seconds
- **CLS**: < 0.1

##  Cloudflare Settings

### Enable in Cloudflare Dashboard:

1. **Speed** → **Optimization**:
   -  Auto Minify (HTML, CSS, JS)
   -  Brotli compression
   -  Rocket Loader (disable - causes issues)
   -  Early Hints

2. **Caching** → **Configuration**:
   - Browser Cache TTL: 30 days
   - Edge Cache TTL: 7 days

3. **Rules** → **Page Rules**:
   ```
   *.js, *.css, *.woff2, *.webp
   Cache Level: Cache Everything
   Edge Cache TTL: 1 month
   Browser Cache TTL: 1 month
   ```

##  Testing Checklist

After deploying optimizations:

1. **PageSpeed Insights**: https://pagespeed.web.dev/
   - Target: 90+ mobile, 95+ desktop

2. **WebPageTest**: https://webpagetest.org/
   - Target: LCP < 2.5s, CLS < 0.1

3. **Check Image Formats**:
   - Open DevTools → Network → Img
   - Verify all are WebP, 100-300 KB

4. **Check Cache Headers**:
   - Open DevTools → Network → Headers
   - Verify `cache-control: max-age=2592000` (30 days)

5. **Check Blocking Resources**:
   - Performance → Coverage
   - Verify < 20% unused JS

##  Quick Wins Summary

1.  Removed 320 KB of blocking JavaScript (Termly, GTM, Apollo)
2.  Deferred analytics (no blocking)
3.  Fixed caching headers
4.  Simplified HTML (300 → 110 lines)
5.  **Next**: Convert all images to WebP (28 MB → 2 MB)
6.  **Next**: Add width/height to images (fix CLS)
7.  **Next**: Optimize animations (GPU only)

## Need Help?

Run this command to find all images needing conversion:
```bash
grep -r "imgur.com\|unsplash.com" src/ --include="*.tsx"
```

This will show every file with images that need ImageKit conversion.
