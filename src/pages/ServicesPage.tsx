import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import WebDevelopmentPage from './services/WebDevelopmentPage';
import DesignPage from './services/DesignPage';
import { StartupMVPPage, SaaSPage, FractionalCMOPage, DesignSystemsPage, ExternalWebDepartmentPage } from './services';
import MentorshipPage from './services/MentorshipPage';
import AIIntegrationPage from './services/AIIntegrationPage';
import CybersecurityPage from './services/CybersecurityPage';

// Service schema for structured data
const servicesSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Web Design Services Tel Aviv - Marc Friedman",
  "description": "Professional web designer in Tel Aviv offering expert web development, UI/UX design, and SaaS development services. Transform your digital presence with custom solutions that drive real results.",
  "provider": {
    "@type": "Person",
    "name": "Marc Friedman",
    "jobTitle": "Web Designer Tel Aviv | Full Stack Designer & Developer",
    "url": "https://marcfriedmanportfolio.com",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Tel Aviv",
      "addressRegion": "Tel Aviv District",
      "addressCountry": "IL"
    }
  },
  "offers": {
    "@type": "AggregateOffer",
    "offers": [
      {
        "@type": "Offer",
        "name": "Web Development",
        "description": "Custom website development with modern technologies"
      },
      {
        "@type": "Offer",
        "name": "UI/UX Design",
        "description": "User-centered design solutions"
      },
      {
        "@type": "Offer",
        "name": "SaaS Development",
        "description": "End-to-end SaaS platform development"
      },
      {
        "@type": "Offer",
        "name": "Startup MVP",
        "description": "Rapid MVP development for startups"
      },
      {
        "@type": "Offer",
        "name": "Mentorship",
        "description": "UX/UI design mentorship and training"
      },
      {
        "@type": "Offer",
        "name": "AI Integration",
        "description": "AI-powered solutions and integrations"
      },
      {
        "@type": "Offer",
        "name": "Cybersecurity",
        "description": "Comprehensive security solutions and audits"
      },
      {
        "@type": "Offer",
        "name": "Fractional CMO Partner",
        "description": "Design & dev execution for go-to-market strategy"
      },
      {
        "@type": "Offer",
        "name": "External Web Department",
        "description": "Award-winning websites for multi-location and multi-brand companies"
      }
    ]
  }
};

export default function ServicesPage() {
  return (
    <>
      <Helmet>
        <title>Web Design Services Tel Aviv - Marc Friedman</title>
        <meta name="description" content="Professional web design and development services in Tel Aviv. Expert in UI/UX design, SaaS development, and custom websites that drive real results for your business." />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Web Design Services Tel Aviv - Marc Friedman" />
        <meta property="og:description" content="Professional web design and development services in Tel Aviv. Expert in UI/UX design, SaaS development, and custom websites that drive real results for your business." />
        <meta property="og:image" content="https://marcfriedmanportfolio.com/og-image.jpg" />
        <meta property="og:url" content="https://marcfriedmanportfolio.com/services" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Web Design Services Tel Aviv - Marc Friedman" />
        <meta name="twitter:description" content="Professional web design and development services in Tel Aviv. Expert in UI/UX design, SaaS development, and custom websites that drive real results for your business." />
        <meta name="twitter:image" content="https://marcfriedmanportfolio.com/og-image.jpg" />

        {/* Additional SEO meta tags */}
        <meta name="keywords" content="Web Designer Tel Aviv, web design Tel Aviv, web development Tel Aviv, UI/UX design, SaaS development, API development, startup MVP, mentorship, digital services, AI integration, cybersecurity" />
        <meta name="author" content="Marc Friedman" />
        <link rel="canonical" href="https://www.marcfriedmanportfolio.com/services" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(servicesSchema)}
        </script>
      </Helmet>

      <Routes>
        <Route path="web-development" element={<WebDevelopmentPage />} />
        <Route path="design" element={<DesignPage />} />
        <Route path="startup-mvp" element={<StartupMVPPage />} />
        <Route path="saas" element={<SaaSPage />} />
        <Route path="mentorship" element={<MentorshipPage />} />
        <Route path="ai-integration" element={<AIIntegrationPage />} />
        <Route path="cybersecurity" element={<CybersecurityPage />} />
        <Route path="design-systems" element={<DesignSystemsPage />} />
        <Route path="fractional-cmo" element={<FractionalCMOPage />} />
        <Route path="external-web-department" element={<ExternalWebDepartmentPage />} />
        <Route path="*" element={<Navigate to="/services" replace />} />
      </Routes>
    </>
  );
}