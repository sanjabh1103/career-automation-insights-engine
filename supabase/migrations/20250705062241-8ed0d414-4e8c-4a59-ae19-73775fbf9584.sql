
-- Create table for enhanced skill analysis results
CREATE TABLE IF NOT EXISTS public.enhanced_skill_analysis (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  occupation_code TEXT NOT NULL,
  occupation_title TEXT NOT NULL,
  user_id UUID REFERENCES auth.users,
  analysis_data JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for market insights cache
CREATE TABLE IF NOT EXISTS public.market_insights_cache (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  occupation_title TEXT NOT NULL,
  location TEXT NOT NULL DEFAULT 'United States',
  time_horizon INTEGER NOT NULL DEFAULT 12,
  insights_data JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add RLS policies for enhanced_skill_analysis
ALTER TABLE public.enhanced_skill_analysis ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own enhanced skill analysis" 
  ON public.enhanced_skill_analysis 
  FOR SELECT 
  USING (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Users can create enhanced skill analysis" 
  ON public.enhanced_skill_analysis 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

-- Add RLS policies for market_insights_cache
ALTER TABLE public.market_insights_cache ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read market insights cache" 
  ON public.market_insights_cache 
  FOR SELECT 
  USING (true);

CREATE POLICY "System can write market insights cache" 
  ON public.market_insights_cache 
  FOR INSERT 
  WITH CHECK (true);

-- Add index for better performance
CREATE INDEX IF NOT EXISTS idx_enhanced_skill_analysis_occupation ON public.enhanced_skill_analysis(occupation_code, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_market_insights_cache_lookup ON public.market_insights_cache(occupation_title, location, created_at DESC);

-- Add updated_at trigger for enhanced_skill_analysis
CREATE OR REPLACE FUNCTION update_enhanced_skill_analysis_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_enhanced_skill_analysis_updated_at
  BEFORE UPDATE ON public.enhanced_skill_analysis
  FOR EACH ROW EXECUTE FUNCTION update_enhanced_skill_analysis_updated_at();
