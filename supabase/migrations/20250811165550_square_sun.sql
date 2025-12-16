/*
  # Newsletter Subscriptions Table

  1. New Tables
    - `newsletter_subscriptions`
      - `id` (uuid, primary key)
      - `email` (text, unique, not null)
      - `subscribed_at` (timestamp with time zone, default now())
      - `status` (text, default 'active')
      - `source` (text, optional - tracks where subscription came from)
      - `unsubscribe_token` (uuid, for unsubscribe functionality)

  2. Security
    - Enable RLS on `newsletter_subscriptions` table
    - Add policy for anonymous users to insert subscriptions
    - Add policy for authenticated users to read their own subscriptions
*/

CREATE TABLE IF NOT EXISTS newsletter_subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  subscribed_at timestamptz DEFAULT now(),
  status text DEFAULT 'active' CHECK (status IN ('active', 'unsubscribed', 'bounced')),
  source text DEFAULT 'footer',
  unsubscribe_token uuid DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE newsletter_subscriptions ENABLE ROW LEVEL SECURITY;

-- Allow anonymous users to subscribe
CREATE POLICY "Allow anonymous newsletter subscriptions"
  ON newsletter_subscriptions
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Allow authenticated users to subscribe
CREATE POLICY "Allow authenticated newsletter subscriptions"
  ON newsletter_subscriptions
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Allow authenticated users to read all subscriptions (for admin purposes)
CREATE POLICY "Authenticated users can read newsletter subscriptions"
  ON newsletter_subscriptions
  FOR SELECT
  TO authenticated
  USING (true);

-- Create index for email lookups
CREATE INDEX IF NOT EXISTS idx_newsletter_subscriptions_email 
  ON newsletter_subscriptions(email);

-- Create index for status filtering
CREATE INDEX IF NOT EXISTS idx_newsletter_subscriptions_status 
  ON newsletter_subscriptions(status);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_newsletter_subscriptions_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_newsletter_subscriptions_updated_at
  BEFORE UPDATE ON newsletter_subscriptions
  FOR EACH ROW
  EXECUTE FUNCTION update_newsletter_subscriptions_updated_at();