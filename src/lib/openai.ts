import OpenAI from 'openai';

// OpenAI client should only be used server-side for security
// Client-side usage exposes API keys and should be avoided in production
let openai: OpenAI | null = null;

// Only initialize in development or if explicitly needed for demos
if (import.meta.env.DEV && import.meta.env.VITE_OPENAI_API_KEY) {
  console.warn('OpenAI client initialized in development mode. This should not be used in production.');
  openai = new OpenAI({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true
  });
}

export async function generateHaiku() {
  try {
    if (!openai) {
      throw new Error('OpenAI client not available. API calls should be made through your backend.');
    }
    
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "user", content: "write a haiku about ai" }
      ]
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error('Error generating haiku:', error);
    // Return a fallback instead of exposing the error
    return "AI service temporarily unavailable. Please try again later.";
  }
}

export async function analyzeWebsite(url: string) {
  try {
    if (!openai) {
      throw new Error('OpenAI client not available. API calls should be made through your backend.');
    }
    
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { 
          role: "system", 
          content: "You are an expert website analyzer. Analyze the provided website URL and provide insights on design, performance, and conversion potential."
        },
        { 
          role: "user", 
          content: `Analyze this website: ${url}` 
        }
      ]
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error('Error analyzing website:', error);
    // Return a fallback instead of exposing the error
    return "Website analysis service temporarily unavailable. Please contact us for a manual review.";
  }
}

// Don't export the client to prevent misuse
// export { openai };