/*
  # Create speed audit leads table

  1. New Tables
    - `speed_audit_leads`
      - `id` (uuid, primary key) - Unique identifier
      - `name` (text, required) - User's name
      - `email` (text, required) - User's email address
      - `website_url` (text, required) - The website URL to audit
      - `created_at` (timestamptz) - When the lead was captured
      - `status` (text) - Lead status (new, contacted, audit_sent, converted)
      - `notes` (text) - Internal notes about the lead

  2. Security
    - Enable RLS on `speed_audit_leads` table
    - No public read access (admin only)
    - No public write access (handled via Edge Function)
*/

CREATE TABLE IF NOT EXISTS speed_audit_leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  website_url text NOT NULL,
  created_at timestamptz DEFAULT now(),
  status text DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'audit_sent', 'converted')),
  notes text
);

-- Enable Row Level Security
ALTER TABLE speed_audit_leads ENABLE ROW LEVEL SECURITY;

-- Create indexes for faster lookups
CREATE INDEX IF NOT EXISTS idx_speed_audit_leads_email ON speed_audit_leads(email);
CREATE INDEX IF NOT EXISTS idx_speed_audit_leads_created_at ON speed_audit_leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_speed_audit_leads_status ON speed_audit_leads(status);

-- No public policies - admin access only
-- Access will be handled through Edge Functions with service role key