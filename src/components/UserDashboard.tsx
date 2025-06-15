import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserProfilePanel } from "./UserProfilePanel";
import { UserSettingsPanel } from "./UserSettingsPanel";
import { SavedAnalysesPanel } from "./SavedAnalysesPanel";
import { SearchHistoryPanel } from "./SearchHistoryPanel";
import { SystemAdminPanel } from "./SystemAdminPanel";
import { User, Settings, BookOpen, History, Activity, Lightbulb } from "lucide-react";
import { useState } from "react";

interface UserDashboardProps {
  onLoadAnalysis?: (analysis: any) => void;
  onSearchSelect?: (searchTerm: string) => void;
}

function OnboardingHelpOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative">
        <button className="absolute top-3 right-3" onClick={onClose} aria-label="Close Overlay">&times;</button>
        <h2 className="text-lg font-bold mb-3 flex items-center gap-2"><Lightbulb className="w-5 h-5" /> Welcome!</h2>
        <ul className="list-disc pl-5 space-y-2 text-sm">
          <li>Search careers via the main bar. Click on a result to analyze automation potential.</li>
          <li>Save analyses for later, add tags/notes, and download as CSV or PDF.</li>
          <li>See your usage/capacity on the dashboard (API credits, limits).</li>
          <li>Need support? Click your profile/settings or visit the <span className="underline">Support</span> tab.</li>
        </ul>
        <p className="text-xs text-gray-500 mt-4">If you need further help or find a bug, contact support before deployment.</p>
      </div>
    </div>
  );
}

export function UserDashboard({ onLoadAnalysis, onSearchSelect }: UserDashboardProps) {
  const [showHelp, setShowHelp] = useState(false);

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <OnboardingHelpOverlay open={showHelp} onClose={() => setShowHelp(false)} />
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">User Dashboard</h1>
          <p className="text-gray-600">Manage your profile, settings, and saved data</p>
        </div>
        <button
          className="inline-flex gap-1 items-center text-blue-600 bg-blue-50 hover:bg-blue-100 px-3 py-1 rounded-md text-sm"
          onClick={() => setShowHelp(true)}
        >
          <Lightbulb className="w-4 h-4" />
          Help
        </button>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User className="w-4 h-4" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="analyses" className="flex items-center gap-2">
            <BookOpen className="w-4 h-4" />
            Saved Analyses
          </TabsTrigger>
          <TabsTrigger value="history" className="flex items-center gap-2">
            <History className="w-4 h-4" />
            Search History
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center gap-2">
            <Settings className="w-4 h-4" />
            Settings
          </TabsTrigger>
          <TabsTrigger value="system" className="flex items-center gap-2">
            <Activity className="w-4 h-4" />
            System
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="mt-6">
          <UserProfilePanel />
        </TabsContent>

        <TabsContent value="analyses" className="mt-6">
          <SavedAnalysesPanel onLoadAnalysis={onLoadAnalysis} />
        </TabsContent>

        <TabsContent value="history" className="mt-6">
          <SearchHistoryPanel onSearchSelect={onSearchSelect} />
        </TabsContent>

        <TabsContent value="settings" className="mt-6">
          <UserSettingsPanel />
        </TabsContent>

        <TabsContent value="system" className="mt-6">
          <SystemAdminPanel />
        </TabsContent>
      </Tabs>
    </div>
  );
}
