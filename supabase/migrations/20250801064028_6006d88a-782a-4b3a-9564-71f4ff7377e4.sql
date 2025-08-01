-- Complete the remaining security fixes (notifications table already exists)

-- 1. Enable RLS on remaining tables that don't have it enabled
ALTER TABLE public.cases ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.arbitrage_alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.economic_models ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.document_versions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.content_validation ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.landmark_predictions ENABLE ROW LEVEL SECURITY;

-- 2. Create missing RLS policies
CREATE POLICY "Users can manage their own cases" 
  ON public.cases 
  FOR ALL 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can view their own arbitrage alerts" 
  ON public.arbitrage_alerts 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "System can create arbitrage alerts" 
  ON public.arbitrage_alerts 
  FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Anyone can read economic models" 
  ON public.economic_models 
  FOR SELECT 
  USING (true);

CREATE POLICY "System can create economic models" 
  ON public.economic_models 
  FOR INSERT 
  WITH CHECK (true);

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

CREATE POLICY "Users can manage their own content validation" 
  ON public.content_validation 
  FOR ALL 
  USING (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Users can manage their own landmark predictions" 
  ON public.landmark_predictions 
  FOR ALL 
  USING (auth.uid() = user_id);

-- 3. Add missing columns to profiles table for security features
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS api_credits INTEGER DEFAULT 100;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS subscription_tier TEXT DEFAULT 'free';
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS last_login TIMESTAMP WITH TIME ZONE;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS failed_login_attempts INTEGER DEFAULT 0;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS account_locked_until TIMESTAMP WITH TIME ZONE;