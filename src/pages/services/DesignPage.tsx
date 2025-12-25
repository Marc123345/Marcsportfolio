import React from 'react';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, Palette, Layout, Users, Sparkles, Lightbulb, Layers } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import TrustedBy from '@/components/TrustedBy';
import ServiceLeadForm from '@/components/ServiceLeadForm';

function DesignService({ icon: Icon, title, description }: {
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

function ProcessStep({ number, title, description }: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-start">
      <div className="bg-[#A3D1FF] text-black w-12 h-12 rounded-full flex items-center justify-center font-bold mr-6">
        {number}
      </div>
      <div>
        <h3 className="text-body-large font-semibold text-white mb-2">{title}</h3>
        <p className="text-gray-400">{description}</p>
      </div>
    </div>
  );
}

function ServicePackage({ title, description, features, recommended = false }: {
  title: string;
  description: string;
  features: string[];
  recommended?: boolean;
}) {
  const navigate = useNavigate();
  
  return (
    <div className={`bg-[#1b1b1b] p-8 rounded-xl border ${recommended ? 'border-[#A3D1FF]' : 'border-white/10'} hover:border-[#A3D1FF] transition-all relative`}>
      {recommended && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-[#A3D1FF] text-black px-4 py-1 rounded-full text-sm font-medium">
          Most Popular
        </div>
      )}
      <h3 className="text-heading-large text-white mb-2">{title}</h3>
      <p className="text-gray-400 mb-6">{description}</p>
      <ul className="space-y-3 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center text-gray-300">
            <ArrowRight className="w-4 h-4 text-[#A3D1FF] mr-2" />
            <strong>{feature}</strong>
          </li>
        ))}
      </ul>
      <button
        onClick={() => {
          const form = document.getElementById('contact-form');
          form?.scrollIntoView({ behavior: 'smooth' });
        }}
        className="w-full bg-[#A3D1FF] text-black px-6 py-3 rounded-lg hover:bg-[#92bce6] transition-colors"
      >
        Request a Quote
      </button>
    </div>
  );
}

