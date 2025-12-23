import React, { useState, useEffect, useRef } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Menu as MenuIcon, X, ChevronDown, Linkedin, Calendar, Trophy, ArrowRight, Globe, Palette, Award } from 'lucide-react';
import { useAppStore } from '@/stores/useAppStore';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import MagneticButton from '@/components/MagneticButton';

interface NavigationItem {
  label: string;
  to?: string;
  badge?: string;
  popular?: boolean;
  children?: {
    title: string;
    description?: string;
    items: { label: string; to: string; description?: string }[];
  }[];
}

const navigationLinks: NavigationItem[] = [
  {
    label: 'Services',
    popular: true,
    children: [
      {
        title: 'Conversion Systems',
        description: 'Systems built to turn traffic into revenue',
        items: [
          {
            label: 'B2B Sales Funnels',
            to: '/services/b2b-funnels',
            description: 'Automated sales channels for B2B'
          },
          {
            label: 'Ecommerce Solutions',
            to: '/services/ecommerce',
            description: 'High-performance React + GSAP storefronts'
          },
          {
            label: 'Fractional CMO',
            to: '/services/fractional-cmo',
            description: 'Strategic marketing execution partner'
          }
        ]
      },
      {
        title: 'Infrastructure & Growth',
        description: 'Scaling your digital footprint',
        items: [
          {
            label: 'Design & Development',
            to: '/services/web-development',
            description: 'SEO-ready React/Node builds'
          },
          {
            label: 'SEO & Growth',
            to: '/services/seo',
            description: 'Dominating B2B search rankings'
          },
          {
            label: 'Managed Hosting',
            to: '/services/hosting-maintenance',
            description: 'Zero-downtime & active maintenance'
          }
        ]
      }
    ]
  },
  { label: 'Case Studies', to: '/work' },
  { label: 'Blog', to: '/blog' },
  { label: 'Tools', to: '/tools' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact', badge: 'Free B2B Audit' }
];

export default function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { isMenuOpen, setMenuOpen } = useAppStore();
  const [isScrolled, setIsScrolled] = useState(false);
  const [expandedMobileSection, setExpandedMobileSection] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);

  const calendlyUXAuditLink = "https://calendly.com/marc-friedman-web-design--meeting-link/30min";

  // GSAP Entrance Animation for Sleek Header Reveal
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(logoRef.current, {
        x: -50,
        opacity: 0,
        duration: 1,
        ease: 'power4.out',
      });
      gsap.from('.nav-trigger', {
        x: 50,
        opacity: 0,
        duration: 1,
        ease: 'power4.out',
      });
    });
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setIsHeaderVisible(false);
      } else {
        setIsHeaderVisible(true);
      }
      setIsScrolled(currentScrollY > 20);
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setExpandedMobileSection(null);
  }, [location.pathname, setMenuOpen]);

  const handleNavigation = (to: string) => {
    navigate(to);
    setMenuOpen(false);
  };

  const getPageTitle = () => {
    const path = location.pathname;
    if (path === '/') return 'Marc Friedman - B2B Growth Partner';
    if (path === '/work') return 'Case Studies';
    if (path === '/services') return 'Core Services';
    return 'Page Not Found';
  };

  return (
    <div className="min-h-screen bg-black">
      <Helmet>
        <title>{`${getPageTitle()} | Marc Friedman`}</title>
        <meta name="description" content="High-performance B2B sales funnels, React Ecommerce solutions, and Fractional CMO strategy." />
      </Helmet>

      {/* Navigation Header */}
      <motion.header 
        ref={headerRef}
        className={`fixed w-full z-50 transition-all duration-300 ${
          isScrolled ? 'bg-[#1b1b1b]/95 backdrop-blur-md border-b border-white/5 shadow-2xl' : 'bg-transparent'
        }`}
        animate={{ y: isHeaderVisible ? 0 : -100 }}
        transition={{ duration: 0.3 }}
      >
        <div className="container-custom">
          <div className="flex items-center justify-between h-20 sm:h-24">
            <div ref={logoRef} className="flex-shrink-0">
              <MagneticButton>
                <button onClick={() => handleNavigation('/')} className="block group">
                  <img 
                    src="/images/marc-friedman-primary.svg" 
                    alt="Marc Friedman B2B Partner" 
                    className="h-10 sm:h-12 w-auto object-contain transition-transform group-hover:scale-105"
                  />
                </button>
              </MagneticButton>
            </div>

            <div className="nav-trigger flex items-center gap-6">
              {/* Desktop Quick Contact - Conversion Focused */}
              <Link to="/contact" className="hidden md:block text-[#A3D1FF] text-sm font-bold tracking-widest uppercase hover:text-white transition-colors">
                Book B2B Audit
              </Link>
              
              <button 
                onClick={() => setMenuOpen(!isMenuOpen)}
                className="p-3 bg-white/5 rounded-full text-white hover:bg-[#A3D1FF] hover:text-black transition-all"
                aria-label="Toggle Navigation"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Fullscreen Sleek Overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              className="fixed inset-0 bg-black/98 backdrop-blur-2xl z-40 overflow-y-auto"
              initial={{ opacity: 0, clipPath: 'circle(0% at 100% 0%)' }}
              animate={{ opacity: 1, clipPath: 'circle(150% at 100% 0%)' }}
              exit={{ opacity: 0, clipPath: 'circle(0% at 100% 0%)' }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="container-custom py-32 flex flex-col lg:flex-row gap-16 lg:gap-32">
                <nav className="flex-1 space-y-12">
                  {navigationLinks.map((item) => (
                    <div key={item.label} className="group">
                      {item.children ? (
                        <div className="grid md:grid-cols-2 gap-8 md:gap-16">
                          {item.children.map((section, idx) => (
                            <div key={idx} className="space-y-6">
                              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest border-b border-white/10 pb-2">
                                {section.title}
                              </h3>
                              <ul className="space-y-4">
                                {section.items.map((subItem) => (
                                  <li key={subItem.label}>
                                    <Link
                                      to={subItem.to}
                                      className="block group/link"
                                      onClick={() => setMenuOpen(false)}
                                    >
                                      <span className="text-2xl md:text-3xl font-black text-white group-hover/link:text-[#A3D1FF] transition-colors inline-flex items-center gap-4">
                                        {subItem.label}
                                        <ArrowRight className="w-6 h-6 opacity-0 -translate-x-4 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all" />
                                      </span>
                                      <p className="text-sm text-gray-500 mt-1 max-w-xs">{subItem.description}</p>
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <Link
                          to={item.to || '/'}
                          className="text-4xl md:text-6xl font-black text-white hover:text-[#A3D1FF] transition-colors"
                          onClick={() => setMenuOpen(false)}
                        >
                          {item.label}
                        </Link>
                      )}
                    </div>
                  ))}
                </nav>
                
                {/* Secondary Sidebar Content */}
                <div className="lg:w-1/3 space-y-12 border-l border-white/5 pl-12 hidden lg:block">
                  <div className="space-y-4">
                    <h4 className="text-gray-500 font-bold uppercase text-xs tracking-widest">Growth Partnerships</h4>
                    <p className="text-gray-300 text-lg leading-relaxed">
                      Transforming high-ticket B2B service providers with modern sales ecosystems.
                    </p>
                  </div>
                  <div className="flex flex-col gap-4">
                    <a href={calendlyUXAuditLink} className="text-white hover:text-[#A3D1FF] flex items-center gap-3">
                      <Calendar className="w-5 h-5" /> Schedule Discovery Call
                    </a>
                    <a href="https://linkedin.com/in/portfolio2/" className="text-white hover:text-[#0077B5] flex items-center gap-3">
                      <Linkedin className="w-5 h-5" /> Connect on LinkedIn
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      <main className="relative">
        <Outlet />
      </main>

      {/* Simplified High-Conversion Footer */}
      <footer className="bg-[#0a0a0a] border-t border-white/5 py-24">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
            <div>
              <img src="/images/marc-friedman-primary.svg" className="h-10 mb-6" alt="Logo" />
              <p className="text-gray-500 max-w-xs">Systems built for B2B growth and Ecommerce scale using React + GSAP.</p>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-6">B2B Solutions</h4>
              <ul className="space-y-3 text-gray-500 text-sm">
                <li><Link to="/services/b2b-funnels" className="hover:text-[#A3D1FF]">Sales Channels</Link></li>
                <li><Link to="/services/ecommerce" className="hover:text-[#A3D1FF]">React Storefronts</Link></li>
                <li><Link to="/services/fractional-cmo" className="hover:text-[#A3D1FF]">CMO Support</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6">Infrastructure</h4>
              <ul className="space-y-3 text-gray-500 text-sm">
                <li><Link to="/services/web-development" className="hover:text-[#A3D1FF]">Design & Dev</Link></li>
                <li><Link to="/services/seo" className="hover:text-[#A3D1FF]">SEO Strategy</Link></li>
                <li><Link to="/services/hosting-maintenance" className="hover:text-[#A3D1FF]">Managed Hosting</Link></li>
              </ul>
            </div>

            <div className="bg-white/5 p-8 rounded-3xl border border-white/10">
              <h4 className="text-[#A3D1FF] font-bold mb-4 uppercase tracking-tighter text-sm">Status</h4>
              <div className="flex items-center gap-2 mb-6">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-white text-xs font-bold uppercase">Taking Q1 Clients</span>
              </div>
              <Link to="/contact" className="inline-flex items-center text-white font-bold group">
                Get Your Audit <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-2 transition-transform" />
              </Link>
            </div>
          </div>
          
          <div className="pt-8 border-t border-white/5 flex flex-col md:row justify-between items-center gap-6 text-gray-600 text-[10px] uppercase tracking-widest">
            <p>© {new Date().getFullYear()} Marc Friedman. All rights reserved.</p>
            <div className="flex gap-8">
              <Link to="/privacy-policy" className="hover:text-white">Privacy</Link>
              <Link to="/terms-and-conditions" className="hover:text-white">Terms</Link>
              <Link to="/cookies-policy" className="hover:text-white">Cookies</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}