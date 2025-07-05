
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface DemandForecast {
  trend: string;
  confidence: number;
  factors: string[];
}

interface DemandForecastCardProps {
  demandForecast: DemandForecast;
}

export function DemandForecastCard({ demandForecast }: DemandForecastCardProps) {
  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'increasing': return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'decreasing': return <TrendingDown className="w-4 h-4 text-red-500" />;
      default: return <Minus className="w-4 h-4 text-yellow-500" />;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'increasing': return 'bg-green-100 text-green-800';
      case 'decreasing': return 'bg-red-100 text-red-800';
      default: return 'bg-yellow-100 text-yellow-800';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {getTrendIcon(demandForecast.trend)}
          Job Market Demand Forecast
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Market Trend</span>
          <Badge className={getTrendColor(demandForecast.trend)}>
            {demandForecast.trend}
          </Badge>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Confidence Level</span>
            <span>{demandForecast.confidence}%</span>
          </div>
          <Progress value={demandForecast.confidence} className="h-2" />
        </div>

        <div className="space-y-2">
          <h4 className="text-sm font-medium">Key Factors</h4>
          <div className="space-y-1">
            {demandForecast.factors.map((factor, index) => (
              <div key={index} className="text-xs bg-gray-50 p-2 rounded">
                {factor}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
