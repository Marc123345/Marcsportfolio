import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import WebDevelopmentPage from './services/WebDevelopmentPage';
import AIIntegrationPage from './services/AIIntegrationPage';
import APIPage from './services/APIPage';

// Service schema for structured data
const servicesSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Digital Design & Development Services - Marc Friedman",
  "description": "Expert web development and AI integration services. Transform your digital presence with custom solutions that drive real results.",
  "provider": {
    "@type": "Person",
    "name": "Marc Friedman",
    "jobTitle": "Full Stack Designer & Developer",
    "url": "https://marcfriedmanportfolio.com"
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
        "name": "AI Integration",
        "description": "AI-powered solutions and integrations"
      },
      {
        "@type": "Offer",
        "name": "API Development",
        "description": "Scalable API solutions and integrations"
      }
    ]
  }
};

export default function ServicesPage() {
  return (
    <>
      <Helmet>
        <title>Digital Design & Development Services - Marc Friedman</title>
        <meta name="description" content="Transform your digital presence with expert web development, AI integration, and API development services. Custom solutions that drive real results for your business." />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Digital Design & Development Services - Marc Friedman" />
        <meta property="og:description" content="Transform your digital presence with expert web development, AI integration, and API development services. Custom solutions that drive real results for your business." />
        <meta property="og:image" content="https://marcfriedmanportfolio.com/og-image.jpg" />
        <meta property="og:url" content="https://marcfriedmanportfolio.com/services" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Digital Design & Development Services - Marc Friedman" />
        <meta name="twitter:description" content="Transform your digital presence with expert web development, AI integration, and API development services. Custom solutions that drive real results for your business." />
        <meta name="twitter:image" content="https://marcfriedmanportfolio.com/og-image.jpg" />

        {/* Additional SEO meta tags */}
        <meta name="keywords" content="web development, API development, digital services, AI integration, custom software development" />
        <meta name="author" content="Marc Friedman" />
        <link rel="canonical" href="https://www.marcfriedmanportfolio.com/services" />

        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(servicesSchema)}
        </script>
      </Helmet>

      <Routes>
        <Route path="web-development" element={<WebDevelopmentPage />} />
        <Route path="ai-integration" element={<AIIntegrationPage />} />
        <Route path="api" element={<APIPage />} />
        <Route path="*" element={<Navigate to="/services" replace />} />
      </Routes>
    </>
  );
}