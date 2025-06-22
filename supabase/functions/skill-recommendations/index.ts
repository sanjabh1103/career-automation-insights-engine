import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const geminiApiKey = Deno.env.get('GOOGLE_AI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    if (!geminiApiKey) {
      throw new Error('Gemini API key is not configured');
    }

    const { occupation, automatedTasks, humanTasks } = await req.json();
    
    if (!occupation) {
      throw new Error('Occupation is required');
    }

    console.log(`Generating skill recommendations for: ${occupation}`);

    // Prompt for Gemini to generate skill recommendations
    const prompt = `
You are a career advisor. Based on the user's occupation and AI's impact on their tasks, suggest four key skills to develop, focusing on interpersonal and organizational abilities that will remain valuable as AI automates more tasks.

Occupation: ${occupation}

Tasks likely to be automated: ${automatedTasks ? JSON.stringify(automatedTasks) : "Not specified"}

Tasks requiring human agency: ${humanTasks ? JSON.stringify(humanTasks) : "Not specified"}

For each skill, provide:
1. The skill name
2. A brief explanation of why this skill will be important in an AI-augmented workplace

Provide your recommendations in this JSON format:
{
  "skills": [
    {
      "name": "Skill Name",
      "explanation": "Explanation of why this skill is important"
    }
  ]
}
`;

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
          temperature: 0.2,
          topK: 1,
          topP: 0.8,
          maxOutputTokens: 1024,
        }
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Gemini API Error:', errorText);
      throw new Error(`Gemini API request failed: ${response.statusText}`);
    }

    const data = await response.json();
    
    if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
      throw new Error('Invalid response from Gemini API');
    }

    const generatedText = data.candidates[0].content.parts[0].text;
    
    // Extract JSON from the response
    let recommendations;
    try {
      const jsonMatch = generatedText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        recommendations = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('No JSON found in response');
      }
    } catch (parseError) {
      console.error('Failed to parse Gemini response as JSON:', parseError);
      throw new Error('Failed to parse skill recommendations from Gemini');
    }

    return new Response(JSON.stringify(recommendations), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in skill-recommendations function:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      timestamp: new Date().toISOString(),
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});