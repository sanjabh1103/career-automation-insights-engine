
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, AlertTriangle } from 'lucide-react';

interface FutureSkillsCardProps {
  futureProofSkills: string[];
  aiImpactMitigation: string[];
}

export function FutureSkillsCard({ futureProofSkills, aiImpactMitigation }: FutureSkillsCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-green-600" />
          Future-Proof Skills
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Essential Skills for the Future</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {futureProofSkills.length === 0 ? (
              <p className="text-gray-500 text-sm">No future skills data available</p>
            ) : (
              futureProofSkills.map((skill, index) => (
                <div key={index} className="p-3 border rounded-lg bg-green-50">
                  <span className="text-sm font-medium text-green-800">{skill}</span>
                </div>
              ))
            )}
          </div>
        </div>
        
        {aiImpactMitigation.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-orange-600" />
              AI Impact Mitigation Strategies
            </h4>
            {aiImpactMitigation.map((strategy, index) => (
              <div key={index} className="p-2 bg-orange-50 rounded text-sm">
                {strategy}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
