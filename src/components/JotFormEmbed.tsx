import React, { useEffect, useRef } from 'react';

export default function JotFormEmbed() {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const handleIFrameMessage = (e: MessageEvent) => {
      if (typeof e.data === 'string' && e.data.indexOf('setHeight') > -1) {
        const args = e.data.split(':');
        const iframe = iframeRef.current;
        if (iframe && args.length > 1) {
          iframe.style.height = args[1] + 'px';
        }
      }
    };

    window.addEventListener('message', handleIFrameMessage);

    return () => {
      window.removeEventListener('message', handleIFrameMessage);
    };
  }, []);

  return (
    <iframe
      ref={iframeRef}
      title="Contact Form"
      allow="geolocation; microphone; camera"
      src="https://form.jotform.com/253586719410462"
      frameBorder="0"
      style={{
        width: '100%',
        minHeight: '800px',
        border: 'none',
      }}
      scrolling="no"
    />
  );
}
