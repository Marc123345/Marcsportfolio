import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Globe, Zap, Target, Plus } from 'lucide-react';
import PageWrapper from '@/components/PageWrapper';
import MagneticButton from '@/components/MagneticButton';

// Reusing your existing projects data structure
const projects = [
  {
    id: "01",
    title: "Untapped Africa",
    category: "Infrastructure System",
    description: "Revolutionizing water solutions with high-performance data visualization and project management architecture.",
    image: "https://ik.imagekit.io/qcvroy8xpd/Screenshot.png?updatedAt=1754018965491",
    liveUrl: "https://untappedafrica.co.za",
    technologies: ["Next.js", "Supabase", "Mapbox"],
    year: "2025"
  },
  {
    id: "02",
    title: "Binns Media",
    category: "Digital Platform",
    description: "A content-first ecosystem designed to amplify diverse voices through sub-second load times.",
    image: "https://i.imgur.com/IU0mmH7.jpeg",
    liveUrl: "https://www.binnsmediagroup.com",
    technologies: ["React 18", "GSAP", "Tailwind"],
    year: "2025"
  },
  {
    id: "03",
    title: "AutoMarginX",
    category: "SaaS Application",
    description: "Dealership management with AI-powered margin optimization and real-time market data.",
    image: "https://i.imgur.com/PiKh199.png",
    technologies: ["Node.js", "PostgreSQL", "React"],
    year: "2024"
  }
];

function ProjectRow({ project, index }: { project: any; index: number }) {
  const navigate = useNavigate();
  const container = useRef(null);
  
  // Parallax effect for the image
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"]
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [1.1, 1]);
  const textY = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <div ref={container} className="relative w-full min-h-screen flex items-center mb-32 md:mb-64">
      <div className="container-custom grid lg:grid-cols-12 gap-10 items-center">
        
        {/* Project Info - Left Side */}
        <div className="lg:col-span-5 z-10 space-y-8 order-2 lg:order-1">
          <motion.div style={{ y: textY }}>
            <div className="flex items-center gap-4 mb-4">
              <span className="text-[10px] font-black text-primary uppercase tracking-[0.5em]">{project.id}</span>
              <div className="h-px w-12 bg-white/10"></div>
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{project.category}</span>
            </div>
            
            <h2 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 group-hover:text-primary transition-colors">
              {project.title}
            </h2>
            
            <p className="text-xl text-gray-400 max-w-sm leading-relaxed mb-10">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-3 mb-12">
              {project.technologies.map((tech: string) => (
                <span key={tech} className="text-[10px] font-bold text-gray-600 border border-white/5 px-3 py-1 rounded-full uppercase tracking-widest">
                  {tech}
                </span>
              ))}
            </div>

            <MagneticButton>
              <button 
                onClick={() => navigate(`/work/case-studies/${project.title.toLowerCase().replace(/ /g, '-')}`)}
                className="group flex items-center gap-4 text-sm font-black uppercase tracking-[0.2em]"
              >
                Explore Project 
                <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                  <ArrowRight className="w-5 h-5" />
                </div>
              </button>
            </MagneticButton>
          </motion.div>
        </div>

        {/* Project Image - Right Side (The "Awwwards" Large Image) */}
        <div className="lg:col-span-7 order-1 lg:order-2">
          <motion.div 
            className="relative aspect-[4/5] md:aspect-[16/11] rounded-[2rem] md:rounded-[4rem] overflow-hidden bg-white/5 group cursor-pointer shadow-2xl"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.img 
              src={project.image} 
              style={{ scale: imageScale }}
              alt={project.title}
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
            />
            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
              <div className="w-24 h-24 bg-white text-black rounded-full flex items-center justify-center font-black uppercase text-[10px] tracking-widest">
                View
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </div>
  );
}

export default function WorkPage() {
  return (
    <>
      <Helmet>
        <title>Portfolio | Award-Winning Digital Architecture</title>
      </Helmet>

      <PageWrapper 
        category="Gallery"
        title="Selected Works"
        subtitle="Exploring the intersection of aesthetic precision and technical performance."
      >
        {/* Sticky Year/Meta side-scroller can go here */}
        
        <div className="mt-20">
          {projects.map((project, index) => (
            <ProjectRow key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* Massive Footer CTA */}
        <section className="py-64 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-7xl md:text-[12rem] font-black tracking-tighter leading-none mb-12">
              Next?
            </h2>
            <Link to="/contact" className="mr_btn mr_btn_primary">
              <span>Start a conversation</span>
            </Link>
          </motion.div>
        </section>
      </PageWrapper>
    </>
  );
}