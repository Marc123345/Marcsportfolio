import React, { useState, useEffect, useRef } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Menu as MenuIcon, X, ChevronDown, Linkedin, Calendar, Trophy, ArrowRight, Globe, Palette, Award } from 'lucide-react';
import { useAppStore } from '@/stores/useAppStore';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import MagneticButton from '@/components/MagneticButton';

// Navigation Data remains the same for structural compatibility
const navigationLinks = [
  { 
    label: 'Services',
    popular: true,
    children: [
      {
        title: 'Core Expertise',
        items: [
          { label: 'UI/UX Design', to: '/services/design', description: 'Intuitive, high-conversion interfaces' },
          { label: 'Web Development', to: '/services/web-development', description: 'Performance-engineered React apps' },
          { label: 'Design Systems', to: '/services/design-systems', description: 'Scalable UI frameworks' }
        ]
      },
      {
        title: 'Specialized',
        items: [
          { label: 'Startup MVP', to: '/services/startup-mvp', description: 'Validate and launch fast' },
          { label: 'AI Integration', to: '/services/ai-integration', description: 'Automated intelligence' },
          { label: 'Fractional CMO', to: '/services/fractional-cmo', description: 'Growth execution partner' }
        ]
      }
    ]
  },
  { label: 'Case Studies', to: '/work' },
  { label: 'Blog', to: '/blog' },
  { label: 'Tools', to: '/tools' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact', badge: 'Free Audit' }
];

export default function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { isMenuOpen, setMenuOpen } = useAppStore();
  const [isScrolled, setIsScrolled] = useState(false);
  const [expandedMobileSection, setExpandedMobileSection] = useState<string | null>(null);
  const headerRef = useRef<HTMLElement>(null);
  const lastScrollY = useRef(0);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);

  // Constants for Sleekness
  const calendlyLink = "https://calendly.com/marc-friedman-web-design--meeting-link/30min";

  // 1. Scroll Logic
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

  // 2. Navigation Side-Effects
  useEffect(() => {
    setMenuOpen(false);
    setExpandedMobileSection(null);
  }, [location.pathname, setMenuOpen]);

  // 3. Body Lock for Menu
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'unset';
  }, [isMenuOpen]);

  const handleNavigation = (to: string) => {
    navigate(to);
    setMenuOpen(false);
  };

  const getPageTitle = () => {
    const path = location.pathname;
    if (path === '/') return 'Marc Friedman - B2B Growth Engineer';
    const segment = path.split('/').filter(Boolean).pop();
    return segment ? segment.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') : 'Portfolio';
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-primary selection:text-black">
      <Helmet>
        <title>{`${getPageTitle()} | Marc Friedman`}</title>
        <meta name="description" content="High-performance B2B design and engineering." />
      </Helmet>

      {/* Modern Floating Header */}
      <motion.header
        ref={headerRef}
        className={`fixed w-full z-[100] transition-all duration-500 ${
          isScrolled ? 'py-4 bg-black/80 backdrop-blur-xl border-b border-white/5 shadow-2xl' : 'py-8 bg-transparent'
        }`}
        animate={{ y: isHeaderVisible ? 0 : -120 }}
      >
        <div className="container-custom flex items-center justify-between">
          <div className="relative z-[110]">
            <MagneticButton>
              <button onClick={() => handleNavigation('/')} className="block transition-transform active:scale-95">
                <img 
                  src="/images/marc-friedman-primary.svg" 
                  alt="Logo" 
                  className="h-8 md:h-10 w-auto" 
                />
              </button>
            </MagneticButton>
          </div>

          <div className="flex items-center gap-8 relative z-[110]">
            <Link to="/contact" className="hidden md:block text-[10px] font-bold tracking-[0.3em] uppercase text-gray-400 hover:text-primary transition-colors">
              Book B2B Audit
            </Link>
            
            <button 
              onClick={() => setMenuOpen(!isMenuOpen)}
              className="p-3 bg-white/5 rounded-full text-white hover:bg-primary hover:text-black transition-all border border-white/10"
              aria-label="Toggle Navigation"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Balanced Overlay Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            className="fixed inset-0 bg-black z-[90] overflow-y-auto"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="container-custom pt-40 pb-20 grid lg:grid-cols-2 gap-20">
              <nav className="space-y-4">
                {navigationLinks.map((item, i) => (
                  <motion.div 
                    key={item.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    {item.children ? (
                      <div className="space-y-8 py-4">
                        <p className="text-[10px] font-black tracking-[0.4em] text-gray-600 uppercase border-b border-white/5 pb-2">{item.label}</p>
                        <div className="grid sm:grid-cols-2 gap-10">
                          {item.children.map((section, idx) => (
                            <div key={idx} className="space-y-4">
                              <h3 className="text-xs font-bold text-gray-400">{section.title}</h3>
                              <ul className="space-y-4">
                                {section.items.map((sub) => (
                                  <li key={sub.label}>
                                    <Link to={sub.to} className="group block" onClick={() => setMenuOpen(false)}>
                                      <span className="block text-xl font-bold group-hover:text-primary transition-colors">{sub.label}</span>
                                      <span className="block text-xs text-gray-600">{sub.description}</span>
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <Link 
                        to={item.to || '/'} 
                        className="text-5xl md:text-7xl font-black tracking-tighter hover:text-primary transition-colors block py-2"
                        onClick={() => setMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                    )}
                  </motion.div>
                ))}
              </nav>

              {/* Sidebar Branding in Menu */}
              <div className="hidden lg:block border-l border-white/5 pl-20 space-y-12">
                <div className="space-y-6">
                  <h4 className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">Growth Partnerships</h4>
                  <p className="text-2xl text-gray-400 leading-relaxed font-medium">
                    Transforming high-ticket B2B services with high-performance ecosystems.
                  </p>
                </div>
                <div className="flex flex-col gap-6">
                  <a href={calendlyLink} className="flex items-center gap-4 text-sm font-bold hover:text-primary transition-colors group">
                    <Calendar className="w-5 h-5 text-gray-600 group-hover:text-primary" /> Schedule Strategy Call
                  </a>
                  <a href="#" className="flex items-center gap-4 text-sm font-bold hover:text-primary transition-colors group">
                    <Linkedin className="w-5 h-5 text-gray-600 group-hover:text-primary" /> Connect on LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="relative">
        <Outlet />
      </main>
      
      {/* High-Contrast Sleek Footer */}
      <footer className="bg-dark-card border-t border-white/5 py-24 md:py-32">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
            <div className="space-y-8">
              <img src="/images/marc-friedman-primary.svg" alt="Marc Friedman" className="h-8 md:h-10" />
              <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
                Engineering high-conversion digital experiences at the intersection of psychology and performance.
              </p>
              <div className="flex gap-4">
                {[Linkedin, Calendar, Trophy].map((Icon, i) => (
                  <a key={i} href="#" className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center hover:bg-primary hover:text-black transition-all duration-300">
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>

            {['Services', 'Portfolio', 'Tools'].map((section, i) => (
              <div key={i}>
                <h3 className="text-white font-black text-xs uppercase tracking-widest mb-8">{section}</h3>
                <ul className="space-y-4 text-sm text-gray-500">
                  {/* Map your specific links here */}
                  <li className="hover:text-primary transition-colors cursor-pointer">UI/UX Design</li>
                  <li className="hover:text-primary transition-colors cursor-pointer">SaaS Development</li>
                  <li className="hover:text-primary transition-colors cursor-pointer">Audit Systems</li>
                </ul>
              </div>
            ))}
          </div>
          
          <div className="pt-8 border-t border-white/5 flex flex-col lg:flex-row justify-between items-center gap-8">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <p className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">
                © {new Date().getFullYear()} Marc Friedman. All rights reserved.
              </p>
              <div className="flex items-center gap-2 px-3 py-1 bg-green-500/10 rounded-full">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                <span className="text-[10px] font-black uppercase tracking-tighter text-green-500">Available Q1 2026</span>
              </div>
            </div>
            <div className="flex flex-wrap justify-center gap-6 text-[10px] font-bold uppercase tracking-widest text-gray-600">
              <Link to="/privacy-policy" className="hover:text-white">Privacy</Link>
              <Link to="/terms-and-conditions" className="hover:text-white">Terms</Link>
              <Link to="/cookies-policy" className="hover:text-white">Cookies</Link>
              <a href="/sitemap.xml" className="hover:text-white">Sitemap</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}