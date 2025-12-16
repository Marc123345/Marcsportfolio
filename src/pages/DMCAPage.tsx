import { Helmet } from 'react-helmet-async';
import { useEffect } from 'react';

export default function DMCAPage() {
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.id = 'termly-jssdk';
    script.src = 'https://app.termly.io/embed-policy.min.js';

    const firstScript = document.getElementsByTagName('script')[0];
    if (firstScript && firstScript.parentNode && !document.getElementById('termly-jssdk')) {
      firstScript.parentNode.insertBefore(script, firstScript);
    }

    return () => {
      const existingScript = document.getElementById('termly-jssdk');
      if (existingScript && existingScript.parentNode) {
        existingScript.parentNode.removeChild(existingScript);
      }
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>DMCA Policy - Marc Friedman</title>
        <meta name="description" content="DMCA Policy for Marc Friedman's website. Learn about our copyright infringement notification procedures." />
        <meta name="robots" content="index, follow" />
      </Helmet>

      <div className="min-h-screen bg-white pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            name="termly-embed"
            data-id="676ece57-8adb-4458-8337-876384d0b6e7"
          />
        </div>
      </div>
    </>
  );
}
