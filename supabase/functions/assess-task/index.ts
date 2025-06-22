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

    const { taskDescription } = await req.json();
    
    if (!taskDescription) {
      throw new Error('Task description is required');
    }

    console.log(`Assessing task: ${taskDescription}`);

    // Prompt for Gemini to assess the task
    const prompt = `
You are an AI assistant assessing task automation potential. Based on the task description, classify it into one of these categories:

1. Automate: Tasks that are repetitive, rule-based, involve structured data, or are stressful/dangerous for humans. These can be fully automated by AI.

2. Augment: Tasks that benefit from AI assistance but still require human oversight, judgment, or contextual understanding. AI and humans work together.

3. Human-only: Tasks requiring creativity, empathy, complex ethical decisions, or high-level interpersonal skills that AI cannot replicate.

Task description: ${taskDescription}

Provide your assessment in this JSON format:
{
  "category": "Automate/Augment/Human-only",
  "explanation": "Brief explanation of why this task falls into this category",
  "confidence": 0.XX (a number between 0 and 1 representing your confidence in this assessment)
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
    let assessment;
    try {
      const jsonMatch = generatedText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        assessment = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('No JSON found in response');
      }
    } catch (parseError) {
      console.error('Failed to parse Gemini response as JSON:', parseError);
      throw new Error('Failed to parse task assessment from Gemini');
    }

    return new Response(JSON.stringify(assessment), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in assess-task function:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      timestamp: new Date().toISOString(),
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});