export default function DesignPage() {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>UI/UX Design Services | Marc Friedman</title>
        <meta name="description" content="User-centered UI/UX design services that increase conversions by 35% and reduce bounce rates by 40%. Professional design solutions for web and mobile applications." />
        <meta name="keywords" content="UI/UX design services, user experience design, user interface design, conversion optimization design, mobile app design, web design" />
        <link rel="canonical" href="https://www.marcfriedmanportfolio.com/services/design" />
        
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "UI/UX Design Services",
            "description": "User-centered design services that increase conversions by 35% and reduce bounce rates by 40%.",
            "provider": {
              "@type": "Person",
              "name": "Marc Friedman",
              "url": "https://www.marcfriedmanportfolio.com"
            }
          })}
        </script>
      </Helmet>

      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center bg-black overflow-hidden">
        {/* Hero Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=2000&q=80" 
            alt="UI/UX Design Hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/70"></div>
        </div>

        {/* Content */}
        <div className="container-custom relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-display-large text-white mb-4">
              UI/UX Design Services
            </h1>
            <h2 className="text-heading-large text-[#A3D1FF] mb-6">
              User-Centered Design That Drives Business Results
            </h2>
            <p className="text-body-large text-gray-300 mb-8">
              <strong className="text-white">Increase conversions</strong> and <strong className="text-white">reduce bounce rates</strong> through user-centered design that delights users and drives business growth.
            </p>
            <div className="flex gap-4">
              <button 
                onClick={() => navigate('/contact')}
                className="mr_btn mr_btn_primary group relative overflow-hidden"
              >
                <span className="relative z-10">Start Your Project</span>
                <div className="absolute inset-0 bg-white transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
                <ArrowRight className="ml-2 w-5 h-5 relative z-10 group-hover:rotate-45 transition-transform duration-300" />
              </button>
              <button 
                onClick={() => navigate('/work')}
                className="mr_btn mr_btn_outline group"
              >
                <span className="relative z-10">View Portfolio</span>
                <ArrowRight className="ml-3 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted By Section */}
      <TrustedBy />

      {/* Services Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-display-medium text-white mb-12 text-center">Our Design Services</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <DesignService
              icon={Layout}
              title="UI Design"
              description="Beautiful, intuitive interfaces that enhance user engagement and strengthen brand perception."
            />
            <DesignService
              icon={Users}
              title="UX Design"
              description="User-centered design solutions that optimize the customer journey and reduce friction points."
            />
            <DesignService
              icon={Palette}
              title="Design Systems"
              description="Scalable design systems that ensure brand coherence and streamline development."
            />
            <DesignService
              icon={Sparkles}
              title="Interaction Design"
              description="Micro-interactions and animations that provide feedback and delight users."
            />
            <DesignService
              icon={Lightbulb}
              title="Product Strategy"
              description="Strategic design thinking that solves complex business challenges."
            />
            <DesignService
              icon={Layers}
              title="Design Audits"
              description="Comprehensive analysis and actionable recommendations to improve usability."
            />
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#1b1b1b]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-display-medium text-white mb-12">Design Process</h2>
          <div className="space-y-12">
            <ProcessStep
              number="01"
              title="Discovery"
              description="More accurate project scoping through comprehensive research, stakeholder interviews, and competitive analysis."
            />
            <ProcessStep
              number="02"
              title="Strategy"
              description="Higher alignment with business goals through data-driven design strategy and user-centered planning."
            />
            <ProcessStep
              number="03"
              title="Design"
              description="Increase in user satisfaction through iterative wireframing, prototyping, and visual design processes."
            />
            <ProcessStep
              number="04"
              title="Testing"
              description="Identify and fix usability issues before launch through comprehensive user testing and feedback integration."
            />
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-display-medium text-white mb-12 text-center">Design Packages</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <ServicePackage
              title="Brand Design"
              description="Complete brand identity design package"
              features={[
                "Stronger brand recognition",
                "Professional logo design",
                "Comprehensive color system",
                "Typography selection",
                "Brand guidelines document",
                "2-3 week delivery"
              ]}
            />
            <ServicePackage
              title="Website Design"
              description="Custom website design package"
              features={[
                "Higher conversion rates",
                "5-7 page custom designs",
                "Responsive layouts for all devices",
                "Interactive prototypes",
                "Design system development",
                "3-4 week delivery"
              ]}
              recommended={true}
            />
            <ServicePackage
              title="Product Design"
              description="End-to-end product design solution"
              features={[
                "Improved user satisfaction",
                "Comprehensive UX research",
                "User journey mapping",
                "Wireframes and UI design",
                "Interactive prototype",
                "6-8 week delivery"
              ]}
            />
          </div>
          <div className="mt-8 text-center">
            <p className="text-gray-400">
              Each project is unique. Contact us for a customized quote tailored to your specific needs.
            </p>
          </div>
        </div>
      </section>

      {/* Lead Form Section */}
      <section id="contact-form" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <ServiceLeadForm 
            service="UI/UX Design"
            benefits={[
              "Increase in conversion rates",
              "Reduction in bounce rates",
              "Improvement in user satisfaction",
              "Decrease in design inconsistencies",
              "Faster development with design systems"
            ]}
            testimonial={{
              quote: "Marc excels in crafting intuitive, data-centric design solutions that have greatly enhanced our platform's usability and visual analytics.",
              author: "VP Product",
              role: "WebAI | Founder and developer of @Hubters WebAI"
            }}
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-display-medium text-white mb-4">Ready to Transform Your Digital Experience?</h2>
          <p className="text-body-large text-gray-400 mb-8 max-w-2xl mx-auto">
            Let's create <strong className="text-white">user-centered designs</strong> that increase conversions and delight your users.
          </p>
          <button 
            onClick={() => navigate('/contact')}
            className="mr_btn mr_btn_primary group relative overflow-hidden"
          >
            <span className="relative z-10">Schedule a Design Consultation</span>
            <div className="absolute inset-0 bg-white transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
            <ArrowRight className="ml-2 w-5 h-5 relative z-10 group-hover:rotate-45 transition-transform duration-300" />
          </button>
        </div>
      </section>
    </>
  );
}