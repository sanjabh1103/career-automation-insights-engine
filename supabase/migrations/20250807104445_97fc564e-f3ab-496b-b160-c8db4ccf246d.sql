-- Phase 1D: Fix Security Audit Logging
-- Create proper security_audit_logs table to replace the broken one
DROP TABLE IF EXISTS public.security_audit_logs;
CREATE TABLE public.security_audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_type TEXT NOT NULL,
    user_id UUID REFERENCES auth.users(id),
    details JSONB NOT NULL DEFAULT '{}',
    severity TEXT NOT NULL CHECK (severity IN ('info', 'warning', 'error', 'critical')),
    ip_address TEXT, -- Changed from INET to TEXT to avoid casting issues
    user_agent TEXT,
    session_id TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Enable RLS on security_audit_logs
ALTER TABLE public.security_audit_logs ENABLE ROW LEVEL SECURITY;

-- RLS policies for security_audit_logs
CREATE POLICY "System can create audit logs" 
ON public.security_audit_logs 
FOR INSERT 
WITH CHECK (TRUE);

CREATE POLICY "Users can view their own audit logs" 
ON public.security_audit_logs 
FOR SELECT 
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all audit logs" 
ON public.security_audit_logs 
FOR SELECT 
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));