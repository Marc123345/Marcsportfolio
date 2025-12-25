import React from 'react';
import { ArrowRight, Palette, Eye, Target, Zap, Users, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import ServiceLeadForm from '@/components/ServiceLeadForm';

function FeatureCard({ icon: Icon, title, description }: {
  icon: any;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-[#1b1b1b] p-8 rounded-xl border border-white/10 hover:border-[#A3D1FF] transition-all group">
      <div className="relative mb-6">
        <div className="absolute inset-0 bg-[#A3D1FF]/20 blur-xl rounded-full"></div>
        <div className="bg-[#A3D1FF]/10 p-4 rounded-xl relative">
          <Icon className="w-8 h-8 text-[#A3D1FF] group-hover:scale-110 transition-transform" />
        </div>
      </div>
      <h3 className="text-body-large font-semibold mb-2 text-white">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  );
}

export default function BrandDesignPage() {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>Brand Design Services | Marc Friedman</title>
        <meta name="description" content="Create compelling brand identities that resonate with your audience and differentiate your business in the marketplace." />
        <link rel="canonical" href="https://www.marcfriedmanportfolio.com/services/brand-design" />
      </Helmet>

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <h1 className="text-display-large text-white mb-6">
              Brand Design
            </h1>
            <p className="text-xl text-gray-400 mb-8">
              Create <strong className="text-white">compelling brand identities</strong> that resonate with your audience and differentiate your business in the marketplace.
            </p>
            <button 
              onClick={() => navigate('/contact')}
              className="mr_btn mr_btn_primary group relative overflow-hidden"
            >
              <span className="relative z-10">Start Your Project</span>
              <div className="absolute inset-0 bg-white transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
              <ArrowRight className="ml-2 w-5 h-5 relative z-10 group-hover:rotate-45 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={Palette}
              title="Logo Design"
              description="Create memorable logos that capture your brand essence and work across all mediums."
            />
            <FeatureCard
              icon={Eye}
              title="Visual Identity"
              description="Develop comprehensive visual systems including colors, typography, and imagery."
            />
            <FeatureCard
              icon={Target}
              title="Brand Strategy"
              description="Define your brand positioning, messaging, and unique value proposition."
            />
            <FeatureCard
              icon={Zap}
              title="Brand Guidelines"
              description="Comprehensive brand guidelines to ensure consistent application across all touchpoints."
            />
            <FeatureCard
              icon={Users}
              title="Brand Experience"
              description="Design cohesive brand experiences that build trust and loyalty with your audience."
            />
            <FeatureCard
              icon={CheckCircle2}
              title="Brand Assets"
              description="Complete suite of brand assets for digital and print applications."
            />
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#1b1b1b]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-display-medium text-white mb-12">Brand Design Process</h2>
          <div className="space-y-12">
            <div className="flex items-start">
              <div className="bg-[#A3D1FF] text-black w-12 h-12 rounded-full flex items-center justify-center font-bold mr-6">
                1
              </div>
              <div>
                <h3 className="text-body-large font-semibold text-white mb-2">Discovery & Research</h3>
                <p className="text-gray-400">Deep dive into your business, audience, and competitive landscape to inform brand strategy.</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-[#A3D1FF] text-black w-12 h-12 rounded-full flex items-center justify-center font-bold mr-6">
                2
              </div>
              <div>
                <h3 className="text-body-large font-semibold text-white mb-2">Strategy Development</h3>
                <p className="text-gray-400">Define brand positioning, personality, and messaging that resonates with your target audience.</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-[#A3D1FF] text-black w-12 h-12 rounded-full flex items-center justify-center font-bold mr-6">
                3
              </div>
              <div>
                <h3 className="text-body-large font-semibold text-white mb-2">Visual Design</h3>
                <p className="text-gray-400">Create logo concepts and visual identity elements that bring your brand strategy to life.</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-[#A3D1FF] text-black w-12 h-12 rounded-full flex items-center justify-center font-bold mr-6">
                4
              </div>
              <div>
                <h3 className="text-body-large font-semibold text-white mb-2">Implementation</h3>
                <p className="text-gray-400">Develop comprehensive brand guidelines and assets for consistent application.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lead Form Section */}
      <section id="contact-form" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <ServiceLeadForm 
            service="Brand Design"
            benefits={[
              "Stronger brand recognition",
              "Professional visual identity",
              "Comprehensive brand guidelines",
              "Consistent brand application",
              "Increased brand trust and credibility"
            ]}
            testimonial={{
              quote: "Marc created a brand identity that perfectly captures our essence and has significantly improved our market presence.",
              author: "Hilla Dayan",
              role: "Founder of Wellness"
            }}
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-display-medium text-white mb-4">Ready to Build Your Brand?</h2>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Let's create a <strong className="text-white">powerful brand identity</strong> that sets you apart from the competition.
          </p>
          <button 
            onClick={() => navigate('/contact')}
            className="mr_btn mr_btn_primary group relative overflow-hidden"
          >
            <span className="relative z-10">Start Your Project</span>
            <div className="absolute inset-0 bg-white transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
            <ArrowRight className="ml-2 w-5 h-5 relative z-10 group-hover:rotate-45 transition-transform duration-300" />
          </button>
        </div>
      </section>
    </>
  );
}