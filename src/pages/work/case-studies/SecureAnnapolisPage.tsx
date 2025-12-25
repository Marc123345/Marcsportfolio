import React from 'react';
import { ArrowRight, Star, Timer, Users, Target, Zap, CheckCircle2, ArrowUpRight, Shield, MapPin, Phone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

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

function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="bg-[#1b1b1b] p-8 rounded-xl border border-white/10 hover:border-[#A3D1FF] transition-all text-center">
      <div className="text-4xl font-bold text-[#A3D1FF] mb-2">{value}</div>
      <div className="text-gray-400">{label}</div>
    </div>
  );
}

function SecureAnnapolisPage() {
  const navigate = useNavigate();

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center bg-black overflow-hidden">
        {/* Hero Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1587613864521-9ef8dfe617cc?auto=format&fit=crop&w=2000&q=80"
            alt="A Secure Annapolis Locksmith"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/70"></div>
        </div>

        {/* Content */}
        <div className="container-custom relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-display-large text-white mb-6">
              A Secure Annapolis Locksmith
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Professional locksmith website showcasing residential, commercial, and automotive services.
            </p>
            <div className="flex gap-4">
              <a 
                href="https://www.asecureannapolislocksmith.com"
                target="_blank"
                rel="noopener noreferrer"
                className="mr_btn mr_btn_primary group relative overflow-hidden"
              >
                <span className="relative z-10">View Live Website</span>
                <div className="absolute inset-0 bg-white transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
                <ArrowUpRight className="ml-2 w-5 h-5 relative z-10" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Project Overview */}
      <section id="case-study-content" className="py-16 px-4 sm:px-6 lg:px-8 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-display-medium text-white mb-6">Project Overview</h2>
              <p className="text-gray-400 mb-6">
                A Secure Annapolis Locksmith needed a professional website to showcase their comprehensive locksmith services including residential, commercial, and automotive solutions. The project focused on local SEO optimization and conversion-focused design to drive more qualified leads.
              </p>
              <div className="flex flex-wrap gap-3">
                {[
                  'Local SEO',
                  'Lead Generation',
                  'Mobile-First',
                  'Conversion Optimization',
                  'Professional Services',
                  'Annapolis'
                ].map((tag) => (
                  <span key={tag} className="px-4 py-2 bg-white/5 rounded-full text-sm text-[#A3D1FF]">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="space-y-6">
              <div className="bg-[#1b1b1b] p-6 rounded-xl border border-white/10">
                <h3 className="text-body-large font-semibold text-white mb-4">Key Results</h3>
                <ul className="space-y-3">
                  <li className="flex items-center text-gray-300">
                    <CheckCircle2 className="w-5 h-5 text-[#A3D1FF] mr-3" />
                    150% increase in qualified leads
                  </li>
                  <li className="flex items-center text-gray-300">
                    <CheckCircle2 className="w-5 h-5 text-[#A3D1FF] mr-3" />
                    Top 3 local search rankings
                  </li>
                  <li className="flex items-center text-gray-300">
                    <CheckCircle2 className="w-5 h-5 text-[#A3D1FF] mr-3" />
                    85% mobile conversion rate
                  </li>
                  <li className="flex items-center text-gray-300">
                    <CheckCircle2 className="w-5 h-5 text-[#A3D1FF] mr-3" />
                    4.8/5 customer rating
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Offered */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#1b1b1b]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-display-medium text-white mb-12">Services Showcased</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={Shield}
              title="Residential Services"
              description="Home lockouts, lock installations, security upgrades, and emergency services."
            />
            <FeatureCard
              icon={Target}
              title="Commercial Services"
              description="Business security systems, access control, and master key systems."
            />
            <FeatureCard
              icon={Zap}
              title="Automotive Services"
              description="Car lockouts, key replacement, ignition repair, and transponder programming."
            />
          </div>
        </div>
      </section>

      {/* Challenge & Solution */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-display-medium text-white mb-6">The Challenge</h2>
              <p className="text-gray-400 mb-6">
                Local locksmith businesses face unique digital marketing challenges:
              </p>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <Star className="w-5 h-5 text-[#FFD700] mt-1 mr-3" />
                  <p className="text-gray-300">High competition in local search results</p>
                </li>
                <li className="flex items-start">
                  <Star className="w-5 h-5 text-[#FFD700] mt-1 mr-3" />
                  <p className="text-gray-300">Need for immediate trust and credibility</p>
                </li>
                <li className="flex items-start">
                  <Star className="w-5 h-5 text-[#FFD700] mt-1 mr-3" />
                  <p className="text-gray-300">Mobile-first user behavior for emergency services</p>
                </li>
                <li className="flex items-start">
                  <Star className="w-5 h-5 text-[#FFD700] mt-1 mr-3" />
                  <p className="text-gray-300">Converting visitors into phone calls quickly</p>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="text-display-medium text-white mb-6">The Solution</h2>
              <div className="grid gap-6">
                <FeatureCard
                  icon={MapPin}
                  title="Local SEO Focus"
                  description="Optimized for 'locksmith near me' and Annapolis-specific searches."
                />
                <FeatureCard
                  icon={Phone}
                  title="Call-to-Action Design"
                  description="Prominent phone numbers and click-to-call functionality throughout."
                />
                <FeatureCard
                  icon={Timer}
                  title="Trust Building"
                  description="Customer testimonials, certifications, and service guarantees prominently displayed."
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#1b1b1b]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-display-medium text-white mb-12">Results & Impact</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <StatCard
              value="150%"
              label="Lead Increase"
            />
            <StatCard
              value="Top 3"
              label="Local Rankings"
            />
            <StatCard
              value="85%"
              label="Mobile Conversion"
            />
            <StatCard
              value="4.8/5"
              label="Customer Rating"
            />
          </div>
        </div>
      </section>

      {/* Client Testimonial */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#1b1b1b]">
        <div className="max-w-7xl mx-auto">
          <div className="bg-[#2d3035] p-8 rounded-xl border-l-4 border-[#A3D1FF]">
            <div className="flex items-center gap-8">
              <div className="w-24 h-24 rounded-full bg-[#2d3035] flex items-center justify-center border-2 border-[#A3D1FF]">
                <span className="text-heading-large text-[#A3D1FF]">RM</span>
              </div>
              <div>
                <p className="text-xl text-gray-300 italic mb-4">
                  "Very professional wonderful customer service, thank you Marc for all the work you put in, will definitely be using for future projects!"
                </p>
                <p className="text-white font-bold">— Royi Mazor, Owner, A Secure Annapolis Locksmith</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-display-medium text-white mb-4">Ready to Dominate Local Search?</h2>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Let's create a local business website that drives qualified leads and builds trust with your community.
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

export default SecureAnnapolisPage;