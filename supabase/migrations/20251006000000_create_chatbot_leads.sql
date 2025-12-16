/*
  # Create Chatbot Leads Table

  ## Summary
  Creates a table to store leads captured from the chatbot widget on the website.

  ## Tables Created

  ### `chatbot_leads`
  Stores information about potential clients who interact with the chatbot:
  - `id` (uuid, primary key) - Unique identifier for each lead
  - `project_type` (text) - Type of project (Website, Branding, MVP, Other)
  - `name` (text) - Lead's full name
  - `email` (text) - Lead's email address
  - `budget` (text) - Estimated budget range
  - `status` (text) - Lead status (new, contacted, converted, closed)
  - `source` (text) - Always 'chatbot' to track lead origin
  - `created_at` (timestamptz) - When the lead was captured
  - `updated_at` (timestamptz) - Last update timestamp

  ## Security

  ### Row Level Security (RLS)
  - Enabled on the `chatbot_leads` table
  - Public INSERT policy allows the chatbot to submit leads anonymously
  - Admin users can view and manage all leads
  - No public SELECT to protect lead privacy

  ## Notes
  - Email validation should be handled at application level
  - Status field allows for lead management workflow
  - Source field can help track marketing effectiveness
*/

-- Create chatbot_leads table
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

-- Enable RLS
ALTER TABLE chatbot_leads ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public INSERT (for chatbot submissions)
CREATE POLICY "Allow public to submit leads"
  ON chatbot_leads
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Create policy to allow authenticated users to view all leads
CREATE POLICY "Authenticated users can view all leads"
  ON chatbot_leads
  FOR SELECT
  TO authenticated
  USING (true);

-- Create policy to allow authenticated users to update leads
CREATE POLICY "Authenticated users can update leads"
  ON chatbot_leads
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS chatbot_leads_email_idx ON chatbot_leads(email);

-- Create index on status for filtering
CREATE INDEX IF NOT EXISTS chatbot_leads_status_idx ON chatbot_leads(status);

-- Create index on created_at for sorting
CREATE INDEX IF NOT EXISTS chatbot_leads_created_at_idx ON chatbot_leads(created_at DESC);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_chatbot_leads_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update updated_at
DROP TRIGGER IF EXISTS update_chatbot_leads_updated_at_trigger ON chatbot_leads;
CREATE TRIGGER update_chatbot_leads_updated_at_trigger
  BEFORE UPDATE ON chatbot_leads
  FOR EACH ROW
  EXECUTE FUNCTION update_chatbot_leads_updated_at();
