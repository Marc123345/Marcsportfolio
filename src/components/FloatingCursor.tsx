import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

interface Props {
  color?: string;
}

export default function FloatingCursor({ color = '#A3D1FF' }: Props) {
  const [isVisible, setIsVisible] = useState(false);
  const [isPointer, setIsPointer] = useState(false);
  const isEnabledRef = useRef(true);
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  // Use spring for smooth animation
  const springConfig = { damping: 25, stiffness: 300 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Only enable on desktop devices
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    if (isMobile) {
      isEnabledRef.current = false;
      return;
    }

    const moveCursor = (e: MouseEvent) => {
      if (!isEnabledRef.current) return;
      
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      
      if (!isVisible) setIsVisible(true);
      
      // Check if hovering over clickable elements
      const target = e.target as HTMLElement;
      const isClickable = 
        target.tagName === 'BUTTON' || 
        target.tagName === 'A' || 
        target.closest('button') || 
        target.closest('a') ||
        target.classList.contains('cursor-pointer') ||
        window.getComputedStyle(target).cursor === 'pointer';
      
      setIsPointer(isClickable);
    };
    
    const handleMouseLeave = () => {
      if (!isEnabledRef.current) return;
      setIsVisible(false);
    };
    
    const handleMouseEnter = () => {
      if (!isEnabledRef.current) return;
      setIsVisible(true);
    };

    // Use passive event listeners for better performance
    window.addEventListener('mousemove', moveCursor, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave, { passive: true });
    document.addEventListener('mouseenter', handleMouseEnter, { passive: true });
    
    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [cursorX, cursorY, isVisible]);

  if (!isVisible || !isEnabledRef.current) return null;

  return (
    <>
      {/* Outer circle - follows with delay */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
          backgroundColor: 'transparent',
          border: `1.5px solid ${color}`,
          opacity: 0.6,
          scale: isPointer ? 1.5 : 1
        }}
        transition={{
          scale: { type: 'spring', stiffness: 300, damping: 20 }
        }}
      />
      
      {/* Inner dot - follows cursor exactly */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
          backgroundColor: color,
          opacity: isPointer ? 0 : 0.8
        }}
        transition={{
          opacity: { duration: 0.2 }
        }}
      />
    </>
  );
}