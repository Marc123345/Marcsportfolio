import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';
import { FORM_SUBMIT_COOLDOWN_MS } from '@/lib/constants';

interface FormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
}

export default function ContactForm() {
  const isMountedRef = useRef(true);
  const lastSubmitTimeRef = useRef<number>(0);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    message: '',
  });

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    // Phone validation - optional but if provided must be valid
    if (formData.phone.trim()) {
      // Remove common formatting characters for validation
      const cleanPhone = formData.phone.replace(/[\s\-()	+.]/g, '');
      // Check if it contains only digits and is a reasonable length (7-15 digits)
      if (!/^\d{7,15}$/.test(cleanPhone)) {
        newErrors.phone = 'Please enter a valid phone number (7-15 digits)';
      }
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Rate limiting: prevent submissions within cooldown period
    const now = Date.now();
    const timeSinceLastSubmit = now - lastSubmitTimeRef.current;
    const cooldownPeriod = FORM_SUBMIT_COOLDOWN_MS;

    if (timeSinceLastSubmit < cooldownPeriod) {
      const remainingSeconds = Math.ceil((cooldownPeriod - timeSinceLastSubmit) / 1000);
      toast.error(`Please wait ${remainingSeconds} seconds before submitting again.`);
      return;
    }

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase.from('contact_submissions').insert([
        {
          name: formData.name,
          email: formData.email,
          phone: formData.phone || null,
          company: formData.company || null,
          service: formData.service || null,
          message: formData.message,
          status: 'new',
        },
      ]);

      if (error) throw error;

      if (!isMountedRef.current) return;

      // Update last submit time for rate limiting
      lastSubmitTimeRef.current = now;

      setIsSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        service: '',
        message: '',
      });

      setTimeout(() => {
        if (isMountedRef.current) {
          setIsSuccess(false);
        }
      }, 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
      if (isMountedRef.current) {
        toast.error('There was an error submitting your form. Please try again.');
      }
    } finally {
      if (isMountedRef.current) {
        setIsSubmitting(false);
      }
    }
  };

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-12"
      >
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-white mb-2">Thank You!</h3>
        <p className="text-gray-400">
          Your message has been received. I'll get back to you within 24 hours.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full px-4 py-3 bg-[#2d3035] border ${
              errors.name ? 'border-red-500' : 'border-white/10'
            } rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#A3D1FF] transition-colors`}
            placeholder="John Doe"
          />
          {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-4 py-3 bg-[#2d3035] border ${
              errors.email ? 'border-red-500' : 'border-white/10'
            } rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#A3D1FF] transition-colors`}
            placeholder="john@example.com"
          />
          {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-[#2d3035] border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#A3D1FF] transition-colors"
            placeholder="+1 (555) 123-4567"
          />
        </div>

        <div>
          <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-2">
            Company Name
          </label>
          <input
            type="text"
            id="company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-[#2d3035] border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#A3D1FF] transition-colors"
            placeholder="Your Company"
          />
        </div>
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
          className="w-full px-4 py-3 bg-[#2d3035] border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#A3D1FF] transition-colors"
        >
          <option value="">Select a service</option>
          <option value="web-development">Web Development</option>
          <option value="ui-ux-design">UI/UX Design</option>
          <option value="saas-development">SaaS Development</option>
          <option value="api-integration">API Integration</option>
          <option value="design-systems">Design Systems</option>
          <option value="ai-integration">AI Integration</option>
          <option value="cybersecurity">Cybersecurity</option>
          <option value="fractional-cmo">Fractional CMO</option>
          <option value="mentorship">Mentorship</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
          Project Details <span className="text-red-500">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={6}
          className={`w-full px-4 py-3 bg-[#2d3035] border ${
            errors.message ? 'border-red-500' : 'border-white/10'
          } rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#A3D1FF] transition-colors resize-none`}
          placeholder="Tell me about your project, goals, timeline, and budget..."
        />
        {errors.message && <p className="mt-1 text-sm text-red-500">{errors.message}</p>}
      </div>

      <motion.button
        type="submit"
        disabled={isSubmitting}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full md:w-auto px-8 py-4 bg-[#A3D1FF] text-black font-semibold rounded-lg hover:bg-[#8bc5ff] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isSubmitting ? (
          <>
            <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
            Sending...
          </>
        ) : (
          <>
            <Send className="w-5 h-5" />
            Send Message
          </>
        )}
      </motion.button>
    </form>
  );
}
