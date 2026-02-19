/*
  # Create ebook_leads table

  1. New Tables
    - `ebook_leads`
      - `id` (uuid, primary key)
      - `name` (text, required) - lead's full name
      - `email` (text, required) - lead's email address
      - `company` (text, optional) - lead's company name
      - `ebook_slug` (text, required) - identifies which ebook was downloaded
      - `created_at` (timestamptz) - when the lead was captured
  2. Security
    - Enable RLS on `ebook_leads` table
    - Add insert policy for anonymous users (public form submissions)
    - Add select policy for authenticated users only
*/

CREATE TABLE IF NOT EXISTS ebook_leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  company text DEFAULT '',
  ebook_slug text NOT NULL DEFAULT 'landing-page-persuasion',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE ebook_leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous ebook lead submissions"
  ON ebook_leads
  FOR INSERT
  TO anon
  WITH CHECK (
    name IS NOT NULL AND
    name <> '' AND
    email IS NOT NULL AND
    email <> ''
  );

CREATE POLICY "Authenticated users can view ebook leads"
  ON ebook_leads
  FOR SELECT
  TO authenticated
  USING (auth.uid() IS NOT NULL);
