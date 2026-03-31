import { useNavigate, Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { ArrowRight, CircleCheck as CheckCircle, Target, TrendingUp, Zap, Shield, Users, Award, Clock, Star, Sparkles, MessageSquare, Rocket, ChartBar as BarChart3, Code as Code2 } from 'lucide-react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import TrustedBy from '@/components/TrustedBy';
import SEO from '@/components/SEO';
import MagneticButton from '@/components/MagneticButton';
import AccessibilityPanel from '@/components/AccessibilityPanel';
import ContactForm from '@/components/ContactForm';
import Reveal from '@/components/Reveal';
import SplitTextReveal from '@/components/SplitTextReveal';
import Spotlight from '@/components/Spotlight';
import AnimatedFAQ from '@/components/AnimatedFAQ';
import ConnectedSteps from '@/components/ConnectedSteps';
import FeaturedWorkCarousel from '@/components/FeaturedWorkCarousel';

const homeSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "Marc Friedman - Web Designer Tel Aviv",
  "description": "Professional web designer in Tel Aviv creating high-performance React/Node websites for agencies, ecommerce, and B2B companies. Expert in web development and conversion optimization.",
  "image": "https://marcfriedmanportfolio.com/wp-content/uploads/2024/12/image-1.webp",
  "url": "https://marcfriedmanportfolio.com",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Tel Aviv",
    "addressRegion": "Tel Aviv District",
    "addressCountry": "IL"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "32.0853",
    "longitude": "34.7818"
  },
  "sameAs": [
    "https://www.linkedin.com/in/portfolio2/",
    "https://www.behance.net/marcfriedmanweb",
    "https://g.co/kgs/78fRZ6r"
  ],
  "founder": {
    "@type": "Person",
    "name": "Marc Friedman",
    "jobTitle": "Web Designer Tel Aviv | Full Stack Designer & Developer"
  },
  "areaServed": {
    "@type": "GeoCircle",
    "geoMidpoint": {
      "@type": "GeoCoordinates",
      "latitude": "32.0853",
      "longitude": "34.7818"
    },
    "geoRadius": "50000"
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Design & Development Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Web Development",
          "description": "Custom website development services"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "UI/UX Design",
          "description": "User interface and experience design"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "SaaS Development",
          "description": "Software as a Service development"
        }
      }
    ]
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "40"
  }
};

