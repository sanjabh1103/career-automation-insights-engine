
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Progress } from '@/components/ui/progress';
import { Plus, BarChart3, TrendingUp, TrendingDown, Clock, Target, AlertTriangle } from 'lucide-react';
import { EnhancedAPOVisualization } from './EnhancedAPOVisualization';

interface EnhancedOccupationData {
  code: string;
  title: string;
  description: string;
  overallAPO: number;
  confidence: string;
  timeline: string;
  tasks: Array<{ description: string; apo: number; factors?: string[]; timeline?: string }>;
  knowledge: Array<{ description: string; apo: number; factors?: string[]; timeline?: string }>;
  skills: Array<{ description: string; apo: number; factors?: string[]; timeline?: string }>;
  abilities: Array<{ description: string; apo: number; factors?: string[]; timeline?: string }>;
  technologies: Array<{ description: string; apo: number; factors?: string[]; timeline?: string }>;
  categoryBreakdown: {
    tasks: { apo: number; confidence: string };
    knowledge: { apo: number; confidence: string };
    skills: { apo: number; confidence: string };
    abilities: { apo: number; confidence: string };
    technologies: { apo: number; confidence: string };
  };
  insights: {
    primary_opportunities: string[];
    main_challenges: string[];
    automation_drivers: string[];
    barriers: string[];
  };
  metadata: {
    analysis_version: string;
    calculation_method: string;
    timestamp: string;
  };
}

interface OccupationAnalysisProps {
  occupation: EnhancedOccupationData;
  overallAPO: number;
  onAddToSelected: () => void;
  isAlreadySelected: boolean;
}

