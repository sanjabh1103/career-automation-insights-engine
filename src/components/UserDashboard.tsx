
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserProfilePanel } from "./UserProfilePanel";
import { UserSettingsPanel } from "./UserSettingsPanel";
import { SavedAnalysesPanel } from "./SavedAnalysesPanel";
import { SearchHistoryPanel } from "./SearchHistoryPanel";
import { User, Settings, BookOpen, History } from "lucide-react";

interface UserDashboardProps {
  onLoadAnalysis?: (analysis: any) => void;
  onSearchSelect?: (searchTerm: string) => void;
}

export function UserDashboard({ onLoadAnalysis, onSearchSelect }: UserDashboardProps) {
  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">User Dashboard</h1>
        <p className="text-gray-600">Manage your profile, settings, and saved data</p>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
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
      </Tabs>
    </div>
  );
}
