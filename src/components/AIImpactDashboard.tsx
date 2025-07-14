
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { AlertTriangle, TrendingUp, BookOpen, Zap } from 'lucide-react';
import { LoadingSpinner } from './LoadingSpinner';

interface TaskAssessment {
  id: string;
  occupation_code: string;
  task_description: string;
  category: string;
  confidence: number | null;
  explanation: string | null;
  created_at: string;
  updated_at: string;
}

interface ReskillResource {
  id: string;
  title: string;
  description: string | null;
  provider: string;
  skill_area: string;
  url: string;
  cost_type: string | null;
  created_at: string;
  updated_at: string;
}

export const AIImpactDashboard = () => {
  const { data: assessments, isLoading: assessmentsLoading } = useQuery({
    queryKey: ['ai-task-assessments'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('ai_task_assessments')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50);
      
      if (error) throw error;
      return data as TaskAssessment[];
    },
  });

  const { data: resources, isLoading: resourcesLoading } = useQuery({
    queryKey: ['ai-reskilling-resources'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('ai_reskilling_resources')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(20);
      
      if (error) throw error;
      return data as ReskillResource[];
    },
  });

  if (assessmentsLoading || resourcesLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <LoadingSpinner size="lg" text="Loading AI Impact Analysis..." />
      </div>
    );
  }

  const highRiskTasks = assessments?.filter(a => a.category === 'high_automation_risk') || [];
  const mediumRiskTasks = assessments?.filter(a => a.category === 'medium_automation_risk') || [];
  const lowRiskTasks = assessments?.filter(a => a.category === 'low_automation_risk') || [];
  
  const totalTasks = assessments?.length || 0;
  const automationRiskScore = totalTasks > 0 
    ? Math.round(((highRiskTasks.length * 3 + mediumRiskTasks.length * 2 + lowRiskTasks.length * 1) / (totalTasks * 3)) * 100)
    : 0;

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'high_automation_risk':
        return 'destructive';
      case 'medium_automation_risk':
        return 'default';
      case 'low_automation_risk':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'high_automation_risk':
        return <AlertTriangle className="h-4 w-4" />;
      case 'medium_automation_risk':
        return <TrendingUp className="h-4 w-4" />;
      case 'low_automation_risk':
        return <Zap className="h-4 w-4" />;
      default:
        return <BookOpen className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Tasks Analyzed</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalTasks}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">High Risk Tasks</CardTitle>
            <AlertTriangle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{highRiskTasks.length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Automation Risk Score</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{automationRiskScore}%</div>
            <Progress value={automationRiskScore} className="mt-2" />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Reskilling Resources</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{resources?.length || 0}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Task Automation Analysis</CardTitle>
            <CardDescription>
              Recent AI-powered task assessments and automation risk levels
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {assessments?.slice(0, 10).map((assessment) => (
                <div key={assessment.id} className="flex items-start justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      {getCategoryIcon(assessment.category)}
                      <Badge variant={getCategoryColor(assessment.category) as any}>
                        {assessment.category.replace('_', ' ').toUpperCase()}
                      </Badge>
                    </div>
                    <p className="text-sm font-medium mb-1">
                      {assessment.task_description}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Occupation: {assessment.occupation_code}
                    </p>
                    {assessment.confidence && (
                      <p className="text-xs text-muted-foreground mt-1">
                        Confidence: {Math.round(assessment.confidence * 100)}%
                      </p>
                    )}
                  </div>
                </div>
              ))}
              {(!assessments || assessments.length === 0) && (
                <p className="text-center text-muted-foreground py-8">
                  No task assessments available yet
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Reskilling Resources</CardTitle>
            <CardDescription>
              Curated learning resources for skill development and career transition
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {resources?.slice(0, 10).map((resource) => (
                <div key={resource.id} className="p-3 border rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="text-sm font-medium">{resource.title}</h4>
                    <Badge variant="outline">{resource.skill_area}</Badge>
                  </div>
                  {resource.description && (
                    <p className="text-xs text-muted-foreground mb-2">
                      {resource.description}
                    </p>
                  )}
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>Provider: {resource.provider}</span>
                    {resource.cost_type && (
                      <Badge variant="secondary" className="text-xs">
                        {resource.cost_type}
                      </Badge>
                    )}
                  </div>
                  <a
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-2 text-xs text-primary hover:underline"
                  >
                    View Resource →
                  </a>
                </div>
              ))}
              {(!resources || resources.length === 0) && (
                <p className="text-center text-muted-foreground py-8">
                  No reskilling resources available yet
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
