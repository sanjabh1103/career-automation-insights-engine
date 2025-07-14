
-- Create table for AI task assessments cache
CREATE TABLE IF NOT EXISTS public.ai_task_assessments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  occupation_code TEXT NOT NULL,
  task_description TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('Automate', 'Augment', 'Human-only')),
  explanation TEXT,
  confidence DECIMAL(3,2) CHECK (confidence >= 0 AND confidence <= 1),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for AI reskilling resources
CREATE TABLE IF NOT EXISTS public.ai_reskilling_resources (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  url TEXT NOT NULL,
  provider TEXT NOT NULL,
  skill_area TEXT NOT NULL,
  cost_type TEXT DEFAULT 'Unknown',
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add RLS policies for ai_task_assessments
ALTER TABLE public.ai_task_assessments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read task assessments" 
  ON public.ai_task_assessments 
  FOR SELECT 
  USING (true);

CREATE POLICY "System can write task assessments" 
  ON public.ai_task_assessments 
  FOR INSERT 
  WITH CHECK (true);

-- Add RLS policies for ai_reskilling_resources  
ALTER TABLE public.ai_reskilling_resources ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read reskilling resources" 
  ON public.ai_reskilling_resources 
  FOR SELECT 
  USING (true);

CREATE POLICY "System can write reskilling resources" 
  ON public.ai_reskilling_resources 
  FOR INSERT 
  WITH CHECK (true);

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_ai_task_assessments_occupation ON public.ai_task_assessments(occupation_code);
CREATE INDEX IF NOT EXISTS idx_ai_reskilling_resources_skill_area ON public.ai_reskilling_resources(skill_area);

-- Add updated_at trigger for ai_task_assessments
CREATE OR REPLACE FUNCTION update_ai_task_assessments_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_ai_task_assessments_updated_at
  BEFORE UPDATE ON public.ai_task_assessments
  FOR EACH ROW EXECUTE FUNCTION update_ai_task_assessments_updated_at();

-- Add updated_at trigger for ai_reskilling_resources
CREATE OR REPLACE FUNCTION update_ai_reskilling_resources_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_ai_reskilling_resources_updated_at
  BEFORE UPDATE ON public.ai_reskilling_resources
  FOR EACH ROW EXECUTE FUNCTION update_ai_reskilling_resources_updated_at();

-- Insert some sample reskilling resources
INSERT INTO public.ai_reskilling_resources (title, url, provider, skill_area, cost_type, description) VALUES
('Complex Problem Solving Fundamentals', 'https://www.coursera.org/learn/complex-problem-solving', 'Coursera', 'Complex Problem Solving', 'Freemium', 'Learn systematic approaches to complex problem solving'),
('Emotional Intelligence at Work', 'https://www.linkedin.com/learning/emotional-intelligence-at-work', 'LinkedIn Learning', 'Emotional Intelligence', 'Paid', 'Develop emotional intelligence skills for workplace success'),
('AI Collaboration and Prompt Engineering', 'https://www.edx.org/course/ai-collaboration', 'edX', 'AI Collaboration Skills', 'Free', 'Learn to work effectively with AI tools and systems'),
('Ethics in Technology and Business', 'https://www.coursera.org/learn/ethics-technology-business', 'Coursera', 'Ethical Decision Making', 'Freemium', 'Navigate ethical challenges in modern technology and business'),
('Creative Thinking and Innovation', 'https://www.skillshare.com/classes/creative-thinking', 'Skillshare', 'Creative Thinking', 'Paid', 'Unlock your creative potential and innovative thinking'),
('Leadership in the Digital Age', 'https://www.futurelearn.com/courses/digital-leadership', 'FutureLearn', 'Leadership Skills', 'Freemium', 'Develop leadership skills for the digital transformation era')
ON CONFLICT (id) DO NOTHING;
