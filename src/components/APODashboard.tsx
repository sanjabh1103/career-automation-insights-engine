
import React, { useState } from 'react';
import { SearchInterface } from './SearchInterface';
import { OccupationAnalysis } from './OccupationAnalysis';
import { TopCareersPanel } from './TopCareersPanel';
import { StatsOverview } from './StatsOverview';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Upload, BarChart3 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface SelectedOccupation {
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

export const APODashboard = () => {
  const [selectedOccupation, setSelectedOccupation] = useState<SelectedOccupation | null>(null);
  const [selectedJobs, setSelectedJobs] = useState<SelectedOccupation[]>([]);

  const handleOccupationSelect = (occupation: any) => {
    console.log('Selected occupation with enhanced APO data:', occupation);
    setSelectedOccupation(occupation);
  };

  const handleAddToSelected = () => {
    if (selectedOccupation && !selectedJobs.find(job => job.code === selectedOccupation.code)) {
      setSelectedJobs([...selectedJobs, selectedOccupation]);
    }
  };

  const calculateOverallAPO = (occupation: any) => {
    // Use the enhanced overall APO if available, otherwise fall back to calculation
    if (occupation.overallAPO !== undefined) {
      return occupation.overallAPO;
    }
    
    // Fallback calculation for backwards compatibility
    const taskAPO = occupation.tasks?.reduce((sum: number, task: any) => sum + task.apo, 0) / (occupation.tasks?.length || 1);
    const knowledgeAPO = occupation.knowledge?.reduce((sum: number, item: any) => sum + item.apo, 0) / (occupation.knowledge?.length || 1);
    const skillsAPO = occupation.skills?.reduce((sum: number, skill: any) => sum + skill.apo, 0) / (occupation.skills?.length || 1);
    const abilitiesAPO = occupation.abilities?.reduce((sum: number, ability: any) => sum + ability.apo, 0) / (occupation.abilities?.length || 1);
    const techAPO = occupation.technologies?.reduce((sum: number, tech: any) => sum + tech.apo, 0) / (occupation.technologies?.length || 1);
    
    return (taskAPO + knowledgeAPO + skillsAPO + abilitiesAPO + techAPO) / 5;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 rounded-lg p-2">
                <BarChart3 className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">Career APO Explorer</h1>
              <div className="ml-4 px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                Enhanced AI v2.0
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Upload className="h-4 w-4 mr-2" />
                Upload Data
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export ({selectedJobs.length})
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Enhanced Stats Overview */}
        <StatsOverview selectedJobsCount={selectedJobs.length} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Search Interface */}
            <Card className="p-6">
              <SearchInterface onOccupationSelect={handleOccupationSelect} />
            </Card>

            {/* Enhanced Occupation Analysis */}
            {selectedOccupation && (
              <OccupationAnalysis 
                occupation={selectedOccupation}
                overallAPO={calculateOverallAPO(selectedOccupation)}
                onAddToSelected={handleAddToSelected}
                isAlreadySelected={selectedJobs.some(job => job.code === selectedOccupation.code)}
              />
            )}
          </div>

          {/* Enhanced Sidebar */}
          <div className="space-y-6">
            <TopCareersPanel />
            
            {/* Enhanced Selected Jobs Summary */}
            {selectedJobs.length > 0 && (
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Selected Careers ({selectedJobs.length})
                </h3>
                <div className="space-y-3">
                  {selectedJobs.map((job) => {
                    const overallAPO = calculateOverallAPO(job);
                    const riskLevel = overallAPO >= 70 ? 'High' : overallAPO >= 50 ? 'Med-High' : overallAPO >= 30 ? 'Medium' : 'Low';
                    const riskColor = overallAPO >= 70 ? 'text-red-600' : overallAPO >= 50 ? 'text-orange-600' : overallAPO >= 30 ? 'text-yellow-600' : 'text-green-600';
                    
                    return (
                      <div key={job.code} className="p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex-1">
                            <p className="font-medium text-sm text-gray-900">{job.title}</p>
                            <p className="text-xs text-gray-500">{job.code}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-semibold text-blue-600">
                              {overallAPO.toFixed(1)}%
                            </p>
                            <p className={`text-xs font-medium ${riskColor}`}>
                              {riskLevel} Risk
                            </p>
                          </div>
                        </div>
                        {job.timeline && (
                          <Badge className="text-xs bg-blue-50 text-blue-700">
                            {job.timeline}
                          </Badge>
                        )}
                      </div>
                    );
                  })}
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
