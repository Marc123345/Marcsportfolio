import React, { useEffect, useState, useRef } from 'react';

export default function CompaniesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const companiesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            titleRef.current?.classList.add('opacity-100', 'translate-y-0');
            setTimeout(() => {
              companiesRef.current?.classList.add('opacity-100', 'translate-y-0');
            }, 300);
            sectionObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    
    if (sectionRef.current) {
      sectionObserver.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        sectionObserver.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section ref={sectionRef} className="py-16 px-4 sm:px-6 lg:px-8 bg-[#1b1b1b] overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div 
          ref={titleRef}
          className="text-center mb-12 relative h-20 opacity-0 translate-y-10 transition-all duration-1000 ease-out"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Trusted By Industry Leaders
          </h2>
        </div>
      </div>
    </section>
  );
}