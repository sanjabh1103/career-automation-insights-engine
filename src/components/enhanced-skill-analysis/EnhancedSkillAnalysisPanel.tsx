
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Brain, Loader2, Lightbulb, Target, TrendingUp, BookOpen } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { SkillGapCard } from './SkillGapCard';
import { FutureSkillsCard } from './FutureSkillsCard';
import { LearningPathwayCard } from './LearningPathwayCard';
import { MarketTrendsCard } from './MarketTrendsCard';

interface EnhancedSkillAnalysisPanelProps {
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

export function EnhancedSkillAnalysisPanel({ 
  occupationTitle, 
  occupationCode, 
  userSkills = [] 
}: EnhancedSkillAnalysisPanelProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [analysisData, setAnalysisData] = useState<AnalysisData | null>(null);

  const performAnalysis = async () => {
    if (!occupationCode || !occupationTitle) {
      toast.error('Please select an occupation first');
      return;
    }

    setIsLoading(true);
    try {
      console.log('Performing enhanced skill analysis for:', occupationTitle);

      const { data, error } = await supabase.functions.invoke('enhanced-skill-analysis', {
        body: {
          occupation_code: occupationCode,
          occupation_title: occupationTitle,
          user_skills: userSkills
        },
      });

      if (error) throw error;
      
      console.log('Enhanced analysis data received:', data);
      setAnalysisData(data);
      
      toast.success('Enhanced skill analysis completed');
    } catch (error) {
      console.error('Enhanced analysis failed:', error);
      toast.error('Failed to perform enhanced skill analysis');
    } finally {
      setIsLoading(false);
    }
  };

  if (!occupationTitle) {
    return (
      <Card className="p-12 text-center">
        <Brain className="h-16 w-16 mx-auto mb-4 text-gray-300" />
        <h3 className="text-lg font-semibold text-gray-700 mb-2">Enhanced Skill Analysis</h3>
        <p className="text-gray-500">Select an occupation to get comprehensive skill analysis</p>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-purple-600" />
            Enhanced Skill Analysis
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-gray-600">
            Advanced AI-powered analysis for <span className="font-medium">{occupationTitle}</span>
          </p>

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
        </CardContent>
      </Card>

      {analysisData && (
        <Tabs defaultValue="gaps" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="gaps" className="flex items-center gap-2">
              <Target className="w-4 h-4" />
              Skill Gaps
            </TabsTrigger>
            <TabsTrigger value="future" className="flex items-center gap-2">
              <Lightbulb className="w-4 h-4" />
              Future Skills
            </TabsTrigger>
            <TabsTrigger value="pathway" className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              Learning Path
            </TabsTrigger>
            <TabsTrigger value="trends" className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Market Trends
            </TabsTrigger>
          </TabsList>

          <TabsContent value="gaps" className="space-y-4">
            <SkillGapCard gaps={analysisData.skillGaps} />
          </TabsContent>

          <TabsContent value="future" className="space-y-4">
            <FutureSkillsCard 
              futureProofSkills={analysisData.futureProofSkills}
              aiImpactMitigation={analysisData.aiImpactMitigation}
            />
          </TabsContent>

          <TabsContent value="pathway" className="space-y-4">
            <LearningPathwayCard 
              learningPathway={analysisData.learningPathway}
              certifications={analysisData.certifications}
            />
          </TabsContent>

          <TabsContent value="trends" className="space-y-4">
            <MarketTrendsCard marketTrends={analysisData.marketTrends} />
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}
