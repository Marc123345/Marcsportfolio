import { useNavigate, Link } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { 
  ArrowRight, CircleCheck as CheckCircle, Target, TrendingUp, 
  Zap, Shield, Star, Sparkles, Send, MessageSquare, 
  Rocket, Globe, Cpu, ChevronRight, MousePointer2, ExternalLink,
  Quote, Smartphone, Code2, Search, Minus, Plus
} from 'lucide-react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

// Technical & UI Components
import TrustedBy from '@/components/TrustedBy';
import SEO from '@/components/SEO';
import AccessibilityPanel from '@/components/AccessibilityPanel';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

// --- DATA STRUCTURES ---

const CAPABILITIES = [
  {
    title: "Landing Pages",
    icon: MousePointer2,
    desc: "High-performance, conversion-optimized landing pages built with React/Next.js to turn traffic into leads.",
    details: ["Conversion Architecture", "Mobile-First Design", "A/B Test Ready"]
  },
  {
    title: "Technical SEO",
    icon: Search,
    desc: "Advanced search engine optimization focusing on site architecture, Core Web Vitals, and crawlability.",
    details: ["98+ PageSpeed Scores", "Schema Markup", "Semantic HTML"]
  },
  {
    title: "AEO & GEO",
    icon: Cpu,
    desc: "Future-proofing your visibility for the AI era with Answer Engine and Generative Engine Optimization.",
    details: ["LLM Compatibility", "Structured Data", "Entity Recognition"]
  },
  {
    title: "Website Design",
    icon: Sparkles,
    desc: "Award-winning UI/UX design that bridges the gap between aesthetic beauty and functional business goals.",
    details: ["Interaction Design", "Design Systems", "Prototyping"]
  }
];

const FAQS = [
  { q: "How long does a typical project take?", a: "Most landing pages and performance websites are delivered within 4-6 weeks, depending on the complexity of the integration and SEO requirements." },
  { q: "What is AEO and GEO?", a: "Answer Engine Optimization (AEO) and Generative Engine Optimization (GEO) focus on making your content readable and authoritative for AI models like ChatGPT and Google Gemini." },
  { q: "Do you work with existing teams?", a: "Yes. I often act as a technical design partner for agencies or internal marketing teams that need a specialist for high-stakes launches." }
];

// --- MAIN COMPONENT ---

