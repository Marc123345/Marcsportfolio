import React from 'react';
import { ArrowRight, Code, Database, Shield, Zap, Settings, Users } from 'lucide-react';
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

export default function APIPage() {
  const navigate = useNavigate();

  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <h1 className="text-display-large text-white mb-6">
              API Development
            </h1>
            <p className="text-xl text-gray-400 mb-8">
              <strong className="text-white">Reduce integration time</strong> with robust, scalable, and secure APIs that power your applications and seamlessly connect with third-party services.
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
              title="RESTful APIs"
              description="Faster development cycles with standardized RESTful APIs that follow industry best practices."
            />
            <FeatureCard
              icon={Code}
              title="GraphQL APIs"
              description="Reduction in data transfer with flexible GraphQL APIs that deliver exactly what clients need."
            />
            <FeatureCard
              icon={Shield}
              title="Security"
              description="Robust security features to protect sensitive business data with authentication and authorization."
            />
            <FeatureCard
              icon={Zap}
              title="Performance"
              description="Fast response times with optimized queries and intelligent caching strategies."
            />
            <FeatureCard
              icon={Settings}
              title="Integration"
              description="Faster third-party integrations with pre-built connectors and comprehensive documentation."
            />
            <FeatureCard
              icon={Users}
              title="Documentation"
              description="Reduction in support tickets with interactive API documentation and developer resources."
            />
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#1b1b1b]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-display-medium text-white mb-12">Development Process</h2>
          <div className="space-y-12">
            <ProcessStep
              number="01"
              title="Requirements Analysis"
              description="More accurate project scoping through comprehensive needs analysis and clear API specifications."
            />
            <ProcessStep
              number="02"
              title="Architecture Design"
              description="Reduction in technical debt with forward-thinking API architecture and data modeling."
            />
            <ProcessStep
              number="03"
              title="Development"
              description="Faster implementation with robust error handling, validation, and comprehensive testing."
            />
            <ProcessStep
              number="04"
              title="Testing & Documentation"
              description="Reduction in integration issues through automated testing and detailed documentation."
            />
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-display-medium text-white mb-12 text-center">API Development Packages</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <ServicePackage
              title="Basic API"
              description="Essential API development for small projects"
              features={[
                "Faster time-to-market",
                "RESTful API implementation",
                "Basic authentication system",
                "Comprehensive error handling",
                "Interactive documentation",
                "4-week delivery"
              ]}
            />
            <ServicePackage
              title="Professional API"
              description="Comprehensive API solution for growing businesses"
              features={[
                "Reduction in integration time",
                "Advanced architecture design",
                "OAuth2 authentication",
                "Rate limiting & caching",
                "Performance monitoring",
                "8-week delivery"
              ]}
              recommended={true}
            />
            <ServicePackage
              title="Enterprise API"
              description="Full-scale API development for complex needs"
              features={[
                "Improvement in system efficiency",
                "Custom architecture design",
                "GraphQL implementation",
                "Advanced security measures",
                "High-availability infrastructure",
                "Custom timeline"
              ]}
            />
          </div>
          <div className="mt-8 text-center">
            <p className="text-gray-400">
              Need a custom API solution? Contact us for a personalized quote based on your specific requirements.
            </p>
          </div>
        </div>
      </section>

      {/* Lead Form Section */}
      <section id="contact-form" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <ServiceLeadForm 
            service="API Development"
            benefits={[
              "Reduction in integration time",
              "High uptime guarantee",
              "Response times under 100ms",
              "Zero security vulnerabilities",
              "Comprehensive documentation"
            ]}
            testimonial={{
              quote: "The API solution Marc developed has significantly improved our system's efficiency and integration capabilities.",
              author: "Lior Shimon",
              role: "Algorithm Engineer | Data Scientist"
            }}
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-display-medium text-white mb-4">Ready to Build Your API?</h2>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Let's create a <strong className="text-white">robust API</strong> that powers your application and <strong className="text-white">scales with your business</strong>.
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