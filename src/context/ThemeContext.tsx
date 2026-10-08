import { createContext, useContext, useEffect, type ReactNode } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

type Theme = "light" | "dark";
type ThemeContextValue = { theme: Theme; toggleTheme: () => void };

// 1. Créer le contexte (null = « pas de fournisseur au-dessus »)
const ThemeContext = createContext<ThemeContextValue | null>(null);

// 2. Le fournisseur : possède l'état et le partage
export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useLocalStorage<Theme>("taskflow-theme", "light");

  function toggleTheme() {
    setTheme((current) => (current === "light" ? "dark" : "light"));
  }

  // Appliquer le thème à toute la page (data-theme sur <html>)
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// 3. Un hook pour lire le contexte depuis n'importe où
export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === null) {
    throw new Error("useTheme doit être utilisé à l'intérieur de <ThemeProvider>");
  }
  return context;
}