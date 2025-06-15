
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

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

  const calculateAPO = async (occupationCode: string, occupationTitle: string): Promise<APOAnalysis> => {
    setIsCalculating(true);
    
    try {
      // First check cache
      const { data: cached } = await supabase
        .from('apo_analysis_cache')
        .select('*')
        .eq('occupation_code', occupationCode)
        .single();

      if (cached && cached.analysis_data) {
        setIsCalculating(false);
        // Properly type check and cast the cached data
        const analysisData = cached.analysis_data as unknown as APOAnalysis;
        return analysisData;
      }

      // Calculate new APO analysis
      const { data, error } = await supabase.functions.invoke('calculate-apo', {
        body: { 
          occupation_code: occupationCode, 
          occupation_title: occupationTitle 
        }
      });

      if (error) throw error;

      // Cache the result
      await supabase
        .from('apo_analysis_cache')
        .upsert({
          occupation_code: occupationCode,
          occupation_title: occupationTitle,
          analysis_data: data.analysis
        });

      setIsCalculating(false);
      return data.analysis;
    } catch (error) {
      setIsCalculating(false);
      console.error('APO Calculation Error:', error);
      throw error;
    }
  };

  const getJobMarketData = async (occupationTitle: string) => {
    try {
      const { data, error } = await supabase.functions.invoke('serpapi-jobs', {
        body: { occupation_title: occupationTitle }
      });
      
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Job Market Data Error:', error);
      return null;
    }
  };

  return {
    calculateAPO,
    getJobMarketData,
    isCalculating
  };
}
