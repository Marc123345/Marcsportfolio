import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from 'npm:@supabase/supabase-js@2.39.7';

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface AnalysisRequest {
  url: string;
  email?: string;
}

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

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { url, email }: AnalysisRequest = await req.json();

    if (!url) {
      return new Response(
        JSON.stringify({ error: 'URL is required' }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // Validate and sanitize URL
    let sanitizedUrl = url.trim();
    if (!sanitizedUrl.startsWith('http://') && !sanitizedUrl.startsWith('https://')) {
      sanitizedUrl = 'https://' + sanitizedUrl;
    }

    try {
      new URL(sanitizedUrl);
    } catch {
      return new Response(
        JSON.stringify({ error: 'Invalid URL format' }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // Fetch and analyze the website
    const startTime = performance.now();
    let html = '';
    let fetchError = false;
    
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout
      
      const response = await fetch(sanitizedUrl, {
        signal: controller.signal,
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; WebsiteAnalyzer/1.0)'
        }
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        fetchError = true;
      } else {
        html = await response.text();
      }
    } catch (error) {
      console.error('Fetch error:', error);
      fetchError = true;
    }
    
    const loadTime = performance.now() - startTime;

    // Analyze the HTML
    const analysis = analyzeWebsite(html, sanitizedUrl, loadTime, fetchError);

    // Store in database if email provided
    if (email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (emailRegex.test(email)) {
        await supabase
          .from('website_analyzer_leads')
          .insert([{
            email: email.trim().toLowerCase(),
            website_url: sanitizedUrl,
            analysis_score: analysis.score,
            design_score: analysis.design.score,
            performance_score: analysis.performance.score,
            conversion_score: analysis.conversion.score,
            status: 'new'
          }]);
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        analysis
      }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );

  } catch (error) {
    console.error('Error processing request:', error);
    return new Response(
      JSON.stringify({
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error'
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});

function analyzeWebsite(html: string, url: string, loadTime: number, fetchError: boolean): AnalysisResult {
  const domain = new URL(url).hostname.replace('www.', '');
  
  if (fetchError || !html) {
    // Return generic analysis if we couldn't fetch the site
    return {
      score: 45,
      overview: `Unable to fully analyze ${domain} due to fetch restrictions. Based on URL structure and general best practices, here are improvement recommendations.`,
      design: {
        score: 50,
        feedback: 'Unable to analyze design elements. Consider these general improvements.',
        improvements: [
          'Ensure responsive design works across all devices',
          'Use consistent color scheme aligned with brand identity',
          'Implement clear visual hierarchy',
          'Optimize images for web performance'
        ]
      },
      performance: {
        score: 40,
        feedback: 'Unable to measure performance metrics. Consider these optimizations.',
        improvements: [
          'Enable compression (gzip/brotli)',
          'Implement CDN for static assets',
          'Optimize and lazy-load images',
          'Minimize JavaScript and CSS files'
        ]
      },
      conversion: {
        score: 45,
        feedback: 'General conversion optimization recommendations.',
        improvements: [
          'Add clear call-to-action buttons above the fold',
          'Include trust signals (testimonials, reviews)',
          'Simplify forms and reduce friction',
          'Implement exit-intent popups strategically'
        ]
      }
    };
  }

  // Analyze the HTML content
  const htmlLower = html.toLowerCase();
  
  // Design Analysis
  const hasMetaViewport = htmlLower.includes('viewport');
  const hasMetaDescription = htmlLower.includes('meta name="description"');
  const hasH1 = htmlLower.includes('<h1');
  const hasImages = htmlLower.includes('<img');
  const hasAltTags = html.match(/<img[^>]+alt=/gi)?.length || 0;
  const totalImages = html.match(/<img/gi)?.length || 1;
  const altTagRatio = hasAltTags / totalImages;
  const hasModernFrameworks = htmlLower.includes('react') || htmlLower.includes('vue') || htmlLower.includes('angular');
  const hasCSS = htmlLower.includes('<style') || htmlLower.includes('.css');
  
  let designScore = 50;
  if (hasMetaViewport) designScore += 10;
  if (hasH1) designScore += 10;
  if (altTagRatio > 0.7) designScore += 10;
  if (hasModernFrameworks) designScore += 10;
  if (hasCSS) designScore += 5;
  designScore = Math.min(95, designScore);
  
  // Performance Analysis
  let performanceScore = 60;
  if (loadTime < 2000) performanceScore += 20;
  else if (loadTime < 3000) performanceScore += 10;
  else if (loadTime < 5000) performanceScore += 5;
  
  const htmlSize = html.length;
  if (htmlSize < 100000) performanceScore += 10;
  else if (htmlSize < 200000) performanceScore += 5;
  
  const hasLazyLoading = htmlLower.includes('loading="lazy"');
  const hasAsync = htmlLower.includes('async') || htmlLower.includes('defer');
  if (hasLazyLoading) performanceScore += 5;
  if (hasAsync) performanceScore += 5;
  performanceScore = Math.min(95, performanceScore);
  
  // Conversion Analysis
  let conversionScore = 50;
  const hasCTA = htmlLower.includes('button') || htmlLower.includes('cta');
  const hasForm = htmlLower.includes('<form');
  const hasTestimonials = htmlLower.includes('testimonial') || htmlLower.includes('review');
  const hasContact = htmlLower.includes('contact') || htmlLower.includes('email');
  const hasPhone = htmlLower.includes('tel:') || /\d{3}[-.]?\d{3}[-.]?\d{4}/.test(html);
  const hasSocialProof = htmlLower.includes('trusted by') || htmlLower.includes('clients');
  
  if (hasCTA) conversionScore += 10;
  if (hasForm) conversionScore += 10;
  if (hasTestimonials) conversionScore += 10;
  if (hasContact) conversionScore += 5;
  if (hasPhone) conversionScore += 5;
  if (hasSocialProof) conversionScore += 10;
  conversionScore = Math.min(95, conversionScore);
  
  const overallScore = Math.round((designScore + performanceScore + conversionScore) / 3);
  
  // Generate feedback
  const designFeedback = designScore > 70 
    ? `${domain} has a solid design foundation with good accessibility practices.`
    : `${domain}'s design needs improvement in several key areas including mobile responsiveness and accessibility.`;
  
  const performanceFeedback = performanceScore > 70
    ? `${domain} loads reasonably well with a ${Math.round(loadTime)}ms load time.`
    : `${domain} has performance issues with a ${Math.round(loadTime)}ms load time that could hurt user experience.`;
  
  const conversionFeedback = conversionScore > 70
    ? `${domain} has good conversion elements in place but could be optimized further.`
    : `${domain} is missing key conversion optimization elements that could significantly impact lead generation.`;
  
  return {
    score: overallScore,
    overview: `${domain} scored ${overallScore}/100 overall. Your strongest area is ${getStrongestArea(designScore, performanceScore, conversionScore)}, while ${getWeakestArea(designScore, performanceScore, conversionScore)} needs the most attention. Implementing the recommended improvements could significantly boost your website's effectiveness.`,
    design: {
      score: designScore,
      feedback: designFeedback,
      improvements: getDesignImprovements(hasMetaViewport, hasH1, altTagRatio, hasModernFrameworks)
    },
    performance: {
      score: performanceScore,
      feedback: performanceFeedback,
      improvements: getPerformanceImprovements(loadTime, htmlSize, hasLazyLoading, hasAsync)
    },
    conversion: {
      score: conversionScore,
      feedback: conversionFeedback,
      improvements: getConversionImprovements(hasCTA, hasForm, hasTestimonials, hasSocialProof)
    }
  };
}

function getStrongestArea(design: number, performance: number, conversion: number): string {
  const max = Math.max(design, performance, conversion);
  if (max === design) return 'design';
  if (max === performance) return 'performance';
  return 'conversion optimization';
}

function getWeakestArea(design: number, performance: number, conversion: number): string {
  const min = Math.min(design, performance, conversion);
  if (min === design) return 'design';
  if (min === performance) return 'performance';
  return 'conversion optimization';
}

function getDesignImprovements(hasViewport: boolean, hasH1: boolean, altRatio: number, hasFrameworks: boolean): string[] {
  const improvements = [];
  
  if (!hasViewport) improvements.push('Add responsive meta viewport tag for mobile optimization');
  if (!hasH1) improvements.push('Include a clear H1 heading for better SEO and hierarchy');
  if (altRatio < 0.7) improvements.push('Add descriptive alt text to all images for accessibility');
  if (!hasFrameworks) improvements.push('Consider modern frameworks for better user experience');
  
  improvements.push('Enhance visual hierarchy with consistent typography');
  improvements.push('Ensure sufficient color contrast for readability');
  
  return improvements.slice(0, 4);
}

function getPerformanceImprovements(loadTime: number, size: number, hasLazy: boolean, hasAsync: boolean): string[] {
  const improvements = [];
  
  if (loadTime > 3000) improvements.push('Reduce server response time and optimize backend processing');
  if (size > 100000) improvements.push('Minimize HTML size by removing unnecessary code');
  if (!hasLazy) improvements.push('Implement lazy loading for images and videos');
  if (!hasAsync) improvements.push('Use async/defer attributes for JavaScript files');
  
  improvements.push('Enable CDN and browser caching for static assets');
  improvements.push('Compress images and use modern formats (WebP, AVIF)');
  
  return improvements.slice(0, 4);
}

function getConversionImprovements(hasCTA: boolean, hasForm: boolean, hasTestimonials: boolean, hasSocial: boolean): string[] {
  const improvements = [];
  
  if (!hasCTA) improvements.push('Add prominent call-to-action buttons above the fold');
  if (!hasForm) improvements.push('Include a contact form to capture leads easily');
  if (!hasTestimonials) improvements.push('Add customer testimonials and reviews for social proof');
  if (!hasSocial) improvements.push('Display trust indicators (client logos, certifications)');
  
  improvements.push('Simplify forms to reduce friction and increase completions');
  improvements.push('Implement exit-intent popups to capture leaving visitors');
  
  return improvements.slice(0, 4);
}
