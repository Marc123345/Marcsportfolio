import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, BookOpen, Download, CheckCircle, ArrowRight, Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';
import { FORM_SUBMIT_COOLDOWN_MS } from '@/lib/constants';

const OVERLAY_DELAY_MS = 45000;
const DISMISS_STORAGE_KEY = 'ebook-overlay-dismissed';
const DOWNLOAD_STORAGE_KEY = 'ebook-already-downloaded';
const EBOOK_PATH = '/ebooks/Landing_Page_Lead_Magnet_(1).pdf';

export default function EbookOverlay() {
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const lastSubmitRef = useRef<number>(0);
  const isMountedRef = useRef(true);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
  });

  useEffect(() => {
    isMountedRef.current = true;
    return () => { isMountedRef.current = false; };
  }, []);

  useEffect(() => {
    const wasDismissed = sessionStorage.getItem(DISMISS_STORAGE_KEY);
    const alreadyDownloaded = localStorage.getItem(DOWNLOAD_STORAGE_KEY);

    if (wasDismissed || alreadyDownloaded) return;

    timerRef.current = setTimeout(() => {
      if (isMountedRef.current) {
        setIsVisible(true);
      }
    }, OVERLAY_DELAY_MS);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const handleClose = useCallback(() => {
    setIsVisible(false);
    sessionStorage.setItem(DISMISS_STORAGE_KEY, 'true');
  }, []);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isVisible) handleClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isVisible, handleClose]);

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const triggerDownload = () => {
    const link = document.createElement('a');
    link.href = EBOOK_PATH;
    link.download = 'Landing-Page-Persuasion-Guide.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const now = Date.now();
    if (now - lastSubmitRef.current < FORM_SUBMIT_COOLDOWN_MS) {
      toast.error('Please wait before submitting again.');
      return;
    }

    setIsSubmitting(true);
    lastSubmitRef.current = now;

    try {
      const { error } = await supabase.from('ebook_leads').insert({
        name: formData.name.trim(),
        email: formData.email.trim(),
        company: formData.company.trim(),
        ebook_slug: 'landing-page-persuasion',
      });

      if (error) throw error;

      if (isMountedRef.current) {
        setIsSuccess(true);
        localStorage.setItem(DOWNLOAD_STORAGE_KEY, 'true');
        triggerDownload();
      }
    } catch {
      if (isMountedRef.current) {
        toast.error('Something went wrong. Please try again.');
      }
    } finally {
      if (isMountedRef.current) {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[70] flex items-center justify-center p-4"
          onClick={handleClose}
        >
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-2xl bg-[#1b1b1b] border border-white/10 rounded-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5 text-gray-400" />
            </button>

            {!isSuccess ? (
              <div className="flex flex-col md:flex-row">
                <div className="md:w-5/12 bg-gradient-to-br from-[#A3D1FF]/15 to-[#A3D1FF]/5 p-8 flex flex-col justify-center">
                  <div className="w-14 h-14 rounded-xl bg-[#A3D1FF]/10 border border-[#A3D1FF]/20 flex items-center justify-center mb-6">
                    <BookOpen className="w-7 h-7 text-[#A3D1FF]" />
                  </div>
                  <span className="text-xs font-semibold tracking-wider uppercase text-[#A3D1FF] mb-3">
                    Free Download
                  </span>
                  <h2 className="text-2xl font-bold text-white leading-tight mb-3">
                    The Art of Landing Page Persuasion
                  </h2>
                  <p className="text-sm text-gray-400 leading-relaxed mb-6">
                    Learn the proven techniques top brands use to turn visitors into customers.
                  </p>
                  <ul className="space-y-3">
                    {[
                      'Psychology-backed copy frameworks',
                      'High-converting layout patterns',
                      'Real-world A/B test results',
                      'CTA optimization strategies',
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-sm text-gray-300">
                        <ArrowRight className="w-4 h-4 text-[#A3D1FF] mt-0.5 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="md:w-7/12 p-8">
                  <h3 className="text-lg font-semibold text-white mb-1">
                    Get your free copy
                  </h3>
                  <p className="text-sm text-gray-400 mb-6">
                    Enter your details and we'll send it right to your inbox.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                    <div>
                      <label htmlFor="ebook-name" className="sr-only">Full Name</label>
                      <input
                        id="ebook-name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Full name *"
                        className={`w-full px-4 py-3 rounded-lg bg-[#2d3035] border text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#A3D1FF] transition-colors ${
                          errors.name ? 'border-red-500' : 'border-white/10'
                        }`}
                      />
                      {errors.name && (
                        <p className="mt-1.5 text-xs text-red-400">{errors.name}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="ebook-email" className="sr-only">Email Address</label>
                      <input
                        id="ebook-email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email address *"
                        className={`w-full px-4 py-3 rounded-lg bg-[#2d3035] border text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#A3D1FF] transition-colors ${
                          errors.email ? 'border-red-500' : 'border-white/10'
                        }`}
                      />
                      {errors.email && (
                        <p className="mt-1.5 text-xs text-red-400">{errors.email}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="ebook-company" className="sr-only">Company</label>
                      <input
                        id="ebook-company"
                        name="company"
                        type="text"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="Company (optional)"
                        className="w-full px-4 py-3 rounded-lg bg-[#2d3035] border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#A3D1FF] transition-colors"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-[#A3D1FF] text-black font-semibold text-sm hover:bg-[#92bce6] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Download className="w-4 h-4" />
                          Download Free Ebook
                        </>
                      )}
                    </button>

                    <p className="text-xs text-gray-500 text-center leading-relaxed">
                      No spam, ever. Your info stays private.
                    </p>
                  </form>
                </div>
              </div>
            ) : (
              <div className="p-12 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', damping: 15, stiffness: 200, delay: 0.1 }}
                  className="w-20 h-20 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center mx-auto mb-6"
                >
                  <CheckCircle className="w-10 h-10 text-green-400" />
                </motion.div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  Your ebook is downloading!
                </h3>
                <p className="text-gray-400 mb-8 max-w-sm mx-auto">
                  If the download didn't start automatically, click the button below.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <button
                    onClick={triggerDownload}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[#A3D1FF] text-black font-semibold text-sm hover:bg-[#92bce6] transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    Download Again
                  </button>
                  <button
                    onClick={handleClose}
                    className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-white/10 text-gray-300 font-medium text-sm hover:bg-white/5 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
