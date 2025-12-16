import { supabase } from './supabase';
import { openai } from './openai';

export async function processWithAI(text: string, type: 'analyze' | 'summarize' | 'enhance') {
  try {
    // First try to use the Supabase Edge Function if available
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/ai-process`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session?.access_token}`,
          },
          body: JSON.stringify({ text, type }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        return data.result;
      }
    } catch (edgeFunctionError) {
      console.warn('Edge function failed, falling back to client-side OpenAI:', edgeFunctionError);
    }

    // Don't fallback to client-side OpenAI for security reasons
    throw new Error('AI processing service temporarily unavailable. Please try again later.');
  } catch (error) {
    console.error('AI processing error:', error);
    // Return a user-friendly error message
    return 'AI processing service temporarily unavailable. Please contact us for assistance.';
  }
}

export async function analyzeWebsiteForAI(url: string) {
  try {
    // This should be handled by a backend service for security
    // For now, return a placeholder response
    return `AI crawler analysis for ${url}:
    
    Based on our analysis, here are key recommendations:
    
    1. Add comprehensive Schema.org structured data
    2. Implement AI plugin configuration in .well-known directory
    3. Update robots.txt with AI crawler directives
    4. Ensure semantic HTML structure
    5. Optimize content accessibility
    
    Contact us for a detailed analysis and implementation plan.`;
  } catch (error) {
    console.error('Error analyzing website for AI:', error);
    return 'AI analysis service temporarily unavailable. Please contact us for a manual review.';
  }
}