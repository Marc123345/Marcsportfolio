import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, ArrowRight, Clock, Bookmark } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface SearchResult {
  title: string;
  description: string;
  url: string;
  type: 'page' | 'blog' | 'service' | 'tool';
  category?: string;
}

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const searchData: SearchResult[] = [
  // Pages
  { title: 'Portfolio', description: 'View our featured projects and case studies', url: '/work', type: 'page' },
  { title: 'About Marc', description: 'Learn about Marc Friedman and his expertise', url: '/about', type: 'page' },
  { title: 'Contact', description: 'Get in touch for your project', url: '/contact', type: 'page' },
  
  // Services
  { title: 'Web Development', description: 'Custom websites and applications', url: '/services/web-development', type: 'service', category: 'Development' },
  { title: 'UI/UX Design', description: 'Beautiful, intuitive interfaces', url: '/services/design', type: 'service', category: 'Design' },
  { title: 'SaaS Development', description: 'End-to-end SaaS solutions', url: '/services/saas', type: 'service', category: 'Development' },
  { title: 'API Development', description: 'Robust APIs and integrations', url: '/services/api', type: 'service', category: 'Development' },
  { title: 'AI Integration', description: 'AI-powered solutions', url: '/services/ai-integration', type: 'service', category: 'Advanced' },
  { title: 'Cybersecurity', description: 'Comprehensive security solutions', url: '/services/cybersecurity', type: 'service', category: 'Advanced' },
  { title: 'Startup MVP', description: 'Validate and launch your idea', url: '/services/startup-mvp', type: 'service', category: 'Startup' },
  { title: 'Design Mentorship', description: 'Design mentorship and guidance', url: '/services/mentorship', type: 'service', category: 'Education' },
  
  // Tools
  { title: 'Website Analyzer', description: 'Get an instant analysis of your website', url: '/tools/website-analyzer', type: 'tool' },
  { title: 'ROI Calculator', description: 'Calculate your website investment returns', url: '/tools/roi-calculator', type: 'tool' },
  { title: 'Project Timeline', description: 'See our transparent development process', url: '/tools/project-timeline', type: 'tool' },
  { title: 'AI Optimization', description: 'Optimize your site for AI crawlers', url: '/tools/ai-crawler-optimization', type: 'tool' },
  
  // Blog posts
  { title: 'Progressive Web Apps', description: 'The best of both worlds', url: '/blog/progressive-web-apps', type: 'blog' },
  { title: 'AI Crawler Optimization', description: 'Complete guide to AI optimization', url: '/blog/optimizing-websites-for-ai-crawlers', type: 'blog' },
  { title: 'SaaS Web Design Future', description: 'Merging aesthetics with functionality', url: '/blog/future-of-saas-web-design', type: 'blog' },
  { title: 'Data-Driven Design Systems', description: 'Building scalable design systems', url: '/blog/building-data-driven-design-systems', type: 'blog' },
  { title: 'Mobile-First Design', description: 'Essential principles for developers', url: '/blog/mobile-first-design-principles', type: 'blog' },
  { title: 'Conversion Optimization', description: 'Proven techniques for 2025', url: '/blog/conversion-rate-optimization-techniques', type: 'blog' },
];

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  // Load recent searches from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('recent-searches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Handle search
  useEffect(() => {
    if (query.trim()) {
      const filtered = searchData.filter(item =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.description.toLowerCase().includes(query.toLowerCase()) ||
        item.category?.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filtered);
      setSelectedIndex(0);
    } else {
      setResults([]);
    }
  }, [query]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowDown':
          e.preventDefault();
          setSelectedIndex(prev => Math.min(prev + 1, results.length - 1));
          break;
        case 'ArrowUp':
          e.preventDefault();
          setSelectedIndex(prev => Math.max(prev - 1, 0));
          break;
        case 'Enter':
          e.preventDefault();
          if (results[selectedIndex]) {
            handleSelect(results[selectedIndex]);
          }
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, results, selectedIndex, onClose]);

  const handleSelect = (result: SearchResult) => {
    // Save to recent searches
    const newRecent = [result.title, ...recentSearches.filter(s => s !== result.title)].slice(0, 5);
    setRecentSearches(newRecent);
    localStorage.setItem('recent-searches', JSON.stringify(newRecent));
    
    // Navigate and close
    navigate(result.url);
    onClose();
    setQuery('');
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'service': return '🛠️';
      case 'tool': return '⚡';
      case 'blog': return '📝';
      case 'page': return '📄';
      default: return '🔍';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'service': return 'text-blue-400';
      case 'tool': return 'text-green-400';
      case 'blog': return 'text-purple-400';
      case 'page': return 'text-gray-400';
      default: return 'text-gray-400';
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
        
        <motion.div
          className="relative w-full max-w-2xl bg-[#1b1b1b] rounded-xl border border-white/10 shadow-2xl overflow-hidden"
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Search Input */}
          <div className="flex items-center p-4 border-b border-white/10">
            <Search className="w-5 h-5 text-gray-400 mr-3" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search services, tools, blog posts..."
              className="flex-1 bg-transparent text-white placeholder-gray-400 focus:outline-none"
            />
            <button
              onClick={onClose}
              className="p-2 min-w-[44px] min-h-[44px] flex items-center justify-center text-gray-400 hover:text-white transition-colors"
              aria-label="Close search"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Search Results */}
          <div className="max-h-96 overflow-y-auto">
            {query.trim() ? (
              results.length > 0 ? (
                <div className="p-2">
                  {results.map((result, index) => (
                    <button
                      key={result.url}
                      onClick={() => handleSelect(result)}
                      className={`w-full text-left p-3 rounded-lg transition-colors ${
                        index === selectedIndex
                          ? 'bg-[#A3D1FF]/10 border border-[#A3D1FF]/30'
                          : 'hover:bg-white/5'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-lg">{getTypeIcon(result.type)}</span>
                          <div>
                            <h3 className="text-white font-medium">{result.title}</h3>
                            <p className="text-sm text-gray-400">{result.description}</p>
                            {result.category && (
                              <span className={`text-xs ${getTypeColor(result.type)}`}>
                                {result.category}
                              </span>
                            )}
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-gray-400" />
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center">
                  <p className="text-gray-400">No results found for "{query}"</p>
                  <p className="text-sm text-gray-500 mt-2">
                    Try searching for services, tools, or blog topics
                  </p>
                </div>
              )
            ) : (
              <div className="p-4">
                {recentSearches.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-sm font-medium text-gray-400 mb-3 flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      Recent Searches
                    </h3>
                    <div className="space-y-1">
                      {recentSearches.map((search, index) => (
                        <button
                          key={index}
                          onClick={() => setQuery(search)}
                          className="block w-full text-left px-3 py-2 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                        >
                          {search}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                
                <div>
                  <h3 className="text-sm font-medium text-gray-400 mb-3 flex items-center gap-2">
                    <Bookmark className="w-4 h-4" />
                    Quick Access
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { title: 'Portfolio', url: '/work', icon: '💼' },
                      { title: 'Contact', url: '/contact', icon: '📞' },
                      { title: 'Website Analyzer', url: '/tools/website-analyzer', icon: '🔍' },
                      { title: 'Blog', url: '/blog', icon: '📝' },
                    ].map((item) => (
                      <button key={item.url} onClick={() => { navigate(item.url); onClose(); }} className="mr_btn mr_btn_outline">
                        <span>{item.title}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-3 border-t border-white/10 bg-[#2d3035]">
            <div className="flex items-center justify-between text-xs text-gray-400">
              <div className="flex items-center gap-4">
                <span>↑↓ Navigate</span>
                <span>↵ Select</span>
                <span>Esc Close</span>
              </div>
              <span>Search powered by Marc Friedman</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}