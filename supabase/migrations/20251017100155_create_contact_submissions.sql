/*
  # Contact Form Submissions Table

  1. New Tables
    - `contact_submissions`
      - `id` (uuid, primary key) - Unique identifier for each submission
      - `name` (text) - Full name of the person submitting
      - `email` (text) - Email address for contact
      - `phone` (text, optional) - Phone number if provided
      - `company` (text, optional) - Company name if provided
      - `message` (text) - The message content
      - `created_at` (timestamptz) - When the submission was created
      - `status` (text) - Status of the submission (new, contacted, completed)
      - `notes` (text, optional) - Internal notes for follow-up

  2. Security
    - Enable RLS on `contact_submissions` table
    - Add policy for authenticated users (admin) to read all submissions
    - Add policy for anyone to insert submissions (public contact form)
    - No public read access to protect privacy

  3. Indexes
    - Index on `created_at` for sorting by date
    - Index on `status` for filtering submissions
    - Index on `email` for searching by email
*/

-- Create contact_submissions table
CREATE TABLE IF NOT EXISTS contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  company text,
  message text NOT NULL,
  created_at timestamptz DEFAULT now(),
  status text DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'completed')),
  notes text
);

-- Enable RLS
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can insert (public form submissions)
CREATE POLICY "Anyone can submit contact form"
  ON contact_submissions
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Policy: Authenticated users can read all submissions
CREATE POLICY "Authenticated users can read all submissions"
  ON contact_submissions
  FOR SELECT
  TO authenticated
  USING (true);

-- Policy: Authenticated users can update submissions
CREATE POLICY "Authenticated users can update submissions"
  ON contact_submissions
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Policy: Authenticated users can delete submissions
CREATE POLICY "Authenticated users can delete submissions"
  ON contact_submissions
  FOR DELETE
  TO authenticated
  USING (true);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_contact_submissions_created_at ON contact_submissions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_status ON contact_submissions(status);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_email ON contact_submissions(email);
