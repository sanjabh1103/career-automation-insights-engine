
import React, { useState } from 'react';
import { SearchInterface } from './SearchInterface';
import { OccupationAnalysis } from './OccupationAnalysis';
import { TopCareersPanel } from './TopCareersPanel';
import { StatsOverview } from './StatsOverview';
import { OccupationComparisonPanel } from './OccupationComparisonPanel';
import { Card } from '@/components/ui/card';
import { SavedSelectionsPanel } from "./SavedSelectionsPanel";
import { useSavedSelections } from "@/hooks/useSavedSelections";
import { JobMarketPanel } from './JobMarketPanel';
import { APODashboardHeader } from "./APODashboardHeader";
import { ExportCareersModal } from "./ExportCareersModal";
import { SelectedCareersPanel } from "./SelectedCareersPanel";
import { OnboardingTour } from "./OnboardingTour";
import { ErrorBoundary } from "./ErrorBoundary";

export interface SelectedOccupation {
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
  const [showExport, setShowExport] = useState(false);

  const savedSelections = useSavedSelections<SelectedOccupation[]>();

  const handleOccupationSelect = (occupation: any) => {
    console.log('Selected occupation with enhanced APO data:', occupation);
    setSelectedOccupation(occupation);
  };

  const handleAddToSelected = () => {
    if (selectedOccupation && !selectedJobs.find(job => job.code === selectedOccupation.code)) {
      setSelectedJobs([...selectedJobs, selectedOccupation]);
    }
  };

  const handleRemoveSelected = (code: string) => {
    setSelectedJobs(selectedJobs.filter(job => job.code !== code));
  };

  const handleLoadSelection = (newSelection: SelectedOccupation[]) => {
    setSelectedJobs(newSelection ?? []);
    if (!newSelection.find(occ => occ.code === selectedOccupation?.code)) {
      setSelectedOccupation(null);
    }
  };

  const calculateOverallAPO = (occupation: any) => {
    if (occupation.overallAPO !== undefined) {
      return occupation.overallAPO;
    }
    const taskAPO = occupation.tasks?.reduce((sum: number, task: any) => sum + task.apo, 0) / (occupation.tasks?.length || 1);
    const knowledgeAPO = occupation.knowledge?.reduce((sum: number, item: any) => sum + item.apo, 0) / (occupation.knowledge?.length || 1);
    const skillsAPO = occupation.skills?.reduce((sum: number, skill: any) => sum + skill.apo, 0) / (occupation.skills?.length || 1);
    const abilitiesAPO = occupation.abilities?.reduce((sum: number, ability: any) => sum + ability.apo, 0) / (occupation.abilities?.length || 1);
    const techAPO = occupation.technologies?.reduce((sum: number, tech: any) => sum + tech.apo, 0) / (occupation.technologies?.length || 1);
    return (taskAPO + knowledgeAPO + skillsAPO + abilitiesAPO + techAPO) / 5;
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <OnboardingTour />
        </div>
        
        <APODashboardHeader
          selectedJobsCount={selectedJobs.length}
          onExport={() => setShowExport(true)}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <ErrorBoundary>
            <StatsOverview selectedJobsCount={selectedJobs.length} />
          </ErrorBoundary>

          <ErrorBoundary>
            <SavedSelectionsPanel
              selections={selectedJobs}
              onLoad={handleLoadSelection}
            />
          </ErrorBoundary>

          {selectedJobs.length > 1 && (
            <ErrorBoundary>
              <OccupationComparisonPanel
                occupations={selectedJobs}
                onRemove={handleRemoveSelected}
              />
            </ErrorBoundary>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
            <div className="lg:col-span-2 space-y-6">
              <Card className="p-6">
                <ErrorBoundary>
                  <SearchInterface onOccupationSelect={handleOccupationSelect} />
                </ErrorBoundary>
              </Card>

              {selectedOccupation && (
                <ErrorBoundary>
                  <OccupationAnalysis
                    occupation={selectedOccupation}
                    overallAPO={calculateOverallAPO(selectedOccupation)}
                    onAddToSelected={handleAddToSelected}
                    isAlreadySelected={selectedJobs.some(job => job.code === selectedOccupation.code)}
                  />
                </ErrorBoundary>
              )}
            </div>

            <div className="space-y-6">
              <ErrorBoundary>
                <TopCareersPanel />
              </ErrorBoundary>

              {selectedOccupation && (
                <ErrorBoundary>
                  <JobMarketPanel jobTitle={selectedOccupation.title} />
                </ErrorBoundary>
              )}

              {selectedJobs.length > 0 && (
                <ErrorBoundary>
                  <SelectedCareersPanel
                    selectedJobs={selectedJobs}
                    calculateOverallAPO={calculateOverallAPO}
                    handleRemoveSelected={handleRemoveSelected}
                  />
                </ErrorBoundary>
              )}
            </div>
          </div>
        </div>
        
        <ExportCareersModal
          open={showExport}
          onClose={() => setShowExport(false)}
          selectedJobs={selectedJobs}
        />
      </div>
    </ErrorBoundary>
  );
};
