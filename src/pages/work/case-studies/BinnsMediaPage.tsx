import React, { useState } from 'react';
import { 
  BarChart3, Code2, Globe, Layout, 
  PlayCircle, Rocket, ShieldCheck, Zap, 
  ExternalLink, ArrowRight, Star, Monitor, Smartphone, Settings
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const BinnsMediaPage = () => {
  const navigate = useNavigate();
  // State to control which "page" is embedded in the viewer
  const [activeTab, setActiveTab] = useState<'desktop' | 'mobile' | 'admin'>('desktop');

  // Define the URLs you want to embed. 
  // NOTE: Target sites must allow iframe embedding (CSP/X-Frame-Options)
  const views = {
    desktop: {
      title: 'Live Ecosystem',
      url: 'https://binnsmediagroup.com', // Replace with actual URL
      description: 'The primary high-performance media hub.'
    },
    mobile: {
      title: 'Mobile Experience',
      url: 'https://binnsmediagroup.com', // You can use CSS to constrain this
      description: 'Optimized for listeners on the go.'
    },
    admin: {
      title: 'Content Dashboard',
      url: '/tools/website-analyzer', // Example of embedding an internal page
      description: 'The Supabase-powered backend for talent management.'
    }
  };

  return (
    <div className="bg-[#0a0a0a] text-white selection:bg-[#A3D1FF] selection:text-black min-h-screen font-sans">
      
      {/* --- HERO SECTION --- */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="max-w-4xl mx-auto text-center z-10">
          <div className="inline-flex items-center gap-2 py-1 px-4 rounded-full bg-white/5 border border-white/10 text-[#A3D1FF] text-sm font-medium mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#A3D1FF] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#A3D1FF]"></span>
            </span>
            2025 Case Study
          </div>
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-6 bg-gradient-to-b from-white to-white/50 bg-clip-text text-transparent italic">
            Binns Media.
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed">
            Re-engineering the digital home for the voices that matter. 
            A multi-platform hub designed for speed and scale.
          </p>
        </div>

        {/* --- THE INTERACTIVE VIEWER (Replaces the "TT" movement) --- */}
        <div className="max-w-6xl mx-auto mt-12">
          {/* Viewer Controls */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {[
              { id: 'desktop', icon: Monitor, label: 'Main Site' },
              { id: 'mobile', icon: Smartphone, label: 'Mobile App' },
              { id: 'admin', icon: Settings, label: 'Admin Panel' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl border transition-all ${
                  activeTab === tab.id 
                    ? 'bg-[#A3D1FF] text-black border-[#A3D1FF]' 
                    : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'
                }`}
              >
                <tab.icon size={18} />
                <span className="font-bold uppercase text-xs tracking-wider">{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Browser-style Container */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#A3D1FF] to-blue-600 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-1000"></div>
            <div className="relative bg-[#111] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
              {/* Browser Top Bar */}
              <div className="bg-white/5 border-b border-white/10 px-4 py-3 flex items-center justify-between">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                </div>
                <div className="text-[10px] text-gray-500 font-mono truncate max-w-[200px]">
                  {views[activeTab].url}
                </div>
                <div className="w-10"></div>
              </div>

              {/* Iframe Content Area */}
              <div className={`transition-all duration-500 ease-in-out bg-black ${
                activeTab === 'mobile' ? 'max-w-[375px] mx-auto' : 'w-full'
              }`}>
                <div className={`relative ${activeTab === 'mobile' ? 'aspect-[9/19]' : 'aspect-video'}`}>
                  <iframe 
                    src={views[activeTab].url}
                    className="w-full h-full border-none"
                    title={views[activeTab].title}
                    loading="lazy"
                  />
                  {/* Optional Overlay to describe the view */}
                  <div className="absolute bottom-6 right-6 p-4 bg-black/80 backdrop-blur-md border border-white/10 rounded-lg max-w-[240px] pointer-events-none">
                     <h4 className="text-white font-bold text-sm mb-1">{views[activeTab].title}</h4>
                     <p className="text-gray-400 text-[11px]">{views[activeTab].description}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- REST OF THE PAGE (Stats, Narrative, Testimonial) --- */}
      {/* ... keep your existing Stats, Narrative, and Footer CTA here ... */}
    </div>
  );
};

export default BinnsMediaPage;