import { createClient } from 'npm:@supabase/supabase-js@2.39.7';
import Stripe from 'npm:stripe@14.21.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

Deno.serve(async (req: Request) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const { items, customer_email, customer_name } = await req.json();
    
    if (!items || !Array.isArray(items) || items.length === 0) {
      throw new Error('Invalid or empty cart items');
    }

    if (!customer_email) {
      throw new Error('Customer email is required');
    }

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Initialize Stripe
    const stripeSecretKey = Deno.env.get('STRIPE_SECRET_KEY');
    if (!stripeSecretKey) {
      throw new Error('Stripe secret key not configured');
    }
    
    const stripe = new Stripe(stripeSecretKey, {
      apiVersion: '2023-10-16',
    });

    // Calculate total from items
    const total = items.reduce((sum: number, item: any) => {
      return sum + (item.price * item.quantity);
    }, 0);

    // Validate total
    if (total <= 0) {
      throw new Error('Invalid cart total');
    }

    // Create order record in database first
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        customer_email,
        customer_name,
        total_amount: total,
        status: 'pending'
      })
      .select()
      .single();

    if (orderError) {
      throw new Error(`Failed to create order: ${orderError.message}`);
    }

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: items.map((item: any) => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.name,
            description: item.description,
            images: item.image_url ? [item.image_url] : [],
          },
          unit_amount: item.price, // Price in cents
        },
        quantity: item.quantity,
      })),
      mode: 'payment',
      success_url: `${req.headers.get('origin')}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get('origin')}/checkout/cancel`,
      customer_email,
      metadata: {
        order_id: order.id,
      },
    });

    // Update order with Stripe session ID
    const { error: updateError } = await supabase
      .from('orders')
      .update({ stripe_session_id: session.id })
      .eq('id', order.id);

    if (updateError) {
      console.error('Failed to update order with session ID:', updateError);
    }

    // Create order items
    const orderItems = items.map((item: any) => ({
      order_id: order.id,
      service_id: item.service_id,
      service_name: item.name,
      service_description: item.description,
      quantity: item.quantity,
      price_at_purchase: item.price
    }));

    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(orderItems);

    if (itemsError) {
      console.error('Failed to create order items:', itemsError);
    }

    return new Response(JSON.stringify({ url: session.url }), {
      status: 200,
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error in create-stripe-checkout-session:', error);
    
    return new Response(
      JSON.stringify({ 
        error: 'Failed to create checkout session',
        details: error.message 
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  }
});