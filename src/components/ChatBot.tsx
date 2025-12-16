import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, MessageCircle, Calendar, CheckCircle2, Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface Message {
  id: string;
  type: 'bot' | 'user';
  text: string;
  timestamp: Date;
}

interface LeadData {
  projectType: string;
  name: string;
  email: string;
  budget: string;
}

type ConversationStep = 'welcome' | 'projectType' | 'name' | 'email' | 'budget' | 'complete';

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentStep, setCurrentStep] = useState<ConversationStep>('welcome');
  const [leadData, setLeadData] = useState<Partial<LeadData>>({});
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Calendly link - using the one from ContactPage
  const calendlyLink = "https://calendly.com/marc-friedman-web-design--meeting-link/30min";

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setTimeout(() => {
        addBotMessage("Hi there! 👋 I'm here to help you get started with your project. What type of project are you interested in?");
        setCurrentStep('projectType');
      }, 500);
    }
  }, [isOpen]);

  const addBotMessage = (text: string) => {
    setIsTyping(true);
    setTimeout(() => {
      const newMessage: Message = {
        id: Date.now().toString(),
        type: 'bot',
        text,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, newMessage]);
      setIsTyping(false);
    }, 800);
  };

  const addUserMessage = (text: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      text,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleProjectTypeSelect = (type: string) => {
    addUserMessage(type);
    setLeadData(prev => ({ ...prev, projectType: type }));
    setTimeout(() => {
      addBotMessage("Great choice! What's your name?");
      setCurrentStep('name');
    }, 1000);
  };

  const handleInputSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const value = inputValue.trim();
    setInputValue('');
    setError(null);

    switch (currentStep) {
      case 'name':
        addUserMessage(value);
        setLeadData(prev => ({ ...prev, name: value }));
        setTimeout(() => {
          addBotMessage(`Nice to meet you, ${value}! What's the best email to reach you?`);
          setCurrentStep('email');
        }, 1000);
        break;

      case 'email':
        if (!validateEmail(value)) {
          setError('Please enter a valid email address');
          return;
        }
        addUserMessage(value);
        setLeadData(prev => ({ ...prev, email: value }));
        setTimeout(() => {
          addBotMessage("What's your estimated budget for this project?");
          setCurrentStep('budget');
        }, 1000);
        break;

      case 'budget':
        addUserMessage(value);
        setLeadData(prev => ({ ...prev, budget: value }));

        const finalLeadData: LeadData = {
          projectType: leadData.projectType!,
          name: leadData.name!,
          email: leadData.email!,
          budget: value
        };

        await submitLead(finalLeadData);
        break;

      default:
        break;
    }
  };

  const submitLead = async (data: LeadData) => {
    setIsSubmitting(true);

    try {
      // Submit to Edge Function
      const apiUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/submit-lead`;
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error('Failed to submit lead');
      }

      const result = await response.json();

      setCurrentStep('complete');
      setTimeout(() => {
        addBotMessage(
          `Perfect! I've received your information, ${data.name}. Our team will review your ${data.projectType} project and get back to you at ${data.email} within 24 hours. Would you like to schedule a call right now to discuss your project in detail?`
        );
      }, 1000);
    } catch (err) {
      console.error('Error submitting lead:', err);
      setError('There was an error submitting your information. Please try again.');
      addBotMessage("I'm sorry, there was an error submitting your information. Please try again or contact us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const projectTypes = [
    { value: 'Website Design & Development', label: '🌐 Website Design & Development', description: 'Full custom website' },
    { value: 'Branding & Design', label: '🎨 Branding & Design', description: 'Logo, identity, style guide' },
    { value: 'MVP Development', label: '🚀 MVP Development', description: 'Rapid prototype for startups' },
    { value: 'Other', label: '💡 Other', description: 'Something else in mind' }
  ];

  return (
    <>
      {/* Chat Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 bg-[#A3D1FF] text-black p-4 rounded-full shadow-2xl hover:bg-[#92bce6] transition-colors"
            aria-label="Open chat"
          >
            <MessageCircle className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-6 right-6 z-50 w-[400px] max-w-[calc(100vw-3rem)] h-[600px] max-h-[calc(100vh-3rem)] bg-[#1b1b1b] border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#A3D1FF] to-[#7db3e6] p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 backdrop-blur rounded-full flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Marc Friedman Design</h3>
                  <p className="text-xs text-white/80">Usually replies instantly</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/20 rounded-full transition-colors"
                aria-label="Close chat"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-black">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl ${
                      message.type === 'user'
                        ? 'bg-[#A3D1FF] text-black rounded-br-sm'
                        : 'bg-[#2d3035] text-white rounded-bl-sm'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                  </div>
                </motion.div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-[#2d3035] p-3 rounded-2xl rounded-bl-sm">
                    <div className="flex gap-1">
                      <motion.div
                        className="w-2 h-2 bg-gray-400 rounded-full"
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                      />
                      <motion.div
                        className="w-2 h-2 bg-gray-400 rounded-full"
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                      />
                      <motion.div
                        className="w-2 h-2 bg-gray-400 rounded-full"
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Project Type Options */}
              {currentStep === 'projectType' && !isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="grid grid-cols-1 gap-2"
                >
                  {projectTypes.map((type) => (
                    <motion.button
                      key={type.value}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleProjectTypeSelect(type.value)}
                      className="bg-[#2d3035] hover:bg-[#3d4045] border border-white/10 hover:border-[#A3D1FF] p-3 rounded-xl text-left transition-all group"
                    >
                      <div className="font-medium text-white text-sm mb-1">{type.label}</div>
                      <div className="text-xs text-gray-400">{type.description}</div>
                    </motion.button>
                  ))}
                </motion.div>
              )}

              {/* Complete - Schedule Call CTA */}
              {currentStep === 'complete' && !isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-3"
                >
                  <motion.a
                    href={calendlyLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center justify-center gap-2 bg-[#A3D1FF] hover:bg-[#92bce6] text-black font-semibold p-4 rounded-xl transition-all"
                  >
                    <Calendar className="w-5 h-5" />
                    Schedule a Call Now
                  </motion.a>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setIsOpen(false)}
                    className="w-full bg-[#2d3035] hover:bg-[#3d4045] text-white p-3 rounded-xl transition-all text-sm"
                  >
                    I'll do it later
                  </motion.button>
                </motion.div>
              )}

              {isSubmitting && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center justify-center gap-2 text-[#A3D1FF]"
                >
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span className="text-sm">Submitting your information...</span>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            {currentStep !== 'projectType' && currentStep !== 'complete' && (
              <form onSubmit={handleInputSubmit} className="p-4 bg-[#1b1b1b] border-t border-white/10">
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-2 text-red-400 text-xs flex items-center gap-1"
                  >
                    <span>⚠️</span>
                    {error}
                  </motion.div>
                )}
                <div className="flex gap-2">
                  <input
                    ref={inputRef}
                    type={currentStep === 'email' ? 'email' : 'text'}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder={
                      currentStep === 'name'
                        ? 'Type your name...'
                        : currentStep === 'email'
                        ? 'your@email.com'
                        : 'e.g., $5,000 - $10,000'
                    }
                    className="flex-1 bg-[#2d3035] text-white px-4 py-3 rounded-xl border border-white/10 focus:border-[#A3D1FF] focus:outline-none transition-colors placeholder-gray-500"
                    disabled={isSubmitting}
                    autoFocus
                  />
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    disabled={isSubmitting || !inputValue.trim()}
                    className="bg-[#A3D1FF] hover:bg-[#92bce6] disabled:bg-gray-600 disabled:cursor-not-allowed text-black p-3 rounded-xl transition-colors"
                  >
                    <Send className="w-5 h-5" />
                  </motion.button>
                </div>
              </form>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
