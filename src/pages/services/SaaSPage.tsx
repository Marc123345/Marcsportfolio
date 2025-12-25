import React from 'react';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, Database, Code, Shield, Zap, Cloud, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
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
        <h3 className="text-body-large font-semibold mb-2 text-white">{title}</h3>
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
        className="w-full mr_btn mr_btn_primary group relative overflow-hidden"
      >
        <span className="relative z-10">Request a Quote</span>
        <div className="absolute inset-0 bg-white transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
      </button>
    </div>
  );
}

export default function SaaSPage() {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>SaaS Development Services | Marc Friedman</title>
        <meta name="description" content="End-to-end SaaS development services that reduce operational costs by 25%. Scalable architecture, 99.9% uptime guarantee, and enterprise-grade security." />
        <meta name="keywords" content="SaaS development, software as a service development, scalable web applications, cloud applications, enterprise software development" />
        <link rel="canonical" href="https://www.marcfriedmanportfolio.com/services/saas" />
        
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "SaaS Development Services",
            "description": "End-to-end SaaS development services that reduce operational costs by 25%.",
            "provider": {
              "@type": "Person",
              "name": "Marc Friedman",
              "url": "https://www.marcfriedmanportfolio.com"
            }
          })}
        </script>
      </Helmet>

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <h1 className="text-display-large text-white mb-4">
              SaaS Development
            </h1>
            <h2 className="text-xl sm:text-2xl text-[#A3D1FF] mb-6">
              Scalable Software Solutions That Grow With Your Business
            </h2>
            <p className="text-xl text-gray-400 mb-8">
              <strong className="text-white">Reduce operational costs</strong> with scalable, secure SaaS applications that drive business growth and user satisfaction.
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
              icon={Database}
              title="Scalable Architecture"
              description="Infrastructure that grows with your business, handling significant user growth without performance degradation."
            />
            <FeatureCard
              icon={Code}
              title="Modern Tech Stack"
              description="Future-proof technologies delivering faster development cycles and high uptime."
            />
            <FeatureCard
              icon={Shield}
              title="Security First"
              description="Enterprise-grade protection with SOC 2 compliance standards and robust data protection."
            />
            <FeatureCard
              icon={Zap}
              title="Performance"
              description="Lightning-fast response times, even at peak loads with many concurrent users."
            />
            <FeatureCard
              icon={Cloud}
              title="Cloud Native"
              description="Lower infrastructure costs with auto-scaling cloud architecture and containerization."
            />
            <FeatureCard
              icon={Users}
              title="User Experience"
              description="Intuitive interfaces that reduce onboarding time and increase user retention."
            />
          </div>
        </div>
      </section>

      {/* Development Process */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#1b1b1b]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-display-medium text-white mb-12">Development Process</h2>
          <div className="space-y-12">
            <ProcessStep
              number="01"
              title="Discovery & Planning"
              description="More effective project outcomes through comprehensive research and strategic roadmapping."
            />
            <ProcessStep
              number="02"
              title="Design & Prototyping"
              description="Higher user adoption rates with user-tested interfaces and interactive prototypes."
            />
            <ProcessStep
              number="03"
              title="Development"
              description="High quality scores through modern technologies, best practices, and continuous integration."
            />
            <ProcessStep
              number="04"
              title="Testing & Launch"
              description="High uptime guarantee with comprehensive testing, monitoring, and controlled deployment."
            />
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-display-medium text-white mb-12 text-center">Development Packages</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <ServicePackage
              title="MVP"
              description="Validate your SaaS idea in just 8 weeks"
              features={[
                "Faster time-to-market",
                "Core features implementation",
                "User authentication system",
                "Cloud hosting setup",
                "Basic analytics integration",
                "8-12 week delivery"
              ]}
            />
            <ServicePackage
              title="Professional"
              description="Complete SaaS solution with advanced features"
              features={[
                "Higher user retention",
                "Advanced feature set",
                "Custom admin dashboard",
                "Payment system integration",
                "API development & documentation",
                "12-16 week delivery"
              ]}
              recommended={true}
            />
            <ServicePackage
              title="Enterprise"
              description="Scalable solution for complex business needs"
              features={[
                "Reduction in operational costs",
                "Custom architecture design",
                "Advanced security implementation",
                "Third-party integrations",
                "High-availability infrastructure",
                "Custom timeline"
              ]}
            />
          </div>
          <div className="mt-8 text-center">
            <p className="text-gray-400">
              Each SaaS project is unique. Contact us for a detailed quote tailored to your specific requirements.
            </p>
          </div>
        </div>
      </section>

      {/* Lead Form Section */}
      <section id="contact-form" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <ServiceLeadForm 
            service="SaaS Development"
            benefits={[
              "Reduction in operational costs",
              "High uptime guarantee",
              "Enterprise-grade security implementation",
              "Faster development cycles",
              "Scalable architecture for future growth"
            ]}
            testimonial={{
              quote: "Marc's expertise in SaaS development helped us create a robust platform that our customers love. His attention to detail and focus on scalability were invaluable.",
              author: "Stallone Sweeney",
              role: "Attorney | Founder of LegalContent"
            }}
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-display-medium text-white mb-4">Ready to Build Your SaaS?</h2>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Let's create a <strong className="text-white">scalable SaaS solution</strong> that reduces operational costs and drives your business forward.
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