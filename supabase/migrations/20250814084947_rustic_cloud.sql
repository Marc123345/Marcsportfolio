/*
  # Create orders table for e-commerce

  1. New Tables
    - `orders`
      - `id` (uuid, primary key)
      - `customer_email` (text, customer email)
      - `customer_name` (text, customer name)
      - `total_amount` (integer, total in cents)
      - `status` (text, order status)
      - `stripe_session_id` (text, Stripe session ID)
      - `stripe_payment_intent_id` (text, Stripe payment intent)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `orders` table
    - Add policy for authenticated admin access
*/

CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_email text NOT NULL,
  customer_name text,
  total_amount integer NOT NULL CHECK (total_amount > 0),
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed', 'cancelled')),
  stripe_session_id text UNIQUE,
  stripe_payment_intent_id text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users to manage orders (for admin)
CREATE POLICY "Authenticated users can manage orders"
  ON orders
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_orders_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_orders_updated_at
  BEFORE UPDATE ON orders
  FOR EACH ROW
  EXECUTE FUNCTION update_orders_updated_at();