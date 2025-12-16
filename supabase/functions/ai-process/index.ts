import { createClient } from 'npm:@supabase/supabase-js@2.39.7';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

// Initialize AI session
const model = new Supabase.ai.Session('gte-small');

Deno.serve(async (req: Request) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const { text, type } = await req.json();

    let result;
    switch (type) {
      case 'analyze':
        // Generate embeddings for text analysis
        result = await model.run(text, { mean_pool: true, normalize: true });
        break;
      case 'summarize':
        // Use AI to generate a summary
        result = await model.complete({
          prompt: `Summarize the following text:\n\n${text}`,
          max_tokens: 150,
          temperature: 0.7,
        });
        break;
      case 'enhance':
        // Enhance the text with AI suggestions
        result = await model.complete({
          prompt: `Improve and enhance the following text while maintaining its core message:\n\n${text}`,
          max_tokens: 200,
          temperature: 0.8,
        });
        break;
      default:
        throw new Error('Invalid processing type');
    }

    return new Response(JSON.stringify({ result }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});