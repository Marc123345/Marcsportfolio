import React from 'react';
import { 
  ArrowRight, Star, Layers, Zap, 
  CheckCircle2, Globe, Layout, 
  MonitorPlay, Smartphone, Palette, 
  ExternalLink, Quote, Rocket, Type, 
  Droplet, Maximize2, Grid
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const BinnsMediaCaseStudy = () => {
  const navigate = useNavigate();
  const LIVE_URL = "https://www.binnsmediagroup.com/";

  // --- ASSET MANAGEMENT ---
  const IMAGES = {
    // People
    OMAR: "https://ik.imagekit.io/qcvroy8xpd/NKjkUC9%20(1).jpeg", // Updated
    GUNEET: "https://res.cloudinary.com/dadgglcaq/image/upload/v1749337731/1732338426448_1_veqlnh.jpg",
    
    // Main Mockups
    HERO_DESKTOP: "https://ik.imagekit.io/qcvroy8xpd/New%20Folder/Mockup%204%20-%2016x9.png",
    HERO_MOBILE: "https://ik.imagekit.io/qcvroy8xpd/New%20Folder/Mockup%202%20-%201x1.png",
    DETAIL_TYPE: "https://ik.imagekit.io/qcvroy8xpd/New%20Folder/Mockup%201%20-%201x1.png",
    DETAIL_DARK: "https://ik.imagekit.io/qcvroy8xpd/New%20Folder/Mockup%203%20-%2016x9.png",
    PLATFORM_FULL: "https://ik.imagekit.io/qcvroy8xpd/67eb0d66be3ae182020253.png?updatedAt=1766490774693",
    
    // Extra Context Shots (Reusing key images for the gallery grid to ensure fullness)
    GALLERY_1: "https://ik.imagekit.io/qcvroy8xpd/New%20Folder/Mockup%204%20-%2016x9.png",
    GALLERY_2: "https://ik.imagekit.io/qcvroy8xpd/67eb0d66be3ae182020253.png?updatedAt=1766490774693",
    GALLERY_3: "https://ik.imagekit.io/qcvroy8xpd/New%20Folder/Mockup%201%20-%201x1.png",
    GALLERY_4: "https://ik.imagekit.io/qcvroy8xpd/New%20Folder/Mockup%203%20-%2016x9.png"
  };

  return (
    <div className="bg-[#0a0a0a] text-white selection:bg-[#cc000a] selection:text-white min-h-screen font-sans">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-32 pb-16 px-6 max-w-7xl mx-auto border-b border-white/5">
        <div className="flex flex-col md:flex-row items-end justify-between gap-12 mb-16">
          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-3 mb-8">
              <div className="inline-flex items-center gap-2 py-1 px-3 rounded-full bg-[#cc000a]/10 border border-[#cc000a]/20 text-[#cc000a] text-xs font-bold tracking-widest uppercase">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#cc000a] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#cc000a]"></span>
                </span>
                Package: Media Empire Launchpad
              </div>
              <a 
                href={LIVE_URL} 
                target="_blank" 
                rel="noreferrer"
                className="inline-flex items-center gap-2 py-1 px-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-white text-xs font-bold tracking-widest uppercase transition-colors"
              >
                <Globe size={12} /> Visit Live Site
              </a>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-6 leading-[0.9]">
              Binns Media <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-600 italic">Group.</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-400 max-w-2xl leading-relaxed">
              Turning authentic voices into scalable media brands. <br />
              <span className="text-white">A high-performance digital home for culture-shaping content.</span>
            </p>
          </div>

          <div className="grid grid-cols-2 gap-x-12 gap-y-6 text-sm font-mono border-l border-white/10 pl-8">
            <div>
              <p className="text-gray-500 mb-1">Client</p>
              <p className="font-bold">Omar "Ace" Turner</p>
            </div>
            <div>
              <p className="text-gray-500 mb-1">Outcome</p>
              <p className="font-bold text-[#cc000a]">5.0/5.0 Client Rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. BENTO GRID SHOWCASE */}
      <section className="px-6 max-w-[1400px] mx-auto py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 auto-rows-[minmax(300px,auto)]">
          
          <a href={LIVE_URL} target="_blank" rel="noreferrer" className="md:col-span-8 md:row-span-2 relative group overflow-hidden rounded-3xl border border-white/10 bg-[#111] cursor-pointer">
            <img 
              src={IMAGES.HERO_DESKTOP}
              alt="Desktop Dashboard View"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute top-6 left-6 bg-black/50 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-2 group-hover:bg-[#cc000a] group-hover:text-white transition-colors">
              <MonitorPlay size={14} /> View Live Interface
            </div>
          </a>

          <div className="md:col-span-4 md:row-span-2 relative group overflow-hidden rounded-3xl border border-white/10 bg-[#111]">
            <img 
              src={IMAGES.HERO_MOBILE}
              alt="Mobile Detail View"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute top-6 left-6 bg-black/50 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-2">
              <Smartphone size={14} className="text-[#cc000a]" /> Mobile Optimized
            </div>
          </div>

          <div className="md:col-span-4 relative group overflow-hidden rounded-3xl border border-white/10 bg-[#111] min-h-[300px]">
            <img 
              src={IMAGES.DETAIL_TYPE}
              alt="Typography Detail"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
             <div className="absolute bottom-6 left-6">
              <h3 className="text-xl font-bold mb-1">Editorial Typography</h3>
              <p className="text-gray-400 text-sm">Plus Jakarta Sans + Bebas Neue</p>
            </div>
          </div>

          <div className="md:col-span-8 relative group overflow-hidden rounded-3xl border border-white/10 bg-[#111] min-h-[300px]">
            <img 
              src={IMAGES.PLATFORM_FULL} 
              alt="Full Platform Overview"
              className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
               <a 
                 href={LIVE_URL} 
                 target="_blank" 
                 rel="noreferrer"
                 className="bg-[#cc000a] text-white px-8 py-4 rounded-full font-bold flex items-center gap-3 hover:scale-105 transition-transform shadow-[0_0_30px_rgba(204,0,10,0.5)]"
               >
                 Visit Live Platform <ExternalLink size={18} />
               </a>
            </div>
          </div>
        </div>
      </section>

      {/* 3. DESIGN SYSTEM SECTION (New) */}
      <section className="py-24 bg-[#050505] border-y border-white/5 relative overflow-hidden">
        {/* Ambient Red Glow */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#cc000a] opacity-5 blur-[120px] rounded-full pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <h2 className="text-[#cc000a] font-mono text-sm tracking-widest uppercase mb-2">tailwind.config.js</h2>
              <h3 className="text-4xl font-bold">Visual Language</h3>
            </div>
            <p className="text-gray-400 max-w-md text-right">
              A high-contrast identity system built for impact. 
              <br/>Designed to feel like a premium streaming platform.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16">
            
            {/* Typography Stack */}
            <div className="space-y-8">
              <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-4">
                <Type className="text-[#cc000a]" />
                <span className="font-bold">Typography Stack</span>
              </div>
              
              <div className="group">
                <span className="block text-gray-500 text-xs font-mono mb-2">fontFamily: 'display'</span>
                <div className="text-6xl md:text-8xl font-bold uppercase tracking-tight font-['Bebas_Neue'] leading-none">
                  Bebas Neue
                </div>
              </div>

              <div className="group">
                <span className="block text-gray-500 text-xs font-mono mb-2">fontFamily: 'sans'</span>
                <div className="text-4xl md:text-5xl font-bold text-gray-300 font-['Plus_Jakarta_Sans']">
                  Plus Jakarta Sans
                </div>
                <p className="text-gray-500 mt-2 text-lg">
                  The quick brown fox jumps over the lazy dog.
                </p>
              </div>
            </div>

            {/* Color & Shadow Palette */}
            <div>
               <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-4">
                <Droplet className="text-[#cc000a]" />
                <span className="font-bold">Color & Effects</span>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-8">
                {/* Primary Red */}
                <div className="p-6 bg-[#cc000a] rounded-2xl flex flex-col justify-between h-40 shadow-[0_0_25px_rgba(204,0,10,0.3)] hover:scale-[1.02] transition-transform">
                  <span className="text-white/50 text-xs font-mono">primary.DEFAULT</span>
                  <span className="text-white font-bold text-xl">#cc000a</span>
                </div>
                
                {/* Dark & Light Variants */}
                <div className="space-y-4">
                  <div className="p-4 bg-[#990007] rounded-xl flex items-center justify-between">
                     <span className="text-white/50 text-xs font-mono">primary.dark</span>
                     <span className="text-white font-mono">#990007</span>
                  </div>
                  <div className="p-4 bg-[#ff000d] rounded-xl flex items-center justify-between text-black">
                     <span className="opacity-50 text-xs font-mono">primary.light</span>
                     <span className="font-bold font-mono">#ff000d</span>
                  </div>
                </div>
              </div>

              {/* Shadow Token Visualization */}
              <div className="bg-[#111] border border-white/10 p-6 rounded-2xl">
                <span className="block text-gray-500 text-xs font-mono mb-6">boxShadow: 'red-glow'</span>
                <button className="w-full py-4 bg-black border border-[#cc000a] text-[#cc000a] rounded-lg shadow-[0_0_30px_rgba(204,0,10,0.25)] hover:shadow-[0_0_50px_rgba(204,0,10,0.4)] transition-all font-bold uppercase tracking-widest text-sm">
                  Interaction State
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. PLATFORM IMMERSION GALLERY (New) */}
      <section className="py-24 px-6 max-w-[1600px] mx-auto">
         <div className="flex items-center gap-3 mb-10 pl-4">
            <Grid className="text-[#cc000a]" />
            <h3 className="text-2xl font-bold">Platform Immersion</h3>
         </div>
         
         <div className="grid grid-cols-2 md:grid-cols-4 gap-4 h-[600px] md:h-[500px]">
            <div className="col-span-2 row-span-2 relative group overflow-hidden rounded-2xl">
               <img src={IMAGES.PLATFORM_FULL} alt="Main" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
            <div className="col-span-1 row-span-1 relative group overflow-hidden rounded-2xl">
               <img src={IMAGES.GALLERY_3} alt="Typography" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
            <div className="col-span-1 row-span-1 relative group overflow-hidden rounded-2xl">
               <img src={IMAGES.GALLERY_4} alt="Dark Mode" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
            <div className="col-span-2 row-span-1 relative group overflow-hidden rounded-2xl">
               <img src={IMAGES.HERO_DESKTOP} alt="Wide View" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
         </div>
      </section>

      {/* 5. STRATEGY TEXT */}
      <section className="py-24 bg-[#111] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16 md:text-center max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold mb-6">The Solution: <span className="text-[#cc000a]">Media Empire Launchpad</span></h2>
            <p className="text-gray-400 text-lg">
              We didn't just build a website; we deployed a full media infrastructure. This is the exact package designed for content kings ready to monetize.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Layout,
                title: "Cinematic Brand Experience",
                desc: "A custom React layout that feels like Netflix, not WordPress. Editorial typography balances trust with readability."
              },
              {
                icon: Layers,
                title: "Unified Media CMS",
                desc: "Centralized management for podcasts, video, and articles. Built from scratch to allow easy team updates."
              },
              {
                icon: Rocket,
                title: "Phased Deployment",
                desc: "We launched the landing page first to capture immediate traffic while co-developing the full platform in parallel."
              }
            ].map((item, i) => (
              <div key={i} className="p-8 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-[#cc000a]/30 transition-colors">
                <item.icon className="w-10 h-10 text-[#cc000a] mb-6" />
                <h4 className="text-xl font-bold mb-3">{item.title}</h4>
                <p className="text-gray-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. TESTIMONIALS */}
      <section className="py-32 px-6 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-center">Client Feedback</h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          
          {/* Omar Turner - Updated Image */}
          <div className="bg-[#161616] p-10 rounded-3xl border border-white/5 flex flex-col justify-between shadow-2xl">
            <div className="mb-8">
              <div className="flex gap-1 mb-6">
                {[1,2,3,4,5].map(n => <Star key={n} size={20} className="fill-[#cc000a] text-[#cc000a]" />)}
              </div>
              <blockquote className="text-xl font-medium leading-relaxed text-gray-200">
                "Marc executed the vision perfectly. He’s big on communication and ensures the client is completely satisfied at each step. He didn't just build a site; he built our future platform."
              </blockquote>
            </div>
            
            <div className="flex items-center gap-4 pt-8 border-t border-white/10">
              <img 
                src={IMAGES.OMAR} 
                alt="Omar Turner"
                className="w-16 h-16 rounded-full border-2 border-[#cc000a] object-cover"
              />
              <div>
                <div className="font-bold text-white">Omar "Ace" Turner</div>
                <div className="text-[#cc000a] text-xs uppercase tracking-wider font-bold">CEO, Binns Media Group</div>
              </div>
            </div>
          </div>

          {/* Guneet K. Singh */}
          <div className="bg-[#161616] p-10 rounded-3xl border border-white/5 flex flex-col justify-between">
            <div className="mb-8">
              <div className="flex gap-1 mb-6">
                {[1,2,3,4,5].map(n => <Star key={n} size={20} className="fill-[#cc000a] text-[#cc000a]" />)}
              </div>
              <blockquote className="text-xl font-medium leading-relaxed text-gray-200">
                "My team and I loved working with Marc!! His professionalism, patience and openness to our feedback made the entire process a seamless collaboration. We’ll be sure to bring future projects to him."
              </blockquote>
            </div>
            
            <div className="flex items-center gap-4 pt-8 border-t border-white/10">
              <img 
                src={IMAGES.GUNEET}
                alt="Guneet K. Singh"
                className="w-14 h-14 rounded-full border border-white/20 object-cover"
              />
              <div>
                <div className="font-bold text-white">Guneet K. Singh</div>
                <div className="text-gray-500 text-xs font-bold">TV Development & Production</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. CTA */}
      <section className="py-32 px-6 bg-gradient-to-b from-[#0a0a0a] to-[#111] text-center">
        <h2 className="text-5xl md:text-7xl font-bold mb-8 tracking-tighter">
          Ready to scale <br/>
          <span className="text-gray-500">your media empire?</span>
        </h2>
        <p className="text-xl text-gray-400 mb-12 max-w-xl mx-auto">
          The exact infrastructure used for Binns Media is available in the <span className="text-white font-bold">Media Empire Launchpad</span> package.
        </p>
        <button 
          onClick={() => navigate('/contact')}
          className="group relative inline-flex items-center gap-3 px-10 py-5 bg-white text-black font-bold rounded-full hover:bg-[#cc000a] hover:text-white transition-all hover:pr-14"
        >
          Book Your Strategy Call
          <ArrowRight className="absolute right-6 opacity-0 group-hover:opacity-100 transition-all" />
        </button>
      </section>

    </div>
  );
};

export default BinnsMediaCaseStudy;