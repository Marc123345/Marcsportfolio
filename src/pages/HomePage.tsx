import { useNavigate, Link } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { 
  ArrowRight, CircleCheck as CheckCircle, Target, TrendingUp, Zap, 
  Shield, Users, Award, Clock, Star, Sparkles, Send, MessageSquare, 
  Rocket, ChartBar as BarChart3, Code as Code2, ChevronRight, Minus, Plus 
} from 'lucide-react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

// Components & Libs
import TrustedBy from '@/components/TrustedBy';
import SEO from '@/components/SEO';
import MagneticButton from '@/components/MagneticButton';
import AccessibilityPanel from '@/components/AccessibilityPanel';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

// Original Schema Content
const homeSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "Marc Friedman Design & Development",
  "description": "High-performance React/Node websites built to attract, convert, and close clients for agencies, ecommerce, and B2B companies.",
  "image": "https://marcfriedmanportfolio.com/wp-content/uploads/2024/12/image-1.webp",
  "url": "https://marcfriedmanportfolio.com",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Tel Aviv",
    "addressRegion": "TA",
    "addressCountry": "IL"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "32.0853",
    "longitude": "34.7818"
  },
  "founder": {
    "@type": "Person",
    "name": "Marc Friedman",
    "jobTitle": "Full Stack Designer & Developer"
  }
};

