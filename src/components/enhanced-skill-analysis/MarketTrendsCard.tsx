
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp } from 'lucide-react';

interface MarketTrendsCardProps {
  marketTrends: Record<string, string>;
}

export function MarketTrendsCard({ marketTrends }: MarketTrendsCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-indigo-600" />
          Market Trends
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {Object.keys(marketTrends).length === 0 ? (
          <p className="text-gray-500 text-center py-4">No market trends data available</p>
        ) : (
          Object.entries(marketTrends).map(([trend, description], index) => (
            <div key={index} className="p-4 border rounded-lg bg-indigo-50">
              <h4 className="font-medium text-indigo-800 mb-1">{trend}</h4>
              <p className="text-sm text-indigo-700">{description}</p>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}
