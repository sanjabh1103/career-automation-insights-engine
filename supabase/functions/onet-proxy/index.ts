
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

// I'm assuming the ONET_API_KEY is in "username:password" format.
const ONET_API_KEY = Deno.env.get('ONET_API_KEY');
const ONET_BASE_URL = 'https://services.onetcenter.org/ws/online';

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
    const { onetPath } = await req.json(); // e.g., 'search?keyword=developer&end=50'

    if (!ONET_API_KEY) {
      throw new Error('O*NET API key is not set in Supabase secrets.');
    }

    const authHeader = 'Basic ' + btoa(ONET_API_KEY);

    console.log(`Proxying request to: ${ONET_BASE_URL}/${onetPath}`);

    const response = await fetch(`${ONET_BASE_URL}/${onetPath}`, {
      headers: {
        'Authorization': authHeader,
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('O*NET API Error:', errorText);
      throw new Error(`O*NET API request failed: ${response.statusText}`);
    }

    const data = await response.json();

    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in onet-proxy function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
