import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Target, Zap, Layers, BarChart3 } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageWrapper from '@/components/PageWrapper';

const services = [
  { 
    title: "B2B Sales Funnels", 
    path: "b2b-funnels", 
    desc: "Automated ecosystem built to turn cold traffic into high-ticket revenue.",
    icon: <Target className="w-6 h-6" />
  },
  { 
    title: "Ecommerce Solutions", 
    path: "ecommerce", 
    desc: "Headless React + GSAP storefronts engineered for sub-second load times.",
    icon: <Zap className="w-6 h-6" />
  },
  { 
    title: "Design Systems", 
    path: "design-systems", 
    desc: "Scalable UI architecture that maintains brand integrity across products.",
    icon: <Layers className="w-6 h-6" />
  },
  { 
    title: "Fractional CMO", 
    path: "fractional-cmo", 
    desc: "Strategic marketing oversight for growth-stage B2B service providers.",
    icon: <BarChart3 className="w-6 h-6" />
  }
];

export default function ServicesPage() {
  return (
    <PageWrapper 
      category="Our Expertise"
      title="Growth Services"
      subtitle="Engineering high-performance conversion systems for modern B2B brands."
    >
      <div className="grid md:grid-cols-2 gap-px bg-white/10 border border-white/10 overflow-hidden rounded-[2.5rem]">
        {services.map((service, index) => (
          <Link 
            key={service.title} 
            to={`/services/${service.path}`}
            className="group relative bg-black p-10 md:p-16 hover:bg-[#A3D1FF] transition-all duration-500 ease-in-out flex flex-col justify-between aspect-square md:aspect-auto md:min-h-[400px]"
          >
            <div className="flex justify-between items-start">
              <div className="p-4 bg-white/5 rounded-2xl group-hover:bg-black/10 transition-colors">
                {React.cloneElement(service.icon as React.ReactElement, { 
                  className: "w-6 h-6 group-hover:text-black transition-colors" 
                })}
              </div>
              <ArrowUpRight className="w-8 h-8 text-gray-700 group-hover:text-black group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
            </div>
            
            <div>
              <h3 className="text-4xl font-black group-hover:text-black transition-colors mb-4 tracking-tighter">
                {service.title}
              </h3>
              <p className="text-gray-500 group-hover:text-black/70 font-medium text-lg max-w-xs transition-colors">
                {service.desc}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </PageWrapper>
  );
}