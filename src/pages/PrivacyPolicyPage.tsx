import { Helmet } from 'react-helmet-async';
import { useEffect } from 'react';

export default function PrivacyPolicyPage() {
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
        <title>Privacy Policy - Marc Friedman</title>
        <meta name="description" content="Privacy Policy for Marc Friedman's website. Learn how we collect, use, and protect your personal information." />
        <meta name="robots" content="index, follow" />
      </Helmet>

      <div className="min-h-screen bg-white pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            name="termly-embed"
            data-id="03f555bd-c705-46c1-a042-acea6d9e1dff"
          />
        </div>
      </div>
    </>
  );
}
