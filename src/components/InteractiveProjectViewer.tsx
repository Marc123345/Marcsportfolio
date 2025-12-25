import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  caseStudyUrl?: string;
  liveUrl?: string;
  category: string;
}

const projects: Project[] = [
  {
    id: 'binns-media',
    title: 'Binns Media Group Platform',
    description: 'A cutting-edge digital media platform showcasing BMG\'s diverse content portfolio including podcasts, TV shows, and exclusive content.',
    image: 'https://i.imgur.com/IU0mmH7.jpeg',
    caseStudyUrl: '/work/case-studies/binns-media',
    liveUrl: 'https://www.binnsmediagroup.com',
    category: 'Media'
  },
  {
    id: 'untapped-africa',
    title: 'Untapped Africa',
    description: 'Revolutionizing water infrastructure solutions across Africa with innovative technology.',
    image: 'https://ik.imagekit.io/qcvroy8xpd/Screenshot.png?updatedAt=1754018965491',
    caseStudyUrl: '/work/case-studies/untapped-africa',
    liveUrl: 'https://untappedafrica.co.za',
    category: 'Social Impact'
  },
  {
    id: 'automargin',
    title: 'AutoMargin Dashboard',
    description: 'A revolutionary dealership management platform that transforms how automotive dealers access and utilize market data.',
    image: 'https://i.imgur.com/PiKh199.png',
    caseStudyUrl: '/work/case-studies/automarginx',
    category: 'Automotive'
  },
  {
    id: 'videoleap',
    title: 'Videoleap',
    description: 'Enhancing user engagement and template utilization for a leading video editing platform.',
    image: 'https://i.imgur.com/SubVB9A.jpeg',
    caseStudyUrl: '/work/case-studies/videoleap',
    category: 'Media & Entertainment'
  }
];

export default function InteractiveProjectViewer() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const constraintsRef = useRef(null);
  const navigate = useNavigate();
  const isVisibleRef = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);
  
  const x = useMotionValue(0);
  const scale = useTransform(x, [-200, 0, 200], [0.9, 1, 0.9]);
  const rotate = useTransform(x, [-200, 0, 200], [-8, 0, 8]);
  const opacity = useTransform(x, [-200, -150, 0, 150, 200], [0.3, 1, 1, 1, 0.3]);
  
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
      if (isVisibleRef.current && !isDragging) {
        if (currentIndex < projects.length - 1) {
          setDirection(1);
          setCurrentIndex(currentIndex + 1);
        } else {
          setDirection(-1);
          setCurrentIndex(0);
        }
      }
    }, 6000);
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
  
  const handleDragEnd = (e: any, info: any) => {
    setIsDragging(false);
    
    if (info.offset.x > 100 && currentIndex > 0) {
      setDirection(-1);
      setCurrentIndex(currentIndex - 1);
    } else if (info.offset.x < -100 && currentIndex < projects.length - 1) {
      setDirection(1);
      setCurrentIndex(currentIndex + 1);
    }
  };

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
  
  const handleViewCaseStudy = () => {
    if (currentProject.caseStudyUrl) {
      navigate(currentProject.caseStudyUrl);
    }
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-[500px] sm:h-[550px] md:h-[600px] overflow-hidden bg-[#1b1b1b] rounded-xl border border-white/10"
    >
      <div 
        ref={constraintsRef} 
        className="absolute inset-0 flex items-center justify-center"
      >
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentProject.id}
            custom={direction}
            initial={{ 
              x: direction === 1 ? 300 : -300,
              opacity: 0,
              scale: 0.8
            }}
            animate={{ 
              x: 0,
              opacity: 1,
              scale: 1,
              rotate: 0
            }}
            exit={{ 
              x: direction === 1 ? -300 : 300,
              opacity: 0,
              scale: 0.8,
              transition: { duration: 0.5 }
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
              mass: 1
            }}
            drag="x"
            dragConstraints={constraintsRef}
            dragElastic={0.1}
            onDragStart={() => setIsDragging(true)}
            onDragEnd={handleDragEnd}
            style={{ x, scale, rotate, opacity }}
            className="relative w-[90%] max-w-3xl bg-[#2d3035] rounded-xl overflow-hidden shadow-2xl cursor-grab active:cursor-grabbing"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/80 z-10"></div>
            
            <div className="relative h-[180px] sm:h-[220px] md:h-[300px] overflow-hidden">
              <img 
                src={currentProject.image} 
                alt={currentProject.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute top-4 right-4 z-20">
                <span className="px-3 py-1 bg-[#A3D1FF]/20 text-[#A3D1FF] rounded-full text-sm backdrop-blur-sm">
                  {currentProject.category}
                </span>
              </div>
            </div>
            
            <div className="p-4 sm:p-6 md:p-8 relative z-20">
              <h3 className="text-xl sm:text-heading-large text-white mb-2 sm:mb-3">{currentProject.title}</h3>
              <p className="text-sm sm:text-base text-gray-300 mb-4 sm:mb-6">{currentProject.description}</p>
              
              <div className="flex flex-wrap gap-3 sm:gap-4">
                {currentProject.caseStudyUrl && (
                  <button onClick={handleViewCaseStudy} className="mr_btn mr_btn_primary">
                    <span>Read Case Study</span>
                  </button>
                )}
                
                {currentProject.liveUrl && (
                  <a href={currentProject.liveUrl} target="_blank" rel="noopener noreferrer" className="mr_btn mr_btn_outline">
                    <span>View Live Website</span>
                  </a>
                )}
              </div>
            </div>
            
            <div className="absolute bottom-4 right-4 z-20 flex items-center gap-2 text-xs sm:text-sm text-gray-400">
              <span className="hidden sm:inline">Swipe to explore</span>
              <div className="w-12 sm:w-16 h-1 bg-white/20 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[#A3D1FF] rounded-full"
                  style={{ width: `${((currentIndex + 1) / projects.length) * 100}%` }}
                ></div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      
      <button
        onClick={prevProject}
        disabled={currentIndex === 0}
        className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 z-30 w-8 h-8 sm:w-10 sm:h-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-[#A3D1FF] hover:text-black transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        aria-label="Previous project"
      >
        <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
      </button>
      
      <button
        onClick={nextProject}
        disabled={currentIndex === projects.length - 1}
        className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 z-30 w-8 h-8 sm:w-10 sm:h-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-[#A3D1FF] hover:text-black transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        aria-label="Next project"
      >
        <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
      </button>
    </div>
  );
}