
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface MarketInsightsRequest {
  occupation_title: string;
  location?: string;
  time_horizon?: number; // months
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { occupation_title, location = 'United States', time_horizon = 12 }: MarketInsightsRequest = await req.json();
    
    if (!occupation_title) {
      throw new Error('Occupation title is required');
    }

    console.log(`Generating market insights for: ${occupation_title} in ${location}`);

    // Try multiple AI providers
    const openAIKey = Deno.env.get('OPENAI_API_KEY');
    const geminiKey = Deno.env.get('GEMINI_API_KEY');
    
    let insights;
    
    if (openAIKey) {
      try {
        insights = await generateWithOpenAI(openAIKey, occupation_title, location, time_horizon);
        console.log('Generated market insights with OpenAI');
      } catch (error) {
        console.error('OpenAI failed, trying Gemini:', error);
        if (geminiKey) {
          insights = await generateWithGemini(geminiKey, occupation_title, location, time_horizon);
          console.log('Generated market insights with Gemini');
        } else {
          insights = createFallbackInsights(occupation_title, location, time_horizon);
        }
      }
    } else if (geminiKey) {
      try {
        insights = await generateWithGemini(geminiKey, occupation_title, location, time_horizon);
        console.log('Generated market insights with Gemini');
      } catch (error) {
        console.error('Gemini failed, using fallback:', error);
        insights = createFallbackInsights(occupation_title, location, time_horizon);
      }
    } else {
      console.log('No API keys configured, using fallback');
      insights = createFallbackInsights(occupation_title, location, time_horizon);
    }

    return new Response(JSON.stringify(insights), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error generating market insights:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      timestamp: new Date().toISOString()
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

async function generateWithOpenAI(apiKey: string, occupation: string, location: string, timeHorizon: number) {
  const prompt = createMarketInsightsPrompt(occupation, location, timeHorizon);
  
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: 'You are an expert career market analyst specializing in job market trends and salary analysis. Always respond with valid JSON only.' },
        { role: 'user', content: prompt }
      ],
      temperature: 0.3,
      max_tokens: 2000,
    }),
  });

  if (!response.ok) {
    throw new Error(`OpenAI API error: ${response.status}`);
  }

  const data = await response.json();
  const content = data.choices[0].message.content;
  
  return parseMarketInsights(content, occupation, location);
}

async function generateWithGemini(apiKey: string, occupation: string, location: string, timeHorizon: number) {
  const prompt = createMarketInsightsPrompt(occupation, location, timeHorizon);
  
  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${apiKey}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.3,
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
  const content = data.candidates[0].content.parts[0].text;
  
  return parseMarketInsights(content, occupation, location);
}

function createMarketInsightsPrompt(occupation: string, location: string, timeHorizon: number): string {
  return `
Provide comprehensive market insights for the occupation "${occupation}" in ${location} with a ${timeHorizon}-month outlook.

Include the following analysis:
1. Demand forecast (current demand, future outlook, growth rate, employment projection)
2. Salary analysis (median salary, salary range, salary growth trend, location context)
3. Skills trends (top skills in demand, their importance levels, and market trends)
4. Geographic hotspots (top locations for opportunities and reasons)
5. Industry context (key industries, emerging roles, disruption factors)

Format your response as JSON with this exact structure:
{
  "demandForecast": {
    "currentDemand": "high/medium/low",
    "futureOutlook": "description of outlook",
    "growthRate": numeric_percentage,
    "employmentProjection": "description"
  },
  "salaryAnalysis": {
    "medianSalary": numeric_amount,
    "salaryRange": {"min": numeric_min, "max": numeric_max},
    "salaryGrowth": numeric_percentage,
    "location": "${location}"
  },
  "skillsTrends": [
    {"skill": "skill_name", "demandLevel": "high/medium/low", "importance": 1-10, "trend": "increasing/stable/decreasing"}
  ],
  "geographicHotspots": [
    {"location": "city/state", "opportunities": numeric_count, "reason": "explanation"}
  ],
  "industryContext": {
    "keyIndustries": ["industry1", "industry2"],
    "emergingRoles": ["role1", "role2"],
    "disruptionFactors": ["factor1", "factor2"]
  }
}

Base your analysis on current market trends, employment statistics, and industry reports.`;
}

function parseMarketInsights(content: string, occupation: string, location: string) {
  try {
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    throw new Error('No JSON found in response');
  } catch (parseError) {
    console.error('Failed to parse AI response, using fallback');
    return createFallbackInsights(occupation, location, 12);
  }
}

function createFallbackInsights(occupation: string, location: string, timeHorizon: number) {
  return {
    demandForecast: {
      currentDemand: "medium",
      futureOutlook: `Moderate growth expected for ${occupation} over the next ${timeHorizon} months`,
      growthRate: 5.2,
      employmentProjection: "Steady employment growth expected due to ongoing digitalization"
    },
    salaryAnalysis: {
      medianSalary: 65000,
      salaryRange: { min: 45000, max: 95000 },
      salaryGrowth: 3.5,
      location: location
    },
    skillsTrends: [
      { skill: "Communication", demandLevel: "high", importance: 9, trend: "stable" },
      { skill: "Problem Solving", demandLevel: "high", importance: 8, trend: "increasing" },
      { skill: "Digital Literacy", demandLevel: "high", importance: 8, trend: "increasing" },
      { skill: "Adaptability", demandLevel: "medium", importance: 7, trend: "increasing" },
      { skill: "Collaboration", demandLevel: "medium", importance: 7, trend: "stable" }
    ],
    geographicHotspots: [
      { location: "California", opportunities: 2500, reason: "High concentration of tech companies" },
      { location: "New York", opportunities: 1800, reason: "Diverse industry presence" },
      { location: "Texas", opportunities: 1400, reason: "Growing business ecosystem" }
    ],
    industryContext: {
      keyIndustries: ["Technology", "Healthcare", "Financial Services", "Education"],
      emergingRoles: ["AI Specialist", "Data Analyst", "Digital Marketing Specialist"],
      disruptionFactors: ["Artificial Intelligence", "Remote Work", "Automation"]
    }
  };
}
