import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProjectCard3D from './ProjectCard3D';

interface Project {
  title: string;
  description: string;
  image: string;
  liveUrl?: string;
  caseStudyUrl?: string;
  impact: string[];
  technologies: string[];
  category: string;
}

interface PortfolioGridProps {
  projects: Project[];
  className?: string;
}

export default function PortfolioGrid({ projects, className = '' }: PortfolioGridProps) {
  return (
    <div className={`grid md:grid-cols-2 lg:grid-cols-3 gap-8 ${className}`}>
      <AnimatePresence mode="wait">
        {projects.map((project, index) => (
          <motion.div
            key={project.title}
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
          >
            <ProjectCard3D
              title={project.title}
              description={project.description}
              image={project.image}
              liveUrl={project.liveUrl}
              caseStudyUrl={project.caseStudyUrl}
              impact={project.impact}
              technologies={project.technologies}
              index={index}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}