
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Award } from 'lucide-react';

interface TopSkill {
  skill: string;
  demand: string;
  growth: string;
}

interface TopSkillsCardProps {
  topSkills: TopSkill[];
}

export function TopSkillsCard({ topSkills }: TopSkillsCardProps) {
  const getDemandColor = (demand: string) => {
    switch (demand) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  const parseGrowthPercentage = (growth: string) => {
    const match = growth.match(/(\d+)%/);
    return match ? parseInt(match[1]) : 0;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Award className="w-4 h-4 text-blue-600" />
          Top Skills in Demand
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {topSkills.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No skills data available</p>
        ) : (
          topSkills.map((skill, index) => (
            <div key={index} className="p-3 border rounded-lg bg-gray-50">
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-medium text-sm">{skill.skill}</h4>
                <Badge className={getDemandColor(skill.demand)}>
                  {skill.demand} demand
                </Badge>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-gray-600">
                  <span>Growth Rate</span>
                  <span>{skill.growth}</span>
                </div>
                <Progress 
                  value={parseGrowthPercentage(skill.growth)} 
                  className="h-1.5" 
                />
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}
