"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useAchievements } from "@/hooks/use-api";
import { Badge } from "@/components/ui/badge";
import { useLegendMode } from "@/hooks/use-legend-mode";

export function AchievementsSection() {
  const { data: achievementsResponse } = useAchievements();
  const achievements = achievementsResponse?.data ?? [];
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  let isLegendMode = false;
  try {
    const legend = useLegendMode();
    isLegendMode = legend.isLegendMode;
  } catch {}

  return (
    <section ref={ref} id="achievements" className="relative py-20 md:py-32 bg-[#07090D] overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-[#D4AF37]/[0.02] rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16 space-y-4"
        >
          <Badge variant="gold" className="font-mono gap-2">
            <span>🏆</span> ACHIEVEMENTS // أعظم الإنجازات
          </Badge>
          <h2 className="text-4xl md:text-5xl font-black">
            <span className="text-white">أعظم</span>{" "}
            <span className="bg-gradient-to-r from-[#D4AF37] to-[#F4D77D] bg-clip-text text-transparent">
              الإنجازات
            </span>
          </h2>
          <p className="text-[#8A919E] max-w-2xl mx-auto">
            جوائز وشهادات تثبت أن الثقة بالنفس ليست مجرد شعور... بل هي منهجية عمل معتمدة.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, y: 30, rotate: -1 }}
              animate={isInView ? { opacity: 1, y: 0, rotate: 0 } : {}}
              transition={{ delay: index * 0.08, duration: 0.6 }}
              whileHover={{ y: -8, rotate: 1, scale: 1.02 }}
              className="group relative"
            >
              <div className="relative h-full rounded-2xl border border-[#171C24] bg-gradient-to-br from-[#10141B] to-[#07090D] p-6 overflow-hidden hover:border-[#D4AF37]/40 hover:shadow-[0_0_50px_rgba(212,175,55,0.15)] transition-all duration-500">
                {/* Gold shine animation */}
                <motion.div
                  animate={isLegendMode ? { x: ["-100%", "200%"] } : {}}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-[#F4D77D]/10 to-transparent skew-x-12 pointer-events-none"
                />

                {/* Top accent */}
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="relative space-y-4">
                  <div className="flex items-start justify-between">
                    <motion.div
                      animate={isLegendMode ? { rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] } : {}}
                      transition={{ duration: 2, repeat: Infinity, repeatDelay: 2 }}
                      className="h-14 w-14 rounded-xl bg-gradient-to-br from-[#D4AF37]/20 to-[#F4D77D]/10 border border-[#D4AF37]/30 flex items-center justify-center text-3xl shadow-[0_0_20px_rgba(212,175,55,0.2)] group-hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-all"
                    >
                      {achievement.icon}
                    </motion.div>
                    <div className="text-right space-y-1">
                      {achievement.year && (
                        <Badge variant="outline" className="text-[10px] font-mono">
                          {achievement.year}
                        </Badge>
                      )}
                      {achievement.humorous && (
                        <div className="text-[8px] font-mono text-[#D4AF37]/50">HUMOROUS: TRUE</div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-white group-hover:text-[#F4D77D] transition-colors leading-tight">
                      {achievement.title}
                    </h3>
                    <p className="text-xs font-mono text-[#D4AF37]/70">{achievement.subtitle}</p>
                    <p className="text-sm text-[#8A919E] leading-relaxed pt-2">{achievement.description}</p>
                  </div>

                  <div className="pt-4 flex items-center justify-between border-t border-[#171C24]/50">
                    <span className="text-[10px] font-mono text-[#8A919E]/60">
                      {achievement.category?.toUpperCase()} • CERTIFIED
                    </span>
                    <div className="h-1 w-12 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#F4D77D] opacity-50 group-hover:opacity-100 group-hover:w-16 transition-all" />
                  </div>
                </div>

                {/* Glow */}
                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-[#D4AF37]/5 rounded-full blur-2xl group-hover:bg-[#D4AF37]/10 transition-colors" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