export default function HomePage() {
  const navigate = useNavigate();
  const heroRef = useRef<HTMLElement>(null);
  const calendlyLink = "https://calendly.com/marc-friedman-web-design--meeting-link/30min";

  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', company: '', service: '', message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Please fill in all required fields');
      return;
    }
    setIsSubmitting(true);
    try {
      const { error } = await supabase.from('contact_submissions').insert([{ ...formData, status: 'new' }]);
      if (error) throw error;
      toast.success('Message sent successfully! We\'ll get back to you within 24 hours.');
      setFormData({ name: '', email: '', phone: '', company: '', service: '', message: '' });
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
    } finally { setIsSubmitting(false); }
  };

  return (
    <div className="bg-black text-white selection:bg-primary selection:text-black antialiased font-primary">
      <SEO
        title="Websites That Convert for Agencies, Ecommerce, B2B"
        description="High-performance React/Node websites built to attract, convert, and close clients. Increase leads by 40% with websites that load in under 2 seconds."
        canonicalUrl="https://www.marcfriedmanportfolio.com/"
        keywords={['B2B web design', 'lead generation websites', 'agency websites', 'React development']}
        structuredData={homeSchema}
      />
      <AccessibilityPanel />

      {/* 1. HERO SECTION (Original Content + ImageKit) */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32 pb-20 bg-[#1a2332]">
        <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
          <motion.div className="absolute inset-0 w-[120%] h-full opacity-40 grayscale" animate={{ x: ['0%', '-20%'] }} transition={{ duration: 40, repeat: Infinity, ease: "linear", repeatType: "reverse" }}>
            <img src="https://ik.imagekit.io/qcvroy8xpd/Container.png" alt="Marc Friedman Portfolio" className="w-full h-full object-cover" />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black"></div>
        </div>

        <div className="container mx-auto max-w-7xl px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <h1 className="text-display-large mb-8 leading-[1.1] tracking-tight">
                Award Winning Websites That Turn <span className="gradient-text">Attention</span> Into Revenue
              </h1>
              
              <Link to="/tools/website-analyzer" className="mr_btn bg-primary text-black rounded-xl group px-8 py-5 text-lg shadow-xl shadow-primary/10">
                <Sparkles className="w-5 h-5 mr-3" />
                <span>Get a Free Website AI Analysis</span>
                <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>

              {/* Verified Badge */}
              <div className="mt-16 max-w-md bg-black/40 backdrop-blur-xl p-8 rounded-3xl border border-white/10 shadow-2xl">
                <div className="flex items-center gap-3 mb-6">
                  <Shield className="w-5 h-5 text-primary" />
                  <span className="text-white font-black text-xs uppercase tracking-widest">20+ Verified 5 Star Reviews</span>
                </div>
                
                <div className="space-y-4">
                  {['Google Business', 'DesignRush', 'LinkedIn'].map((platform) => (
                    <div key={platform} className="flex items-center justify-between">
                      <span className="text-sm font-bold">{platform}</span>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 fill-primary text-primary" />)}
                        <span className="text-xs font-black ml-2">5.0</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-2 mt-8 pt-6 border-t border-white/10">
                  <span className="text-light-gray text-[10px] uppercase font-bold tracking-widest">Trusted by:</span>
                  <div className="flex -space-x-2">
                    {[1,2,3].map(i => <div key={i} className="w-8 h-8 rounded-full border-2 border-[#1a2332] bg-dark shadow-lg" />)}
                    <div className="w-8 h-8 rounded-full bg-primary text-black flex items-center justify-center text-[10px] font-black border-2 border-[#1a2332]">20+</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. TESTIMONIALS & LOGOS (Right below Hero) */}
      <TrustedBy />

      {/* 3. FEATURED WORK (Ask Africa Highlight) */}
      <section className="py-40 px-6 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-24">
            <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-8 border-4 border-primary shadow-2xl">
              <img src="https://ik.imagekit.io/qcvroy8xpd/PW8VUKH.png" alt="Marc Friedman" className="w-full h-full object-cover" />
            </div>
            <h2 className="text-display-medium mb-6">Featured <span className="text-primary italic">Work</span></h2>
            <p className="text-body-large text-light-gray max-w-3xl mx-auto">Explore my portfolio of results-driven digital solutions that combine thoughtful design with robust development.</p>
          </motion.div>

          {/* Ask Africa Case Study */}
          <motion.div whileHover={{ y: -10 }} className="card p-0 overflow-hidden grid lg:grid-cols-2 bg-dark/40 border-white/5 mb-12">
            <div className="aspect-video overflow-hidden">
              <img src="https://ik.imagekit.io/qcvroy8xpd/mockuuups-kzccsqfybhcjamey4qqdwh.jpeg" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" alt="Ask Africa" />
            </div>
            <div className="p-12 flex flex-col justify-center">
              <div className="badge badge-primary mb-6">Corporate Rebrand</div>
              <h3 className="text-display-medium mb-4">Ask Africa</h3>
              <p className="text-light-gray mb-8">Comprehensive corporate website rebrand focused on technical SEO and modern user experience for the leading research firm.</p>
              <div className="flex flex-wrap gap-3 mb-10">
                {["React", "Tailwind CSS", "Local SEO"].map(tech => <span key={tech} className="px-3 py-1 rounded bg-white/5 text-[10px] uppercase font-black tracking-widest text-primary">{tech}</span>)}
              </div>
              <div className="flex gap-4">
                <a href="https://askafrika.co.za" target="_blank" rel="noopener" className="mr_btn mr_btn_outline text-sm py-3">View Live <ExternalLink className="ml-2 w-4 h-4" /></a>
                <Link to="/work/case-studies/ask-africa" className="mr_btn bg-white text-black text-sm py-3">Read Case Study</Link>
              </div>
            </div>
          </motion.div>

          {/* Untapped Africa */}
          <motion.div whileHover={{ y: -10 }} className="card p-0 overflow-hidden grid lg:grid-cols-2 bg-dark/40 border-white/5">
            <div className="aspect-video overflow-hidden lg:order-2">
              <img src="https://ik.imagekit.io/qcvroy8xpd/Screenshot.png" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" alt="Untapped Africa" />
            </div>
            <div className="p-12 flex flex-col justify-center lg:order-1">
              <div className="badge badge-primary mb-6">Featured Project</div>
              <h3 className="text-display-medium mb-4">Untapped Africa</h3>
              <p className="text-light-gray mb-8">Revolutionizing water infrastructure solutions across Africa with innovative technology. 250% increase in engagement.</p>
              <div className="space-y-3 mb-10">
                <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-primary" /><span className="text-sm">250% increase in engagement</span></div>
                <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-primary" /><span className="text-sm">8 countries impacted</span></div>
              </div>
              <Link to="/work/case-studies/untapped-africa" className="mr_btn bg-primary text-black text-sm py-3 w-fit">Explore Platform</Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 4. HOW IT WORKS */}
      <section className="py-40 px-6 bg-black">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-display-medium mb-6 italic">How It <span className="text-primary">Works</span></h2>
            <p className="text-body-large text-light-gray">Simple. No surprises. Just results.</p>
          </div>
          <div className="space-y-6">
            {[
              { num: "01", title: "Book a Call", desc: "We'll chat about your business, goals, and what's not working with your current site. No pressure, no sales pitch." },
              { num: "02", title: "I Build It", desc: "Custom design and development. Modern tech stack (React/Node). Weekly updates so you're never in the dark." },
              { num: "03", title: "You Launch & Grow", desc: "I deploy, test, and hand over a website that actually brings you customers. Plus 30 days of support." }
            ].map((step, i) => (
              <motion.div key={i} whileHover={{ x: 10 }} className="card flex items-start gap-10 p-12 bg-dark/20 border-white/5 group">
                <div className="text-6xl font-black text-primary/10 group-hover:text-primary/30 transition-colors">{step.num}</div>
                <div>
                  <h3 className="text-heading-large mb-3">{step.title}</h3>
                  <p className="text-light-gray text-lg">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. ABOUT (Original Text) */}
      <section className="py-40 px-6 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-24 items-center">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
            <img src="https://ik.imagekit.io/qcvroy8xpd/PW8VUKH.png" className="rounded-[40px] grayscale shadow-2xl border border-white/10" alt="Marc Friedman" />
          </motion.div>
          <div className="space-y-8">
            <h2 className="text-display-medium leading-tight">Work With Me,<br />Not a <span className="text-primary italic">Team of Interns</span></h2>
            <div className="text-body-large text-light-gray space-y-6">
              <p>Hey, I'm Marc. I've spent 5+ years building websites for agencies, local businesses, and jewellery brands across three continents.</p>
              <p>Unlike big agencies that hand your project off to junior devs, you work directly with me from start to finish. That means faster turnaround, better communication, and no surprises.</p>
              <p>I care about your success because your results are my reputation. When your website brings in leads and grows your business, we both win.</p>
            </div>
            <a href={calendlyLink} className="mr_btn bg-primary text-black rounded-full px-12 py-5 font-black uppercase text-sm tracking-widest mt-6">Let's Talk <MessageSquare className="ml-2 w-5 h-5" /></a>
          </div>
        </div>
      </section>

      {/* 6. FAQ SECTION */}
      <section className="py-40 px-6 bg-black">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-display-medium text-center mb-20 italic">Got <span className="text-primary italic">Questions?</span></h2>
          <div className="space-y-4">
            {[
              { q: "How long does it take?", a: "Most projects: 4-8 weeks. Complex apps: 12-16 weeks. I'll give you a clear timeline on our first call." },
              { q: "What's included?", a: "Everything. Custom design, React/Node dev, mobile responsive, SEO, analytics, CRM integration, and 30 days of support." },
              { q: "Do you work internationally?", a: "Yes! I work with clients across three continents. Time zones are never an issue." }
            ].map((item, i) => (
              <div key={i} className="card bg-dark/20 border-white/5 overflow-hidden">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between p-8 text-left transition-colors hover:bg-white/5">
                  <span className="text-heading-large text-white">{item.q}</span>
                  {openFaq === i ? <Minus className="text-primary" /> : <Plus className="text-primary" />}
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden">
                      <div className="px-8 pb-8 text-light-gray text-lg border-t border-white/5 pt-4">{item.a}</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. CONTACT FORM (Original Fields) */}
      <section className="py-40 px-6 bg-[#0a0a0a]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-display-medium mb-8 italic">Ready to Stop<br />Losing <span className="text-primary">Customers?</span></h2>
          <p className="text-body-large text-light-gray mb-16 max-w-2xl mx-auto">Book a free strategy call. We'll talk about your goals, and I'll show you exactly how I can help you grow.</p>
          
          <form onSubmit={handleSubmit} className="text-left bg-dark p-12 md:p-16 rounded-[40px] border border-white/10 shadow-3xl space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-primary">Name *</label>
                <input type="text" name="name" required value={formData.name} onChange={handleChange} className="form-input bg-black/50 py-4" placeholder="Your name" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-primary">Email *</label>
                <input type="email" name="email" required value={formData.email} onChange={handleChange} className="form-input bg-black/50 py-4" placeholder="your@email.com" />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-primary">Phone</label>
                <input type="text" name="phone" value={formData.phone} onChange={handleChange} className="form-input bg-black/50 py-4" placeholder="Phone number" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-primary">Company</label>
                <input type="text" name="company" value={formData.company} onChange={handleChange} className="form-input bg-black/50 py-4" placeholder="Company name" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-primary">What do you need? *</label>
              <textarea name="message" required rows={4} value={formData.message} onChange={handleChange} className="form-input bg-black/50 resize-none py-4" placeholder="Tell me about your project..."></textarea>
            </div>
            <button type="submit" disabled={isSubmitting} className="mr_btn bg-primary text-black w-full justify-center py-6 rounded-2xl font-black text-xl hover:scale-[1.01] transition-transform">
              {isSubmitting ? 'Sending...' : 'Send Message'} <Send className="ml-2 w-6 h-6" />
            </button>
            <p className="text-center text-xs text-light-gray pt-4">Or <a href={calendlyLink} className="text-primary font-bold hover:underline">book directly on my calendar</a></p>
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-20 bg-black border-t border-white/5 text-center">
        <div className="flex justify-center gap-12 text-primary font-black uppercase tracking-[0.4em] text-[10px] mb-8">
          <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
          <a href="#" className="hover:text-white transition-colors">GitHub</a>
          <a href="#" className="hover:text-white transition-colors">Sitemap</a>
        </div>
        <p className="text-white/20 text-[10px] font-medium uppercase tracking-[0.2em]">© 2025 Marc Friedman Design Agency. Tel Aviv, Israel.</p>
      </footer>
    </div>
  );
}