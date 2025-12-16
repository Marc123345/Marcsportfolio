import React, { useRef, useEffect } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  color: string;
  alpha: number;
}

interface ParticleBackgroundProps {
  className?: string;
  particleCount?: number;
  particleColor?: string;
  particleSize?: number;
  particleSpeed?: number;
  interactive?: boolean;
}

export default function ParticleBackground({
  className = '',
  particleCount = 50,
  particleColor = '#A3D1FF',
  particleSize = 2,
  particleSpeed = 0.5,
  interactive = true
}: ParticleBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0, radius: 100 });
  const animationFrameRef = useRef<number>(0);
  const isVisibleRef = useRef(false);
  const isInitializedRef = useRef(false);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas size
    const setCanvasSize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      
      canvas.width = parent.offsetWidth;
      canvas.height = parent.offsetHeight;
      
      // Reinitialize particles when canvas size changes
      if (isInitializedRef.current) {
        initParticles();
      }
    };
    
    // Initialize particles
    const initParticles = () => {
      // More aggressive performance optimization
      const isMobile = window.innerWidth < 768;
      const isLowEnd = navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4;
      
      let adjustedCount = particleCount;
      
      if (isMobile) {
        adjustedCount = Math.min(particleCount * 0.3, 15);
      } else if (isLowEnd) {
        adjustedCount = Math.min(particleCount * 0.5, 25);
      } else {
        adjustedCount = Math.min(particleCount, 50);
      }
      
      particlesRef.current = [];
      
      for (let i = 0; i < adjustedCount; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * particleSize + 0.5,
          speedX: (Math.random() - 0.5) * particleSpeed,
          speedY: (Math.random() - 0.5) * particleSpeed,
          color: particleColor,
          alpha: Math.random() * 0.5 + 0.1
        });
      }
      
      isInitializedRef.current = true;
    };
    
    // Check if element is visible in viewport
    const checkVisibility = () => {
      const rect = canvas.getBoundingClientRect();
      isVisibleRef.current = 
        rect.top < window.innerHeight &&
        rect.bottom > 0 &&
        rect.left < window.innerWidth &&
        rect.right > 0;
    };
    
    // Update and draw particles
    const animate = () => {
      // Skip animation if not visible
      if (!isVisibleRef.current) {
        animationFrameRef.current = requestAnimationFrame(animate);
        return;
      }
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw each particle
      particlesRef.current.forEach((particle) => {
        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) {
          particle.speedX *= -1;
        }
        
        if (particle.y < 0 || particle.y > canvas.height) {
          particle.speedY *= -1;
        }
        
        // Interactive effect - move away from mouse
        if (interactive) {
          const dx = particle.x - mouseRef.current.x;
          const dy = particle.y - mouseRef.current.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < mouseRef.current.radius) {
            const angle = Math.atan2(dy, dx);
            const force = (mouseRef.current.radius - distance) / mouseRef.current.radius;
            
            particle.x += Math.cos(angle) * force * 2;
            particle.y += Math.sin(angle) * force * 2;
          }
        }
        
        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${hexToRgb(particle.color)}, ${particle.alpha})`;
        ctx.fill();
        
        // Only connect nearby particles to reduce calculations
        if (Math.random() > 0.8) { // Only check connections for 20% of particles
          connectParticles(particle);
        }
      });
      
      animationFrameRef.current = requestAnimationFrame(animate);
    };
    
    // Connect nearby particles with lines
    const connectParticles = (particle: Particle) => {
      const connectionDistance = 100;
      
      // Only check a subset of particles for better performance
      const particlesToCheck = particlesRef.current.filter(() => Math.random() > 0.7);
      
      particlesToCheck.forEach((otherParticle) => {
        if (particle === otherParticle) return;
        
        const dx = particle.x - otherParticle.x;
        const dy = particle.y - otherParticle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < connectionDistance) {
          // Calculate opacity based on distance
          const opacity = 1 - (distance / connectionDistance);
          
          ctx.beginPath();
          ctx.strokeStyle = `rgba(${hexToRgb(particle.color)}, ${opacity * 0.2})`;
          ctx.lineWidth = 0.5;
          ctx.moveTo(particle.x, particle.y);
          ctx.lineTo(otherParticle.x, otherParticle.y);
          ctx.stroke();
        }
      });
    };
    
    // Track mouse position
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
    };
    
    // Helper function to convert hex to rgb
    const hexToRgb = (hex: string): string => {
      // Remove # if present
      hex = hex.replace('#', '');
      
      // Parse hex values
      const r = parseInt(hex.substring(0, 2), 16);
      const g = parseInt(hex.substring(2, 4), 16);
      const b = parseInt(hex.substring(4, 6), 16);
      
      return `${r}, ${g}, ${b}`;
    };
    
    // Set up canvas and start animation
    setCanvasSize();
    
    // Use passive event listeners for better performance
    window.addEventListener('resize', setCanvasSize, { passive: true });
    canvas.addEventListener('mousemove', handleMouseMove, { passive: true });
    
    // Set up visibility observer
    const observer = new IntersectionObserver(
      (entries) => {
        isVisibleRef.current = entries[0].isIntersecting;
      },
      { threshold: 0.1 }
    );
    
    observer.observe(canvas);
    
    // Start animation
    checkVisibility();
    initParticles();
    animate();
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', setCanvasSize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      observer.disconnect();
      cancelAnimationFrame(animationFrameRef.current);
    };
  }, [particleCount, particleColor, particleSize, particleSpeed, interactive]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 z-0 ${className}`}
      aria-hidden="true"
    />
  );
}