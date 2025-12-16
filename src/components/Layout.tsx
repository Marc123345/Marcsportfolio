// src/pages/Layout.tsx

import React, { useState, useEffect, useRef } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { 
    Menu as MenuIcon, X, ChevronDown, Linkedin, Calendar, Trophy, ArrowRight, 
    Globe, Palette, Award, ShoppingCart, Code2, Layers, Zap, Package, 
    Compass, BookOpen, User, Briefcase, Map, BarChart3, Clock, Rocket 
} from 'lucide-react'; // Added Rocket and Clock

import { useAppStore } from '@/stores/useAppStore';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import MagneticButton from '@/components/MagneticButton';

// Map Lucide icons for easy use in the data structure
const Icons = {
    Code2, Layers, Zap, Package, Compass, BookOpen, User, Briefcase, Map, BarChart3, 
    Palette, ShoppingCart, Trophy, Globe, Clock, Rocket, ArrowRight
};

// --- Types ---
interface NavigationItem {
  label: string;
  to?: string;
  badge?: string;
  popular?: boolean;
  icon?: React.ElementType; 
  children?: {
    title: string;
    items: { label: string; to: string; description?: string; icon?: React.ElementType }[];
  }[];
}

// --- Navigation Data Structure ---
const navigationLinks: NavigationItem[] = [
  {
    label: 'Services',
    popular: true,
    children: [
      {
        title: 'Design & UX',
        items: [
          { label: 'UI/UX Design', to: '/services/design', description: 'Beautiful, intuitive interfaces that convert', icon: Icons.Palette },
          { label: 'Design Systems', to: '/services/design-systems', description: 'Scalable design frameworks', icon: Icons.Layers },
          { label: 'Brand Design', to: '/services/brand-design', description: 'Complete brand identity solutions', icon: Icons.Trophy }
        ]
      },
      {
        title: 'Development',
        items: [
          { label: 'Web Development', to: '/services/web-development', description: 'Custom websites and applications', icon: Icons.Code2 },
          { label: 'SaaS Development', to: '/services/saas', description: 'End-to-end SaaS solutions', icon: Icons.Zap },
          { label: 'API Development', to: '/services/api', description: 'Robust APIs and integrations', icon: Icons.Package }
        ]
      },
      {
        title: 'Strategy & Growth',
        items: [
          { label: 'AI Integration', to: '/services/ai-integration', description: 'AI-powered solutions and automation', icon: Icons.Map },
          { label: 'Startup MVP', to: '/services/startup-mvp', description: 'Validate and launch your idea quickly', icon: Icons.Rocket },
          { label: 'Marketing Partner', to: '/services/fractional-cmo', description: 'Design & dev execution for marketing strategy', icon: Icons.BarChart3 }
        ]
      }
    ]
  },
  {
    label: 'Work',
    to: '/work',
    children: [
        {
            title: 'Case Studies',
            items: [
                { label: 'Untapped Africa', to: '/work/case-studies/untapped-africa', description: 'Water infrastructure solutions platform', icon: Icons.Globe },
                { label: 'Binns Media Group', to: '/work/case-studies/binns-media', description: 'Digital media platform transformation', icon: Icons.Briefcase },
                { label: 'iLight Care', to: '/work/case-studies/ilight', description: 'Healthcare technology platform', icon: Icons.Package }
            ]
        },
        {
            title: 'By Industry',
            items: [
                { label: 'Media & Entertainment', to: '/work?filter=media', description: 'Content platforms and media websites', icon: Icons.Code2 },
                { label: 'SaaS & Technology', to: '/work?filter=saas', description: 'Software platforms and tech solutions', icon: Icons.Zap },
                { label: 'E-commerce Solutions', to: '/work?filter=ecommerce', description: 'High-converting online stores', icon: Icons.ShoppingCart }
            ]
        },
        {
            title: 'Full Portfolio',
            items: [
                { label: 'View All Projects', to: '/work', description: 'Complete portfolio and case studies', icon: Icons.Compass }
            ]
        }
    ]
  },
  // Re-added Blog and About as top-level simple links
  { label: 'Blog', to: '/blog', icon: Icons.BookOpen }, 
  { label: 'About', to: '/about', icon: Icons.User },
  
  {
    label: 'Tools',
    children: [
      {
        title: 'Free Tools',
        items: [
          { label: 'Website Analyzer', to: '/tools/website-analyzer', description: 'Get an instant analysis of your website', icon: Icons.Zap },
          { label: 'ROI Calculator', to: '/tools/roi-calculator', description: 'Calculate your website investment returns', icon: Icons.BarChart3 },
          { label: 'Project Timeline', to: '/tools/project-timeline', description: 'See our transparent development process', icon: Icons.Clock }
        ]
      }
    ]
  },
  { label: 'Contact', to: '/contact', badge: 'Free Consultation' }
];

