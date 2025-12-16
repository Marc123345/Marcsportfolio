# ChatBot Setup Guide

## Overview

The ChatBot is a conversational lead capture widget that welcomes users, collects project information, and integrates with Calendly for scheduling calls.

## Features

- **Animated UI**: Smooth animations using Framer Motion
- **Conversation Flow**:
  1. Welcome message
  2. Project type selection (Website, Branding, MVP, Other)
  3. Name collection
  4. Email collection with validation
  5. Budget collection
  6. Completion with Calendly CTA
- **Form Validation**: Email validation and required field checks
- **Backend Integration**: Submits to Supabase Edge Function
- **Calendly Integration**: Direct scheduling link after completion

## Setup Instructions

### 1. Database Setup

Run the migration file to create the `chatbot_leads` table:

```bash
# The migration file is located at:
supabase/migrations/20251006000000_create_chatbot_leads.sql
```

Or run it manually in your Supabase SQL Editor:

```sql
-- See the migration file for the complete SQL
```

### 2. Deploy Edge Function

The Edge Function is already created at `supabase/functions/submit-lead/index.ts`

To deploy it:

```bash
# Using Supabase CLI (if available)
supabase functions deploy submit-lead

# Or use the Supabase dashboard to deploy the function
```

### 3. Environment Variables

Ensure these environment variables are set in your `.env` file:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

The Edge Function automatically has access to:
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`

### 4. Calendly Integration

The chatbot uses the Calendly link from the ContactPage. Update it if needed:

```typescript
// In ChatBot.tsx, line 21
const calendlyLink = "https://calendly.com/your-link/30min";
```

## Usage

The ChatBot is automatically included on all pages via the Layout component. It appears as a floating button in the bottom-right corner.

### User Flow

1. Click the chat button to open
2. Select project type from 4 options
3. Enter name (text input)
4. Enter email (validated)
5. Enter budget (text input)
6. View success message
7. Click "Schedule a Call Now" or close

## API Endpoint

### POST `/functions/v1/submit-lead`

**Request Body:**
```json
{
  "projectType": "Website Design & Development",
  "name": "John Doe",
  "email": "john@example.com",
  "budget": "$5,000 - $10,000"
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "Lead submitted successfully",
  "data": {
    "id": "uuid",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

**Response (Error):**
```json
{
  "error": "Failed to save lead",
  "details": "Error message"
}
```

## Database Schema

### `chatbot_leads` Table

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| project_type | text | Selected project type |
| name | text | User's name |
| email | text | User's email |
| budget | text | Budget range |
| status | text | Lead status (new, contacted, qualified, converted, closed) |
| source | text | Always 'chatbot' |
| created_at | timestamptz | Timestamp |
| updated_at | timestamptz | Auto-updated timestamp |

## Security

- **RLS Enabled**: Row Level Security is enabled
- **Public Insert**: Anonymous users can insert leads
- **Authenticated Read**: Only authenticated users can view leads
- **Email Validation**: Client-side validation before submission
- **CORS Configured**: Edge Function has proper CORS headers

## Customization

### Change Project Types

Edit the `projectTypes` array in `ChatBot.tsx`:

```typescript
const projectTypes = [
  { value: 'Custom Type', label: '🎯 Custom Type', description: 'Description' },
  // Add more types...
];
```

### Modify Conversation

Update the conversation flow by editing the `handleInputSubmit` and `handleProjectTypeSelect` functions in `ChatBot.tsx`.

### Styling

The chatbot uses Tailwind CSS classes. Main colors:
- Primary: `#A3D1FF` (light blue)
- Background: `#1b1b1b` (dark gray)
- Black: `#000`

## Analytics

To track chatbot interactions, you can add analytics events:

```typescript
// Example with Google Analytics
gtag('event', 'chatbot_opened', {
  event_category: 'engagement'
});
```

## Troubleshooting

### Chatbot doesn't appear
- Check that `<ChatBot />` is included in `Layout.tsx`
- Ensure no CSS is hiding the button
- Check browser console for errors

### Form submission fails
- Verify Supabase environment variables
- Check Edge Function deployment status
- Verify database table exists
- Check browser network tab for errors

### Calendly link doesn't work
- Verify the Calendly link is correct
- Ensure it's a public link

## Testing

To test the complete flow:

1. Open the website
2. Click the chat button
3. Complete all steps
4. Verify data in Supabase dashboard:
   ```sql
   SELECT * FROM chatbot_leads ORDER BY created_at DESC LIMIT 10;
   ```

## Future Enhancements

Potential improvements:
- Add file upload capability
- Include phone number collection
- Add typing indicators with realistic delays
- Implement chat history persistence
- Add admin dashboard for lead management
- Email notifications on new leads
- CRM integration (HubSpot, Salesforce)
