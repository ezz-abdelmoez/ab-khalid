"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Badge } from "@/components/ui/badge";
import { Activity, Coffee, Brain, Lightbulb, Target, Users } from "lucide-react";

const metrics = [
  { label: "Productivity", value: 94, icon: Activity, color: "#D4AF37" },
  { label: "Confidence", value: 99, icon: Target, color: "#F4D77D" },
  { label: "Problem Solving", value: 100, icon: Brain, color: "#3CCB7F" },
  { label: "Ideas", value: 100, displayValue: "∞", icon: Lightbulb, color: "#D4AF37" },
  { label: "Coffee Dependency", value: 72, icon: Coffee, color: "#8A919E" },
  { label: "Team Spirit", value: 96, icon: Users, color: "#F4D77D" },
];

export function PerformanceDashboard() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative py-20 md:py-32 bg-[#07090D] overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#10141B]/50 via-[#07090D] to-[#07090D]" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#D4AF37]/[0.02] rounded-full blur-[100px]" />

      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-12 space-y-4"
        >
          <Badge variant="outline" className="font-mono gap-2">
            <Activity className="h-3 w-3" />
            PERFORMANCE OVERVIEW // لوحة الأداء
          </Badge>
          <h2 className="text-3xl md:text-4xl font-black text-white">Performance Overview</h2>
          <div className="flex items-center justify-center gap-2">
            <div className="h-2 w-2 rounded-full bg-[#3CCB7F] animate-pulse" />
            <span className="text-xs font-mono text-[#3CCB7F]">● ONLINE — جاهز لمواجهة التحديات</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="max-w-4xl mx-auto rounded-2xl border border-[#171C24] bg-gradient-to-br from-[#10141B] to-[#07090D] p-6 md:p-8 shadow-[0_0_60px_rgba(0,0,0,0.5)]"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-8 pb-6 border-b border-[#171C24]">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/20 flex items-center justify-center">
                <Activity className="h-5 w-5 text-[#D4AF37]" />
              </div>
              <div>
                <h3 className="font-bold text-white">Legend Performance Metrics</h3>
                <p className="text-xs font-mono text-[#8A919E]">Updated: الآن • Real-time tracking</p>
              </div>
            </div>
            <Badge variant="success" className="font-mono text-xs">
              ALL SYSTEMS OPERATIONAL
            </Badge>
          </div>

          {/* Metrics */}
          <div className="grid md:grid-cols-2 gap-6">
            {metrics.map((metric, index) => {
              const Icon = metric.icon;
              return (
                <motion.div
                  key={metric.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + index * 0.08 }}
                  className="space-y-3 group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-6 w-6 rounded-lg bg-[#171C24] flex items-center justify-center group-hover:bg-[#D4AF37]/10 transition-colors">
                        <Icon className="h-3 w-3 text-[#8A919E] group-hover:text-[#D4AF37] transition-colors" />
                      </div>
                      <span className="text-sm font-medium text-white">{metric.label}</span>
                    </div>
                    <span className="text-sm font-mono font-bold text-[#D4AF37]">
                      {metric.displayValue ?? `${metric.value}%`}
                    </span>
                  </div>

                  <div className="relative h-2 bg-[#171C24] rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={isInView ? { width: `${metric.value}%` } : {}}
                      transition={{ duration: 1.2, delay: 0.5 + index * 0.1, ease: "easeOut" }}
                      className="absolute inset-y-0 left-0 rounded-full"
                      style={{
                        background: `linear-gradient(90deg, ${metric.color}, ${metric.color}DD)`,
                        boxShadow: `0 0 10px ${metric.color}40`,
                      }}
                    />
                    {/* Shine */}
                    <motion.div
                      initial={{ x: "-100%" }}
                      animate={isInView ? { x: "200%" } : {}}
                      transition={{ duration: 1.5, delay: 1 + index * 0.1, ease: "easeInOut" }}
                      className="absolute inset-y-0 w-20 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Footer stats */}
          <div className="mt-8 pt-6 border-t border-[#171C24] grid grid-cols-3 gap-4">
            {[
              { label: "Uptime", value: "99.9%" },
              { label: "Response Time", value: "< 1s" },
              { label: "Satisfaction", value: "∞%" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-lg font-black font-mono text-white">{stat.value}</div>
                <div className="text-[10px] font-mono text-[#8A919E]">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="mt-6 text-center">
            <p className="text-xs font-mono text-[#8A919E]/60">
              * جميع المقاييس فكاهية وتهدف للتفخيم الكوميدي • يتم التحديث تلقائياً عند توفر القهوة ☕
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
