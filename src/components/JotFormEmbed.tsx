import React, { useEffect } from 'react';

export default function JotFormEmbed() {
  useEffect(() => {
    // Load JotForm iframe resize script
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://cdn.jotfor.ms/s/umd/latest/for-form-embed-handler.js';
    script.async = true;

    document.body.appendChild(script);

    // Listen for JotForm iframe messages
    const handleMessage = (e: MessageEvent) => {
      if (typeof e.data === 'object') return;
      const args = e.data.split(':');
      if (args.length > 2) {
        const iframe = document.getElementById('JotFormIFrame-' + args[args.length - 1]) as HTMLIFrameElement;
        if (iframe) {
          switch (args[0]) {
            case 'scrollIntoView':
              iframe.scrollIntoView();
              break;
            case 'setHeight':
              iframe.style.height = args[1] + 'px';
              break;
            case 'reloadPage':
              window.location.reload();
              break;
          }
        }
      }
    };

    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  return (
    <iframe
      id="JotFormIFrame-253586719410462"
      title="Contact Form"
      onLoad={() => {
        const iframe = document.getElementById('JotFormIFrame-253586719410462') as HTMLIFrameElement;
        if (iframe && iframe.contentWindow) {
          iframe.contentWindow.postMessage(JSON.stringify({ action: 'ready' }), '*');
        }
      }}
      allow="geolocation; microphone; camera; fullscreen"
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
