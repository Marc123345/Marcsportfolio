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
    children: [
      {
        title: 'Conversion Systems',
        description: 'Systems built to turn traffic into revenue',
        items: [
          { label: 'B2B Sales Funnels', to: '/services/b2b-funnels', description: 'Automated sales channels' },
          { label: 'Ecommerce Solutions', to: '/services/ecommerce', description: 'High-performance storefronts' },
          { label: 'Fractional CMO', to: '/services/fractional-cmo', description: 'Strategic growth partner' }
        ]
      },
      {
        title: 'Infrastructure',
        description: 'Scaling your digital footprint',
        items: [
          { label: 'Design & Development', to: '/services/web-development', description: 'SEO-ready builds' },
          { label: 'SEO & Growth', to: '/services/seo', description: 'Dominating search rankings' },
          { label: 'Managed Hosting', to: '/services/hosting-maintenance', description: 'Zero-downtime maintenance' }
        ]
      }
    ]
  },
  { label: 'Case Studies', to: '/work' },
  { label: 'Blog', to: '/blog' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact', badge: 'Free Audit' }
];

export default function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { isMenuOpen, setMenuOpen } = useAppStore();
  const [isScrolled, setIsScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);

  const calendlyUXAuditLink = "https://calendly.com/marc-friedman-web-design--meeting-link/30min";

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'unset';
  }, [isMenuOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [setMenuOpen]);

  // Entrance GSAP Logic
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(logoRef.current, { x: -30, opacity: 0, duration: 1, ease: 'expo.out' });
      gsap.from('.nav-trigger', { x: 30, opacity: 0, duration: 1, ease: 'expo.out' });
    });
    return () => ctx.revert();
  }, []);

  // Header Hide/Show Logic
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsHeaderVisible(currentScrollY < lastScrollY.current || currentScrollY < 100);
      setIsScrolled(currentScrollY > 20);
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-close on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname, setMenuOpen]);

  const handleNavigation = (to: string) => {
    navigate(to);
    setMenuOpen(false);
  };

  // Animation Variants for Menu Items
  const containerVars = {
    initial: { transition: { staggerChildren: 0.05, staggerDirection: -1 } },
    animate: { transition: { staggerChildren: 0.1, delayChildren: 0.3 } }
  };

  const itemVars = {
    initial: { y: 30, opacity: 0 },
    animate: { y: 0, opacity: 1, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-[#A3D1FF] selection:text-black">
      <Helmet>
        <title>Marc Friedman | B2B Growth Partner</title>
      </Helmet>

      {/* Header Container */}
      <motion.header 
        ref={headerRef}
        className={`fixed w-full z-[100] transition-all duration-500 ${
          isScrolled ? 'py-4 bg-black/80 backdrop-blur-lg border-b border-white/5' : 'py-8 bg-transparent'
        }`}
        animate={{ y: isHeaderVisible ? 0 : -110 }}
      >
        <div className="container-custom flex items-center justify-between">
          <div ref={logoRef} className="relative z-[110]">
            <MagneticButton>
              <button onClick={() => handleNavigation('/')} className="transition-transform active:scale-95">
                <img src="/images/marc-friedman-primary.svg" alt="Logo" className="h-8 sm:h-10 w-auto" />
              </button>
            </MagneticButton>
          </div>

          <div className="nav-trigger flex items-center gap-8 relative z-[110]">
            <Link to="/contact" className="hidden md:block text-xs font-bold tracking-[0.2em] uppercase text-gray-400 hover:text-[#A3D1FF] transition-colors">
              Book B2B Audit
            </Link>
            
            <button 
              onClick={() => setMenuOpen(!isMenuOpen)}
              className="group flex items-center gap-3 bg-white/5 hover:bg-white/10 px-4 py-2 rounded-full border border-white/10 transition-all"
            >
              <span className="text-[10px] font-bold uppercase tracking-widest hidden sm:block">
                {isMenuOpen ? 'Close' : 'Menu'}
              </span>
              {isMenuOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Fullscreen Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            className="fixed inset-0 bg-black z-[90] overflow-y-auto pt-40 pb-20"
            initial={{ y: '-100%' }}
            animate={{ y: 0 }}
            exit={{ y: '-100%' }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="container-custom">
              <motion.div 
                variants={containerVars}
                initial="initial"
                animate="animate"
                className="grid lg:grid-cols-[1.5fr_1fr] gap-20"
              >
                {/* Main Navigation */}
                <nav className="space-y-10">
                  {navigationLinks.map((item) => (
                    <motion.div key={item.label} variants={itemVars}>
                      {item.children ? (
                        <div className="grid md:grid-cols-2 gap-12">
                          {item.children.map((section, idx) => (
                            <div key={idx} className="space-y-6">
                              <p className="text-[10px] font-black text-gray-600 uppercase tracking-[0.3em]">{section.title}</p>
                              <ul className="space-y-4">
                                {section.items.map((subItem) => (
                                  <li key={subItem.label}>
                                    <Link to={subItem.to} className="group flex flex-col">
                                      <span className="text-xl font-bold group-hover:text-[#A3D1FF] transition-colors">{subItem.label}</span>
                                      <span className="text-xs text-gray-500">{subItem.description}</span>
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <Link to={item.to || '#'} className="text-5xl md:text-7xl font-black hover:text-[#A3D1FF] transition-colors inline-block tracking-tighter">
                          {item.label}
                        </Link>
                      )}
                    </motion.div>
                  ))}
                </nav>

                {/* Sidebar Info */}
                <motion.div variants={itemVars} className="hidden lg:block border-l border-white/5 pl-20 space-y-12">
                  <div className="space-y-4">
                    <h4 className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">Growth Partnerships</h4>
                    <p className="text-xl text-gray-400 leading-relaxed">Scaling high-ticket B2B service providers with custom sales ecosystems.</p>
                  </div>
                  <div className="flex flex-col gap-6">
                    <a href={calendlyUXAuditLink} className="flex items-center gap-4 text-sm font-bold hover:text-[#A3D1FF] transition-colors">
                      <Calendar className="w-5 h-5" /> Schedule Discovery Call
                    </a>
                    <a href="https://linkedin.com" className="flex items-center gap-4 text-sm font-bold hover:text-[#0077B5] transition-colors">
                      <Linkedin className="w-5 h-5" /> LinkedIn Professional Profile
                    </a>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="relative z-10">
        <Outlet />
      </main>

      {/* FOOTER SNIPPET ... omitted for length but keep yours as is */}
    </div>
  );
}