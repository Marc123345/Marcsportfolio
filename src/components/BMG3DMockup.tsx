import React, { useState, useRef } from 'react';

/**
 * BMG3DMockup Component
 * Creates a tilted, interactive 3D grid of images and stats.
 */
const BMG3DMockup = () => {
  const [rotate, setRotate] = useState({ x: 15, y: -10 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Tracks mouse movement relative to the center of the screen
  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;

    // Calculate rotation (Divide by higher numbers for a more subtle tilt)
    const xRotation = (innerHeight / 2 - clientY) / 35;
    const yRotation = (clientX - innerWidth / 2) / 35;

    setRotate({ x: 15 + xRotation, y: -10 + yRotation });
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="w-full flex items-center justify-center py-24"
      style={{ perspective: '1200px' }} // Perspective creates the 3D depth
    >
      <div 
        className="grid grid-cols-4 gap-4 w-full max-w-5xl transition-transform duration-150 ease-out"
        style={{ 
          transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) rotateZ(-2deg)`,
          transformStyle: 'preserve-3d' 
        }}
      >
        {/* Main Brand Image */}
        <div 
          className="col-span-2 row-span-2 bg-[#1b1b1b] rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
          style={{ transform: 'translateZ(40px)' }}
        >
          <img 
            src="https://i.imgur.com/IU0mmH7.jpeg" 
            alt="BMG Portfolio" 
            className="w-full h-full object-cover"
          />
        </div>

        {/* High Performance Stat Card */}
        <div 
          className="bg-[#A3D1FF] p-6 rounded-2xl flex flex-col justify-center items-center text-black"
          style={{ transform: 'translateZ(90px)' }}
        >
          <span className="text-4xl font-black italic">98%</span>
          <span className="text-[10px] uppercase tracking-tighter font-bold">Performance Score</span>
        </div>

        {/* Small Accent Card */}
        <div 
          className="bg-white/5 backdrop-blur-md p-4 rounded-xl border border-white/10"
          style={{ transform: 'translateZ(120px)' }}
        >
          <div className="w-10 h-1 h-1 bg-[#A3D1FF] rounded-full mb-2" />
          <div className="h-2 w-full bg-white/10 rounded mb-1" />
          <div className="h-2 w-2/3 bg-white/10 rounded" />
        </div>

        {/* Mobile Mockup (Vertical) */}
        <div 
          className="row-span-2 col-start-4 bg-[#2d3035] rounded-[2.5rem] border-[8px] border-[#1b1b1b] overflow-hidden shadow-2xl"
          style={{ transform: 'translateZ(60px)', height: '320px', width: '160px', margin: '0 auto' }}
        >
          <img 
            src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=400&q=80" 
            alt="Mobile View" 
            className="h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default BMG3DMockup;