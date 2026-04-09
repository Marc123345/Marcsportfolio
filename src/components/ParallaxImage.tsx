import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

interface ParallaxImageProps {
  src: string;
  alt: string;
  className?: string;
  speed?: number; // 0-1, where 1 is maximum parallax effect
  loading?: 'lazy' | 'eager';
  sizes?: string;
}

export default function ParallaxImage({
  src,
  alt,
  className = '',
  speed = 0.2,
  loading = 'lazy',
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
}: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [elementTop, setElementTop] = useState(0);
  const [clientHeight, setClientHeight] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const { scrollY } = useScroll();
  
  // Update measurements on resize or scroll
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    
    // Use IntersectionObserver to check if element is in view
    const observer = new IntersectionObserver(
      (entries) => {
        setIsInView(entries[0].isIntersecting);
        if (entries[0].isIntersecting) {
          updatePosition();
        }
      },
      { threshold: 0.1 }
    );
    
    observer.observe(element);
    
    const updatePosition = () => {
      const rect = element.getBoundingClientRect();
      setElementTop(rect.top + window.scrollY);
      setClientHeight(window.innerHeight);
    };
    
    // Initial update
    updatePosition();
    
    // Use a more performant approach with requestAnimationFrame
    let rafId: number | null = null;
    const handleScroll = () => {
      if (!isInView) return;
      
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
      
      rafId = requestAnimationFrame(updatePosition);
    };
    
    // Use passive event listeners for better performance
    window.addEventListener('resize', updatePosition, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', handleScroll);
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
    };
  }, [isInView]);
  
  // Only calculate parallax effect when in view
  const y = useTransform(
    scrollY,
    [elementTop - clientHeight, elementTop + clientHeight],
    [`-${speed * 50}%`, `${speed * 50}%`] // Reduced parallax effect for better performance
  );
  
  // Add spring for smoother motion
  const springY = useSpring(y, { damping: 50, stiffness: 100 });
  
  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div style={{ y: (isInView && !prefersReducedMotion) ? springY : 0, height: '100%', width: '100%' }}>
        {!isLoaded && (
          <div className="w-full h-full bg-gray-800 animate-pulse flex items-center justify-center">
            <div className="text-gray-400">Loading...</div>
          </div>
        )}
        <img 
          src={src} 
          alt={alt} 
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          loading={loading}
          sizes={sizes}
          onLoad={() => setIsLoaded(true)}
          onError={() => setIsLoaded(true)}
        />
      </motion.div>
    </div>
  );
}