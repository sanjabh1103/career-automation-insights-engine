
-- Create user profiles table for career planning
CREATE TABLE IF NOT EXISTS public.user_profiles (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users NOT NULL,
  skills jsonb DEFAULT '[]'::jsonb,
  experience text,
  current_role text,
  target_role text,
  experience_years integer DEFAULT 0,
  preferences jsonb DEFAULT '{}'::jsonb,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  UNIQUE(user_id)
);

-- Create skill recommendations table
CREATE TABLE IF NOT EXISTS public.skill_recommendations (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users NOT NULL,
  occupation text NOT NULL,
  recommendations jsonb NOT NULL,
  created_at timestamp with time zone DEFAULT now()
);

-- Create learning paths table
CREATE TABLE IF NOT EXISTS public.learning_paths (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users NOT NULL,
  name text NOT NULL,
  description text,
  skills jsonb NOT NULL,
  learning_path jsonb NOT NULL,
  status text DEFAULT 'active',
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Create skill progress tracking table
CREATE TABLE IF NOT EXISTS public.skill_progress (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users NOT NULL,
  skill text NOT NULL,
  status text DEFAULT 'not_started',
  progress_percentage integer DEFAULT 0,
  courses_completed jsonb DEFAULT '[]'::jsonb,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  UNIQUE(user_id, skill)
);

-- Create course cache table for performance
CREATE TABLE IF NOT EXISTS public.course_cache (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  skill text NOT NULL,
  courses jsonb NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  expires_at timestamp with time zone DEFAULT (now() + interval '24 hours')
);

-- Create market insights cache
CREATE TABLE IF NOT EXISTS public.market_insights_cache (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  occupation_title text NOT NULL,
  location text DEFAULT 'United States',
  time_horizon integer DEFAULT 12,
  insights_data jsonb NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  UNIQUE(occupation_title, location, time_horizon)
);

-- Create enhanced skill analysis table
CREATE TABLE IF NOT EXISTS public.enhanced_skill_analysis (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  occupation_code text NOT NULL,
  occupation_title text NOT NULL,
  analysis_data jsonb NOT NULL,
  user_id uuid REFERENCES auth.users,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skill_recommendations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.learning_paths ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skill_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.course_cache ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.market_insights_cache ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enhanced_skill_analysis ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can manage their own profiles" ON public.user_profiles
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own skill recommendations" ON public.skill_recommendations
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own learning paths" ON public.learning_paths
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own skill progress" ON public.skill_progress
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Anyone can read course cache" ON public.course_cache
  FOR SELECT USING (true);

CREATE POLICY "System can manage course cache" ON public.course_cache
  FOR ALL USING (true);

CREATE POLICY "Anyone can read market insights cache" ON public.market_insights_cache
  FOR SELECT USING (true);

CREATE POLICY "System can manage market insights cache" ON public.market_insights_cache
  FOR ALL USING (true);

CREATE POLICY "Users can manage their own enhanced analysis" ON public.enhanced_skill_analysis
  FOR ALL USING (auth.uid() = user_id OR user_id IS NULL);

-- Create triggers for updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_user_profiles_updated_at BEFORE UPDATE ON public.user_profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_learning_paths_updated_at BEFORE UPDATE ON public.learning_paths
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_skill_progress_updated_at BEFORE UPDATE ON public.skill_progress
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_enhanced_skill_analysis_updated_at BEFORE UPDATE ON public.enhanced_skill_analysis
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
