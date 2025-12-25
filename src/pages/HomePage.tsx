import { useNavigate, Link } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { 
  ArrowRight, CircleCheck as CheckCircle, Target, TrendingUp, Zap, 
  Shield, Star, Sparkles, Send, MessageSquare, Rocket, 
  Layers, MousePointerClick, BarChart3, Globe, Cpu 
} from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import TrustedBy from '@/components/TrustedBy';
import SEO from '@/components/SEO';
import AccessibilityPanel from '@/components/AccessibilityPanel';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

export default function HomePage() {
  const navigate = useNavigate();
  const heroRef = useRef<HTMLElement>(null);
  const calendlyLink = "https://calendly.com/marc-friedman-web-design--meeting-link/30min";

  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', company: '', service: '', message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Please fill in all required fields');
      return;
    }
    setIsSubmitting(true);
    try {
      const { error } = await supabase.from('contact_submissions').insert([formData]);
      if (error) throw error;
      toast.success('System audit requested successfully!');
      setFormData({ name: '', email: '', phone: '', company: '', service: '', message: '' });
    } catch (error) {
      toast.error('Connection failed. Please try again.');
    } finally { setIsSubmitting(false); }
  };

  return (
    <div className="bg-black text-white font-primary">
      <SEO 
        title="The Sales Channel™ | High-Ticket Website Systems"
        description="We don't build websites; we rebuild how demand turns into revenue. Expert in Landing Pages, SEO, AEO, and GEO."
      />
      <AccessibilityPanel />

      {/* --- KEEPING YOUR HERO SECTION UNCHANGED --- */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32 pb-20" style={{ backgroundColor: '#1a2332' }}>
        <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
          <motion.div className="absolute inset-0 w-[120%] h-full" animate={{ x: ['0%', '-20%'] }} transition={{ duration: 40, repeat: Infinity, ease: "linear", repeatType: "reverse" }}>
            <img src="https://ik.imagekit.io/qcvroy8xpd/Container.png" alt="Marc Friedman Portfolio" className="w-full h-full object-cover opacity-40" />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-b from-[#1a2332]/60 via-transparent to-[#1a2332]/60"></div>
        </div>
        <div className="container mx-auto max-w-7xl px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16">
            <motion.div className="space-y-8" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
              <h1 className="text-display-large text-white">Award Winning Websites That Turn Attention Into Revenue</h1>
              <Link to="/tools/website-analyzer" className="mr_btn bg-primary text-black rounded-lg group">
                <Sparkles className="w-5 h-5 mr-2" />
                <span>Free Website AI Analysis</span>
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              {/* Reviews Badge */}
              <div className="bg-black/40 backdrop-blur-md p-6 rounded-2xl border border-white/10">
                <div className="flex items-center gap-2 mb-4 text-primary font-bold uppercase tracking-widest text-xs">
                  <Shield className="w-4 h-4" /> 20+ High-Ticket Partnerships
                </div>
                <div className="flex gap-4">
                    <div className="flex items-center gap-1"><Star className="w-4 h-4 fill-primary text-primary" /><span className="text-sm font-bold">5.0 Google</span></div>
                    <div className="flex items-center gap-1"><Star className="w-4 h-4 fill-primary text-primary" /><span className="text-sm font-bold">4.9 DesignRush</span></div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <TrustedBy />

      {/* --- NEW: THE 4-LAYER ARCHITECTURE (THE OFFER) --- */}
      <section className="py-32 px-6 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20">
            <h2 className="text-display-medium mb-6">The <span className="gradient-text">Sales Channel™</span> Architecture</h2>
            <p className="text-body-large text-light-gray max-w-2xl">We don't redesign sites. We rebuild how demand turns into revenue using a 4-layer conversion engine.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Demand Capture", icon: Target, desc: "ICP-specific positioning and trust-stacking above the fold.", outcome: "Right people keep scrolling" },
              { title: "Conversion Arch", icon: MousePointerClick, desc: "Scroll-based persuasion and intent-based CTAs.", outcome: "More action, same traffic" },
              { title: "Proof Engine", icon: Award, desc: "Social proof placed at decision points, not at the bottom.", outcome: "Trust before the call" },
              { title: "Infrastructure", icon: Cpu, desc: "CRM lead flow (HubSpot/Notion) + Core Web Vital optimization.", outcome: "Scale without friction" }
            ].map((layer, i) => (
              <motion.div key={i} className="card group" whileHover={{ y: -10 }}>
                <layer.icon className="w-10 h-10 text-primary mb-6" />
                <h3 className="text-heading-large mb-3">{layer.title}</h3>
                <p className="text-light-gray mb-6 text-sm">{layer.desc}</p>
                <div className="mt-auto pt-6 border-t border-white/5">
                    <span className="text-[10px] uppercase tracking-widest text-primary font-bold">Expected Outcome</span>
                    <p className="text-white font-medium">{layer.outcome}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- ENHANCED: FEATURED CASE STUDIES --- */}
      <section className="py-32 px-6 bg-black border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-16">
            <div>
              <h2 className="text-display-medium">Proven <span className="text-primary">Mechanics</span></h2>
              <p className="text-light-gray">Same offer. Same traffic. Less friction.</p>
            </div>
            <Link to="/work" className="text-primary font-bold flex items-center gap-2 hover:underline">View Systems <ArrowRight className="w-4 h-4" /></Link>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
             {/* Main Case Study */}
             <div className="card p-0 overflow-hidden flex flex-col lg:flex-row col-span-full">
                <div className="lg:w-1/2 aspect-video">
                    <img src="https://ik.imagekit.io/qcvroy8xpd/Screenshot.png" alt="Untapped Africa" className="w-full h-full object-cover" />
                </div>
                <div className="p-10 lg:w-1/2 flex flex-col justify-center">
                    <div className="badge badge-primary mb-4 w-fit">63% Drop-off Reduction</div>
                    <h3 className="text-display-medium mb-4">Untapped Africa</h3>
                    <p className="text-light-gray mb-8">Rebuilt their conversion infrastructure to handle high-ticket NGO partnerships across 8 countries.</p>
                    <div className="grid grid-cols-2 gap-6 mb-8">
                        <div>
                            <div className="text-primary text-2xl font-bold">250%</div>
                            <div className="text-xs text-light-gray uppercase">Engagement Lift</div>
                        </div>
                        <div>
                            <div className="text-primary text-2xl font-bold">Under 1s</div>
                            <div className="text-xs text-light-gray uppercase">LCP Speed</div>
                        </div>
                    </div>
                    <Link to="/work/untapped" className="mr_btn mr_btn_outline w-fit">Study the Architecture</Link>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* --- THE REVENUE-FOCUSED FORM --- */}
      <section className="py-32 px-6 bg-[#0a0a0a]">
        <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-display-medium mb-8">Ready to build your <span className="gradient-text">Sales Channel?</span></h2>
            <p className="text-body-large text-light-gray mb-12">"Most sites are brochures. We build the thing your sales team wishes they had."</p>
            
            <form onSubmit={handleSubmit} className="text-left bg-dark p-8 md:p-12 rounded-3xl border border-white/10 shadow-2xl">
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-light-gray">Full Name</label>
                        <input type="text" name="name" className="form-input" placeholder="Marc Friedman" required />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-light-gray">Business Email</label>
                        <input type="email" name="email" className="form-input" placeholder="marc@agency.com" required />
                    </div>
                </div>
                <div className="space-y-2 mb-8">
                    <label className="text-xs font-bold uppercase tracking-widest text-light-gray">Project Goal (AEO, GEO, or Sales Channel)</label>
                    <textarea name="message" rows={4} className="form-input resize-none" placeholder="Tell us about your conversion bottlenecks..."></textarea>
                </div>
                <button type="submit" disabled={isSubmitting} className="mr_btn bg-primary text-black w-full justify-center py-5">
                    {isSubmitting ? "Syncing System..." : "Request System Audit"}
                    <Send className="ml-2 w-5 h-5" />
                </button>
                <p className="mt-6 text-center text-xs text-light-gray">Response time: &lt; 24 hours. No-pitch strategy call.</p>
            </form>
        </div>
      </section>
    </div>
  );
}