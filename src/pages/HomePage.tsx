import { useNavigate, Link } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { ArrowRight, CircleCheck as CheckCircle, Target, TrendingUp, Zap, Shield, Users, Award, Clock, Star, Sparkles, Send, MessageSquare, Rocket, ChartBar as BarChart3, Code as Code2 } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import TrustedBy from '@/components/TrustedBy';
import SEO from '@/components/SEO';
import MagneticButton from '@/components/MagneticButton';
import AccessibilityPanel from '@/components/AccessibilityPanel';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

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
  "sameAs": [
    "https://www.linkedin.com/in/portfolio2/",
    "https://g.co/kgs/78fRZ6r"
  ],
  "founder": {
    "@type": "Person",
    "name": "Marc Friedman",
    "jobTitle": "Full Stack Designer & Developer"
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
    "ratingValue": "4.9",
    "reviewCount": "40"
  }
};

export default function HomePage() {
  const navigate = useNavigate();
  const heroRef = useRef<HTMLElement>(null);

  const calendlyLink = "https://calendly.com/marc-friedman-web-design--meeting-link/30min";

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      const { error } = await supabase
        .from('contact_submissions')
        .insert([{
          name: formData.name,
          email: formData.email,
          phone: formData.phone || null,
          company: formData.company || null,
          service: formData.service || null,
          message: formData.message,
          status: 'new'
        }]);

      if (error) throw error;

      toast.success('Message sent successfully! We\'ll get back to you within 24 hours.');
      setFormData({ name: '', email: '', phone: '', company: '', service: '', message: '' });
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <>
      <SEO
        title="Websites That Convert for Agencies, Ecommerce, B2B"
        description="High-performance React/Node websites built to attract, convert, and close clients. Increase leads by 40% with websites that load in under 2 seconds."
        canonicalUrl="https://www.marcfriedmanportfolio.com/"
        keywords={[
          'B2B web design',
          'lead generation websites',
          'agency websites',
          'ecommerce website design',
          'high-performance websites',
          'React development',
          'conversion optimization'
        ]}
        structuredData={homeSchema}
      />

      <AccessibilityPanel />

      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32 pb-20" style={{ backgroundColor: '#1a2332' }}>
        {/* Background with subtle overlay */}
        <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
          {/* 3D Laptop Image with Marc popping out */}
          <motion.div
            className="absolute inset-0 w-full h-full flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.2, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            style={{ perspective: '2000px' }}
          >
            <img
              src="https://images.unsplash.com/photo-1607799279861-4dd421887fb3?w=1200&q=80"
              alt="Marc Friedman emerging from laptop"
              className="w-full h-full object-cover mix-blend-overlay"
              style={{
                transform: 'translateZ(50px) scale(1.1)',
                transformStyle: 'preserve-3d'
              }}
            />
          </motion.div>

          {/* Glowing orbs */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#A3D1FF]/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Side - Content */}
            <motion.div
              className="text-left"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.h1
                className="text-[clamp(2.5rem,6vw,5.5rem)] font-roboto font-black tracking-tight text-white leading-[1.1] mb-8"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Websites that Convert for <span className="text-[#A3D1FF]">Agencies, Ecommerce, and B2B</span>
              </motion.h1>

              <motion.p
                className="text-xl sm:text-2xl text-gray-300 mb-12 font-roboto font-medium"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                High-performance React/Node sites built to attract more visitors, convert more leads, and close more clients.
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row gap-4 mb-12"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <Link
                  to="/contact"
                  className="mr_btn mr_btn_outline inline-block"
                >
                  <span>Get Free Quote</span>
                </Link>

                <a
                  href={calendlyLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mr_btn mr_btn_outline inline-block"
                >
                  <span>Book Strategy Call</span>
                </a>
              </motion.div>

              <motion.div
                className="flex flex-wrap gap-4 justify-start"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <iframe
                  width="360"
                  height="360"
                  src="https://clutch.co/share/badges/2527093/99988?utm_source=clutch_top_company_badge&utm_medium=image_embed"
                  title="Top Clutch Web Design Company Freelance Israel"
                  className="border-0"
                ></iframe>
                <iframe
                  width="360"
                  height="360"
                  src="https://clutch.co/share/badges/2527093/84372?utm_source=clutch_top_company_badge&utm_medium=image_embed"
                  title="Top Clutch Web Developers Freelance Israel"
                  className="border-0"
                ></iframe>
              </motion.div>

            </motion.div>

            {/* Right Side - Website Showcase */}
            <motion.div
              className="relative hidden lg:flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              style={{ perspective: '1500px' }}
            >
              <div className="relative w-full">
                {/* Background glow effects */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#A3D1FF]/10 to-blue-500/10 blur-3xl"></div>

                {/* Structured Grid Layout */}
                <div className="grid grid-cols-2 gap-4 relative" style={{ transformStyle: 'preserve-3d' }}>
                  {/* Featured Large Card - Top Left */}
                  <motion.div
                    className="col-span-2 row-span-2 overflow-hidden shadow-2xl border border-white/10 bg-black/20 backdrop-blur-sm group relative rounded-lg"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0, rotateY: -5, rotateX: 2 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    whileHover={{
                      scale: 1.02,
                      rotateY: 0,
                      rotateX: 0,
                      transition: { duration: 0.3 }
                    }}
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    <div className="aspect-[16/10] overflow-hidden">
                      <img
                        src="https://ik.imagekit.io/qcvroy8xpd/Screenshot.png?updatedAt=1754018965491"
                        alt="Featured Website Design"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none"></div>
                    <div className="absolute inset-0 bg-gradient-to-br from-[#A3D1FF]/10 via-transparent to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                  </motion.div>

                  {/* Grid of Smaller Cards */}
                  <motion.div
                    className="overflow-hidden shadow-2xl border border-white/10 bg-black/20 backdrop-blur-sm group relative rounded-lg"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0, rotateY: 8, rotateX: -3 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    whileHover={{
                      scale: 1.05,
                      rotateY: 0,
                      rotateX: 0,
                      zIndex: 10,
                      transition: { duration: 0.3 }
                    }}
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    <div className="aspect-[4/3] overflow-hidden">
                      <img
                        src="https://ik.imagekit.io/qcvroy8xpd/mockuuups-kzccsqfybhcjamey4qqdwh.jpeg?updatedAt=1754029601130"
                        alt="Client Website Design"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none"></div>
                    <div className="absolute inset-0 bg-gradient-to-br from-[#A3D1FF]/10 via-transparent to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                  </motion.div>

                  <motion.div
                    className="overflow-hidden shadow-2xl border border-white/10 bg-black/20 backdrop-blur-sm group relative rounded-lg"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0, rotateY: -8, rotateX: 3 }}
                    transition={{ duration: 0.8, delay: 0.7 }}
                    whileHover={{
                      scale: 1.05,
                      rotateY: 0,
                      rotateX: 0,
                      zIndex: 10,
                      transition: { duration: 0.3 }
                    }}
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    <div className="aspect-[4/3] overflow-hidden">
                      <img
                        src="https://ik.imagekit.io/qcvroy8xpd/IU0mmH7.jpeg"
                        alt="Portfolio Website Design"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none"></div>
                    <div className="absolute inset-0 bg-gradient-to-br from-[#A3D1FF]/10 via-transparent to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                  </motion.div>

                  <motion.div
                    className="overflow-hidden shadow-2xl border border-white/10 bg-black/20 backdrop-blur-sm group relative rounded-lg"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0, rotateY: 6, rotateX: -2 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    whileHover={{
                      scale: 1.05,
                      rotateY: 0,
                      rotateX: 0,
                      zIndex: 10,
                      transition: { duration: 0.3 }
                    }}
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    <div className="aspect-[4/3] overflow-hidden">
                      <img
                        src="https://ik.imagekit.io/qcvroy8xpd/mockuuups-nrj4c3wejgjaheqlyj4zax%20(2).jpeg?updatedAt=1763459817705"
                        alt="Business Website Design"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none"></div>
                    <div className="absolute inset-0 bg-gradient-to-br from-[#A3D1FF]/10 via-transparent to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                  </motion.div>

                  <motion.div
                    className="overflow-hidden shadow-2xl border border-white/10 bg-black/20 backdrop-blur-sm group relative rounded-lg"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0, rotateY: -6, rotateX: 2 }}
                    transition={{ duration: 0.8, delay: 0.9 }}
                    whileHover={{
                      scale: 1.05,
                      rotateY: 0,
                      rotateX: 0,
                      zIndex: 10,
                      transition: { duration: 0.3 }
                    }}
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    <div className="aspect-[4/3] overflow-hidden">
                      <img
                        src="https://ik.imagekit.io/qcvroy8xpd/1761600224232.jpeg?updatedAt=1763459215073"
                        alt="Ecommerce Website Design"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none"></div>
                    <div className="absolute inset-0 bg-gradient-to-br from-[#A3D1FF]/10 via-transparent to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                  </motion.div>
                </div>

                {/* Verified Reviews Badge */}
                <motion.div
                  className="mt-8 bg-black/80 backdrop-blur-sm px-6 py-5 border border-white/10"
                  style={{ clipPath: 'polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 0 100%)' }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1.0 }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <Shield className="w-5 h-5 text-[#A3D1FF]" />
                    <span className="text-white font-bold text-sm uppercase tracking-wider">20+ Verified 5 Star Reviews</span>
                  </div>

                  {/* Review Platforms */}
                  <div className="space-y-3">
                    {/* Google Business */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-white rounded flex items-center justify-center p-1">
                          <svg viewBox="0 0 24 24" className="w-full h-full">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                          </svg>
                        </div>
                        <span className="text-white font-semibold text-sm">Google Business</span>
                      </div>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-[#FFD700] text-[#FFD700]" />
                        ))}
                        <span className="text-white font-bold text-sm ml-2">5.0</span>
                      </div>
                    </div>

                    {/* DesignRush */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-white rounded flex items-center justify-center overflow-hidden">
                          <img src="https://ik.imagekit.io/qcvroy8xpd/download%20(4).jpeg" alt="DesignRush" className="w-full h-full object-cover" />
                        </div>
                        <span className="text-white font-semibold text-sm">DesignRush</span>
                      </div>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-4 h-4 ${i < 4 ? 'fill-[#FFD700] text-[#FFD700]' : 'fill-[#FFD700]/50 text-[#FFD700]/50'}`} />
                        ))}
                        <span className="text-white font-bold text-sm ml-2">4.9</span>
                      </div>
                    </div>

                    {/* LinkedIn */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-[#0A66C2] rounded flex items-center justify-center">
                          <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                          </svg>
                        </div>
                        <span className="text-white font-semibold text-sm">LinkedIn</span>
                      </div>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-4 h-4 ${i < 4 ? 'fill-[#FFD700] text-[#FFD700]' : 'fill-[#FFD700]/50 text-[#FFD700]/50'}`} />
                        ))}
                        <span className="text-white font-bold text-sm ml-2">4.9</span>
                      </div>
                    </div>
                  </div>

                  {/* Client photos */}
                  <div className="flex items-center gap-2 mt-4 pt-4 border-t border-white/10">
                    <span className="text-gray-400 text-xs">Trusted by:</span>
                    <div className="flex items-center -space-x-2">
                      <div className="w-7 h-7 rounded-full border-2 border-black overflow-hidden">
                        <img src="https://ik.imagekit.io/qcvroy8xpd/1682479506906.jpeg?updatedAt=1754019693073" alt="Client" className="w-full h-full object-cover" />
                      </div>
                      <div className="w-7 h-7 rounded-full border-2 border-black overflow-hidden">
                        <img src="https://ik.imagekit.io/qcvroy8xpd/4c91361b-27ee-453b-88e0-af3026cac747_1_ro3hez_e_background_removal_f_png_vkfbub.png?updatedAt=1754023286922" alt="Client" className="w-full h-full object-cover" />
                      </div>
                      <div className="w-7 h-7 rounded-full border-2 border-black overflow-hidden">
                        <img src="https://ik.imagekit.io/qcvroy8xpd/1732338426448%20(1).jpeg?updatedAt=1749337717019" alt="Client" className="w-full h-full object-cover" />
                      </div>
                      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#A3D1FF] to-blue-500 border-2 border-black flex items-center justify-center">
                        <span className="text-[9px] font-bold text-white">20+</span>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Decorative blur orbs */}
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#A3D1FF]/10 rounded-full blur-3xl -z-10"></div>
                <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl -z-10"></div>
              </div>
            </motion.div>
          </div>

          {/* Trusted by Industry Leaders - Company Logos */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="mt-20 relative z-10"
          >
            <div className="text-center mb-12">
              <p className="text-white text-sm uppercase tracking-wider font-bold">Trusted by Industry Leaders</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 md:gap-12 items-center justify-items-center">
              {/* Binns Media Group */}
              <div className="transition-all duration-300 hover:scale-110">
                <img
                  src="https://i.imgur.com/uliFOja.png"
                  alt="Binns Media Group"
                  className="h-12 md:h-16 w-auto object-contain filter brightness-0 invert opacity-70 hover:opacity-100"
                />
              </div>

              {/* Untapped Africa */}
              <div className="transition-all duration-300 hover:scale-110">
                <img
                  src="https://ik.imagekit.io/qcvroy8xpd/GOLD%20TEXT%20LOGO%20NO%20GLOW%20EFFECT%20ADDED%201.png?updatedAt=1748753342858"
                  alt="Untapped Africa"
                  className="h-12 md:h-16 w-auto object-contain opacity-70 hover:opacity-100"
                />
              </div>

              {/* Diamonds by CS */}
              <div className="transition-all duration-300 hover:scale-110">
                <img
                  src="https://ik.imagekit.io/qcvroy8xpd/downloads/diqalz8giyxk0bjucqwv.png?updatedAt=1754396322363"
                  alt="Diamonds by CS"
                  className="h-12 md:h-16 w-auto object-contain filter brightness-0 invert opacity-70 hover:opacity-100"
                />
              </div>

              {/* Company Logo 1 */}
              <div className="transition-all duration-300 hover:scale-110">
                <img
                  src="https://ik.imagekit.io/qcvroy8xpd/image%201%20(5).png?updatedAt=1763319654171"
                  alt="Partner Company"
                  className="h-12 md:h-16 w-auto object-contain filter brightness-0 invert opacity-70 hover:opacity-100"
                />
              </div>

              {/* Company Logo 2 */}
              <div className="transition-all duration-300 hover:scale-110">
                <img
                  src="https://ik.imagekit.io/qcvroy8xpd/logo%20(1).svg?updatedAt=1763381682176"
                  alt="Partner Company"
                  className="h-12 md:h-16 w-auto object-contain filter brightness-0 invert opacity-70 hover:opacity-100"
                />
              </div>

              {/* Secure Annapolis */}
              <div className="transition-all duration-300 hover:scale-110">
                <img
                  src="https://ik.imagekit.io/qcvroy8xpd/image%201%20(7).png"
                  alt="Secure Annapolis"
                  className="h-12 md:h-16 w-auto object-contain filter brightness-0 invert opacity-70 hover:opacity-100"
                />
              </div>

              {/* Company Logo 4 */}
              <div className="transition-all duration-300 hover:scale-110">
                <img
                  src="https://ik.imagekit.io/qcvroy8xpd/9uafCUp%201%20(1).png?updatedAt=1755247790037"
                  alt="Partner Company"
                  className="h-12 md:h-16 w-auto object-contain filter brightness-0 invert opacity-70 hover:opacity-100"
                />
              </div>

              {/* Company Logo 5 */}
              <div className="transition-all duration-300 hover:scale-110">
                <img
                  src="https://ik.imagekit.io/qcvroy8xpd/f9f3cab4-1ac2-4216-9590-33ea4b61faea.jpeg?updatedAt=1751550631056"
                  alt="Partner Company"
                  className="h-12 md:h-16 w-auto object-contain filter brightness-0 invert opacity-70 hover:opacity-100"
                />
              </div>

              {/* iLight Logo */}
              <div className="transition-all duration-300 hover:scale-110">
                <img
                  src="https://ik.imagekit.io/qcvroy8xpd/White%20logo%20-%20no%20background.svg?updatedAt=1749030562412"
                  alt="iLight"
                  className="h-12 md:h-16 w-auto object-contain opacity-70 hover:opacity-100"
                />
              </div>

              {/* Uza Entertainment */}
              <div className="transition-all duration-300 hover:scale-110">
                <img
                  src="https://ik.imagekit.io/qcvroy8xpd/downloads/logo-uzan-1-mv02DeERKlcy9DzM%20(1).avif?updatedAt=1755253233172"
                  alt="Uza Entertainment"
                  className="h-12 md:h-16 w-auto object-contain filter brightness-0 invert opacity-70 hover:opacity-100"
                />
              </div>
            </div>
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
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-[#1b1b1b] rounded-3xl overflow-hidden border border-white/10 hover:border-[#A3D1FF] transition-all group mb-12"
          >
            <div className="grid md:grid-cols-2 gap-8">
              <div className="aspect-[16/10] overflow-hidden relative">
                <img
                  src="https://ik.imagekit.io/qcvroy8xpd/Screenshot.png?updatedAt=1754018965491"
                  alt="Untapped Africa"
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-8 flex flex-col justify-center">
                <span className="text-[#A3D1FF] text-sm bg-[#A3D1FF]/10 px-4 py-2 rounded-full inline-block w-fit mb-4">Featured Project</span>
                <h3 className="text-3xl font-bold text-white mb-4">Untapped Africa</h3>
                <p className="text-gray-400 mb-6">Revolutionizing water infrastructure solutions across Africa with innovative technology and sustainable practices. A comprehensive platform for project management, data visualization, and community engagement.</p>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-[#A3D1FF] mr-2" />
                    <span className="text-gray-300">250% increase in engagement</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-[#A3D1FF] mr-2" />
                    <span className="text-gray-300">8 countries impacted</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-[#A3D1FF] mr-2" />
                    <span className="text-gray-300">500,000+ people served</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mb-6">
                  {["Next.js", "TypeScript", "Supabase", "Mapbox GL"].map((tech, i) => (
                    <span key={i} className="px-3 py-1 bg-white/5 text-[#A3D1FF] rounded-full text-sm">{tech}</span>
                  ))}
                </div>
                <div className="flex gap-3">
                  <a href="https://untappedafrica.co.za" target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-6 py-3 bg-white/5 text-white rounded-full hover:bg-white/10 transition-all">
                    View Live Website
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </a>
                  <Link to="/work/case-studies/untapped-africa" className="inline-flex items-center px-6 py-3 bg-[#A3D1FF] text-black rounded-full hover:bg-[#92bce6] transition-all">
                    Read Case Study
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Portfolio Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {[
              {
                title: "Ask Africa",
                image: "https://ik.imagekit.io/qcvroy8xpd/mockuuups-kzccsqfybhcjamey4qqdwh.jpeg?updatedAt=1754029601130",
                description: "Corporate website rebrand",
                tech: ["React", "Tailwind CSS", "Local SEO"],
                liveUrl: "https://askafrika.co.za",
                caseStudy: "/work/case-studies/ask-africa"
              },
              {
                title: "Binns Media Group Platform",
                image: "https://i.imgur.com/IU0mmH7.jpeg",
                description: "A cutting-edge digital media platform",
                tech: ["React 18", "TypeScript", "Supabase"],
                liveUrl: "https://www.binnsmediagroup.com",
                caseStudy: "/work/case-studies/binns-media"
              },
              {
                title: "Chad Le Clos Swimming",
                image: "https://i.imgur.com/ApfYPlH.jpg",
                description: "Olympic champion's swimming clinics",
                tech: ["Next.js", "Tailwind CSS", "Framer Motion"],
                liveUrl: "https://chadleclosswimming.com",
                caseStudy: "/work/case-studies/chad-le-clos"
              }
            ].map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="bg-[#1b1b1b] border border-white/10 rounded-2xl overflow-hidden hover:border-[#A3D1FF] transition-all group"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                  <p className="text-gray-400 text-sm mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.slice(0, 3).map((tech, i) => (
                      <span key={i} className="px-2 py-1 bg-white/5 text-[#A3D1FF] rounded-full text-xs">{tech}</span>
                    ))}
                    {project.tech.length > 3 && (
                      <span className="px-2 py-1 bg-white/5 text-[#A3D1FF] rounded-full text-xs">+{project.tech.length - 3}</span>
                    )}
                  </div>
                  <div className="flex gap-2">
                    {project.liveUrl && (
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="flex-1 inline-flex items-center justify-center px-4 py-2 bg-white/5 text-white text-sm rounded-lg hover:bg-white/10 transition-all">
                        View Live
                      </a>
                    )}
                    <Link to={project.caseStudy} className="flex-1 inline-flex items-center justify-center px-4 py-2 bg-[#A3D1FF]/10 text-[#A3D1FF] text-sm rounded-lg hover:bg-[#A3D1FF]/20 transition-all">
                      Case Study
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <Link
              to="/work"
              className="inline-flex items-center px-10 py-5 bg-[#A3D1FF] text-black font-bold rounded-full hover:bg-[#92bce6] transition-all duration-300 text-xl"
            >
              View All Projects
              <ArrowRight className="ml-2 w-6 h-6" />
            </Link>
          </div>
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
              />
            </div>
            <h2 className="text-[clamp(2.5rem,6vw,5rem)] font-black mb-6 leading-tight text-white">
              Press & <span className="text-[#A3D1FF]">Recognition</span>
            </h2>
            <p className="text-2xl text-gray-300 max-w-3xl mx-auto">
              Featured in leading design publications and recognized for excellence in web development.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {/* DesignRush Feature */}
            <motion.a
              href="https://www.designrush.com/best-designs/websites/untapped-africa-website-design"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
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
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
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
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
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
              className="inline-flex items-center px-10 py-5 bg-white/5 text-white font-bold rounded-full hover:bg-white/10 transition-all duration-300 text-xl border border-white/10"
            >
              View All Press Coverage
              <ArrowRight className="ml-2 w-6 h-6" />
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
              />
            </div>
            <h2 className="text-[clamp(2.5rem,6vw,5rem)] font-black mb-6 leading-tight text-white">
              How It <span className="text-[#A3D1FF]">Works</span>
            </h2>
            <p className="text-2xl text-gray-300 max-w-3xl mx-auto">
              Simple. No surprises. Just results.
            </p>
          </motion.div>

          <div className="space-y-8">
            {[
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
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card flex items-start gap-8 bg-[#1b1b1b] border border-white/10 p-10 rounded-3xl hover:border-[#A3D1FF] transition-all duration-300"
              >
                <div className="text-6xl font-black text-[#A3D1FF] opacity-20">{step.number}</div>
                <div className="flex-1">
                  <h3 className="text-3xl font-bold mb-3 text-white">{step.title}</h3>
                  <p className="text-xl text-gray-400">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* About */}
      <section className="py-32 px-6 sm:px-8 lg:px-12 bg-[#0a0a0a]">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <img
                src="https://ik.imagekit.io/qcvroy8xpd/PW8VUKH.png?updatedAt=1759693058055&tr=f-webp"
                alt="Marc Friedman"
                className="w-full h-auto rounded-3xl shadow-2xl"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl font-black mb-6 text-white">
                Work With Me,<br />Not a <span className="text-[#A3D1FF]">Team of Interns</span>
              </h2>
              <div className="space-y-6 text-xl text-gray-300 mb-8">
                <p>
                  Hey, I'm Marc. I've spent 5+ years building websites for agencies, local businesses, and jewellery brands across three continents.
                </p>
                <p>
                  Unlike big agencies that hand your project off to junior devs, you work directly with me from start to finish. That means faster turnaround, better communication, and no surprises.
                </p>
                <p>
                  I care about your success because your results are my reputation. When your website brings in leads and grows your business, we both win.
                </p>
              </div>

              <a
                href={calendlyLink}
                target="_blank"
                rel="noopener noreferrer"
                className="mr_btn inline-flex items-center px-10 py-5 bg-[#A3D1FF] text-black font-bold rounded-full hover:bg-[#7FB3D5] transition-all duration-300 text-xl"
              >
                Let's Talk
                <MessageSquare className="ml-2 w-6 h-6" />
              </a>
            </motion.div>
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

          <div className="space-y-4">
            {[
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
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="bg-[#1b1b1b] border border-white/10 rounded-2xl overflow-hidden"
              >
                <details className="group">
                  <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-white/5 transition-colors">
                    <h3 className="text-xl font-bold pr-4 text-white">{item.q}</h3>
                    <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#A3D1FF]/30 flex-shrink-0">
                      <div className="w-4 h-0.5 bg-[#A3D1FF] group-open:rotate-90 transition-transform"></div>
                      <div className="w-0.5 h-4 bg-[#A3D1FF] absolute group-open:opacity-0 transition-opacity"></div>
                    </div>
                  </summary>
                  <div className="px-6 pb-6">
                    <p className="text-lg text-gray-300">{item.a}</p>
                  </div>
                </details>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 px-6 sm:px-8 lg:px-12 bg-[#0a0a0a]">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-[clamp(2.5rem,6vw,5rem)] font-black mb-8 leading-tight text-white">
              Ready to Stop<br />Losing Customers?
            </h2>
            <p className="text-2xl mb-12 max-w-2xl mx-auto text-gray-300">
              Book a free strategy call. We'll talk about your goals, and I'll show you exactly how I can help you grow.
            </p>

            <div className="bg-[#1b1b1b] border border-white/10 p-10 rounded-3xl text-left max-w-2xl mx-auto">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-bold text-white mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="form-input w-full px-4 py-3 bg-white/80 border-2 border-[#A3D1FF]/30 rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-[#A3D1FF] focus:border-transparent transition-all"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-bold text-white mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="form-input w-full px-4 py-3 bg-white/80 border-2 border-[#A3D1FF]/30 rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-[#A3D1FF] focus:border-transparent transition-all"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="service" className="block text-sm font-bold text-white mb-2">
                    Business Type
                  </label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-[#0066FF] focus:border-transparent transition-all"
                  >
                    <option value="">Select one</option>
                    <option value="Agency">Agency</option>
                    <option value="Local Business">Local Business</option>
                    <option value="Jewellery Brand">Jewellery Brand</option>
                    <option value="E-commerce">E-commerce</option>
                    <option value="SaaS">SaaS</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-bold text-white mb-2">
                    What do you need? *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="form-input w-full px-4 py-3 bg-white/80 border-2 border-[#A3D1FF]/30 rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-[#A3D1FF] focus:border-transparent transition-all resize-none"
                    placeholder="Tell me about your project..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="mr_btn w-full group bg-black text-white font-bold px-8 py-5 rounded-full hover:bg-gray-900 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-xl"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send className="w-6 h-6" />
                    </>
                  )}
                </button>

                <p className="text-center text-sm text-gray-400">
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
              </form>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
