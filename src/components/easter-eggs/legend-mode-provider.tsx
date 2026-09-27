"use client";

import { useState, useEffect, type ReactNode } from "react";
import { LegendModeContext } from "@/hooks/use-legend-mode";
import { toast } from "sonner";

export function LegendModeProvider({ children }: { children: ReactNode }) {
  const [isLegendMode, setIsLegendMode] = useState(false);

  const toggleLegendMode = () => {
    setIsLegendMode((prev) => {
      const newMode = !prev;
      if (newMode) {
        toast("تم تفعيل وضع الأسطورة 👑", {
          description: "برجاء ربط حزام الأمان. مستوى العظمة في ارتفاع.",
          icon: "👑",
          duration: 3000,
        });
        setTimeout(() => {
          toast("تحذير: مستوى الثقة وصل إلى 99.9%", {
            description: "النظام يحاول قياس العظمة... وفشل.",
            icon: "⚡",
          });
        }, 1500);
      } else {
        toast("تم إيقاف وضع الأسطورة", {
          description: "العودة إلى الوضع العادي... نسبياً.",
        });
      }
      return newMode;
    });
  };

  const enableLegendMode = () => {
    if (!isLegendMode) toggleLegendMode();
  };

  const disableLegendMode = () => {
    if (isLegendMode) setIsLegendMode(false);
  };

  useEffect(() => {
    if (isLegendMode) {
      document.documentElement.classList.add("legend-mode");
    } else {
      document.documentElement.classList.remove("legend-mode");
    }
  }, [isLegendMode]);

  return (
    <LegendModeContext.Provider
      value={{
        isLegendMode,
        toggleLegendMode,
        enableLegendMode,
        disableLegendMode,
      }}
    >
      <div className={isLegendMode ? "legend-mode-active" : ""}>{children}</div>
    </LegendModeContext.Provider>
  );
}
