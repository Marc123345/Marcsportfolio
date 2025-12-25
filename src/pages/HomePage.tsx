import { useNavigate, Link } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { 
  ArrowRight, CircleCheck as CheckCircle, Target, TrendingUp, 
  Zap, Shield, Star, Sparkles, Send, MessageSquare, 
  Rocket, Globe, Cpu, ChevronRight, MousePointer2 
} from 'lucide-react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

// Component Imports
import TrustedBy from '@/components/TrustedBy';
import SEO from '@/components/SEO';
import AccessibilityPanel from '@/components/AccessibilityPanel';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

export default function HomePage() {
  const navigate = useNavigate();
  const heroRef = useRef<HTMLElement>(null);
  const calendlyLink = "https://calendly.com/marc-friedman-web-design--meeting-link/30min";

  const [formData, setFormData] = useState({ name: '', email: '', service: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Design System Scroll Effects
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const { error } = await supabase.from('contact_submissions').insert([formData]);
      if (error) throw error;
      toast.success('Message sent! I will be in touch shortly.');
      setFormData({ name: '', email: '', service: '', message: '' });
    } catch (err) {
      toast.error('Submission failed. Please try again.');
    } finally { setIsSubmitting(false); }
  };

  return (
    <div className="bg-black text-white selection:bg-primary selection:text-black">
      <SEO 
        title="Marc Friedman | Expert Website Design, SEO, AEO & GEO"
        description="Award-winning website design and full-stack development. Specializing in high-converting landing pages and modern SEO/AEO strategies."
      />
      <AccessibilityPanel />

      {/* 1. REFINED HERO SECTION */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Visual Background */}
        <div className="absolute inset-0 z-0">
          <motion.div style={{ y, opacity }} className="h-full w-full">
            <img 
              src="https://ik.imagekit.io/qcvroy8xpd/Container.png" 
              className="w-full h-full object-cover opacity-30 grayscale" 
              alt="Design Background" 
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/20 to-black"></div>
        </div>

        <div className="container mx-auto max-w-7xl px-6 relative z-10">
          <div className="max-w-4xl">
            <motion.div 
              initial={{ opacity: 0, x: -20 }} 
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2 mb-6 text-primary font-bold tracking-[0.2em] text-xs uppercase"
            >
              <div className="w-10 h-[1px] bg-primary" /> 
              Full Stack Designer & Developer
            </motion.div>
            
            <h1 className="text-display-large mb-8 leading-[1.05]">
              Building Digital <span className="gradient-text">Experiences</span> That Outperform.
            </h1>
            
            <p className="text-body-large text-light-gray max-w-2xl mb-12">
              Specializing in Landing Pages, SEO, AEO, and GEO. I bridge the gap between high-end design and technical supremacy using React and Next.js.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link to="/work" className="mr_btn bg-primary text-black rounded-full px-8 py-4 group">
                View My Projects
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a href={calendlyLink} className="mr_btn mr_btn_outline rounded-full px-8 py-4">
                Book Strategy Call
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SOCIAL PROOF LOGO STRIP */}
      <TrustedBy />

      {/* 3. CORE SERVICES (Redesigned with your Card system) */}
      <section className="py-32 px-6 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 mb-20 items-end">
            <div>
              <h2 className="text-display-medium mb-6 italic">Specialized <span className="text-primary">Capabilities</span></h2>
              <p className="text-body-large text-light-gray">Technical solutions built for the future of search and user experience.</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Landing Pages", icon: MousePointer2, desc: "Conversion-optimized pages built with high-performance React code." },
              { title: "Technical SEO", icon: TrendingUp, desc: "Maximizing crawlability and search rankings through clean architecture." },
              { title: "AEO & GEO", icon: Cpu, desc: "Answer & Generative Engine Optimization for the era of AI search." },
              { title: "Website Design", icon: Sparkles, desc: "Award-winning UI/UX design that captures and holds user attention." }
            ].map((service, i) => (
              <motion.div 
                key={i} 
                whileHover={{ y: -10 }} 
                className="card group hover:border-primary/50 transition-all p-10 flex flex-col h-full"
              >
                <service.icon className="w-10 h-10 text-primary mb-8" />
                <h3 className="text-heading-large mb-4">{service.title}</h3>
                <p className="text-light-gray text-sm leading-relaxed">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. FEATURED PROJECT (Untapped Africa) */}
      <section className="py-32 px-6 bg-black border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="card p-0 overflow-hidden flex flex-col lg:flex-row border-white/10 group">
            <div className="lg:w-1/2 aspect-video overflow-hidden">
              <img 
                src="https://ik.imagekit.io/qcvroy8xpd/Screenshot.png" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                alt="Untapped Africa" 
              />
            </div>
            <div className="p-10 lg:w-1/2 flex flex-col justify-center">
              <div className="badge badge-primary mb-6">Featured Case Study</div>
              <h3 className="text-display-medium mb-4">Untapped Africa</h3>
              <p className="text-light-gray text-body-regular mb-8">Revolutionizing water infrastructure solutions across Africa with innovative technology and sustainable practices.</p>
              
              <div className="flex gap-4 mb-8">
                {['Next.js', 'Supabase', 'AEO'].map(tech => (
                  <span key={tech} className="text-[10px] font-black uppercase tracking-widest text-primary bg-primary/5 px-3 py-1 rounded border border-primary/20">
                    {tech}
                  </span>
                ))}
              </div>
              
              <Link to="/work/untapped-africa" className="text-white font-bold flex items-center gap-2 group hover:text-primary transition-colors">
                Read Case Study <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5. ABOUT (Minimalist Focus) */}
      <section className="py-32 px-6 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} 
            whileInView={{ opacity: 1, scale: 1 }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-primary/10 blur-[100px] rounded-full" />
            <img 
              src="https://ik.imagekit.io/qcvroy8xpd/PW8VUKH.png" 
              className="relative rounded-[2rem] grayscale hover:grayscale-0 transition-all duration-700 border border-white/10" 
              alt="Marc" 
            />
          </motion.div>
          
          <div className="space-y-8">
            <h2 className="text-display-medium leading-tight">Expert Execution,<br /><span className="text-primary italic">Personal Commitment.</span></h2>
            <div className="space-y-6 text-body-large text-light-gray">
              <p>Hey, I'm Marc. I bridge the gap between aesthetics and performance. I work directly with clients to build digital assets that actually move the needle.</p>
              <p>With 5+ years of experience across three continents, I focus on building high-speed React applications that are optimized for the next generation of search engines.</p>
            </div>
            <div className="flex gap-10 py-6 border-y border-white/5">
              <div><p className="text-3xl font-bold text-white">40+</p><p className="text-xs uppercase text-primary font-black">Clients</p></div>
              <div><p className="text-3xl font-bold text-white">98/100</p><p className="text-xs uppercase text-primary font-black">Speed</p></div>
              <div><p className="text-3xl font-bold text-white">5.0</p><p className="text-xs uppercase text-primary font-black">Rating</p></div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. REFINED CONTACT FORM */}
      <section className="py-32 px-6 bg-black">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-display-medium mb-16 italic">Let's Build Something <span className="text-primary">Iconic</span></h2>
          
          <form onSubmit={handleSubmit} className="text-left space-y-8 card bg-dark/40 p-10 md:p-12 border-white/5">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-light-gray">Name</label>
                <input 
                  type="text" 
                  name="name" 
                  required 
                  className="form-input bg-transparent border-b-2 border-white/10 rounded-none focus:border-primary transition-all px-0" 
                  placeholder="John Doe" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-light-gray">Email</label>
                <input 
                  type="email" 
                  name="email" 
                  required 
                  className="form-input bg-transparent border-b-2 border-white/10 rounded-none focus:border-primary transition-all px-0" 
                  placeholder="john@example.com" 
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-light-gray">Project Details</label>
              <textarea 
                name="message" 
                rows={4} 
                required 
                className="form-input bg-transparent border-b-2 border-white/10 rounded-none focus:border-primary transition-all px-0 resize-none" 
                placeholder="Tell me about your vision..." 
              />
            </div>
            <button 
              type="submit" 
              disabled={isSubmitting} 
              className="mr_btn bg-primary text-black w-full justify-center py-6 rounded-full font-black text-xl hover:scale-[1.02] active:scale-[0.98] transition-transform"
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
              <Send className="ml-2 w-5 h-5" />
            </button>
          </form>
        </div>
      </section>
      
      {/* 7. FOOTER */}
      <footer className="py-20 bg-[#0a0a0a] border-t border-white/5 text-center">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-light-gray text-xs uppercase tracking-widest mb-4">© 2025 Marc Friedman Design Agency</p>
          <div className="flex justify-center gap-6 text-primary text-xs font-bold">
            <a href="#" className="hover:text-white">LinkedIn</a>
            <a href="#" className="hover:text-white">GitHub</a>
            <a href="#" className="hover:text-white">Awwwards</a>
          </div>
        </div>
      </footer>
    </div>
  );
}