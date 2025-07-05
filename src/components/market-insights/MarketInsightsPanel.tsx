
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TrendingUp, MapPin, DollarSign, Users, Briefcase, Loader2, RefreshCw } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { SalaryAnalysisCard } from './SalaryAnalysisCard';
import { DemandForecastCard } from './DemandForecastCard';
import { TopSkillsCard } from './TopSkillsCard';
import { GeographicHotspotsCard } from './GeographicHotspotsCard';

interface MarketInsightsPanelProps {
  occupationTitle?: string;
}

interface MarketInsights {
  demandForecast: {
    currentDemand: string;
    futureOutlook: string;
    growthRate: number;
    employmentProjection: string;
  };
  salaryAnalysis: {
    medianSalary: number;
    salaryRange: { min: number; max: number };
    salaryGrowth: number;
    location: string;
  };
  skillsTrends: Array<{
    skill: string;
    demandLevel: string;
    importance: number;
    trend: 'increasing' | 'stable' | 'decreasing';
  }>;
  geographicHotspots: Array<{
    location: string;
    opportunities: number;
    reason: string;
  }>;
  industryContext: {
    keyIndustries: string[];
    emergingRoles: string[];
    disruptionFactors: string[];
  };
}

export function MarketInsightsPanel({ occupationTitle }: MarketInsightsPanelProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [insights, setInsights] = useState<MarketInsights | null>(null);
  const [location, setLocation] = useState('United States');
  const [timeHorizon, setTimeHorizon] = useState(12);
  const { toast } = useToast();

  const fetchMarketInsights = async () => {
    if (!occupationTitle) {
      toast({
        variant: 'destructive',
        title: 'Missing Information',
        description: 'Please select an occupation to get market insights',
      });
      return;
    }

    setIsLoading(true);
    try {
      console.log('Fetching market insights for:', occupationTitle);

      // Check cache first
      const { data: cachedInsights } = await supabase
        .from('market_insights_cache')
        .select('insights_data')
        .eq('occupation_title', occupationTitle)
        .eq('location', location)
        .eq('time_horizon', timeHorizon)
        .gte('created_at', new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString())
        .single();

      if (cachedInsights) {
        console.log('Using cached market insights');
        setInsights(cachedInsights.insights_data);
        toast({
          title: 'Market Insights Loaded',
          description: 'Displaying cached market analysis data',
        });
        return;
      }

      // Fetch fresh data
      const { data, error } = await supabase.functions.invoke('market-insights', {
        body: {
          occupation_title: occupationTitle,
          location,
          time_horizon: timeHorizon,
        },
      });

      if (error) {
        console.error('Market insights error:', error);
        throw new Error(`Market analysis failed: ${error.message}`);
      }

      console.log('Market insights received:', data);
      setInsights(data);

      // Cache the results
      await supabase
        .from('market_insights_cache')
        .upsert({
          occupation_title: occupationTitle,
          location,
          time_horizon: timeHorizon,
          insights_data: data,
        });

      toast({
        title: 'Market Insights Generated',
        description: 'Market analysis completed successfully',
      });
    } catch (error) {
      console.error('Failed to fetch market insights:', error);
      toast({
        variant: 'destructive',
        title: 'Market Analysis Failed',
        description: error instanceof Error ? error.message : 'Failed to generate market insights',
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (occupationTitle) {
      fetchMarketInsights();
    }
  }, [occupationTitle, location, timeHorizon]);

  if (!occupationTitle) {
    return (
      <Card className="p-12 text-center">
        <Briefcase className="h-16 w-16 mx-auto mb-4 text-gray-300" />
        <h3 className="text-lg font-semibold text-gray-700 mb-2">Market Insights</h3>
        <p className="text-gray-500">Select an occupation to view detailed market analysis</p>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-blue-600" />
            Market Insights for {occupationTitle}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-4">
            <div className="flex-1">
              <label className="block text-sm font-medium mb-2">Location</label>
              <Select value={location} onValueChange={setLocation}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="United States">United States</SelectItem>
                  <SelectItem value="California">California</SelectItem>
                  <SelectItem value="New York">New York</SelectItem>
                  <SelectItem value="Texas">Texas</SelectItem>
                  <SelectItem value="Florida">Florida</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium mb-2">Time Horizon</label>
              <Select value={timeHorizon.toString()} onValueChange={(value) => setTimeHorizon(parseInt(value))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="6">6 months</SelectItem>
                  <SelectItem value="12">1 year</SelectItem>
                  <SelectItem value="24">2 years</SelectItem>
                  <SelectItem value="60">5 years</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button 
                onClick={fetchMarketInsights}
                disabled={isLoading}
                className="flex items-center gap-2"
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <RefreshCw className="w-4 h-4" />
                )}
                Refresh
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {isLoading ? (
        <Card className="p-12 text-center">
          <Loader2 className="w-16 h-16 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Analyzing market trends and opportunities...</p>
        </Card>
      ) : insights ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <DemandForecastCard demandForecast={insights.demandForecast} />
          <SalaryAnalysisCard salaryAnalysis={insights.salaryAnalysis} />
          <TopSkillsCard skillsTrends={insights.skillsTrends} />
          <GeographicHotspotsCard geographicHotspots={insights.geographicHotspots} />
          
          {/* Industry Context Card */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-4 h-4 text-orange-600" />
                Industry Context
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium text-sm mb-2">Key Industries</h4>
                <div className="flex flex-wrap gap-2">
                  {insights.industryContext.keyIndustries.map((industry, index) => (
                    <Badge key={index} variant="outline">{industry}</Badge>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-medium text-sm mb-2">Emerging Roles</h4>
                <div className="flex flex-wrap gap-2">
                  {insights.industryContext.emergingRoles.map((role, index) => (
                    <Badge key={index} className="bg-green-100 text-green-800">{role}</Badge>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-medium text-sm mb-2">Disruption Factors</h4>
                <div className="flex flex-wrap gap-2">
                  {insights.industryContext.disruptionFactors.map((factor, index) => (
                    <Badge key={index} className="bg-red-100 text-red-800">{factor}</Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        <Card className="p-12 text-center">
          <TrendingUp className="h-16 w-16 mx-auto mb-4 text-gray-300" />
          <p className="text-gray-600">Click "Refresh" to generate market insights</p>
        </Card>
      )}
    </div>
  );
}
