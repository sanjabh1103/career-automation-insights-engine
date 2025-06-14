
import React, { useState } from 'react';
import { SearchInterface } from './SearchInterface';
import { OccupationAnalysis } from './OccupationAnalysis';
import { TopCareersPanel } from './TopCareersPanel';
import { StatsOverview } from './StatsOverview';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Upload, BarChart3, Briefcase } from 'lucide-react';

interface SelectedOccupation {
  code: string;
  title: string;
  description: string;
  tasks: Array<{ description: string; apo: number }>;
  knowledge: Array<{ description: string; apo: number }>;
  skills: Array<{ description: string; apo: number }>;
  abilities: Array<{ description: string; apo: number }>;
  technologies: Array<{ description: string; apo: number }>;
}

export const APODashboard = () => {
  const [selectedOccupation, setSelectedOccupation] = useState<SelectedOccupation | null>(null);
  const [selectedJobs, setSelectedJobs] = useState<SelectedOccupation[]>([]);

  const handleOccupationSelect = (occupation: SelectedOccupation) => {
    console.log('Selected occupation with APO data:', occupation);
    setSelectedOccupation(occupation);
  };

  const handleAddToSelected = () => {
    if (selectedOccupation && !selectedJobs.find(job => job.code === selectedOccupation.code)) {
      setSelectedJobs([...selectedJobs, selectedOccupation]);
    }
  };

  const calculateOverallAPO = (occupation: SelectedOccupation) => {
    const taskAPO = occupation.tasks.reduce((sum, task) => sum + task.apo, 0) / occupation.tasks.length;
    const knowledgeAPO = occupation.knowledge.reduce((sum, item) => sum + item.apo, 0) / occupation.knowledge.length;
    const skillsAPO = occupation.skills.reduce((sum, skill) => sum + skill.apo, 0) / occupation.skills.length;
    const abilitiesAPO = occupation.abilities.reduce((sum, ability) => sum + ability.apo, 0) / occupation.abilities.length;
    const techAPO = occupation.technologies.reduce((sum, tech) => sum + tech.apo, 0) / occupation.technologies.length;
    
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
                AI-Powered
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
        {/* Stats Overview */}
        <StatsOverview selectedJobsCount={selectedJobs.length} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Search Interface */}
            <Card className="p-6">
              <SearchInterface onOccupationSelect={handleOccupationSelect} />
            </Card>

            {/* Occupation Analysis */}
            {selectedOccupation && (
              <OccupationAnalysis 
                occupation={selectedOccupation}
                overallAPO={calculateOverallAPO(selectedOccupation)}
                onAddToSelected={handleAddToSelected}
                isAlreadySelected={selectedJobs.some(job => job.code === selectedOccupation.code)}
              />
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <TopCareersPanel />
            
            {/* Selected Jobs Summary */}
            {selectedJobs.length > 0 && (
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Selected Careers ({selectedJobs.length})
                </h3>
                <div className="space-y-3">
                  {selectedJobs.map((job) => (
                    <div key={job.code} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-sm text-gray-900">{job.title}</p>
                        <p className="text-xs text-gray-500">{job.code}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold text-blue-600">
                          {calculateOverallAPO(job).toFixed(1)}%
                        </p>
                        <p className="text-xs text-gray-500">APO</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
