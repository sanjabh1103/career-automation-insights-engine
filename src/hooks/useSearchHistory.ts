
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { User } from "@supabase/supabase-js";

export interface SearchHistoryItem {
  id: string;
  search_term: string;
  results_count: number;
  searched_at: string;
}

export function useSearchHistory() {
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
      queryClient.invalidateQueries({ queryKey: ['search_history'] });
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [queryClient]);

  const queryKey = ['search_history', user?.id];

  const { data: searchHistory = [], isLoading } = useQuery<SearchHistoryItem[]>({
    queryKey,
    queryFn: async () => {
      if (!user) return [];

      const { data, error } = await supabase
        .from('search_history')
        .select('*')
        .eq('user_id', user.id)
        .order('searched_at', { ascending: false })
        .limit(50);

      if (error) {
        console.error('Error fetching search history:', error);
        throw error;
      }
      
      return data || [];
    },
    enabled: !!user,
  });

  const addSearchMutation = useMutation({
    mutationFn: async ({ 
      search_term, 
      results_count 
    }: {
      search_term: string;
      results_count: number;
    }) => {
      if (!user) return;

      const { error } = await supabase
        .from('search_history')
        .insert({
          user_id: user.id,
          search_term,
          results_count
        });
      
      if (error) {
        console.error('Error saving search history:', error);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });

  const clearHistoryMutation = useMutation({
    mutationFn: async () => {
      if (!user) throw new Error('User not authenticated');

      const { error } = await supabase
        .from('search_history')
        .delete()
        .eq('user_id', user.id);

      if (error) {
        console.error('Error clearing search history:', error);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
    }
  });

  return {
    searchHistory,
    isLoading,
    addSearch: (data: any) => addSearchMutation.mutate(data),
    clearHistory: () => clearHistoryMutation.mutate(),
    isClearing: clearHistoryMutation.isPending,
  };
}
