
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface JobResult {
  title: string;
  company: string;
  location: string;
  salary?: string;
  postedDate: string;
  source: string;
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
  recentJobs: JobResult[];
  trending: boolean;
  error?: string;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { jobTitle } = await req.json();
    
    console.log('Searching for job:', jobTitle);

    // Check if we have SerpAPI key
    const serpApiKey = Deno.env.get('SERPAPI_API_KEY') || Deno.env.get('SERPAPI_KEY');
    
    if (!serpApiKey) {
      console.error('SerpAPI key not found');
      return new Response(JSON.stringify({
        totalJobs: 0,
        recentJobs: [],
        topLocations: [],
        trending: false,
        error: 'SerpAPI key not configured'
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Build SerpAPI URL for Google Jobs
    const serpApiUrl = new URL('https://serpapi.com/search.json');
    serpApiUrl.searchParams.set('engine', 'google_jobs');
    serpApiUrl.searchParams.set('q', jobTitle);
    serpApiUrl.searchParams.set('api_key', serpApiKey);
    serpApiUrl.searchParams.set('hl', 'en');
    serpApiUrl.searchParams.set('gl', 'us');
    serpApiUrl.searchParams.set('num', '10');

    console.log('Making request to SerpAPI:', serpApiUrl.toString().replace(serpApiKey, '[HIDDEN]'));

    const response = await fetch(serpApiUrl.toString());
    
    if (!response.ok) {
      console.error('SerpAPI request failed:', response.status, response.statusText);
      const errorText = await response.text();
      console.error('Error response:', errorText);
      
      return new Response(JSON.stringify({
        totalJobs: 0,
        recentJobs: [],
        topLocations: [],
        trending: false,
        error: `SerpAPI request failed: ${response.status}`
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const data = await response.json();
    console.log('SerpAPI response received, jobs found:', data.jobs_results?.length || 0);

    if (data.error) {
      console.error('SerpAPI error:', data.error);
      return new Response(JSON.stringify({
        totalJobs: 0,
        recentJobs: [],
        topLocations: [],
        trending: false,
        error: data.error
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const jobs = data.jobs_results || [];
    const totalJobs = jobs.length;

    // Process job data
    const recentJobs: JobResult[] = jobs.slice(0, 5).map((job: any) => ({
      title: job.title || 'Unknown Title',
      company: job.company_name || 'Unknown Company',
      location: job.location || 'Unknown Location',
      salary: job.salary ? `$${job.salary}` : null,
      postedDate: job.posted_at || 'Recently',
      source: job.via || 'Job Board'
    }));

    // Extract locations and count them
    const locationCounts = new Map<string, number>();
    jobs.forEach((job: any) => {
      if (job.location) {
        const location = job.location.split(',')[0].trim(); // Get city name
        locationCounts.set(location, (locationCounts.get(location) || 0) + 1);
      }
    });

    const topLocations = Array.from(locationCounts.entries())
      .map(([location, count]) => ({ location, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    // Calculate salary information if available
    const salariesWithNumbers = jobs
      .map((job: any) => job.salary)
      .filter((salary: any) => salary && typeof salary === 'number');

    let averageSalary: number | undefined;
    let salaryRange: { min: number; max: number } | undefined;

    if (salariesWithNumbers.length > 0) {
      averageSalary = Math.round(salariesWithNumbers.reduce((sum: number, salary: number) => sum + salary, 0) / salariesWithNumbers.length);
      salaryRange = {
        min: Math.min(...salariesWithNumbers),
        max: Math.max(...salariesWithNumbers)
      };
    }

    const jobMarketData: JobMarketData = {
      totalJobs,
      averageSalary,
      salaryRange,
      topLocations,
      recentJobs,
      trending: totalJobs > 50 // Consider trending if more than 50 jobs
    };

    console.log('Processed job market data:', jobMarketData);

    return new Response(JSON.stringify(jobMarketData), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in serpapi-jobs function:', error);
    return new Response(JSON.stringify({
      totalJobs: 0,
      recentJobs: [],
      topLocations: [],
      trending: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
