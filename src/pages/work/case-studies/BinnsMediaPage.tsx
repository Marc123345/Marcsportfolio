import React from 'react';
import { 
  BarChart3, Code2, Globe, Layout, 
  PlayCircle, Rocket, ShieldCheck, Zap, 
  ChevronRight, ExternalLink, ArrowRight, Star
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Import our interactive component
import BMG3DMockup from '@/components/BMG3DMockup';

const BinnsMediaPage = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-[#0a0a0a] text-white selection:bg-[#A3D1FF] selection:text-black min-h-screen font-sans">
      
      {/* --- HERO SECTION: The Visual Hook --- */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
        <div className="max-w-4xl text-center z-10 pt-20">
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
            A high-performance media hub built with React 18, Supabase, and a focus on radical speed.
          </p>
        </div>

        {/* 3D Mockup - Maintaining original structure with updated assets */}
        <div className="w-full max-w-6xl -mt-10">
          <BMG3DMockup />
          {/* Embedding extra preview page as requested */}
          <img 
            src="https://ik.imagekit.io/qcvroy8xpd/67eb0d66be3ae182020253.png" 
            alt="Binns Media Platform Overview"
            className="w-full rounded-2xl border border-white/10 shadow-2xl mt-12"
          />
        </div>
      </section>

      {/* --- STRATEGIC OVERVIEW: Hard Data --- */}
      <section className="py-24 border-y border-white/5 bg-gradient-to-b from-transparent via-white/[0.02] to-transparent">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          {[
            { label: 'Speed Increase', value: '60%', icon: Zap },
            { label: 'SEO Performance', value: '98/100', icon: Globe },
            { label: 'New Users', value: '+40%', icon: BarChart3 },
            { label: 'Architecture', value: 'Type-Safe', icon: ShieldCheck },
          ].map((stat, i) => (
            <div key={i} className="group cursor-default">
              <stat.icon className="w-6 h-6 text-gray-600 group-hover:text-[#A3D1FF] transition-colors mx-auto mb-4" />
              <div className="text-4xl font-bold text-white mb-2">{stat.value}</div>
              <div className="text-gray-500 uppercase text-xs tracking-widest">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* --- NARRATIVE: The Problem & The Solution --- */}
      <section className="py-32 px-6 max-w-7xl mx-auto grid md:grid-cols-2 gap-24 items-start">
        <div>
          <h2 className="text-4xl font-bold mb-8">The Friction</h2>
          <p className="text-gray-400 text-lg leading-relaxed mb-8">
            Binns Media Group (BMG) manages hundreds of hours of high-fidelity video and audio content. Their legacy platform was buckling under the weight of the media, leading to slow load times and a poor mobile experience for listeners on the go.
          </p>
          <img 
            src="https://ik.imagekit.io/qcvroy8xpd/67eaf9f50f188319226484%20(2).png" 
            alt="Mobile UI Performance"
            className="w-full rounded-xl mb-8 border border-white/5"
          />
          <div className="space-y-6">
            <div className="flex gap-4 p-6 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-[#A3D1FF]/50 transition-colors">
              <Star className="text-[#A3D1FF] shrink-0" />
              <p className="text-gray-300"><strong className="text-white">Goal:</strong> Centralize podcasts, TV, and exclusive talent interviews into one seamless ecosystem.</p>
            </div>
          </div>
        </div>
        
        {/* Technical Deep Dive Block */}
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-[#A3D1FF] to-blue-600 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
          <div className="relative bg-[#111] border border-white/10 p-10 rounded-3xl shadow-3xl">
            <h3 className="text-heading-large mb-6">Engineering Decisions</h3>
            <img 
              src="https://ik.imagekit.io/qcvroy8xpd/67eb0d66b12c7394660719%20(1).jpeg" 
              alt="Backend Architecture"
              className="w-full rounded-lg mb-8 opacity-80"
            />
            <ul className="space-y-8 text-gray-400">
              <li className="flex gap-5">
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
                  <Rocket className="text-white w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-white font-bold mb-1">Optimized Asset Delivery</h4>
                  <p className="text-sm">Implemented lazy-loading and WebP image optimization, reducing initial bundle size by 45%.</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* --- TESTIMONIAL: The Result --- */}
      <section className="py-32 bg-[#111] border-y border-white/5">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="relative inline-block mb-10">
            <img 
              src="https://ik.imagekit.io/qcvroy8xpd/67eb0c3957638498868399.jpeg" 
              className="w-28 h-28 rounded-full border-4 border-[#A3D1FF] shadow-2xl relative z-10 object-cover" 
              alt="Omar Turner, BMG CEO" 
            />
            <div className="absolute -bottom-2 -right-2 bg-white text-black p-2 rounded-full z-20">
              <PlayCircle size={20} />
            </div>
          </div>
          <blockquote className="text-3xl italic text-gray-200 mb-10 leading-snug tracking-tight">
            "Marc executed the vision perfectly. He’s big on communication and ensures the client is completely satisfied at each step. He didn't just build a site; he built our future platform."
          </blockquote>
          <p className="font-bold text-white text-xl">Omar Turner</p>
          <p className="text-[#A3D1FF] uppercase text-xs tracking-[0.2em] mt-2 font-bold">CEO, Binns Media Group</p>
        </div>
      </section>

      {/* --- FOOTER CTA --- */}
      <section className="py-40 text-center px-6">
        <h2 className="text-5xl md:text-7xl font-bold mb-12 tracking-tighter">Your project is next.</h2>
        <button 
          onClick={() => navigate('/contact')}
          className="group relative px-12 py-6 bg-white text-black font-black rounded-full transition-all hover:pr-16 active:scale-95"
        >
          LET'S WORK TOGETHER
          <ArrowRight className="absolute right-8 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all" />
        </button>
      </section>
    </div>
  );
};

export default BinnsMediaPage;