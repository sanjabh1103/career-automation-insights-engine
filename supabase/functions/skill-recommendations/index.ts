import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const GEMINI_API_KEY = Deno.env.get('GEMINI_API_KEY');

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    if (!GEMINI_API_KEY) {
      throw new Error('Gemini API key is not configured');
    }

    const { occupation_code, occupation_title } = await req.json();
    
    if (!occupation_code || !occupation_title) {
      throw new Error('Occupation code and title are required');
    }

    console.log(`Generating skill recommendations for: ${occupation_title} (${occupation_code})`);

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Check if we already have cached recommendations
    const { data: cachedRecommendations } = await supabase
      .from('ai_skill_recommendations')
      .select('*')
      .eq('occupation_code', occupation_code)
      .order('priority', { ascending: true });

    if (cachedRecommendations && cachedRecommendations.length > 0) {
      console.log('Using cached skill recommendations');
      return new Response(JSON.stringify(cachedRecommendations), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Fetch task assessments for this occupation
    const { data: taskAssessments } = await supabase
      .from('ai_task_assessments')
      .select('*')
      .eq('occupation_code', occupation_code);

    // Prepare the prompt for Gemini
    const prompt = `
You are a career advisor specializing in AI's impact on jobs. Based on the occupation "${occupation_title}" (O*NET code: ${occupation_code}), recommend 5 key skills that workers should develop to stay relevant as AI transforms their field.

${taskAssessments && taskAssessments.length > 0 ? `
Task analysis for this occupation:
${taskAssessments.map((task: any) => `- ${task.task_description} (Category: ${task.category})`).join('\n')}
` : ''}

For each skill:
1. Provide a specific, actionable skill name (not general categories)
2. Explain why this skill is important for future-proofing this career
3. Assign a priority level (1=highest, 3=lowest)

Focus on skills that:
- Complement AI capabilities rather than compete with them
- Emphasize uniquely human abilities (creativity, empathy, complex judgment)
- Have transferability across roles and industries
- Are in growing demand based on job market trends

Output format:
[
  {
    "skill_name": "Specific skill name",
    "explanation": "Detailed explanation of why this skill matters",
    "priority": 1
  }
]
`;

    // Call Gemini API
    const geminiResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }],
        generationConfig: {
          temperature: 0.2,
          topK: 1,
          topP: 0.8,
          maxOutputTokens: 2048,
        }
      }),
    });

    if (!geminiResponse.ok) {
      const errorText = await geminiResponse.text();
      console.error('Gemini API Error:', errorText);
      throw new Error(`Gemini API request failed: ${geminiResponse.statusText}`);
    }

    const geminiData = await geminiResponse.json();
    
    if (!geminiData.candidates || !geminiData.candidates[0] || !geminiData.candidates[0].content) {
      throw new Error('Invalid response from Gemini API');
    }

    const generatedText = geminiData.candidates[0].content.parts[0].text;
    
    // Extract JSON from response
    let recommendationsData;
    try {
      const jsonMatch = generatedText.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        recommendationsData = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('No JSON found in response');
      }
    } catch (parseError) {
      console.error('Failed to parse Gemini response as JSON:', parseError);
      throw new Error('Failed to parse skill recommendations from Gemini');
    }

    // Store recommendations in Supabase
    const recommendationsInserts = recommendationsData.map((rec: any) => ({
      occupation_code,
      skill_name: rec.skill_name,
      explanation: rec.explanation,
      priority: rec.priority
    }));

    const { error: insertError } = await supabase
      .from('ai_skill_recommendations')
      .insert(recommendationsInserts);

    if (insertError) {
      console.error('Error storing skill recommendations:', insertError);
    }

    // Also create some sample learning resources if none exist
    const { data: existingResources } = await supabase
      .from('ai_reskilling_resources')
      .select('count')
      .limit(1);

    if (!existingResources || existingResources.length === 0) {
      const sampleResources = [
        {
          skill_area: "Data Analysis",
          title: "Data Science Specialization",
          url: "https://www.coursera.org/specializations/jhu-data-science",
          provider: "Coursera",
          description: "Learn data science fundamentals with R programming",
          cost_type: "Paid"
        },
        {
          skill_area: "Emotional Intelligence",
          title: "Emotional Intelligence at Work",
          url: "https://www.linkedin.com/learning/emotional-intelligence-at-work",
          provider: "LinkedIn Learning",
          description: "Develop emotional intelligence skills for workplace success",
          cost_type: "Paid"
        },
        {
          skill_area: "Critical Thinking",
          title: "Introduction to Critical Thinking",
          url: "https://www.edx.org/learn/critical-thinking",
          provider: "edX",
          description: "Learn to analyze and evaluate information effectively",
          cost_type: "Free"
        },
        {
          skill_area: "Project Management",
          title: "Google Project Management Certificate",
          url: "https://www.coursera.org/professional-certificates/google-project-management",
          provider: "Coursera",
          description: "Gain in-demand project management skills",
          cost_type: "Paid"
        },
        {
          skill_area: "Communication",
          title: "Effective Communication in the Workplace",
          url: "https://www.udemy.com/course/effective-communication-in-the-workplace",
          provider: "Udemy",
          description: "Master workplace communication skills",
          cost_type: "Paid"
        }
      ];

      await supabase
        .from('ai_reskilling_resources')
        .insert(sampleResources);
    }

    return new Response(JSON.stringify(recommendationsData), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in skill-recommendations function:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      timestamp: new Date().toISOString(),
      function: 'skill-recommendations'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});