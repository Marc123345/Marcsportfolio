import { useNavigate, Link } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { 
  ArrowRight, CircleCheck as CheckCircle, Target, MousePointerClick, 
  Award, Cpu, Shield, Star, Sparkles, Send, MessageSquare, 
  Layers, ChevronDown, ExternalLink, Quote, Plus, Minus,
  TrendingUp, Zap, Globe, Rocket
} from 'lucide-react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

// Technical & UI Imports
import TrustedBy from '@/components/TrustedBy';
import SEO from '@/components/SEO';
import AccessibilityPanel from '@/components/AccessibilityPanel';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

// --- DATA STRUCTURES (Separated for maintainability) ---

const SALES_LAYERS = [
  { 
    title: "Demand Capture", 
    icon: Target, 
    desc: "ICP-specific positioning and trust-stacking above the fold. We ensure the right visitors keep scrolling.", 
    outcome: "Eliminates immediate bounce rate" 
  },
  { 
    title: "Conversion Arch", 
    icon: MousePointerClick, 
    desc: "Scroll-based persuasion architecture. Not long-copy, but intent-based flows that guide users to CTAs.", 
    outcome: "63% reduction in lead drop-off" 
  },
  { 
    title: "Proof Engine", 
    icon: Award, 
    desc: "Social proof placed at critical decision points. We frame your thinking, methodology, and results.", 
    outcome: "Trust built before the sales call" 
  },
  { 
    title: "Infrastructure", 
    icon: Cpu, 
    desc: "CRM-ready lead flow (HubSpot/Notion) + GEO/AEO optimization to future-proof your visibility.", 
    outcome: "Same traffic, more revenue" 
  }
];

const PROJECTS = [
  {
    title: "Untapped Africa",
    metric: "63% Drop-off Reduction",
    desc: "A comprehensive conversion infrastructure for high-ticket water solutions across 8 countries.",
    image: "https://ik.imagekit.io/qcvroy8xpd/Screenshot.png",
    tags: ["Next.js", "CRM Integration", "AEO Optimization"],
    link: "/work/untapped"
  },
  {
    title: "Ask Afrika",
    metric: "250% Engagement Lift",
    desc: "Corporate rebrand focused on AEO (Answer Engine Optimization) to dominate organic search intent.",
    image: "https://ik.imagekit.io/qcvroy8xpd/mockuuups-kzccsqfybhcjamey4qqdwh.jpeg",
    tags: ["React", "Technical SEO", "GEO Strategy"],
    link: "/work/ask-afrika"
  }
];

const FAQS = [
  { q: "How does a 'Sales Channel' differ from a website?", a: "A website is a brochure; a Sales Channel is a system. We don't just design pages; we build the technical architecture that turns traffic into revenue through demand capture and CRM integration." },
  { q: "How long is the implementation?", a: "Core systems launch in 4-6 weeks. Pro systems with full automation and multi-page funnels typically take 8-12 weeks." },
  { q: "Do you offer Rev-Share models?", a: "Yes, for established agencies and media partners, we offer a Partner Tier where we act as your backend conversion partner on a revenue-share basis." }
];

// --- MAIN COMPONENT ---

