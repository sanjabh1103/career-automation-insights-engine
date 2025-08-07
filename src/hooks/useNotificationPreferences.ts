import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";

export type NotificationPreferences = {
  id: string;
  user_id: string;
  email_notifications: boolean;
  push_notifications: boolean;
  analysis_complete: boolean;
  weekly_summary: boolean;
  share_notifications: boolean;
  system_updates: boolean;
  created_at: string;
  updated_at: string;
};

export function useNotificationPreferences() {
  const [user, setUser] = useState<User | null>(null);
  
  // Mock preferences since the table doesn't exist
  const [preferences] = useState<NotificationPreferences>({
    id: 'mock-id',
    user_id: 'mock-user',
    email_notifications: true,
    push_notifications: true,
    analysis_complete: true,
    weekly_summary: false,
    share_notifications: true,
    system_updates: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  });

  useEffect(() => {
    const checkUserSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
    };
    checkUserSession();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const updatePreferences = (updates: Partial<NotificationPreferences>) => {
    console.log('Mock update preferences:', updates);
    // In a real implementation, this would update the database
  };

  return {
    preferences,
    isLoading: false,
    updatePreferences,
    isUpdating: false,
    user,
  };
}