import React from 'react';
import PageWrapper from '@/components/PageWrapper';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const projects = [
  { 
    title: "NexGen Logistics", 
    cat: "B2B Sales Ecosystem", 
    img: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=1200",
    slug: "nexgen-logistics"
  },
  { 
    title: "Venture Capital Hub", 
    cat: "Corporate Branding & Dev", 
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200",
    slug: "venture-capital"
  },
  { 
    title: "Aura Health Tech", 
    cat: "React Ecommerce", 
    img: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=1200",
    slug: "aura-health"
  }
];

export default function WorkPage() {
  return (
    <PageWrapper 
      category="Portfolio"
      title="Selected Work"
      subtitle="A collection of systems built to scale revenue, authority, and influence."
    >
      <div className="grid gap-12">
        {projects.map((project, i) => (
          <Link to={`/work/case-studies/${project.slug}`} key={i} className="group block">
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative aspect-[16/9] rounded-[3rem] overflow-hidden bg-white/5"
            >
              <img 
                src={project.img} 
                alt={project.title} 
                className="absolute inset-0 w-full h-full object-cover grayscale brightness-50 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000 ease-out" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent p-8 md:p-16 flex flex-col justify-end">
                <span className="text-xs font-bold text-[#A3D1FF] uppercase tracking-[0.4em] mb-4">{project.cat}</span>
                <div className="flex justify-between items-end">
                  <h3 className="text-4xl md:text-7xl font-black tracking-tighter">{project.title}</h3>
                  <div className="hidden md:flex w-20 h-20 bg-white rounded-full items-center justify-center -rotate-45 group-hover:rotate-0 transition-transform duration-500">
                    <ArrowRight className="w-8 h-8 text-black" />
                  </div>
                </div>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </PageWrapper>
  );
}