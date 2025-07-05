
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin } from 'lucide-react';

interface GeographicHotspot {
  location: string;
  opportunities: number;
  reason: string;
}

interface GeographicHotspotsCardProps {
  geographicHotspots: GeographicHotspot[];
}

export function GeographicHotspotsCard({ geographicHotspots }: GeographicHotspotsCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-purple-600" />
          Geographic Hotspots
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {geographicHotspots.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No geographic data available</p>
        ) : (
          geographicHotspots.map((hotspot, index) => (
            <div key={index} className="p-3 border rounded-lg bg-purple-50">
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-medium text-purple-800">{hotspot.location}</h4>
                <Badge variant="secondary">{hotspot.opportunities} opportunities</Badge>
              </div>
              <p className="text-sm text-purple-700">{hotspot.reason}</p>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}
