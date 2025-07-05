
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Award, Target } from 'lucide-react';

interface LearningPhase {
  phase: string;
  duration: string;
  skills: string[];
}

interface Certification {
  name: string;
  provider: string;
  relevance: string;
}

interface LearningPathwayCardProps {
  learningPathway: LearningPhase[];
  certifications: Certification[];
}

export function LearningPathwayCard({ learningPathway, certifications }: LearningPathwayCardProps) {
  const getPriorityColor = (relevance: string) => {
    switch (relevance) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  const getRelevanceIcon = (relevance: string) => {
    switch (relevance) {
      case 'high': return <Target className="w-4 h-4 text-red-500" />;
      case 'medium': return <BookOpen className="w-4 h-4 text-yellow-500" />;
      case 'low': return <Award className="w-4 h-4 text-green-500" />;
      default: return <BookOpen className="w-4 h-4 text-blue-500" />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-blue-600" />
          Learning Pathway
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <h4 className="text-sm font-medium">Recommended Learning Path</h4>
          {learningPathway.length === 0 ? (
            <p className="text-gray-500 text-sm">No learning pathway available</p>
          ) : (
            learningPathway.map((phase, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h5 className="font-medium">{phase.phase}</h5>
                  <Badge variant="outline">{phase.duration}</Badge>
                </div>
                <div className="flex flex-wrap gap-1">
                  {phase.skills.map((skill, idx) => (
                    <Badge key={idx} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>

        {certifications.length > 0 && (
          <div className="space-y-3">
            <h4 className="text-sm font-medium flex items-center gap-2">
              <Award className="w-4 h-4 text-purple-600" />
              Recommended Certifications
            </h4>
            {certifications.map((cert, index) => (
              <div key={index} className="p-3 border rounded-lg flex items-start gap-3">
                {getRelevanceIcon(cert.relevance)}
                <div className="flex-1">
                  <h5 className="font-medium text-sm">{cert.name}</h5>
                  <p className="text-xs text-gray-600">Provider: {cert.provider}</p>
                </div>
                <Badge className={getPriorityColor(cert.relevance)}>
                  {cert.relevance}
                </Badge>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
