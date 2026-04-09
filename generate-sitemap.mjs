import { SitemapStream, streamToPromise } from 'sitemap';
import { Readable } from 'stream';
import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { dirname } from 'path';

// Define your website URL
const baseUrl = 'https://www.marcfriedmanportfolio.com';

// Define all your routes with metadata
const routes = [
  // Main pages
  {
    url: '/',
    changefreq: 'daily',
    priority: 1.0,
    lastmod: new Date().toISOString(),
    img: [
      {
        url: 'https://i.imgur.com/PW8VUKH.png',
        caption: 'Marc Friedman - Websites That Convert for Agencies, Local Businesses & Jewellery Brands',
        title: 'Marc Friedman - Full Stack Developer & Web Designer'
      }
    ]
  },
  {
    url: '/work',
    changefreq: 'weekly',
    priority: 0.9,
    lastmod: new Date().toISOString(),
    img: [
      {
        url: 'https://i.imgur.com/IU0mmH7.jpeg',
        caption: 'Portfolio Work',
        title: 'Featured Projects'
      }
    ]
  },
  {
    url: '/services',
    changefreq: 'weekly',
    priority: 0.9,
    lastmod: new Date().toISOString()
  },
  {
    url: '/about',
    changefreq: 'weekly',
    priority: 0.9,
    lastmod: new Date().toISOString(),
    img: [
      {
        url: 'https://i.imgur.com/PW8VUKH.png',
        caption: 'Marc Friedman - High-Performance React/Node Websites',
        title: 'Marc Friedman Profile'
      }
    ]
  },
  {
    url: '/contact',
    changefreq: 'monthly',
    priority: 0.8,
    lastmod: new Date().toISOString()
  },
  {
    url: '/blog',
    changefreq: 'weekly',
    priority: 0.8,
    lastmod: new Date().toISOString()
  },
  {
    url: '/press',
    changefreq: 'monthly',
    priority: 0.7,
    lastmod: new Date().toISOString()
  },

  // Legal pages
  { url: '/privacy-policy', changefreq: 'yearly', priority: 0.3, lastmod: new Date().toISOString() },
  { url: '/terms-and-conditions', changefreq: 'yearly', priority: 0.3, lastmod: new Date().toISOString() },
  { url: '/cookies-policy', changefreq: 'yearly', priority: 0.3, lastmod: new Date().toISOString() },
  { url: '/disclaimer', changefreq: 'yearly', priority: 0.3, lastmod: new Date().toISOString() },
  { url: '/acceptable-use-policy', changefreq: 'yearly', priority: 0.3, lastmod: new Date().toISOString() },
  { url: '/dmca', changefreq: 'yearly', priority: 0.3, lastmod: new Date().toISOString() },

  // Work case studies
  { url: '/work/case-studies/binns-media', changefreq: 'monthly', priority: 0.8, lastmod: new Date().toISOString() },
  { url: '/work/case-studies/untapped-africa', changefreq: 'monthly', priority: 0.8, lastmod: new Date().toISOString() },
  { url: '/work/case-studies/automarginx', changefreq: 'monthly', priority: 0.8, lastmod: new Date().toISOString() },
  { url: '/work/case-studies/videoleap', changefreq: 'monthly', priority: 0.7, lastmod: new Date().toISOString() },
  { url: '/work/case-studies/chad-le-clos', changefreq: 'monthly', priority: 0.7, lastmod: new Date().toISOString() },
  { url: '/work/case-studies/mytube', changefreq: 'monthly', priority: 0.7, lastmod: new Date().toISOString() },
  { url: '/work/case-studies/fleet-management', changefreq: 'monthly', priority: 0.7, lastmod: new Date().toISOString() },
  { url: '/work/case-studies/friedman-cohen', changefreq: 'monthly', priority: 0.7, lastmod: new Date().toISOString() },
  { url: '/work/case-studies/secure-annapolis', changefreq: 'monthly', priority: 0.7, lastmod: new Date().toISOString() },
  { url: '/work/case-studies/ilight', changefreq: 'monthly', priority: 0.7, lastmod: new Date().toISOString() },
  { url: '/work/case-studies/paving-leads', changefreq: 'monthly', priority: 0.7, lastmod: new Date().toISOString() },
  { url: '/work/case-studies/tar-chip-paving', changefreq: 'monthly', priority: 0.7, lastmod: new Date().toISOString() },

  // Services
  { url: '/services/web-development', changefreq: 'monthly', priority: 0.9, lastmod: new Date().toISOString() },
  { url: '/services/design', changefreq: 'monthly', priority: 0.9, lastmod: new Date().toISOString() },
  { url: '/services/saas', changefreq: 'monthly', priority: 0.8, lastmod: new Date().toISOString() },
  { url: '/services/startup-mvp', changefreq: 'monthly', priority: 0.8, lastmod: new Date().toISOString() },
  { url: '/services/mentorship', changefreq: 'monthly', priority: 0.8, lastmod: new Date().toISOString() },
  { url: '/services/ai-integration', changefreq: 'monthly', priority: 0.8, lastmod: new Date().toISOString() },
  { url: '/services/cybersecurity', changefreq: 'monthly', priority: 0.8, lastmod: new Date().toISOString() },
  { url: '/services/fractional-cmo', changefreq: 'monthly', priority: 0.8, lastmod: new Date().toISOString() },
  { url: '/services/design-systems', changefreq: 'monthly', priority: 0.8, lastmod: new Date().toISOString() },
  { url: '/services/external-web-department', changefreq: 'monthly', priority: 0.8, lastmod: new Date().toISOString() },
  { url: '/services/premium-web-package', changefreq: 'monthly', priority: 0.8, lastmod: new Date().toISOString() },
  { url: '/services/monthly-retainer', changefreq: 'monthly', priority: 0.8, lastmod: new Date().toISOString() },
  { url: '/services/impact-story-site', changefreq: 'monthly', priority: 0.9, lastmod: new Date().toISOString() },

  // Tools
  { url: '/tools/website-analyzer', changefreq: 'monthly', priority: 0.7, lastmod: new Date().toISOString() },
  { url: '/tools/roi-calculator', changefreq: 'monthly', priority: 0.7, lastmod: new Date().toISOString() },
  { url: '/tools/project-timeline', changefreq: 'monthly', priority: 0.7, lastmod: new Date().toISOString() },
  { url: '/tools/ai-crawler-optimization', changefreq: 'monthly', priority: 0.7, lastmod: new Date().toISOString() },
  { url: '/tools/ai-website-crawler', changefreq: 'monthly', priority: 0.7, lastmod: new Date().toISOString() },

  // Blog posts
  { url: '/blog/ai-native-ux-personalization', changefreq: 'monthly', priority: 0.7, lastmod: new Date().toISOString() },
  { url: '/blog/ai-as-codesigner', changefreq: 'monthly', priority: 0.7, lastmod: new Date().toISOString() },
  { url: '/blog/google-algorithm-update-2026', changefreq: 'monthly', priority: 0.7, lastmod: new Date().toISOString() },
  { url: '/blog/ai-imperfect-aesthetics', changefreq: 'monthly', priority: 0.7, lastmod: new Date().toISOString() },
  { url: '/blog/brutalism-anti-design-web-trends', changefreq: 'monthly', priority: 0.7, lastmod: new Date().toISOString() },
  { url: '/blog/ecommerce-ux-flaws-killing-conversions', changefreq: 'monthly', priority: 0.7, lastmod: new Date().toISOString() },
  { url: '/blog/contrast-balance-ui-design', changefreq: 'monthly', priority: 0.7, lastmod: new Date().toISOString() },
  { url: '/blog/ui-polish-visual-realism', changefreq: 'monthly', priority: 0.7, lastmod: new Date().toISOString() },
  { url: '/blog/building-data-driven-design-systems', changefreq: 'monthly', priority: 0.7, lastmod: new Date().toISOString() },
  { url: '/blog/conversion-rate-optimization-techniques', changefreq: 'monthly', priority: 0.7, lastmod: new Date().toISOString() },
  { url: '/blog/designing-platforms-for-automotive-dealers', changefreq: 'monthly', priority: 0.7, lastmod: new Date().toISOString() },
  { url: '/blog/getting-the-best-out-of-cloudflare', changefreq: 'monthly', priority: 0.7, lastmod: new Date().toISOString() },
  { url: '/blog/future-of-saas-web-design', changefreq: 'monthly', priority: 0.7, lastmod: new Date().toISOString() },
  { url: '/blog/mobile-first-design-principles', changefreq: 'monthly', priority: 0.7, lastmod: new Date().toISOString() },
  { url: '/blog/optimizing-websites-for-ai-crawlers', changefreq: 'monthly', priority: 0.7, lastmod: new Date().toISOString() },
  { url: '/blog/progressive-web-apps', changefreq: 'monthly', priority: 0.7, lastmod: new Date().toISOString() },
  { url: '/blog/ai-personalization-ecommerce', changefreq: 'monthly', priority: 0.7, lastmod: new Date().toISOString() },
  { url: '/blog/paving-contractor-website-design-guide', changefreq: 'monthly', priority: 0.7, lastmod: new Date().toISOString() },
  { url: '/blog/local-seo-for-paving-contractors', changefreq: 'monthly', priority: 0.7, lastmod: new Date().toISOString() },
  { url: '/blog/digital-marketing-asphalt-contractors', changefreq: 'monthly', priority: 0.7, lastmod: new Date().toISOString() },
  { url: '/blog/ngo-website-attract-donors-volunteers', changefreq: 'monthly', priority: 0.7, lastmod: new Date().toISOString() },
  { url: '/blog/google-search-console-ai-reports', changefreq: 'monthly', priority: 0.7, lastmod: new Date().toISOString() }
];

async function generateSitemap() {
  try {
    // Create a stream to write to
    const stream = new SitemapStream({ 
      hostname: baseUrl,
      xmlns: {
        news: false,
        xhtml: true,
        image: true,
        video: false
      }
    });
    
    // Ensure the dist directory exists
    const distDir = './dist';
    if (!existsSync(distDir)) {
      mkdirSync(distDir, { recursive: true });
    }
    
    // Add all routes to the sitemap
    const data = await streamToPromise(Readable.from(routes).pipe(stream));
    
    // Write the XML to file
    writeFileSync('./dist/sitemap.xml', data.toString());
    console.log('Sitemap generated successfully at ./dist/sitemap.xml');
  } catch (error) {
    console.error('Error generating sitemap:', error);
    process.exit(1);
  }
}

generateSitemap();