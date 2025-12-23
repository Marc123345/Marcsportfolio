import React, { useState, useEffect, useRef } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { 
  Menu as MenuIcon, X, ChevronDown, Linkedin, Calendar, 
  Trophy, ArrowRight, Globe, Palette, Award, ExternalLink 
} from 'lucide-react';
import { useAppStore } from '@/stores/useAppStore';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import MagneticButton from '@/components/MagneticButton';

// ... (navigationLinks remains the same as your input for data consistency)

export default function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { isMenuOpen, setMenuOpen } = useAppStore();
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);
  const [expandedMobileSection, setExpandedMobileSection] = useState<string | null>(null);
  const headerRef = useRef<HTMLElement>(null);
  const lastScrollY = useRef(0);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);

  const calendlyUXAuditLink = "https://calendly.com/marc-friedman-web-design--meeting-link/30min";

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

  // Close menus on route change
  useEffect(() => {
    setMenuOpen(false);
    setHoveredSection(null);
  }, [location.pathname, setMenuOpen]);

  return (
    <div className="min-h-screen bg-black text-white selection:bg-[#A3D1FF] selection:text-black">
      <Helmet>
        <title>{`Marc Friedman | Design & Development`}</title>
      </Helmet>

      {/* Header */}
      <motion.header
        ref={headerRef}
        className={`fixed w-full z-[100] transition-all duration-500 border-b ${
          isScrolled 
            ? 'bg-black/80 backdrop-blur-xl border-white/10 py-3' 
            : 'bg-transparent border-transparent py-5'
        }`}
        animate={{ y: isHeaderVisible ? 0 : -100 }}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="relative z-[110] transition-transform active:scale-95">
            <img 
              src="/images/marc-friedman-primary.svg" 
              alt="Logo" 
              className="h-8 md:h-10 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navigationLinks.map((item) => (
              <div 
                key={item.label}
                onMouseEnter={() => setHoveredSection(item.label)}
                onMouseLeave={() => setHoveredSection(null)}
                className="relative py-2"
              >
                <Link
                  to={item.to || '#'}
                  className={`text-sm font-medium transition-colors flex items-center gap-1 ${
                    location.pathname === item.to ? 'text-[#A3D1FF]' : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {item.label}
                  {item.children && <ChevronDown className={`w-3 h-3 transition-transform ${hoveredSection === item.label ? 'rotate-180' : ''}`} />}
                </Link>

                {/* Mega Menu Dropdown */}
                <AnimatePresence>
                  {item.children && hoveredSection === item.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full left-1/2 -translate-x-1/2 pt-4"
                    >
                      <div className="bg-[#1b1b1b] border border-white/10 rounded-2xl shadow-2xl p-6 min-w-[500px] grid grid-cols-2 gap-8">
                        {item.children.map((child, i) => (
                          <div key={i}>
                            <h4 className="text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-4">{child.title}</h4>
                            <ul className="space-y-3">
                              {child.items.map((sub, j) => (
                                <li key={j}>
                                  <Link 
                                    to={sub.to} 
                                    className="group block"
                                  >
                                    <span className="text-sm font-medium text-gray-200 group-hover:text-[#A3D1FF] transition-colors flex items-center gap-2">
                                      {sub.label}
                                      <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                                    </span>
                                    <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">{sub.description}</p>
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <Link 
              to="/contact" 
              className="hidden md:block px-5 py-2.5 bg-white text-black text-sm font-bold rounded-full hover:bg-[#A3D1FF] transition-all"
            >
              Start a Project
            </Link>
            
            <button 
              onClick={() => setMenuOpen(!isMenuOpen)}
              className="lg:hidden relative z-[110] p-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[100] bg-black lg:hidden flex flex-col pt-24 px-6 overflow-y-auto"
          >
            {navigationLinks.map((item) => (
              <div key={item.label} className="border-b border-white/5 last:border-0">
                <div 
                  className="flex items-center justify-between py-6"
                  onClick={() => item.children ? setExpandedMobileSection(expandedMobileSection === item.label ? null : item.label) : setMenuOpen(false)}
                >
                  <Link to={item.to || '#'} className="text-2xl font-semibold">{item.label}</Link>
                  {item.children && <ChevronDown className={`transition-transform ${expandedMobileSection === item.label ? 'rotate-180' : ''}`} />}
                </div>
                {item.children && expandedMobileSection === item.label && (
                  <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} className="overflow-hidden pb-6 space-y-6">
                    {item.children.map((child, idx) => (
                      <div key={idx}>
                        <p className="text-[#A3D1FF] text-xs font-bold uppercase tracking-tighter mb-3">{child.title}</p>
                        <div className="grid grid-cols-1 gap-4">
                          {child.items.map((sub, sIdx) => (
                            <Link key={sIdx} to={sub.to} onClick={() => setMenuOpen(false)} className="text-gray-400 hover:text-white">
                              {sub.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </motion.div>
                )}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <main className="pt-20">
        <Outlet />
      </main>

      {/* Refined Footer */}
      <footer className="bg-[#0a0a0a] border-t border-white/5 pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
            <div className="lg:col-span-4">
              <img src="/images/marc-friedman-primary.svg" alt="Marc Friedman" className="h-10 mb-6" />
              <p className="text-gray-400 text-lg leading-relaxed mb-8">
                Crafting digital experiences that merge <span className="text-white">artistic design</span> with <span className="text-white">technical excellence</span>.
              </p>
              <div className="flex gap-4">
                {[Linkedin, Trophy, Globe].map((Icon, i) => (
                  <a key={i} href="#" className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center hover:bg-[#A3D1FF] hover:text-black transition-all">
                    <Icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5 grid grid-cols-2 gap-8">
              <div>
                <h4 className="font-bold mb-6">Services</h4>
                <ul className="space-y-4 text-gray-400 text-sm">
                  <li><Link to="/services/design" className="hover:text-[#A3D1FF]">UI/UX Design</Link></li>
                  <li><Link to="/services/web-development" className="hover:text-[#A3D1FF]">Web Development</Link></li>
                  <li><Link to="/services/saas" className="hover:text-[#A3D1FF]">SaaS Solutions</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-6">Explore</h4>
                <ul className="space-y-4 text-gray-400 text-sm">
                  <li><Link to="/work" className="hover:text-[#A3D1FF]">Case Studies</Link></li>
                  <li><Link to="/about" className="hover:text-[#A3D1FF]">Our Story</Link></li>
                  <li><Link to="/blog" className="hover:text-[#A3D1FF]">Insights</Link></li>
                </ul>
              </div>
            </div>

            <div className="lg:col-span-3 bg-white/5 p-8 rounded-3xl border border-white/10">
              <h4 className="font-bold mb-2">Subscribe</h4>
              <p className="text-sm text-gray-400 mb-6">Join 2,000+ others getting weekly design & dev tips.</p>
              <form className="space-y-3">
                <input 
                  type="email" 
                  placeholder="email@example.com" 
                  className="w-full bg-black border border-white/10 px-4 py-3 rounded-xl focus:ring-1 focus:ring-[#A3D1FF] outline-none transition-all"
                />
                <button className="w-full py-3 bg-[#A3D1FF] text-black font-bold rounded-xl hover:scale-[1.02] transition-transform">
                  Sign Up
                </button>
              </form>
            </div>
          </div>

          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-gray-500 text-xs">
            <p>© {new Date().getFullYear()} Marc Friedman. Designed for the future.</p>
            <div className="flex flex-wrap justify-center gap-6">
              <Link to="/privacy" className="hover:text-white">Privacy</Link>
              <Link to="/terms" className="hover:text-white">Terms</Link>
              <Link to="/sitemap" className="hover:text-white">Sitemap</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}