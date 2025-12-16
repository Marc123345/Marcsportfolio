/*
  # Create website analyzer leads table

  1. New Tables
    - `website_analyzer_leads`
      - `id` (uuid, primary key) - Unique identifier
      - `email` (text, required) - User's email address
      - `website_url` (text, required) - The URL that was analyzed
      - `analysis_score` (integer) - Overall analysis score
      - `design_score` (integer) - Design category score
      - `performance_score` (integer) - Performance category score
      - `conversion_score` (integer) - Conversion category score
      - `created_at` (timestamptz) - When the lead was captured
      - `status` (text) - Lead status (new, contacted, qualified, converted)
      - `notes` (text) - Internal notes about the lead

  2. Security
    - Enable RLS on `website_analyzer_leads` table
    - No public read access (admin only)
    - No public write access (handled via Edge Function)
*/

CREATE TABLE IF NOT EXISTS website_analyzer_leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL,
  website_url text NOT NULL,
  analysis_score integer,
  design_score integer,
  performance_score integer,
  conversion_score integer,
  created_at timestamptz DEFAULT now(),
  status text DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'qualified', 'converted')),
  notes text
);

-- Enable Row Level Security
ALTER TABLE website_analyzer_leads ENABLE ROW LEVEL SECURITY;

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_website_analyzer_leads_email ON website_analyzer_leads(email);
CREATE INDEX IF NOT EXISTS idx_website_analyzer_leads_created_at ON website_analyzer_leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_website_analyzer_leads_status ON website_analyzer_leads(status);

-- No public policies - admin access only
-- Access will be handled through Edge Functions with service role key