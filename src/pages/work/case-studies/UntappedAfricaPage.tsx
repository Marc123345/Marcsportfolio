import React from 'react';
import { ArrowRight, Star, Timer, Users, Target, Zap, CheckCircle2, ArrowUpRight, Droplets, Globe, Heart } from 'lucide-react';
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
    <div className="bg-[#1b1b1b] p-8 rounded-xl border border-white/10 hover:border-[#A3D1FF] transition-all text-center">
      <div className="text-4xl font-bold text-[#A3D1FF] mb-2">{value}</div>
      <div className="text-gray-400">{label}</div>
    </div>
  );
}

function UntappedAfricaPage() {
  const navigate = useNavigate();

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center bg-black overflow-hidden">
        {/* Hero Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://ik.imagekit.io/qcvroy8xpd/Screenshot.png?updatedAt=1754018965491"
            alt="Untapped Africa water infrastructure platform - comprehensive dashboard showing project management and data visualization for African water solutions"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/70"></div>
        </div>

        {/* Content */}
        <div className="container-custom relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Untapped Africa
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Revolutionizing water infrastructure solutions across Africa with innovative technology and sustainable practices.
            </p>
            <div className="flex gap-4">
              <a 
                href="https://untappedafrica.co.za"
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
                Untapped Africa is revolutionizing water infrastructure solutions across Africa with innovative technology and sustainable practices. This comprehensive platform manages project development, data visualization, and community engagement to address one of Africa's most critical challenges.
              </p>
              <div className="flex flex-wrap gap-3">
                {[
                  'Next.js',
                  'TypeScript',
                  'Supabase',
                  'Mapbox GL',
                  'Water Infrastructure',
                  'Social Impact'
                ].map((tag) => (
                  <span key={tag} className="px-4 py-2 bg-white/5 rounded-full text-sm text-[#A3D1FF]">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="space-y-6">
              <div className="bg-[#1b1b1b] p-6 rounded-xl border border-white/10">
                <h3 className="text-xl font-semibold text-white mb-4">Impact Metrics</h3>
                <ul className="space-y-3">
                  <li className="flex items-center text-gray-300">
                    <CheckCircle2 className="w-5 h-5 text-[#A3D1FF] mr-3" />
                    250% increase in engagement
                  </li>
                  <li className="flex items-center text-gray-300">
                    <CheckCircle2 className="w-5 h-5 text-[#A3D1FF] mr-3" />
                    8 countries impacted
                  </li>
                  <li className="flex items-center text-gray-300">
                    <CheckCircle2 className="w-5 h-5 text-[#A3D1FF] mr-3" />
                    500,000+ people served
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
                Africa faces a critical water crisis affecting millions of people:
              </p>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <Star className="w-5 h-5 text-[#FFD700] mt-1 mr-3" />
                  <p className="text-gray-300">400 million people lack access to clean water</p>
                </li>
                <li className="flex items-start">
                  <Star className="w-5 h-5 text-[#FFD700] mt-1 mr-3" />
                  <p className="text-gray-300">Fragmented infrastructure development</p>
                </li>
                <li className="flex items-start">
                  <Star className="w-5 h-5 text-[#FFD700] mt-1 mr-3" />
                  <p className="text-gray-300">Limited data visibility and project tracking</p>
                </li>
                <li className="flex items-start">
                  <Star className="w-5 h-5 text-[#FFD700] mt-1 mr-3" />
                  <p className="text-gray-300">Need for sustainable, community-driven solutions</p>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">The Solution</h2>
              <div className="grid gap-6">
                <FeatureCard
                  icon={Droplets}
                  title="Water Infrastructure Platform"
                  description="Comprehensive platform for managing water projects from conception to completion."
                />
                <FeatureCard
                  icon={Globe}
                  title="Data Visualization"
                  description="Interactive maps and dashboards showing project impact across Africa."
                />
                <FeatureCard
                  icon={Heart}
                  title="Community Engagement"
                  description="Tools for community involvement and stakeholder communication."
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-12">Platform Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={Target}
              title="Project Management"
              description="End-to-end project tracking from planning to implementation and maintenance."
            />
            <FeatureCard
              icon={Users}
              title="Stakeholder Portal"
              description="Dedicated portals for communities, investors, and implementation partners."
            />
            <FeatureCard
              icon={Zap}
              title="Real-time Monitoring"
              description="Live data feeds and monitoring systems for ongoing project assessment."
            />
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#1b1b1b]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-12">Results & Impact</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <StatCard
              value="250%"
              label="Engagement Increase"
            />
            <StatCard
              value="8"
              label="Countries Impacted"
            />
            <StatCard
              value="500K+"
              label="People Served"
            />
          </div>
        </div>
      </section>

      {/* Client Testimonial */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#1b1b1b]">
        <div className="max-w-7xl mx-auto">
          <div className="bg-[#2d3035] p-8 rounded-xl border-l-4 border-[#A3D1FF]">
            <div className="flex items-center gap-8">
              <img 
                src="https://ik.imagekit.io/qcvroy8xpd/1682479506906.jpeg?updatedAt=1754019693073"
                alt="Gabriel Sher, CEO of Untapped Africa - client testimonial photo"
                className="w-24 h-24 rounded-full object-cover"
              />
              <div>
                <p className="text-xl text-gray-300 italic mb-4">
                  "Working with Marc on the Untapped Africa website was a fantastic experience. He understood our vision and delivered a stunning, user-friendly site that exceeded our expectations. His professionalism, creativity, and attention to detail made the process smooth and enjoyable."
                </p>
                <p className="text-white font-bold">— Gabriel Sher, CEO, Untapped Africa</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Create Social Impact?</h2>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Let's build a platform that drives meaningful change and creates lasting impact for communities.
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

export default UntappedAfricaPage;