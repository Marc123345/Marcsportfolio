/*
  # Create AI crawler leads table

  1. New Tables
    - `ai_crawler_leads`
      - `id` (uuid, primary key) - Unique identifier
      - `name` (text, required) - User's name
      - `email` (text, required) - User's email address
      - `website_url` (text, required) - The URL that was analyzed
      - `ai_readiness_score` (integer) - AI readiness score from analysis
      - `created_at` (timestamptz) - When the lead was captured
      - `status` (text) - Lead status (new, contacted, qualified, converted)
      - `notes` (text) - Internal notes about the lead

  2. Security
    - Enable RLS on `ai_crawler_leads` table
    - No public read access (admin only)
    - No public write access (handled via Edge Function)
*/

CREATE TABLE IF NOT EXISTS ai_crawler_leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  website_url text NOT NULL,
  ai_readiness_score integer,
  created_at timestamptz DEFAULT now(),
  status text DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'qualified', 'converted')),
  notes text
);

-- Enable Row Level Security
ALTER TABLE ai_crawler_leads ENABLE ROW LEVEL SECURITY;

-- Create indexes for faster lookups
CREATE INDEX IF NOT EXISTS idx_ai_crawler_leads_email ON ai_crawler_leads(email);
CREATE INDEX IF NOT EXISTS idx_ai_crawler_leads_created_at ON ai_crawler_leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_ai_crawler_leads_status ON ai_crawler_leads(status);

-- No public policies - admin access only
-- Access will be handled through Edge Functions with service role key