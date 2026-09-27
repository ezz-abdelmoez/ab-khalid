"use client";

import { createContext, useContext } from "react";

export interface LegendModeContextType {
  isLegendMode: boolean;
  toggleLegendMode: () => void;
  enableLegendMode: () => void;
  disableLegendMode: () => void;
}

export const LegendModeContext = createContext<LegendModeContextType | undefined>(undefined);

export function useLegendMode(): LegendModeContextType {
  const context = useContext(LegendModeContext);
  if (!context) {
    // Return safe defaults when used outside provider (e.g., during SSR or in components that may render without provider)
    return {
      isLegendMode: false,
      toggleLegendMode: () => {},
      enableLegendMode: () => {},
      disableLegendMode: () => {},
    };
  }
  return context;
}

export function useLegendModeStrict(): LegendModeContextType {
  const context = useContext(LegendModeContext);
  if (!context) {
    throw new Error("useLegendMode must be used within LegendModeProvider");
  }
  return context;
}
