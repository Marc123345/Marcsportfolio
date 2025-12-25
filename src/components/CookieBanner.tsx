import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already accepted cookies
    const hasAcceptedCookies = localStorage.getItem('cookiesAccepted');
    if (!hasAcceptedCookies) {
      // Show banner after a short delay
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookiesAccepted', 'true');
    
    // Set secure cookie preferences
    document.cookie = 'cookieConsent=accepted; path=/; secure; samesite=strict; max-age=31536000';
    
    setIsVisible(false);
  };

  const declineCookies = () => {
    // Set declined flag and remove any tracking cookies
    localStorage.setItem('cookiesDeclined', 'true');
    document.cookie = 'cookieConsent=declined; path=/; secure; samesite=strict; max-age=31536000';
    
    // Clear any existing tracking cookies
    document.cookie = '_ga=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    document.cookie = '_gid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:bottom-4 md:max-w-md z-50 bg-[#1b1b1b] p-4 rounded-lg shadow-lg border border-white/10 animate-fade-in">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-white font-semibold text-base">Cookie Consent</h3>
        <button 
          onClick={() => setIsVisible(false)}
          className="text-gray-400 hover:text-white"
          aria-label="Close cookie banner"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
      <p className="text-gray-300 text-sm mb-4">
        We use cookies to enhance your browsing experience, analyze site traffic, and personalize content. 
        By clicking "Accept", you consent to our use of cookies.
      </p>
      <div className="flex flex-col sm:flex-row gap-2">
        <button
          onClick={acceptCookies}
          className="mr_btn mr_btn_primary text-sm"
        >
          <span>Accept All Cookies</span>
        </button>
        <button
          onClick={declineCookies}
          className="mr_btn mr_btn_outline text-sm"
        >
          <span>Decline Optional</span>
        </button>
        <Link
          to="/cookies-policy"
          className="text-[#A3D1FF] px-4 py-2 text-sm hover:underline"
        >
          Cookie Settings & Policy
        </Link>
      </div>
    </div>
  );
}