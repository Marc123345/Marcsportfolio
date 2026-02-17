import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense, useEffect } from 'react';
import Layout from '@/components/Layout';
import { Helmet } from 'react-helmet-async';
import ScrollProgress from '@/components/ScrollProgress';
import { useAppStore } from '@/stores/useAppStore';
import { NotFoundPage, RedirectPage } from '@/pages/StatusPages';
import CursorRipple from '@/components/CursorRipple';
import LoadingScreen from '@/components/LoadingScreen';
import { detectImageBlocking, setupImageErrorHandling } from '@/utils/imageBlockDetector';

// Lazy load with error handling
const lazyLoad = (importFunc) => {
  const Component = lazy(() => {
    return importFunc().catch(error => {
      console.error("Failed to load component:", error);
      return { default: () => <div>Failed to load this component. Please try refreshing the page.</div> };
    });
  });
  return <Component />;
};

// Loading fallback
function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#A3D1FF]"></div>
    </div>
  );
}

// Thank You Page
const ThankYouPage = () => (
  <div className="min-h-screen flex items-center justify-center bg-black">
    <div className="max-w-md text-center p-8">
      <div className="w-16 h-16 bg-[#A3D1FF]/20 rounded-full flex items-center justify-center mx-auto mb-6">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#A3D1FF]" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
      </div>
      <h1 className="text-3xl font-bold text-white mb-4">Thank You!</h1>
      <p className="text-gray-400 mb-8">Your message has been received. I'll get back to you within 24 hours.</p>
      <a 
        href="/"
        className="inline-flex items-center px-6 py-3 bg-[#A3D1FF] text-black rounded-lg hover:bg-[#92bce6] transition-colors"
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

      {/* Cursor Ripple Effect */}
      <CursorRipple color="#A3D1FF" opacity={0.4} size={60} duration={1} maxScale={3} />

      <Routes>
        <Route element={<Layout />}>
          <Route
            index
            element={
              <Suspense fallback={<PageLoader />}>
                {lazyLoad(() => import('@/pages/HomePage'))}
              </Suspense>
            }
          />
          <Route
            path="work"
            element={
              <Suspense fallback={<PageLoader />}>
                {lazyLoad(() => import('@/pages/WorkPage'))}
              </Suspense>
            }
          />
          <Route
            path="work/case-studies/*"
            element={
              <Suspense fallback={<PageLoader />}>
                {lazyLoad(() => import('@/pages/work/CaseStudiesPage'))}
              </Suspense>
            }
          />
          <Route
            path="services/*"
            element={
              <Suspense fallback={<PageLoader />}>
                {lazyLoad(() => import('@/pages/ServicesPage'))}
              </Suspense>
            }
          />
          <Route
            path="about"
            element={
              <Suspense fallback={<PageLoader />}>
                {lazyLoad(() => import('@/pages/AboutPage'))}
              </Suspense>
            }
          />
          <Route
            path="contact"
            element={
              <Suspense fallback={<PageLoader />}>
                {lazyLoad(() => import('@/pages/ContactPage'))}
              </Suspense>
            }
          />
          <Route
            path="press"
            element={
              <Suspense fallback={<PageLoader />}>
                {lazyLoad(() => import('@/pages/PressPage'))}
              </Suspense>
            }
          />
          <Route
            path="privacy-policy"
            element={
              <Suspense fallback={<PageLoader />}>
                {lazyLoad(() => import('@/pages/PrivacyPolicyPage'))}
              </Suspense>
            }
          />
          <Route
            path="terms-and-conditions"
            element={
              <Suspense fallback={<PageLoader />}>
                {lazyLoad(() => import('@/pages/TermsAndConditionsPage'))}
              </Suspense>
            }
          />
          <Route
            path="cookies-policy"
            element={
              <Suspense fallback={<PageLoader />}>
                {lazyLoad(() => import('@/pages/CookiesPolicyPage'))}
              </Suspense>
            }
          />
          <Route
            path="disclaimer"
            element={
              <Suspense fallback={<PageLoader />}>
                {lazyLoad(() => import('@/pages/DisclaimerPage'))}
              </Suspense>
            }
          />
          <Route
            path="acceptable-use-policy"
            element={
              <Suspense fallback={<PageLoader />}>
                {lazyLoad(() => import('@/pages/AcceptableUsePolicyPage'))}
              </Suspense>
            }
          />
          <Route
            path="dmca"
            element={
              <Suspense fallback={<PageLoader />}>
                {lazyLoad(() => import('@/pages/DMCAPage'))}
              </Suspense>
            }
          />

          {/* Blog Routes */}
          <Route
            path="blog"
            element={
              <Suspense fallback={<PageLoader />}>
                {lazyLoad(() => import('@/pages/BlogPage'))}
              </Suspense>
            }
          />

          <Route
            path="blog/context-driven-design-decisions"
            element={
              <Suspense fallback={<PageLoader />}>
                {lazyLoad(() => import('@/pages/blog/context-driven-design-decisions'))}
              </Suspense>
            }
          />
          <Route
            path="blog/ai-ready-design-systems"
            element={
              <Suspense fallback={<PageLoader />}>
                {lazyLoad(() => import('@/pages/blog/ai-ready-design-systems'))}
              </Suspense>
            }
          />
          <Route
            path="blog/ai-native-ux-personalization"
            element={
              <Suspense fallback={<PageLoader />}>
                {lazyLoad(() => import('@/pages/blog/ai-native-ux-personalization'))}
              </Suspense>
            }
          />
          <Route
            path="blog/ai-as-codesigner"
            element={
              <Suspense fallback={<PageLoader />}>
                {lazyLoad(() => import('@/pages/blog/ai-as-codesigner'))}
              </Suspense>
            }
          />
          <Route
            path="blog/google-algorithm-update-2026"
            element={
              <Suspense fallback={<PageLoader />}>
                {lazyLoad(() => import('@/pages/blog/google-algorithm-update-2026'))}
              </Suspense>
            }
          />
          <Route
            path="blog/ai-imperfect-aesthetics"
            element={
              <Suspense fallback={<PageLoader />}>
                {lazyLoad(() => import('@/pages/blog/ai-imperfect-aesthetics'))}
              </Suspense>
            }
          />
          <Route
            path="blog/brutalism-anti-design-web-trends"
            element={
              <Suspense fallback={<PageLoader />}>
                {lazyLoad(() => import('@/pages/blog/brutalism-anti-design-web-trends'))}
              </Suspense>
            }
          />
          <Route
            path="blog/ecommerce-ux-flaws-killing-conversions"
            element={
              <Suspense fallback={<PageLoader />}>
                {lazyLoad(() => import('@/pages/blog/ecommerce-ux-flaws-killing-conversions'))}
              </Suspense>
            }
          />
          <Route
            path="blog/contrast-balance-ui-design"
            element={
              <Suspense fallback={<PageLoader />}>
                {lazyLoad(() => import('@/pages/blog/contrast-balance-ui-design'))}
              </Suspense>
            }
          />
          <Route
            path="blog/ui-polish-visual-realism"
            element={
              <Suspense fallback={<PageLoader />}>
                {lazyLoad(() => import('@/pages/blog/ui-polish-visual-realism'))}
              </Suspense>
            }
          />
          <Route
            path="blog/getting-the-best-out-of-cloudflare"
            element={
              <Suspense fallback={<PageLoader />}>
                {lazyLoad(() => import('@/pages/blog/getting-the-best-out-of-cloudflare'))}
              </Suspense>
            }
          />
          <Route
            path="blog/building-data-driven-design-systems"
            element={
              <Suspense fallback={<PageLoader />}>
                {lazyLoad(() => import('@/pages/blog/building-data-driven-design-systems'))}
              </Suspense>
            }
          />
          <Route
            path="blog/conversion-rate-optimization-techniques"
            element={
              <Suspense fallback={<PageLoader />}>
                {lazyLoad(() => import('@/pages/blog/conversion-rate-optimization-techniques'))}
              </Suspense>
            }
          />
          <Route
            path="blog/designing-platforms-for-automotive-dealers"
            element={
              <Suspense fallback={<PageLoader />}>
                {lazyLoad(() => import('@/pages/blog/designing-platforms-for-automotive-dealers'))}
              </Suspense>
            }
          />
          <Route
            path="blog/future-of-saas-web-design"
            element={
              <Suspense fallback={<PageLoader />}>
                {lazyLoad(() => import('@/pages/blog/future-of-saas-web-design'))}
              </Suspense>
            }
          />
          <Route
            path="blog/mobile-first-design-principles"
            element={
              <Suspense fallback={<PageLoader />}>
                {lazyLoad(() => import('@/pages/blog/mobile-first-design-principles'))}
              </Suspense>
            }
          />
          <Route
            path="blog/optimizing-websites-for-ai-crawlers"
            element={
              <Suspense fallback={<PageLoader />}>
                {lazyLoad(() => import('@/pages/blog/optimizing-websites-for-ai-crawlers'))}
              </Suspense>
            }
          />
          <Route
            path="blog/progressive-web-apps"
            element={
              <Suspense fallback={<PageLoader />}>
                {lazyLoad(() => import('@/pages/blog/progressive-web-apps'))}
              </Suspense>
            }
          />
          <Route
            path="blog/ai-personalization-ecommerce"
            element={
              <Suspense fallback={<PageLoader />}>
                {lazyLoad(() => import('@/pages/blog/ai-personalization-ecommerce'))}
              </Suspense>
            }
          />
          <Route
            path="blog/paving-contractor-website-design-guide"
            element={
              <Suspense fallback={<PageLoader />}>
                {lazyLoad(() => import('@/pages/blog/paving-contractor-website-design-guide'))}
              </Suspense>
            }
          />
          <Route
            path="blog/local-seo-for-paving-contractors"
            element={
              <Suspense fallback={<PageLoader />}>
                {lazyLoad(() => import('@/pages/blog/local-seo-for-paving-contractors'))}
              </Suspense>
            }
          />
          <Route
            path="blog/digital-marketing-asphalt-contractors"
            element={
              <Suspense fallback={<PageLoader />}>
                {lazyLoad(() => import('@/pages/blog/digital-marketing-asphalt-contractors'))}
              </Suspense>
            }
          />
          <Route
            path="blog/ngo-website-attract-donors-volunteers"
            element={
              <Suspense fallback={<PageLoader />}>
                {lazyLoad(() => import('@/pages/blog/ngo-website-attract-donors-volunteers'))}
              </Suspense>
            }
          />

          {/* Tools Routes */}
          <Route
            path="tools/website-analyzer"
            element={
              <Suspense fallback={<PageLoader />}>
                {lazyLoad(() => import('@/pages/tools/WebsiteAnalyzerPage'))}
              </Suspense>
            }
          />
          <Route
            path="tools/roi-calculator"
            element={
              <Suspense fallback={<PageLoader />}>
                {lazyLoad(() => import('@/pages/tools/ROICalculatorPage'))}
              </Suspense>
            }
          />
          <Route
            path="tools/project-timeline"
            element={
              <Suspense fallback={<PageLoader />}>
                {lazyLoad(() => import('@/pages/tools/ProjectTimelinePage'))}
              </Suspense>
            }
          />
          <Route
            path="tools/ai-crawler-optimization"
            element={
              <Suspense fallback={<PageLoader />}>
                {lazyLoad(() => import('@/pages/tools/AIWebsiteCrawlerPage'))}
              </Suspense>
            }
          />
          
          {/* Additional Service Routes */}
          <Route
            path="services/design-systems"
            element={
              <Suspense fallback={<PageLoader />}>
                {lazyLoad(() => import('@/pages/services/DesignSystemsPage'))}
              </Suspense>
            }
          />
          <Route
            path="services/premium-web-package"
            element={
              <Suspense fallback={<PageLoader />}>
                {lazyLoad(() => import('@/pages/services/PremiumWebPackage'))}
              </Suspense>
            }
          />
          <Route
            path="services/monthly-retainer"
            element={
              <Suspense fallback={<PageLoader />}>
                {lazyLoad(() => import('@/pages/services/MonthlyRetainerPackage'))}
              </Suspense>
            }
          />
          
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