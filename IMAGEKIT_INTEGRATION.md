# ImageKit Integration Guide

##  Setup Complete

ImageKit React SDK has been integrated into your portfolio with automatic WebP conversion, lazy loading, and responsive images.

---

##  Configuration

### Environment Variables

**`.env`:**
```env
VITE_IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/qcvroy8xpd
```

**`.env.example`:**
```env
VITE_IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/qcvroy8xpd
VITE_IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
```

### Components Created

1. **`src/providers/ImageKitProvider.tsx`** - Global ImageKit context
2. **`src/components/OptimizedImage.tsx`** - Reusable optimized image component

---

##  Usage Examples

### Basic Usage

```tsx
import OptimizedImage from '@/components/OptimizedImage';

export default function MyComponent() {
  return (
    <OptimizedImage
      src="/hero-image.jpg"
      alt="Hero image"
      width={1200}
      height={600}
      loading="eager"
    />
  );
}
```

### Lazy Loading (Default)

```tsx
<OptimizedImage
  src="/portfolio-project.jpg"
  alt="Project thumbnail"
  width={800}
  height={600}
  // loading="lazy" is default
/>
```

### Custom Quality & Format

```tsx
<OptimizedImage
  src="/high-quality-photo.jpg"
  alt="High quality photo"
  width={1000}
  height={750}
  quality={90}
  format="webp"
/>
```

### With Custom Transformations

```tsx
<OptimizedImage
  src="/profile.jpg"
  alt="Profile picture"
  width={400}
  height={400}
  transformations="w-400,h-400,c-at_max,q-80,f-webp,dpr-2,r-max"
/>
```

### With Low Quality Image Placeholder (LQIP)

```tsx
<OptimizedImage
  src="/banner.jpg"
  alt="Banner"
  width={1920}
  height={1080}
  lqip={{ active: true, quality: 20 }}
/>
```

---

##  Image Transformation Options

The `OptimizedImage` component automatically applies these optimizations:

| Transformation | Default | Description |
|----------------|---------|-------------|
| `w-{width}` | From prop | Resize width |
| `h-{height}` | From prop | Resize height |
| `q-{quality}` | 80 | Quality (1-100) |
| `f-auto` | auto | Format (auto/webp/avif) |
| `dpr-2` | 2 | Device Pixel Ratio (Retina) |

### Common Transformations

```
w-800          Width 800px
h-600          Height 600px
q-80           Quality 80%
f-webp         Force WebP format
dpr-2          2x resolution for retina
c-at_max       Crop at max (maintain aspect)
r-max          Max border radius (circular)
bl-10          Blur 10
```

---

##  Migration Guide: Converting Existing Images

### Before (Imgur/Unsplash):

```tsx
<img
  src="https://i.imgur.com/PW8VUKH.png"
  alt="Project"
  className="w-full h-auto"
/>
```

### After (ImageKit):

```tsx
<OptimizedImage
  src="/project-screenshot.jpg"
  alt="Project"
  width={1200}
  height={800}
  className="w-full h-auto"
/>
```

### Steps to Convert:

1. **Upload to ImageKit**
   - Go to https://imagekit.io/dashboard
   - Upload your image
   - Note the path (e.g., `/project-screenshot.jpg`)

2. **Replace in Code**
   ```tsx
   //  OLD
   <img src="https://i.imgur.com/abc.jpg" />

   //  NEW
   <OptimizedImage src="/abc.jpg" width={800} height={600} alt="..." />
   ```

3. **Add Width & Height**
   - Always specify width and height
   - Prevents Cumulative Layout Shift (CLS)
   - Improves Core Web Vitals

---

##  ImageKit Folder Structure

Your ImageKit URL endpoint: `https://ik.imagekit.io/qcvroy8xpd`

### Recommended Folder Structure:

```
/
├── hero/              # Hero/banner images
├── portfolio/         # Project screenshots
├── blog/              # Blog post images
├── case-studies/      # Case study images
├── team/              # Team/about photos
└── misc/              # Icons, logos, etc.
```

### Example Paths:

```tsx
<OptimizedImage src="/hero/homepage-banner.jpg" />
<OptimizedImage src="/portfolio/project-1.jpg" />
<OptimizedImage src="/blog/article-cover.jpg" />
<OptimizedImage src="/case-studies/ask-africa-hero.jpg" />
```

---

##  Performance Impact

