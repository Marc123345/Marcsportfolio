import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import TextReveal from '@/components/TextReveal';
import HoverCard3D from '@/components/HoverCard3D';
import JotFormEmbed from '@/components/JotFormEmbed';

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
  // Calendly link for UX Audit
  const calendlyUXAuditLink = "https://calendly.com/marc-friedman-web-design--meeting-link/30min";

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
            className="font-heading text-[clamp(2.2rem,4vw,3rem)] font-semibold tracking-[-0.01em] text-white leading-[1.15] mb-6"
            variants={fadeInUp}
            custom={0}
          >
            Let's Build Your High-Converting Website
          </motion.h1>
          <motion.h2
            className="font-body text-xl sm:text-2xl text-[#A3D1FF] mb-6"
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

            <JotFormEmbed />
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