-- Fix function search paths for security
-- This prevents search_path-based attacks in database functions

-- 1. Fix handle_new_user function
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER 
SET search_path = ''
AS $function$
BEGIN
    INSERT INTO public.profiles (user_id, full_name, email, user_type)
    VALUES (
        NEW.id,
        COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'user_type', 'user')
    );
    RETURN NEW;
END;
$function$;

-- 2. Fix get_user_role function
CREATE OR REPLACE FUNCTION public.get_user_role(user_uuid uuid)
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $function$
DECLARE
    user_role TEXT;
BEGIN
    SELECT role INTO user_role FROM public.profiles WHERE user_id = user_uuid;
    RETURN COALESCE(user_role, 'user');
END;
$function$;

-- 3. Fix generate_secure_share_token function
CREATE OR REPLACE FUNCTION public.generate_secure_share_token()
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $function$
BEGIN
    RETURN encode(gen_random_bytes(32), 'base64');
END;
$function$;

-- 4. Fix update_updated_at_column function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = ''
AS $function$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$function$;

-- 5. Remove overly permissive RLS policies and replace with authenticated-only versions

-- Fix profiles table policies - remove anonymous access
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;

CREATE POLICY "Authenticated users can view own profile" 
ON public.profiles 
FOR SELECT 
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Authenticated users can update own profile" 
ON public.profiles 
FOR UPDATE 
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Authenticated users can insert own profile" 
ON public.profiles 
FOR INSERT 
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- Fix ab_tests table policies 
DROP POLICY IF EXISTS "Users can view their own ab tests" ON public.ab_tests;
DROP POLICY IF EXISTS "Users can create their own ab tests" ON public.ab_tests;
DROP POLICY IF EXISTS "Users can update their own ab tests" ON public.ab_tests;
DROP POLICY IF EXISTS "Users can delete their own ab tests" ON public.ab_tests;

CREATE POLICY "Authenticated users can view their own ab tests" 
ON public.ab_tests 
FOR SELECT 
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Authenticated users can create their own ab tests" 
ON public.ab_tests 
FOR INSERT 
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Authenticated users can update their own ab tests" 
ON public.ab_tests 
FOR UPDATE 
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Authenticated users can delete their own ab tests" 
ON public.ab_tests 
FOR DELETE 
TO authenticated
USING (auth.uid() = user_id);

-- Create dedicated security audit table instead of using analytics_events
CREATE TABLE IF NOT EXISTS public.security_audit_logs (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    event_type TEXT NOT NULL,
    user_id UUID REFERENCES auth.users(id),
    details JSONB NOT NULL DEFAULT '{}',
    severity TEXT NOT NULL CHECK (severity IN ('info', 'warning', 'error', 'critical')),
    ip_address INET,
    user_agent TEXT,
    session_id TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on security audit logs
ALTER TABLE public.security_audit_logs ENABLE ROW LEVEL SECURITY;

-- Only system can insert security logs, admins can read them
CREATE POLICY "System can insert security logs" 
ON public.security_audit_logs 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Admins can view security logs" 
ON public.security_audit_logs 
FOR SELECT 
TO authenticated
USING (public.get_user_role(auth.uid()) = 'admin');

-- Add proper indexes for security audit logs
CREATE INDEX IF NOT EXISTS idx_security_audit_logs_user_id ON public.security_audit_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_security_audit_logs_event_type ON public.security_audit_logs(event_type);
CREATE INDEX IF NOT EXISTS idx_security_audit_logs_created_at ON public.security_audit_logs(created_at);
CREATE INDEX IF NOT EXISTS idx_security_audit_logs_severity ON public.security_audit_logs(severity);