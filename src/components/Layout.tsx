import React, { useState, useEffect, useRef } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Menu as MenuIcon, X, ChevronDown, Linkedin, Calendar, Trophy, ArrowRight, Globe, Palette, Award, ShoppingCart } from 'lucide-react';
import { useAppStore } from '@/stores/useAppStore';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
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
        title: 'Services',
        items: [
          {
            label: 'Web Development',
            to: '/services/web-development',
            description: 'Custom websites and applications'
          }
        ]
      }
    ]
  },
  {
    label: 'Work',
    to: '/work'
  },
  { label: 'Blog', to: '/blog' },
  { label: 'About', to: '/about' },
  {
    label: 'Tools',
    children: [
      {
        title: 'Free Tools',
        items: [
          {
            label: 'Website Analyzer',
            to: '/tools/website-analyzer',
            description: 'Analyze your website performance'
          },
          {
            label: 'ROI Calculator',
            to: '/tools/roi-calculator',
            description: 'Calculate your ROI'
          },
          {
            label: 'AI Website Crawler',
            to: '/tools/ai-website-crawler',
            description: 'Optimize for AI search'
          },
          {
            label: 'Project Timeline',
            to: '/tools/project-timeline',
            description: 'Estimate project timeline'
          }
        ]
      }
    ]
  },
  { label: 'Contact', to: '/contact', badge: 'Free Consultation' }
];

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
      
      // Determine if we should show/hide header based on scroll direction
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setIsHeaderVisible(false);
      } else {
        setIsHeaderVisible(true);
      }
      
      // Update scroll state for styling
      setIsScrolled(currentScrollY > 20);
      
      // Update last scroll position
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
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setMenuOpen]);

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
        <script type="text/javascript" src="https://widget.clutch.co/static/js/widget.js"></script>
      </Helmet>

      {/* Navigation */}
      <motion.header 
        ref={headerRef}
        className={`fixed w-full z-50 transition-all duration-300 ${
          isScrolled ? 'bg-[#1b1b1b]/95 backdrop-blur-md shadow-md' : 'bg-transparent'
        }`}
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
          zIndex: 50
        }}
      >
        <div className="container-custom">
          <div className="flex items-center justify-between h-[4.236rem]">
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
                    className="h-12 sm:h-16 md:h-20 lg:h-24 w-auto object-contain pt-2 sm:pt-3 md:pt-4"
                    loading="eager"
                    width="80"
                    height="32"
                  />
                </button>
              </MagneticButton>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8" aria-label="Main Navigation">
              {navigationLinks.map((item) => (
                <div key={item.label} className="relative">
                  {item.children ? (
                    <div
                      className="relative"
                      onMouseEnter={() => setExpandedDesktopSection(item.label)}
                      onMouseLeave={() => setExpandedDesktopSection(null)}
                    >
                      <button
                        className="text-white hover:text-[#A3D1FF] transition-colors font-medium flex items-center gap-1"
                        aria-expanded={expandedDesktopSection === item.label}
                      >
                        {item.label}
                        <ChevronDown className="w-4 h-4" />
                      </button>

                      <AnimatePresence>
                        {expandedDesktopSection === item.label && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            transition={{ duration: 0.2 }}
                            className="absolute top-full left-0 mt-2 w-[600px] bg-[#1b1b1b]/95 backdrop-blur-md rounded-lg shadow-2xl border border-white/10 p-6 z-50"
                          >
                            <div className="grid grid-cols-1 gap-6">
                              {item.children.map((section, idx) => (
                                <div key={idx}>
                                  <h3 className="text-sm font-semibold text-[#A3D1FF] mb-3">
                                    {section.title}
                                  </h3>
                                  <div className="grid grid-cols-2 gap-2">
                                    {section.items.map((subItem, subIdx) => (
                                      <Link
                                        key={subIdx}
                                        to={subItem.to}
                                        className="block px-3 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/5 transition-colors group"
                                        onClick={() => setExpandedDesktopSection(null)}
                                      >
                                        <span className="block font-medium group-hover:text-[#A3D1FF] transition-colors text-sm">
                                          {subItem.label}
                                        </span>
                                        {subItem.description && (
                                          <span className="block text-xs text-gray-400 mt-1">
                                            {subItem.description}
                                          </span>
                                        )}
                                      </Link>
                                    ))}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link
                      to={item.to || '/'}
                      className="text-white hover:text-[#A3D1FF] transition-colors font-medium flex items-center gap-2"
                    >
                      {item.label}
                      {item.badge && (
                        <span className="px-2 py-1 bg-[#A3D1FF]/10 text-[#A3D1FF] rounded-full text-xs">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  )}
                </div>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <div className="flex lg:hidden items-center gap-4">
              <button
                onClick={() => setMenuOpen(!isMenuOpen)}
                className="p-2 text-white hover:text-[#A3D1FF] transition-colors"
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

        {/* Menu Overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              ref={menuRef}
              className="fixed inset-0 bg-black/95 backdrop-blur-lg overflow-y-auto"
              style={{ top: '4.236rem', height: 'calc(100vh - 4.236rem)' }}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <div className="h-full overflow-y-auto">
                <div className="container-custom py-[1.618rem]">
                  <nav className="space-y-[1.618rem]" aria-label="Main Navigation">
                    <Link
                      to="/"
                      className="block px-4 py-[0.618rem] text-lg font-semibold text-white hover:text-[#A3D1FF] transition-colors"
                      onClick={() => setMenuOpen(false)}
                    >
                      Home
                    </Link>
                    {navigationLinks.map((item) => (
                      <div key={item.label}>
                        {item.children ? (
                          <div className="space-y-[1.618rem]">
                            <button
                              onClick={() => toggleMobileSection(item.label)}
                              className="w-full flex items-center justify-between px-4 py-[0.618rem] text-lg font-semibold text-white hover:text-[#A3D1FF] transition-colors"
                              aria-expanded={expandedMobileSection === item.label}
                              aria-controls={`menu-${item.label.toLowerCase()}`}
                            >
                              {item.label}
                              <ChevronDown 
                                className={`w-5 h-5 transition-transform duration-300 ${
                                  expandedMobileSection === item.label ? 'rotate-180' : ''
                                }`} 
                                aria-hidden="true"
                              />
                            </button>
                            <AnimatePresence>
                              {expandedMobileSection === item.label && (
                                <motion.div 
                                  id={`menu-${item.label.toLowerCase()}`}
                                  className="pl-4 space-y-[1.618rem]"
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: 'auto', opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.3 }}
                                >
                                  {item.children.map((section, idx) => (
                                    <div key={idx}>
                                      <div className="px-4 py-2">
                                        <h3 className="text-sm font-semibold text-[#A3D1FF] mb-1">
                                          {section.title}
                                        </h3>
                                        {section.description && (
                                          <p className="text-xs text-gray-500">{section.description}</p>
                                        )}
                                      </div>
                                      <ul className="space-y-[0.618rem]">
                                        {section.items.map((subItem, subIdx) => (
                                          <li key={subIdx}>
                                            <Link
                                              to={subItem.to}
                                              className="block px-4 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/5 transition-colors group"
                                              onClick={() => setMenuOpen(false)}
                                            >
                                              <div className="flex items-center justify-between">
                                                <span className="block font-medium group-hover:text-[#A3D1FF] transition-colors">{subItem.label}</span>
                                                <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                                              </div>
                                              {subItem.description && (
                                                <span className="block text-sm text-gray-400 mt-1">
                                                  {subItem.description}
                                                </span>
                                              )}
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
                          <Link
                            to={item.to || '/'}
                            className="flex items-center justify-between px-4 py-[0.618rem] text-lg font-semibold text-white hover:text-[#A3D1FF] transition-colors"
                            onClick={() => setMenuOpen(false)}
                          >
                            <span>{item.label}</span>
                            <div className="flex items-center gap-2">
                              {item.badge && (
                                <span className="px-2 py-1 bg-[#A3D1FF]/10 text-[#A3D1FF] rounded-full text-xs">
                                  {item.badge}
                                </span>
                              )}
                              {item.popular && (
                                <span className="px-2 py-1 bg-green-500/10 text-green-400 rounded-full text-xs">
                                  Popular
                                </span>
                              )}
                            </div>
                          </Link>
                        )}
                      </div>
                    ))}
                  </nav>

                  {/* Social Links */}
                  <div className="mt-[2.618rem] px-4 space-y-[1.618rem]">
                    <a
                      href="https://www.linkedin.com/in/portfolio2/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-gray-300 hover:text-[#0077B5] transition-colors"
                      aria-label="Marc Friedman's LinkedIn profile"
                      onClick={() => setMenuOpen(false)}
                    >
                      <Linkedin className="w-5 h-5" aria-hidden="true" />
                      <span>LinkedIn</span>
                    </a>
                    <a
                      href="https://www.behance.net/marcfriedmanweb"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-gray-300 hover:text-[#1769FF] transition-colors"
                      aria-label="Marc Friedman's Behance profile"
                      onClick={() => setMenuOpen(false)}
                    >
                      <Palette className="w-5 h-5" aria-hidden="true" />
                      <span>Behance</span>
                    </a>
                    <a
                      href={calendlyUXAuditLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-gray-300 hover:text-[#00A2FF] transition-colors"
                      aria-label="Schedule a call with Marc Friedman"
                      onClick={() => setMenuOpen(false)}
                    >
                      <Calendar className="w-5 h-5" aria-hidden="true" />
                      <span>Schedule a Call</span>
                    </a>
                    <a
                      href="https://www.awwwards.com/marc-friedman/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-gray-300 hover:text-[#FFB800] transition-colors"
                      aria-label="Marc Friedman's Awwwards profile"
                      onClick={() => setMenuOpen(false)}
                    >
                      <Trophy className="w-5 h-5" aria-hidden="true" />
                      <span>Awwwards</span>
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Main Content */}
      <main className="relative pt-[4.236rem]">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-[#1b1b1b] border-t border-white/10">
        <div className="container-custom section-spacing-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
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
                  className="w-10 h-10 bg-[#2d3035] rounded-lg flex items-center justify-center text-gray-400 hover:text-[#0077B5] hover:bg-[#0077B5]/10 transition-all group"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </a>
                <a
                  href="https://www.behance.net/marcfriedmanweb"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-[#2d3035] rounded-lg flex items-center justify-center text-gray-400 hover:text-[#1769FF] hover:bg-[#1769FF]/10 transition-all group"
                  aria-label="Behance"
                >
                  <Palette className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </a>
                <a
                  href={calendlyUXAuditLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-[#2d3035] rounded-lg flex items-center justify-center text-gray-400 hover:text-[#00A2FF] hover:bg-[#00A2FF]/10 transition-all group"
                  aria-label="Schedule a Call"
                >
                  <Calendar className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </a>
                <a
                  href="https://www.awwwards.com/marc-friedman/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-[#2d3035] rounded-lg flex items-center justify-center text-gray-400 hover:text-[#FFB800] hover:bg-[#FFB800]/10 transition-all group"
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
              </ul>
            </div>
            
            {/* Work */}
            <div>
              <h3 className="text-white font-semibold mb-6 text-lg">Work</h3>
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
              </ul>
            </div>
            
            {/* Resources */}
            <div>
              <h3 className="text-white font-semibold mb-6 text-lg">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/blog"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <a
                    href="https://www.behance.net/marcfriedmanweb"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Behance
                  </a>
                </li>
                <li>
                  <a
                    href="https://dribbble.com/marcf9199/about"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Dribbble
                  </a>
                </li>
                <li>
                  <a
                    href="https://clutch.co/profile/marc-friedman-design-agency"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Clutch Reviews
                  </a>
                </li>
              </ul>
            </div>
            
            {/* Company */}
            <div>
              <h3 className="text-white font-semibold mb-6 text-lg">Company</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/about"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    About
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
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Email Us
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Clutch Widget */}
          <div className="mt-12 pt-8 border-t border-white/10 flex justify-center">
            <div
              className="clutch-widget"
              data-url="https://widget.clutch.co"
              data-widget-type="1"
              data-height="40"
              data-nofollow="false"
              data-expandifr="true"
              data-scale="100"
              data-clutchcompany-id="2527093"
            ></div>
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
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}