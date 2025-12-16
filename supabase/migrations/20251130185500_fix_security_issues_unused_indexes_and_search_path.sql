/*
  # Fix Security Issues - Remove Unused Indexes and Fix Search Path

  ## Changes Made
  
  ### 1. Removed Unused Indexes
  Dropping the following unused indexes to improve database performance and reduce maintenance overhead:
  
  #### contact_submissions table:
  - `idx_contact_submissions_created_at`
  - `idx_contact_submissions_status`
  - `idx_contact_submissions_email`
  
  #### chatbot_leads table:
  - `chatbot_leads_email_idx`
  - `chatbot_leads_status_idx`
  - `chatbot_leads_created_at_idx`
  
  #### website_analyzer_leads table:
  - `idx_website_analyzer_leads_email`
  - `idx_website_analyzer_leads_created_at`
  - `idx_website_analyzer_leads_status`
  
  #### ai_crawler_leads table:
  - `idx_ai_crawler_leads_email`
  - `idx_ai_crawler_leads_created_at`
  - `idx_ai_crawler_leads_status`
  
  #### speed_audit_leads table:
  - `idx_speed_audit_leads_email`
  - `idx_speed_audit_leads_created_at`
  - `idx_speed_audit_leads_status`
  
  ### 2. Fixed Function Search Path Vulnerability
  - Recreated `update_chatbot_leads_updated_at` function with immutable search_path
  - This prevents potential security issues where malicious users could manipulate the search_path
  
  ## Security Impact
  - Reduces attack surface by removing unused database objects
  - Fixes search_path vulnerability that could lead to privilege escalation
  - Improves database performance by reducing index maintenance overhead
*/

-- Drop unused indexes on contact_submissions table
DROP INDEX IF EXISTS idx_contact_submissions_created_at;
DROP INDEX IF EXISTS idx_contact_submissions_status;
DROP INDEX IF EXISTS idx_contact_submissions_email;

-- Drop unused indexes on chatbot_leads table
DROP INDEX IF EXISTS chatbot_leads_email_idx;
DROP INDEX IF EXISTS chatbot_leads_status_idx;
DROP INDEX IF EXISTS chatbot_leads_created_at_idx;

-- Drop unused indexes on website_analyzer_leads table
DROP INDEX IF EXISTS idx_website_analyzer_leads_email;
DROP INDEX IF EXISTS idx_website_analyzer_leads_created_at;
DROP INDEX IF EXISTS idx_website_analyzer_leads_status;

-- Drop unused indexes on ai_crawler_leads table
DROP INDEX IF EXISTS idx_ai_crawler_leads_email;
DROP INDEX IF EXISTS idx_ai_crawler_leads_created_at;
DROP INDEX IF EXISTS idx_ai_crawler_leads_status;

-- Drop unused indexes on speed_audit_leads table
DROP INDEX IF EXISTS idx_speed_audit_leads_email;
DROP INDEX IF EXISTS idx_speed_audit_leads_created_at;
DROP INDEX IF EXISTS idx_speed_audit_leads_status;

-- Fix search_path vulnerability in update_chatbot_leads_updated_at function
-- Drop the existing function and trigger first
DROP TRIGGER IF EXISTS update_chatbot_leads_updated_at_trigger ON chatbot_leads;
DROP FUNCTION IF EXISTS public.update_chatbot_leads_updated_at();

-- Recreate function with secure search_path
CREATE OR REPLACE FUNCTION public.update_chatbot_leads_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = pg_catalog, public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Recreate the trigger
CREATE TRIGGER update_chatbot_leads_updated_at_trigger
  BEFORE UPDATE ON chatbot_leads
  FOR EACH ROW
  EXECUTE FUNCTION update_chatbot_leads_updated_at();