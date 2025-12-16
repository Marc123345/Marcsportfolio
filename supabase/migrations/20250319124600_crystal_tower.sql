/*
  # Contact Form Schema

  1. New Tables
    - `contact_forms`
      - `id` (uuid, primary key)
      - `first_name` (text)
      - `last_name` (text)
      - `email` (text)
      - `company` (text, nullable)
      - `website` (text, nullable)
      - `project_type` (text)
      - `budget` (text)
      - `timeline` (text)
      - `goals` (text)
      - `audience` (text)
      - `features` (text[])
      - `design_preferences` (text, nullable)
      - `technical_requirements` (text, nullable)
      - `additional_info` (text, nullable)
      - `created_at` (timestamptz)
      - `status` (text)

  2. Security
    - Enable RLS on `contact_forms` table
    - Add policy for inserting contact forms
*/

CREATE TABLE contact_forms (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text NOT NULL,
  company text,
  website text,
  project_type text NOT NULL,
  budget text NOT NULL,
  timeline text NOT NULL,
  goals text NOT NULL,
  audience text NOT NULL,
  features text[] NOT NULL DEFAULT '{}',
  design_preferences text,
  technical_requirements text,
  additional_info text,
  created_at timestamptz NOT NULL DEFAULT now(),
  status text NOT NULL DEFAULT 'new'
);

ALTER TABLE contact_forms ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert contact forms"
  ON contact_forms
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Only authenticated users can view contact forms"
  ON contact_forms
  FOR SELECT
  TO authenticated
  USING (true);