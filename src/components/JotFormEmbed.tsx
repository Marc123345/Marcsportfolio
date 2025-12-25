"use client";

import React, { useEffect } from 'react';

export default function JotFormEmbed() {
  useEffect(() => {
    // 1. Function to initialize the form handler
    const initJotForm = () => {
      const win = window as any;
      if (win.jotformEmbedHandler) {
        win.jotformEmbedHandler(
          "iframe[id='JotFormIFrame-253586719410462']", 
          "https://form.jotform.com/"
        );
      }
    };

    // 2. Check if script is already present in document
    const scriptId = 'jotform-handler-script';
    let script = document.getElementById(scriptId) as HTMLScriptElement;

    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.src = "https://cdn.jotfor.ms/s/umd/latest/for-form-embed-handler.js";
      script.async = true;
      script.onload = initJotForm;
      document.body.appendChild(script);
    } else {
      // If already loaded, just re-run the handler
      initJotForm();
    }
  }, []);

  return (
    <iframe
      id="JotFormIFrame-253586719410462"
      title="Marc Friedman Contact Form"
      onLoad={() => window.parent.scrollTo(0, 0)}
      allowTransparency={true}
      allow="geolocation; microphone; camera; fullscreen; payment"
      src="https://form.jotform.com/253586719410462"
      frameBorder="0"
      style={{
        minWidth: '100%',
        maxWidth: '100%',
        height: '539px',
        border: 'none',
      }}
      scrolling="no"
    />
  );
}