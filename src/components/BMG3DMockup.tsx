import React, { useState, useRef } from 'react';

const BMG3DMockup = () => {
  const [rotate, setRotate] = useState({ x: 20, y: -15 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;

    // Dynamics for the tilt effect
    const xRotation = (innerHeight / 2 - clientY) / 30;
    const yRotation = (clientX - innerWidth / 2) / 30;

    setRotate({ x: 20 + xRotation, y: -15 + yRotation });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 20, y: -15 }); // Reset to original tilt
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full flex items-center justify-center py-20 cursor-pointer"
      style={{ perspective: '1500px' }}
    >
      <div 
        className="grid grid-cols-4 gap-4 w-full transition-transform duration-300 ease-out"
        style={{ 
          transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) rotateZ(-5deg)`,
          transformStyle: 'preserve-3d'
        }}
      >
        {/* Main Card */}
        <div className="col-span-2 row-span-2 bg-[#1b1b1b] rounded-2xl overflow-hidden border border-white/10 shadow-2xl" 
             style={{ transform: 'translateZ(60px)' }}>
          <img src="https://i.imgur.com/IU0mmH7.jpeg" alt="BMG Hero" className="w-full h-full object-cover" />
        </div>

        {/* Mobile View */}
        <div className="col-span-1 bg-[#2d3035] rounded-[2rem] border-[6px] border-[#1b1b1b] overflow-hidden shadow-2xl"
             style={{ transform: 'translateZ(120px)', width: '140px', height: '280px', margin: 'auto' }}>
           <img src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=400&q=80" alt="Mobile" className="h-full object-cover" />
        </div>

        {/* Stats Card */}
        <div className="bg-[#A3D1FF] p-6 rounded-2xl flex flex-col justify-center items-center text-black"
             style={{ transform: 'translateZ(40px)' }}>
          <span className="text-3xl font-black">98%</span>
          <span className="text-[10px] uppercase font-bold">SEO Score</span>
        </div>

        {/* Floating Accent Card */}
        <div className="col-span-1 bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/20"
             style={{ transform: 'translateZ(90px)' }}>
          <div className="w-8 h-8 rounded-full bg-[#A3D1FF] mb-2" />
          <div className="h-2 w-12 bg-white/40 rounded mb-1" />
          <div className="h-2 w-8 bg-white/20 rounded" />
        </div>
      </div>
    </div>
  );
};

export default BMG3DMockup;