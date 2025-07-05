
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Target } from 'lucide-react';

interface SkillGap {
  skill: string;
  currentLevel: number;
  requiredLevel: number;
  priority: string;
}

interface SkillGapCardProps {
  gaps: SkillGap[];
}

export function SkillGapCard({ gaps }: SkillGapCardProps) {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="w-4 h-4 text-red-600" />
          Skill Gap Analysis
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {gaps.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No skill gaps identified</p>
        ) : (
          gaps.map((gap, index) => (
            <div key={index} className="p-4 border rounded-lg bg-gray-50">
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-medium">{gap.skill}</h4>
                <Badge className={getPriorityColor(gap.priority)}>
                  {gap.priority} priority
                </Badge>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-gray-600">
                  <span>Current: Level {gap.currentLevel}</span>
                  <span>Required: Level {gap.requiredLevel}</span>
                </div>
                <Progress 
                  value={(gap.currentLevel / gap.requiredLevel) * 100} 
                  className="h-2" 
                />
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}
