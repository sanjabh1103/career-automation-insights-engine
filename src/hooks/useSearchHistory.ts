import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";

export interface SearchHistoryItem {
  id: string;
  search_term: string;
  results_count: number;
  searched_at: string;
}

const STORAGE_KEY = "apo_search_history_v1";

// Helper for localStorage
function getLocalSearchHistory(): SearchHistoryItem[] {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw) {
    try {
      return JSON.parse(raw);
    } catch {
      return [];
    }
  }
  return [];
}

function setLocalSearchHistory(history: SearchHistoryItem[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
}

export function useSearchHistory() {
  const [user, setUser] = useState<User | null>(null);
  const [searchHistory, setSearchHistory] = useState<SearchHistoryItem[]>([]);

  useEffect(() => {
    const checkUserSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
    };
    checkUserSession();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    // Load from localStorage
    setSearchHistory(getLocalSearchHistory());

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const addSearch = ({ search_term, results_count }: { search_term: string; results_count: number }) => {
    const newItem: SearchHistoryItem = {
      id: `local_${Date.now().toString(36)}`,
      search_term,
      results_count,
      searched_at: new Date().toISOString(),
    };
    
    const updated = [newItem, ...searchHistory].slice(0, 50); // Keep only last 50
    setSearchHistory(updated);
    setLocalSearchHistory(updated);
  };

  const clearHistory = () => {
    setSearchHistory([]);
    setLocalSearchHistory([]);
  };

  return {
    searchHistory,
    isLoading: false,
    addSearch,
    clearHistory,
    isClearing: false,
  };
}