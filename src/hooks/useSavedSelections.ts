
import { useState, useEffect } from "react";

export interface SavedSelection<T> {
  id: string;
  name: string;
  data: T;
  createdAt: number;
}

const STORAGE_KEY = "apo_saved_selections_v1";

function generateId() {
  // Simple unique id based on millis.
  return "s_" + Date.now().toString(36) + Math.random().toString(36).slice(2, 9);
}

export function useSavedSelections<T = unknown>() {
  const [saved, setSaved] = useState<SavedSelection<T>[]>([]);

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        setSaved(JSON.parse(raw));
      } catch {
        setSaved([]);
      }
    }
  }, []);

  const saveList = (name: string, data: T) => {
    // Save a new list
    const newEntry: SavedSelection<T> = {
      id: generateId(),
      name: name || "Untitled",
      data,
      createdAt: Date.now(),
    };
    const all = [newEntry, ...saved];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
    setSaved(all);
    return newEntry;
  };

  const updateName = (id: string, newName: string) => {
    const all = saved.map((entry) =>
      entry.id === id ? { ...entry, name: newName } : entry
    );
    localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
    setSaved(all);
  };

  const removeList = (id: string) => {
    const all = saved.filter((entry) => entry.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
    setSaved(all);
  };

  const loadList = (id: string): SavedSelection<T> | undefined =>
    saved.find((entry) => entry.id === id);

  return {
    saved,
    saveList,
    updateName,
    loadList,
    removeList,
  };
}
