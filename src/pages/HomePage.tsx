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
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32 pb-20" style={{ backgroundColor: '#1a2332' }}>
        {/* Animated Background Layers */}
        <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
          {/* Video Background with parallax and scale */}
          <motion.div
            className="absolute inset-0 w-full h-full"
            style={{ y, scale }}
            animate={{
              x: [0, -15, 0, 15, 0],
              y: [0, -10, 0, 10, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <video
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-[-20px] w-[calc(100%+40px)] h-[calc(100%+40px)] object-cover opacity-40"
              poster="https://ik.imagekit.io/qcvroy8xpd/Container.png"
            >
              <source
                src="https://cdn.pixabay.com/video/2023/12/15/192827-895963123_large.mp4"
                type="video/mp4"
              />
              <img
                src="https://ik.imagekit.io/qcvroy8xpd/Container.png"
                alt="Marc Friedman Portfolio Websites"
                className="w-full h-full object-cover"
              />
            </video>
          </motion.div>

          {/* Animated Gradient Layer 1 */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-[#A3D1FF]/20 via-transparent to-transparent"
            style={{ y: y2 }}
            animate={{
              opacity: [0.3, 0.5, 0.3],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Animated Gradient Layer 2 */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-tl from-[#1a2332]/60 via-transparent to-[#A3D1FF]/10"
            style={{ y: y3 }}
            animate={{
              opacity: [0.4, 0.6, 0.4],
              scale: [1.1, 1, 1.1],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
          />

          {/* Floating Orbs */}
          <motion.div
            className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#A3D1FF]/10 rounded-full blur-3xl"
            animate={{
              x: [0, 100, 0],
              y: [0, -50, 0],
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          <motion.div
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#A3D1FF]/10 rounded-full blur-3xl"
            animate={{
              x: [0, -80, 0],
              y: [0, 60, 0],
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
          />

          <motion.div
            className="absolute top-1/2 right-1/3 w-48 h-48 bg-blue-400/10 rounded-full blur-3xl"
            animate={{
              x: [0, -60, 0],
              y: [0, -80, 0],
              scale: [1.2, 1, 1.2],
              opacity: [0.25, 0.45, 0.25],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 3,
            }}
          />

          {/* Static Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#1a2332]/60 via-transparent to-[#1a2332]/80" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1a2332]/80 via-transparent to-[#1a2332]/40" />
        </div>

        <div className="container mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-start">

            {/* Left Side - Content + Reviews */}
            <motion.div
              className="text-left space-y-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Main Headline */}
              <div className="overflow-hidden mb-6">
                <h1 className="font-heading text-[clamp(3rem,6vw,4.5rem)] font-semibold tracking-[-0.01em] text-white leading-[1.15]">
                  <SplitTextReveal
                    text="Award Winning Websites That Turn Attention Into Revenue"
                    delay={0.2}
                    staggerDelay={0.05}
                  />
                </h1>
              </div>

              {/* CTA Buttons */}
              <motion.div
                className="flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <MagneticButton strength={20}>
                  <Link
                    to="/contact"
                    className="mr_btn mr_btn_primary inline-flex items-center gap-2"
                  >
                    <span>Contact Me</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </MagneticButton>

                <MagneticButton strength={20}>
                  <Link
                    to="/tools/website-analyzer"
                    className="mr_btn mr_btn_outline inline-flex items-center gap-2"
                  >
                    <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                    <span>Free Website Analysis</span>
                  </Link>
                </MagneticButton>
              </motion.div>

              {/* Verified Reviews Badge */}
              <motion.div
                className="max-w-md bg-black/60 backdrop-blur-sm px-6 py-5 rounded-lg border border-white/10 shadow-2xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="w-5 h-5 text-[#A3D1FF]" />
                  <span className="text-white font-bold text-sm uppercase tracking-wider">25 Total Verified Reviews</span>
                </div>

                {/* Review Platforms */}
                <div className="space-y-3">
                  {/* Google Business */}
                  <a
                    href="https://share.google/eF48yRJKqiZppBvfN"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between hover:bg-white/5 p-2 -m-2 rounded-lg transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-white rounded flex items-center justify-center p-1">
                        <svg viewBox="0 0 24 24" className="w-full h-full">
                          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                        </svg>
                      </div>
                      <div>
                        <div className="text-white font-semibold text-sm">Google Business</div>
                        <div className="text-gray-400 text-xs">10 reviews</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-[#FFD700] text-[#FFD700]" />
                      ))}
                      <span className="text-white font-bold text-sm ml-2">5.0</span>
                    </div>
                  </a>

                  {/* Clutch */}
                  <a
                    href="https://clutch.co/profile/marc-friedman-design-agency"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between hover:bg-white/5 p-2 -m-2 rounded-lg transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-white rounded flex items-center justify-center overflow-hidden p-1">
                        <svg viewBox="0 0 200 200" className="w-full h-full">
                          <circle cx="100" cy="100" r="90" fill="#FF3D2E"/>
                          <circle cx="100" cy="100" r="60" fill="white"/>
                          <circle cx="100" cy="100" r="35" fill="#FF3D2E"/>
                        </svg>
                      </div>
                      <div>
                        <div className="text-white font-semibold text-sm">Clutch</div>
                        <div className="text-gray-400 text-xs">5 reviews</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-4 h-4 ${i < 4 || (i === 4) ? 'fill-[#FFD700] text-[#FFD700]' : 'fill-[#FFD700]/50 text-[#FFD700]/50'}`} />
                      ))}
                      <span className="text-white font-bold text-sm ml-2">4.8</span>
                    </div>
                  </a>

                  {/* DesignRush */}
                  <a
                    href="https://www.designrush.com/agency/profile/marc-friedman"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between hover:bg-white/5 p-2 -m-2 rounded-lg transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-white rounded flex items-center justify-center overflow-hidden">
                        <img src="https://ik.imagekit.io/qcvroy8xpd/download%20(4).jpeg" alt="DesignRush" className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <div className="text-white font-semibold text-sm">DesignRush</div>
                        <div className="text-gray-400 text-xs">3 reviews</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-4 h-4 ${i < 4 || (i === 4) ? 'fill-[#FFD700] text-[#FFD700]' : 'fill-[#FFD700]/50 text-[#FFD700]/50'}`} />
                      ))}
                      <span className="text-white font-bold text-sm ml-2">4.5</span>
                    </div>
                  </a>

                  {/* LinkedIn */}
                  <a
                    href="https://www.linkedin.com/in/portfolio2/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between hover:bg-white/5 p-2 -m-2 rounded-lg transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-[#0A66C2] rounded flex items-center justify-center">
                        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                      </div>
                      <div>
                        <div className="text-white font-semibold text-sm">LinkedIn</div>
                        <div className="text-gray-400 text-xs">8 reviews</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-4 h-4 ${i < 4 ? 'fill-[#FFD700] text-[#FFD700]' : 'fill-[#FFD700]/50 text-[#FFD700]/50'}`} />
                      ))}
                      <span className="text-white font-bold text-sm ml-2">4.9</span>
                    </div>
                  </a>
                </div>

                {/* Client photos */}
                <div className="flex items-center gap-2 mt-4 pt-4 border-t border-white/10">
                  <span className="text-gray-400 text-xs">Trusted by:</span>
                  <div className="flex items-center -space-x-2">
                    <div className="w-7 h-7 rounded-full border-2 border-[#1a2332] overflow-hidden">
                      <img src="https://ik.imagekit.io/qcvroy8xpd/1682479506906.jpeg?updatedAt=1754019693073" alt="Client" className="w-full h-full object-cover" />
                    </div>
                    <div className="w-7 h-7 rounded-full border-2 border-[#1a2332] overflow-hidden">
                      <img src="https://ik.imagekit.io/qcvroy8xpd/4c91361b-27ee-453b-88e0-af3026cac747_1_ro3hez_e_background_removal_f_png_vkfbub.png?updatedAt=1754023286922" alt="Client" className="w-full h-full object-cover" />
                    </div>
                    <div className="w-7 h-7 rounded-full border-2 border-[#1a2332] overflow-hidden">
                      <img src="https://ik.imagekit.io/qcvroy8xpd/1732338426448%20(1).jpeg?updatedAt=1749337717019" alt="Client" className="w-full h-full object-cover" />
                    </div>
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#A3D1FF] to-blue-500 border-2 border-[#1a2332] flex items-center justify-center">
                      <span className="text-[9px] font-bold text-white">20+</span>
                    </div>
                  </div>
                </div>
              </motion.div>

            </motion.div>

            {/* Right Side - Empty Space */}
            <div className="hidden lg:block"></div>
          </div>
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
