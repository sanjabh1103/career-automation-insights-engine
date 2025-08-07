-- Phase 1: Critical Security Fixes

-- 1. Fix Role-Based Access Control System
-- Create proper app roles enum
CREATE TYPE IF NOT EXISTS public.app_role AS ENUM ('admin', 'moderator', 'user');

-- Create user_roles table with proper structure
CREATE TABLE IF NOT EXISTS public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL DEFAULT 'user',
    assigned_by UUID REFERENCES auth.users(id),
    assigned_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    expires_at TIMESTAMP WITH TIME ZONE,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    UNIQUE(user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check user roles
CREATE OR REPLACE FUNCTION public.get_user_role(user_uuid UUID)
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
    user_role TEXT;
BEGIN
    SELECT role::TEXT INTO user_role 
    FROM public.user_roles 
    WHERE user_id = user_uuid 
    AND is_active = TRUE 
    AND (expires_at IS NULL OR expires_at > NOW())
    ORDER BY 
        CASE role 
            WHEN 'admin' THEN 1 
            WHEN 'moderator' THEN 2 
            WHEN 'user' THEN 3 
        END
    LIMIT 1;
    
    RETURN COALESCE(user_role, 'user');
END;
$$;

-- Create helper function to check if user has specific role
CREATE OR REPLACE FUNCTION public.has_role(user_uuid UUID, required_role app_role)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 
        FROM public.user_roles 
        WHERE user_id = user_uuid 
        AND role = required_role 
        AND is_active = TRUE 
        AND (expires_at IS NULL OR expires_at > NOW())
    );
END;
$$;

-- Create helper function to check if user has role or higher
CREATE OR REPLACE FUNCTION public.has_role_or_higher(user_uuid UUID, required_role app_role)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
    user_role_level INTEGER;
    required_role_level INTEGER;
BEGIN
    -- Get user's highest role level
    SELECT 
        CASE role 
            WHEN 'admin' THEN 3
            WHEN 'moderator' THEN 2 
            WHEN 'user' THEN 1
            ELSE 0
        END INTO user_role_level
    FROM public.user_roles 
    WHERE user_id = user_uuid 
    AND is_active = TRUE 
    AND (expires_at IS NULL OR expires_at > NOW())
    ORDER BY 
        CASE role 
            WHEN 'admin' THEN 3
            WHEN 'moderator' THEN 2
            WHEN 'user' THEN 1
        END DESC
    LIMIT 1;
    
    -- Get required role level
    required_role_level := 
        CASE required_role 
            WHEN 'admin' THEN 3
            WHEN 'moderator' THEN 2
            WHEN 'user' THEN 1
            ELSE 0
        END;
    
    RETURN COALESCE(user_role_level, 1) >= required_role_level;
END;
$$;

-- RLS policies for user_roles table
CREATE POLICY "Users can view their own roles" 
ON public.user_roles 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all roles" 
ON public.user_roles 
FOR SELECT 
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage all roles" 
ON public.user_roles 
FOR ALL 
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- 2. Fix Security Audit Logging
-- Create proper security_audit_logs table
CREATE TABLE IF NOT EXISTS public.security_audit_logs (
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
USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all audit logs" 
ON public.security_audit_logs 
FOR SELECT 
USING (public.has_role(auth.uid(), 'admin'));

-- Create function to automatically assign default role to new users
CREATE OR REPLACE FUNCTION public.handle_new_user_role()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
    INSERT INTO public.user_roles (user_id, role, assigned_by)
    VALUES (NEW.id, 'user', NEW.id);
    RETURN NEW;
END;
$$;

-- Create trigger to assign default role to new users
DROP TRIGGER IF EXISTS on_auth_user_created_role ON auth.users;
CREATE TRIGGER on_auth_user_created_role
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user_role();

-- 3. Restrict overly permissive public access policies
-- Update some of the most critical public access policies

-- Restrict ai_reskilling_resources to authenticated users only
DROP POLICY IF EXISTS "Anyone can read reskilling resources" ON public.ai_reskilling_resources;
CREATE POLICY "Authenticated users can read reskilling resources" 
ON public.ai_reskilling_resources 
FOR SELECT 
TO authenticated
USING (TRUE);

-- Restrict ai_task_assessments to authenticated users only
DROP POLICY IF EXISTS "Anyone can read task assessments" ON public.ai_task_assessments;
CREATE POLICY "Authenticated users can read task assessments" 
ON public.ai_task_assessments 
FOR SELECT 
TO authenticated
USING (TRUE);

-- Restrict crisis_events to authenticated users only
DROP POLICY IF EXISTS "Anyone can read crisis events" ON public.crisis_events;
DROP POLICY IF EXISTS "Users can view public crisis events" ON public.crisis_events;
CREATE POLICY "Authenticated users can view crisis events" 
ON public.crisis_events 
FOR SELECT 
TO authenticated
USING (TRUE);

-- Restrict diplomatic_communications to authenticated users only
DROP POLICY IF EXISTS "Users can view public diplomatic communications" ON public.diplomatic_communications;
CREATE POLICY "Authenticated users can view diplomatic communications" 
ON public.diplomatic_communications 
FOR SELECT 
TO authenticated
USING (TRUE);

-- Update profiles table to use proper role-based access
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
CREATE POLICY "Users can update their own profile" 
ON public.profiles 
FOR UPDATE 
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Admins can update any profile" 
ON public.profiles 
FOR UPDATE 
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Update trigger function to set proper search path
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$;