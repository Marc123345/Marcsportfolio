/*
  # Create order_items table for e-commerce

  1. New Tables
    - `order_items`
      - `id` (uuid, primary key)
      - `order_id` (uuid, foreign key to orders)
      - `service_id` (uuid, foreign key to services)
      - `service_name` (text, service name at time of purchase)
      - `service_description` (text, service description at time of purchase)
      - `quantity` (integer, quantity purchased)
      - `price_at_purchase` (integer, price in cents at time of purchase)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `order_items` table
    - Add policy for authenticated admin access
*/

CREATE TABLE IF NOT EXISTS order_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  service_id uuid NOT NULL REFERENCES services(id),
  service_name text NOT NULL,
  service_description text,
  quantity integer NOT NULL DEFAULT 1 CHECK (quantity > 0),
  price_at_purchase integer NOT NULL CHECK (price_at_purchase > 0),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users to manage order items (for admin)
CREATE POLICY "Authenticated users can manage order items"
  ON order_items
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_order_items_service_id ON order_items(service_id);