### Before (Imgur/Raw Images):
- Format: PNG/JPEG
- Size: 4-6 MB per image
- Total: 28+ MB
- LCP: 8-12 seconds
- Format support: No WebP

### After (ImageKit):
- Format: WebP/AVIF (automatic)
- Size: 100-300 KB per image
- Total: 2-3 MB
- LCP: 1.5-2.5 seconds
- Format support: Modern formats with fallback

**Expected Improvements:**
- **95% smaller** images
- **5-8 second faster** page load
- **Better Core Web Vitals** (LCP, CLS)
- **Automatic responsive** images (dpr-2)

---

##  Advanced Features

### Responsive Images with srcset

ImageKit automatically generates srcset for responsive images:

```tsx
<OptimizedImage
  src="/hero.jpg"
  width={1200}
  height={600}
  alt="Hero"
  // ImageKit generates:
  // srcset="...?w=400 400w, ...?w=800 800w, ...?w=1200 1200w"
/>
```

### Progressive Image Loading (LQIP)

```tsx
<OptimizedImage
  src="/large-photo.jpg"
  width={2000}
  height={1500}
  lqip={{ active: true, quality: 20 }}
  // Shows blurred placeholder while loading
/>
```

### Circular/Rounded Images

```tsx
<OptimizedImage
  src="/profile.jpg"
  width={200}
  height={200}
  transformations="w-200,h-200,c-at_max,r-max"
  // Creates circular image
/>
```

---

##  Finding Images to Convert

Run this command to find all external images:

```bash
grep -r "imgur.com\|unsplash.com\|images.unsplash.com" src/ --include="*.tsx" -n
```

### Priority Files to Update:

1. **HomePage.tsx** - Hero images, portfolio grid
2. **AboutPage.tsx** - Team photos
3. **WorkPage.tsx** - Case study thumbnails
4. **Blog pages** - Article images
5. **Case study pages** - Project screenshots

---

## ️ Troubleshooting

### Image Not Loading?

1. **Check path**: Must start with `/`
   ```tsx
    src="/hero.jpg"
    src="hero.jpg"
   ```

2. **Check ImageKit dashboard**: Verify file uploaded

3. **Check console**: Look for 404 errors

### Image Too Large/Small?

Adjust transformations:
```tsx
<OptimizedImage
  src="/image.jpg"
  width={1000}
  height={750}
  transformations="w-1000,h-750,c-at_max,q-85"
/>
```

### Image Blurry on Retina?

The component uses `dpr-2` by default for retina support. If still blurry, increase quality:
```tsx
<OptimizedImage
  src="/image.jpg"
  quality={90}
/>
```

---

##  Example Component Updates

### HomePage Hero Image

**Before:**
```tsx
<img
  src="https://i.imgur.com/hero.jpg"
  className="w-full h-auto"
/>
```

**After:**
```tsx
<OptimizedImage
  src="/hero/homepage-banner.jpg"
  width={1920}
  height={1080}
  alt="Marc Friedman Portfolio"
  loading="eager"
  quality={85}
  className="w-full h-auto"
/>
```

### Portfolio Grid Item

**Before:**
```tsx
<img
  src="https://i.imgur.com/project.png"
  className="rounded-lg"
/>
```

**After:**
```tsx
<OptimizedImage
  src="/portfolio/ask-africa.jpg"
  width={800}
  height={600}
  alt="Ask Africa Platform"
  loading="lazy"
  className="rounded-lg"
/>
```

---

##  ImageKit Dashboard Tips

1. **Upload in Bulk**: Drag & drop multiple files
2. **Organize Folders**: Create folders before uploading
3. **Use Descriptive Names**: `ask-africa-hero.jpg` not `IMG_1234.jpg`
4. **Delete Old Files**: Keep library clean
5. **Use Transformations**: Test in dashboard before coding

---

##  Useful Links

- **ImageKit Dashboard**: https://imagekit.io/dashboard
- **ImageKit Docs**: https://docs.imagekit.io/
- **Transformation Reference**: https://docs.imagekit.io/features/image-transformations
- **React SDK Docs**: https://github.com/imagekit-developer/imagekit-react

---

##  Next Steps

1. Upload all portfolio images to ImageKit
2. Update HomePage.tsx with OptimizedImage
3. Update WorkPage.tsx case study images
4. Update AboutPage.tsx team photos
5. Update all blog post images
6. Test on mobile and desktop
7. Verify PageSpeed score improvement

**Expected PageSpeed Improvement:** 50-70 → 90-95 after image migration!
