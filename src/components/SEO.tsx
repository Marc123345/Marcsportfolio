import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: string;
  keywords?: string[];
  author?: string;
  structuredData?: Record<string, any>;
}

export default function SEO({
  title,
  description,
  canonicalUrl = 'https://www.marcfriedmanportfolio.com',
  ogImage = 'https://marcfriedmanportfolio.com/og-image.jpg',
  ogType = 'website',
  keywords = [],
  author = 'Marc Friedman',
  structuredData,
}: SEOProps) {
  const defaultKeywords = [
    'web development',
    'UI/UX design',
    'SaaS development',
    'full stack developer',
    'Tel Aviv developer',
    'Israel web development',
    'digital design',
    'Marc Friedman',
    'portfolio',
    'React developer',
    'Next.js',
    'TypeScript'
  ];

  const allKeywords = [...new Set([...defaultKeywords, ...keywords])].join(', ');
  const fullTitle = `${title} | Marc Friedman - Full Stack Designer & Developer`;
  
  // Ensure canonicalUrl is absolute
  const fullCanonicalUrl = canonicalUrl.startsWith('http') 
    ? canonicalUrl 
    : `https://www.marcfriedmanportfolio.com${canonicalUrl.startsWith('/') ? canonicalUrl : `/${canonicalUrl}`}`;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      <meta name="keywords" content={allKeywords} />
      <meta name="author" content={author} />
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={fullCanonicalUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={fullCanonicalUrl} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={ogImage} />
      
      {/* Additional SEO */}
      <link rel="canonical" href={fullCanonicalUrl} />
      
      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
}