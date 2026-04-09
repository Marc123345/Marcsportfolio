import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense, useEffect } from 'react';
import Layout from '@/components/Layout';
import { Helmet } from 'react-helmet-async';
import ScrollProgress from '@/components/ScrollProgress';
import { useAppStore } from '@/stores/useAppStore';
import { NotFoundPage, RedirectPage } from '@/pages/StatusPages';

import LoadingScreen from '@/components/LoadingScreen';
import { detectImageBlocking, setupImageErrorHandling } from '@/utils/imageBlockDetector';

function lazyWithRetry(importFunc: () => Promise<any>) {
  return lazy(() =>
    importFunc().catch(() => {
      return { default: () => <div className="min-h-screen flex items-center justify-center bg-black text-white"><p>Failed to load. Please <button onClick={() => window.location.reload()} className="text-[#A3D1FF] underline">refresh</button>.</p></div> };
    })
  );
}

const HomePage = lazyWithRetry(() => import('@/pages/HomePage'));
const WorkPage = lazyWithRetry(() => import('@/pages/WorkPage'));
const CaseStudiesPage = lazyWithRetry(() => import('@/pages/work/CaseStudiesPage'));
const ServicesPage = lazyWithRetry(() => import('@/pages/ServicesPage'));
const AboutPage = lazyWithRetry(() => import('@/pages/AboutPage'));
const ContactPage = lazyWithRetry(() => import('@/pages/ContactPage'));
const PressPage = lazyWithRetry(() => import('@/pages/PressPage'));
const PrivacyPolicyPage = lazyWithRetry(() => import('@/pages/PrivacyPolicyPage'));
const TermsAndConditionsPage = lazyWithRetry(() => import('@/pages/TermsAndConditionsPage'));
const CookiesPolicyPage = lazyWithRetry(() => import('@/pages/CookiesPolicyPage'));
const DisclaimerPage = lazyWithRetry(() => import('@/pages/DisclaimerPage'));
const AcceptableUsePolicyPage = lazyWithRetry(() => import('@/pages/AcceptableUsePolicyPage'));
const DMCAPage = lazyWithRetry(() => import('@/pages/DMCAPage'));
const BlogPage = lazyWithRetry(() => import('@/pages/BlogPage'));

const BlogContextDrivenDesign = lazyWithRetry(() => import('@/pages/blog/context-driven-design-decisions'));
const BlogAIReadyDesign = lazyWithRetry(() => import('@/pages/blog/ai-ready-design-systems'));
const BlogAINativeUX = lazyWithRetry(() => import('@/pages/blog/ai-native-ux-personalization'));
const BlogAICodesigner = lazyWithRetry(() => import('@/pages/blog/ai-as-codesigner'));
const BlogGoogleAlgo2026 = lazyWithRetry(() => import('@/pages/blog/google-algorithm-update-2026'));
const BlogAIImperfect = lazyWithRetry(() => import('@/pages/blog/ai-imperfect-aesthetics'));
const BlogBrutalism = lazyWithRetry(() => import('@/pages/blog/brutalism-anti-design-web-trends'));
const BlogEcommerceUX = lazyWithRetry(() => import('@/pages/blog/ecommerce-ux-flaws-killing-conversions'));
const BlogContrastBalance = lazyWithRetry(() => import('@/pages/blog/contrast-balance-ui-design'));
const BlogUIPolish = lazyWithRetry(() => import('@/pages/blog/ui-polish-visual-realism'));
const BlogCloudflare = lazyWithRetry(() => import('@/pages/blog/getting-the-best-out-of-cloudflare'));
const BlogDataDrivenDesign = lazyWithRetry(() => import('@/pages/blog/building-data-driven-design-systems'));
const BlogCRO = lazyWithRetry(() => import('@/pages/blog/conversion-rate-optimization-techniques'));
const BlogAutomotiveDealers = lazyWithRetry(() => import('@/pages/blog/designing-platforms-for-automotive-dealers'));
const BlogFutureSaaS = lazyWithRetry(() => import('@/pages/blog/future-of-saas-web-design'));
const BlogMobileFirst = lazyWithRetry(() => import('@/pages/blog/mobile-first-design-principles'));
const BlogAICrawlers = lazyWithRetry(() => import('@/pages/blog/optimizing-websites-for-ai-crawlers'));
const BlogPWA = lazyWithRetry(() => import('@/pages/blog/progressive-web-apps'));
const BlogAIEcommerce = lazyWithRetry(() => import('@/pages/blog/ai-personalization-ecommerce'));
const BlogPavingGuide = lazyWithRetry(() => import('@/pages/blog/paving-contractor-website-design-guide'));
const BlogLocalSEO = lazyWithRetry(() => import('@/pages/blog/local-seo-for-paving-contractors'));
const BlogAsphalt = lazyWithRetry(() => import('@/pages/blog/digital-marketing-asphalt-contractors'));
const BlogNGO = lazyWithRetry(() => import('@/pages/blog/ngo-website-attract-donors-volunteers'));
const BlogGEO = lazyWithRetry(() => import('@/pages/blog/what-is-geo'));
const BlogAEO = lazyWithRetry(() => import('@/pages/blog/what-is-aeo'));
const BlogMinimalUX = lazyWithRetry(() => import('@/pages/blog/minimal-fast-sustainable-ux'));
const BlogGSCAI = lazyWithRetry(() => import('@/pages/blog/google-search-console-ai-reports'));

