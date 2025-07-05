
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart3, Loader2, MapPin } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { DemandForecastCard } from './market-insights/DemandForecastCard';
import { SalaryAnalysisCard } from './market-insights/SalaryAnalysisCard';
import { TopSkillsCard } from './market-insights/TopSkillsCard';
import { GeographicHotspotsCard } from './market-insights/GeographicHotspotsCard';

interface MarketInsightsPanelProps {
  occupationTitle?: string;
}

interface MarketInsights {
  demandForecast: {
    trend: string;
    confidence: number;
    factors: string[];
  };
  salaryAnalysis: {
    currentRange: string;
    trend: string;
    projection: string;
  };
  topSkills: Array<{
    skill: string;
    demand: string;
    growth: string;
  }>;
  geographicHotspots: Array<{
    location: string;
    opportunities: number;
    reason: string;
  }>;
  industryGrowth: Array<{
    sector: string;
    growthRate: string;
    outlook: string;
  }>;
  remoteWorkPotential: {
    score: number;
    factors: string[];
  };
  aiImpact: {
    riskLevel: string;
    timeline: string;
    mitigation: string[];
  };
  careerPaths: Array<{
    path: string;
    timeframe: string;
    requirements: string[];
  }>;
  marketSaturation: {
    level: string;
    competitiveness: string;
  };
}

export function MarketInsightsPanel({ occupationTitle }: MarketInsightsPanelProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [insights, setInsights] = useState<MarketInsights | null>(null);
  const [location, setLocation] = useState('United States');
  const [timeHorizon, setTimeHorizon] = useState('12');

  const generateInsights = async () => {
    if (!occupationTitle) {
      toast.error('Please select an occupation first');
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('market-insights', {
        body: {
          occupation_title: occupationTitle,
          location,
          time_horizon: timeHorizon
        },
      });

      if (error) throw error;
      
      setInsights(data);
      toast.success('Market insights generated successfully');
    } catch (error) {
      console.error('Market insights failed:', error);
      toast.error('Failed to generate market insights');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-indigo-600" />
          Market Insights
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {occupationTitle ? (
          <p className="text-sm text-gray-600">
            Market analysis for <span className="font-medium">{occupationTitle}</span>
          </p>
        ) : (
          <p className="text-sm text-gray-600">
            Select an occupation to get comprehensive market insights
          </p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Enter location"
                className="pl-10"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="timeHorizon">Time Horizon (months)</Label>
            <Input
              id="timeHorizon"
              type="number"
              value={timeHorizon}
              onChange={(e) => setTimeHorizon(e.target.value)}
              min="1"
              max="60"
            />
          </div>
        </div>

        <Button 
          onClick={generateInsights} 
          disabled={isLoading || !occupationTitle}
          className="w-full"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Generating Insights...
            </>
          ) : (
            <>
              <BarChart3 className="w-4 h-4 mr-2" />
              Generate Market Insights
            </>
          )}
        </Button>

        {insights && (
          <Tabs defaultValue="demand" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="demand">Demand</TabsTrigger>
              <TabsTrigger value="salary">Salary</TabsTrigger>
              <TabsTrigger value="skills">Skills</TabsTrigger>
              <TabsTrigger value="locations">Locations</TabsTrigger>
            </TabsList>

            <TabsContent value="demand" className="space-y-4">
              <DemandForecastCard demandForecast={insights.demandForecast} />
            </TabsContent>

            <TabsContent value="salary" className="space-y-4">
              <SalaryAnalysisCard salaryAnalysis={insights.salaryAnalysis} />
            </TabsContent>

            <TabsContent value="skills" className="space-y-4">
              <TopSkillsCard topSkills={insights.topSkills} />
            </TabsContent>

            <TabsContent value="locations" className="space-y-4">
              <GeographicHotspotsCard geographicHotspots={insights.geographicHotspots} />
            </TabsContent>
          </Tabs>
        )}
      </CardContent>
    </Card>
  );
}
