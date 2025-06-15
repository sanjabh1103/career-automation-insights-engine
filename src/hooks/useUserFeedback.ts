
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
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
  browser_info?: object;
  url_context?: string;
  attachments?: string[] | null;
  created_at: string;
  updated_at: string;
  resolved_at?: string;
  admin_response?: string;
};

export function useUserFeedback() {
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
      queryClient.invalidateQueries({ queryKey: ['user_feedback'] });
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [queryClient]);

  const queryKey = ['user_feedback', user?.id];

  // Query to fetch all feedback submitted by the user
  const { data: feedback = [], isLoading } = useQuery<UserFeedback[]>({
    queryKey,
    queryFn: async () => {
      if (!user) return [];
      const { data, error } = await supabase
        .from('user_feedback')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      if (error) {
        console.error('Error loading feedback:', error);
        return [];
      }
      return data || [];
    },
    enabled: !!user,
  });

  // Mutation to submit new feedback
  const submitFeedbackMutation = useMutation({
    mutationFn: async (feedback: Omit<UserFeedback, 'id' | 'user_id' | 'created_at' | 'updated_at' | 'resolved_at' | 'admin_response'>) => {
      if (!user) throw new Error('User not authenticated');
      const { data, error } = await supabase
        .from('user_feedback')
        .insert({ ...feedback, user_id: user.id })
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });

  return {
    feedback,
    isLoading,
    submitFeedback: submitFeedbackMutation.mutate,
    isSubmitting: submitFeedbackMutation.isPending,
    user,
  };
}

