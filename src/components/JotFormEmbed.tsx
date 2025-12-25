import React, { useEffect, useRef } from 'react';

export default function JotFormEmbed() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scriptRef = useRef<HTMLScriptElement | null>(null);

  useEffect(() => {
    // Generate a unique ID for this instance to avoid conflicts
    const uniqueId = `jotform-container-${Math.random().toString(36).substr(2, 9)}`;
    
    if (containerRef.current) {
      containerRef.current.id = uniqueId;
      
      // Load JotForm script dynamically
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = 'https://form.jotform.com/jsform/253586719410462';
      script.async = true;
      
      containerRef.current.appendChild(script);
      scriptRef.current = script;
    }

    // Cleanup function to remove script when component unmounts
    return () => {
      if (scriptRef.current && containerRef.current && containerRef.current.contains(scriptRef.current)) {
        containerRef.current.removeChild(scriptRef.current);
      }
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full" />
  );
}
