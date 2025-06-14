
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Progress } from '@/components/ui/progress';
import { Plus, BarChart3, TrendingUp, TrendingDown } from 'lucide-react';
import { APOVisualization } from './APOVisualization';

interface OccupationAnalysisProps {
  occupation: {
    code: string;
    title: string;
    description: string;
    tasks: Array<{ description: string; apo: number }>;
    knowledge: Array<{ description: string; apo: number }>;
    skills: Array<{ description: string; apo: number }>;
    abilities: Array<{ description: string; apo: number }>;
    technologies: Array<{ description: string; apo: number }>;
  };
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
    if (apo >= 50) return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    return 'text-green-600 bg-green-50 border-green-200';
  };

  const getAPOIcon = (apo: number) => {
    if (apo >= 50) return <TrendingUp className="h-4 w-4" />;
    return <TrendingDown className="h-4 w-4" />;
  };

  const calculateCategoryAPO = (items: Array<{ apo: number }>) => {
    return items.reduce((sum, item) => sum + item.apo, 0) / items.length;
  };

  const categories = [
    { name: 'Tasks', data: occupation.tasks, apo: calculateCategoryAPO(occupation.tasks) },
    { name: 'Knowledge', data: occupation.knowledge, apo: calculateCategoryAPO(occupation.knowledge) },
    { name: 'Skills', data: occupation.skills, apo: calculateCategoryAPO(occupation.skills) },
    { name: 'Abilities', data: occupation.abilities, apo: calculateCategoryAPO(occupation.abilities) },
    { name: 'Technologies', data: occupation.technologies, apo: calculateCategoryAPO(occupation.technologies) },
  ];

  return (
    <Card className="p-6">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-2">
            <h2 className="text-2xl font-bold text-gray-900">{occupation.title}</h2>
            <Badge variant="outline" className="text-xs">
              {occupation.code}
            </Badge>
          </div>
          <p className="text-gray-600 mb-4">{occupation.description}</p>
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

      {/* Overall APO Score */}
      <div className={`p-6 rounded-lg border-2 mb-6 ${getAPOColor(overallAPO)}`}>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold mb-1">Overall Automation Potential</h3>
            <p className="text-sm opacity-75">Based on analysis of all job components</p>
          </div>
          <div className="text-right">
            <div className="flex items-center space-x-2">
              {getAPOIcon(overallAPO)}
              <span className="text-3xl font-bold">{overallAPO.toFixed(1)}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* APO Visualization */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <BarChart3 className="h-5 w-5 mr-2" />
          Category Breakdown
        </h3>
        <APOVisualization categories={categories} />
      </div>

      {/* Category Details */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Detailed Analysis</h3>
        <Accordion type="single" collapsible className="space-y-2">
          {categories.map((category) => (
            <AccordionItem key={category.name} value={category.name}>
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center justify-between w-full mr-4">
                  <span className="font-medium">{category.name}</span>
                  <div className="flex items-center space-x-3">
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
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-700 flex-1">{item.description}</p>
                      <div className="flex items-center space-x-3 ml-4">
                        <Progress value={item.apo} className="w-16" />
                        <span className="text-sm font-medium text-gray-900 w-12 text-right">
                          {item.apo.toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </Card>
  );
};
