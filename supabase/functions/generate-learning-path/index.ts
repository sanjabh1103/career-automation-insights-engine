
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
  timeCommitment: string;
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

    const skillGaps = userSkills.filter(skill => skill.targetLevel > skill.currentLevel);
    
    // Try OpenAI first, then Gemini, then fallback
    let learningPath: LearningPath;
    
    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    const geminiApiKey = Deno.env.get('GEMINI_API_KEY');
    
    if (openAIApiKey) {
      try {
        learningPath = await generateWithOpenAI(openAIApiKey, skillGaps, targetRole, currentRole, timeCommitment, learningStyle, budget);
        console.log('Generated learning path with OpenAI');
      } catch (error) {
        console.error('OpenAI failed, trying Gemini:', error);
        if (geminiApiKey) {
          learningPath = await generateWithGemini(geminiApiKey, skillGaps, targetRole, currentRole, timeCommitment, learningStyle, budget);
          console.log('Generated learning path with Gemini');
        } else {
          learningPath = createFallbackLearningPath(skillGaps, targetRole, timeCommitment);
          console.log('Using fallback learning path');
        }
      }
    } else if (geminiApiKey) {
      try {
        learningPath = await generateWithGemini(geminiApiKey, skillGaps, targetRole, currentRole, timeCommitment, learningStyle, budget);
        console.log('Generated learning path with Gemini');
      } catch (error) {
        console.error('Gemini failed, using fallback:', error);
        learningPath = createFallbackLearningPath(skillGaps, targetRole, timeCommitment);
      }
    } else {
      console.log('No API keys configured, using fallback');
      learningPath = createFallbackLearningPath(skillGaps, targetRole, timeCommitment);
    }

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
    
    // Return a basic fallback even on error
    const basicPath = {
      id: `path_${Date.now()}`,
      name: 'Basic Learning Path',
      description: 'A basic learning path to help you get started with your career development.',
      skills: ['Communication', 'Problem Solving', 'Time Management'],
      estimatedDuration: '3 months',
      difficulty: 'Beginner',
      prerequisites: [],
      milestones: [
        {
          id: `milestone_${Date.now()}_1`,
          title: 'Getting Started',
          description: 'Begin your learning journey with foundational skills',
          targetDate: getTargetDate(1, '5'),
          completed: false,
          skills: ['Communication']
        }
      ]
    };
    
    return new Response(JSON.stringify({ 
      learningPath: basicPath,
      generatedAt: new Date().toISOString(),
      metadata: {
        skillGapsAddressed: 0,
        estimatedWeeksToComplete: 12,
        note: 'Basic fallback path due to error'
      }
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

async function generateWithOpenAI(apiKey: string, skillGaps: any[], targetRole: string, currentRole: string, timeCommitment: string, learningStyle: string, budget: string): Promise<LearningPath> {
  const prompt = createLearningPathPrompt(skillGaps, targetRole, currentRole, timeCommitment, learningStyle, budget);
  
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: 'You are an expert career development AI that creates personalized learning paths. Always respond with valid JSON only.' },
        { role: 'user', content: prompt }
      ],
      temperature: 0.7,
      max_tokens: 2000,
    }),
  });

  if (!response.ok) {
    throw new Error(`OpenAI API error: ${response.status}`);
  }

  const data = await response.json();
  const generatedContent = data.choices[0].message.content;
  
  return parseAndStructureLearningPath(generatedContent, targetRole, skillGaps, timeCommitment);
}

async function generateWithGemini(apiKey: string, skillGaps: any[], targetRole: string, currentRole: string, timeCommitment: string, learningStyle: string, budget: string): Promise<LearningPath> {
  const prompt = createLearningPathPrompt(skillGaps, targetRole, currentRole, timeCommitment, learningStyle, budget);
  
  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${apiKey}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.7,
        topK: 1,
        topP: 0.8,
        maxOutputTokens: 2048,
      }
    }),
  });

  if (!response.ok) {
    throw new Error(`Gemini API error: ${response.status}`);
  }

  const data = await response.json();
  const generatedContent = data.candidates[0].content.parts[0].text;
  
  return parseAndStructureLearningPath(generatedContent, targetRole, skillGaps, timeCommitment);
}

function createLearningPathPrompt(skillGaps: any[], targetRole: string, currentRole: string, timeCommitment: string, learningStyle: string, budget: string): string {
  return `
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

Make the path practical, achievable, and tailored to their specific needs.`;
}

function parseAndStructureLearningPath(generatedContent: string, targetRole: string, skillGaps: any[], timeCommitment: string): LearningPath {
  try {
    const jsonMatch = generatedContent.match(/\{[\s\S]*\}/);
    let parsedPath;
    
    if (jsonMatch) {
      parsedPath = JSON.parse(jsonMatch[0]);
    } else {
      throw new Error('No JSON found in response');
    }
    
    return {
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
    console.error('Failed to parse AI response, using fallback');
    return createFallbackLearningPath(skillGaps, targetRole, timeCommitment);
  }
}

function getTargetDate(milestoneNumber: number, timeCommitment: string): string {
  const weeksPerMilestone = getWeeksPerMilestone(timeCommitment);
  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + (milestoneNumber * weeksPerMilestone * 7));
  return targetDate.toISOString().split('T')[0];
}

function getWeeksPerMilestone(timeCommitment: string): number {
  const hours = parseInt(timeCommitment) || 5;
  if (hours >= 20) return 2;
  if (hours >= 10) return 3;
  if (hours >= 5) return 4;
  return 6;
}

function calculateWeeksToComplete(duration: string, timeCommitment: string): number {
  const months = parseInt(duration) || 6;
  const hours = parseInt(timeCommitment) || 5;
  
  const baseWeeks = months * 4;
  if (hours >= 20) return Math.floor(baseWeeks * 0.5);
  if (hours >= 10) return Math.floor(baseWeeks * 0.75);
  return baseWeeks;
}

function createFallbackLearningPath(skillGaps: any[], targetRole: string, timeCommitment: string): LearningPath {
  const milestones: Milestone[] = skillGaps.length > 0 
    ? skillGaps.map((skill, index) => ({
        id: `milestone_${Date.now()}_${index}`,
        title: `Master ${skill.name}`,
        description: `Develop ${skill.name} skills from level ${skill.currentLevel} to ${skill.targetLevel}`,
        targetDate: getTargetDate(index + 1, timeCommitment),
        completed: false,
        skills: [skill.name]
      }))
    : [
        {
          id: `milestone_${Date.now()}_1`,
          title: 'Getting Started',
          description: 'Begin your career development journey',
          targetDate: getTargetDate(1, timeCommitment),
          completed: false,
          skills: ['Foundation Skills']
        }
      ];

  return {
    id: `path_${Date.now()}`,
    name: `${targetRole} Career Development Path`,
    description: `A structured learning path to transition to ${targetRole}, focusing on closing key skill gaps and building essential competencies.`,
    skills: skillGaps.length > 0 ? skillGaps.map(s => s.name) : ['Communication', 'Problem Solving', 'Leadership'],
    estimatedDuration: `${Math.max(3, skillGaps.length * 2)} months`,
    difficulty: 'Intermediate',
    prerequisites: ['Basic understanding of relevant domain', 'Commitment to continuous learning'],
    milestones
  };
}
