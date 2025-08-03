-- Fix remaining critical security issues

-- 1. Enable RLS on all tables that have policies but RLS is disabled
ALTER TABLE public.crisis_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.diplomatic_communications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.historical_patterns ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.legal_evolution_models ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.model_performance ENABLE ROW LEVEL SECURITY;

-- 2. Enable RLS on tables without any RLS protection
ALTER TABLE public.risk_assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sentiment_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.solutions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.economic_models ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.document_versions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.landmark_predictions ENABLE ROW LEVEL SECURITY;

-- 3. Create basic RLS policies for tables that don't have them
CREATE POLICY "Public read access" ON public.risk_assessments FOR SELECT USING (true);
CREATE POLICY "System write access" ON public.risk_assessments FOR INSERT WITH CHECK (true);

CREATE POLICY "Public read access" ON public.sentiment_data FOR SELECT USING (true);
CREATE POLICY "System write access" ON public.sentiment_data FOR INSERT WITH CHECK (true);

CREATE POLICY "Public read access" ON public.solutions FOR SELECT USING (true);
CREATE POLICY "System write access" ON public.solutions FOR INSERT WITH CHECK (true);

CREATE POLICY "Public read access" ON public.historical_patterns FOR SELECT USING (true);
CREATE POLICY "System write access" ON public.historical_patterns FOR INSERT WITH CHECK (true);

CREATE POLICY "Public read access" ON public.legal_evolution_models FOR SELECT USING (true);
CREATE POLICY "System write access" ON public.legal_evolution_models FOR INSERT WITH CHECK (true);

CREATE POLICY "Public read access" ON public.model_performance FOR SELECT USING (true);
CREATE POLICY "System write access" ON public.model_performance FOR INSERT WITH CHECK (true);

-- 4. Fix function search paths to prevent security issues
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER 
SET search_path = 'public'
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

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = 'public'
AS $function$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$function$;

CREATE OR REPLACE FUNCTION public.get_user_role(user_uuid uuid)
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $function$
DECLARE
    user_role TEXT;
BEGIN
    SELECT role INTO user_role FROM public.profiles WHERE user_id = user_uuid;
    RETURN COALESCE(user_role, 'user');
END;
$function$;

CREATE OR REPLACE FUNCTION public.generate_secure_share_token()
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $function$
BEGIN
    RETURN encode(gen_random_bytes(32), 'base64');
END;
$function$;

CREATE OR REPLACE FUNCTION public.update_ai_task_assessments_updated_at()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = 'public'
AS $function$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$function$;

CREATE OR REPLACE FUNCTION public.update_ai_reskilling_resources_updated_at()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = 'public'
AS $function$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$function$;

CREATE OR REPLACE FUNCTION public.update_project_analytics(p_project_id uuid, p_user_id uuid)
RETURNS void
LANGUAGE plpgsql
SET search_path = 'public'
AS $function$
DECLARE
    v_message_count integer := 0;
    v_agent_count integer := 0;
    v_file_count integer := 0;
    v_ai_interactions integer := 0;
BEGIN
    -- Count messages
    SELECT COUNT(*) INTO v_message_count
    FROM messages 
    WHERE project_id = p_project_id;

    -- Count active agents
    SELECT COUNT(*) INTO v_agent_count
    FROM agents 
    WHERE project_id = p_project_id AND is_active = true;

    -- Count files
    SELECT COUNT(*) INTO v_file_count
    FROM project_files 
    WHERE project_id = p_project_id;

    -- Count AI interactions (assuming each message is an interaction)
    v_ai_interactions := v_message_count;

    -- Insert or update analytics
    INSERT INTO project_analytics (
        project_id, user_id, total_messages, active_agents, 
        files_uploaded, ai_interactions, date
    ) VALUES (
        p_project_id, p_user_id, v_message_count, v_agent_count, 
        v_file_count, v_ai_interactions, CURRENT_DATE
    )
    ON CONFLICT (project_id, user_id, date) DO UPDATE SET
        total_messages = EXCLUDED.total_messages,
        active_agents = EXCLUDED.active_agents,
        files_uploaded = EXCLUDED.files_uploaded,
        ai_interactions = EXCLUDED.ai_interactions;
END;
$function$;

CREATE OR REPLACE FUNCTION public.update_model_success_rate()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = 'public'
AS $function$
BEGIN
  -- Update success_rate for the mental model based on average rating
  UPDATE mental_models 
  SET success_rate = (
    SELECT COALESCE(AVG(rating::numeric), 0)
    FROM recommendation_feedback 
    WHERE model_id = NEW.model_id
  )
  WHERE id = NEW.model_id;
  
  RETURN NEW;
END;
$function$;

-- 5. Remove duplicate policies on profiles table (keep the most restrictive ones)
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;

-- Keep only the comprehensive policy
-- (The existing "Users can manage their own profile" policy should remain)

-- 6. Create a more secure analytics events table policy
DROP POLICY IF EXISTS "System can create analytics events" ON public.analytics_events;
DROP POLICY IF EXISTS "Users can view their own analytics" ON public.analytics_events;

CREATE POLICY "Authenticated users can view own analytics" 
  ON public.analytics_events 
  FOR SELECT 
  USING (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "System can log analytics events" 
  ON public.analytics_events 
  FOR INSERT 
  WITH CHECK (true);