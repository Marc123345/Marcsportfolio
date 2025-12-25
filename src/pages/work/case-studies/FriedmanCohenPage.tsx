import React from 'react';
import { ArrowRight, Star, Timer, Users, Target, Zap, CheckCircle2, ArrowUpRight, Calendar, MapPin, Mail } from 'lucide-react';
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

function TestimonialCard({ name, role, quote }: { name: string; role: string; quote: string }) {
  return (
    <div className="bg-[#1b1b1b] p-8 rounded-xl border border-white/10 hover:border-[#A3D1FF] transition-all">
      <div className="flex items-center gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i}
            className="w-4 h-4 fill-[#A3D1FF] text-[#A3D1FF]"
          />
        ))}
      </div>
      <p className="text-gray-300 italic mb-6">{quote}</p>
      <div>
        <p className="text-white font-semibold">{name}</p>
        <p className="text-gray-400">{role}</p>
      </div>
    </div>
  );
}

export default function FriedmanCohenPage() {
  const navigate = useNavigate();

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center bg-black overflow-hidden">
        {/* Hero Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://i.imgur.com/6kjURhx.jpeg"
            alt="Friedman & Cohen Store"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/70"></div>
        </div>

        {/* Content */}
        <div className="container-custom relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center space-x-2 bg-white/5 backdrop-blur-sm rounded-full px-4 py-2 border border-white/10 hover:border-[#A3D1FF] transition-all duration-300 mb-6">
              <span className="text-[#A3D1FF] text-sm font-medium">100+ Years of Excellence</span>
            </div>
            <h1 className="text-display-large text-white mb-6">
              Friedman & Cohen
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              A century-old legacy of retail excellence, now pioneering B2B procurement solutions for property developers and the hospitality industry.
            </p>
            <div className="flex gap-4">
              <a 
                href="https://fandc.co.za"
                target="_blank"
                rel="noopener noreferrer"
                className="mr_btn mr_btn_primary group relative overflow-hidden"
              >
                <span className="relative z-10">Visit Website</span>
                <div className="absolute inset-0 bg-white transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
                <ArrowUpRight className="ml-2 w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Image Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="aspect-[4/3] overflow-hidden rounded-xl">
              <img 
                src="https://i.imgur.com/te3NDvf.png"
                alt="Friedman & Cohen Interior"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="aspect-[4/3] overflow-hidden rounded-xl">
              <img 
                src="https://i.imgur.com/RQCRhM3.jpeg"
                alt="Friedman & Cohen Products"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Project Overview */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-display-medium text-white mb-6">Project Overview</h2>
              <p className="text-gray-400 mb-6">
                Friedman & Cohen, a cornerstone of the Western Cape community for over 100 years, has evolved from a traditional department store into a digital-first procurement powerhouse. Our latest venture, F&C Procurement, specializes in providing comprehensive furnishing solutions for property developers, student accommodations, and the hospitality sector.
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-[#A3D1FF] mt-1 mr-3" />
                  <div>
                    <p className="text-white font-medium">Role</p>
                    <p className="text-gray-400">Lead Product Designer</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-[#A3D1FF] mt-1 mr-3" />
                  <div>
                    <p className="text-white font-medium">Timeline</p>
                    <p className="text-gray-400">14 months</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-[#A3D1FF] mt-1 mr-3" />
                  <div>
                    <p className="text-white font-medium">Team</p>
                    <p className="text-gray-400">Cross-functional team of designers, developers, and stakeholders</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <div className="bg-[#1b1b1b] p-6 rounded-xl border border-white/10">
                <h3 className="text-body-large font-semibold text-white mb-4">Key Achievements</h3>
                <ul className="space-y-3">
                  <li className="flex items-center text-gray-300">
                    <CheckCircle2 className="w-5 h-5 text-[#A3D1FF] mr-3" />
                    100+ years of trusted service
                  </li>
                  <li className="flex items-center text-gray-300">
                    <CheckCircle2 className="w-5 h-5 text-[#A3D1FF] mr-3" />
                    4.4/5 rating from 1,351+ Google reviews
                  </li>
                  <li className="flex items-center text-gray-300">
                    <CheckCircle2 className="w-5 h-5 text-[#A3D1FF] mr-3" />
                    Successful digital transformation
                  </li>
                  <li className="flex items-center text-gray-300">
                    <CheckCircle2 className="w-5 h-5 text-[#A3D1FF] mr-3" />
                    Nationwide B2B procurement service
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#1b1b1b]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-display-medium text-white mb-12">Our Services</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={Timer}
              title="Student Housing"
              description="Complete furnishing solutions for student accommodations, from beds to study spaces."
            />
            <FeatureCard
              icon={Users}
              title="Property Development"
              description="Comprehensive procurement for residential and commercial developments."
            />
            <FeatureCard
              icon={Target}
              title="Logistics & Installation"
              description="End-to-end delivery and installation services nationwide."
            />
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-display-medium text-white mb-12">Our Process</h2>
          <div className="space-y-12">
            <div className="flex items-start">
              <div className="bg-[#A3D1FF] text-black w-12 h-12 rounded-full flex items-center justify-center font-bold mr-6">
                1
              </div>
              <div>
                <h3 className="text-body-large font-semibold text-white mb-2">Quotation & Planning</h3>
                <p className="text-gray-400">Detailed quotations and project planning tailored to your needs.</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-[#A3D1FF] text-black w-12 h-12 rounded-full flex items-center justify-center font-bold mr-6">
                2
              </div>
              <div>
                <h3 className="text-body-large font-semibold text-white mb-2">Sample Presentation</h3>
                <p className="text-gray-400">Curated selection of furniture and fixtures for your approval.</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-[#A3D1FF] text-black w-12 h-12 rounded-full flex items-center justify-center font-bold mr-6">
                3
              </div>
              <div>
                <h3 className="text-body-large font-semibold text-white mb-2">Procurement & Logistics</h3>
                <p className="text-gray-400">Efficient sourcing and delivery coordination.</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-[#A3D1FF] text-black w-12 h-12 rounded-full flex items-center justify-center font-bold mr-6">
                4
              </div>
              <div>
                <h3 className="text-body-large font-semibold text-white mb-2">Installation & Support</h3>
                <p className="text-gray-400">Professional installation and ongoing customer support.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#1b1b1b]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-display-medium text-white mb-12">Impact & Recognition</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <StatCard
              value="100+"
              label="Years of Excellence"
            />
            <StatCard
              value="1,351+"
              label="Google Reviews"
            />
            <StatCard
              value="4.4/5"
              label="Customer Rating"
            />
            <StatCard
              value="40+"
              label="Property Partners"
            />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-display-medium text-white mb-12">Client Testimonials</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <TestimonialCard
              name="Marita Sabatier"
              role="Property Developer"
              quote="You can buy everything under one roof. Friendly service and helpful staff. Their procurement team is exceptional."
            />
            <TestimonialCard
              name="Annmarie Kruger"
              role="Student Housing Manager"
              quote="Everything under one roof, even specialized furniture for student accommodations. The quality and service are outstanding."
            />
            <TestimonialCard
              name="Mona De Wet"
              role="Interior Designer"
              quote="What a lovely experience. The shop has everything from furniture to fixtures. Their B2B service is a game-changer."
            />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#1b1b1b]">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-display-medium text-white mb-6">Get in Touch</h2>
              <p className="text-gray-400 mb-8">
                Ready to discuss your procurement needs? Our team is here to help you create exceptional spaces.
              </p>
              <div className="space-y-4">
                <a 
                  href="mailto:marcf@marcfriedmanwebdesign.com"
                  className="flex items-center gap-3 text-gray-300 hover:text-[#A3D1FF] transition-colors"
                >
                  <Mail className="w-5 h-5" />
                  marcf@marcfriedmanwebdesign.com
                </a>
                <div className="flex items-center gap-3 text-gray-300">
                  <MapPin className="w-5 h-5" />
                  30 Main Rd, Strand, Cape Town, 7140
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <Calendar className="w-5 h-5" />
                  Available Monday - Friday, 9am - 5pm
                </div>
              </div>
            </div>
            <div>
              <button 
                onClick={() => navigate('/contact')}
                className="w-full bg-[#A3D1FF] text-black px-6 py-3 rounded-lg hover:bg-[#92bce6] transition-colors inline-flex items-center justify-center"
              >
                Request a Quote
                <ArrowRight className="ml-2 w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}