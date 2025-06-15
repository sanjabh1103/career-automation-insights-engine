
import React from "react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Settings, Palette, Bell, Download, Save } from "lucide-react";
import { useUserSettings, UserSettings } from "@/hooks/useUserSettings";
import { toast } from "sonner";

export function UserSettingsPanel() {
  const { settings, updateSettings, isLoading } = useUserSettings();

  const handleSettingChange = async (key: keyof UserSettings, value: any) => {
    try {
      await updateSettings({ [key]: value });
      toast.success("Settings updated successfully!");
    } catch (error) {
      toast.error("Failed to update settings");
    }
  };

  if (isLoading) {
    return (
      <Card className="p-6">
        <div className="flex items-center gap-3">
          <Settings className="w-5 h-5 text-gray-500" />
          <span className="text-gray-500">Loading settings...</span>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-6">
        <Settings className="w-5 h-5 text-blue-500" />
        <h3 className="text-lg font-semibold">Settings</h3>
      </div>

      <div className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-3">
            <Palette className="w-4 h-4 text-gray-500" />
            <h4 className="font-medium">Appearance</h4>
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="theme">Theme</Label>
            <Select 
              value={settings.theme} 
              onValueChange={(value: 'light' | 'dark') => handleSettingChange('theme', value)}
            >
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-3">
            <Bell className="w-4 h-4 text-gray-500" />
            <h4 className="font-medium">Notifications</h4>
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="emailNotifications">Email notifications</Label>
            <Switch
              id="emailNotifications"
              checked={settings.emailNotifications}
              onCheckedChange={(checked) => handleSettingChange('emailNotifications', checked)}
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-3">
            <Save className="w-4 h-4 text-gray-500" />
            <h4 className="font-medium">Data Management</h4>
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="autoSave">Auto-save analyses</Label>
            <Switch
              id="autoSave"
              checked={settings.autoSaveAnalyses}
              onCheckedChange={(checked) => handleSettingChange('autoSaveAnalyses', checked)}
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-3">
            <Download className="w-4 h-4 text-gray-500" />
            <h4 className="font-medium">Export</h4>
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="defaultExport">Default export format</Label>
            <Select 
              value={settings.defaultExportFormat} 
              onValueChange={(value: 'csv' | 'pdf' | 'json') => handleSettingChange('defaultExportFormat', value)}
            >
              <SelectTrigger className="w-20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="csv">CSV</SelectItem>
                <SelectItem value="pdf">PDF</SelectItem>
                <SelectItem value="json">JSON</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </Card>
  );
}