export default function HomePage() {
  const navigate = useNavigate();
  const heroRef = useRef<HTMLElement>(null);

  const calendlyLink = "https://calendly.com/marc-friedman-web-design--meeting-link/30min";

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <>
      <SEO
        title="Web Designer Tel Aviv | Award-Winning Websites That Convert"
        description="Professional web designer in Tel Aviv specializing in high-performance websites for agencies, ecommerce, and B2B. Expert in React development and conversion optimization."
        canonicalUrl="https://www.marcfriedmanportfolio.com/"
        keywords={[
          'Web Designer Tel Aviv',
          'Tel Aviv web design',
          'website designer Tel Aviv',
          'web development Tel Aviv',
          'Tel Aviv developer',
          'Israel web designer',
          'B2B web design',
          'lead generation websites',
          'React development'
        ]}
        structuredData={homeSchema}
      />

      <AccessibilityPanel />

      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden">
        <motion.div
          className="absolute inset-0 w-full h-full z-0"
          style={{ scale }}
        >
          <img
            src="https://ik.imagekit.io/qcvroy8xpd/Frame%201%20(1).png"
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
                  <SplitTextReveal
                    text="A Premium Website"
                    delay={0.2}
                    staggerDelay={0.04}
                  />
                  <span className="block">
                    <SplitTextReveal
                      text="for Your Clinic."
                      delay={0.5}
                      staggerDelay={0.04}
                    />
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
                      <Star key={i} className="w-3.5 h-3.5 fill-[#FFD700] text-[#FFD700]" />
                    ))}
                    <span className="text-gray-400 text-xs ml-1.5">5.0</span>
                  </div>
                  <p className="text-gray-400 text-xs">Trusted by 20+ clinic owners across the U.S.</p>
                </div>
              </motion.div>

              <motion.div
                className="hidden lg:flex items-center gap-3 pt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.2 }}
              >
                <motion.svg
                  width="120"
                  height="60"
                  viewBox="0 0 120 60"
                  fill="none"
                  className="text-[#A3D1FF] -mt-1"
                  animate={{ x: [0, 6, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <path
                    d="M8 45 C20 48, 30 30, 45 25 C60 20, 55 42, 70 35 C85 28, 80 15, 95 18 C102 19, 108 22, 112 28"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    fill="none"
                    strokeDasharray="4 4"
                  />
                  <path
                    d="M105 22 L112 28 L104 32"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  />
                </motion.svg>
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

      {/* Social Proof Bar */}
      <section className="bg-black border-y border-white/5 py-6 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-[#FFD700] text-[#FFD700]" />
              ))}
            </div>
            <p className="text-gray-300 text-sm sm:text-base text-center italic">
              "Showing up in the Google map pack within 3 weeks changed everything for our clinic."
            </p>
            <p className="text-gray-500 text-xs whitespace-nowrap">-- IV Therapy Clinic Owner, Austin TX</p>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <TrustedBy />

      {/* Featured Work */}
      <section className="py-32 px-6 sm:px-8 lg:px-12 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="w-20 h-20 rounded-full overflow-hidden mx-auto mb-6 border-4 border-[#A3D1FF] shadow-lg">
              <img
                src="https://ik.imagekit.io/qcvroy8xpd/PW8VUKH.png?updatedAt=1759693058055&tr=f-webp"
                alt="Marc Friedman"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer-when-downgrade"
                crossOrigin="anonymous"
                loading="eager"
              />
            </div>
            <h2 className="text-[clamp(2.5rem,6vw,5rem)] font-black mb-6 leading-tight text-white">
              Featured <span className="text-[#A3D1FF]">Work</span>
            </h2>
            <p className="text-2xl text-gray-300 max-w-3xl mx-auto">
              Explore my portfolio of results-driven digital solutions that combine thoughtful design with robust development.
            </p>
          </motion.div>

          {/* Featured Project - Untapped Africa */}
          <motion.div
            className="bg-[#1b1b1b] rounded-xl overflow-hidden border border-white/10 hover:border-[#A3D1FF] transition-all group col-span-full mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="grid md:grid-cols-2 gap-8">
              <div className="aspect-[16/10] overflow-hidden relative">
                <img
                  src="https://ik.imagekit.io/qcvroy8xpd/New%20Folder/Mockup%201%20-%201x1(1).png?updatedAt=1767539579782"
                  alt="Untapped Africa"
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1b1b1b] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="p-6 md:p-8">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[#A3D1FF] text-sm bg-[#A3D1FF]/10 px-4 py-2 rounded-full">Featured Project</span>
                </div>
                <h3 className="text-xl md:text-3xl font-bold text-white mb-3 md:mb-4">Untapped Africa</h3>
                <p className="text-sm md:text-base text-gray-400 mb-4 md:mb-6">Revolutionizing water infrastructure solutions across Africa with innovative technology and sustainable practices. A comprehensive platform for project management, data visualization, and community engagement.</p>
                <div className="space-y-3 md:space-y-4 mb-4 md:mb-6">
                  <div className="flex items-center text-xs md:text-sm">
                    <CheckCircle className="w-4 h-4 text-[#A3D1FF] mr-2 flex-shrink-0" />
                    <span className="text-gray-300">250% increase in engagement</span>
                  </div>
                  <div className="flex items-center text-xs md:text-sm">
                    <CheckCircle className="w-4 h-4 text-[#A3D1FF] mr-2 flex-shrink-0" />
                    <span className="text-gray-300">8 countries impacted</span>
                  </div>
                  <div className="flex items-center text-xs md:text-sm">
                    <CheckCircle className="w-4 h-4 text-[#A3D1FF] mr-2 flex-shrink-0" />
                    <span className="text-gray-300">500,000+ people served</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mb-4 md:mb-6">
                  {["Next.js", "TypeScript", "Supabase", "Mapbox GL"].map((tech, index) => (
                    <span
                      key={index}
                      className="px-2 md:px-3 py-1 bg-white/5 text-[#A3D1FF] rounded-full text-xs md:text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex flex-wrap gap-3">
                  <a href="https://untappedafrica.co.za" target="_blank" rel="noopener noreferrer" className="mr_btn mr_btn_outline">
                    <span>View Live Website</span>
                  </a>
                  <Link to="/work/case-studies/untapped-africa" className="mr_btn mr_btn_primary">
                    <span>Read Case Study</span>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Portfolio Carousel */}
          <Reveal direction="up" delay={0.2}>
            <FeaturedWorkCarousel
              projects={[
                {
                  title: "Binns Media Group Platform",
                  image: "https://ik.imagekit.io/qcvroy8xpd/New%20Folder/Mockup%204%20-%2016x9.png?updatedAt=1767539579710",
                  description: "A cutting-edge digital media platform transforming the way content creators connect with audiences",
                  tech: ["React 18", "TypeScript", "Supabase", "Framer Motion"],
                  liveUrl: "https://www.binnsmediagroup.com",
                  caseStudy: "/work/case-studies/binns-media"
                },
                {
                  title: "Paving Leads",
                  image: "https://ik.imagekit.io/qcvroy8xpd/New%20Folder/Mockup%204%20-%2016_9.png?updatedAt=1767539579010",
                  description: "High-velocity SEO engine ranked #1 on Google, generating qualified leads for paving contractors",
                  tech: ["React", "Node.js", "SEO Optimization", "Lead Generation"],
                  liveUrl: "https://pavinglead.com/",
                  caseStudy: "/work/case-studies/paving-leads"
                },
                {
                  title: "A Secure Annapolis Locksmith",
                  image: "https://ik.imagekit.io/qcvroy8xpd/New%20Folder/Mockup%201%20-%201x1(2).png?updatedAt=1767539579194",
                  description: "Professional locksmith website with emergency service booking and local SEO dominance",
                  tech: ["React", "Node.js", "Tailwind CSS", "Local SEO"],
                  liveUrl: "https://www.asecureannapolislocksmith.com",
                  caseStudy: "/work/case-studies/secure-annapolis"
                },
                {
                  title: "Friedman & Cohen",
                  image: "https://ik.imagekit.io/qcvroy8xpd/New%20Folder/Mockup%201%20-%201x1(3).png?updatedAt=1767539579776",
                  description: "B2B procurement platform streamlining wholesale operations for retail businesses",
                  tech: ["React", "Node.js", "PostgreSQL", "Real-time Data"],
                  liveUrl: "https://b2b.fandc.co.za",
                  caseStudy: "/work/case-studies/friedman-cohen"
                },
                {
                  title: "iLight Care",
                  image: "https://ik.imagekit.io/qcvroy8xpd/New%20Folder/Mockup%201%20-%201x1(5).png?updatedAt=1767539579818",
                  description: "AI-powered healthcare platform revolutionizing patient care and medical diagnostics",
                  tech: ["React", "Node.js", "AI/ML", "Healthcare Tech"],
                  liveUrl: "https://www.ilight.care",
                  caseStudy: "/work/case-studies/ilight"
                },
                {
                  title: "Chad Le Clos Swimming",
                  image: "https://i.imgur.com/ApfYPlH.jpg",
                  description: "Olympic champion's swimming clinics platform with booking and athlete management",
                  tech: ["Next.js", "Tailwind CSS", "Framer Motion", "Booking System"],
                  liveUrl: "https://chadleclosswimming.com",
                  caseStudy: "/work/case-studies/chad-le-clos"
                },
                {
                  title: "Tar & Chip Paving",
                  image: "https://ik.imagekit.io/qcvroy8xpd/New%20Folder/Mockup%201%20-%201x1(6).png?updatedAt=1767539579420",
                  description: "Specialized surface solutions showcase with project portfolio and instant quote generation",
                  tech: ["React", "Tailwind CSS", "Responsive Design", "Quote System"],
                  liveUrl: "https://cumberlandtarchip.org/",
                  caseStudy: "/work/case-studies/tar-chip-paving"
                }
              ]}
              autoplayInterval={6000}
            />
          </Reveal>

          <Reveal direction="up" delay={0.3}>
            <div className="text-center">
              <MagneticButton>
                <Link
                  to="/work"
                  className="mr_btn mr_btn_primary inline-flex items-center gap-2 text-xl"
                >
                  <span>View All Projects</span>
                  <ArrowRight className="w-6 h-6" />
                </Link>
              </MagneticButton>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Press & Media Section */}
      <section className="py-32 px-6 sm:px-8 lg:px-12 bg-black border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="w-20 h-20 rounded-full overflow-hidden mx-auto mb-6 border-4 border-[#A3D1FF] shadow-lg">
              <img
                src="https://ik.imagekit.io/qcvroy8xpd/PW8VUKH.png?updatedAt=1759693058055&tr=f-webp"
                alt="Marc Friedman"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer-when-downgrade"
                crossOrigin="anonymous"
                loading="eager"
              />
            </div>
            <h2 className="text-[clamp(2.5rem,6vw,5rem)] font-black mb-6 leading-tight text-white">
              Press & <span className="text-[#A3D1FF]">Recognition</span>
            </h2>
            <p className="text-2xl text-gray-300 max-w-3xl mx-auto">
              Featured in leading design publications and recognized for excellence in web development.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-12" style={{ perspective: '1000px' }}>
            {/* DesignRush Feature */}
            <motion.a
              href="https://www.designrush.com/best-designs/websites/untapped-africa-website-design"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, rotateX: 15 }}
              whileInView={{ opacity: 1, rotateX: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.1,
                type: 'spring',
                stiffness: 400,
                damping: 30,
              }}
              whileHover={{
                y: -10,
                scale: 1.02,
                rotateX: -2,
                transition: {
                  type: 'spring',
                  stiffness: 400,
                  damping: 20,
                },
              }}
              viewport={{ once: true }}
              className="bg-[#1b1b1b] border border-white/10 rounded-2xl overflow-hidden hover:border-[#A3D1FF] transition-all group relative"
            >
              <div className="absolute top-4 right-4 bg-[#A3D1FF] text-black px-3 py-1 rounded-full text-xs font-bold z-10">
                Featured
              </div>
              <div className="aspect-[16/10] overflow-hidden bg-gradient-to-br from-[#A3D1FF]/10 to-transparent">
                <img
                  src="https://ik.imagekit.io/qcvroy8xpd/Screenshot.png?updatedAt=1754018965491"
                  alt="Untapped Africa Featured on DesignRush"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Star className="w-4 h-4 text-[#FFD700]" />
                  <span className="text-xs text-[#FFD700] font-semibold uppercase">Feature</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#A3D1FF] transition-colors">
                  Untapped Africa Website Design Featured
                </h3>
                <p className="text-gray-400 text-sm mb-4">
                  Featured by DesignRush for exceptional user experience and social impact focus.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-white font-semibold text-sm">DesignRush</span>
                  <ArrowRight className="w-5 h-5 text-[#A3D1FF] group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.a>

            {/* Agency Profile */}
            <motion.a
              href="https://www.designrush.com/agency/profile/marc-friedman-design-agency"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, rotateX: 15 }}
              whileInView={{ opacity: 1, rotateX: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.2,
                type: 'spring',
                stiffness: 400,
                damping: 30,
              }}
              whileHover={{
                y: -10,
                scale: 1.02,
                rotateX: -2,
                transition: {
                  type: 'spring',
                  stiffness: 400,
                  damping: 20,
                },
              }}
              viewport={{ once: true }}
              className="bg-[#1b1b1b] border border-white/10 rounded-2xl overflow-hidden hover:border-[#A3D1FF] transition-all group"
            >
              <div className="aspect-[16/10] bg-gradient-to-br from-[#A3D1FF]/5 to-transparent flex items-center justify-center">
                <div className="text-center p-8">
                  <Award className="w-16 h-16 text-[#A3D1FF] mx-auto mb-4" />
                  <h4 className="text-white font-bold text-lg">Agency Profile</h4>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Star className="w-4 h-4 text-[#FFD700]" />
                  <span className="text-xs text-[#FFD700] font-semibold uppercase">Profile</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#A3D1FF] transition-colors">
                  Marc Friedman Design Agency
                </h3>
                <p className="text-gray-400 text-sm mb-4">
                  Comprehensive profile showcasing design expertise and client success stories.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-white font-semibold text-sm">DesignRush</span>
                  <ArrowRight className="w-5 h-5 text-[#A3D1FF] group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.a>

            {/* Awwwards Recognition */}
            <motion.a
              href="https://www.awwwards.com/marc-friedman/"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, rotateX: 15 }}
              whileInView={{ opacity: 1, rotateX: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.3,
                type: 'spring',
                stiffness: 400,
                damping: 30,
              }}
              whileHover={{
                y: -10,
                scale: 1.02,
                rotateX: -2,
                transition: {
                  type: 'spring',
                  stiffness: 400,
                  damping: 20,
                },
              }}
              viewport={{ once: true }}
              className="bg-[#1b1b1b] border border-white/10 rounded-2xl overflow-hidden hover:border-[#A3D1FF] transition-all group"
            >
              <div className="aspect-[16/10] bg-gradient-to-br from-[#FFB800]/5 to-transparent flex items-center justify-center">
                <div className="text-center p-8">
                  <Award className="w-16 h-16 text-[#FFB800] mx-auto mb-4" />
                  <h4 className="text-white font-bold text-lg">Recognition</h4>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Award className="w-4 h-4 text-[#FFB800]" />
                  <span className="text-xs text-[#FFB800] font-semibold uppercase">Award</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#A3D1FF] transition-colors">
                  Award Recognition
                </h3>
                <p className="text-gray-400 text-sm mb-4">
                  Recognition for excellence in digital design and user experience.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-white font-semibold text-sm">Awwwards</span>
                  <ArrowRight className="w-5 h-5 text-[#A3D1FF] group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.a>
          </div>

          <div className="text-center">
            <Link
              to="/press"
              className="mr_btn mr_btn_outline inline-flex items-center gap-2 text-xl"
            >
              <span>View All Press Coverage</span>
              <ArrowRight className="w-6 h-6" />
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-32 px-6 sm:px-8 lg:px-12 bg-[#0a0a0a]">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="w-20 h-20 rounded-full overflow-hidden mx-auto mb-6 border-4 border-[#A3D1FF] shadow-lg">
              <img
                src="https://ik.imagekit.io/qcvroy8xpd/PW8VUKH.png?updatedAt=1759693058055&tr=f-webp"
                alt="Marc Friedman"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer-when-downgrade"
                crossOrigin="anonymous"
                loading="eager"
              />
            </div>
            <h2 className="text-[clamp(2.5rem,6vw,5rem)] font-black mb-6 leading-tight text-white">
              How It <span className="text-[#A3D1FF]">Works</span>
            </h2>
            <p className="text-2xl text-gray-300 max-w-3xl mx-auto">
              Simple. No surprises. Just results.
            </p>
          </motion.div>

          <ConnectedSteps
            steps={[
              {
                number: "01",
                title: "Book a Call",
                description: "We'll chat about your business, goals, and what's not working with your current site. No pressure, no sales pitch."
              },
              {
                number: "02",
                title: "I Build It",
                description: "Custom design and development. Modern tech stack (React/Node). Weekly updates so you're never in the dark."
              },
              {
                number: "03",
                title: "You Launch & Grow",
                description: "I deploy, test, and hand over a website that actually brings you customers. Plus 30 days of support to make sure everything runs smooth."
              }
            ]}
          />

        </div>
      </section>

      {/* About */}
      <section className="py-32 px-6 sm:px-8 lg:px-12 bg-[#0a0a0a]">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="overflow-hidden rounded-3xl">
              <motion.div
                initial={{ opacity: 0, scale: 1.4 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 1.2,
                  type: 'spring',
                  stiffness: 400,
                  damping: 30,
                }}
                viewport={{ once: true }}
              >
                <img
                  src="https://ik.imagekit.io/qcvroy8xpd/PW8VUKH.png?updatedAt=1759693058055&tr=f-webp"
                  alt="Marc Friedman"
                  className="w-full h-auto shadow-2xl"
                />
              </motion.div>
            </div>

            <div>
              <Reveal direction="right" delay={0.2}>
                <h2 className="text-5xl font-black mb-6 text-white">
                  Work With Me,<br />Not a <span className="text-[#A3D1FF]">Team of Interns</span>
                </h2>
              </Reveal>

              <Reveal direction="right" delay={0.3}>
                <div className="space-y-6 text-xl text-gray-300 mb-8">
                  <p>
                    Hey, I'm Marc. I've been building websites for agencies, local businesses, and jewellery brands across three continents.
                  </p>
                  <p>
                    Unlike big agencies that hand your project off to junior devs, you work directly with me from start to finish. That means faster turnaround, better communication, and no surprises.
                  </p>
                  <p>
                    I care about your success because your results are my reputation. When your website brings in leads and grows your business, we both win.
                  </p>
                </div>
              </Reveal>

              <Reveal direction="right" delay={0.4}>
                <MagneticButton>
                  <a
                    href={calendlyLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mr_btn mr_btn_primary inline-flex items-center gap-2 text-xl"
                  >
                    <span>Let's Talk</span>
                    <MessageSquare className="w-6 h-6" />
                  </a>
                </MagneticButton>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-32 px-6 sm:px-8 lg:px-12 bg-black">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-[clamp(2.5rem,6vw,5rem)] font-black mb-6 leading-tight text-white">
              Got <span className="text-[#A3D1FF]">Questions?</span>
            </h2>
          </motion.div>

          <AnimatedFAQ
            items={[
              {
                q: "How long does it take?",
                a: "Most projects: 4-8 weeks. Complex apps: 12-16 weeks. I'll give you a clear timeline on our first call."
              },
              {
                q: "What's included?",
                a: "Everything. Custom design, React/Node dev, mobile responsive, SEO, analytics, CRM integration, hosting setup, and 30 days of post-launch support."
              },
              {
                q: "Do you work internationally?",
                a: "Yes! I work with clients across three continents. Time zones are never an issue."
              },
              {
                q: "What if I already have a website?",
                a: "Perfect. I can redesign and rebuild it to be faster, better-looking, and higher-converting."
              },
              {
                q: "How do I pay?",
                a: "50% to start, 25% at design approval, 25% at launch. Payment plans available—just ask."
              }
            ]}
          />

        </div>
      </section>

      {/* Final CTA */}
      <Spotlight className="py-32 px-6 sm:px-8 lg:px-12 bg-[#0a0a0a]" spotlightColor="rgba(163, 209, 255, 0.2)">
        <div className="max-w-4xl mx-auto text-center">
          <Reveal direction="up" delay={0.1}>
            <h2 className="text-[clamp(2.5rem,6vw,5rem)] font-black mb-8 leading-tight text-white">
              Ready to Stop<br />Losing Customers?
            </h2>
          </Reveal>

          <Reveal direction="up" delay={0.2}>
            <p className="text-2xl mb-12 max-w-2xl mx-auto text-gray-300">
              Book a free strategy call. We'll talk about your goals, and I'll show you exactly how I can help you grow.
            </p>
          </Reveal>

          <Reveal direction="blur-in" delay={0.3}>
            <div className="bg-[#1b1b1b] border border-white/10 p-10 rounded-3xl text-left max-w-2xl mx-auto">
              <ContactForm />

              <p className="text-center text-sm text-gray-400 mt-6">
                Or{' '}
                <a
                  href={calendlyLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#A3D1FF] font-bold hover:underline"
                >
                  book directly on my calendar
                </a>
              </p>
            </div>
          </Reveal>
        </div>
      </Spotlight>
    </>
  );
}
