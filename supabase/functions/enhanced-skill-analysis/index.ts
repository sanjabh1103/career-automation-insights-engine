
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { occupation_code, occupation_title, user_skills = [] } = await req.json();
    
    if (!occupation_code || !occupation_title) {
      throw new Error('Occupation code and title are required');
    }

    console.log(`Enhanced skill analysis for: ${occupation_title} (${occupation_code})`);

    const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Get existing skill recommendations
    const { data: existingSkills } = await supabase
      .from('ai_skill_recommendations')
      .select('*')
      .eq('occupation_code', occupation_code);

    // Get task assessments for context
    const { data: taskAssessments } = await supabase
      .from('ai_task_assessments')
      .select('*')
      .eq('occupation_code', occupation_code);

    // Enhanced analysis with LLM
    const analysis = await performEnhancedSkillAnalysis(
      occupation_title,
      occupation_code,
      existingSkills || [],
      taskAssessments || [],
      user_skills
    );

    // Store enhanced analysis results
    const { error: insertError } = await supabase
      .from('enhanced_skill_analysis')
      .insert({
        occupation_code,
        occupation_title,
        analysis_data: analysis,
        user_id: req.headers.get('user-id') || null
      });

    if (insertError) {
      console.error('Error storing enhanced analysis:', insertError);
    }

    return new Response(JSON.stringify(analysis), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in enhanced skill analysis:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      timestamp: new Date().toISOString()
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

async function performEnhancedSkillAnalysis(
  occupationTitle: string,
  occupationCode: string,
  existingSkills: any[],
  taskAssessments: any[],
  userSkills: any[]
) {
  const openAIKey = Deno.env.get('OPENAI_API_KEY');
  const geminiKey = Deno.env.get('GEMINI_API_KEY');

  const prompt = `
Perform an enhanced skill analysis for the occupation "${occupationTitle}" (O*NET: ${occupationCode}).

Context:
- Existing skill recommendations: ${JSON.stringify(existingSkills.slice(0, 5))}
- Task assessments: ${JSON.stringify(taskAssessments.slice(0, 5))}
- User's current skills: ${JSON.stringify(userSkills)}

Provide a comprehensive analysis including:
1. Skill gap analysis comparing user skills to occupation requirements
2. Future-proofing recommendations considering AI impact
3. Learning pathway suggestions with timelines
4. Market demand trends for these skills
5. Certification/credential recommendations

Return as JSON with this structure:
{
  "skillGaps": [{"skill": "...", "currentLevel": 1-5, "requiredLevel": 1-5, "priority": "high/medium/low"}],
  "futureProofSkills": ["skill1", "skill2"],
  "learningPathway": [{"phase": "...", "duration": "...", "skills": [...]}],
  "marketTrends": {"skill": "trend_description"},
  "certifications": [{"name": "...", "provider": "...", "relevance": "high/medium/low"}],
  "aiImpactMitigation": ["strategy1", "strategy2"]
}
`;

  if (openAIKey) {
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${openAIKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            { role: 'system', content: 'You are an expert career analyst specializing in skill development and AI impact assessment.' },
            { role: 'user', content: prompt }
          ],
          temperature: 0.3,
          max_tokens: 2000,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const content = data.choices[0].message.content;
        const jsonMatch = content.match(/\{[\s\S]*\}/);
        
        if (jsonMatch) {
          return JSON.parse(jsonMatch[0]);
        }
      }
    } catch (error) {
      console.error('OpenAI analysis failed:', error);
    }
  }

  if (geminiKey) {
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${geminiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { temperature: 0.3, maxOutputTokens: 2048 }
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const content = data.candidates[0].content.parts[0].text;
        const jsonMatch = content.match(/\{[\s\S]*\}/);
        
        if (jsonMatch) {
          return JSON.parse(jsonMatch[0]);
        }
      }
    } catch (error) {
      console.error('Gemini analysis failed:', error);
    }
  }

  // Fallback analysis
  return createFallbackSkillAnalysis(occupationTitle, existingSkills, userSkills);
}

function createFallbackSkillAnalysis(occupationTitle: string, existingSkills: any[], userSkills: any[]) {
  return {
    skillGaps: existingSkills.slice(0, 3).map(skill => ({
      skill: skill.skill_name,
      currentLevel: 2,
      requiredLevel: 4,
      priority: skill.priority === 1 ? 'high' : skill.priority === 2 ? 'medium' : 'low'
    })),
    futureProofSkills: ['Digital Literacy', 'Critical Thinking', 'Emotional Intelligence'],
    learningPathway: [
      { phase: 'Foundation', duration: '2-3 months', skills: ['Basic Skills'] },
      { phase: 'Intermediate', duration: '4-6 months', skills: ['Advanced Skills'] },
      { phase: 'Expert', duration: '6-12 months', skills: ['Specialized Skills'] }
    ],
    marketTrends: {
      'AI Integration': 'Growing demand for AI-human collaboration skills',
      'Remote Work': 'Increased need for digital communication skills'
    },
    certifications: [
      { name: 'Industry Certification', provider: 'Professional Body', relevance: 'high' }
    ],
    aiImpactMitigation: [
      'Focus on uniquely human skills',
      'Develop AI collaboration capabilities',
      'Build domain expertise that AI cannot easily replicate'
    ]
  };
}
