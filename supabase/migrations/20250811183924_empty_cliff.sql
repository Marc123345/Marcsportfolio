/*
  # Add security constraints and validation

  1. Security Enhancements
    - Add check constraints for data validation
    - Add indexes for better performance
    - Add RLS policies for data protection

  2. Data Validation
    - Email format validation
    - Length constraints on text fields
    - Required field constraints

  3. Performance
    - Add indexes on frequently queried columns
    - Optimize RLS policies
*/

-- Add check constraints for data validation
ALTER TABLE contact_submissions 
ADD CONSTRAINT check_email_format 
CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$');

ALTER TABLE contact_submissions 
ADD CONSTRAINT check_first_name_length 
CHECK (char_length(first_name) BETWEEN 1 AND 50);

ALTER TABLE contact_submissions 
ADD CONSTRAINT check_last_name_length 
CHECK (char_length(last_name) <= 50);

ALTER TABLE contact_submissions 
ADD CONSTRAINT check_description_length 
CHECK (char_length(description) BETWEEN 10 AND 2000);

ALTER TABLE contact_submissions 
ADD CONSTRAINT check_company_name_length 
CHECK (char_length(company_name) <= 100);

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_contact_submissions_created_at 
ON contact_submissions(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_contact_submissions_service 
ON contact_submissions(service);

-- Add check constraints for newsletter subscriptions
ALTER TABLE newsletter_subscriptions 
ADD CONSTRAINT check_newsletter_email_format 
CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$');

-- Add rate limiting table for form submissions
CREATE TABLE IF NOT EXISTS form_submission_rate_limit (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ip_address inet NOT NULL,
  email text,
  submission_count integer DEFAULT 1,
  last_submission timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE form_submission_rate_limit ENABLE ROW LEVEL SECURITY;

-- Create index for rate limiting lookups
CREATE INDEX IF NOT EXISTS idx_rate_limit_ip_email 
ON form_submission_rate_limit(ip_address, email);

CREATE INDEX IF NOT EXISTS idx_rate_limit_last_submission 
ON form_submission_rate_limit(last_submission);

-- RLS policy for rate limiting (admin access only)
CREATE POLICY "Admin access only for rate limiting"
  ON form_submission_rate_limit
  FOR ALL
  TO authenticated
  USING (false); -- Only allow access through service role