// --- Desktop Mega-Menu Component ---
const MegaMenuDropdown: React.FC<{ item: NavigationItem, toggle: (label: string) => void }> = ({ item, toggle }) => {
    return (
        <motion.div 
            className="absolute left-1/2 -translate-x-1/2 mt-0 w-full max-w-7xl 
                       bg-black border-4 border-[#A3D1FF] 
                       shadow-[0_0_50px_rgba(163,209,255,0.2)] z-50 overflow-hidden rounded-none" // Explicitly no rounded corners
            initial={{ opacity: 0, y: 10, scaleY: 0.95, transformOrigin: 'top' }}
            animate={{ opacity: 1, y: 0, scaleY: 1 }}
            exit={{ opacity: 0, y: 10, scaleY: 0.95 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            onMouseLeave={() => toggle(item.label)}
        >
            <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {item.children?.map((section, sectionIdx) => (
                    <div key={sectionIdx} className={`border-l border-white/10 pl-4 ${sectionIdx === 0 ? 'border-l-0 pl-0' : ''}`}>
                        <h3 className="text-sm font-bold uppercase tracking-wider text-[#A3D1FF] mb-4 border-b border-[#A3D1FF]/10 pb-2">
                            {section.title}
                        </h3>
                        <ul className="space-y-4">
                            {section.items.map((subItem, subIdx) => {
                                const IconComponent = subItem.icon || Icons.ArrowRight;
                                return (
                                    <li key={subIdx}>
                                        <Link 
                                            to={subItem.to} 
                                            className="group block p-3 bg-transparent hover:bg-white/5 transition-colors duration-200 rounded-none"
                                            onClick={() => { toggle(item.label); }}
                                        >
                                            <div className="flex items-start gap-3">
                                                <IconComponent className="w-5 h-5 text-[#A3D1FF] group-hover:scale-110 transition-transform flex-shrink-0 mt-0.5" />
                                                <div>
                                                    <span className="text-white font-semibold block text-base group-hover:text-[#A3D1FF] transition-colors">
                                                        {subItem.label}
                                                    </span>
                                                    <span className="text-gray-400 text-sm block mt-0.5">
                                                        {subItem.description}
                                                    </span>
                                                </div>
                                            </div>
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                ))}
            </div>
        </motion.div>
    );
}

// --- Main Layout Component ---
export default function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { isMenuOpen, setMenuOpen } = useAppStore();
  const [isScrolled, setIsScrolled] = useState(false);
  const [expandedMobileSection, setExpandedMobileSection] = useState<string | null>(null);
  const [expandedDesktopSection, setExpandedDesktopSection] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const lastScrollY = useRef(0);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);

  // UX Audit Calendly link
  const calendlyUXAuditLink = "https://calendly.com/marc-friedman-web-design--meeting-link/30min";

  // Handle scroll events for sticky header
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

  // Reset menu state on route change
  useEffect(() => {
    setMenuOpen(false);
    setExpandedMobileSection(null);
    setExpandedDesktopSection(null);
  }, [location.pathname, setMenuOpen]);

  // Handle keyboard navigation and clicks outside menu
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMenuOpen(false);
        setExpandedDesktopSection(null);
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      // Logic for closing the mobile menu when clicking outside
      if (isMenuOpen && menuRef.current && !menuRef.current.contains(e.target as Node) && headerRef.current && !headerRef.current.contains(e.target as Node)) {
          setMenuOpen(false);
      }
      // Logic for closing the desktop mega-menu when clicking outside
      if (expandedDesktopSection && headerRef.current && !headerRef.current.contains(e.target as Node)) {
          // Check if the click target is outside of the header entirely
          const target = e.target as HTMLElement;
          const isInsideHeader = headerRef.current.contains(target);
          if (!isInsideHeader) {
            setExpandedDesktopSection(null);
          }
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setMenuOpen, isMenuOpen, expandedDesktopSection]);
  
  // Close desktop menu if mobile menu opens
  useEffect(() => {
      if (isMenuOpen) {
          setExpandedDesktopSection(null);
      }
  }, [isMenuOpen]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const handleNavigation = (to: string) => {
    navigate(to);
    setMenuOpen(false);
    setExpandedMobileSection(null);
    setExpandedDesktopSection(null);
  };

  const toggleMobileSection = (label: string) => {
    setExpandedMobileSection(expandedMobileSection === label ? null : label);
  };

  const toggleDesktopSection = (label: string) => {
    setExpandedDesktopSection(expandedDesktopSection === label ? null : label);
  };

  // Get current page title based on location
  const getPageTitle = () => {
    const path = location.pathname;
    
    if (path === '/') return 'Marc Friedman - Full Stack Designer & Developer';
    if (path === '/work') return 'Portfolio';
    if (path === '/services') return 'Services';
    if (path === '/about') return 'About';
    if (path === '/contact') return 'Contact';
    if (path === '/blog') return 'Blog';
    
    if (path.includes('/work/case-studies/')) {
      const caseStudy = path.split('/').pop();
      return `Case Study: ${caseStudy?.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}`;
    }
    
    if (path.includes('/services/')) {
      const service = path.split('/').pop();
      return `Service: ${service?.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}`;
    }
    
    if (path.includes('/tools/')) {
      const tool = path.split('/').pop();
      return `Tool: ${tool?.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}`;
    }
    
    if (path.includes('/blog/')) {
      const blogPost = path.split('/').pop();
      return `Blog: ${blogPost?.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}`;
    }
    
    return 'Page Not Found';
  };

  return (
    <div className="min-h-screen bg-black">
      <Helmet>
        <title>{`${getPageTitle()} | Marc Friedman`}</title>
        <meta name="description" content="Full-stack design and development solutions that transform your vision into exceptional digital experiences." />
        <link rel="canonical" href={`https://www.marcfriedmanportfolio.com${location.pathname}`} />
      </Helmet>

      {/* Navigation */}
      <motion.header 
        ref={headerRef}
        className={`fixed w-full z-[100] transition-all duration-300 ${
          isScrolled ? 'bg-[#1b1b1b]/95 backdrop-blur-md shadow-[0_4px_15px_rgba(163,209,255,0.1)]' : 'bg-transparent'
        } border-b border-white/10`}
        initial={{ y: 0 }}
        animate={{ 
          y: isHeaderVisible ? 0 : -100,
        }}
        transition={{ duration: 0.3 }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100
        }}
      >
        <div className="container-custom mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            <div className="flex-shrink-0">
              <MagneticButton>
                <button 
                  onClick={() => handleNavigation('/')}
                  className="site-logo block"
                  aria-label="Marc Friedman - Navigate to homepage"
                  title="Marc Friedman - Full Stack Designer & Developer"
                >
                  <img 
                    src="/images/marc-friedman-primary.svg" 
                    alt="Marc Friedman logo - Full Stack Designer & Developer" 
                    className="h-8 w-auto object-contain transition-all duration-300"
                    loading="eager"
                    width="80"
                    height="32"
                  />
                </button>
              </MagneticButton>
            </div>
            
            {/* Desktop Navigation Links (Mega Menu & Normal Links) - Hidden on mobile (lg:hidden) */}
            <nav className="hidden lg:flex items-center space-x-1 relative z-50" aria-label="Main Navigation">
                {navigationLinks.map((item) => (
                    <div 
                        key={item.label}
                        className="relative h-full flex items-center"
                        onMouseEnter={() => item.children && toggleDesktopSection(item.label)}
                        onMouseLeave={() => item.children && toggleDesktopSection(item.label)}
                    >
                        {item.children ? (
                            <button
                                onClick={() => item.to && handleNavigation(item.to)}
                                className={`flex items-center gap-1 px-4 py-2 text-sm font-semibold transition-colors duration-200 
                                            ${expandedDesktopSection === item.label ? 'text-[#A3D1FF] bg-white/5' : 'text-white hover:text-[#A3D1FF]'} 
                                            ${item.to ? 'cursor-pointer' : 'cursor-default'}`}
                                aria-expanded={expandedDesktopSection === item.label}
                                style={{ borderRadius: '0px' }} 
                            >
                                {item.label}
                                <ChevronDown 
                                    className={`w-3 h-3 transition-transform ${expandedDesktopSection === item.label ? 'rotate-180 text-[#A3D1FF]' : ''}`} 
                                    aria-hidden="true"
                                />
                            </button>
                        ) : (
                            <Link
                                to={item.to || '/'}
                                className={`flex items-center gap-1 px-4 py-2 text-sm font-semibold transition-colors duration-200 text-white hover:text-[#A3D1FF]`}
                                onClick={() => setExpandedDesktopSection(null)}
                                style={{ borderRadius: '0px' }} 
                            >
                                {item.label}
                                {item.badge && (
                                    <span className="ml-1 px-2 py-0.5 bg-[#A3D1FF] text-black rounded-none text-[10px] font-bold uppercase tracking-wider">
                                        {item.badge}
                                    </span>
                                )}
                            </Link>
                        )}
                        
                        {/* Desktop Mega Menu Dropdown */}
                        <AnimatePresence>
                            {item.children && expandedDesktopSection === item.label && (
                                <MegaMenuDropdown item={item} toggle={toggleDesktopSection} />
                            )}
                        </AnimatePresence>
                    </div>
                ))}
            </nav>
            
            {/* Contact Button & Mobile Menu Button */}
            <div className="flex items-center gap-4">
                {/* Desktop CTA Button - Hidden on mobile */}
                <a
                    href={calendlyUXAuditLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hidden lg:inline-flex items-center px-5 py-2 text-sm font-bold bg-[#A3D1FF] text-black 
                                hover:bg-white transition-all duration-300 relative z-50 shadow-lg rounded-none"
                >
                    Book Free Audit
                    <ArrowRight className="ml-2 w-4 h-4" />
                </a>

                {/* Mobile Menu Button - Visible only on mobile */}
                <button 
                  onClick={() => setMenuOpen(!isMenuOpen)}
                  className="p-2 text-white hover:text-[#A3D1FF] transition-colors lg:hidden"
                  aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                  aria-expanded={isMenuOpen}
                  title={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                >
                    <AnimatePresence mode="wait">
                      {isMenuOpen ? (
                        <motion.div
                          key="close"
                          initial={{ rotate: -90, opacity: 0 }}
                          animate={{ rotate: 0, opacity: 1 }}
                          exit={{ rotate: 90, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <X className="w-6 h-6" />
                        </motion.div>
                      ) : (
                        <motion.div
                          key="menu"
                          initial={{ rotate: 90, opacity: 0 }}
                          animate={{ rotate: 0, opacity: 1 }}
                          exit={{ rotate: -90, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <MenuIcon className="w-6 h-6" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay - Hidden on desktop (hidden lg:block removed, uses lg:hidden) */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              ref={menuRef}
              className="fixed inset-0 bg-black/95 backdrop-blur-lg overflow-y-auto lg:hidden"
              style={{ top: '5rem', height: 'calc(100vh - 5rem)', marginTop: '0', paddingTop: '0' }}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              transition={{ duration: 0.3 }}
            >
              <div className="h-full overflow-y-auto">
                <div className="container-custom py-8 px-6">
                  <nav className="space-y-0" aria-label="Main Navigation">
                    {/* Explicit Home Link */}
                    <Link
                       to="/"
                       className="block px-4 py-3 text-xl font-semibold text-white hover:text-[#A3D1FF] hover:bg-white/5 transition-colors duration-200 border-b border-white/10"
                       onClick={() => setMenuOpen(false)}
                       style={{ borderRadius: '0px' }}
                    >
                       Home
                    </Link>
                    
                    {navigationLinks.map((item) => (
                      <div key={item.label} className="border-b border-white/10 last:border-b-0">
                        {item.children ? (
                            // Mobile Dropdown Section (Accordion)
                          <div className="space-y-0">
                            <button
                              onClick={() => toggleMobileSection(item.label)}
                              className="w-full flex items-center justify-between px-4 py-3 text-xl font-semibold text-white hover:text-[#A3D1FF] transition-colors hover:bg-white/5"
                              aria-expanded={expandedMobileSection === item.label}
                              aria-controls={`mobile-menu-${item.label.toLowerCase().replace(/\s/g, '-')}`}
                              style={{ borderRadius: '0px' }}
                            >
                              {item.label}
                              <ChevronDown 
                                className={`w-5 h-5 transition-transform duration-300 ${
                                  expandedMobileSection === item.label ? 'rotate-180 text-[#A3D1FF]' : ''
                                }`} 
                                aria-hidden="true"
                              />
                            </button>
                            <AnimatePresence initial={false}>
                              {expandedMobileSection === item.label && (
                                <motion.div 
                                  id={`mobile-menu-${item.label.toLowerCase().replace(/\s/g, '-')}`}
                                  className="pl-4 pb-4 overflow-hidden"
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: 'auto', opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.3 }}
                                >
                                  {item.children.map((section, idx) => (
                                    <div key={idx} className="mt-4">
                                      <h3 className="text-sm font-bold uppercase tracking-wider text-[#A3D1FF] px-4 pt-2 pb-1">
                                        {section.title}
                                      </h3>
                                      <ul className="space-y-1">
                                        {section.items.map((subItem, subIdx) => (
                                          <li key={subIdx}>
                                            <Link
                                              to={subItem.to}
                                              className="block px-4 py-2 text-base text-gray-300 hover:text-white hover:bg-white/10 transition-colors group flex items-center gap-2"
                                              onClick={() => setMenuOpen(false)}
                                              style={{ borderRadius: '0px' }}
                                            >
                                                <Icons.ArrowRight className="w-4 h-4 text-[#A3D1FF] opacity-70 group-hover:opacity-100 transition-opacity" />
                                                <span className='flex-1'>{subItem.label}</span>
                                            </Link>
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  ))}
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        ) : (
                            // Simple Link (Blog, About, Contact)
                          <Link
                            to={item.to || '/'}
                            className="flex items-center justify-between px-4 py-3 text-xl font-semibold text-white hover:text-[#A3D1FF] hover:bg-white/5 transition-colors duration-200"
                            onClick={() => setMenuOpen(false)}
                            style={{ borderRadius: '0px' }}
                          >
                            <span>{item.label}</span>
                            {item.badge && (
                                <span className="ml-2 px-2 py-0.5 bg-[#A3D1FF] text-black rounded-none text-xs font-bold uppercase tracking-wider">
                                    {item.badge}
                                </span>
                            )}
                          </Link>
                        )}
                      </div>
                    ))}
                  </nav>

                  {/* Mobile Footer/Social Links */}
                  <div className="mt-12 px-4 space-y-4 border-t border-white/10 pt-6">
                    <a 
                      href="https://www.linkedin.com/in/portfolio2/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-gray-300 hover:text-[#0077B5] transition-colors text-lg"
                      aria-label="Marc Friedman's LinkedIn profile"
                      onClick={() => setMenuOpen(false)}
                    >
                      <Linkedin className="w-6 h-6" aria-hidden="true" />
                      <span>LinkedIn</span>
                    </a>
                    <a 
                      href={calendlyUXAuditLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-gray-300 hover:text-[#00A2FF] transition-colors text-lg"
                      aria-label="Schedule a call with Marc Friedman"
                      onClick={() => setMenuOpen(false)}
                    >
                      <Calendar className="w-6 h-6" aria-hidden="true" />
                      <span>Schedule a Call</span>
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Main Content */}
      <main className="relative pt-20"> {/* Increased padding top to account for the header height */}
        <Outlet />
      </main>

      {/* Footer (No changes needed, but included for completeness) */}
      <footer className="bg-[#1b1b1b] border-t border-white/10">
        <div className="container-custom section-spacing-sm mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-12">
            {/* Brand Section */}
            <div>
              <div className="mb-6">
                <img 
                  src="/images/marc-friedman-primary.svg" 
                  alt="Marc Friedman logo - Full Stack Designer & Developer" 
                  className="h-12 sm:h-16 w-auto object-contain mb-4 pt-2"
                  width="80"
                  height="32"
                />
                <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
                  Full-stack design and development solutions that transform your vision into exceptional digital experiences.
                </p>
              </div>
              
              {/* Social Links */}
              <div className="flex gap-3">
                <a 
                  href="https://www.linkedin.com/in/portfolio2/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-[#2d3035] flex items-center justify-center text-gray-400 hover:text-[#0077B5] hover:bg-[#0077B5]/10 transition-all group rounded-none"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </a>
                <a 
                  href={calendlyUXAuditLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-[#2d3035] flex items-center justify-center text-gray-400 hover:text-[#00A2FF] hover:bg-[#00A2FF]/10 transition-all group rounded-none"
                  aria-label="Schedule a Call"
                >
                  <Calendar className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </a>
                <a 
                  href="https://www.awwwards.com/marc-friedman/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-[#2d3035] flex items-center justify-center text-gray-400 hover:text-[#FFB800] hover:bg-[#FFB800]/10 transition-all group rounded-none"
                  aria-label="Awwwards"
                >
                  <Trophy className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </a>
              </div>
            </div>
            
            {/* Services */}
            <div>
              <h3 className="text-white font-semibold mb-6 text-lg">Services</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/services/web-development"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Web Development
                  </Link>
                </li>
                <li>
                  <Link
                    to="/services/design"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    UI/UX Design
                  </Link>
                </li>
                <li>
                  <Link
                    to="/services/saas"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    SaaS Development
                  </Link>
                </li>
                <li>
                  <Link
                    to="/services/api"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    API Development
                  </Link>
                </li>
                <li>
                  <Link
                    to="/services/startup-mvp"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Startup MVP
                  </Link>
                </li>
                <li>
                  <Link
                    to="/services/mentorship"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Mentorship
                  </Link>
                </li>
              </ul>
            </div>
            
            {/* Portfolio */}
            <div>
              <h3 className="text-white font-semibold mb-6 text-lg">Portfolio & Work</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/work"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    All Projects
                  </Link>
                </li>
                <li>
                  <Link
                    to="/work/case-studies/binns-media"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Binns Media Group
                  </Link>
                </li>
                <li>
                  <Link
                    to="/work/case-studies/untapped-africa"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Untapped Africa
                  </Link>
                </li>
                <li>
                  <Link
                    to="/work/case-studies/automarginx"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    AutoMarginX
                  </Link>
                </li>
                <li>
                  <Link
                    to="/work/case-studies/ask-africa"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Ask Africa
                  </Link>
                </li>
                {/* Dribbble Link */}
                <li>
                  <a 
                    href="https://dribbble.com/marcf9199/about?utm_source=Clipboard_%22clipboard_about%22&utm_campaign=%22marcf9199%22&utm_content=%22About%20marcf9199%22&utm_medium=Social_Share"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-gray-400 hover:text-[#EA4C89] transition-colors group"
                    aria-label="View Marc Friedman's Dribbble profile"
                  >
                    <Award className="w-5 h-5 group-hover:scale-110 transition-transform" aria-hidden="true" />
                    <span>Dribbble</span>
                  </a>
                </li>
              </ul>
            </div>
            
            {/* Free Tools */}
            <div>
              <h3 className="text-white font-semibold mb-6 text-lg">Free Tools</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/tools/website-analyzer"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Website Analyzer
                  </Link>
                </li>
                <li>
                  <Link
                    to="/tools/roi-calculator"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    ROI Calculator
                  </Link>
                </li>
                <li>
                  <Link
                    to="/tools/project-timeline"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Project Timeline
                  </Link>
                </li>
                <li>
                  <Link
                    to="/tools/ai-crawler-optimization"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    AI Optimization
                  </Link>
                </li>
              </ul>
            </div>
            
            {/* Company & Legal */}
            <div>
              <h3 className="text-white font-semibold mb-6 text-lg">Company & Resources</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/about"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    About Marc
                  </Link>
                </li>
                <li>
                  <Link
                    to="/blog"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Blog & Insights
                  </Link>
                </li>
                <li>
                  <Link
                    to="/press"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Press & Media
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <a 
                    href="mailto:marcf@marcfriedmanwebdesign.com"
                    className="text-gray-400 hover:text-[#A3D1FF] transition-colors block text-sm mt-4"
                  >
                    marcf@marcfriedmanwebdesign.com
                  </a>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-white/10 text-center text-gray-400">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <p className="text-sm">© {new Date().getFullYear()} Marc Friedman. All rights reserved.</p>
                <div className="flex items-center gap-2 text-xs">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  <span>Available for new projects</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-4 text-sm">
                <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy</Link>
                <Link to="/terms-and-conditions" className="hover:text-white transition-colors">Terms</Link>
                <a href="/accessibility-statement.html" className="hover:text-white transition-colors">Accessibility</a>
                <Link to="/cookies-policy" className="hover:text-white transition-colors">Cookies</Link>
                <Link to="/disclaimer" className="hover:text-white transition-colors">Disclaimer</Link>
                <a href="#" className="termly-display-preferences hover:text-white transition-colors">Consent Preferences</a>
                <a href="https://app.termly.io/notify/03f555bd-c705-46c1-a042-acea6d9e1ddf" className="hover:text-white transition-colors">Do Not Sell My Info</a>
                <a href="https://app.termly.io/notify/03f555bd-c705-46c1-a042-acea6d9e1ddf" className="hover:text-white transition-colors">Limit Use of Sensitive Info</a>
                <a href="/sitemap.xml" className="hover:text-white transition-colors">Sitemap</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}