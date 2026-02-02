import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MessageCircle, Star, Calendar } from 'lucide-react';
import ContactForm from './ContactForm';

export default function FloatingChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'contact' | 'calendar'>('contact');

  return (
    <>
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, duration: 0.5, type: 'spring' }}
      >
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-white text-black px-4 py-3 rounded-lg shadow-xl whitespace-nowrap font-semibold"
        >
          Start Your Project
        </motion.div>

        <motion.button
          onClick={() => setIsOpen(true)}
          className="relative w-16 h-16 rounded-full overflow-hidden shadow-2xl border-2 border-[#A3D1FF] hover:border-white transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Open contact form"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#A3D1FF] to-[#6EA8E0] animate-pulse opacity-75" />

          <img
            src="https://ik.imagekit.io/qcvroy8xpd/1747758113853.jpeg"
            alt="Marc Friedman"
            className="relative w-full h-full object-cover"
            loading="lazy"
          />

          <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white" />

          <div className="absolute top-0 right-0 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
            <MessageCircle className="w-3 h-3" />
          </div>
        </motion.button>

        <div className="absolute inset-0 rounded-full bg-[#A3D1FF] animate-ping opacity-20 pointer-events-none" />
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 backdrop-blur-md z-[60] flex items-center justify-center p-4 overflow-y-auto"
            onClick={(e) => {
              if (e.target === e.currentTarget) setIsOpen(false);
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 25 }}
              className="bg-[#1b1b1b] rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto relative"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 bg-[#1b1b1b] border-b border-white/10 z-10">
                <div className="px-6 py-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <img
                        src="https://ik.imagekit.io/qcvroy8xpd/1747758113853.jpeg"
                        alt="Marc Friedman"
                        className="w-12 h-12 rounded-full object-cover border-2 border-[#A3D1FF]"
                        loading="lazy"
                      />
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-[#1b1b1b]" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-white">Marc Friedman</h2>
                      <p className="text-sm text-gray-400">Usually replies within 24 hours</p>
                    </div>
                  </div>

                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 hover:bg-white/5 rounded-lg transition-colors"
                    aria-label="Close contact form"
                  >
                    <X className="w-6 h-6 text-gray-400 hover:text-white transition-colors" />
                  </button>
                </div>

                <div className="flex border-t border-white/10">
                  <button
                    onClick={() => setActiveTab('contact')}
                    className={`flex-1 px-6 py-3 text-sm font-medium transition-colors flex items-center justify-center gap-2 ${
                      activeTab === 'contact'
                        ? 'text-white bg-white/5 border-b-2 border-[#A3D1FF]'
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <MessageCircle className="w-4 h-4" />
                    Contact Form
                  </button>
                  <button
                    onClick={() => setActiveTab('calendar')}
                    className={`flex-1 px-6 py-3 text-sm font-medium transition-colors flex items-center justify-center gap-2 ${
                      activeTab === 'calendar'
                        ? 'text-white bg-white/5 border-b-2 border-[#A3D1FF]'
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <Calendar className="w-4 h-4" />
                    Book a Meeting
                  </button>
                </div>
              </div>

              <div className="p-6">
                {activeTab === 'contact' ? (
                  <>
                    <div className="mb-6">
                      <h3 className="text-2xl font-bold text-white mb-2">
                        Ready to bring your vision to life?
                      </h3>
                      <p className="text-gray-400">
                        Fill out the form below and I'll get back to you within 24 hours to discuss your project.
                      </p>
                    </div>

                    <div className="mb-8 bg-[#2d3035] rounded-xl p-6 border border-white/10">
                      <h4 className="text-lg font-bold text-white mb-4 text-center">
                        20+ Verified 5 Star Reviews
                      </h4>

                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-white mb-1">5.0</div>
                          <div className="flex items-center justify-center gap-0.5 mb-1">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                            ))}
                          </div>
                          <div className="text-xs text-gray-400">Google</div>
                        </div>

                        <div className="text-center">
                          <div className="text-2xl font-bold text-white mb-1">4.9</div>
                          <div className="flex items-center justify-center gap-0.5 mb-1">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                            ))}
                          </div>
                          <div className="text-xs text-gray-400">Clutch</div>
                        </div>

                        <div className="text-center">
                          <div className="text-2xl font-bold text-white mb-1">4.5</div>
                          <div className="flex items-center justify-center gap-0.5 mb-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-3 h-3 ${i < 4 ? 'fill-yellow-400 text-yellow-400' : 'fill-yellow-400/50 text-yellow-400/50'}`}
                              />
                            ))}
                          </div>
                          <div className="text-xs text-gray-400">DesignRush</div>
                        </div>

                        <div className="text-center">
                          <div className="text-2xl font-bold text-white mb-1">4.9</div>
                          <div className="flex items-center justify-center gap-0.5 mb-1">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                            ))}
                          </div>
                          <div className="text-xs text-gray-400">LinkedIn</div>
                        </div>
                      </div>

                      <div className="border-t border-white/10 pt-4">
                        <p className="text-sm text-gray-400 text-center mb-3">Trusted by:</p>
                        <div className="flex items-center justify-center gap-6 flex-wrap">
                          <div className="w-20 h-8 bg-white/5 rounded flex items-center justify-center">
                            <span className="text-xs text-gray-400">Client</span>
                          </div>
                          <div className="w-20 h-8 bg-white/5 rounded flex items-center justify-center">
                            <span className="text-xs text-gray-400">Client</span>
                          </div>
                          <div className="w-20 h-8 bg-white/5 rounded flex items-center justify-center">
                            <span className="text-xs text-gray-400">Client</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <ContactForm />
                  </>
                ) : (
                  <>
                    <div className="mb-6">
                      <h3 className="text-2xl font-bold text-white mb-2">
                        Schedule Your Free Consultation
                      </h3>
                      <p className="text-gray-400">
                        Book a 30-minute meeting to discuss your project goals and see how I can help bring your vision to life.
                      </p>
                    </div>

                    <div className="bg-white rounded-xl overflow-hidden" style={{ height: '650px' }}>
                      <iframe
                        src="https://calendly.com/marc-friedman-web-design--meeting-link/30min"
                        width="100%"
                        height="100%"
                        frameBorder="0"
                        title="Schedule a meeting with Marc Friedman"
                        allow="payment"
                        loading="lazy"
                      ></iframe>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
