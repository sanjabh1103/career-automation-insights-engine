import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";

export type FeedbackType = "bug_report" | "feature_request" | "general" | "support";
export type FeedbackPriority = "low" | "medium" | "high" | "urgent";
export type FeedbackStatus = "open" | "in_progress" | "resolved" | "closed";

export type UserFeedback = {
  id: string;
  user_id: string;
  feedback_type: FeedbackType;
  title: string;
  description: string;
  priority: FeedbackPriority;
  status: FeedbackStatus;
  category?: string;
  created_at: string;
  updated_at: string;
};

export function useUserFeedback() {
  const [user, setUser] = useState<User | null>(null);
  const [feedback] = useState<UserFeedback[]>([]);

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

  const submitFeedback = (feedbackData: any) => {
    console.log('Mock submit feedback:', feedbackData);
  };

  return {
    feedback,
    isLoading: false,
    submitFeedback,
    isSubmitting: false,
    user,
  };
}