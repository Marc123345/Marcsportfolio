import React, { useEffect, useState, useRef } from 'react';
import { Code, Paintbrush } from 'lucide-react';

export default function SkillsLoader() {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [currentPhase, setCurrentPhase] = useState<'design' | 'code'>('design');
  const loaderRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            startAnimation();
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    
    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }
    
    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, []);
  
  const startAnimation = () => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsComplete(true);
          return 100;
        }
        
        // Switch between design and code phases
        if (prev === 50) {
          setCurrentPhase('code');
        }
        
        return prev + 1;
      });
    }, 50);

    return () => clearInterval(interval);
  };

  return (
    <div 
      ref={loaderRef}
      className="bg-[#1b1b1b] p-4 sm:p-6 md:p-8 rounded-xl border border-white/10 hover:border-[#A3D1FF] transition-all transform hover:-translate-y-1 duration-300"
    >
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <div className="flex items-center gap-2 sm:gap-3">
          {currentPhase === 'design' ? (
            <Paintbrush className="w-5 h-5 sm:w-6 sm:h-6 text-[#A3D1FF]" />
          ) : (
            <Code className="w-5 h-5 sm:w-6 sm:h-6 text-[#A3D1FF]" />
          )}
          <span className="text-white font-semibold text-sm sm:text-base">
            {currentPhase === 'design' ? 'Designing' : 'Coding'} in Progress...
          </span>
        </div>
        <span className="text-[#A3D1FF] font-mono text-sm sm:text-base">{progress}%</span>
      </div>

      {/* Progress Bar */}
      <div className="h-2 sm:h-3 bg-white/10 rounded-full overflow-hidden mb-3 sm:mb-4">
        <div 
          className="h-full bg-gradient-to-r from-[#A3D1FF] to-[#92bce6] rounded-full transition-all duration-300 relative"
          style={{ width: `${progress}%` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#A3D1FF]/0 via-white/20 to-[#A3D1FF]/0 animate-[shine_1s_ease-in-out_infinite]"></div>
        </div>
      </div>

      {/* Phases */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        <div className={`p-3 sm:p-4 rounded-lg ${currentPhase === 'design' ? 'bg-[#A3D1FF]/10 border border-[#A3D1FF]' : 'bg-white/5'}`}>
          <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
            <Paintbrush className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${currentPhase === 'design' ? 'text-[#A3D1FF]' : 'text-gray-400'}`} />
            <span className={`text-xs sm:text-sm ${currentPhase === 'design' ? 'text-[#A3D1FF]' : 'text-gray-400'}`}>Design Phase</span>
          </div>
          <ul className="space-y-1 text-xs sm:text-sm">
            <li className={`flex items-center gap-1.5 sm:gap-2 ${progress >= 20 ? 'text-[#A3D1FF]' : 'text-gray-500'}`}>
              ✓ User Research
            </li>
            <li className={`flex items-center gap-1.5 sm:gap-2 ${progress >= 30 ? 'text-[#A3D1FF]' : 'text-gray-500'}`}>
              ✓ Wireframing
            </li>
            <li className={`flex items-center gap-1.5 sm:gap-2 ${progress >= 40 ? 'text-[#A3D1FF]' : 'text-gray-500'}`}>
              ✓ UI Design
            </li>
          </ul>
        </div>
        <div className={`p-3 sm:p-4 rounded-lg ${currentPhase === 'code' ? 'bg-[#A3D1FF]/10 border border-[#A3D1FF]' : 'bg-white/5'}`}>
          <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
            <Code className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${currentPhase === 'code' ? 'text-[#A3D1FF]' : 'text-gray-400'}`} />
            <span className={`text-xs sm:text-sm ${currentPhase === 'code' ? 'text-[#A3D1FF]' : 'text-gray-400'}`}>Development Phase</span>
          </div>
          <ul className="space-y-1 text-xs sm:text-sm">
            <li className={`flex items-center gap-1.5 sm:gap-2 ${progress >= 60 ? 'text-[#A3D1FF]' : 'text-gray-500'}`}>
              ✓ Frontend
            </li>
            <li className={`flex items-center gap-1.5 sm:gap-2 ${progress >= 80 ? 'text-[#A3D1FF]' : 'text-gray-500'}`}>
              ✓ Backend
            </li>
            <li className={`flex items-center gap-1.5 sm:gap-2 ${progress >= 90 ? 'text-[#A3D1FF]' : 'text-gray-500'}`}>
              ✓ Testing
            </li>
          </ul>
        </div>
      </div>

      {/* Completion Message */}
      {isComplete && (
        <div className="mt-3 sm:mt-4 text-center text-[#A3D1FF] font-semibold text-xs sm:text-sm animate-fade-in">
          Project Successfully Completed! 🎉
        </div>
      )}
    </div>
  );
}