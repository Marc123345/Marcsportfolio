import React, { Suspense } from 'react';
import { 
  BarChart3, Code2, Globe, Layout, 
  PlayCircle, Rocket, ShieldCheck, Zap, 
  ChevronRight, ExternalLink, CheckCircle2, Star, Timer, Users
} from 'lucide-react';
import BMG3DMockup from './BMG3DMockup'; // Standard import to avoid lazy errors for now

const BinnsMediaPage = () => {
  return (
    <div className="bg-[#0a0a0a] text-white selection:bg-[#A3D1FF] selection:text-black min-h-screen">
      
      {/* 1. HERO SECTION */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
        <div className="max-w-4xl text-center z-10 pt-20">
          <div className="inline-block py-1 px-4 rounded-full bg-white/5 border border-white/10 text-[#A3D1FF] text-sm font-medium mb-8">
            Award-Winning Case Study
          </div>
          <h1 className="text-5xl md:text-8xl font-bold tracking-tighter mb-6 bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent">
            Binns Media <br /> Group.
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-12">
            Architecting a high-performance media engine for diverse voices. 
            From fragmented content to a centralized, 98-score digital ecosystem.
          </p>
        </div>

        {/* The 3D Mockup */}
        <div className="w-full max-w-6xl -mt-10 md:-mt-20">
          <BMG3DMockup />
        </div>
      </section>

      {/* 2. STATS OVERVIEW */}
      <section className="py-24 border-y border-white/5 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          <div>
            <div className="text-4xl font-bold text-[#A3D1FF] mb-2">60%</div>
            <div className="text-gray-500 uppercase text-xs tracking-widest">Faster Loads</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-[#A3D1FF] mb-2">98/100</div>
            <div className="text-gray-500 uppercase text-xs tracking-widest">Perf Score</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-[#A3D1FF] mb-2">40%</div>
            <div className="text-gray-500 uppercase text-xs tracking-widest">Engagement</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-[#A3D1FF] mb-2">TS</div>
            <div className="text-gray-500 uppercase text-xs tracking-widest">Type-Safe</div>
          </div>
        </div>
      </section>

      {/* 3. THE CHALLENGE & DEEP DIVE */}
      <section className="py-32 px-6 max-w-7xl mx-auto grid md:grid-cols-2 gap-24 items-center">
        <div>
          <h2 className="text-4xl font-bold mb-8">The Challenge</h2>
          <p className="text-gray-400 text-lg leading-relaxed mb-8">
            Binns Media Group needed more than a website; they needed a scalable infrastructure. 
            The previous platform was a bottleneck for their rapid content production across podcasts and TV.
          </p>
          <div className="space-y-4">
            {[
              "Centralizing 500+ hours of video/audio media",
              "Ensuring sub-1s load times on mobile devices",
              "Creating an intuitive CMS for non-technical staff"
            ].map((text, i) => (
              <div key={i} className="flex gap-4 items-center">
                <div className="w-6 h-6 rounded-full bg-[#A3D1FF]/10 flex items-center justify-center">
                  <Star className="w-3 h-3 text-[#A3D1FF]" />
                </div>
                <span className="text-gray-300">{text}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-[#111] border border-white/10 p-8 rounded-3xl shadow-3xl">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Code2 className="text-[#A3D1FF]" /> Tech Architecture
          </h3>
          <ul className="space-y-6">
            <li className="flex gap-4">
              <Zap className="text-yellow-500 shrink-0" />
              <div>
                <p className="font-bold">React 18 & Vite</p>
                <p className="text-sm text-gray-500">Leveraging concurrent rendering for a butter-smooth UI.</p>
              </div>
            </li>
            <li className="flex gap-4">
              <ShieldCheck className="text-green-500 shrink-0" />
              <div>
                <p className="font-bold">Supabase Backend</p>
                <p className="text-sm text-gray-500">Real-time database and edge functions for instant updates.</p>
              </div>
            </li>
          </ul>
        </div>
      </section>

      {/* 4. CLIENT TESTIMONIAL */}
      <section className="py-32 bg-[#111]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <img src="https://i.imgur.com/NKjkUC9.jpeg" className="w-24 h-24 rounded-full mx-auto mb-8 border-4 border-[#A3D1FF]" alt="Client" />
          <blockquote className="text-2xl md:text-3xl italic text-gray-300 mb-8 leading-relaxed">
            "Marc executed the vision perfectly. He is big on communication and ensures the client is completely satisfied at every single step."
          </blockquote>
          <p className="font-bold text-white text-lg">Omar Turner</p>
          <p className="text-[#A3D1FF] uppercase text-xs tracking-widest mt-1">CEO, Binns Media Group</p>
        </div>
      </section>

      {/* 5. CTA */}
      <section className="py-40 text-center">
        <h2 className="text-4xl md:text-6xl font-bold mb-10">Ready for the next level?</h2>
        <button className="px-10 py-5 bg-white text-black font-black rounded-full hover:scale-105 transition-transform inline-flex items-center gap-3">
          START YOUR PROJECT <ExternalLink size={20} />
        </button>
      </section>
    </div>
  );
};

export default BinnsMediaPage;