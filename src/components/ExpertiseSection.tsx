import React, { useEffect, useRef } from 'react';
import { Target, Users, Code, Sparkles, Lightbulb, Layers, Database, Zap, Shield } from 'lucide-react';
import SkillsLoader from './SkillsLoader';
import SectionHeading from './SectionHeading';

interface ExpertiseCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  features: string[];
  delay?: number;
}

function ExpertiseCard({ icon: Icon, title, description, features, delay = 0 }: ExpertiseCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('opacity-100', 'translate-y-0');
            }, delay);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    
    if (cardRef.current) {
      observer.observe(cardRef.current);
    }
    
    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, [delay]);

  return (
    <div 
      ref={cardRef}
      className="bg-[#1b1b1b] p-6 sm:p-8 rounded-xl border border-white/10 hover:border-[#A3D1FF] transition-all group hover:transform hover:-translate-y-2 duration-300 opacity-0 translate-y-10"
      style={{ transitionDuration: '0.8s', transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
    >
      <div className="relative mb-4 sm:mb-6">
        <div className="absolute inset-0 bg-[#A3D1FF]/20 blur-xl rounded-full"></div>
        <div className="bg-[#A3D1FF]/10 p-3 sm:p-4 rounded-xl relative">
          <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-[#A3D1FF] group-hover:scale-110 transition-transform" />
        </div>
      </div>
      <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-2 sm:mb-4">{title}</h3>
      <p className="text-sm sm:text-base text-gray-400 mb-4 sm:mb-6">{description}</p>
      <div className="flex flex-wrap gap-1.5 sm:gap-2">
        {features.map((feature, index) => (
          <span 
            key={index} 
            className="px-2 sm:px-3 py-1 bg-white/5 rounded-full text-xs sm:text-sm text-white hover:bg-[#A3D1FF]/20 transition-colors"
          >
            {feature}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function ExpertiseSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            titleRef.current?.classList.add('opacity-100', 'translate-y-0');
            sectionObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    
    if (sectionRef.current) {
      sectionObserver.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        sectionObserver.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section ref={sectionRef} className="py-16 sm:py-20 md:py-24 bg-black overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Our Expertise"
          title="Full-Stack Design Expertise"
          description="<strong class='text-white'>Delivering measurable results</strong> through strategic thinking and technical excellence"
        />

        <div className="max-w-2xl mx-auto mb-8 sm:mb-12 md:mb-16">
          <SkillsLoader />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          <ExpertiseCard
            icon={Target}
            title="Strategy & Planning"
            description="Increase ROI by 35% with strategic planning and roadmap development that aligns with your business goals."
            features={[
              "Market Research",
              "User Analysis",
              "Competitive Analysis",
              "ROI Planning"
            ]}
            delay={100}
          />

          <ExpertiseCard
            icon={Users}
            title="UI/UX Design"
            description="Boost conversions by 40% with user-centered design that transforms visitors into customers."
            features={[
              "User Research",
              "Wireframing",
              "Prototyping",
              "Design Systems"
            ]}
            delay={200}
          />

          <ExpertiseCard
            icon={Code}
            title="Development"
            description="Achieve 98/100 PageSpeed scores with modern technologies and performance optimization."
            features={[
              "React/Next.js",
              "Node.js",
              "TypeScript",
              "Supabase"
            ]}
            delay={300}
          />

          <ExpertiseCard
            icon={Database}
            title="Database Architecture"
            description="Reduce query times by 60% with robust database design and implementation for scalable applications."
            features={[
              "Schema Design",
              "Data Modeling",
              "Query Optimization",
              "Migration Strategy"
            ]}
            delay={400}
          />

          <ExpertiseCard
            icon={Shield}
            title="Security & Performance"
            description="Protect user data with enterprise-grade security measures and 99.9% uptime guarantee."
            features={[
              "Security Audits",
              "Performance Testing",
              "Load Balancing",
              "Caching Strategy"
            ]}
            delay={500}
          />

          <ExpertiseCard
            icon={Sparkles}
            title="AI Integration"
            description="Automate 60% of manual tasks with AI solutions that enhance user experiences and business operations."
            features={[
              "AI/ML Integration",
              "Natural Language",
              "Computer Vision",
              "Predictive Analytics"
            ]}
            delay={600}
          />
        </div>

        <div className="mt-8 sm:mt-12 md:mt-20 bg-[#1b1b1b] p-6 sm:p-8 rounded-xl border border-white/10 transform transition-all duration-1000 hover:border-[#A3D1FF]">
          <div className="grid md:grid-cols-2 gap-8 sm:gap-12">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">Our Development Process</h3>
              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-start">
                  <div className="bg-[#A3D1FF] text-black w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold mr-3 sm:mr-4 flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h4 className="text-base sm:text-lg font-semibold text-white mb-1 sm:mb-2">Discovery & Strategy</h4>
                    <p className="text-sm sm:text-base text-gray-400"><strong className="text-white">35% more effective</strong> project outcomes through comprehensive research and planning</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-[#A3D1FF] text-black w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold mr-3 sm:mr-4 flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h4 className="text-base sm:text-lg font-semibold text-white mb-1 sm:mb-2">Design & Prototyping</h4>
                    <p className="text-sm sm:text-base text-gray-400"><strong className="text-white">40% higher engagement</strong> with user-tested interfaces and interactive prototypes</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-[#A3D1FF] text-black w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold mr-3 sm:mr-4 flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h4 className="text-base sm:text-lg font-semibold text-white mb-1 sm:mb-2">Development & Testing</h4>
                    <p className="text-sm sm:text-base text-gray-400"><strong className="text-white">98/100 PageSpeed scores</strong> through optimized code and rigorous testing</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-[#A3D1FF] text-black w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold mr-3 sm:mr-4 flex-shrink-0">
                    4
                  </div>
                  <div>
                    <h4 className="text-base sm:text-lg font-semibold text-white mb-1 sm:mb-2">Launch & Support</h4>
                    <p className="text-sm sm:text-base text-gray-400"><strong className="text-white">99.9% uptime</strong> with continuous monitoring and proactive maintenance</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">Technologies We Use</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white/5 p-4 rounded-lg hover:bg-white/10 transition-colors">
                  <h4 className="text-base sm:text-lg font-semibold text-white mb-2">Frontend</h4>
                  <ul className="space-y-2 text-sm sm:text-base text-gray-400">
                    <li className="flex items-center">
                      <span className="w-1.5 h-1.5 bg-[#A3D1FF] rounded-full mr-2"></span>
                      React & Next.js
                    </li>
                    <li className="flex items-center">
                      <span className="w-1.5 h-1.5 bg-[#A3D1FF] rounded-full mr-2"></span>
                      TypeScript
                    </li>
                    <li className="flex items-center">
                      <span className="w-1.5 h-1.5 bg-[#A3D1FF] rounded-full mr-2"></span>
                      Tailwind CSS
                    </li>
                    <li className="flex items-center">
                      <span className="w-1.5 h-1.5 bg-[#A3D1FF] rounded-full mr-2"></span>
                      Framer Motion
                    </li>
                  </ul>
                </div>
                <div className="bg-white/5 p-4 rounded-lg hover:bg-white/10 transition-colors">
                  <h4 className="text-base sm:text-lg font-semibold text-white mb-2">Backend</h4>
                  <ul className="space-y-2 text-sm sm:text-base text-gray-400">
                    <li className="flex items-center">
                      <span className="w-1.5 h-1.5 bg-[#A3D1FF] rounded-full mr-2"></span>
                      Node.js
                    </li>
                    <li className="flex items-center">
                      <span className="w-1.5 h-1.5 bg-[#A3D1FF] rounded-full mr-2"></span>
                      PostgreSQL
                    </li>
                    <li className="flex items-center">
                      <span className="w-1.5 h-1.5 bg-[#A3D1FF] rounded-full mr-2"></span>
                      GraphQL
                    </li>
                    <li className="flex items-center">
                      <span className="w-1.5 h-1.5 bg-[#A3D1FF] rounded-full mr-2"></span>
                      Redis
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}