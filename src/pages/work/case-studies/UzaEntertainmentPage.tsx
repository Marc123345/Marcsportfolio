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
    <div className="bg-[#1b1b1b] p-8 rounded-xl border border-white/10 hover:border-[#A3D1FF] transition-all text-center">
      <div className="text-4xl font-bold text-[#A3D1FF] mb-2">{value}</div>
      <div className="text-gray-400">{label}</div>
    </div>
  );
}

export default function UzaEntertainmentPage() {
  const navigate = useNavigate();

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center bg-black overflow-hidden">
        {/* Hero Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://i.imgur.com/zg0Z86h.png"
            alt="UZA Entertainment"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/70"></div>
        </div>

        {/* Content */}
        <div className="container-custom relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              UZA Entertainment
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Elevating events with unforgettable dance entertainment through a stunning digital presence.
            </p>
            <div className="flex gap-4">
              <a 
                href="https://uznentertainment.com"
                target="_blank"
                rel="noopener noreferrer"
                className="mr_btn mr_btn_primary group relative overflow-hidden"
              >
                <span className="relative z-10">Visit Website</span>
                <div className="absolute inset-0 bg-white transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
                <ArrowUpRight className="ml-2 w-5 h-5" />
              </a>
              <a 
                href="https://www.yelp.com/biz/uza-entertainment-los-angeles"
                target="_blank"
                rel="noopener noreferrer"
                className="mr_btn mr_btn_outline group"
              >
                <span className="relative z-10">View on Yelp</span>
                <ArrowUpRight className="ml-2 w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Project Overview */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">Project Overview</h2>
              <p className="text-gray-400 mb-6">
                UZA Entertainment needed a modern website that would showcase their premium event entertainment services while improving their local visibility and booking conversions. The project focused on creating an engaging online presence and implementing a comprehensive SEO strategy.
              </p>
              <div className="flex flex-wrap gap-3">
                {[
                  'Next.js',
                  'Tailwind CSS',
                  'Framer Motion',
                  'Local SEO',
                  'Yelp Integration',
                  'Performance Optimization'
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
                    85% increase in online inquiries
                  </li>
                  <li className="flex items-center text-gray-300">
                    <CheckCircle2 className="w-5 h-5 text-[#A3D1FF] mr-3" />
                    90% faster page load times
                  </li>
                  <li className="flex items-center text-gray-300">
                    <CheckCircle2 className="w-5 h-5 text-[#A3D1FF] mr-3" />
                    40% higher user engagement
                  </li>
                  <li className="flex items-center text-gray-300">
                    <CheckCircle2 className="w-5 h-5 text-[#A3D1FF] mr-3" />
                    Top 3 ranking for local dance entertainment searches
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Project Gallery */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#1b1b1b]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-12">Project Gallery</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="aspect-video overflow-hidden rounded-xl">
              <img 
                src="https://i.imgur.com/jXlPYQh.png"
                alt="UZA Entertainment Interface 1"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="aspect-video overflow-hidden rounded-xl">
              <img 
                src="https://i.imgur.com/4z9zUlr.png"
                alt="UZA Entertainment Interface 2"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
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
                UZA Entertainment faced several challenges in their digital presence:
              </p>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <Star className="w-5 h-5 text-[#FFD700] mt-1 mr-3" />
                  <p className="text-gray-300">Limited online visibility in the competitive LA entertainment market</p>
                </li>
                <li className="flex items-start">
                  <Star className="w-5 h-5 text-[#FFD700] mt-1 mr-3" />
                  <p className="text-gray-300">Lack of a professional website to showcase their services and portfolio</p>
                </li>
                <li className="flex items-start">
                  <Star className="w-5 h-5 text-[#FFD700] mt-1 mr-3" />
                  <p className="text-gray-300">No integrated booking system for event inquiries</p>
                </li>
                <li className="flex items-start">
                  <Star className="w-5 h-5 text-[#FFD700] mt-1 mr-3" />
                  <p className="text-gray-300">Needed to build trust through social proof and reviews</p>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">The Solution</h2>
              <div className="grid gap-6">
                <FeatureCard
                  icon={Target}
                  title="Modern Website"
                  description="Built a fast, responsive website with Next.js and Tailwind CSS, optimized for conversions."
                />
                <FeatureCard
                  icon={Users}
                  title="Yelp Integration"
                  description="Implemented Yelp reviews and business profile integration to build social proof."
                />
                <FeatureCard
                  icon={Zap}
                  title="SEO Strategy"
                  description="Developed comprehensive local SEO strategy targeting LA area event planners."
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Implementation Details */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-12">Implementation</h2>
          <div className="space-y-12">
            <div>
              <h3 className="text-2xl font-semibold text-white mb-6">1. Website Development</h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <p className="text-gray-400 mb-4">
                    The website was built using Next.js for optimal performance and SEO capabilities. Key features include:
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-center text-gray-300">
                      <CheckCircle2 className="w-5 h-5 text-[#A3D1FF] mr-3" />
                      Responsive design for all devices
                    </li>
                    <li className="flex items-center text-gray-300">
                      <CheckCircle2 className="w-5 h-5 text-[#A3D1FF] mr-3" />
                      Image optimization and lazy loading
                    </li>
                    <li className="flex items-center text-gray-300">
                      <CheckCircle2 className="w-5 h-5 text-[#A3D1FF] mr-3" />
                      Smooth animations with Framer Motion
                    </li>
                    <li className="flex items-center text-gray-300">
                      <CheckCircle2 className="w-5 h-5 text-[#A3D1FF] mr-3" />
                      Integrated contact forms with validation
                    </li>
                  </ul>
                </div>
                <div className="bg-[#1b1b1b] p-6 rounded-xl border border-white/10">
                  <h4 className="text-lg font-semibold text-white mb-4">Performance Metrics</h4>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-300">Page Load Time</span>
                        <span className="text-[#A3D1FF]">0.8s</span>
                      </div>
                      <div className="h-2 bg-white/10 rounded-full">
                        <div className="h-2 bg-[#A3D1FF] rounded-full" style={{ width: '90%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-300">Core Web Vitals</span>
                        <span className="text-[#A3D1FF]">95/100</span>
                      </div>
                      <div className="h-2 bg-white/10 rounded-full">
                        <div className="h-2 bg-[#A3D1FF] rounded-full" style={{ width: '95%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-semibold text-white mb-6">2. Local SEO Strategy</h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <p className="text-gray-400 mb-4">
                    Implemented a comprehensive local SEO strategy focusing on:
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-center text-gray-300">
                      <CheckCircle2 className="w-5 h-5 text-[#A3D1FF] mr-3" />
                      Local keyword optimization
                    </li>
                    <li className="flex items-center text-gray-300">
                      <CheckCircle2 className="w-5 h-5 text-[#A3D1FF] mr-3" />
                      Google Business Profile optimization
                    </li>
                    <li className="flex items-center text-gray-300">
                      <CheckCircle2 className="w-5 h-5 text-[#A3D1FF] mr-3" />
                      Yelp business profile enhancement
                    </li>
                    <li className="flex items-center text-gray-300">
                      <CheckCircle2 className="w-5 h-5 text-[#A3D1FF] mr-3" />
                      Local citation building
                    </li>
                  </ul>
                </div>
                <div className="bg-[#1b1b1b] p-6 rounded-xl border border-white/10">
                  <h4 className="text-lg font-semibold text-white mb-4">SEO Results</h4>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-300">Local Search Visibility</span>
                        <span className="text-[#A3D1FF]">85%</span>
                      </div>
                      <div className="h-2 bg-white/10 rounded-full">
                        <div className="h-2 bg-[#A3D1FF] rounded-full" style={{ width: '85%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-300">Keyword Rankings</span>
                        <span className="text-[#A3D1FF]">Top 3</span>
                      </div>
                      <div className="h-2 bg-white/10 rounded-full">
                        <div className="h-2 bg-[#A3D1FF] rounded-full" style={{ width: '90%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#1b1b1b]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-12">Results & Impact</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <StatCard
              value="85%"
              label="Increase in Inquiries"
            />
            <StatCard
              value="90%"
              label="Faster Load Times"
            />
            <StatCard
              value="40%"
              label="Higher Engagement"
            />
            <StatCard
              value="Top 3"
              label="Local Rankings"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Transform Your Digital Presence?</h2>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Let's create a stunning website that drives real results for your business.
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