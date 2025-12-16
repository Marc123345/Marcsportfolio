import { Helmet } from 'react-helmet-async';
import { useEffect } from 'react';

export default function TermsAndConditionsPage() {
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
        <title>Terms and Conditions - Marc Friedman</title>
        <meta name="description" content="Terms and Conditions for using Marc Friedman's website and services. Please read these terms carefully before using our services." />
        <meta name="robots" content="index, follow" />
      </Helmet>

      <div className="min-h-screen bg-white pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            name="termly-embed"
            data-id="21b76714-8853-4019-8254-9a6ca0f9e545"
          />
        </div>
      </div>
    </>
  );
}
