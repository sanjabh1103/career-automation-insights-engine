-- CRITICAL SECURITY FIXES: Enable RLS and create proper policies

-- 1. Enable RLS on tables that currently don't have it enabled
ALTER TABLE public.cases ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.arbitrage_alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.economic_models ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.document_versions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.content_validation ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.landmark_predictions ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for cases table
CREATE POLICY "Users can manage their own cases" 
  ON public.cases 
  FOR ALL 
  USING (auth.uid() = user_id);

-- Create RLS policies for arbitrage_alerts table  
CREATE POLICY "Users can view their own arbitrage alerts" 
  ON public.arbitrage_alerts 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "System can create arbitrage alerts" 
  ON public.arbitrage_alerts 
  FOR INSERT 
  WITH CHECK (true);

-- Create RLS policies for economic_models table
CREATE POLICY "Anyone can read economic models" 
  ON public.economic_models 
  FOR SELECT 
  USING (true);

CREATE POLICY "System can create economic models" 
  ON public.economic_models 
  FOR INSERT 
  WITH CHECK (true);

-- Create RLS policies for document_versions table
CREATE POLICY "Users can view document versions they have access to" 
  ON public.document_versions 
  FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM public.collaborative_documents 
      WHERE id = document_versions.document_id 
      AND (
        auth.uid() = owner_id 
        OR auth.uid() = ANY(collaborators)
        OR auth.uid() = ANY(((permissions ->> 'read'::text))::uuid[])
        OR auth.uid() = ANY(((permissions ->> 'write'::text))::uuid[])
        OR auth.uid() = ANY(((permissions ->> 'admin'::text))::uuid[])
      )
    )
  );

-- Create RLS policies for content_validation table
CREATE POLICY "Users can manage their own content validation" 
  ON public.content_validation 
  FOR ALL 
  USING (auth.uid() = user_id OR user_id IS NULL);

-- Create RLS policies for landmark_predictions table
CREATE POLICY "Users can manage their own landmark predictions" 
  ON public.landmark_predictions 
  FOR ALL 
  USING (auth.uid() = user_id);

-- 2. Create notifications table for security notifications
CREATE TABLE public.notifications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'info' CHECK (type IN ('info', 'success', 'warning', 'error')),
  read BOOLEAN NOT NULL DEFAULT false,
  important BOOLEAN NOT NULL DEFAULT false,
  metadata JSONB DEFAULT '{}',
  action_url TEXT,
  expires_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on notifications
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- Create policies for notifications
CREATE POLICY "Users can view their own notifications" 
  ON public.notifications 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own notifications" 
  ON public.notifications 
  FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own notifications" 
  ON public.notifications 
  FOR DELETE 
  USING (auth.uid() = user_id);

CREATE POLICY "System can create notifications" 
  ON public.notifications 
  FOR INSERT 
  WITH CHECK (true);

-- Add trigger for notifications updated_at
CREATE TRIGGER update_notifications_updated_at 
  BEFORE UPDATE ON public.notifications 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 3. Create security_audit_log table
CREATE TABLE public.security_audit_log (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  event_type TEXT NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  event_data JSONB NOT NULL DEFAULT '{}',
  severity TEXT NOT NULL DEFAULT 'low' CHECK (severity IN ('low', 'medium', 'high', 'critical')),
  ip_address INET,
  user_agent TEXT,
  session_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on security_audit_log
ALTER TABLE public.security_audit_log ENABLE ROW LEVEL SECURITY;

-- Create policies for security_audit_log (admin only)
CREATE POLICY "System can insert security logs" 
  ON public.security_audit_log 
  FOR INSERT 
  WITH CHECK (true);

-- 4. Add missing columns to profiles table for security features
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS api_credits INTEGER DEFAULT 100;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS subscription_tier TEXT DEFAULT 'free';
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS last_login TIMESTAMP WITH TIME ZONE;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS failed_login_attempts INTEGER DEFAULT 0;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS account_locked_until TIMESTAMP WITH TIME ZONE;

-- 5. Create rate_limit_tracking table
CREATE TABLE public.rate_limit_tracking (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  action_type TEXT NOT NULL,
  request_count INTEGER NOT NULL DEFAULT 1,
  window_start TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, action_type, window_start)
);

-- Enable RLS on rate_limit_tracking
ALTER TABLE public.rate_limit_tracking ENABLE ROW LEVEL SECURITY;

-- Create policies for rate_limit_tracking
CREATE POLICY "Users can view their own rate limits" 
  ON public.rate_limit_tracking 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "System can manage rate limits" 
  ON public.rate_limit_tracking 
  FOR ALL 
  USING (true);

-- 6. Create indexes for performance and security
CREATE INDEX idx_notifications_user_id_read ON public.notifications(user_id, read);
CREATE INDEX idx_security_audit_log_user_id ON public.security_audit_log(user_id);
CREATE INDEX idx_security_audit_log_event_type ON public.security_audit_log(event_type);
CREATE INDEX idx_security_audit_log_severity ON public.security_audit_log(severity);
CREATE INDEX idx_rate_limit_tracking_user_action ON public.rate_limit_tracking(user_id, action_type);
CREATE INDEX idx_profiles_api_credits ON public.profiles(api_credits);

-- 7. Create security functions
CREATE OR REPLACE FUNCTION public.log_security_event(
  p_event_type TEXT,
  p_user_id UUID DEFAULT NULL,
  p_event_data JSONB DEFAULT '{}',
  p_severity TEXT DEFAULT 'low',
  p_ip_address TEXT DEFAULT NULL,
  p_user_agent TEXT DEFAULT NULL
) RETURNS UUID AS $$
DECLARE
  log_id UUID;
BEGIN
  INSERT INTO public.security_audit_log (
    event_type, user_id, event_data, severity, ip_address, user_agent
  ) VALUES (
    p_event_type, p_user_id, p_event_data, p_severity, p_ip_address::INET, p_user_agent
  ) RETURNING id INTO log_id;
  
  RETURN log_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;