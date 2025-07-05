
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Brain, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { SkillGapCard } from './enhanced-skill-analysis/SkillGapCard';
import { FutureSkillsCard } from './enhanced-skill-analysis/FutureSkillsCard';
import { LearningPathwayCard } from './enhanced-skill-analysis/LearningPathwayCard';
import { MarketTrendsCard } from './enhanced-skill-analysis/MarketTrendsCard';

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
      </CardContent>
    </Card>
  );
}