const WebsiteAnalyzerPage = lazyWithRetry(() => import('@/pages/tools/WebsiteAnalyzerPage'));
const ROICalculatorPage = lazyWithRetry(() => import('@/pages/tools/ROICalculatorPage'));
const ProjectTimelinePage = lazyWithRetry(() => import('@/pages/tools/ProjectTimelinePage'));
const AIWebsiteCrawlerPage = lazyWithRetry(() => import('@/pages/tools/AIWebsiteCrawlerPage'));

const DesignSystemsPage = lazyWithRetry(() => import('@/pages/services/DesignSystemsPage'));
const PremiumWebPackage = lazyWithRetry(() => import('@/pages/services/PremiumWebPackage'));
const MonthlyRetainerPackage = lazyWithRetry(() => import('@/pages/services/MonthlyRetainerPackage'));

// Loading fallback
function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#A78BFA]"></div>
    </div>
  );
}

// Thank You Page
const ThankYouPage = () => (
  <div className="min-h-screen flex items-center justify-center bg-black">
    <div className="max-w-md text-center p-8">
      <div className="w-16 h-16 bg-[#A78BFA]/20 rounded-full flex items-center justify-center mx-auto mb-6">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#A78BFA]" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
      </div>
      <h1 className="text-3xl font-bold text-white mb-4">Thank You!</h1>
      <p className="text-gray-400 mb-8">Your message has been received. I'll get back to you within 24 hours.</p>
      <a 
        href="/"
        className="inline-flex items-center px-6 py-3 bg-[#A78BFA] text-black rounded-lg hover:bg-[#8B5CF6] transition-colors"
      >
        Return Home
      </a>
    </div>
  </div>
);

