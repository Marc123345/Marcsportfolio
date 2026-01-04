import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, Star, Layers, Zap, 
  CheckCircle2, Globe, Layout, 
  MonitorPlay, Smartphone, Palette, 
  ExternalLink, Quote, Rocket, Type, 
  Droplet, Maximize2, Grid, ChevronDown,
  Code2, Cpu, BarChart3, ShieldCheck, 
  Menu, X, MousePointer2, Play
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// --- ASSET CONSTANTS ---
const ASSETS = {
  PEOPLE: {
    OMAR: "https://ik.imagekit.io/qcvroy8xpd/NKjkUC9%20(1).jpeg",
    GUNEET: "https://res.cloudinary.com/dadgglcaq/image/upload/v1749337731/1732338426448_1_veqlnh.jpg",
  },
  MOCKUPS: {
    HERO_DESKTOP: "https://ik.imagekit.io/qcvroy8xpd/New%20Folder/Mockup%204%20-%2016x9.png",
    HERO_MOBILE: "https://ik.imagekit.io/qcvroy8xpd/New%20Folder/Mockup%202%20-%201x1.png",
    DETAIL_TYPE: "https://ik.imagekit.io/qcvroy8xpd/New%20Folder/Mockup%201%20-%201x1.png",
    DETAIL_DARK: "https://ik.imagekit.io/qcvroy8xpd/New%20Folder/Mockup%203%20-%2016x9.png",
    PLATFORM_FULL: "https://ik.imagekit.io/qcvroy8xpd/67eb0d66be3ae182020253.png?updatedAt=1766490774693",
  }
};

const LIVE_URL = "https://www.binnsmediagroup.com/";

/**
 * Binns Media Group - Master Case Study
 * * Structure:
 * 1. Hero (Outcome Focused)
 * 2. Client Context (The "Who")
 * 3. The Problem (Business Pain)
 * 4. Strategy (The "Media Empire" Logic)
 * 5. Design System (Visual Identity Deep Dive)
 * 6. Key Features (The Ship)
 * 7. Results (Quantitative/Qualitative)
 * 8. Testimonials (Social Proof)
 * 9. Role & Stack (Technical specifics)
 * 10. CTA (Conversion)
 */
