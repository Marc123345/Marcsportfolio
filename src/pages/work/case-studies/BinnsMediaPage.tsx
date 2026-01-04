import React from 'react';
import { 
  ArrowRight, Star, Layers, Zap, 
  CheckCircle2, Globe, Layout, 
  MonitorPlay, Smartphone, Palette, 
  ExternalLink, Quote 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const BinnsMediaCaseStudy = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-[#0a0a0a] text-white selection:bg-[#A3D1FF] selection:text-black min-h-screen font-sans">
      
      {/* 1. HERO SECTION — Outcome First */}
      <section className="relative pt-32 pb-16 px-6 max-w-7xl mx-auto border-b border-white/5">
        <div className="flex flex-col md:flex-row items-end justify-between gap-12 mb-16">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 py-1 px-3 rounded-full bg-[#A3D1FF]/10 border border-[#A3D1FF]/20 text-[#A3D1FF] text-xs font-bold tracking-widest uppercase mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#A3D1FF] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#A3D1FF]"></span>
              </span>
              Package: Media Empire Launchpad
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

          {/* Project Quick Stats */}
          <div className="grid grid-cols-2 gap-x-12 gap-y-6 text-sm font-mono border-l border-white/10 pl-8">
            <div>
              <p className="text-gray-500 mb-1">Client</p>
              <p className="font-bold">Omar "Ace" Turner</p>
            </div>
            <div>
              <p className="text-gray-500 mb-1">Industry</p>
              <p className="font-bold">Media Production</p>
            </div>
            <div>
              <p className="text-gray-500 mb-1">Services</p>
              <p className="font-bold">Design & Development</p>
            </div>
            <div>
              <p className="text-gray-500 mb-1">Outcome</p>
              <p className="font-bold text-[#A3D1FF]">5.0/5.0 Client Rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. & 6. DESIGN SYSTEM & VISUALS (The Bento Grid) */}
      <section className="px-6 max-w-[1400px] mx-auto py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 auto-rows-[minmax(300px,auto)]">
          
          {/* Main Hero Shot (Wide - Mockup 4) */}
          <div className="md:col-span-8 md:row-span-2 relative group overflow-hidden rounded-3xl border border-white/10 bg-[#111]">
            <img 
              src="https://ik.imagekit.io/qcvroy8xpd/New%20Folder/Mockup%204%20-%2016x9.png" 
              alt="Desktop Dashboard View"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute top-6 left-6 bg-black/50 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-2">
              <MonitorPlay size={14} className="text-[#A3D1FF]" /> Web Interface
            </div>
          </div>

          {/* Mobile Shot (Tall - Mockup 2) */}
          <div className="md:col-span-4 md:row-span-2 relative group overflow-hidden rounded-3xl border border-white/10 bg-[#111]">
            <img 
              src="https://ik.imagekit.io/qcvroy8xpd/New%20Folder/Mockup%202%20-%201x1.png" 
              alt="Mobile Detail View"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute top-6 left-6 bg-black/50 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-2">
              <Smartphone size={14} className="text-[#A3D1FF]" /> Mobile Optimized
            </div>
          </div>

          {/* Typography/Detail Shot (Square - Mockup 1) */}
          <div className="md:col-span-4 relative group overflow-hidden rounded-3xl border border-white/10 bg-[#111] min-h-[300px]">
            <img 
              src="https://ik.imagekit.io/qcvroy8xpd/New%20Folder/Mockup%201%20-%201x1.png" 
              alt="Typography Detail"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute bottom-6 left-6">
              <h3 className="text-xl font-bold mb-1">Editorial Typography</h3>
              <p className="text-gray-400 text-sm">Design System</p>
            </div>
          </div>

          {/* Secondary Wide Shot (Mockup 3) */}
          <div className="md:col-span-8 relative group overflow-hidden rounded-3xl border border-white/10 bg-[#111] min-h-[300px]">
            <img 
              src="https://ik.imagekit.io/qcvroy8xpd/New%20Folder/Mockup%203%20-%2016x9.png" 
              alt="Dark Mode Interface"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
               <div className="bg-[#A3D1FF] text-black px-6 py-3 rounded-full font-bold flex items-center gap-2">
                 View Live Prototype <ExternalLink size={16} />
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. & 3. CONTEXT & PROBLEM */}
      <section className="py-24 px-6 max-w-4xl mx-auto">
        <h2 className="text-sm font-bold text-[#A3D1FF] uppercase tracking-widest mb-4">The Context</h2>
        <h3 className="text-3xl md:text-5xl font-bold mb-8">
          Culture-shaping content needed a cutting-edge home.
        </h3>
        <div className="grid md:grid-cols-2 gap-12 text-lg text-gray-400 leading-relaxed">
          <p>
            <strong className="text-white block mb-2">Who is Binns Media?</strong>
            BMG turns authentic voices into scalable media brands. They produce comedy, audio albums, and podcasts that define culture. They aren't just a production house; they are a voice for the community.
          </p>
          <p>
            <strong className="text-white block mb-2">The Business Problem</strong>
            Their digital presence didn't match their output. They had high-fidelity content living on borrowed platforms or outdated interfaces. They needed a centralized hub that looked as premium as their production quality.
          </p>
        </div>
      </section>

      {/* 4. STRATEGY (Media Empire Launchpad) */}
      <section className="py-24 bg-[#111] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16 md:text-center max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold mb-6">The Solution: <span className="text-[#A3D1FF]">Media Empire Launchpad</span></h2>
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
              <div key={i} className="p-8 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-[#A3D1FF]/30 transition-colors">
                <item.icon className="w-10 h-10 text-[#A3D1FF] mb-6" />
                <h4 className="text-xl font-bold mb-3">{item.title}</h4>
                <p className="text-gray-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. & 8. RESULTS & TESTIMONIAL (Clutch Data) */}
      <section className="py-32 px-6 max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Testimonial Card */}
          <div className="relative">
            <div className="absolute -top-10 -left-10 text-white/5">
              <Quote size={120} />
            </div>
            <div className="relative z-10">
              <blockquote className="text-2xl md:text-3xl font-medium leading-tight mb-8">
                "Marc Friedman Design Agency has the skills and talents to bring my ideas to life."
              </blockquote>
              <div className="flex items-center gap-4">
                <img 
                  src="https://ik.imagekit.io/qcvroy8xpd/67eb0c3957638498868399.jpeg" 
                  alt="Omar Turner"
                  className="w-16 h-16 rounded-full border border-white/20 object-cover"
                />
                <div>
                  <div className="font-bold text-white">Omar "Ace" Turner</div>
                  <div className="text-[#A3D1FF] text-sm uppercase tracking-wider font-bold">CEO, Binns Media Group</div>
                </div>
              </div>
            </div>
          </div>

          {/* Clutch Ratings */}
          <div className="bg-[#161616] p-10 rounded-3xl border border-white/5">
            <div className="flex items-center justify-between mb-8 pb-8 border-b border-white/10">
              <div>
                <h3 className="text-xl font-bold">Project Scorecard</h3>
                <p className="text-gray-500 text-sm">Verified Review • Feb 2025</p>
              </div>
              <div className="flex gap-1">
                {[1,2,3,4,5].map(n => <Star key={n} size={20} className="fill-[#A3D1FF] text-[#A3D1FF]" />)}
              </div>
            </div>
            
            <div className="space-y-6">
              {[
                { label: "Quality of Deliverables", score: "5.0" },
                { label: "Schedule & Deadlines", score: "5.0" },
                { label: "Cost & Value", score: "5.0" },
                { label: "Willing to Refer", score: "5.0" },
              ].map((stat, i) => (
                <div key={i} className="flex justify-between items-center group">
                  <span className="text-gray-400 group-hover:text-white transition-colors">{stat.label}</span>
                  <span className="font-mono font-bold text-[#A3D1FF]">{stat.score}</span>
                </div>
              ))}
            </div>
            
            <div className="mt-8 pt-8 border-t border-white/10 text-sm text-gray-500 italic">
              "They delivered on time and communicated effectively through virtual meetings. A great culture fit."
            </div>
          </div>

        </div>
      </section>

      {/* 9. ROLE & STACK */}
      <section className="py-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between gap-12">
          <div>
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Palette size={18} className="text-[#A3D1FF]" /> My Role
            </h3>
            <ul className="space-y-2 text-gray-400">
              <li>UX/UI Design Strategy</li>
              <li>Design System Creation</li>
              <li>Front-End Architecture</li>
              <li>Project Management (Trello)</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Layers size={18} className="text-[#A3D1FF]" /> Tech Stack
            </h3>
            <div className="flex flex-wrap gap-2 max-w-sm">
              {['React 18', 'Tailwind CSS', 'Supabase', 'Framer Motion', 'Vite', 'ImageKit'].map((tech) => (
                <span key={tech} className="px-3 py-1 bg-white/5 rounded-md text-sm text-gray-300 border border-white/5">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 10. CTA */}
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
          className="group relative inline-flex items-center gap-3 px-10 py-5 bg-white text-black font-bold rounded-full hover:bg-[#A3D1FF] transition-all hover:pr-14"
        >
          Book Your Strategy Call
          <ArrowRight className="absolute right-6 opacity-0 group-hover:opacity-100 transition-all" />
        </button>
      </section>

    </div>
  );
};

export default BinnsMediaCaseStudy;