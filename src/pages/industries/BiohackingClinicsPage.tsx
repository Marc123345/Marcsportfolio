import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CircleCheck as CheckCircle, Target, TrendingUp, Zap, Shield, Clock, Star, Sparkles } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import SEO from '@/components/SEO';
import MagneticButton from '@/components/MagneticButton';
import SplitTextReveal from '@/components/SplitTextReveal';
import ContactForm from '@/components/ContactForm';

const pageSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Website Design for Biohacking & Longevity Clinics",
  "description": "Premium website design and SEO services for biohacking clinics, longevity centers, and wellness practices. 3 months free Google Business & SEO included.",
  "provider": {
    "@type": "ProfessionalService",
    "name": "Marc Friedman",
    "url": "https://www.marcfriedmanportfolio.com"
  },
  "areaServed": "Worldwide",
  "serviceType": "Web Design & SEO"
};

export default function BiohackingClinicsPage() {
  const heroRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const y3 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);

  return (
    <>
      <SEO
        title="Website Design for Biohacking & Longevity Clinics | Marc Friedman"
        description="Premium website design for biohacking clinics and longevity centers. 3 months free Google Business & SEO included. Get more patients with a high-converting website."
        canonicalUrl="https://www.marcfriedmanportfolio.com/industries/biohacking-clinics"
        keywords={[
          'biohacking clinic website',
          'longevity clinic web design',
          'wellness clinic website design',
          'biohacking website',
          'clinic SEO',
          'medical website design',
          'health clinic web development'
        ]}
        structuredData={pageSchema}
      />

      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden">
        <motion.div
          className="absolute inset-0 w-full h-full z-0"
          style={{ scale }}
        >
          <img
            src="https://ik.imagekit.io/qcvroy8xpd/Container%20(4).png"
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/75 to-black/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
          <motion.div
            className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-[#A3D1FF]/8 rounded-full blur-[150px]"
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>

        <div className="container mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 relative z-10 pt-32 pb-20 lg:pt-36 lg:pb-24">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">

            <motion.div
              className="lg:col-span-7 space-y-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="lg:inline-flex hidden items-center gap-2.5 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full px-5 py-2.5"
              >
                <span className="w-2 h-2 rounded-full bg-[#A3D1FF] animate-pulse" />
                <span className="text-[#A3D1FF] text-sm font-semibold tracking-wide uppercase">For Biohacking &amp; Longevity Clinics</span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="lg:hidden flex items-center gap-4 bg-white/5 backdrop-blur-sm border border-[#A3D1FF]/20 rounded-2xl px-5 py-3.5 max-w-fit"
              >
                <div className="w-10 h-10 rounded-xl bg-[#A3D1FF]/15 flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-5 h-5 text-[#A3D1FF]" />
                </div>
                <div>
                  <p className="text-white font-bold text-base leading-tight">3 Months Free Google Business &amp; SEO</p>
                  <p className="text-gray-400 text-xs">Included with every new website</p>
                </div>
              </motion.div>

              <div className="overflow-hidden">
                <h1 className="text-[clamp(2.8rem,6vw,5rem)] font-black tracking-[-0.03em] text-white leading-[1.05]">
                  <SplitTextReveal text="A Premium Website" delay={0.2} staggerDelay={0.04} />
                  <span className="block">
                    <SplitTextReveal text="for Your Clinic." delay={0.5} staggerDelay={0.04} />
                  </span>
                </h1>
              </div>

              <motion.div
                className="lg:hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <MagneticButton strength={15}>
                  <Link
                    to="/contact"
                    className="hero-cta-btn group relative inline-flex items-center justify-center gap-3 w-full bg-[#A3D1FF] text-[#0a0f1a] text-lg font-black uppercase tracking-wide px-8 py-5 rounded-2xl shadow-[0_0_50px_rgba(163,209,255,0.4)] transition-all duration-300 active:scale-[0.98]"
                  >
                    <span>Book a Free Consultation</span>
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </MagneticButton>
              </motion.div>

              <motion.div
                className="hidden lg:flex items-center gap-4 bg-white/5 backdrop-blur-sm border border-[#A3D1FF]/20 rounded-2xl px-6 py-4 max-w-fit"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.4 }}
              >
                <div className="w-12 h-12 rounded-xl bg-[#A3D1FF]/15 flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-6 h-6 text-[#A3D1FF]" />
                </div>
                <div>
                  <p className="text-white font-bold text-lg leading-tight">3 Months Free Google Business &amp; SEO</p>
                  <p className="text-gray-400 text-sm">Included with every new website</p>
                </div>
              </motion.div>

              <motion.div
                className="flex flex-col sm:flex-row items-start sm:items-center gap-5 pt-2"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.55 }}
              >
                <div className="flex items-center gap-4">
                  <motion.div
                    className="relative flex-shrink-0"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.7 }}
                  >
                    <div className="w-14 h-14 rounded-full overflow-hidden ring-2 ring-[#A3D1FF]/50 ring-offset-2 ring-offset-black/50">
                      <img
                        src="https://ik.imagekit.io/qcvroy8xpd/PW8VUKH.png?updatedAt=1759693058055&tr=f-webp"
                        alt="Marc Friedman"
                        className="w-full h-full object-cover"
                        loading="eager"
                      />
                    </div>
                    <div className="absolute -bottom-0.5 -right-0.5 w-5 h-5 bg-green-500 rounded-full border-2 border-black" />
                  </motion.div>

                  <div className="flex items-center gap-4 text-gray-300 text-sm">
                    <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-[#A3D1FF]" /> No contracts</span>
                    <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-[#A3D1FF]" /> No upfront risk</span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="flex items-center gap-4 pt-6 border-t border-white/10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.9 }}
              >
                <div className="flex items-center -space-x-2.5">
                  <div className="w-9 h-9 rounded-full border-2 border-black overflow-hidden">
                    <img src="https://ik.imagekit.io/qcvroy8xpd/1682479506906.jpeg?updatedAt=1754019693073" alt="Client" className="w-full h-full object-cover" />
                  </div>
                  <div className="w-9 h-9 rounded-full border-2 border-black overflow-hidden">
                    <img src="https://ik.imagekit.io/qcvroy8xpd/4c91361b-27ee-453b-88e0-af3026cac747_1_ro3hez_e_background_removal_f_png_vkfbub.png?updatedAt=1754023286922" alt="Client" className="w-full h-full object-cover" />
                  </div>
                  <div className="w-9 h-9 rounded-full border-2 border-black overflow-hidden">
                    <img src="https://ik.imagekit.io/qcvroy8xpd/1732338426448%20(1).jpeg?updatedAt=1749337717019" alt="Client" className="w-full h-full object-cover" />
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-1 mb-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-3.5 h-3.5 ${i < 5 ? 'fill-[#FFD700] text-[#FFD700]' : 'fill-gray-600 text-gray-600'}`} />
                    ))}
                    <span className="text-gray-400 text-xs ml-1.5">4.8</span>
                  </div>
                  <p className="text-gray-400 text-xs">5-star reviews on Google, Clutch, LinkedIn & DesignRush</p>
                </div>
              </motion.div>

            </motion.div>

            <motion.div
              className="lg:col-span-5 hidden lg:flex flex-col items-center justify-center"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.div
                className="relative w-full max-w-md"
                style={{ y: y3 }}
              >
                <motion.div
                  className="absolute -inset-[2px] rounded-3xl bg-gradient-to-br from-[#A3D1FF] via-[#5BB5FF] to-[#A3D1FF] opacity-60 blur-sm"
                  animate={{ opacity: [0.4, 0.7, 0.4] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                />
                <div className="relative bg-[#0a0f1a]/95 backdrop-blur-xl rounded-3xl border border-[#A3D1FF]/30 p-8 text-center space-y-6">
                  <motion.div
                    className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#A3D1FF] text-[#0a0f1a] text-xs font-black uppercase tracking-wider px-5 py-1.5 rounded-full shadow-[0_4px_20px_rgba(163,209,255,0.5)]"
                    animate={{ scale: [1, 1.06, 1] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    Limited Spots Available
                  </motion.div>

                  <div className="pt-2">
                    <p className="text-[#A3D1FF] text-sm font-semibold uppercase tracking-wider mb-2">Free 30-Min Strategy Call</p>
                    <h3 className="text-white text-2xl font-black leading-tight">
                      Get a Roadmap to <span className="text-[#A3D1FF]">More Patients</span>
                    </h3>
                  </div>

                  <div className="space-y-3 text-left">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#A3D1FF]/15 flex items-center justify-center flex-shrink-0">
                        <Target className="w-4 h-4 text-[#A3D1FF]" />
                      </div>
                      <p className="text-gray-300 text-sm">Custom website strategy for your clinic</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#A3D1FF]/15 flex items-center justify-center flex-shrink-0">
                        <TrendingUp className="w-4 h-4 text-[#A3D1FF]" />
                      </div>
                      <p className="text-gray-300 text-sm">SEO plan to rank #1 locally</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#A3D1FF]/15 flex items-center justify-center flex-shrink-0">
                        <Zap className="w-4 h-4 text-[#A3D1FF]" />
                      </div>
                      <p className="text-gray-300 text-sm">Conversion optimization audit</p>
                    </div>
                  </div>

                  <MagneticButton strength={15}>
                    <Link
                      to="/contact"
                      className="hero-cta-btn group relative inline-flex items-center justify-center gap-3 w-full bg-[#A3D1FF] text-[#0a0f1a] text-lg font-black uppercase tracking-wide px-8 py-5 rounded-2xl shadow-[0_0_50px_rgba(163,209,255,0.4)] hover:shadow-[0_0_80px_rgba(163,209,255,0.6)] transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]"
                    >
                      <span>Book a Free Consultation</span>
                      <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                  </MagneticButton>

                  <div className="flex items-center justify-center gap-6 text-gray-400 text-xs">
                    <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-[#A3D1FF]" /> 30 min</span>
                    <span className="flex items-center gap-1.5"><Shield className="w-3.5 h-3.5 text-[#A3D1FF]" /> 100% Free</span>
                    <span className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-[#A3D1FF]" /> No obligation</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          <motion.div
            className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-1.5"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="w-1.5 h-3 rounded-full bg-[#A3D1FF]" />
          </motion.div>
        </motion.div>
      </section>

      {/* Contact Section */}
      <section className="py-24 px-6 sm:px-8 lg:px-12 bg-black">
        <div className="max-w-3xl mx-auto">
          <ContactForm />
        </div>
      </section>
    </>
  );
}
