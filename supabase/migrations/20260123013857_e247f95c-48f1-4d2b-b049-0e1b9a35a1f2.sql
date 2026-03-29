-- Create leads table to store contact form submissions
CREATE TABLE public.leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  whatsapp TEXT,
  cnpj TEXT,
  company TEXT,
  segment TEXT,
  product_type TEXT,
  country TEXT,
  message TEXT NOT NULL,
  client_type TEXT DEFAULT 'pessoa_fisica',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Policy: Allow insert from edge functions (service role)
CREATE POLICY "Service role can insert leads"
ON public.leads
FOR INSERT
WITH CHECK (true);

-- Policy: Allow select from edge functions (service role)  
CREATE POLICY "Service role can view leads"
ON public.leads
FOR SELECT
USING (true);

-- Add index for faster queries by date
CREATE INDEX idx_leads_created_at ON public.leads(created_at DESC);