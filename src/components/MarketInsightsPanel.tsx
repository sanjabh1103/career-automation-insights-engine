
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  MapPin, 
  Building2, 
  Wifi,
  Shield,
  Users,
  Loader2,
  BarChart3
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface MarketInsightsPanelProps {
  occupationTitle?: string;
  location?: string;
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

export function MarketInsightsPanel({ occupationTitle, location = 'United States' }: MarketInsightsPanelProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [insights, setInsights] = useState<MarketInsights | null>(null);

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
          location: location,
          time_horizon: '12'
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

  const getTrendIcon = (trend: string) => {
    switch (trend.toLowerCase()) {
      case 'increasing':
      case 'up':
        return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'decreasing':
      case 'down':
        return <TrendingDown className="w-4 h-4 text-red-500" />;
      default:
        return <BarChart3 className="w-4 h-4 text-blue-500" />;
    }
  };

  const getRiskColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  const getDemandColor = (demand: string) => {
    switch (demand.toLowerCase()) {
      case 'high': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-red-100 text-red-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-blue-600" />
          Market Insights
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {occupationTitle ? (
          <p className="text-sm text-gray-600">
            Market analysis for <span className="font-medium">{occupationTitle}</span> in {location}
          </p>
        ) : (
          <p className="text-sm text-gray-600">
            Select an occupation to get comprehensive market insights
          </p>
        )}

        <Button 
          onClick={generateInsights} 
          disabled={isLoading || !occupationTitle}
          className="w-full"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Analyzing Market...
            </>
          ) : (
            <>
              <BarChart3 className="w-4 h-4 mr-2" />
              Generate Market Insights
            </>
          )}
        </Button>

        {insights && (
          <div className="space-y-6">
            {/* Demand Forecast */}
            <div className="p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium flex items-center gap-2">
                  {getTrendIcon(insights.demandForecast.trend)}
                  Job Demand Forecast
                </h3>
                <Badge className={getDemandColor(insights.demandForecast.trend)}>
                  {insights.demandForecast.trend}
                </Badge>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Confidence Level</span>
                  <span>{insights.demandForecast.confidence}%</span>
                </div>
                <Progress value={insights.demandForecast.confidence} className="h-2" />
                <div className="text-xs text-gray-600">
                  Key factors: {insights.demandForecast.factors.join(', ')}
                </div>
              </div>
            </div>

            {/* Salary Analysis */}
            <div className="p-4 border rounded-lg">
              <h3 className="font-medium flex items-center gap-2 mb-3">
                <DollarSign className="w-4 h-4 text-green-600" />
                Salary Analysis
              </h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Current Range</span>
                  <div className="font-medium">{insights.salaryAnalysis.currentRange}</div>
                </div>
                <div>
                  <span className="text-gray-600">Projection</span>
                  <div className="font-medium flex items-center gap-1">
                    {getTrendIcon(insights.salaryAnalysis.trend)}
                    {insights.salaryAnalysis.projection}
                  </div>
                </div>
              </div>
            </div>

            {/* Top Skills */}
            <div className="p-4 border rounded-lg">
              <h3 className="font-medium mb-3">High-Demand Skills</h3>
              <div className="space-y-2">
                {insights.topSkills.map((skill, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <span className="text-sm font-medium">{skill.skill}</span>
                    <div className="flex items-center gap-2">
                      <Badge className={getDemandColor(skill.demand)}>
                        {skill.demand}
                      </Badge>
                      <span className="text-xs text-green-600">+{skill.growth}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Geographic Hotspots */}
            <div className="p-4 border rounded-lg">
              <h3 className="font-medium flex items-center gap-2 mb-3">
                <MapPin className="w-4 h-4 text-blue-600" />
                Geographic Opportunities
              </h3>
              <div className="space-y-2">
                {insights.geographicHotspots.map((hotspot, index) => (
                  <div key={index} className="p-2 bg-blue-50 rounded">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{hotspot.location}</span>
                      <span className="text-xs text-blue-600">{hotspot.opportunities} jobs</span>
                    </div>
                    <p className="text-xs text-gray-600 mt-1">{hotspot.reason}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Industry Growth */}
            <div className="p-4 border rounded-lg">
              <h3 className="font-medium flex items-center gap-2 mb-3">
                <Building2 className="w-4 h-4 text-purple-600" />
                Industry Growth
              </h3>
              <div className="space-y-2">
                {insights.industryGrowth.map((industry, index) => (
                  <div key={index} className="p-2 bg-purple-50 rounded">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{industry.sector}</span>
                      <span className="text-sm text-green-600">{industry.growthRate}</span>
                    </div>
                    <p className="text-xs text-gray-600 mt-1">{industry.outlook}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Remote Work & AI Impact */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border rounded-lg">
                <h3 className="font-medium flex items-center gap-2 mb-3">
                  <Wifi className="w-4 h-4 text-indigo-600" />
                  Remote Work Potential
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Score</span>
                    <span>{insights.remoteWorkPotential.score}%</span>
                  </div>
                  <Progress value={insights.remoteWorkPotential.score} className="h-2" />
                </div>
              </div>

              <div className="p-4 border rounded-lg">
                <h3 className="font-medium flex items-center gap-2 mb-3">
                  <Shield className="w-4 h-4 text-orange-600" />
                  AI Impact Risk
                </h3>
                <div className="space-y-2">
                  <Badge className={getRiskColor(insights.aiImpact.riskLevel)}>
                    {insights.aiImpact.riskLevel} risk
                  </Badge>
                  <p className="text-xs text-gray-600">
                    Timeline: {insights.aiImpact.timeline}
                  </p>
                </div>
              </div>
            </div>

            {/* Career Paths */}
            <div className="p-4 border rounded-lg">
              <h3 className="font-medium flex items-center gap-2 mb-3">
                <Users className="w-4 h-4 text-teal-600" />
                Career Advancement Paths
              </h3>
              <div className="space-y-3">
                {insights.careerPaths.map((path, index) => (
                  <div key={index} className="p-3 bg-teal-50 rounded">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-sm">{path.path}</span>
                      <span className="text-xs text-teal-600">{path.timeframe}</span>
                    </div>
                    <div className="text-xs text-gray-600">
                      Requirements: {path.requirements.join(', ')}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
