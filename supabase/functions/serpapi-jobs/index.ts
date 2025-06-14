
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.0'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface JobMarketData {
  totalJobs: number;
  averageSalary?: number;
  salaryRange?: {
    min: number;
    max: number;
  };
  topLocations: Array<{
    location: string;
    count: number;
  }>;
  recentJobs: Array<{
    title: string;
    company: string;
    location: string;
    salary?: string;
    postedDate: string;
    source: string;
  }>;
  trending: boolean;
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { jobTitle } = await req.json();
    
    if (!jobTitle) {
      throw new Error('Job title is required');
    }

    const SERPAPI_KEY = Deno.env.get('SERPAPI_KEY');
    if (!SERPAPI_KEY) {
      throw new Error('SerpAPI key not configured');
    }

    console.log(`Fetching job market data for: ${jobTitle}`);

    // Build SerpAPI URL for Google Jobs
    const searchParams = new URLSearchParams({
      engine: 'google_jobs',
      q: jobTitle,
      hl: 'en',
      gl: 'us',
      api_key: SERPAPI_KEY,
      num: '20', // Get more results for better analysis
    });

    const serpApiUrl = `https://serpapi.com/search?${searchParams.toString()}`;
    
    const response = await fetch(serpApiUrl);
    
    if (!response.ok) {
      throw new Error(`SerpAPI request failed: ${response.status}`);
    }

    const data = await response.json();
    console.log('SerpAPI response received:', data.search_metadata?.status);

    if (data.error) {
      throw new Error(`SerpAPI error: ${data.error}`);
    }

    const jobs = data.jobs_results || [];
    console.log(`Found ${jobs.length} jobs`);

    // Process job data
    const processedData: JobMarketData = {
      totalJobs: jobs.length,
      recentJobs: jobs.slice(0, 5).map((job: any) => ({
        title: job.title || 'Unknown Title',
        company: job.company_name || 'Unknown Company',
        location: job.location || 'Unknown Location',
        salary: job.salary || null,
        postedDate: job.posted_at || 'Recently',
        source: job.via || 'Unknown Source',
      })),
      topLocations: [],
      trending: jobs.length > 15, // Consider trending if many jobs available
    };

    // Analyze locations
    const locationCounts: Record<string, number> = {};
    jobs.forEach((job: any) => {
      if (job.location) {
        const location = job.location.split(',')[0].trim(); // Get city/state
        locationCounts[location] = (locationCounts[location] || 0) + 1;
      }
    });

    processedData.topLocations = Object.entries(locationCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .map(([location, count]) => ({ location, count }));

    // Analyze salaries if available
    const salaries: number[] = [];
    jobs.forEach((job: any) => {
      if (job.salary) {
        // Extract numbers from salary string
        const matches = job.salary.match(/\$?([\d,]+)/g);
        if (matches) {
          matches.forEach((match: string) => {
            const num = parseInt(match.replace(/[$,]/g, ''));
            if (num > 20000 && num < 500000) { // Reasonable salary range
              salaries.push(num);
            }
          });
        }
      }
    });

    if (salaries.length > 0) {
      const sortedSalaries = salaries.sort((a, b) => a - b);
      processedData.averageSalary = Math.round(salaries.reduce((a, b) => a + b, 0) / salaries.length);
      processedData.salaryRange = {
        min: sortedSalaries[0],
        max: sortedSalaries[sortedSalaries.length - 1],
      };
    }

    return new Response(JSON.stringify(processedData), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('SerpAPI jobs error:', error);
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : 'Unknown error',
      totalJobs: 0,
      recentJobs: [],
      topLocations: [],
      trending: false,
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
