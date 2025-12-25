import React, { useEffect } from 'react';

export default function JotFormEmbed() {
  useEffect(() => {
    // Load JotForm script dynamically
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://form.jotform.com/jsform/253586719410462';
    script.async = true;
    
    const container = document.getElementById('jotform-container');
    if (container) {
      container.appendChild(script);
    }

    // Cleanup function to remove script when component unmounts
    return () => {
      if (container && container.contains(script)) {
        container.removeChild(script);
      }
    };
  }, []);

  return (
    <div id="jotform-container" className="w-full" />
  );
}