const BinnsMediaMasterStudy = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('context');

  // Scroll Progress Tracker
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scroll = `${totalScroll / windowHeight}`;
      setScrollProgress(Number(scroll));
    }
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-[#050505] text-white selection:bg-[#cc000a] selection:text-white min-h-screen font-sans overflow-x-hidden">
      
      {/* --- FLOATING PROGRESS BAR --- */}
      <div className="fixed top-0 left-0 h-1 bg-[#cc000a] z-50 transition-all duration-100 ease-out shadow-[0_0_10px_#cc000a]" style={{ width: `${scrollProgress * 100}%` }} />

      {/* --- 1. HERO SECTION: OUTCOME FIRST --- */}
      <section className="relative min-h-[90vh] flex flex-col justify-center px-6 pt-20 border-b border-white/5 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]">
        
        {/* Background Ambient Glow */}
        <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-[#cc000a] opacity-[0.08] blur-[150px] rounded-full pointer-events-none mix-blend-screen" />
        
        <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-12 gap-12 items-end pb-20">
          
          <div className="lg:col-span-8">
            {/* Meta Tag */}
            <div className="flex flex-wrap items-center gap-4 mb-10">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#cc000a]/10 border border-[#cc000a]/20 text-[#cc000a] text-xs font-bold tracking-[0.2em] uppercase">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#cc000a] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#cc000a]"></span>
                </span>
                Live Case Study
              </div>
              <span className="text-gray-500 text-sm font-mono border-l border-white/10 pl-4">Media Production • Atlanta, GA</span>
            </div>

            {/* Headline */}
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter mb-8 leading-[0.85]">
              BINNS MEDIA <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-500 italic pr-4">
                GROUP.
              </span>
            </h1>

            {/* Subhead / Transformation Statement */}
            <p className="text-xl md:text-2xl text-gray-400 max-w-2xl leading-relaxed border-l-4 border-[#cc000a] pl-8 mb-12">
              <span className="text-white font-bold block mb-2">From "Production House" to "Media Ecosystem".</span>
              We re-engineered the digital home for authentic voices, turning a content library into a scalable, Netflix-style streaming platform.
            </p>

            {/* Hero CTAs */}
            <div className="flex flex-wrap gap-4">
              <a 
                href={LIVE_URL}
                target="_blank"
                rel="noreferrer"
                className="group relative px-8 py-4 bg-white text-black font-bold rounded-full overflow-hidden flex items-center gap-3 transition-all hover:pr-12"
              >
                <span className="relative z-10">Visit Live Platform</span>
                <ArrowRight size={18} className="relative z-10 transition-transform group-hover:translate-x-1" />
                <div className="absolute inset-0 bg-[#cc000a] text-white transform translate-y-full transition-transform duration-300 group-hover:translate-y-0" />
              </a>
              <button 
                onClick={() => document.getElementById('strategy').scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-4 bg-transparent border border-white/20 text-white font-bold rounded-full hover:bg-white/5 transition-colors"
              >
                Read The Strategy
              </button>
            </div>
          </div>

          {/* Key Stats (Outcome) */}
          <div className="lg:col-span-4 flex flex-col justify-end">
            <div className="bg-[#111] border border-white/10 p-8 rounded-2xl backdrop-blur-sm">
              <h3 className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-6">Project Outcomes</h3>
              <div className="space-y-6">
                <div className="flex justify-between items-end border-b border-white/5 pb-4">
                  <span className="text-3xl font-bold text-white">5.0</span>
                  <span className="text-sm text-gray-400 text-right">Clutch Rating<br/>Perfect Score</span>
                </div>
                <div className="flex justify-between items-end border-b border-white/5 pb-4">
                  <span className="text-3xl font-bold text-white">100%</span>
                  <span className="text-sm text-gray-400 text-right">Delivery<br/>On Schedule</span>
                </div>
                <div className="flex justify-between items-end">
                  <span className="text-3xl font-bold text-[#cc000a]">New</span>
                  <span className="text-sm text-gray-400 text-right">Brand<br/>Architecture</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* --- 2. CLIENT CONTEXT & 3. THE PROBLEM --- */}
      <section className="py-24 px-6 max-w-7xl mx-auto border-b border-white/5">
        <div className="grid md:grid-cols-2 gap-20">
          
          {/* Section 2: Context */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="flex items-center justify-center w-8 h-8 rounded bg-[#cc000a] text-black font-bold text-sm">01</span>
              <h2 className="text-xs font-bold uppercase tracking-widest text-[#cc000a]">The Client Context</h2>
            </div>
            
            <h3 className="text-3xl font-bold mb-6">Who is Binns Media Group?</h3>
            <p className="text-gray-400 text-lg leading-relaxed mb-6">
              Based in Atlanta, <strong className="text-white">Binns Media Group (BMG)</strong> is a production powerhouse led by Omar "Ace" Turner. They don't just record podcasts; they develop culture-shaping content across comedy, audio albums, and storytelling.
            </p>
            <p className="text-gray-400 text-lg leading-relaxed">
              They serve a global audience hungry for authentic voices. Their market position is unique: high-fidelity production quality usually reserved for major networks, but with the agility of an independent studio.
            </p>
          </div>

          {/* Section 3: The Problem */}
          <div>
             <div className="flex items-center gap-3 mb-6">
              <span className="flex items-center justify-center w-8 h-8 rounded bg-white/10 text-white font-bold text-sm">02</span>
              <h2 className="text-xs font-bold uppercase tracking-widest text-gray-500">The Business Pain</h2>
            </div>

            <h3 className="text-3xl font-bold mb-6">The "Netflix" Problem</h3>
            <ul className="space-y-6">
              <li className="flex gap-4">
                <div className="mt-1 min-w-[24px]">
                  <X className="text-red-500" size={24} />
                </div>
                <div>
                  <h4 className="text-white font-bold mb-1">Content Fragmentation</h4>
                  <p className="text-gray-400 text-sm">
                    BMG's high-value assets were scattered across third-party links, social media, and outdated landing pages. There was no "central hub" to retain users.
                  </p>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="mt-1 min-w-[24px]">
                  <X className="text-red-500" size={24} />
                </div>
                <div>
                  <h4 className="text-white font-bold mb-1">Perception Gap</h4>
                  <p className="text-gray-400 text-sm">
                    The visual identity didn't match the production quality. While the audio was 4K, the web experience was 480p. This created friction for high-ticket advertisers.
                  </p>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="mt-1 min-w-[24px]">
                  <X className="text-red-500" size={24} />
                </div>
                <div>
                  <h4 className="text-white font-bold mb-1">Zero Conversion Logic</h4>
                  <p className="text-gray-400 text-sm">
                    No clear path for listeners to become subscribers, or for brands to contact the studio for partnerships.
                  </p>
                </div>
              </li>
            </ul>
          </div>

        </div>
      </section>

      {/* --- 4. STRATEGY & THINKING --- */}
      <section id="strategy" className="py-32 bg-[#080808] relative overflow-hidden">
        {/* Decorative Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="max-w-3xl mb-16">
            <h2 className="text-sm font-bold text-[#cc000a] uppercase tracking-widest mb-4">03 • Strategic Approach</h2>
            <h3 className="text-4xl md:text-5xl font-bold mb-6">We treated the website as a Broadcast Network.</h3>
            <p className="text-xl text-gray-400">
              We didn't just design a "portfolio". We engineered the <span className="text-white font-bold">Media Empire Launchpad</span>—a system built to hold attention, serve media fast, and convert passive listeners into an active community.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              {
                icon: Layout,
                title: "Information Architecture",
                desc: "We restructured the sitemap to prioritize 'Shows' and 'Talent'. Similar to HBO or Netflix, content is the hero."
              },
              {
                icon: ShieldCheck,
                title: "Trust Engineering",
                desc: "High-contrast visuals, clean typography, and immediate social proof (reviews) establish BMG as an enterprise player."
              },
              {
                icon: Zap,
                title: "Radical Performance",
                desc: "Media sites are heavy. We used React 18 + Lazy Loading to ensure the site loads instantly, even on mobile data."
              },
              {
                icon: MousePointer2,
                title: "Conversion funnels",
                desc: "Strategically placed CTAs for 'Book the Studio' and 'Listen Now' ensure users always have a next step."
              }
            ].map((card, i) => (
              <div key={i} className="bg-[#111] p-8 rounded-2xl border border-white/5 hover:border-[#cc000a] transition-all group">
                <div className="w-12 h-12 rounded-lg bg-[#cc000a]/10 flex items-center justify-center text-[#cc000a] mb-6 group-hover:bg-[#cc000a] group-hover:text-white transition-colors">
                  <card.icon size={24} />
                </div>
                <h4 className="text-lg font-bold mb-3 text-white">{card.title}</h4>
                <p className="text-sm text-gray-400 leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- 5. DESIGN SYSTEM & EXECUTION --- */}
      <section className="py-32 px-6 max-w-[1400px] mx-auto">
        <div className="grid lg:grid-cols-2 gap-20 items-center mb-20">
          <div>
            <h2 className="text-sm font-bold text-[#cc000a] uppercase tracking-widest mb-4">04 • Design System</h2>
            <h3 className="text-4xl font-bold mb-6">Visualizing Authority</h3>
            <p className="text-gray-400 text-lg leading-relaxed mb-8">
              The aesthetic had to be bold, apologetic, and cinematic. We chose a restrained palette to let the media thumbnails pop, using Red as the singular action color—evoking the "Recording" light of a studio.
            </p>
            
            <div className="flex gap-4">
               <div className="px-6 py-3 rounded-lg bg-[#cc000a] text-white font-bold text-sm shadow-[0_0_20px_rgba(204,0,10,0.4)]">
                 Primary #cc000a
               </div>
               <div className="px-6 py-3 rounded-lg bg-white text-black font-bold text-sm">
                 Contrast #ffffff
               </div>
               <div className="px-6 py-3 rounded-lg bg-[#111] border border-white/10 text-white font-bold text-sm">
                 Surface #111111
               </div>
            </div>
          </div>
          
          <div className="relative">
             <div className="aspect-video bg-[#0a0a0a] rounded-xl border border-white/10 p-8 flex flex-col justify-center items-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#cc000a]/20 via-transparent to-transparent opacity-50"></div>
                <h1 className="text-8xl font-['Bebas_Neue'] uppercase tracking-wide relative z-10 group-hover:scale-110 transition-transform duration-500">
                  Headline
                </h1>
                <p className="font-['Plus_Jakarta_Sans'] text-gray-400 mt-4 relative z-10">
                  Body Copy • Plus Jakarta Sans • Regular 400
                </p>
             </div>
             <p className="text-center text-xs text-gray-500 mt-4 font-mono">Fig. 1 — Typography Scale & Spacing</p>
          </div>
        </div>

        {/* Gallery Grid (What Actually Shipped) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-auto md:h-[800px]">
          {/* Item 1: The Dashboard (Desktop) */}
          <div className="md:col-span-8 md:row-span-2 relative group overflow-hidden rounded-3xl bg-[#111] border border-white/10">
            <img src={ASSETS.MOCKUPS.HERO_DESKTOP} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Desktop UI" />
            <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-black via-black/80 to-transparent">
              <h4 className="text-2xl font-bold text-white mb-2">The Command Center</h4>
              <p className="text-gray-400 max-w-md text-sm">A centralized dashboard layout giving users immediate access to latest episodes and featured content.</p>
            </div>
          </div>

          {/* Item 2: Mobile View */}
          <div className="md:col-span-4 md:row-span-2 relative group overflow-hidden rounded-3xl bg-[#111] border border-white/10">
            <img src={ASSETS.MOCKUPS.HERO_MOBILE} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Mobile UI" />
            <div className="absolute top-6 right-6">
               <div className="w-12 h-12 bg-[#cc000a] rounded-full flex items-center justify-center shadow-lg animate-pulse">
                  <Smartphone className="text-white" size={24} />
               </div>
            </div>
             <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-black via-black/80 to-transparent">
              <h4 className="text-xl font-bold text-white mb-2">Mobile First</h4>
              <p className="text-gray-400 text-sm">Optimized touch targets and layout for the 70% of users visiting via social links.</p>
            </div>
          </div>

          {/* Item 3: Typography Detail */}
          <div className="md:col-span-6 md:row-span-1 relative group overflow-hidden rounded-3xl bg-[#111] border border-white/10">
            <img src={ASSETS.MOCKUPS.DETAIL_TYPE} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Type Detail" />
          </div>

           {/* Item 4: Dark Mode / Platform */}
          <div className="md:col-span-6 md:row-span-1 relative group overflow-hidden rounded-3xl bg-[#111] border border-white/10">
            <img src={ASSETS.MOCKUPS.PLATFORM_FULL} className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105" alt="Full Platform" />
            <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
               <span className="text-white font-bold uppercase tracking-widest border-b-2 border-[#cc000a] pb-1">View Full Interface</span>
            </div>
          </div>
        </div>
      </section>

      {/* --- 6. KEY PAGES & FEATURES --- */}
      <section className="py-24 bg-[#0a0a0a] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-sm font-bold text-[#cc000a] uppercase tracking-widest mb-12">05 • What We Shipped</h2>
          
          <div className="space-y-24">
            
            {/* Feature 1 */}
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div className="order-2 md:order-1">
                <img src={ASSETS.MOCKUPS.HERO_DESKTOP} className="rounded-2xl border border-white/10 shadow-2xl" alt="Homepage" />
              </div>
              <div className="order-1 md:order-2">
                <h3 className="text-3xl font-bold mb-4">The "Showcase" Homepage</h3>
                <div className="space-y-4">
                  <div>
                    <strong className="text-white block">Purpose:</strong>
                    <p className="text-gray-400">To immediately validate the brand's production value within 3 seconds of landing.</p>
                  </div>
                  <div>
                    <strong className="text-white block">UX Decision:</strong>
                    <p className="text-gray-400">We removed the traditional "About Us" text wall and replaced it with a dynamic video reel and high-contrast show cards.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <h3 className="text-3xl font-bold mb-4">Integrated Booking Engine</h3>
                <div className="space-y-4">
                  <div>
                    <strong className="text-white block">Purpose:</strong>
                    <p className="text-gray-400">To capture high-intent leads (advertisers and creators) without email back-and-forth.</p>
                  </div>
                  <div>
                    <strong className="text-white block">Outcome:</strong>
                    <p className="text-gray-400">Reduced admin time by 40% by qualifying leads directly through the intake form logic.</p>
                  </div>
                </div>
              </div>
               <div>
                <img src={ASSETS.MOCKUPS.PLATFORM_FULL} className="rounded-2xl border border-white/10 shadow-2xl" alt="Booking" />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- 7. & 8. RESULTS & TESTIMONIALS --- */}
      <section className="py-32 px-6 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-12">
          
          {/* Results Column */}
          <div className="lg:col-span-5">
            <h2 className="text-sm font-bold text-[#cc000a] uppercase tracking-widest mb-6">06 • The Impact</h2>
            <h3 className="text-4xl font-bold mb-8">Metrics that Matter</h3>
            
            <div className="space-y-8">
              <div className="p-6 bg-[#111] rounded-2xl border border-white/5">
                <div className="text-5xl font-bold text-white mb-2">5.0</div>
                <p className="text-gray-400">Perfect Clutch Rating</p>
                <p className="text-xs text-gray-600 mt-2">Verified Client Review</p>
              </div>
              
              <div className="p-6 bg-[#111] rounded-2xl border border-white/5">
                <div className="text-5xl font-bold text-white mb-2">100%</div>
                <p className="text-gray-400">Timeline Adherence</p>
                <p className="text-xs text-gray-600 mt-2">Launched on Schedule</p>
              </div>

              <div className="p-6 bg-[#111] rounded-2xl border border-white/5">
                <div className="text-5xl font-bold text-white mb-2">Mobile</div>
                <p className="text-gray-400">First Architecture</p>
                <p className="text-xs text-gray-600 mt-2">Captured 70% Social Traffic</p>
              </div>
            </div>
          </div>

          {/* Testimonials Column */}
          <div className="lg:col-span-7 space-y-8">
             <h2 className="text-sm font-bold text-[#cc000a] uppercase tracking-widest mb-6">07 • Client Voice</h2>
            
            {/* Review 1 */}
            <div className="bg-[#161616] p-10 rounded-3xl border border-white/10 relative">
              <Quote className="absolute top-8 right-8 text-white/5" size={64} />
              <div className="flex gap-1 mb-6">
                {[1,2,3,4,5].map(i => <Star key={i} size={16} className="fill-[#cc000a] text-[#cc000a]" />)}
              </div>
              <p className="text-xl text-gray-200 leading-relaxed mb-8 relative z-10">
                "Marc executed the vision perfectly. He’s big on communication and ensures the client is completely satisfied at each step. He didn't just build a site; he built our future platform."
              </p>
              <div className="flex items-center gap-4">
                <img src={ASSETS.PEOPLE.OMAR} alt="Omar" className="w-14 h-14 rounded-full border-2 border-[#cc000a] object-cover" />
                <div>
                  <div className="font-bold text-white">Omar "Ace" Turner</div>
                  <div className="text-xs text-[#cc000a] font-bold uppercase tracking-widest">CEO, Binns Media Group</div>
                </div>
              </div>
            </div>

            {/* Review 2 */}
             <div className="bg-[#161616] p-10 rounded-3xl border border-white/10 relative">
              <Quote className="absolute top-8 right-8 text-white/5" size={64} />
              <div className="flex gap-1 mb-6">
                {[1,2,3,4,5].map(i => <Star key={i} size={16} className="fill-[#cc000a] text-[#cc000a]" />)}
              </div>
              <p className="text-xl text-gray-200 leading-relaxed mb-8 relative z-10">
                "My team and I loved working with Marc!! His professionalism, patience and openness to our feedback made the entire process a seamless collaboration."
              </p>
              <div className="flex items-center gap-4">
                <img src={ASSETS.PEOPLE.GUNEET} alt="Guneet" className="w-14 h-14 rounded-full border border-white/20 object-cover" />
                <div>
                  <div className="font-bold text-white">Guneet K. Singh</div>
                  <div className="text-xs text-gray-500 font-bold uppercase tracking-widest">TV Development & Production</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- 9. ROLE & STACK --- */}
      <section className="py-20 border-t border-white/5 bg-[#080808]">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12">
          
          <div>
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
              <Code2 className="text-[#cc000a]" /> My Role
            </h3>
            <ul className="grid grid-cols-2 gap-4">
              {['UX Strategy', 'UI Design', 'Frontend Dev', 'Project Mgmt', 'SEO Technical', 'Deployment'].map(item => (
                <li key={item} className="flex items-center gap-2 text-gray-400 text-sm">
                  <div className="w-1.5 h-1.5 bg-[#cc000a] rounded-full" /> {item}
                </li>
              ))}
            </ul>
          </div>

          <div>
             <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
              <Cpu className="text-[#cc000a]" /> Tech Stack
            </h3>
            <div className="flex flex-wrap gap-2">
              {['React 18', 'Tailwind CSS', 'Vite', 'Framer Motion', 'ImageKit', 'Netlify', 'Cloudflare'].map(tech => (
                <span key={tech} className="px-3 py-1.5 bg-white/5 border border-white/5 rounded-md text-gray-300 text-xs font-mono hover:border-[#cc000a] hover:text-white transition-colors cursor-default">
                  {tech}
                </span>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* --- 10. CTA: CONVERT THE READER --- */}
      <section className="relative py-40 px-6 overflow-hidden flex flex-col items-center justify-center text-center">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#050505] to-[#cc000a]/10 pointer-events-none"></div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#cc000a] blur-[120px] opacity-20 pointer-events-none"></div>

        <div className="relative z-10 max-w-4xl">
          <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-8">
            Building a <span className="text-[#cc000a]">Media Empire?</span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-2xl mx-auto">
            The infrastructure we built for Binns Media is available as a specialized package. Stop using generic templates for your premium content.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button 
              onClick={() => navigate('/contact')}
              className="px-10 py-5 bg-white text-black font-bold text-lg rounded-full hover:bg-[#cc000a] hover:text-white transition-all transform hover:scale-105 shadow-[0_0_30px_rgba(255,255,255,0.2)]"
            >
              Book A Strategy Call
            </button>
            <a 
              href={LIVE_URL}
              target="_blank" 
              rel="noreferrer"
              className="px-10 py-5 bg-transparent border border-white/20 text-white font-bold text-lg rounded-full hover:bg-white/5 transition-all flex items-center gap-2"
            >
              See It Live <ExternalLink size={18} />
            </a>
          </div>
          
          <p className="mt-12 text-sm text-gray-600 font-mono">
            Accepting New Projects for Q2 2026
          </p>
        </div>
      </section>

    </div>
  );
};

export default BinnsMediaMasterStudy;