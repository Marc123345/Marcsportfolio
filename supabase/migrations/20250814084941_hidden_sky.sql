/*
  # Create services table for e-commerce

  1. New Tables
    - `services`
      - `id` (uuid, primary key)
      - `name` (text, service name)
      - `description` (text, service description)
      - `price` (integer, price in cents)
      - `image_url` (text, optional image)
      - `category` (text, service category)
      - `features` (text array, service features)
      - `is_active` (boolean, whether service is available)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `services` table
    - Add policy for public read access
    - Add policy for authenticated admin access
*/

CREATE TABLE IF NOT EXISTS services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  price integer NOT NULL CHECK (price > 0),
  image_url text,
  category text,
  features text[] DEFAULT '{}',
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE services ENABLE ROW LEVEL SECURITY;

-- Allow public read access to active services
CREATE POLICY "Public can view active services"
  ON services
  FOR SELECT
  TO public
  USING (is_active = true);

-- Allow authenticated users to manage services (for admin)
CREATE POLICY "Authenticated users can manage services"
  ON services
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_services_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_services_updated_at
  BEFORE UPDATE ON services
  FOR EACH ROW
  EXECUTE FUNCTION update_services_updated_at();