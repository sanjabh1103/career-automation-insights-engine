
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
    const { occupation_title, location = 'United States', time_horizon = '12' } = await req.json();
    
    if (!occupation_title) {
      throw new Error('Occupation title is required');
    }

    console.log(`Generating market insights for: ${occupation_title} in ${location}`);

    const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Check for cached insights
    const { data: cachedInsights } = await supabase
      .from('market_insights_cache')
      .select('*')
      .eq('occupation_title', occupation_title)
      .eq('location', location)
      .gte('created_at', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString())
      .order('created_at', { ascending: false })
      .limit(1);

    if (cachedInsights && cachedInsights.length > 0) {
      console.log('Using cached market insights');
      return new Response(JSON.stringify(cachedInsights[0].insights_data), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Generate new insights
    const insights = await generateMarketInsights(occupation_title, location, time_horizon);

    // Cache the results
    const { error: cacheError } = await supabase
      .from('market_insights_cache')
      .insert({
        occupation_title,
        location,
        time_horizon: parseInt(time_horizon),
        insights_data: insights
      });

    if (cacheError) {
      console.error('Error caching market insights:', cacheError);
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

async function generateMarketInsights(occupationTitle: string, location: string, timeHorizon: string) {
  const openAIKey = Deno.env.get('OPENAI_API_KEY');
  const geminiKey = Deno.env.get('GEMINI_API_KEY');

  const prompt = `
Generate comprehensive market insights for "${occupationTitle}" in ${location} over the next ${timeHorizon} months.

Analyze and provide:
1. Job market trends and demand forecasting
2. Salary trends and compensation analysis
3. Skills in highest demand
4. Geographic hotspots for opportunities
5. Industry growth sectors
6. Remote work possibilities
7. AI impact assessment on job security
8. Career advancement pathways
9. Educational requirements evolution
10. Market saturation analysis

Return as JSON:
{
  "demandForecast": {"trend": "increasing/stable/decreasing", "confidence": 0-100, "factors": ["factor1"]},
  "salaryAnalysis": {"currentRange": "$X-$Y", "trend": "up/stable/down", "projection": "$A-$B"},
  "topSkills": [{"skill": "...", "demand": "high/medium/low", "growth": "percentage"}],
  "geographicHotspots": [{"location": "...", "opportunities": number, "reason": "..."}],
  "industryGrowth": [{"sector": "...", "growthRate": "percentage", "outlook": "..."}],
  "remoteWorkPotential": {"score": 0-100, "factors": ["factor1"]},
  "aiImpact": {"riskLevel": "low/medium/high", "timeline": "years", "mitigation": ["strategy1"]},
  "careerPaths": [{"path": "...", "timeframe": "...", "requirements": ["req1"]}],
  "marketSaturation": {"level": "low/medium/high", "competitiveness": "low/medium/high"}
}
`;

  // Try OpenAI first
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
            { role: 'system', content: 'You are a labor market analyst with expertise in employment trends, salary analysis, and career development.' },
            { role: 'user', content: prompt }
          ],
          temperature: 0.3,
          max_tokens: 2500,
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
      console.error('OpenAI market analysis failed:', error);
    }
  }

  // Try Gemini as fallback
  if (geminiKey) {
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${geminiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { temperature: 0.3, maxOutputTokens: 2500 }
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
      console.error('Gemini market analysis failed:', error);
    }
  }

  // Fallback market insights
  return createFallbackMarketInsights(occupationTitle, location);
}

function createFallbackMarketInsights(occupationTitle: string, location: string) {
  return {
    demandForecast: {
      trend: "stable",
      confidence: 70,
      factors: ["Market conditions", "Industry growth", "Technological changes"]
    },
    salaryAnalysis: {
      currentRange: "$50,000-$80,000",
      trend: "up",
      projection: "$55,000-$85,000"
    },
    topSkills: [
      { skill: "Communication", demand: "high", growth: "5%" },
      { skill: "Problem Solving", demand: "high", growth: "8%" },
      { skill: "Technical Skills", demand: "medium", growth: "12%" }
    ],
    geographicHotspots: [
      { location: "Major Metropolitan Areas", opportunities: 1000, reason: "High concentration of employers" }
    ],
    industryGrowth: [
      { sector: "Technology", growthRate: "15%", outlook: "Strong growth expected" },
      { sector: "Healthcare", growthRate: "10%", outlook: "Steady growth" }
    ],
    remoteWorkPotential: {
      score: 75,
      factors: ["Digital nature of work", "Communication tools availability"]
    },
    aiImpact: {
      riskLevel: "medium",
      timeline: "5-10 years",
      mitigation: ["Develop AI collaboration skills", "Focus on creative tasks"]
    },
    careerPaths: [
      { path: "Senior Role", timeframe: "3-5 years", requirements: ["Experience", "Additional training"] },
      { path: "Management", timeframe: "5-7 years", requirements: ["Leadership skills", "Business acumen"] }
    ],
    marketSaturation: {
      level: "medium",
      competitiveness: "medium"
    }
  };
}
