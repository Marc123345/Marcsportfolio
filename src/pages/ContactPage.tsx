import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Calendar, Linkedin, Send } from 'lucide-react';
import { motion } from 'framer-motion';
import TextReveal from '@/components/TextReveal';
import HoverCard3D from '@/components/HoverCard3D';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

const contactSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "name": "Contact Marc Friedman - High-Converting Websites for Agencies & Businesses",
  "description": "Get your free quote for high-performance React/Node websites built to attract, convert, and close clients. Specializing in agencies, local businesses, and jewellery brands.",
  "url": "https://www.marcfriedmanportfolio.com/contact",
  "provider": {
    "@type": "Person",
    "name": "Marc Friedman",
    "jobTitle": "Full Stack Developer & Web Designer",
    "url": "https://www.marcfriedmanportfolio.com",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Tel Aviv",
      "addressCountry": "IL"
    }
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "sales",
    "availableLanguage": ["English"]
  }
};

export default function ContactPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Calendly link for UX Audit
  const calendlyUXAuditLink = "https://calendly.com/marc-friedman-web-design--meeting-link/30min";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('contact_submissions')
        .insert([{
          name: formData.name,
          email: formData.email,
          phone: formData.phone || null,
          company: formData.company || null,
          service: formData.service || null,
          message: formData.message,
          status: 'new'
        }]);

      if (error) throw error;

      toast.success('Message sent successfully! We\'ll get back to you within 24 hours.');
      setFormData({ name: '', email: '', phone: '', company: '', service: '', message: '' });
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.8, 
        ease: [0.22, 1, 0.36, 1],
        delay: custom * 0.1
      }
    })
  };

  return (
    <>
      <Helmet>
        <title>Contact Marc Friedman - Get Your Free Quote for High-Converting Websites</title>
        <meta name="description" content="Get your free quote for high-performance React/Node websites built to attract, convert, and close clients. Specializing in agencies, local businesses, and jewellery brands." />
        <script type="application/ld+json">
          {JSON.stringify(contactSchema)}
        </script>
      </Helmet>

      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 bg-black">
        <motion.div 
          className="max-w-3xl mx-auto"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
        >
          <motion.h1
            className="text-4xl sm:text-5xl font-bold text-white mb-6"
            variants={fadeInUp}
            custom={0}
          >
            Let's Build Your High-Converting Website
          </motion.h1>
          <motion.h2
            className="text-xl sm:text-2xl text-[#A3D1FF] mb-6"
            variants={fadeInUp}
            custom={1}
          >
            Websites that attract, convert, and close clients for agencies, local businesses & jewellery brands
          </motion.h2>
          <motion.div 
            className="flex flex-wrap gap-4"
            variants={fadeInUp}
            custom={2}
          >
            <a href={calendlyUXAuditLink} target="_blank" rel="noopener noreferrer" className="mr_btn mr_btn_outline">
              <span>Book Free Strategy Call</span>
            </a>
            <a href="https://www.linkedin.com/in/portfolio2/" target="_blank" rel="noopener noreferrer" className="mr_btn mr_btn_outline">
              <span>Connect on LinkedIn</span>
            </a>
          </motion.div>
        </motion.div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <HoverCard3D className="bg-[#1b1b1b] p-8 rounded-xl border border-white/10">
            <TextReveal>
              <h2 className="text-2xl font-bold text-white mb-6">Get Your Free Project Quote</h2>
            </TextReveal>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-[#2d3035] border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#A3D1FF] focus:border-transparent transition-all"
                  placeholder="Your full name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-[#2d3035] border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#A3D1FF] focus:border-transparent transition-all"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#2d3035] border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#A3D1FF] focus:border-transparent transition-all"
                  placeholder="+1 (555) 000-0000"
                />
              </div>

              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-2">
                  Company
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#2d3035] border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#A3D1FF] focus:border-transparent transition-all"
                  placeholder="Your company name"
                />
              </div>

              <div>
                <label htmlFor="service" className="block text-sm font-medium text-gray-300 mb-2">
                  Service Interested In
                </label>
                <select
                  id="service"
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#2d3035] border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#A3D1FF] focus:border-transparent transition-all"
                >
                  <option value="">Select a service</option>
                  <option value="Agency Website">Agency Website</option>
                  <option value="Local Business Website">Local Business Website</option>
                  <option value="Jewellery Brand Website">Jewellery Brand Website</option>
                  <option value="E-commerce Development">E-commerce Development</option>
                  <option value="Web Development">Web Development</option>
                  <option value="UI/UX Design">UI/UX Design</option>
                  <option value="SaaS Development">SaaS Development</option>
                  <option value="API Development">API Development</option>
                  <option value="Design Systems">Design Systems</option>
                  <option value="Headless Shopify">Headless Shopify</option>
                  <option value="Startup MVP">Startup MVP</option>
                  <option value="AI Integration">AI Integration</option>
                  <option value="Brand Design">Brand Design</option>
                  <option value="Fractional CMO">Fractional CMO</option>
                  <option value="Mentorship">Mentorship</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 bg-[#2d3035] border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#A3D1FF] focus:border-transparent transition-all resize-none"
                  placeholder="Tell us about your project..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#A3D1FF] text-black font-semibold px-6 py-3 rounded-lg hover:bg-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </HoverCard3D>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#1b1b1b]">
        <div className="max-w-7xl mx-auto">
          <TextReveal>
            <h2 className="text-3xl font-bold text-white mb-8 text-center">What to Expect</h2>
          </TextReveal>
          <div className="grid md:grid-cols-3 gap-8">
            <HoverCard3D className="bg-[#2d3035] p-6 rounded-xl border border-white/10">
              <div className="bg-[#A3D1FF]/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <span className="text-[#A3D1FF] text-xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Initial Consultation</h3>
              <p className="text-gray-400">
                <strong className="text-white">24-hour response time</strong> guaranteed. We'll discuss your business goals, target audience, and project requirements to ensure we're aligned.
              </p>
            </HoverCard3D>
            <HoverCard3D className="bg-[#2d3035] p-6 rounded-xl border border-white/10">
              <div className="bg-[#A3D1FF]/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <span className="text-[#A3D1FF] text-xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Proposal & Strategy</h3>
              <p className="text-gray-400">
                You'll receive a <strong className="text-white">detailed proposal</strong> outlining the project scope, timeline, and investment with <strong className="text-white">clear deliverables</strong>.
              </p>
            </HoverCard3D>
            <HoverCard3D className="bg-[#2d3035] p-6 rounded-xl border border-white/10">
              <div className="bg-[#A3D1FF]/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <span className="text-[#A3D1FF] text-xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Execution & Launch</h3>
              <p className="text-gray-400">
                We'll work collaboratively through design, development, and launch with <strong className="text-white">weekly updates</strong> and a <strong className="text-white">transparent process</strong>.
              </p>
            </HoverCard3D>
          </div>
        </div>
      </section>
    </>
  );
}