export default function HomePage() {
  const navigate = useNavigate();
  const heroRef = useRef<HTMLElement>(null);
  const calendlyLink = "https://calendly.com/marc-friedman-web-design--meeting-link/30min";

  const [formData, setFormData] = useState({ name: '', email: '', business: '', goal: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Scroll Parallax
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const { error } = await supabase.from('contact_submissions').insert([formData]);
      if (error) throw error;
      toast.success('Strategy audit requested. I will reach out within 24 hours.');
      setFormData({ name: '', email: '', business: '', goal: '' });
    } catch (err) {
      toast.error('Connection error. Please try again.');
    } finally { setIsSubmitting(false); }
  };

  return (
    <div className="bg-black text-white selection:bg-primary selection:text-black antialiased">
      <SEO 
        title="The Sales Channel™ | High-Ticket Website Architecture"
        description="We rebuild how demand turns into revenue. Expert Landing Pages, SEO, AEO, and GEO development for service businesses and agencies."
      />
      <AccessibilityPanel />

      {/* 1. HERO SECTION: THE OUTCOME */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32 pb-20 bg-[#1a2332]">
        <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
          <motion.div className="absolute inset-0 w-[120%] h-full opacity-30" animate={{ x: ['0%', '-20%'] }} transition={{ duration: 40, repeat: Infinity, ease: "linear", repeatType: "reverse" }}>
            <img src="https://ik.imagekit.io/qcvroy8xpd/Container.png" alt="Sales Architecture" className="w-full h-full object-cover" />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black"></div>
        </div>

        <div className="container mx-auto max-w-7xl px-6 relative z-10">
          <motion.div style={{ opacity: heroOpacity, scale: heroScale }} className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-black uppercase tracking-[0.2em] mb-8">
              <Sparkles className="w-4 h-4" /> Award-Winning Conversion Systems
            </div>
            <h1 className="text-display-large leading-[1.1] mb-8">
              We Build <span className="text-primary italic">Sales Channels™</span> — Not Just Websites.
            </h1>
            <p className="text-body-large text-light-gray max-w-2xl mb-12">
              A conversion-focused system that turns traffic into booked calls — without changing your offer or ads. We rebuild how demand turns into revenue.
            </p>
            <div className="flex flex-wrap gap-6">
              <Link to="/tools/website-analyzer" className="mr_btn bg-primary text-black rounded-xl group px-10 py-5">
                <span>Free System Audit</span>
                <ArrowRight className="ml-2 w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a href={calendlyLink} className="mr_btn mr_btn_outline rounded-xl px-10 py-5">
                Book Strategy Call
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. TRUST LAYER: LOGOS & TESTIMONIALS (Below Hero) */}
      <TrustedBy />

      {/* 3. CORE IP: THE 4-LAYER ARCHITECTURE */}
      <section className="py-40 px-6 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-20 items-end mb-24">
            <div>
              <h2 className="text-display-medium mb-6">The <span className="text-primary italic">Architecture</span> of Profit</h2>
              <p className="text-body-large text-light-gray">"Same offer. Same traffic. Less friction." We don't just redesign your site; we rebuild your entire conversion engine across four critical layers.</p>
            </div>
            <div className="flex gap-12 text-center lg:justify-end">
              <div><p className="text-4xl font-bold text-white">40+</p><p className="text-xs uppercase tracking-widest text-primary">Systems Built</p></div>
              <div><p className="text-4xl font-bold text-white">98/100</p><p className="text-xs uppercase tracking-widest text-primary">PageSpeed</p></div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SALES_LAYERS.map((layer, i) => (
              <motion.div key={i} whileHover={{ y: -10 }} className="card group bg-dark/30 border-white/5 p-10 flex flex-col h-full">
                <div className="w-16 h-16 rounded-2xl bg-primary/5 flex items-center justify-center mb-10 group-hover:bg-primary/10 transition-colors">
                  <layer.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-heading-large mb-4">{layer.title}</h3>
                <p className="text-light-gray text-sm mb-10 flex-grow leading-relaxed">{layer.desc}</p>
                <div className="pt-6 border-t border-white/5">
                  <span className="text-[10px] uppercase tracking-widest text-primary font-black block mb-2">Primary Outcome</span>
                  <p className="text-white font-bold">{layer.outcome}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. FEATURED SYSTEMS: OUTCOME-BASED WORK */}
      <section className="py-40 px-6 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-24">
            <h2 className="text-display-medium leading-none">Proven <span className="text-primary italic">Mechanics</span></h2>
            <Link to="/work" className="text-primary font-bold flex items-center gap-2 group">
              Explore All <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="space-y-32">
            {PROJECTS.map((project, i) => (
              <div key={i} className={`flex flex-col lg:flex-row gap-16 items-center ${i % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                <div className="lg:w-1/2 overflow-hidden rounded-3xl border border-white/10 group">
                  <img src={project.image} alt={project.title} className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="lg:w-1/2 space-y-8">
                  <div className="badge badge-primary">{project.metric}</div>
                  <h3 className="text-display-medium">{project.title}</h3>
                  <p className="text-body-large text-light-gray leading-relaxed">{project.desc}</p>
                  <div className="flex flex-wrap gap-3">
                    {project.tags.map(tag => <span key={tag} className="px-4 py-1 rounded-full bg-white/5 text-xs text-primary border border-white/5">{tag}</span>)}
                  </div>
                  <Link to={project.link} className="mr_btn mr_btn_outline w-fit">Study the Architecture</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. ABOUT: THE PARTNER MODEL */}
      <section className="py-40 px-6 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-24 items-center">
          <div className="relative">
            <div className="absolute -inset-10 bg-primary/10 blur-[120px] rounded-full" />
            <img src="https://ik.imagekit.io/qcvroy8xpd/PW8VUKH.png" className="relative rounded-[40px] grayscale hover:grayscale-0 transition-all duration-1000 border border-white/10 shadow-2xl" alt="Marc Friedman" />
          </div>
          <div className="space-y-10">
            <h2 className="text-display-medium leading-tight">Work With Me,<br />Not a <span className="text-primary italic">Team of Interns.</span></h2>
            <p className="text-body-large text-light-gray">I've spent 5+ years building high-ticket revenue systems for agencies, service businesses, and jewellery brands across three continents. Unlike big agencies, you get the founder. Faster turnaround. Zero friction.</p>
            <div className="grid sm:grid-cols-2 gap-8">
              {[
                { t: "Direct Founder Access", d: "No middle managers or interns." },
                { t: "Weekly Technical Updates", d: "You're never in the dark." },
                { t: "30-Day Launch Support", d: "We ensure the system scales." },
                { t: "Technical Supremacy", d: "React/Node + AEO/GEO ready." }
              ].map((item, i) => (
                <div key={i}>
                  <p className="text-white font-black mb-1 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-primary" /> {item.t}
                  </p>
                  <p className="text-xs text-light-gray">{item.d}</p>
                </div>
              ))}
            </div>
            <a href={calendlyLink} className="mr_btn bg-primary text-black rounded-xl inline-flex px-10">
              Let's Talk Revenue <MessageSquare className="ml-2 w-6 h-6" />
            </a>
          </div>
        </div>
      </section>

      {/* 6. FAQ: REDUCING FRICTION */}
      <section className="py-40 px-6 bg-black">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-display-medium text-center mb-20 italic">Got <span className="text-primary">Questions?</span></h2>
          <div className="space-y-4">
            {FAQS.map((faq, i) => (
              <div key={i} className="card bg-dark/20 border-white/5 overflow-hidden">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between p-8 text-left transition-colors hover:bg-white/5">
                  <span className="text-heading-large">{faq.q}</span>
                  {openFaq === i ? <Minus className="text-primary" /> : <Plus className="text-primary" />}
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden">
                      <div className="px-8 pb-8 text-light-gray text-body-regular leading-relaxed">
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

      {/* 7. FINAL AUDIT: HIGH-INTENT CONVERSION */}
      <section className="py-40 px-6 bg-[#0a0a0a] border-t border-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-display-medium mb-8 italic">Ready to build your <span className="text-primary italic">Sales Channel?</span></h2>
          <p className="text-body-large text-light-gray mb-16 max-w-2xl mx-auto">
            Book a free strategy call. We'll audit your current traffic drop-off and I'll show you exactly how to rebuild it for revenue.
          </p>
          
          <form onSubmit={handleSubmit} className="text-left bg-dark p-12 rounded-[40px] border border-white/10 shadow-2xl space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-xs font-black uppercase tracking-widest text-primary">Full Name</label>
                <input type="text" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="form-input bg-black/50 py-4" placeholder="Marc Friedman" />
              </div>
              <div className="space-y-3">
                <label className="text-xs font-black uppercase tracking-widest text-primary">Business Email</label>
                <input type="email" required value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="form-input bg-black/50 py-4" placeholder="marc@agency.com" />
              </div>
            </div>
            <div className="space-y-3">
              <label className="text-xs font-black uppercase tracking-widest text-primary">Conversion Bottleneck</label>
              <textarea required rows={4} value={formData.goal} onChange={(e) => setFormData({...formData, goal: e.target.value})} className="form-input bg-black/50 resize-none py-4" placeholder="Tell us about where you're losing customers..."></textarea>
            </div>
            <button type="submit" disabled={isSubmitting} className="mr_btn bg-primary text-black w-full justify-center py-6 rounded-2xl font-black text-xl hover:scale-[1.02] active:scale-[0.98]">
              {isSubmitting ? 'Syncing System...' : 'Request System Audit'}
              <Send className="ml-2 w-6 h-6" />
            </button>
            <p className="text-center text-xs text-light-gray pt-4">
              Average response time: &lt; 24 hours. No-pitch strategy call.
            </p>
          </form>
        </div>
      </section>

      {/* FOOTER: AEO/GEO REVENUE SUMMARY */}
      <footer className="py-20 bg-black border-t border-white/5">
        <div className="container mx-auto px-6 text-center">
          <p className="text-light-gray text-xs mb-8">
            © 2025 Marc Friedman Sales Systems. Specialist in Website Design, SEO, AEO, and GEO.
          </p>
          <div className="flex justify-center gap-8 opacity-40 hover:opacity-100 transition-opacity">
            <Link to="/privacy" className="text-xs hover:text-primary">Privacy</Link>
            <Link to="/terms" className="text-xs hover:text-primary">Terms</Link>
            <Link to="/sitemap" className="text-xs hover:text-primary">Sitemap</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}