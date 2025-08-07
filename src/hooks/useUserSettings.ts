
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { User } from "@supabase/supabase-js";

export interface UserSettings {
  theme: 'light' | 'dark';
  emailNotifications: boolean;
  autoSaveAnalyses: boolean;
  defaultExportFormat: 'csv' | 'pdf' | 'json';
}

const DEFAULT_SETTINGS: UserSettings = {
  theme: 'light',
  emailNotifications: true,
  autoSaveAnalyses: true,
  defaultExportFormat: 'csv'
};

export function useUserSettings() {
  const [user, setUser] = useState<User | null>(null);
  const queryClient = useQueryClient();

  useEffect(() => {
    const checkUserSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
    };
    checkUserSession();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      queryClient.invalidateQueries({ queryKey: ['user_settings'] });
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [queryClient]);

  const queryKey = ['user_settings', user?.id];

  const { data: settings = DEFAULT_SETTINGS, isLoading } = useQuery<UserSettings>({
    queryKey,
    queryFn: async () => {
      if (!user) return DEFAULT_SETTINGS;

      // Since user_settings table doesn't exist, use localStorage for now
      const storageKey = `user_settings_${user.id}`;
      const stored = localStorage.getItem(storageKey);
      
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          return { ...DEFAULT_SETTINGS, ...parsed };
        } catch (error) {
          console.error('Error parsing stored settings:', error);
          return DEFAULT_SETTINGS;
        }
      }

      return DEFAULT_SETTINGS;
    },
    enabled: !!user,
  });

  const updateSettingsMutation = useMutation({
    mutationFn: async (newSettings: Partial<UserSettings>) => {
      if (!user) throw new Error('User not authenticated');

      const updatedSettings = { ...settings, ...newSettings };
      
      // Store in localStorage since table doesn't exist
      const storageKey = `user_settings_${user.id}`;
      localStorage.setItem(storageKey, JSON.stringify(updatedSettings));
      
      return updatedSettings;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });

  return {
    settings,
    isLoading,
    updateSettings: (newSettings: Partial<UserSettings>) => updateSettingsMutation.mutate(newSettings),
    isUpdating: updateSettingsMutation.isPending,
  };
}
