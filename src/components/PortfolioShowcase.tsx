import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  caseStudyUrl?: string;
  liveUrl?: string;
}

const projects: Project[] = [
  {
    id: 'binns-media',
    title: 'Binns Media Group',
    description: 'A cutting-edge digital media platform showcasing diverse content portfolio.',
    image: 'https://i.imgur.com/IU0mmH7.jpeg',
    caseStudyUrl: '/work/case-studies/binns-media',
    liveUrl: 'https://www.binnsmediagroup.com'
  },
  {
    id: 'untapped-africa',
    title: 'Untapped Africa',
    description: 'Revolutionizing water infrastructure solutions across Africa.',
    image: 'https://ik.imagekit.io/qcvroy8xpd/Screenshot.png?updatedAt=1754018965491',
    caseStudyUrl: '/work/case-studies/untapped-africa',
    liveUrl: 'https://untappedafrica.co.za'
  },
  {
    id: 'automargin',
    title: 'AutoMargin Dashboard',
    description: 'Revolutionary dealership management platform with market data analytics.',
    image: 'https://i.imgur.com/PiKh199.png',
    caseStudyUrl: '/work/case-studies/automarginx',
  }
];

export default function PortfolioShowcase() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const navigate = useNavigate();
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);
  const isVisibleRef = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const currentProject = projects[currentIndex];
  
  // Set up visibility observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        isVisibleRef.current = entries[0].isIntersecting;
        
        // Start or stop autoplay based on visibility
        if (entries[0].isIntersecting) {
          startAutoplay();
        } else {
          stopAutoplay();
        }
      },
      { threshold: 0.1 }
    );
    
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    
    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);
  
  // Auto-advance carousel when visible
  const startAutoplay = () => {
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
    }
    
    autoplayRef.current = setInterval(() => {
      if (isVisibleRef.current) {
        if (currentIndex < projects.length - 1) {
          setDirection(1);
          setCurrentIndex(currentIndex + 1);
        } else {
          setDirection(-1);
          setCurrentIndex(0);
        }
      }
    }, 5000);
  };
  
  const stopAutoplay = () => {
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
      autoplayRef.current = null;
    }
  };
  
  // Start autoplay on mount
  useEffect(() => {
    startAutoplay();
    
    return () => {
      stopAutoplay();
    };
  }, [currentIndex]);

  const nextProject = () => {
    stopAutoplay();
    if (currentIndex < projects.length - 1) {
      setDirection(1);
      setCurrentIndex(currentIndex + 1);
    } else {
      setDirection(-1);
      setCurrentIndex(0);
    }
    startAutoplay();
  };

  const prevProject = () => {
    stopAutoplay();
    if (currentIndex > 0) {
      setDirection(-1);
      setCurrentIndex(currentIndex - 1);
    } else {
      setDirection(1);
      setCurrentIndex(projects.length - 1);
    }
    startAutoplay();
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[500px] sm:h-[550px] md:h-[600px] lg:h-[650px] overflow-hidden bg-[#1b1b1b] rounded-xl border border-white/10"
    >
      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.div
          key={currentProject.id}
          custom={direction}
          initial={{
            opacity: 0,
            x: direction === 1 ? 300 : -300
          }}
          animate={{
            opacity: 1,
            x: 0
          }}
          exit={{
            opacity: 0,
            x: direction === 1 ? -300 : 300
          }}
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.5 }
          }}
          className="absolute inset-0 flex flex-col md:grid md:grid-cols-2"
        >
          {/* Image Section */}
          <div className="relative overflow-hidden h-[250px] sm:h-[280px] md:h-full">
            <motion.img
              src={currentProject.image}
              alt={currentProject.title}
              className="w-full h-full object-cover"
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.7 }}
              loading="lazy"
            />
            {/* Gradient overlays */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#1b1b1b] hidden md:block"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#1b1b1b] via-[#1b1b1b]/80 to-transparent md:hidden"></div>
          </div>

          {/* Content Section */}
          <div className="flex flex-col justify-center p-4 xs:p-5 sm:p-6 md:p-8 lg:p-12 relative h-[250px] sm:h-[270px] md:h-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="flex flex-col h-full justify-between md:justify-center md:max-w-md"
            >
              <div className="flex-1 flex flex-col justify-center md:flex-none">
                <h3 className="text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2 sm:mb-3 md:mb-4 leading-tight">
                  {currentProject.title}
                </h3>
                <p className="text-xs xs:text-sm sm:text-base md:text-lg text-gray-300 mb-4 sm:mb-5 md:mb-6 lg:mb-8 line-clamp-2 sm:line-clamp-3 md:line-clamp-none">
                  {currentProject.description}
                </p>
              </div>

              {/* Buttons */}
              <div className="flex flex-col xs:flex-row flex-wrap gap-2 xs:gap-3 sm:gap-4">
                {currentProject.caseStudyUrl && (
                  <button
                    onClick={() => navigate(currentProject.caseStudyUrl!)}
                    className="mr_btn mr_btn_primary text-xs xs:text-sm sm:text-base w-full xs:w-auto flex-1 xs:flex-none whitespace-nowrap"
                  >
                    <span>Read Case Study</span>
                  </button>
                )}

                {currentProject.liveUrl && (
                  <a
                    href={currentProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mr_btn mr_btn_outline text-xs xs:text-sm sm:text-base w-full xs:w-auto flex-1 xs:flex-none whitespace-nowrap"
                  >
                    <span className="flex items-center justify-center gap-2">
                      <span className="hidden xs:inline">View Live</span>
                      <span className="xs:hidden">Visit Site</span>
                      <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
                    </span>
                  </a>
                )}
              </div>

              {/* Progress Indicators - Mobile Only */}
              <div className="flex justify-center gap-2 mt-4 md:hidden">
                {projects.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      stopAutoplay();
                      setDirection(index > currentIndex ? 1 : -1);
                      setCurrentIndex(index);
                      startAutoplay();
                    }}
                    className={`h-1 rounded-full transition-all duration-300 ${
                      index === currentIndex
                        ? 'w-8 bg-[#A3D1FF]'
                        : 'w-1 bg-white/30 hover:bg-white/50'
                    }`}
                    aria-label={`Go to project ${index + 1}`}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Buttons - Adjusted for mobile */}
      <button
        onClick={prevProject}
        className="absolute left-2 xs:left-3 sm:left-4 top-[125px] sm:top-[140px] md:top-1/2 transform -translate-y-1/2 z-10 w-9 h-9 xs:w-10 xs:h-10 sm:w-12 sm:h-12 bg-black/70 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-[#A3D1FF] hover:text-black transition-all hover:scale-110 active:scale-95 shadow-lg"
        aria-label="Previous project"
      >
        <ArrowLeft className="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6" />
      </button>

      <button
        onClick={nextProject}
        className="absolute right-2 xs:right-3 sm:right-4 top-[125px] sm:top-[140px] md:top-1/2 transform -translate-y-1/2 z-10 w-9 h-9 xs:w-10 xs:h-10 sm:w-12 sm:h-12 bg-black/70 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-[#A3D1FF] hover:text-black transition-all hover:scale-110 active:scale-95 shadow-lg"
        aria-label="Next project"
      >
        <ArrowRight className="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6" />
      </button>

      {/* Project Counter - Desktop Only */}
      <div className="hidden md:flex absolute bottom-4 lg:bottom-6 right-4 lg:right-6 bg-black/70 backdrop-blur-sm rounded-full px-4 py-2 text-white text-sm">
        <span className="text-[#A3D1FF] font-semibold">{currentIndex + 1}</span>
        <span className="mx-1">/</span>
        <span className="text-gray-400">{projects.length}</span>
      </div>
    </div>
  );
}