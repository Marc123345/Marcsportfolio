/*
  # New Contact Form System

  1. New Tables
    - `contact_messages`
      - `id` (uuid, primary key)
      - `name` (text)
      - `email` (text)
      - `message` (text)
      - `created_at` (timestamptz)
      - `status` (text)
  
  2. Security
    - Enable RLS on `contact_messages` table
    - Add policy for anonymous users to insert messages
    - Add policy for authenticated users to view messages
*/

-- Drop existing table if it exists
DROP TABLE IF EXISTS contact_messages;

-- Create new contact_messages table
CREATE TABLE contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  message text NOT NULL,
  created_at timestamptz DEFAULT now(),
  status text DEFAULT 'new'::text
);

-- Enable row level security
ALTER TABLE contact_messages ENABLE ROW LEVEL_SECURITY;

-- Create policies
CREATE POLICY "Anyone can submit contact messages"
  ON contact_messages
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view contact messages"
  ON contact_messages
  FOR SELECT
  TO authenticated
  USING (true);