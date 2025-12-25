import React, { useState } from 'react';
import { ArrowRight, Loader2, CheckCircle2, AlertCircle, Search } from 'lucide-react';
import { toast } from 'sonner';
import { trackEvent } from '@/lib/plausible';

interface AnalysisResult {
  score: number;
  overview: string;
  design: {
    score: number;
    feedback: string;
    improvements: string[];
  };
  performance: {
    score: number;
    feedback: string;
    improvements: string[];
  };
  conversion: {
    score: number;
    feedback: string;
    improvements: string[];
  };
}

export default function AIWebsiteAnalyzer() {
  const [url, setUrl] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [showEmailForm, setShowEmailForm] = useState(false);

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!url) {
      toast.error('Please enter a valid website URL');
      return;
    }

    // Enhanced URL validation and sanitization
    let sanitizedUrl = url.trim();

    // Add protocol if missing
    if (!sanitizedUrl.startsWith('http://') && !sanitizedUrl.startsWith('https://')) {
      sanitizedUrl = 'https://' + sanitizedUrl;
    }

    try {
      const urlObj = new URL(sanitizedUrl);

      // Security check - only allow http/https protocols
      if (!['http:', 'https:'].includes(urlObj.protocol)) {
        toast.error('Please enter a valid HTTP or HTTPS URL');
        return;
      }

      // Check for suspicious patterns
      if (urlObj.hostname === 'localhost' || urlObj.hostname.includes('127.0.0.1')) {
        toast.error('Local URLs cannot be analyzed');
        return;
      }

    } catch (e) {
      toast.error('Please enter a valid URL including http:// or https://');
      return;
    }

    setIsAnalyzing(true);
    setError(null);

    try {
      // Call the edge function for real analysis
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

      const response = await fetch(`${supabaseUrl}/functions/v1/analyze-website`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${supabaseAnonKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: sanitizedUrl }),
      });

      if (!response.ok) {
        throw new Error('Analysis failed');
      }

      const data = await response.json();

      if (data.success && data.analysis) {
        setResult(data.analysis);
        setShowEmailForm(true);

        trackEvent('Website Analyzed', {
          props: {
            score: data.analysis.score.toString(),
            url: sanitizedUrl,
          },
        });
      } else {
        throw new Error('Invalid response format');
      }

      setIsAnalyzing(false);
    } catch (err) {
      console.error('Analysis error:', err);
      setError('An error occurred during analysis. Please try again.');
      setIsAnalyzing(false);
    }
  };

  const handleSendReport = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate and sanitize email
    const sanitizedEmail = email.trim().toLowerCase();

    if (!sanitizedEmail) {
      toast.error('Please enter your email address');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(sanitizedEmail)) {
      toast.error('Please enter a valid email address');
      return;
    }

    if (sanitizedEmail.length > 254) {
      toast.error('Email address is too long');
      return;
    }

    try {
      // Save to database with analysis scores
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

      let sanitizedUrl = url.trim();
      if (!sanitizedUrl.startsWith('http://') && !sanitizedUrl.startsWith('https://')) {
        sanitizedUrl = 'https://' + sanitizedUrl;
      }

      const response = await fetch(`${supabaseUrl}/functions/v1/analyze-website`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${supabaseAnonKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url: sanitizedUrl,
          email: sanitizedEmail,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save report');
      }

      trackEvent('Website Analysis Report Requested', {
        props: {
          url: sanitizedUrl,
        },
      });

      toast.success('Detailed report sent to your email!');
      setShowEmailForm(false);
    } catch (error) {
      console.error('Error saving report:', error);
      toast.error('Failed to send report. Please try again.');
    }
  };

  return (
    <div className="bg-[#1b1b1b] rounded-xl border border-white/10 overflow-hidden">
      <div className="p-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-[#A3D1FF]/10 p-3 rounded-lg">
            <Search className="w-6 h-6 text-[#A3D1FF]" />
          </div>
          <h3 className="text-2xl font-bold text-white">AI Website Analyzer</h3>
        </div>
        
        <p className="text-gray-400 mb-6">
          Get an instant AI-powered analysis of your website's design, performance, and conversion potential. Discover actionable improvements in seconds.
        </p>
        
        {!result ? (
          <form onSubmit={handleAnalyze} className="space-y-4">
            <div>
              <label htmlFor="website-url" className="block text-sm font-medium text-gray-300 mb-2">
                Enter your website URL
              </label>
              <input
                type="text"
                id="website-url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://yourcompany.com"
                className="w-full px-4 py-3 bg-[#2d3035] border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#A3D1FF] focus:border-transparent"
                disabled={isAnalyzing}
                required
                aria-required="true"
                aria-describedby="url-hint"
              />
              <p id="url-hint" className="text-xs text-gray-500 mt-1">
                Enter your full website URL including https://
              </p>
            </div>
            
            <button
              type="submit"
              disabled={isAnalyzing}
              className="mr_btn mr_btn_primary w-full disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Analyzing your website (this takes about 30 seconds)...</span>
                </>
              ) : (
                <>
                  <span>Get Free Website Analysis</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
            <p className="text-xs text-gray-500 text-center mt-3">
              ⚡ Results in 30 seconds • 🔍 Actionable insights • 📧 Optional detailed report
            </p>
            
            {error && (
              <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-5 h-5" />
                  {error}
                </div>
              </div>
            )}
          </form>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h4 className="text-xl font-semibold text-white">Analysis Results</h4>
              <div className="flex items-center gap-2">
                <span className="text-gray-400">Overall Score:</span>
                <span className="text-lg font-bold text-[#A3D1FF]">{result.score}/100</span>
              </div>
            </div>
            
            <p className="text-gray-300">{result.overview}</p>
            
            <div className="space-y-4">
              <div className="bg-[#2d3035] p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h5 className="font-semibold text-white">Design</h5>
                  <span className="text-[#A3D1FF]">{result.design.score}/100</span>
                </div>
                <p className="text-gray-400 text-sm mb-3">{result.design.feedback}</p>
                <div className="space-y-2">
                  {result.design.improvements.map((improvement, index) => (
                    <div key={index} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-[#A3D1FF] mt-0.5" />
                      <span className="text-gray-300">{improvement}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-[#2d3035] p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h5 className="font-semibold text-white">Performance</h5>
                  <span className="text-[#A3D1FF]">{result.performance.score}/100</span>
                </div>
                <p className="text-gray-400 text-sm mb-3">{result.performance.feedback}</p>
                <div className="space-y-2">
                  {result.performance.improvements.map((improvement, index) => (
                    <div key={index} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-[#A3D1FF] mt-0.5" />
                      <span className="text-gray-300">{improvement}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-[#2d3035] p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h5 className="font-semibold text-white">Conversion Potential</h5>
                  <span className="text-[#A3D1FF]">{result.conversion.score}/100</span>
                </div>
                <p className="text-gray-400 text-sm mb-3">{result.conversion.feedback}</p>
                <div className="space-y-2">
                  {result.conversion.improvements.map((improvement, index) => (
                    <div key={index} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-[#A3D1FF] mt-0.5" />
                      <span className="text-gray-300">{improvement}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {showEmailForm ? (
              <form onSubmit={handleSendReport} className="mt-6 p-4 bg-[#2d3035] rounded-lg">
                <h5 className="font-semibold text-white mb-3">Get Your Detailed Report</h5>
                <p className="text-gray-400 text-sm mb-4">
                  Get a comprehensive 5-page report with specific action items and priority recommendations.
                </p>
                <div className="flex gap-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="flex-1 px-4 py-2 bg-[#1b1b1b] border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#A3D1FF] focus:border-transparent"
                  />
                  <button
                    type="submit"
                    className="mr_btn mr_btn_primary whitespace-nowrap"
                  >
                    <span>Email My Report</span>
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  📧 Arrives in 2-3 minutes • 🔒 No spam, ever
                </p>
              </form>
            ) : (
              <div className="mt-6 p-4 bg-[#2d3035] rounded-lg">
                <div className="flex items-center gap-3 text-[#A3D1FF]">
                  <CheckCircle2 className="w-5 h-5" />
                  <p className="font-medium">Report sent! Check your inbox in 2-3 minutes.</p>
                </div>
              </div>
            )}
            
            <div className="flex justify-center">
              <button
                onClick={() => {
                  setResult(null);
                  setUrl('');
                  setShowEmailForm(false);
                }}
                className="text-[#A3D1FF] hover:underline flex items-center gap-2"
              >
                Analyze another website
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}