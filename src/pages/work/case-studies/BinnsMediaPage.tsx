import React from 'react';
import { ArrowRight, Star, Timer, Users, Target, Zap, CheckCircle2, ArrowUpRight } from 'lucide-react';
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
      <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  );
}

function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="bg-[#1b1b1b] p-6 rounded-xl border border-white/10 text-center">
      <div className="text-3xl font-bold text-[#A3D1FF] mb-2">{value}</div>
      <div className="text-gray-400">{label}</div>
    </div>
  );
}

function BinnsMediaPage() {
  const navigate = useNavigate();

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center bg-black overflow-hidden">
        {/* Hero Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://i.imgur.com/IU0mmH7.jpeg"
            alt="Binns Media Group"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/70"></div>
        </div>

        {/* Content */}
        <div className="container-custom relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Binns Media Group
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              A cutting-edge digital media platform showcasing BMG's diverse content portfolio including podcasts, TV shows, and exclusive content.
            </p>
            <div className="flex gap-4">
              <a 
                href="https://www.binnsmediagroup.com"
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
              <h2 className="text-3xl font-bold text-white mb-6">Project Overview</h2>
              <p className="text-gray-400 mb-6">
                Binns Media Group needed a cutting-edge digital media platform to showcase their diverse content portfolio including podcasts, TV shows, and exclusive content. The platform serves as both a content hub and a representation of BMG's commitment to amplifying diverse voices in media.
              </p>
              <div className="flex flex-wrap gap-3">
                {[
                  'React 18',
                  'TypeScript',
                  'Supabase',
                  'GSAP',
                  'Performance',
                  'Media Platform'
                ].map((tag) => (
                  <span key={tag} className="px-4 py-2 bg-white/5 rounded-full text-sm text-[#A3D1FF]">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="space-y-6">
              <div className="bg-[#1b1b1b] p-6 rounded-xl border border-white/10">
                <h3 className="text-xl font-semibold text-white mb-4">Key Achievements</h3>
                <ul className="space-y-3">
                  <li className="flex items-center text-gray-300">
                    <CheckCircle2 className="w-5 h-5 text-[#A3D1FF] mr-3" />
                    High performance score
                  </li>
                  <li className="flex items-center text-gray-300">
                    <CheckCircle2 className="w-5 h-5 text-[#A3D1FF] mr-3" />
                    Increased engagement
                  </li>
                  <li className="flex items-center text-gray-300">
                    <CheckCircle2 className="w-5 h-5 text-[#A3D1FF] mr-3" />
                    Faster load times
                  </li>
                  <li className="flex items-center text-gray-300">
                    <CheckCircle2 className="w-5 h-5 text-[#A3D1FF] mr-3" />
                    Excellent uptime
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Challenge & Solution */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#1b1b1b]">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">The Challenge</h2>
              <p className="text-gray-400 mb-6">
                Binns Media Group needed a platform that could:
              </p>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <Star className="w-5 h-5 text-[#FFD700] mt-1 mr-3" />
                  <p className="text-gray-300">Showcase diverse content portfolio effectively</p>
                </li>
                <li className="flex items-start">
                  <Star className="w-5 h-5 text-[#FFD700] mt-1 mr-3" />
                  <p className="text-gray-300">Handle high traffic and media-rich content</p>
                </li>
                <li className="flex items-start">
                  <Star className="w-5 h-5 text-[#FFD700] mt-1 mr-3" />
                  <p className="text-gray-300">Provide seamless user experience across devices</p>
                </li>
                <li className="flex items-start">
                  <Star className="w-5 h-5 text-[#FFD700] mt-1 mr-3" />
                  <p className="text-gray-300">Reflect their brand values and mission</p>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">The Solution</h2>
              <div className="grid gap-6">
                <FeatureCard
                  icon={Timer}
                  title="Modern Architecture"
                  description="Built with React 18 and TypeScript for optimal performance and maintainability."
                />
                <FeatureCard
                  icon={Users}
                  title="Content Management"
                  description="Integrated Supabase for seamless content management and real-time updates."
                />
                <FeatureCard
                  icon={Zap}
                  title="Performance Focus"
                  description="Optimized for fast loading and smooth interactions with GSAP animations."
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-12">Results & Impact</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <StatCard
              value="98/100"
              label="Performance Score"
            />
            <StatCard
              value="40%"
              label="Increased Engagement"
            />
            <StatCard
              value="60%"
              label="Faster Load Times"
            />
            <StatCard
              value="99.9%"
              label="Uptime"
            />
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#1b1b1b]">
        <div className="max-w-7xl mx-auto">
          <div className="bg-[#2d3035] p-8 rounded-xl border-l-4 border-[#A3D1FF]">
            <div className="flex items-center gap-8">
              <img 
                src="https://i.imgur.com/NKjkUC9.jpeg"
                alt="Omar Turner, CEO of Binns Media Group - client testimonial photo"
                className="w-24 h-24 rounded-full object-cover"
              />
              <div>
                <p className="text-xl text-gray-300 italic mb-4">
                  "Marc was able to execute the vision perfectly! He's big on communication and easy to speak with. Marc dedicates his time to the client, ensuring the client is completely satisfied at each step of the process."
                </p>
                <p className="text-white font-bold">— Omar Turner, Chief Executive Officer, Binns Media Group</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Transform Your Digital Presence?</h2>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Let's create a powerful media platform that showcases your content and engages your audience.
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

export default BinnsMediaPage;