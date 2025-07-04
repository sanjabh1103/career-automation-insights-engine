
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface LearningPathRequest {
  userSkills: Array<{
    name: string;
    currentLevel: number;
    targetLevel: number;
    category: string;
  }>;
  targetRole: string;
  currentRole: string;
  timeCommitment: string; // hours per week
  learningStyle: string;
  budget: string;
}

interface Milestone {
  id: string;
  title: string;
  description: string;
  targetDate: string;
  completed: boolean;
  skills: string[];
}

interface LearningPath {
  id: string;
  name: string;
  description: string;
  skills: string[];
  estimatedDuration: string;
  milestones: Milestone[];
  difficulty: string;
  prerequisites: string[];
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { userSkills, targetRole, currentRole, timeCommitment, learningStyle, budget }: LearningPathRequest = await req.json();
    
    console.log('Received request:', { userSkills, targetRole, currentRole, timeCommitment, learningStyle, budget });

    // Check if we have the required API key
    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openAIApiKey) {
      console.error('OpenAI API key not found - generating fallback learning path');
      
      // Generate fallback learning path without API call
      const fallbackPath = createFallbackLearningPath(
        userSkills.filter(skill => skill.targetLevel > skill.currentLevel), 
        targetRole, 
        timeCommitment
      );
      
      return new Response(JSON.stringify({
        learningPath: fallbackPath,
        generatedAt: new Date().toISOString(),
        metadata: {
          skillGapsAddressed: userSkills.filter(skill => skill.targetLevel > skill.currentLevel).length,
          estimatedWeeksToComplete: calculateWeeksToComplete(fallbackPath.estimatedDuration, timeCommitment),
          note: 'Generated using fallback method due to API configuration'
        }
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const skillGaps = userSkills.filter(skill => skill.targetLevel > skill.currentLevel);
    
    console.log('Skill gaps identified:', skillGaps);
    
    const prompt = `
As an AI career development expert, create a personalized learning path for the following scenario:

Current Role: ${currentRole}
Target Role: ${targetRole}
Time Commitment: ${timeCommitment} hours per week
Learning Style: ${learningStyle}
Budget: ${budget}

Skill Gaps to Address:
${skillGaps.map(skill => `- ${skill.name}: Current Level ${skill.currentLevel} → Target Level ${skill.targetLevel} (Category: ${skill.category})`).join('\n')}

Please create a comprehensive learning path that includes:
1. A clear path name and description
2. Logical skill progression order
3. Realistic milestones with target dates (considering the time commitment)
4. Estimated total duration
5. Prerequisites for each phase

Format your response as a JSON object with this structure:
{
  "name": "Path name",
  "description": "Detailed description",
  "skills": ["skill1", "skill2"],
  "estimatedDuration": "X months",
  "difficulty": "Beginner/Intermediate/Advanced",
  "prerequisites": ["prerequisite1"],
  "milestones": [
    {
      "title": "Milestone title",
      "description": "What to achieve",
      "targetDate": "YYYY-MM-DD",
      "skills": ["related skills"],
      "completed": false
    }
  ]
}

Make the path practical, achievable, and tailored to their specific needs. Consider industry standards and typical career progression patterns.
`;

    console.log('Sending request to OpenAI...');

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { 
            role: 'system', 
            content: 'You are an expert career development AI that creates personalized learning paths. Always respond with valid JSON only.' 
          },
          { role: 'user', content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 2000,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenAI API error:', response.status, errorText);
      throw new Error(`OpenAI API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log('OpenAI response received');
    
    const generatedContent = data.choices[0].message.content;
    console.log('Generated content:', generatedContent);

    // Parse the JSON response
    let learningPath: LearningPath;
    try {
      const parsedPath = JSON.parse(generatedContent);
      
      // Add missing fields and ensure proper structure
      learningPath = {
        id: `path_${Date.now()}`,
        name: parsedPath.name || `${targetRole} Learning Path`,
        description: parsedPath.description || 'Personalized learning path generated by AI',
        skills: parsedPath.skills || skillGaps.map(s => s.name),
        estimatedDuration: parsedPath.estimatedDuration || '6 months',
        difficulty: parsedPath.difficulty || 'Intermediate',
        prerequisites: parsedPath.prerequisites || [],
        milestones: (parsedPath.milestones || []).map((milestone: any, index: number) => ({
          id: `milestone_${Date.now()}_${index}`,
          title: milestone.title || `Milestone ${index + 1}`,
          description: milestone.description || 'Complete learning objectives',
          targetDate: milestone.targetDate || getTargetDate(index + 1, timeCommitment),
          completed: false,
          skills: milestone.skills || []
        }))
      };
    } catch (parseError) {
      console.error('Failed to parse AI response:', parseError);
      console.error('Raw response:', generatedContent);
      
      // Fallback learning path
      learningPath = createFallbackLearningPath(skillGaps, targetRole, timeCommitment);
    }

    console.log('Final learning path:', learningPath);

    return new Response(JSON.stringify({
      learningPath,
      generatedAt: new Date().toISOString(),
      metadata: {
        skillGapsAddressed: skillGaps.length,
        estimatedWeeksToComplete: calculateWeeksToComplete(learningPath.estimatedDuration, timeCommitment)
      }
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error generating learning path:', error);
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : 'Unknown error',
      learningPath: null
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

function getTargetDate(milestoneNumber: number, timeCommitment: string): string {
  const weeksPerMilestone = getWeeksPerMilestone(timeCommitment);
  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + (milestoneNumber * weeksPerMilestone * 7));
  return targetDate.toISOString().split('T')[0];
}

function getWeeksPerMilestone(timeCommitment: string): number {
  const hours = parseInt(timeCommitment) || 5;
  if (hours >= 20) return 2; // Full-time learning
  if (hours >= 10) return 3; // Part-time intensive
  if (hours >= 5) return 4;  // Regular part-time
  return 6; // Casual learning
}

function calculateWeeksToComplete(duration: string, timeCommitment: string): number {
  const months = parseInt(duration) || 6;
  const hours = parseInt(timeCommitment) || 5;
  
  // Rough calculation based on time commitment
  const baseWeeks = months * 4;
  if (hours >= 20) return Math.floor(baseWeeks * 0.5);
  if (hours >= 10) return Math.floor(baseWeeks * 0.75);
  return baseWeeks;
}

function createFallbackLearningPath(skillGaps: any[], targetRole: string, timeCommitment: string): LearningPath {
  const milestones: Milestone[] = skillGaps.map((skill, index) => ({
    id: `milestone_${Date.now()}_${index}`,
    title: `Master ${skill.name}`,
    description: `Develop ${skill.name} skills from level ${skill.currentLevel} to ${skill.targetLevel}`,
    targetDate: getTargetDate(index + 1, timeCommitment),
    completed: false,
    skills: [skill.name]
  }));

  return {
    id: `path_${Date.now()}`,
    name: `${targetRole} Career Development Path`,
    description: `A structured learning path to transition from your current role to ${targetRole}, focusing on closing key skill gaps.`,
    skills: skillGaps.map(s => s.name),
    estimatedDuration: `${Math.max(3, skillGaps.length * 2)} months`,
    difficulty: 'Intermediate',
    prerequisites: ['Basic understanding of relevant domain'],
    milestones
  };
}
