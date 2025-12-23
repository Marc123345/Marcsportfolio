import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  ArrowRight, CheckCircle2, Shield, Star, Play, Pause, 
  Send, MessageSquare, Zap, Target, BarChart3, Code2, Sparkles 
} from 'lucide-react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

// Components
import TrustedBy from '@/components/TrustedBy';
import SEO from '@/components/SEO';
import MagneticButton from '@/components/MagneticButton';
import AccessibilityPanel from '@/components/AccessibilityPanel';

export default function HomePage() {
  const navigate = useNavigate();
  const heroRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  // States
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '', email: '', service: '', message: ''
  });

  // Parallax Values for Awwwards-style Depth
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const textY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const opacityFade = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Handle Video
  useEffect(() => {
    if (videoRef.current && videoRef.current.readyState >= 3) setIsVideoLoaded(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const { error } = await supabase.from('contact_submissions').insert([formData]);
      if (error) throw error;
      toast.success('Strategy session requested! Expect a reply in 24h.');
      setFormData({ name: '', email: '', service: '', message: '' });
    } catch (err) {
      toast.error('Submission failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-black">
      <SEO title="High-Performance B2B Web Engineering" />
      <AccessibilityPanel />

      {/* --- HERO: IMMERSIVE STAGE --- */}
      <section ref={heroRef} className="relative min-h-[110vh] flex items-center justify-center overflow-hidden">
        {/* Background Layer */}
        <motion.div style={{ scale: videoScale }} className="absolute inset-0 z-0">
          <video
            ref={videoRef} autoPlay muted loop playsInline
            onLoadedData={() => setIsVideoLoaded(true)}
            className="w-full h-full object-cover opacity-30 grayscale"
          >
            <source src="https://ik.imagekit.io/qcvroy8xpd/Closeup.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black"></div>
        </motion.div>

        {/* Floating Content Layer */}
        <div className="container-custom relative z-10 pt-20">
          <motion.div style={{ y: textY, opacity: opacityFade }} className="max-w-5xl">
            <motion.div 
              initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3 mb-8"
            >
              <div className="h-px w-8 bg-primary"></div>
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-primary">Available for Q1 2026</span>
            </motion.div>

            <h1 className="text-[clamp(3rem,8vw,8rem)] font-black leading-[0.9] tracking-tighter text-white mb-10">
              WEBSITES THAT <br />
              <span className="text-primary italic">FORCE</span> GROWTH.
            </h1>

            <p className="text-xl md:text-3xl text-gray-400 font-medium max-w-2xl leading-relaxed mb-12">
              High-performance digital ecosystems engineered for <span className="text-white">Agencies, B2B, and Ecommerce</span>.
            </p>

            <div className="flex flex-wrap gap-6">
              <MagneticButton>
                <Link to="/contact" className="mr_btn mr_btn_primary">
                  <span>Start Your Project</span>
                </Link>
              </MagneticButton>
              <a href="#work" className="group flex items-center gap-4 text-xs font-black uppercase tracking-widest text-gray-500 hover:text-white transition-colors">
                View Showcase 
                <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-primary group-hover:text-black transition-all">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </a>
            </div>
          </motion.div>
        </div>

        {/* Video Control */}
        <button 
          onClick={() => {
            if (videoRef.current?.paused) videoRef.current.play();
            else videoRef.current?.pause();
            setIsVideoPlaying(!isVideoPlaying);
          }}
          className="absolute bottom-12 right-12 z-20 w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-primary transition-colors"
        >
          {isVideoPlaying ? <Pause size={16} /> : <Play size={16} />}
        </button>
      </section>

      {/* --- TRUST BAR --- */}
      <div className="border-y border-white/5 bg-black py-10">
        <TrustedBy />
      </div>

      {/* --- REASONS TO CONVERT: THE EDGE --- */}
      <section className="py-32 container-custom">
        <div className="grid lg:grid-cols-2 gap-20 items-end mb-24">
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-none">
            ENGINEERING THE <br /><span className="text-primary">UNFAIR ADVANTAGE.</span>
          </h2>
          <p className="text-xl text-gray-500 leading-relaxed max-w-md">
            I don't just build pages; I build conversion funnels that load in under 1 second and rank where your customers are looking.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-px bg-white/10 border border-white/10 rounded-[3rem] overflow-hidden">
          {[
            { icon: Zap, title: "Sub-Second Speed", desc: "Every millisecond costs you money. I build on React + GSAP for instant performance." },
            { icon: Target, title: "SEO Dominance", desc: "Semantic code architecture designed specifically for AI crawlers and high-intent search." },
            { icon: BarChart3, title: "Conversion First", desc: "Data-driven UI/UX designed to guide users directly into your sales pipeline." }
          ].map((item, i) => (
            <div key={i} className="bg-black p-12 hover:bg-white/[0.02] transition-colors group">
              <item.icon className="w-10 h-10 text-primary mb-8 group-hover:scale-110 transition-transform duration-500" />
              <h3 className="text-2xl font-black mb-4">{item.title}</h3>
              <p className="text-gray-500 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* --- FEATURED SHOWCASE --- */}
      <section id="work" className="py-32 bg-dark-card">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-20">
            <div>
              <span className="text-[10px] font-black text-primary uppercase tracking-[0.4em] mb-4 block">Portfolio</span>
              <h2 className="text-5xl md:text-8xl font-black tracking-tighter leading-none">SELECTED WORKS</h2>
            </div>
            <Link to="/work" className="mr_btn mr_btn_outline"><span>Explore All</span></Link>
          </div>

          <div className="grid lg:grid-cols-12 gap-10">
            <motion.div 
              whileHover={{ y: -10 }}
              className="lg:col-span-8 group relative aspect-[16/9] rounded-[3rem] overflow-hidden bg-white/5 border border-white/10"
            >
              <img src="https://ik.imagekit.io/qcvroy8xpd/Screenshot.png" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 p-12 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-primary font-bold uppercase tracking-widest text-xs mb-2">Water Infrastructure</span>
                <h3 className="text-4xl font-black">Untapped Africa</h3>
              </div>
            </motion.div>
            
            <div className="lg:col-span-4 space-y-10">
              <div className="p-10 rounded-[3rem] bg-primary text-black h-full flex flex-col justify-between">
                <p className="text-3xl font-black tracking-tighter leading-tight">"The platform redesign increased our engagement by 250% in the first quarter."</p>
                <div>
                  <p className="font-black uppercase text-xs tracking-widest">Global Partner</p>
                  <p className="text-black/60 font-bold">Untapped Africa Team</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- THE DIRECT PARTNER SECTION --- */}
      <section className="py-32 container-custom grid lg:grid-cols-2 gap-20 items-center">
        <div className="relative">
          <div className="aspect-[4/5] rounded-[3rem] overflow-hidden grayscale border border-white/10">
            <img src="https://ik.imagekit.io/qcvroy8xpd/PW8VUKH.png" alt="Marc" className="w-full h-full object-cover" />
          </div>
          <div className="absolute -bottom-10 -right-10 bg-white p-10 rounded-3xl text-black hidden md:block">
            <Star className="w-8 h-8 fill-black mb-4" />
            <p className="text-2xl font-black tracking-tighter leading-none">NO INTERNS.<br />ONLY EXPERTS.</p>
          </div>
        </div>
        
        <div className="space-y-10">
          <h2 className="text-5xl font-black tracking-tighter leading-tight">
            WORK WITH ME,<br /><span className="text-gray-600">NOT AN AGENCY JUNIOR.</span>
          </h2>
          <p className="text-xl text-gray-400 leading-relaxed">
            I’ve spent 5+ years engineering high-conversion systems for clients across three continents. When you hire me, you get direct access to a full-stack engineer and designer who cares about your ROI as much as you do.
          </p>
          <ul className="space-y-4">
            {['Direct communication with the engineer', 'Weekly progress audits', 'Full-stack design + dev ownership'].map((check, i) => (
              <li key={i} className="flex items-center gap-4 text-white font-bold">
                <CheckCircle2 className="text-primary w-5 h-5" /> {check}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* --- FINAL CONVERSION FORM --- */}
      <section className="py-32 bg-dark-card border-t border-white/5 relative">
        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto glass p-10 md:p-20 rounded-[4rem]">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-7xl font-black tracking-tighter mb-6 leading-none">READY TO GROW?</h2>
              <p className="text-gray-500 text-lg">Book a free audit. No sales pitch, just a strategy for your next build.</p>
            </div>

            <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-8">
              <input 
                type="text" placeholder="Name" required
                className="form-input" 
                value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
              />
              <input 
                type="email" placeholder="Email" required
                className="form-input"
                value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})}
              />
              <select 
                className="form-input col-span-full"
                value={formData.service} onChange={e => setFormData({...formData, service: e.target.value})}
              >
                <option value="">Select Service</option>
                <option value="B2B Funnel">B2B Funnel Build</option>
                <option value="Ecommerce">Ecommerce Storefront</option>
                <option value="Redesign">Strategic Redesign</option>
              </select>
              <textarea 
                placeholder="Project Details" rows={4} required
                className="form-input col-span-full resize-none"
                value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})}
              />
              <button 
                type="submit" disabled={isSubmitting}
                className="mr_btn mr_btn_primary col-span-full py-6 text-xl"
              >
                <span>{isSubmitting ? 'Sending...' : 'Request Audit'}</span>
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}