import React from 'react';
import { Helmet } from 'react-helmet-async';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AIWebsiteAnalyzer from '@/components/AIWebsiteAnalyzer';

export default function WebsiteAnalyzerPage() {
  const navigate = useNavigate();
  
  // Structured data for SEO
  const toolSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "AI Website Analyzer - Free Website Analysis Tool",
    "applicationCategory": "WebApplication",
    "operatingSystem": "All",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "description": "Get an instant AI-powered analysis of your website's design, performance, and conversion potential. Discover actionable improvements in seconds.",
    "creator": {
      "@type": "Person",
      "name": "Marc Friedman"
    }
  };

  return (
    <>
      <Helmet>
        <title>Free AI Website Analyzer Tool | Instant Website Analysis | Marc Friedman</title>
        <meta name="description" content="Get an instant AI-powered analysis of your website's design, performance, and conversion potential. Free tool provides actionable insights in 30 seconds to improve your website's effectiveness." />
        <meta name="keywords" content="website analyzer, website audit, UX analysis, conversion optimization, website performance, free website tool" />
        <link rel="canonical" href="https://www.marcfriedmanportfolio.com/tools/website-analyzer" />
        <script type="application/ld+json">
          {JSON.stringify(toolSchema)}
        </script>
      </Helmet>

      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 bg-black">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Free Website Analyzer
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Get an instant AI-powered analysis of your website's design, performance, and conversion potential. Discover actionable improvements in seconds.
          </p>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <AIWebsiteAnalyzer />
          
          <div className="mt-16 bg-[#1b1b1b] p-8 rounded-xl border border-white/10">
            <h2 className="text-2xl font-bold text-white mb-6">Why Analyze Your Website?</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-white mb-3">Identify Issues</h3>
                <p className="text-gray-400">
                  Discover hidden problems that could be costing you leads and customers every day.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-white mb-3">Improve Conversions</h3>
                <p className="text-gray-400">
                  Learn how to optimize your site to turn more visitors into leads and customers.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-white mb-3">Stay Competitive</h3>
                <p className="text-gray-400">
                  Ensure your website meets modern standards and outperforms your competitors.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#1b1b1b]">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">Get Expert Help</h2>
              <p className="text-gray-400 mb-6">
                While our free analyzer provides valuable insights, nothing beats a personalized review from an expert. Book a free strategy call to discuss:
              </p>
              
              <ul className="space-y-4">
                <li className="flex items-start">
                  <ArrowRight className="w-5 h-5 text-[#A3D1FF] mt-1 mr-3" />
                  <p className="text-gray-300">In-depth analysis of your specific business goals</p>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="w-5 h-5 text-[#A3D1FF] mt-1 mr-3" />
                  <p className="text-gray-300">Custom conversion strategy tailored to your audience</p>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="w-5 h-5 text-[#A3D1FF] mt-1 mr-3" />
                  <p className="text-gray-300">Competitive analysis and positioning recommendations</p>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="w-5 h-5 text-[#A3D1FF] mt-1 mr-3" />
                  <p className="text-gray-300">Actionable roadmap for implementation</p>
                </li>
              </ul>
              
              <button 
                onClick={() => navigate('/contact')}
                className="mr_btn mr_btn_primary"
              >
                <span>Book a Free Strategy Call</span>
              </button>
            </div>
            
            <div>
              <img 
                src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&q=80" 
                alt="Website analysis and optimization strategy consultation"
                className="rounded-xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Transform Your Website?</h2>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Let's create a website that doesn't just look great, but actively converts visitors into leads and customers.
          </p>
          <button 
            onClick={() => navigate('/contact')}
            className="mr_btn mr_btn_outline"
          >
            <span>Book a Free Strategy Call</span>
          </button>
        </div>
      </section>
    </>
  );
}