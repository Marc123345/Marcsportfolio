import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  caseStudyUrl?: string;
  liveUrl?: string;
  category: string;
  size?: 'small' | 'medium' | 'large';
}

const projects: Project[] = [
  {
    id: 'binns-media',
    title: 'Binns Media Group',
    description: 'Digital media platform showcasing diverse content portfolio.',
    image: 'https://i.imgur.com/IU0mmH7.jpeg',
    caseStudyUrl: '/work/case-studies/binns-media',
    liveUrl: 'https://www.binnsmediagroup.com',
    category: 'website',
    size: 'large'
  },
  {
    id: 'marginx',
    title: 'MarginX Dashboard',
    description: 'Dealership management platform with market data analytics.',
    image: 'https://i.imgur.com/PiKh199.png',
    caseStudyUrl: '/work/case-studies/automarginx',
    category: 'saas',
    size: 'medium'
  },
  {
    id: 'chad-le-clos',
    title: 'Chad Le Clos Swimming',
    description: 'Landing page for Olympic champion\'s swimming clinics.',
    image: 'https://i.imgur.com/ApfYPlH.jpg',
    caseStudyUrl: '/work/case-studies/chad-le-clos',
    liveUrl: 'https://chadleclosswimming.com',
    category: 'landing',
    size: 'small'
  },
  {
    id: 'videoleap',
    title: 'Videoleap',
    description: 'Video editing platform with template marketplace.',
    image: 'https://i.imgur.com/SubVB9A.jpeg',
    caseStudyUrl: '/work/case-studies/videoleap',
    category: 'saas',
    size: 'medium'
  }
];

interface PortfolioMasonryProps {
  className?: string;
  filter?: string;
}

export default function PortfolioMasonry({ className = '', filter = 'all' }: PortfolioMasonryProps) {
  const navigate = useNavigate();
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  
  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.category === filter);

  return (
    <div className={`grid grid-cols-1 md:grid-cols-12 gap-4 ${className}`}>
      <AnimatePresence>
        {filteredProjects.map((project) => {
          // Determine column span based on size
          let colSpan = 'md:col-span-4'; // default for small
          if (project.size === 'medium') colSpan = 'md:col-span-6';
          if (project.size === 'large') colSpan = 'md:col-span-8';
          
          return (
            <motion.div
              key={project.id}
              className={`${colSpan} relative overflow-hidden rounded-xl`}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
              onMouseEnter={() => setHoveredId(project.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700"
                  style={{
                    transform: hoveredId === project.id ? 'scale(1.1)' : 'scale(1)'
                  }}
                />
                
                {/* Overlay */}
                <div 
                  className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent transition-opacity duration-300"
                  style={{
                    opacity: hoveredId === project.id ? 1 : 0
                  }}
                ></div>
                
                {/* Content */}
                <div 
                  className="absolute inset-0 flex flex-col justify-end p-6 transition-all duration-300"
                  style={{
                    opacity: hoveredId === project.id ? 1 : 0,
                    transform: hoveredId === project.id ? 'translateY(0)' : 'translateY(20px)'
                  }}
                >
                  <h3 className="text-heading-large text-white mb-2">{project.title}</h3>
                  <p className="text-gray-300 mb-4">{project.description}</p>
                  
                  <div className="flex gap-3">
                    {project.caseStudyUrl && (
                      <button onClick={() => navigate(project.caseStudyUrl!)} className="mr_btn mr_btn_primary">
                        <span>Read Case Study</span>
                      </button>
                    )}
                    
                    {project.liveUrl && (
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="mr_btn mr_btn_outline">
                        <span>View Live Website</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}