export default function HomePage() {
  const navigate = useNavigate();
  const heroRef = useRef<HTMLElement>(null);
  const calendlyLink = "https://calendly.com/marc-friedman-web-design--meeting-link/30min";

  const [formData, setFormData] = useState({ name: '', email: '', service: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Design System Animation Logic
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 250]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const { error } = await supabase.from('contact_submissions').insert([formData]);
      if (error) throw error;
      toast.success('Message sent successfully!');
      setFormData({ name: '', email: '', service: '', message: '' });
    } catch (err) {
      toast.error('Submission failed. Please try again.');
    } finally { setIsSubmitting(false); }
  };

  return (
    <div className="bg-black text-white selection:bg-primary selection:text-black antialiased font-primary">
      <SEO 
        title="Marc Friedman | Full Stack Designer & Developer | SEO, AEO & GEO Expert"
        description="Award-winning digital experiences. Specializing in high-converting landing pages and technical SEO for the AI-search era."
      />
      <AccessibilityPanel />

      {/* 1. HERO SECTION: MINIMALIST POWER */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 bg-[#1a2332]">
        <div className="absolute inset-0 z-0">
          <motion.div style={{ y, opacity: heroOpacity }} className="h-full w-full">
            <img 
              src="https://ik.imagekit.io/qcvroy8xpd/Container.png" 
              className="w-full h-full object-cover opacity-30 grayscale" 
              alt="Marc Friedman Design" 
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/40 to-black"></div>
        </div>

        <div className="container mx-auto max-w-7xl px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8 }}
            className="max-w-5xl"
          >
            <div className="flex items-center gap-3 mb-8 text-primary font-bold tracking-[0.3em] text-[10px] uppercase">
              <span className="w-12 h-[1px] bg-primary"></span> 
              Full Stack Designer & Developer
            </div>
            
            <h1 className="text-display-large mb-8 leading-[1.05] tracking-tight">
              Building Digital <span className="gradient-text">Experiences</span> That Outperform.
            </h1>
            
            <p className="text-body-large text-light-gray max-w-2xl mb-12">
              Expert in Landing Pages, SEO, AEO, and GEO. I bridge the gap between high-end design and technical supremacy to drive measurable business growth.
            </p>

            <div className="flex flex-wrap gap-6">
              <Link to="/work" className="mr_btn bg-primary text-black rounded-xl group px-10 py-5">
                <span>Explore My Work</span>
                <ArrowRight className="ml-2 w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a href={calendlyLink} className="mr_btn mr_btn_outline rounded-xl px-10 py-5">
                Book Strategy Call
              </a>
            </div>

            {/* Verification Badge */}
            <div className="mt-16 flex items-center gap-6 p-4 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 w-fit">
              <div className="flex -space-x-3">
                {[1,2,3].map(i => <div key={i} className="w-10 h-10 rounded-full border-2 border-black bg-gray-800 shadow-xl" />)}
              </div>
              <div className="text-xs">
                <div className="flex text-primary mb-1">
                  {[1,2,3,4,5].map(i => <Star key={i} className="w-3 h-3 fill-current" />)}
                </div>
                <p className="font-bold text-white uppercase tracking-widest">20+ Five-Star Projects</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. PROOF STRIP: LOGOS & TESTIMONIALS */}
      <TrustedBy />

      {/* 3. CAPABILITIES: TECHNICAL DESIGN SYSTEM */}
      <section className="py-40 px-6 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mb-24">
            <h2 className="text-display-medium mb-6">Technical <span className="text-primary italic">Capabilities</span></h2>
            <p className="text-body-large text-light-gray">I focus on the intersection of aesthetic authority and technical performance. Every pixel and every line of code is engineered for speed and search dominance.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {CAPABILITIES.map((cap, i) => (
              <motion.div 
                key={i} 
                whileHover={{ y: -10 }} 
                className="card group hover:border-primary/50 transition-all p-10 flex flex-col h-full bg-dark/30"
              >
                <div className="w-16 h-16 rounded-2xl bg-primary/5 flex items-center justify-center mb-10 group-hover:bg-primary/10 transition-colors">
                  <cap.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-heading-large mb-4">{cap.title}</h3>
                <p className="text-light-gray text-sm mb-10 leading-relaxed">{cap.desc}</p>
                <ul className="mt-auto space-y-3">
                  {cap.details.map((detail, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white/50">
                      <CheckCircle className="w-3 h-3 text-primary" /> {detail}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. LEAD CASE STUDY: ASK AFRICA */}
      <section className="py-40 px-6 bg-black border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-24">
            <h2 className="text-display-medium leading-none">Featured <span className="text-primary italic">Project</span></h2>
            <Link to="/work" className="text-primary font-bold flex items-center gap-2 group">
              View All Work <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="card p-0 overflow-hidden flex flex-col lg:flex-row border-white/10 group bg-dark/20">
            <div className="lg:w-3/5 aspect-video overflow-hidden">
              <img 
                src="https://ik.imagekit.io/qcvroy8xpd/mockuuups-kzccsqfybhcjamey4qqdwh.jpeg" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80" 
                alt="Ask Africa Project" 
              />
            </div>
            <div className="p-12 lg:w-2/5 flex flex-col justify-center bg-dark/40">
              <div className="badge badge-primary mb-6">Technical SEO & Rebrand</div>
              <h3 className="text-display-medium mb-6">Ask Africa</h3>
              <p className="text-light-gray text-body-regular mb-10 leading-relaxed italic">
                "Transforming corporate presence through advanced AEO and SEO strategies, resulting in top-tier visibility in the AI search era."
              </p>
              
              <div className="grid grid-cols-2 gap-8 mb-10 border-y border-white/5 py-8">
                <div>
                  <p className="text-2xl font-bold text-white tracking-tighter">250%</p>
                  <p className="text-[10px] uppercase font-black text-primary tracking-widest">Traffic Lift</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-white tracking-tighter">98/100</p>
                  <p className="text-[10px] uppercase font-black text-primary tracking-widest">Perf. Score</p>
                </div>
              </div>
              
              <Link to="/work/case-studies/ask-africa" className="mr_btn bg-primary text-black rounded-lg w-fit">
                Study the Success
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5. ABOUT: THE PARTNER MODEL */}
      <section className="py-40 px-6 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-24 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }} 
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute -inset-10 bg-primary/10 blur-[120px] rounded-full" />
            <img 
              src="https://ik.imagekit.io/qcvroy8xpd/PW8VUKH.png" 
              className="relative rounded-[40px] grayscale hover:grayscale-0 transition-all duration-1000 border border-white/10 shadow-2xl" 
              alt="Marc Friedman" 
            />
          </motion.div>
          
          <div className="space-y-10">
            <h2 className="text-display-medium leading-tight">Expert Execution,<br /><span className="text-primary italic">Direct Accountability.</span></h2>
            <div className="space-y-6 text-body-large text-light-gray">
              <p>Hey, I'm Marc. I've spent 5+ years building digital assets for agencies, service businesses, and jewellery brands across three continents.</p>
              <p>When you work with me, you aren't handed off to a team of interns. You get direct access to the designer and developer responsible for your results. I focus on building React-based systems that are ready for the era of AEO and GEO.</p>
            </div>
            <div className="grid sm:grid-cols-2 gap-8 py-10 border-y border-white/5">
              <div><p className="text-4xl font-bold text-white">40+</p><p className="text-xs uppercase font-black text-primary tracking-widest mt-1">Partnerships</p></div>
              <div><p className="text-4xl font-bold text-white">100%</p><p className="text-xs uppercase font-black text-primary tracking-widest mt-1">Direct Access</p></div>
            </div>
            <a href={calendlyLink} className="mr_btn bg-primary text-black rounded-xl inline-flex px-10 py-5 font-black uppercase text-sm tracking-widest">
              Let's Talk Growth <MessageSquare className="ml-2 w-5 h-5" />
            </a>
          </div>
        </div>
      </section>

      {/* 6. FAQ SECTION */}
      <section className="py-40 px-6 bg-black">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-display-medium text-center mb-24 italic">Got <span className="text-primary italic">Questions?</span></h2>
          <div className="space-y-4">
            {FAQS.map((faq, i) => (
              <div key={i} className="card bg-dark/20 border-white/5 overflow-hidden">
                <button 
                  onClick={() => setOpenFaq(openFaq === i ? null : i)} 
                  className="w-full flex items-center justify-between p-8 text-left transition-colors hover:bg-white/5"
                >
                  <span className="text-heading-large text-white">{faq.q}</span>
                  <AnimatePresence mode="wait">
                    <motion.div 
                      key={openFaq === i ? 'minus' : 'plus'}
                      initial={{ opacity: 0, rotate: -90 }}
                      animate={{ opacity: 1, rotate: 0 }}
                      exit={{ opacity: 0, rotate: 90 }}
                    >
                      {openFaq === i ? <Minus className="text-primary" /> : <Plus className="text-primary" />}
                    </motion.div>
                  </AnimatePresence>
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }} 
                      animate={{ height: 'auto', opacity: 1 }} 
                      exit={{ height: 0, opacity: 0 }} 
                      className="overflow-hidden"
                    >
                      <div className="px-8 pb-8 text-light-gray text-body-regular leading-relaxed border-t border-white/5 pt-4">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. REFINED CONTACT: MINIMALIST CONVERSION */}
      <section className="py-40 px-6 bg-[#0a0a0a] border-t border-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-display-medium mb-10 italic">Start a <span className="text-primary">Conversation</span></h2>
          <p className="text-body-large text-light-gray mb-20 max-w-2xl mx-auto">
            Ready to build a digital asset that outlasts the competition? Reach out today for a consultation.
          </p>
          
          <form onSubmit={handleSubmit} className="text-left space-y-12 card bg-dark/40 p-12 md:p-16 border-white/10 shadow-3xl rounded-[3rem]">
            <div className="grid md:grid-cols-2 gap-12">
              <div className="space-y-2 group">
                <label className="text-xs font-black uppercase tracking-[0.2em] text-primary group-focus-within:text-white transition-colors">Full Name</label>
                <input 
                  type="text" 
                  name="name" 
                  required 
                  className="form-input bg-transparent border-b-2 border-white/10 rounded-none focus:border-primary transition-all px-0 py-4 text-white text-xl placeholder:text-white/10" 
                  placeholder="Marc Friedman" 
                />
              </div>
              <div className="space-y-2 group">
                <label className="text-xs font-black uppercase tracking-[0.2em] text-primary group-focus-within:text-white transition-colors">Email Address</label>
                <input 
                  type="email" 
                  name="email" 
                  required 
                  className="form-input bg-transparent border-b-2 border-white/10 rounded-none focus:border-primary transition-all px-0 py-4 text-white text-xl placeholder:text-white/10" 
                  placeholder="marc@agency.com" 
                />
              </div>
            </div>
            <div className="space-y-2 group">
              <label className="text-xs font-black uppercase tracking-[0.2em] text-primary group-focus-within:text-white transition-colors">Project Details</label>
              <textarea 
                name="message" 
                rows={4} 
                required 
                className="form-input bg-transparent border-b-2 border-white/10 rounded-none focus:border-primary transition-all px-0 py-4 text-white text-xl placeholder:text-white/10 resize-none" 
                placeholder="Tell me about your business goals..." 
              />
            </div>
            <button 
              type="submit" 
              disabled={isSubmitting} 
              className="mr_btn bg-primary text-black w-full justify-center py-6 rounded-2xl font-black text-xl hover:scale-[1.01] active:scale-[0.99] transition-all shadow-xl shadow-primary/10"
            >
              {isSubmitting ? 'Sending Request...' : 'Send Message'}
              <Send className="ml-2 w-6 h-6" />
            </button>
            <p className="text-center text-[10px] uppercase font-black text-light-gray tracking-[0.3em] pt-4">
              Response within 24 hours. No-pitch strategy call.
            </p>
          </form>
        </div>
      </section>
      
      {/* 8. FOOTER: SYSTEM SUMMARY */}
      <footer className="py-20 bg-black border-t border-white/5">
        <div className="container mx-auto px-6 text-center">
          <div className="flex justify-center gap-12 text-primary font-black uppercase tracking-[0.4em] text-[10px] mb-12">
            <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-white transition-colors">GitHub</a>
            <a href="#" className="hover:text-white transition-colors">Sitemap</a>
          </div>
          <p className="text-white/20 text-[10px] font-medium uppercase tracking-[0.2em]">
            © 2025 Marc Friedman Design Agency. All Rights Reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}