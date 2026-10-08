import { useEffect, useState } from "react";

// Comme useState, mais la valeur survit au rechargement
export function useLocalStorage<T>(key: string, initialValue: T) {
  // 1. Lecture : une seule fois, au premier rendu
  const [value, setValue] = useState<T>(() => {
    const saved = localStorage.getItem(key);
    if (saved === null) return initialValue;
    try {
      return JSON.parse(saved) as T;
    } catch {
      return initialValue; // contenu illisible
    }
  });

  // 2. Écriture : après chaque changement de la valeur
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as const;
}