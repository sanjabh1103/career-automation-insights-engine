
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const geminiApiKey = Deno.env.get('GEMINI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Enhanced scoring weights based on automation impact analysis
const CATEGORY_WEIGHTS = {
  tasks: 0.35,        // Highest weight - core work activities
  technologies: 0.25, // Second highest - automation enablers
  skills: 0.20,       // Critical for human-AI interaction
  abilities: 0.15,    // Physical/cognitive requirements
  knowledge: 0.05     // Lowest - knowledge can often be codified
};

// Advanced scoring modifiers
const AUTOMATION_FACTORS = {
  routine_multiplier: 1.3,
  creativity_penalty: 0.6,
  human_interaction_penalty: 0.7,
  physical_dexterity_penalty: 0.5,
  cognitive_complexity_bonus: 1.1,
  data_driven_bonus: 1.4
};

const validateAPOScore = (score: number, context: string): number => {
  const validated = Math.max(0, Math.min(100, score));
  if (Math.abs(score - validated) > 0.1) {
    console.log(`APO score validation: ${context} adjusted from ${score} to ${validated}`);
  }
  return validated;
};

const calculateWeightedAPO = (categoryScores: Record<string, number>): number => {
  let weightedSum = 0;
  let totalWeight = 0;
  
  for (const [category, score] of Object.entries(categoryScores)) {
    const weight = CATEGORY_WEIGHTS[category as keyof typeof CATEGORY_WEIGHTS] || 0;
    weightedSum += score * weight;
    totalWeight += weight;
  }
  
  return totalWeight > 0 ? weightedSum / totalWeight : 0;
};

serve(async (req) => {
  console.log('Enhanced Calculate APO function invoked');
  console.log('Method:', req.method);
  console.log('URL:', req.url);

  if (req.method === 'OPTIONS') {
    console.log('Handling CORS preflight request');
    return new Response(null, { headers: corsHeaders });
  }

  try {
    if (!geminiApiKey) {
      console.error('Gemini API key is not configured');
      throw new Error('Gemini API key is not configured');
    }

    const requestBody = await req.text();
    console.log('Request body:', requestBody);
    
    let parsedBody;
    try {
      parsedBody = JSON.parse(requestBody);
    } catch (parseError) {
      console.error('Failed to parse request body:', parseError);
      throw new Error('Invalid JSON in request body');
    }

    const { occupation } = parsedBody;
    
    if (!occupation) {
      console.error('No occupation provided in request');
      throw new Error('Occupation data is required');
    }

    console.log(`Calculating enhanced APO for occupation: ${occupation.title} (${occupation.code})`);

    // Enhanced prompt with advanced analysis framework
    const prompt = `
You are an expert automation analyst with deep knowledge of AI, robotics, and emerging technologies. Analyze the automation potential for the following occupation using advanced assessment criteria.

Occupation: ${occupation.title}
O*NET Code: ${occupation.code}

ANALYSIS FRAMEWORK:
Evaluate each category using these advanced criteria:

1. **AUTOMATION READINESS FACTORS**:
   - Routine vs. Creative work (routine = higher APO)
   - Rule-based vs. Judgment-based decisions
   - Data availability and structure
   - Current technology maturity
   - Implementation feasibility

2. **HUMAN-AI INTERACTION LEVELS**:
   - Full automation potential (80-100% APO)
   - Human-supervised automation (60-80% APO)
   - Human-AI collaboration (40-60% APO)
   - AI-assisted human work (20-40% APO)
   - Human-dominant work (0-20% APO)

3. **TECHNOLOGY DISRUPTION TIMELINE**:
   - Currently automatable (2024-2026)
   - Near-term automation (2027-2030)
   - Medium-term automation (2031-2035)
   - Long-term automation (2036+)
   - Unlikely to automate

ENHANCED SCORING GUIDELINES:
- **0-20%**: Human creativity, empathy, complex ethical decisions, high physical dexterity
- **21-40%**: Complex problem-solving, interpersonal skills, adaptive thinking
- **41-60%**: Mixed routine/creative work, pattern recognition, structured decision-making
- **61-80%**: Routine cognitive work, data processing, rule-based decisions
- **81-100%**: Highly repetitive, algorithmic, data-driven, predictable tasks

For each category, provide:
1. Category APO score (0-100%) with confidence level (high/medium/low)
2. 4-6 specific items with individual APO scores and automation factors
3. Key automation drivers and barriers
4. Technology readiness assessment

Respond in this enhanced JSON format:
{
  "tasks": {
    "categoryAPO": 45.5,
    "confidence": "high",
    "automation_drivers": ["routine data processing", "predictable workflows"],
    "barriers": ["client interaction required", "complex problem-solving"],
    "technology_readiness": "current",
    "items": [
      {
        "description": "Task description",
        "apo": 50.0,
        "factors": ["routine", "data_driven"],
        "timeline": "2024-2026"
      }
    ]
  },
  "knowledge": {
    "categoryAPO": 52.3,
    "confidence": "medium",
    "automation_drivers": ["codifiable knowledge", "structured information"],
    "barriers": ["domain expertise", "contextual understanding"],
    "technology_readiness": "emerging",
    "items": [
      {
        "description": "Knowledge area",
        "apo": 55.0,
        "factors": ["structured", "codifiable"],
        "timeline": "2027-2030"
      }
    ]
  },
  "skills": {
    "categoryAPO": 38.7,
    "confidence": "high",
    "automation_drivers": ["pattern recognition", "analytical thinking"],
    "barriers": ["creativity", "emotional intelligence"],
    "technology_readiness": "developing",
    "items": [
      {
        "description": "Skill description",
        "apo": 40.0,
        "factors": ["analytical", "pattern_based"],
        "timeline": "2031-2035"
      }
    ]
  },
  "abilities": {
    "categoryAPO": 42.1,
    "confidence": "medium",
    "automation_drivers": ["cognitive processing", "information handling"],
    "barriers": ["physical dexterity", "sensory complexity"],
    "technology_readiness": "current",
    "items": [
      {
        "description": "Ability description",
        "apo": 44.0,
        "factors": ["cognitive", "measurable"],
        "timeline": "2024-2026"
      }
    ]
  },
  "technologies": {
    "categoryAPO": 65.8,
    "confidence": "high",
    "automation_drivers": ["existing AI tools", "automation software"],
    "barriers": ["integration complexity", "cost barriers"],
    "technology_readiness": "current",
    "items": [
      {
        "description": "Technology/tool",
        "apo": 70.0,
        "factors": ["automatable", "ai_ready"],
        "timeline": "2024-2026"
      }
    ]
  },
  "overall_assessment": {
    "primary_automation_opportunities": ["specific areas with highest potential"],
    "main_challenges": ["key barriers to automation"],
    "recommended_timeline": "2027-2030",
    "disruption_likelihood": "high"
  }
}

Ensure all APO scores are realistic and well-justified based on current technology capabilities and trends.
`;

    console.log('Making enhanced request to Gemini API');
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${geminiApiKey}`, {
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
          temperature: 0.2,  // Lower temperature for more consistent analysis
          topK: 1,
          topP: 0.8,
          maxOutputTokens: 4096,  // Increased for detailed analysis
        }
      }),
    });

    console.log('Gemini API response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Gemini API Error:', errorText);
      throw new Error(`Gemini API request failed: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Enhanced Gemini API response received');
    
    if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
      console.error('Invalid response structure from Gemini API:', data);
      throw new Error('Invalid response from Gemini API');
    }

    const generatedText = data.candidates[0].content.parts[0].text;
    console.log('Generated analysis length:', generatedText.length);

    // Enhanced JSON extraction and validation
    let apoData;
    try {
      const jsonMatch = generatedText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        apoData = JSON.parse(jsonMatch[0]);
        console.log('Successfully parsed enhanced APO data');
        
        // Validate and adjust scores
        for (const category of ['tasks', 'knowledge', 'skills', 'abilities', 'technologies']) {
          if (apoData[category]) {
            apoData[category].categoryAPO = validateAPOScore(
              apoData[category].categoryAPO, 
              `${category} category`
            );
            
            if (apoData[category].items) {
              apoData[category].items = apoData[category].items.map((item: any) => ({
                ...item,
                apo: validateAPOScore(item.apo, `${category} item: ${item.description}`)
              }));
            }
          }
        }
      } else {
        console.error('No JSON found in enhanced Gemini response');
        throw new Error('No JSON found in response');
      }
    } catch (parseError) {
      console.error('Failed to parse enhanced Gemini response as JSON:', parseError);
      console.error('Response text:', generatedText.substring(0, 1000));
      throw new Error('Failed to parse enhanced APO analysis from Gemini');
    }

    // Calculate weighted overall APO score
    const categoryScores = {
      tasks: apoData.tasks?.categoryAPO || 0,
      knowledge: apoData.knowledge?.categoryAPO || 0,
      skills: apoData.skills?.categoryAPO || 0,
      abilities: apoData.abilities?.categoryAPO || 0,
      technologies: apoData.technologies?.categoryAPO || 0
    };

    const weightedOverallAPO = calculateWeightedAPO(categoryScores);
    console.log('Calculated weighted overall APO:', weightedOverallAPO);

    // Transform to enhanced response format
    const transformedData = {
      code: occupation.code,
      title: occupation.title,
      description: `AI-analyzed occupation with enhanced automation potential assessment using advanced scoring algorithms.`,
      overallAPO: validateAPOScore(weightedOverallAPO, 'weighted overall APO'),
      confidence: apoData.overall_assessment?.disruption_likelihood || 'medium',
      timeline: apoData.overall_assessment?.recommended_timeline || '2027-2030',
      tasks: (apoData.tasks?.items || []).map((item: any) => ({
        description: item.description,
        apo: item.apo,
        factors: item.factors || [],
        timeline: item.timeline || 'unknown'
      })),
      knowledge: (apoData.knowledge?.items || []).map((item: any) => ({
        description: item.description,
        apo: item.apo,
        factors: item.factors || [],
        timeline: item.timeline || 'unknown'
      })),
      skills: (apoData.skills?.items || []).map((item: any) => ({
        description: item.description,
        apo: item.apo,
        factors: item.factors || [],
        timeline: item.timeline || 'unknown'
      })),
      abilities: (apoData.abilities?.items || []).map((item: any) => ({
        description: item.description,
        apo: item.apo,
        factors: item.factors || [],
        timeline: item.timeline || 'unknown'
      })),
      technologies: (apoData.technologies?.items || []).map((item: any) => ({
        description: item.description,
        apo: item.apo,
        factors: item.factors || [],
        timeline: item.timeline || 'unknown'
      })),
      categoryBreakdown: {
        tasks: { apo: apoData.tasks?.categoryAPO || 0, confidence: apoData.tasks?.confidence || 'medium' },
        knowledge: { apo: apoData.knowledge?.categoryAPO || 0, confidence: apoData.knowledge?.confidence || 'medium' },
        skills: { apo: apoData.skills?.categoryAPO || 0, confidence: apoData.skills?.confidence || 'medium' },
        abilities: { apo: apoData.abilities?.categoryAPO || 0, confidence: apoData.abilities?.confidence || 'medium' },
        technologies: { apo: apoData.technologies?.categoryAPO || 0, confidence: apoData.technologies?.confidence || 'medium' }
      },
      insights: {
        primary_opportunities: apoData.overall_assessment?.primary_automation_opportunities || [],
        main_challenges: apoData.overall_assessment?.main_challenges || [],
        automation_drivers: Object.values(apoData).flatMap((cat: any) => cat.automation_drivers || []),
        barriers: Object.values(apoData).flatMap((cat: any) => cat.barriers || [])
      },
      metadata: {
        analysis_version: '2.0',
        calculation_method: 'weighted_advanced',
        weights_used: CATEGORY_WEIGHTS,
        timestamp: new Date().toISOString()
      }
    };

    console.log('Successfully created enhanced APO analysis');

    return new Response(JSON.stringify(transformedData), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in enhanced calculate-apo function:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      timestamp: new Date().toISOString(),
      function: 'calculate-apo-enhanced',
      version: '2.0'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
