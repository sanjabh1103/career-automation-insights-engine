
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Brain, 
  TrendingUp, 
  Target, 
  Award, 
  BookOpen, 
  Clock,
  AlertTriangle,
  CheckCircle,
  Loader2
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface EnhancedSkillAnalysisProps {
  occupationTitle?: string;
  occupationCode?: string;
  userSkills?: Array<{
    name: string;
    level: number;
    category: string;
  }>;
}

interface SkillGap {
  skill: string;
  currentLevel: number;
  requiredLevel: number;
  priority: string;
}

interface AnalysisData {
  skillGaps: SkillGap[];
  futureProofSkills: string[];
  learningPathway: Array<{
    phase: string;
    duration: string;
    skills: string[];
  }>;
  marketTrends: Record<string, string>;
  certifications: Array<{
    name: string;
    provider: string;
    relevance: string;
  }>;
  aiImpactMitigation: string[];
}

export function EnhancedSkillAnalysis({ 
  occupationTitle, 
  occupationCode, 
  userSkills = [] 
}: EnhancedSkillAnalysisProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [analysisData, setAnalysisData] = useState<AnalysisData | null>(null);

  const performAnalysis = async () => {
    if (!occupationCode || !occupationTitle) {
      toast.error('Please select an occupation first');
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('enhanced-skill-analysis', {
        body: {
          occupation_code: occupationCode,
          occupation_title: occupationTitle,
          user_skills: userSkills
        },
      });

      if (error) throw error;
      
      setAnalysisData(data);
      toast.success('Enhanced skill analysis completed');
    } catch (error) {
      console.error('Enhanced analysis failed:', error);
      toast.error('Failed to perform enhanced skill analysis');
    } finally {
      setIsLoading(false);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  const getRelevanceIcon = (relevance: string) => {
    switch (relevance) {
      case 'high': return <Target className="w-4 h-4 text-red-500" />;
      case 'medium': return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'low': return <CheckCircle className="w-4 h-4 text-green-500" />;
      default: return <Brain className="w-4 h-4 text-blue-500" />;
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="w-5 h-5 text-purple-600" />
          Enhanced Skill Analysis
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {occupationTitle ? (
          <p className="text-sm text-gray-600">
            Advanced analysis for <span className="font-medium">{occupationTitle}</span>
          </p>
        ) : (
          <p className="text-sm text-gray-600">
            Select an occupation to get comprehensive skill analysis
          </p>
        )}

        <Button 
          onClick={performAnalysis} 
          disabled={isLoading || !occupationCode}
          className="w-full"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Analyzing Skills...
            </>
          ) : (
            <>
              <Brain className="w-4 h-4 mr-2" />
              Perform Enhanced Analysis
            </>
          )}
        </Button>

        {analysisData && (
          <Tabs defaultValue="gaps" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="gaps">Skill Gaps</TabsTrigger>
              <TabsTrigger value="future">Future Skills</TabsTrigger>
              <TabsTrigger value="pathway">Learning Path</TabsTrigger>
              <TabsTrigger value="trends">Market Trends</TabsTrigger>
            </TabsList>

            <TabsContent value="gaps" className="space-y-4">
              <div className="space-y-3">
                <h3 className="text-sm font-medium flex items-center gap-2">
                  <Target className="w-4 h-4 text-red-600" />
                  Skill Gap Analysis
                </h3>
                {analysisData.skillGaps.map((gap, index) => (
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
                ))}
              </div>
            </TabsContent>

            <TabsContent value="future" className="space-y-4">
              <div className="space-y-3">
                <h3 className="text-sm font-medium flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                  Future-Proof Skills
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {analysisData.futureProofSkills.map((skill, index) => (
                    <div key={index} className="p-3 border rounded-lg bg-green-50">
                      <span className="text-sm font-medium text-green-800">{skill}</span>
                    </div>
                  ))}
                </div>
                
                <div className="mt-4 space-y-2">
                  <h4 className="text-sm font-medium flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-orange-600" />
                    AI Impact Mitigation
                  </h4>
                  {analysisData.aiImpactMitigation.map((strategy, index) => (
                    <div key={index} className="p-2 bg-orange-50 rounded text-sm">
                      {strategy}
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="pathway" className="space-y-4">
              <div className="space-y-3">
                <h3 className="text-sm font-medium flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-blue-600" />
                  Learning Pathway
                </h3>
                {analysisData.learningPathway.map((phase, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">{phase.phase}</h4>
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
                ))}

                <div className="mt-4 space-y-3">
                  <h4 className="text-sm font-medium flex items-center gap-2">
                    <Award className="w-4 h-4 text-purple-600" />
                    Recommended Certifications
                  </h4>
                  {analysisData.certifications.map((cert, index) => (
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
              </div>
            </TabsContent>

            <TabsContent value="trends" className="space-y-4">
              <div className="space-y-3">
                <h3 className="text-sm font-medium flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-indigo-600" />
                  Market Trends
                </h3>
                {Object.entries(analysisData.marketTrends).map(([trend, description], index) => (
                  <div key={index} className="p-4 border rounded-lg bg-indigo-50">
                    <h4 className="font-medium text-indigo-800 mb-1">{trend}</h4>
                    <p className="text-sm text-indigo-700">{description}</p>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        )}
      </CardContent>
    </Card>
  );
}