export const OccupationAnalysis = ({ 
  occupation, 
  overallAPO, 
  onAddToSelected, 
  isAlreadySelected 
}: OccupationAnalysisProps) => {
  
  const getAPOColor = (apo: number) => {
    if (apo >= 70) return 'text-red-600 bg-red-50 border-red-200';
    if (apo >= 50) return 'text-orange-600 bg-orange-50 border-orange-200';
    if (apo >= 30) return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    return 'text-green-600 bg-green-50 border-green-200';
  };

  const getAPOIcon = (apo: number) => {
    if (apo >= 50) return <TrendingUp className="h-4 w-4" />;
    return <TrendingDown className="h-4 w-4" />;
  };

  const getRiskLevel = (apo: number) => {
    if (apo >= 70) return { level: 'High Automation Risk', icon: AlertTriangle, color: 'text-red-600' };
    if (apo >= 50) return { level: 'Medium-High Risk', icon: Target, color: 'text-orange-600' };
    if (apo >= 30) return { level: 'Medium Risk', icon: Target, color: 'text-yellow-600' };
    return { level: 'Low Automation Risk', icon: Target, color: 'text-green-600' };
  };

  const getTimelineColor = (timeline: string) => {
    if (timeline?.includes('2024-2026')) return 'bg-red-100 text-red-800';
    if (timeline?.includes('2027-2030')) return 'bg-orange-100 text-orange-800';
    if (timeline?.includes('2031-2035')) return 'bg-yellow-100 text-yellow-800';
    return 'bg-blue-100 text-blue-800';
  };

  const categories = [
    { 
      name: 'Tasks', 
      data: occupation.tasks, 
      apo: occupation.categoryBreakdown?.tasks?.apo || 0,
      confidence: occupation.categoryBreakdown?.tasks?.confidence || 'medium'
    },
    { 
      name: 'Knowledge', 
      data: occupation.knowledge, 
      apo: occupation.categoryBreakdown?.knowledge?.apo || 0,
      confidence: occupation.categoryBreakdown?.knowledge?.confidence || 'medium'
    },
    { 
      name: 'Skills', 
      data: occupation.skills, 
      apo: occupation.categoryBreakdown?.skills?.apo || 0,
      confidence: occupation.categoryBreakdown?.skills?.confidence || 'medium'
    },
    { 
      name: 'Abilities', 
      data: occupation.abilities, 
      apo: occupation.categoryBreakdown?.abilities?.apo || 0,
      confidence: occupation.categoryBreakdown?.abilities?.confidence || 'medium'
    },
    { 
      name: 'Technologies', 
      data: occupation.technologies, 
      apo: occupation.categoryBreakdown?.technologies?.apo || 0,
      confidence: occupation.categoryBreakdown?.technologies?.confidence || 'medium'
    },
  ];

  const riskAssessment = getRiskLevel(occupation.overallAPO || overallAPO);
  const RiskIcon = riskAssessment.icon;

  return (
    <Card className="p-6">
      {/* Enhanced Header */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-2">
            <h2 className="text-2xl font-bold text-gray-900">{occupation.title}</h2>
            <Badge variant="outline" className="text-xs">
              {occupation.code}
            </Badge>
            {occupation.metadata?.analysis_version && (
              <Badge className="text-xs bg-blue-100 text-blue-800">
                v{occupation.metadata.analysis_version}
              </Badge>
            )}
          </div>
          <p className="text-gray-600 mb-4">{occupation.description}</p>
          
          {/* Timeline and Confidence Indicators */}
          <div className="flex items-center space-x-4 mb-4">
            {occupation.timeline && (
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-gray-500" />
                <Badge className={getTimelineColor(occupation.timeline)}>
                  {occupation.timeline}
                </Badge>
              </div>
            )}
            {occupation.confidence && (
              <Badge className={
                occupation.confidence === 'high' ? 'bg-green-100 text-green-800' :
                occupation.confidence === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }>
                {occupation.confidence} confidence
              </Badge>
            )}
          </div>
        </div>
        
        <Button
          onClick={onAddToSelected}
          disabled={isAlreadySelected}
          className="ml-4"
        >
          <Plus className="h-4 w-4 mr-2" />
          {isAlreadySelected ? 'Added' : 'Add to List'}
        </Button>
      </div>

      {/* Enhanced Overall APO Score */}
      <div className={`p-6 rounded-lg border-2 mb-6 ${getAPOColor(occupation.overallAPO || overallAPO)}`}>
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-2 mb-1">
              <RiskIcon className="h-5 w-5" />
              <h3 className="text-lg font-semibold">{riskAssessment.level}</h3>
            </div>
            <p className="text-sm opacity-75">Enhanced AI analysis with weighted scoring</p>
          </div>
          <div className="text-right">
            <div className="flex items-center space-x-2">
              {getAPOIcon(occupation.overallAPO || overallAPO)}
              <span className="text-3xl font-bold">{(occupation.overallAPO || overallAPO).toFixed(1)}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced APO Visualization */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <BarChart3 className="h-5 w-5 mr-2" />
          Enhanced Analysis Breakdown
        </h3>
        <EnhancedAPOVisualization 
          categories={categories} 
          overallAPO={occupation.overallAPO || overallAPO}
          insights={occupation.insights || {
            primary_opportunities: [],
            main_challenges: [],
            automation_drivers: [],
            barriers: []
          }}
        />
      </div>

      {/* Enhanced Category Details */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Detailed Component Analysis</h3>
        <Accordion type="single" collapsible className="space-y-2">
          {categories.map((category) => (
            <AccordionItem key={category.name} value={category.name}>
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center justify-between w-full mr-4">
                  <span className="font-medium">{category.name}</span>
                  <div className="flex items-center space-x-3">
                    <Badge className={
                      category.confidence === 'high' ? 'bg-green-100 text-green-800' :
                      category.confidence === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }>
                      {category.confidence}
                    </Badge>
                    <Progress value={category.apo} className="w-24" />
                    <span className={`text-sm font-semibold px-2 py-1 rounded ${getAPOColor(category.apo)}`}>
                      {category.apo.toFixed(1)}%
                    </span>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-3 pt-2">
                  {category.data.map((item, index) => (
                    <div key={index} className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm text-gray-700 font-medium flex-1">{item.description}</p>
                        <div className="flex items-center space-x-3 ml-4">
                          <Progress value={item.apo} className="w-16" />
                          <span className="text-sm font-medium text-gray-900 w-12 text-right">
                            {item.apo.toFixed(1)}%
                          </span>
                        </div>
                      </div>
                      
                      {/* Enhanced Item Details */}
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex flex-wrap gap-1">
                          {item.factors?.map((factor, factorIndex) => (
                            <Badge key={factorIndex} variant="outline" className="text-xs">
                              {factor}
                            </Badge>
                          ))}
                        </div>
                        {item.timeline && (
                          <Badge className={getTimelineColor(item.timeline)}>
                            {item.timeline}
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      {/* Analysis Metadata */}
      {occupation.metadata && (
        <div className="mt-6 pt-4 border-t border-gray-200">
          <div className="text-xs text-gray-500 flex items-center justify-between">
            <span>Analysis Method: {occupation.metadata.calculation_method}</span>
            <span>Generated: {new Date(occupation.metadata.timestamp).toLocaleString()}</span>
          </div>
        </div>
      )}
    </Card>
  );
};
