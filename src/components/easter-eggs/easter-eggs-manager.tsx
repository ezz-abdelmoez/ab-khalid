"use client";

import { useEffect, useState, useMemo } from "react";
import { toast } from "sonner";
import { useEasterEggs } from "@/hooks/use-api";
import { motion, AnimatePresence } from "framer-motion";
import { Crown, Sparkles } from "lucide-react";

export function EasterEggsManager() {
  const { data: easterEggsResponse } = useEasterEggs();
  const easterEggs = useMemo(() => easterEggsResponse?.data ?? [], [easterEggsResponse]);
  const [unlockedEggs, setUnlockedEggs] = useState<string[]>([]);
  const [showAchievement, setShowAchievement] = useState<{ title: string; message: string } | null>(null);

  useEffect(() => {
    const handleEasterEgg = (event: Event) => {
      const customEvent = event as CustomEvent<{ id: string }>;
      const eggId = customEvent.detail.id;
      const egg = easterEggs.find((e) => e.id === eggId);

      if (egg && !unlockedEggs.includes(egg.id)) {
        setUnlockedEggs((prev) => [...prev, egg.id]);
        setShowAchievement({ title: egg.title, message: egg.message });

        toast.success(egg.title, {
          description: egg.message,
          duration: 4000,
          icon: "🏆",
        });

        setTimeout(() => setShowAchievement(null), 3000);
      } else if (egg) {
        toast(egg.title, {
          description: egg.message,
          icon: "👑",
        });
      }
    };

    let konamiIndex = 0;
    const konamiCode = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
          const event = new CustomEvent("easter-egg", { detail: { id: "konami" } });
          window.dispatchEvent(event);
          konamiIndex = 0;
        }
      } else {
        konamiIndex = 0;
      }
    };

    window.addEventListener("easter-egg", handleEasterEgg);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("easter-egg", handleEasterEgg);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [easterEggs, unlockedEggs]);

  return (
    <>
      <AnimatePresence>
        {showAchievement && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.8 }}
            className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 pointer-events-none"
          >
            <div className="rounded-2xl border border-[#D4AF37]/30 bg-[#10141B] px-6 py-4 shadow-[0_0_50px_rgba(212,175,55,0.3)] backdrop-blur-xl">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-[#D4AF37] to-[#F4D77D] flex items-center justify-center">
                  <Crown className="h-5 w-5 text-black" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-sm">Achievement Unlocked!</span>
                    <Sparkles className="h-4 w-4 text-[#D4AF37]" />
                  </div>
                  <div className="text-xs text-[#F4D77D] font-medium">{showAchievement.title}</div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="sr-only" aria-live="polite">
        {unlockedEggs.length > 0 && `تم فتح ${unlockedEggs.length} من ${easterEggs.length} مفاجآت مخفية`}
      </div>
    </>
  );
}
