/*
  # Create All Contact Form Tables

  ## Summary
  Creates all database tables for contact forms and lead capture across the website.
  This includes the main contact form, chatbot leads, website analyzer leads, 
  AI crawler leads, and speed audit leads.

  ## New Tables

  ### 1. `contact_submissions`
  Main contact form submissions from /contact page:
  - `id` (uuid, primary key) - Unique identifier for each submission
  - `name` (text, required) - Full name of the person submitting
  - `email` (text, required) - Email address for contact
  - `phone` (text, optional) - Phone number if provided
  - `company` (text, optional) - Company name if provided
  - `service` (text, optional) - Service interested in
  - `message` (text, required) - The message content
  - `created_at` (timestamptz) - When the submission was created
  - `status` (text) - Status of the submission (new, contacted, completed)
  - `notes` (text, optional) - Internal notes for follow-up

  ### 2. `chatbot_leads`
  Leads captured from the chatbot widget:
  - `id` (uuid, primary key) - Unique identifier for each lead
  - `project_type` (text, required) - Type of project (Website, Branding, MVP, Other)
  - `name` (text, required) - Lead's full name
  - `email` (text, required) - Lead's email address
  - `budget` (text, required) - Estimated budget range
  - `status` (text) - Lead status (new, contacted, qualified, converted, closed)
  - `source` (text) - Always 'chatbot' to track lead origin
  - `created_at` (timestamptz) - When the lead was captured
  - `updated_at` (timestamptz) - Last update timestamp

  ### 3. `website_analyzer_leads`
  Leads from the website analyzer tool:
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

  ### 4. `ai_crawler_leads`
  Leads from the AI crawler optimization tool:
  - `id` (uuid, primary key) - Unique identifier
  - `name` (text, required) - User's name
  - `email` (text, required) - User's email address
  - `website_url` (text, required) - The URL that was analyzed
  - `ai_readiness_score` (integer) - AI readiness score from analysis
  - `created_at` (timestamptz) - When the lead was captured
  - `status` (text) - Lead status (new, contacted, qualified, converted)
  - `notes` (text) - Internal notes about the lead

  ### 5. `speed_audit_leads`
  Leads requesting speed audits:
  - `id` (uuid, primary key) - Unique identifier
  - `name` (text, required) - User's name
  - `email` (text, required) - User's email address
  - `website_url` (text, required) - The website URL to audit
  - `created_at` (timestamptz) - When the lead was captured
  - `status` (text) - Lead status (new, contacted, audit_sent, converted)
  - `notes` (text) - Internal notes about the lead

  ## Security
  All tables have Row Level Security (RLS) enabled with the following policies:
  - Public INSERT access (anonymous users can submit forms)
  - Authenticated users (admin) can SELECT, UPDATE, and DELETE
  - No public read access to protect lead privacy

  ## Indexes
  Performance indexes on:
  - `created_at` columns for date sorting
  - `status` columns for filtering
  - `email` columns for searching

  ## Important Notes
  - Email validation is handled at the application level
  - Status fields allow for lead management workflow tracking
  - All timestamps use UTC timezone
  - Triggers automatically update `updated_at` fields where applicable
*/

-- 1. Create contact_submissions table
CREATE TABLE IF NOT EXISTS contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  company text,
  service text,
  message text NOT NULL,
  created_at timestamptz DEFAULT now(),
  status text DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'completed')),
  notes text
);

ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit contact form"
  ON contact_submissions
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Authenticated users can read all contact submissions"
  ON contact_submissions
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can update contact submissions"
  ON contact_submissions
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete contact submissions"
  ON contact_submissions
  FOR DELETE
  TO authenticated
  USING (true);

CREATE INDEX IF NOT EXISTS idx_contact_submissions_created_at ON contact_submissions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_status ON contact_submissions(status);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_email ON contact_submissions(email);

-- 2. Create chatbot_leads table
CREATE TABLE IF NOT EXISTS chatbot_leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_type text NOT NULL,
  name text NOT NULL,
  email text NOT NULL,
  budget text NOT NULL,
  status text DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'qualified', 'converted', 'closed')),
  source text DEFAULT 'chatbot',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE chatbot_leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public to submit chatbot leads"
  ON chatbot_leads
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view all chatbot leads"
  ON chatbot_leads
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can update chatbot leads"
  ON chatbot_leads
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE INDEX IF NOT EXISTS chatbot_leads_email_idx ON chatbot_leads(email);
CREATE INDEX IF NOT EXISTS chatbot_leads_status_idx ON chatbot_leads(status);
CREATE INDEX IF NOT EXISTS chatbot_leads_created_at_idx ON chatbot_leads(created_at DESC);

-- Create function to update updated_at timestamp for chatbot_leads
CREATE OR REPLACE FUNCTION update_chatbot_leads_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_chatbot_leads_updated_at_trigger ON chatbot_leads;
CREATE TRIGGER update_chatbot_leads_updated_at_trigger
  BEFORE UPDATE ON chatbot_leads
  FOR EACH ROW
  EXECUTE FUNCTION update_chatbot_leads_updated_at();

-- 3. Create website_analyzer_leads table
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

ALTER TABLE website_analyzer_leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public to submit website analyzer leads"
  ON website_analyzer_leads
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view all website analyzer leads"
  ON website_analyzer_leads
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can update website analyzer leads"
  ON website_analyzer_leads
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE INDEX IF NOT EXISTS idx_website_analyzer_leads_email ON website_analyzer_leads(email);
CREATE INDEX IF NOT EXISTS idx_website_analyzer_leads_created_at ON website_analyzer_leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_website_analyzer_leads_status ON website_analyzer_leads(status);

-- 4. Create ai_crawler_leads table
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

ALTER TABLE ai_crawler_leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public to submit ai crawler leads"
  ON ai_crawler_leads
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view all ai crawler leads"
  ON ai_crawler_leads
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can update ai crawler leads"
  ON ai_crawler_leads
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE INDEX IF NOT EXISTS idx_ai_crawler_leads_email ON ai_crawler_leads(email);
CREATE INDEX IF NOT EXISTS idx_ai_crawler_leads_created_at ON ai_crawler_leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_ai_crawler_leads_status ON ai_crawler_leads(status);

-- 5. Create speed_audit_leads table
CREATE TABLE IF NOT EXISTS speed_audit_leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  website_url text NOT NULL,
  created_at timestamptz DEFAULT now(),
  status text DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'audit_sent', 'converted')),
  notes text
);

ALTER TABLE speed_audit_leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public to submit speed audit leads"
  ON speed_audit_leads
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view all speed audit leads"
  ON speed_audit_leads
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can update speed audit leads"
  ON speed_audit_leads
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE INDEX IF NOT EXISTS idx_speed_audit_leads_email ON speed_audit_leads(email);
CREATE INDEX IF NOT EXISTS idx_speed_audit_leads_created_at ON speed_audit_leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_speed_audit_leads_status ON speed_audit_leads(status);