
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const geminiApiKey = Deno.env.get('GEMINI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  console.log('Calculate APO function invoked');
  console.log('Method:', req.method);
  console.log('URL:', req.url);

  // Handle CORS preflight requests
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

    console.log(`Calculating APO for occupation: ${occupation.title} (${occupation.code})`);

    // Create a comprehensive prompt for APO analysis
    const prompt = `
You are an expert in automation and AI technology assessment. Analyze the automation potential for the following occupation and provide specific APO (Automation Potential Overview) scores.

Occupation: ${occupation.title}
O*NET Code: ${occupation.code}

Please analyze this occupation and provide APO scores (0-100%) for the following categories. Consider current AI/automation technologies, robotics capabilities, and emerging trends.

For each category, provide:
1. An overall category APO score (0-100%)
2. 3-5 specific items within that category with individual APO scores
3. Brief descriptions explaining the automation potential

Categories to analyze:
1. **Tasks** - Specific work activities and responsibilities
2. **Knowledge** - Required knowledge areas and domains
3. **Skills** - Cognitive and interpersonal skills needed
4. **Abilities** - Physical and mental abilities required
5. **Technologies** - Tools, software, and technologies used

Scoring Guidelines:
- 0-30%: Low automation potential (requires human creativity, empathy, complex problem-solving)
- 31-60%: Medium automation potential (some tasks can be automated, but human oversight needed)
- 61-100%: High automation potential (routine, predictable, data-driven tasks)

Please respond in the following JSON format:
{
  "tasks": {
    "categoryAPO": 45.5,
    "items": [
      {"description": "Task description", "apo": 50.0},
      {"description": "Another task", "apo": 41.0}
    ]
  },
  "knowledge": {
    "categoryAPO": 52.3,
    "items": [
      {"description": "Knowledge area", "apo": 55.0},
      {"description": "Another knowledge area", "apo": 49.6}
    ]
  },
  "skills": {
    "categoryAPO": 38.7,
    "items": [
      {"description": "Skill description", "apo": 40.0},
      {"description": "Another skill", "apo": 37.4}
    ]
  },
  "abilities": {
    "categoryAPO": 42.1,
    "items": [
      {"description": "Ability description", "apo": 44.0},
      {"description": "Another ability", "apo": 40.2}
    ]
  },
  "technologies": {
    "categoryAPO": 65.8,
    "items": [
      {"description": "Technology/tool", "apo": 70.0},
      {"description": "Another technology", "apo": 61.6}
    ]
  }
}
`;

    console.log('Making request to Gemini API');
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
          temperature: 0.3,
          topK: 1,
          topP: 1,
          maxOutputTokens: 2048,
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
    console.log('Gemini API response received');
    
    if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
      console.error('Invalid response structure from Gemini API:', data);
      throw new Error('Invalid response from Gemini API');
    }

    const generatedText = data.candidates[0].content.parts[0].text;
    console.log('Generated text length:', generatedText.length);

    // Extract JSON from the response
    let apoData;
    try {
      // Try to find JSON in the response
      const jsonMatch = generatedText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        apoData = JSON.parse(jsonMatch[0]);
        console.log('Successfully parsed APO data');
      } else {
        console.error('No JSON found in Gemini response');
        throw new Error('No JSON found in response');
      }
    } catch (parseError) {
      console.error('Failed to parse Gemini response as JSON:', parseError);
      console.error('Response text:', generatedText);
      throw new Error('Failed to parse APO analysis from Gemini');
    }

    // Transform the data to match our expected format
    const transformedData = {
      code: occupation.code,
      title: occupation.title,
      description: `AI-analyzed occupation from the O*NET database with calculated automation potential.`,
      tasks: apoData.tasks.items,
      knowledge: apoData.knowledge.items,
      skills: apoData.skills.items,
      abilities: apoData.abilities.items,
      technologies: apoData.technologies.items,
    };

    console.log('Successfully transformed APO data');

    return new Response(JSON.stringify(transformedData), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in calculate-apo function:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      timestamp: new Date().toISOString(),
      function: 'calculate-apo'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