function App() {
  const { setLoaded } = useAppStore();
  
  // Force reset loading state on initial load
  useEffect(() => {
    // Set loaded to true immediately
    setLoaded(true);

    // Dispatch app-loaded event for any listeners
    document.dispatchEvent(new Event('app-loaded'));

    // Add a class to the body to prevent FOUC (Flash of Unstyled Content)
    document.body.classList.add('app-loaded');

    // Detect image blocking by extensions
    detectImageBlocking();

    // Setup error handling for images
    setupImageErrorHandling();

    // Remove the class when component is unmounted
    return () => {
      document.body.classList.remove('app-loaded');
    };
  }, [setLoaded]);
  
  return (
    <>
      <Helmet>
        <html lang="en" />
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
        <link rel="sitemap" type="application/xml" title="Sitemap" href="/sitemap.xml" />
        {/* Add preload for critical resources */}
        <link rel="preload" href="https://ik.imagekit.io/qcvroy8xpd/PW8VUKH.png?updatedAt=1759693058055&tr=f-webp" as="image" />
        {/* Add base styles to prevent FOUC */}
        <style>{`
          body {
            background-color: #000;
            color: #fff;
          }
        `}</style>
      </Helmet>
      
      {/* Loading Screen */}
      <LoadingScreen />

      {/* Scroll progress indicator */}
      <ScrollProgress />


      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Suspense fallback={<PageLoader />}><HomePage /></Suspense>} />
          <Route path="work" element={<Suspense fallback={<PageLoader />}><WorkPage /></Suspense>} />
          <Route path="work/case-studies/*" element={<Suspense fallback={<PageLoader />}><CaseStudiesPage /></Suspense>} />
          <Route path="services/*" element={<Suspense fallback={<PageLoader />}><ServicesPage /></Suspense>} />
          <Route path="about" element={<Suspense fallback={<PageLoader />}><AboutPage /></Suspense>} />
          <Route path="contact" element={<Suspense fallback={<PageLoader />}><ContactPage /></Suspense>} />
          <Route path="press" element={<Suspense fallback={<PageLoader />}><PressPage /></Suspense>} />
          <Route path="privacy-policy" element={<Suspense fallback={<PageLoader />}><PrivacyPolicyPage /></Suspense>} />
          <Route path="terms-and-conditions" element={<Suspense fallback={<PageLoader />}><TermsAndConditionsPage /></Suspense>} />
          <Route path="cookies-policy" element={<Suspense fallback={<PageLoader />}><CookiesPolicyPage /></Suspense>} />
          <Route path="disclaimer" element={<Suspense fallback={<PageLoader />}><DisclaimerPage /></Suspense>} />
          <Route path="acceptable-use-policy" element={<Suspense fallback={<PageLoader />}><AcceptableUsePolicyPage /></Suspense>} />
          <Route path="dmca" element={<Suspense fallback={<PageLoader />}><DMCAPage /></Suspense>} />

          <Route path="blog" element={<Suspense fallback={<PageLoader />}><BlogPage /></Suspense>} />
          <Route path="blog/context-driven-design-decisions" element={<Suspense fallback={<PageLoader />}><BlogContextDrivenDesign /></Suspense>} />
          <Route path="blog/ai-ready-design-systems" element={<Suspense fallback={<PageLoader />}><BlogAIReadyDesign /></Suspense>} />
          <Route path="blog/ai-native-ux-personalization" element={<Suspense fallback={<PageLoader />}><BlogAINativeUX /></Suspense>} />
          <Route path="blog/ai-as-codesigner" element={<Suspense fallback={<PageLoader />}><BlogAICodesigner /></Suspense>} />
          <Route path="blog/google-algorithm-update-2026" element={<Suspense fallback={<PageLoader />}><BlogGoogleAlgo2026 /></Suspense>} />
          <Route path="blog/ai-imperfect-aesthetics" element={<Suspense fallback={<PageLoader />}><BlogAIImperfect /></Suspense>} />
          <Route path="blog/brutalism-anti-design-web-trends" element={<Suspense fallback={<PageLoader />}><BlogBrutalism /></Suspense>} />
          <Route path="blog/ecommerce-ux-flaws-killing-conversions" element={<Suspense fallback={<PageLoader />}><BlogEcommerceUX /></Suspense>} />
          <Route path="blog/contrast-balance-ui-design" element={<Suspense fallback={<PageLoader />}><BlogContrastBalance /></Suspense>} />
          <Route path="blog/ui-polish-visual-realism" element={<Suspense fallback={<PageLoader />}><BlogUIPolish /></Suspense>} />
          <Route path="blog/getting-the-best-out-of-cloudflare" element={<Suspense fallback={<PageLoader />}><BlogCloudflare /></Suspense>} />
          <Route path="blog/building-data-driven-design-systems" element={<Suspense fallback={<PageLoader />}><BlogDataDrivenDesign /></Suspense>} />
          <Route path="blog/conversion-rate-optimization-techniques" element={<Suspense fallback={<PageLoader />}><BlogCRO /></Suspense>} />
          <Route path="blog/designing-platforms-for-automotive-dealers" element={<Suspense fallback={<PageLoader />}><BlogAutomotiveDealers /></Suspense>} />
          <Route path="blog/future-of-saas-web-design" element={<Suspense fallback={<PageLoader />}><BlogFutureSaaS /></Suspense>} />
          <Route path="blog/mobile-first-design-principles" element={<Suspense fallback={<PageLoader />}><BlogMobileFirst /></Suspense>} />
          <Route path="blog/optimizing-websites-for-ai-crawlers" element={<Suspense fallback={<PageLoader />}><BlogAICrawlers /></Suspense>} />
          <Route path="blog/progressive-web-apps" element={<Suspense fallback={<PageLoader />}><BlogPWA /></Suspense>} />
          <Route path="blog/ai-personalization-ecommerce" element={<Suspense fallback={<PageLoader />}><BlogAIEcommerce /></Suspense>} />
          <Route path="blog/paving-contractor-website-design-guide" element={<Suspense fallback={<PageLoader />}><BlogPavingGuide /></Suspense>} />
          <Route path="blog/local-seo-for-paving-contractors" element={<Suspense fallback={<PageLoader />}><BlogLocalSEO /></Suspense>} />
          <Route path="blog/digital-marketing-asphalt-contractors" element={<Suspense fallback={<PageLoader />}><BlogAsphalt /></Suspense>} />
          <Route path="blog/ngo-website-attract-donors-volunteers" element={<Suspense fallback={<PageLoader />}><BlogNGO /></Suspense>} />
          <Route path="blog/what-is-geo" element={<Suspense fallback={<PageLoader />}><BlogGEO /></Suspense>} />
          <Route path="blog/what-is-aeo" element={<Suspense fallback={<PageLoader />}><BlogAEO /></Suspense>} />
          <Route path="blog/minimal-fast-sustainable-ux" element={<Suspense fallback={<PageLoader />}><BlogMinimalUX /></Suspense>} />
          <Route path="blog/google-search-console-ai-reports" element={<Suspense fallback={<PageLoader />}><BlogGSCAI /></Suspense>} />

          <Route path="tools/website-analyzer" element={<Suspense fallback={<PageLoader />}><WebsiteAnalyzerPage /></Suspense>} />
          <Route path="tools/roi-calculator" element={<Suspense fallback={<PageLoader />}><ROICalculatorPage /></Suspense>} />
          <Route path="tools/project-timeline" element={<Suspense fallback={<PageLoader />}><ProjectTimelinePage /></Suspense>} />
          <Route path="tools/ai-crawler-optimization" element={<Suspense fallback={<PageLoader />}><AIWebsiteCrawlerPage /></Suspense>} />

          <Route path="services/design-systems" element={<Suspense fallback={<PageLoader />}><DesignSystemsPage /></Suspense>} />
          <Route path="services/premium-web-package" element={<Suspense fallback={<PageLoader />}><PremiumWebPackage /></Suspense>} />
          <Route path="services/monthly-retainer" element={<Suspense fallback={<PageLoader />}><MonthlyRetainerPackage /></Suspense>} />
          
          <Route path="thank-you" element={<ThankYouPage />} />

          {/* Status code pages */}
          <Route path="404" element={<NotFoundPage />} />
          <Route path="301" element={<RedirectPage permanent={true} />} />
          <Route path="302" element={<RedirectPage permanent={false} />} />

          {/* Catch all route - show 404 page for unknown routes */}
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;