import React from 'react';
import { ArrowRight, Star, Timer, Users, Target, Zap, CheckCircle2, ArrowUpRight, Heart, Shield, Activity } from 'lucide-react';
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

function ILightPage() {
  const navigate = useNavigate();

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center bg-black overflow-hidden">
        {/* Hero Video */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="https://ik.imagekit.io/qcvroy8xpd/original-5d90c3fbc38922b17ff20f48dfcfe9f7.mp4?updatedAt=1754940891023" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="absolute inset-0 bg-black/70"></div>
        </div>

        {/* Content */}
        <div className="container-custom relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-display-large text-white mb-6">
              iLight Care
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              A revolutionary healthcare technology platform that bridges the gap between patients and healthcare providers.
            </p>
            <div className="flex gap-4">
              <a 
                href="https://www.ilight.care"
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

      {/* Video Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-black">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-display-medium text-white mb-8 text-center">iLight Care in Action</h2>
          <div className="aspect-video overflow-hidden rounded-xl">
            <video
              controls
              className="w-full h-full object-cover"
              poster="https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?auto=format&fit=crop&w=2000&q=80"
            >
              <source src="https://ik.imagekit.io/qcvroy8xpd/original-5d90c3fbc38922b17ff20f48dfcfe9f7.mp4?updatedAt=1754940891023" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
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
                iLight Care is a revolutionary healthcare technology platform that bridges the gap between patients and healthcare providers. The platform focuses on making healthcare more accessible, efficient, and patient-centered through innovative digital solutions.
              </p>
              <div className="flex flex-wrap gap-3">
                {[
                  'Healthcare Tech',
                  'Patient Care',
                  'Digital Health',
                  'Telemedicine',
                  'React',
                  'Node.js'
                ].map((tag) => (
                  <span key={tag} className="px-4 py-2 bg-white/5 rounded-full text-sm text-[#A3D1FF]">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="space-y-6">
              <div className="bg-[#1b1b1b] p-6 rounded-xl border border-white/10">
                <h3 className="text-body-large font-semibold text-white mb-4">Healthcare Innovation</h3>
                <ul className="space-y-3">
                  <li className="flex items-center text-gray-300">
                    <CheckCircle2 className="w-5 h-5 text-[#A3D1FF] mr-3" />
                    Improved patient outcomes
                  </li>
                  <li className="flex items-center text-gray-300">
                    <CheckCircle2 className="w-5 h-5 text-[#A3D1FF] mr-3" />
                    Streamlined healthcare delivery
                  </li>
                  <li className="flex items-center text-gray-300">
                    <CheckCircle2 className="w-5 h-5 text-[#A3D1FF] mr-3" />
                    Enhanced accessibility
                  </li>
                  <li className="flex items-center text-gray-300">
                    <CheckCircle2 className="w-5 h-5 text-[#A3D1FF] mr-3" />
                    Data-driven insights
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
              <h2 className="text-display-medium text-white mb-6">The Challenge</h2>
              <p className="text-gray-400 mb-6">
                Healthcare systems face numerous challenges:
              </p>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <Star className="w-5 h-5 text-[#FFD700] mt-1 mr-3" />
                  <p className="text-gray-300">Limited access to quality healthcare services</p>
                </li>
                <li className="flex items-start">
                  <Star className="w-5 h-5 text-[#FFD700] mt-1 mr-3" />
                  <p className="text-gray-300">Inefficient patient management systems</p>
                </li>
                <li className="flex items-start">
                  <Star className="w-5 h-5 text-[#FFD700] mt-1 mr-3" />
                  <p className="text-gray-300">Lack of integrated healthcare data</p>
                </li>
                <li className="flex items-start">
                  <Star className="w-5 h-5 text-[#FFD700] mt-1 mr-3" />
                  <p className="text-gray-300">Need for remote healthcare solutions</p>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="text-display-medium text-white mb-6">The Solution</h2>
              <div className="grid gap-6">
                <FeatureCard
                  icon={Heart}
                  title="Patient-Centered Care"
                  description="Comprehensive platform putting patients at the center of their healthcare journey."
                />
                <FeatureCard
                  icon={Shield}
                  title="Secure Health Data"
                  description="HIPAA-compliant platform ensuring patient data privacy and security."
                />
                <FeatureCard
                  icon={Activity}
                  title="Real-time Monitoring"
                  description="Continuous health monitoring and data analytics for better outcomes."
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-display-medium text-white mb-12">Platform Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={Target}
              title="Telemedicine"
              description="Virtual consultations and remote patient monitoring capabilities."
            />
            <FeatureCard
              icon={Users}
              title="Patient Portal"
              description="Comprehensive patient portal for appointments, records, and communication."
            />
            <FeatureCard
              icon={Zap}
              title="Healthcare Analytics"
              description="Advanced analytics for healthcare providers to improve patient outcomes."
            />
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#1b1b1b]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-display-medium text-white mb-12">Results & Impact</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <StatCard
              value="85%"
              label="Patient Satisfaction"
            />
            <StatCard
              value="60%"
              label="Faster Consultations"
            />
            <StatCard
              value="40%"
              label="Reduced Wait Times"
            />
            <StatCard
              value="95%"
              label="Data Accuracy"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-display-medium text-white mb-4">Ready to Transform Healthcare?</h2>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Let's create a healthcare platform that improves patient outcomes and streamlines healthcare delivery.
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

export default ILightPage;