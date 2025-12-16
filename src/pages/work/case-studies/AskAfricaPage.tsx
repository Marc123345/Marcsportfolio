import React from 'react';
import { ArrowRight, Star, Timer, Users, Target, Zap, CheckCircle2, ArrowUpRight, Building, Globe, Award } from 'lucide-react';
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

export default function AskAfricaPage() {
  const navigate = useNavigate();

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center bg-black overflow-hidden">
        {/* Hero Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://ik.imagekit.io/qcvroy8xpd/mockuuups-kzccsqfybhcjamey4qqdwh.jpeg?updatedAt=1754029601130"
            alt="Ask Africa"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/70"></div>
        </div>

        {/* Content */}
        <div className="container-custom relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Ask Africa
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Corporate website rebrand for South Africa's leading market research firm with 30+ years of industry expertise.
            </p>
            <div className="flex gap-4">
              <a 
                href="https://askafrika.co.za"
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
                Ask Africa is South Africa's leading market research firm with over 30 years of industry expertise. This corporate rebrand project required rapid development and close coordination with multiple stakeholders to deliver a professional website on a tight timeline.
              </p>
              <div className="flex flex-wrap gap-3">
                {[
                  'Corporate Rebrand',
                  'Market Research',
                  'Stakeholder Management',
                  'Rapid Development',
                  'Professional Services',
                  'South Africa'
                ].map((tag) => (
                  <span key={tag} className="px-4 py-2 bg-white/5 rounded-full text-sm text-[#A3D1FF]">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="space-y-6">
              <div className="bg-[#1b1b1b] p-6 rounded-xl border border-white/10">
                <h3 className="text-xl font-semibold text-white mb-4">Project Highlights</h3>
                <ul className="space-y-3">
                  <li className="flex items-center text-gray-300">
                    <CheckCircle2 className="w-5 h-5 text-[#A3D1FF] mr-3" />
                    Rapid development timeline
                  </li>
                  <li className="flex items-center text-gray-300">
                    <CheckCircle2 className="w-5 h-5 text-[#A3D1FF] mr-3" />
                    Multiple stakeholder coordination
                  </li>
                  <li className="flex items-center text-gray-300">
                    <CheckCircle2 className="w-5 h-5 text-[#A3D1FF] mr-3" />
                    Complete corporate rebrand
                  </li>
                  <li className="flex items-center text-gray-300">
                    <CheckCircle2 className="w-5 h-5 text-[#A3D1FF] mr-3" />
                    30+ years industry leadership
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="aspect-[16/10] overflow-hidden rounded-xl">
              <img 
                src="https://ik.imagekit.io/qcvroy8xpd/mockuuups-kzccsqfybhcjamey4qqdwh.jpeg?updatedAt=1754029601130"
                alt="Ask Africa Website Design"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="aspect-[16/10] overflow-hidden rounded-xl">
              <img 
                src="https://ik.imagekit.io/qcvroy8xpd/mockuuups-transparent-macbook-pro-mockup.png?updatedAt=1754029818592"
                alt="Ask Africa MacBook Pro Mockup"
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
                Ask Africa needed a complete corporate rebrand with:
              </p>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <Star className="w-5 h-5 text-[#FFD700] mt-1 mr-3" />
                  <p className="text-gray-300">Extremely tight deadline requiring rapid execution</p>
                </li>
                <li className="flex items-start">
                  <Star className="w-5 h-5 text-[#FFD700] mt-1 mr-3" />
                  <p className="text-gray-300">Multiple stakeholders requiring coordination</p>
                </li>
                <li className="flex items-start">
                  <Star className="w-5 h-5 text-[#FFD700] mt-1 mr-3" />
                  <p className="text-gray-300">Professional corporate image requirements</p>
                </li>
                <li className="flex items-start">
                  <Star className="w-5 h-5 text-[#FFD700] mt-1 mr-3" />
                  <p className="text-gray-300">Need to reflect 30+ years of industry expertise</p>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">The Solution</h2>
              <div className="grid gap-6">
                <FeatureCard
                  icon={Timer}
                  title="Rapid Development"
                  description="Efficient development workflows to meet the tight deadline."
                />
                <FeatureCard
                  icon={Users}
                  title="Stakeholder Management"
                  description="Close collaboration and communication with multiple team members."
                />
                <FeatureCard
                  icon={Building}
                  title="Corporate Focus"
                  description="Professional design reflecting industry leadership and expertise."
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Development Process */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-12">Development Process</h2>
          <div className="space-y-12">
            <div className="flex items-start">
              <div className="bg-[#A3D1FF] text-black w-12 h-12 rounded-full flex items-center justify-center font-bold mr-6">
                1
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Stakeholder Alignment</h3>
                <p className="text-gray-400">Coordinated with multiple stakeholders to understand requirements and brand vision within the tight timeline.</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-[#A3D1FF] text-black w-12 h-12 rounded-full flex items-center justify-center font-bold mr-6">
                2
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Rapid Development</h3>
                <p className="text-gray-400">Implemented efficient development workflows to deliver a professional corporate website on an accelerated timeline.</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-[#A3D1FF] text-black w-12 h-12 rounded-full flex items-center justify-center font-bold mr-6">
                3
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Quality Assurance</h3>
                <p className="text-gray-400">Thorough testing and review process despite the compressed timeline to ensure professional standards.</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-[#A3D1FF] text-black w-12 h-12 rounded-full flex items-center justify-center font-bold mr-6">
                4
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Successful Launch</h3>
                <p className="text-gray-400">On-time delivery with successful rebrand launch and positive stakeholder feedback.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#1b1b1b]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-12">Results & Impact</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <StatCard
              value="Multiple"
              label="Stakeholders Coordinated"
            />
            <StatCard
              value="30+ Years"
              label="Industry Leadership"
            />
            <StatCard
              value="100%"
              label="On-Time Delivery"
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
                src="https://res.cloudinary.com/dadgglcaq/image/upload/v1747047684/1743012689368_dfjfsr.jpg"
                alt="Anoushka Rademeyer"
                className="w-24 h-24 rounded-full object-cover"
              />
              <div>
                <p className="text-xl text-gray-300 italic mb-4">
                  "Marc delivered professional work with excellent attention to detail. His expertise in digital communications and web development made our project a success."
                </p>
                <p className="text-white font-bold">— Anoushka Rademeyer, Head of Digital Communications & Reputation at ASK AFRICA</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Need a Corporate Rebrand?</h2>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Let's create a professional corporate website that reflects your industry leadership and expertise.
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