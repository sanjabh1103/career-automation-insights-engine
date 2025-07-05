
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DollarSign, TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface SalaryAnalysis {
  currentRange: string;
  trend: string;
  projection: string;
}

interface SalaryAnalysisCardProps {
  salaryAnalysis: SalaryAnalysis;
}

export function SalaryAnalysisCard({ salaryAnalysis }: SalaryAnalysisCardProps) {
  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'down': return <TrendingDown className="w-4 h-4 text-red-500" />;
      default: return <Minus className="w-4 h-4 text-yellow-500" />;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up': return 'bg-green-100 text-green-800';
      case 'down': return 'bg-red-100 text-red-800';
      default: return 'bg-yellow-100 text-yellow-800';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <DollarSign className="w-4 h-4 text-green-600" />
          Salary Analysis
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Current Range</span>
            <span className="font-semibold">{salaryAnalysis.currentRange}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Trend</span>
            <div className="flex items-center gap-2">
              {getTrendIcon(salaryAnalysis.trend)}
              <Badge className={getTrendColor(salaryAnalysis.trend)}>
                {salaryAnalysis.trend}
              </Badge>
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">12-Month Projection</span>
            <span className="font-semibold text-blue-600">{salaryAnalysis.projection}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
