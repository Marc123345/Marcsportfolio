import React, { useRef, useEffect } from 'react';

interface Streak {
  x: number;
  y: number;
  length: number;
  angle: number;
  speed: number;
  opacity: number;
  width: number;
}

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  twinkle: number;
}

interface DynamicBackgroundProps {
  className?: string;
  streakCount?: number;
  particleCount?: number;
  color?: string;
}

export default function DynamicBackground({
  className = '',
  streakCount = 15,
  particleCount = 50,
  color = '#A3D1FF'
}: DynamicBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streaksRef = useRef<Streak[]>([]);
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameRef = useRef<number>(0);
  const isVisibleRef = useRef(false);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Limit particle count based on device performance
    const getOptimalCounts = () => {
      const screenArea = window.innerWidth * window.innerHeight;
      const devicePixelRatio = window.devicePixelRatio || 1;
      const isMobile = window.innerWidth < 768;
      
      // Reduce counts for mobile and high DPI displays
      const streakMultiplier = isMobile ? 0.3 : devicePixelRatio > 1 ? 0.6 : 1;
      const particleMultiplier = isMobile ? 0.2 : devicePixelRatio > 1 ? 0.4 : 1;
      
      return {
        streaks: Math.min(streakCount * streakMultiplier, isMobile ? 5 : 15),
        particles: Math.min(particleCount * particleMultiplier, isMobile ? 10 : 50)
      };
    };
    
    const { streaks: optimalStreakCount, particles: optimalParticleCount } = getOptimalCounts();
    
    // Set canvas size
    const setCanvasSize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      
      // Use device pixel ratio for crisp rendering but limit for performance
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      
      canvas.width = parent.offsetWidth;
      canvas.height = parent.offsetHeight;
      
      // Reinitialize elements when canvas size changes
      initStreaks();
      initParticles();
    };
    
    // Initialize light streaks
    const initStreaks = () => {
      streaksRef.current = [];
      
      for (let i = 0; i < optimalStreakCount; i++) {
        streaksRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          length: Math.random() * 200 + 100,
          angle: Math.random() * Math.PI * 2,
          speed: Math.random() * 0.5 + 0.2,
          opacity: Math.random() * 0.3 + 0.1,
          width: Math.random() * 2 + 0.5
        });
      }
    };
    
    // Initialize particles
    const initParticles = () => {
      particlesRef.current = [];
      
      for (let i = 0; i < optimalParticleCount; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 0.5,
          speedX: (Math.random() - 0.5) * 0.3,
          speedY: (Math.random() - 0.5) * 0.3,
          opacity: Math.random() * 0.5 + 0.2,
          twinkle: Math.random() * Math.PI * 2
        });
      }
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
    
    // Convert hex to rgb
    const hexToRgb = (hex: string): { r: number; g: number; b: number } => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      } : { r: 163, g: 209, b: 255 };
    };
    
    const rgb = hexToRgb(color);
    
    // Animation loop
    const animate = () => {
      if (!isVisibleRef.current) {
        animationFrameRef.current = requestAnimationFrame(animate);
        return;
      }
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw light streaks
      streaksRef.current.forEach((streak) => {
        // Update position
        streak.x += Math.cos(streak.angle) * streak.speed;
        streak.y += Math.sin(streak.angle) * streak.speed;
        
        // Wrap around edges
        if (streak.x < -streak.length) streak.x = canvas.width + streak.length;
        if (streak.x > canvas.width + streak.length) streak.x = -streak.length;
        if (streak.y < -streak.length) streak.y = canvas.height + streak.length;
        if (streak.y > canvas.height + streak.length) streak.y = -streak.length;
        
        // Create gradient for streak
        const gradient = ctx.createLinearGradient(
          streak.x,
          streak.y,
          streak.x + Math.cos(streak.angle) * streak.length,
          streak.y + Math.sin(streak.angle) * streak.length
        );
        
        gradient.addColorStop(0, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0)`);
        gradient.addColorStop(0.5, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${streak.opacity})`);
        gradient.addColorStop(1, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0)`);
        
        // Draw streak
        ctx.save();
        ctx.strokeStyle = gradient;
        ctx.lineWidth = streak.width;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(streak.x, streak.y);
        ctx.lineTo(
          streak.x + Math.cos(streak.angle) * streak.length,
          streak.y + Math.sin(streak.angle) * streak.length
        );
        ctx.stroke();
        ctx.restore();
      });
      
      // Draw particles
      particlesRef.current.forEach((particle) => {
        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        particle.twinkle += 0.02;
        
        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;
        
        // Calculate twinkling opacity
        const twinkleOpacity = particle.opacity * (0.5 + 0.5 * Math.sin(particle.twinkle));
        
        // Draw particle with glow effect
        ctx.save();
        ctx.globalAlpha = twinkleOpacity;
        
        // Outer glow
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.1)`;
        ctx.fill();
        
        // Inner particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 1)`;
        ctx.fill();
        
        ctx.restore();
      });
      
      animationFrameRef.current = requestAnimationFrame(animate);
    };
    
    // Set up canvas and start animation
    setCanvasSize();
    
    // Use passive event listeners for better performance
    window.addEventListener('resize', setCanvasSize, { passive: true });
    
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
    animate();
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', setCanvasSize);
      observer.disconnect();
      cancelAnimationFrame(animationFrameRef.current);
    };
  }, [streakCount, particleCount, color]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 z-0 ${className}`}
      aria-hidden="true"
    />
  );
}