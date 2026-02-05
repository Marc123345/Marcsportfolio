import React, { useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';

interface CursorRippleProps {
  color?: string;
  size?: number;
  duration?: number;
  maxScale?: number;
  opacity?: number;
  throttleMs?: number;
}

export default function CursorRipple({
  color = '#A3D1FF',
  size = 80,
  duration = 1.2,
  maxScale = 2.5,
  opacity = 0.3,
  throttleMs = 100
}: CursorRippleProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const lastRippleTime = useRef<number>(0);
  const animationFrameRef = useRef<number | null>(null);
  const isUnmountedRef = useRef(false);
  const [isMobile, setIsMobile] = React.useState(false);

  useEffect(() => {
    const mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
    setIsMobile(mobile);

    if (mobile) {
      return;
    }

    isUnmountedRef.current = false;

    return () => {
      isUnmountedRef.current = true;
    };
  }, []);

  const createRipple = useCallback(
    (clientX: number, clientY: number) => {
      if (isUnmountedRef.current || !containerRef.current || isMobile) return;

      const now = Date.now();
      if (now - lastRippleTime.current < throttleMs) return;
      lastRippleTime.current = now;

      const ripple = document.createElement('div');
      ripple.className = 'absolute rounded-full pointer-events-none';
      ripple.style.cssText = `
        left: ${clientX}px;
        top: ${clientY}px;
        width: ${size}px;
        height: ${size}px;
        background-color: ${color};
        opacity: ${opacity};
        transform: translate(-50%, -50%) scale(0);
        will-change: transform, opacity;
      `;

      containerRef.current.appendChild(ripple);

      gsap.to(ripple, {
        scale: maxScale,
        opacity: 0,
        duration: duration,
        ease: 'power2.out',
        onComplete: () => {
          if (!isUnmountedRef.current && ripple.parentNode) {
            ripple.remove();
          }
        }
      });
    },
    [color, size, duration, maxScale, opacity, throttleMs, isMobile]
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (isMobile || isUnmountedRef.current) return;

      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }

      animationFrameRef.current = requestAnimationFrame(() => {
        createRipple(e.clientX, e.clientY);
      });
    },
    [createRipple]
  );

  const handleClick = useCallback(
    (e: MouseEvent) => {
      if (isMobile || isUnmountedRef.current || !containerRef.current) return;

      const ripple = document.createElement('div');
      ripple.className = 'absolute rounded-full pointer-events-none';
      ripple.style.cssText = `
        left: ${e.clientX}px;
        top: ${e.clientY}px;
        width: ${size * 1.5}px;
        height: ${size * 1.5}px;
        background-color: ${color};
        opacity: ${opacity * 1.5};
        transform: translate(-50%, -50%) scale(0);
        will-change: transform, opacity;
      `;

      containerRef.current.appendChild(ripple);

      gsap.to(ripple, {
        scale: maxScale * 1.2,
        opacity: 0,
        duration: duration * 0.8,
        ease: 'expo.out',
        onComplete: () => {
          if (!isUnmountedRef.current && ripple.parentNode) {
            ripple.remove();
          }
        }
      });
    },
    [color, size, duration, maxScale, opacity, isMobile]
  );

  useEffect(() => {
    if (isMobile) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('click', handleClick, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);

      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }

      if (containerRef.current) {
        while (containerRef.current.firstChild) {
          containerRef.current.removeChild(containerRef.current.firstChild);
        }
      }
    };
  }, [handleMouseMove, handleClick, isMobile]);

  if (isMobile) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 1000 }}
      aria-hidden="true"
    />
  );
}
