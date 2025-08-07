import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";

export interface SavedSelection<T> {
  id: string;
  name: string;
  data: T;
  createdAt: number;
}

const STORAGE_KEY = "apo_saved_selections_v1";

// Helpers for localStorage for anonymous users
function getLocalSelections<T>(): SavedSelection<T>[] {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw) {
    try {
      return JSON.parse(raw);
    } catch {
      // ignore parsing errors
    }
  }
  return [];
}

function setLocalSelections<T>(selections: SavedSelection<T>[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(selections));
}

export function useSavedSelections<T = unknown>() {
  const [user, setUser] = useState<User | null>(null);
  const [saved, setSaved] = useState<SavedSelection<T>[]>([]);

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
    setSaved(getLocalSelections<T>());

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const saveList = (name: string, data: T) => {
    const newEntry: SavedSelection<T> = {
      id: `local_${Date.now().toString(36)}`,
      name: name || "Untitled",
      data: data,
      createdAt: Date.now(),
    };
    const updated = [newEntry, ...saved];
    setSaved(updated);
    setLocalSelections(updated);
  };

  const updateName = (id: string, newName: string) => {
    const updated = saved.map(s => s.id === id ? { ...s, name: newName } : s);
    setSaved(updated);
    setLocalSelections(updated);
  };

  const removeList = (id: string) => {
    const updated = saved.filter(s => s.id !== id);
    setSaved(updated);
    setLocalSelections(updated);
  };

  const loadList = (id: string): SavedSelection<T> | undefined => 
    saved.find((entry) => entry.id === id);

  return {
    saved,
    isLoading: false,
    saveList,
    updateName,
    removeList,
    loadList,
  };
}