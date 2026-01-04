import React from 'react';
import { 
  BarChart3, Code2, Globe, Layout, 
  PlayCircle, Rocket, ShieldCheck, Zap, 
  ChevronRight, ExternalLink, ArrowRight, Star,
  CheckCircle2, Layers, Cpu
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const BinnsMediaCaseStudy = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-[#0a0a0a] text-white selection:bg-[#A3D1FF] selection:text-black min-h-screen font-sans">
      
      {/* --- HERO: Editorial Style --- */}
      <section className="relative pt-32 pb-20 px-6 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-end">
          <div>
            <div className="inline-flex items-center gap-2 py-1 px-3 rounded-full bg-[#A3D1FF]/10 border border-[#A3D1FF]/20 text-[#A3D1FF] text-xs font-bold tracking-widest uppercase mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#A3D1FF] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#A3D1FF]"></span>
              </span>
              Deployed: Media Empire Launchpad
            </div>
            
            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-8 leading-[0.9]">
              Binns <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-gray-600 italic">Media.</span>
            </h1>
            
            <p className="text-xl text-gray-400 max-w-lg leading-relaxed border-l-2 border-[#A3D1FF] pl-6">
              A cinematic digital infrastructure for Omar "Ace" Turner. 
              Built to monetize attention, centralize media assets, and scale a personal brand into a broadcasting powerhouse.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm font-mono text-gray-500">
            <div className="space-y-1">
              <p className="text-white font-bold">Client</p>
              <p>Omar Turner (BMG)</p>
            </div>
            <div className="space-y-1">
              <p className="text-white font-bold">Package</p>
              <p>Media Empire Launchpad</p>
            </div>
            <div className="space-y-1">
              <p className="text-white font-bold">Tech Stack</p>
              <p>React 18, Supabase, Stripe</p>
            </div>
            <div className="space-y-1">
              <p className="text-white font-bold">Timeline</p>
              <p>5 Weeks (On Schedule)</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- VISUAL SHOWCASE: Bento Grid --- */}
      {/* This replaces the 3D model with your high-res mockups in a structured layout */}
      <section className="px-6 max-w-[1400px] mx-auto mb-32">
        <div className="grid grid-cols-1 md:grid-cols-6 md:grid-rows-2 gap-4 h-auto md:h-[800px]">
          
          {/* Main Hero Shot (Wide) */}
          <div className="md:col-span-4 md:row-span-2 relative group overflow-hidden rounded-3xl border border-white/10 bg-[#111]">
            <img 
              src="https://ik.imagekit.io/qcvroy8xpd/New%20Folder/Mockup%204%20-%2016x9.png" 
              alt="Desktop Dashboard View"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute bottom-0 left-0 p-8 bg-gradient-to-t from-black/90 to-transparent w-full">
              <span className="text-[#A3D1FF] text-xs font-bold uppercase tracking-wider">The Command Center</span>
              <p className="text-white font-medium mt-1">Unified Podcast & Video Hub</p>
            </div>
          </div>

          {/* Secondary Shot (Square) */}
          <div className="md:col-span-2 md:row-span-1 relative group overflow-hidden rounded-3xl border border-white/10 bg-[#111]">
            <img 
              src="https://ik.imagekit.io/qcvroy8xpd/New%20Folder/Mockup%202%20-%201x1.png" 
              alt="Mobile Detail View"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>

          {/* Detail Shot (Square) */}
          <div className="md:col-span-2 md:row-span-1 relative group overflow-hidden rounded-3xl border border-white/10 bg-[#111]">
            <img 
              src="https://ik.imagekit.io/qcvroy8xpd/New%20Folder/Mockup%201%20-%201x1.png" 
              alt="Typography Detail"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
        </div>
        
        {/* Full Width Footer Image */}
        <div className="mt-4 relative group overflow-hidden rounded-3xl border border-white/10 bg-[#111] h-[400px]">
            <img 
              src="https://ik.imagekit.io/qcvroy8xpd/New%20Folder/Mockup%203%20-%2016x9.png" 
              alt="Dark Mode Interface"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
             <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="bg-white/10 backdrop-blur-md px-6 py-3 rounded-full border border-white/20 text-white font-medium flex items-center gap-2">
                  <Layout size={18} /> View Full Prototype
                </div>
            </div>
        </div>
      </section>

      {/* --- PACKAGE DEFINITION: Why this works --- */}
      <section className="py-24 bg-[#111] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20">
          
          <div>
            <h2 className="text-3xl font-bold mb-6">The "Media Empire" Package</h2>
            <p className="text-gray-400 leading-relaxed mb-8">
              Binns Media didn't just need a website; they needed a <strong>Netflix-style infrastructure</strong>. 
              We deployed the <em>Media Empire Launchpad</em> package to solve the fragmentation of managing podcasts, 
              YouTube streams, and exclusive gated content across different platforms.
            </p>
            
            <div className="space-y-4">
              {[
                "Custom React Architecture (No Templates)",
                "Members-Only Gated Content (Stripe Integration)",
                "Unified Media CMS for Audio & Video",
                "High-Performance Global CDN Delivery"
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#A3D1FF] shrink-0 mt-1" />
                  <span className="text-gray-200">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#0a0a0a] rounded-2xl p-8 border border-white/10 relative">
             <div className="absolute -top-4 -right-4 bg-[#A3D1FF] text-black text-xs font-bold px-4 py-2 rounded-full uppercase tracking-wider">
                Delivered
             </div>
             <div className="grid grid-cols-2 gap-8">
                <div>
                   <div className="text-5xl font-bold text-white mb-2">60%</div>
                   <div className="text-sm text-gray-500 uppercase tracking-widest">Speed Boost</div>
                </div>
                <div>
                   <div className="text-5xl font-bold text-white mb-2">40%</div>
                   <div className="text-sm text-gray-500 uppercase tracking-widest">User Growth</div>
                </div>
                <div>
                   <div className="text-5xl font-bold text-white mb-2">98</div>
                   <div className="text-sm text-gray-500 uppercase tracking-widest">SEO Score</div>
                </div>
                <div>
                   <div className="text-5xl font-bold text-white mb-2">Zero</div>
                   <div className="text-sm text-gray-500 uppercase tracking-widest">Downtime</div>
                </div>
             </div>
          </div>

        </div>
      </section>

      {/* --- TECHNICAL DEEP DIVE --- */}
      <section className="py-32 px-6 max-w-7xl mx-auto">
        <div className="mb-16">
          <h2 className="text-4xl font-bold mb-4">Engineering the Vision</h2>
          <p className="text-gray-400">Moving from legacy friction to a type-safe, scalable future.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="group p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-colors">
            <div className="w-12 h-12 rounded-xl bg-[#A3D1FF]/10 flex items-center justify-center text-[#A3D1FF] mb-6">
              <Cpu size={24} />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Radical Performance</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              We replaced heavy WordPress plugins with a lean React frontend. Implemented lazy-loading and WebP optimization to reduce initial bundle size by 45%, ensuring instant playback on mobile networks.
            </p>
          </div>

          {/* Card 2 */}
          <div className="group p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-colors">
            <div className="w-12 h-12 rounded-xl bg-[#A3D1FF]/10 flex items-center justify-center text-[#A3D1FF] mb-6">
              <Layers size={24} />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Scalable Architecture</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Built on a Supabase backend to handle thousands of media relationships. The database schema allows for infinite expansion—adding new shows, seasons, or hosts without breaking the UI.
            </p>
          </div>

          {/* Card 3 */}
          <div className="group p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-colors">
            <div className="w-12 h-12 rounded-xl bg-[#A3D1FF]/10 flex items-center justify-center text-[#A3D1FF] mb-6">
              <ShieldCheck size={24} />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Monetization Ready</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Integrated secure Stripe gateways directly into the user flow. We removed friction from the "Support" process, allowing listeners to become paid subscribers in just two clicks.
            </p>
          </div>
        </div>
      </section>

      {/* --- TESTIMONIAL --- */}
      <section className="py-24 border-t border-white/5">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="flex justify-center mb-10">
            <img 
              src="https://ik.imagekit.io/qcvroy8xpd/67eb0c3957638498868399.jpeg" 
              className="w-24 h-24 rounded-full border-2 border-[#A3D1FF] object-cover" 
              alt="Omar Turner"
            />
          </div>
          <blockquote className="text-2xl md:text-4xl font-medium leading-tight text-white mb-8">
            "Marc executed the vision perfectly. He didn't just build a site; he built our future platform. This is the foundation for the next 5 years of Binns Media."
          </blockquote>
          <div>
            <cite className="not-italic font-bold text-white block">Omar "Ace" Turner</cite>
            <span className="text-[#A3D1FF] text-sm font-bold tracking-widest uppercase">CEO, Binns Media Group</span>
          </div>
        </div>
      </section>

      {/* --- CTA: Connect to Package --- */}
      <section className="py-32 px-6 bg-gradient-to-b from-[#0a0a0a] to-[#111]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-5xl md:text-7xl font-bold mb-8 tracking-tighter">
            Ready to launch <br/>
            <span className="text-gray-500">your empire?</span>
          </h2>
          <p className="text-xl text-gray-400 mb-12">
            The exact infrastructure used for Binns Media is available in the <span className="text-white font-bold">Media Empire Launchpad</span> package.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => navigate('/contact')}
              className="px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-[#A3D1FF] transition-colors flex items-center justify-center gap-2"
            >
              Start Your Project <ArrowRight size={18} />
            </button>
            <button 
              onClick={() => navigate('/packages')}
              className="px-8 py-4 bg-transparent border border-white/20 text-white font-bold rounded-full hover:bg-white/5 transition-colors"
            >
              View All Packages
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};

export default BinnsMediaCaseStudy;