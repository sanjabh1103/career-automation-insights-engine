
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { APIErrorHandler, withRetry } from "@/utils/apiErrorHandler";
import { apoRateLimiter, checkRateLimit } from "@/utils/rateLimiting";

export interface APOAnalysis {
  occupation_code: string;
  occupation_title: string;
  overall_score: number;
  confidence_level: number;
  automation_timeline: string;
  risk_level: 'Low' | 'Medium' | 'Med-High' | 'High';
  category_breakdown: {
    tasks: { score: number; details: any[] };
    knowledge: { score: number; details: any[] };
    skills: { score: number; details: any[] };
    abilities: { score: number; details: any[] };
    technology: { score: number; details: any[] };
  };
  insights: {
    opportunities: string[];
    challenges: string[];
    recommendations: string[];
  };
  job_market: {
    current_demand: string;
    salary_range: string;
    growth_outlook: string;
    locations: string[];
  };
}

export function useAPOCalculation() {
  const [isCalculating, setIsCalculating] = useState(false);
  const queryClient = useQueryClient();
  const { toast } = useToast();

  // Simple health check using table query
  const healthCheckMutation = useMutation({
    mutationFn: async () => {
      const { data, error } = await supabase.from('profiles').select('count').limit(1);
      if (error) throw error;
      return { status: 'healthy' };
    }
  });

  const calculateAPO = async (occupationCode: string, occupationTitle: string): Promise<APOAnalysis> => {
    setIsCalculating(true);
    
    try {
      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error('Authentication required');
      }

      // Check rate limiting
      const rateCheck = checkRateLimit(apoRateLimiter, user.id);
      if (!rateCheck.allowed) {
        const resetTime = new Date(rateCheck.resetTime);
        throw new Error(`Rate limit exceeded. Try again at ${resetTime.toLocaleTimeString()}`);
      }

      // Skip credit deduction for now since the RPC functions don't exist
      console.log('Starting APO analysis for:', occupationTitle);

      // Use edge function for the entire analysis flow
      console.log('Calculating new APO analysis...');

      // Calculate new APO analysis with retry logic
      const analysis = await withRetry(async () => {
        const { data, error } = await supabase.functions.invoke('calculate-apo', {
          body: { 
            occupation_code: occupationCode, 
            occupation_title: occupationTitle 
          }
        });

        if (error) throw error;
        return data.analysis;
      }, 'APO calculation');

      // The edge function handles caching internally
      console.log('APO analysis completed successfully');

      // Invalidate user profile to update credits display
      queryClient.invalidateQueries({ queryKey: ['user_profile'] });

      setIsCalculating(false);
      return analysis;

    } catch (error) {
      setIsCalculating(false);
      const apiError = APIErrorHandler.handle(error);
      APIErrorHandler.logError(apiError, 'APO Calculation');
      
      console.error('APO Calculation Error:', error);
      
      toast({
        variant: 'destructive',
        title: 'Analysis Failed',
        description: apiError.message,
      });
      
      throw error;
    }
  };

  const getJobMarketData = async (occupationTitle: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return null;

      const data = await withRetry(async () => {
        const { data, error } = await supabase.functions.invoke('serpapi-jobs', {
          body: { occupation_title: occupationTitle }
        });
        
        if (error) throw error;
        return data;
      }, 'Job market data fetch');

      return data;
    } catch (error) {
      const apiError = APIErrorHandler.handle(error);
      APIErrorHandler.logError(apiError, 'Job Market Data');
      console.error('Job Market Data Error:', error);
      return null;
    }
  };

  return {
    calculateAPO,
    getJobMarketData,
    isCalculating,
    healthCheck: () => healthCheckMutation.mutate()
  };
}
