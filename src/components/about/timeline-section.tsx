"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useTimeline } from "@/hooks/use-api";
import { Badge } from "@/components/ui/badge";

export function TimelineSection() {
  const { data: timelineResponse } = useTimeline();
  const timeline = timelineResponse?.data ?? [];
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative py-20 md:py-32 bg-[#10141B]/30 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#07090D] via-[#10141B]/20 to-[#07090D]" />

      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16 space-y-4"
        >
          <Badge variant="outline" className="font-mono text-xs">
            TIMELINE // الرحلة الأسطورية
          </Badge>
          <h2 className="text-3xl md:text-4xl font-black">
            <span className="text-white">من البداية إلى</span>{" "}
            <span className="bg-gradient-to-r from-[#D4AF37] to-[#F4D77D] bg-clip-text text-transparent">
              الأسطورة
            </span>
          </h2>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          {/* Progress line */}
          <div className="absolute right-4 md:right-1/2 top-0 bottom-0 w-[2px] bg-[#171C24] md:translate-x-1/2">
            <motion.div
              initial={{ height: 0 }}
              animate={isInView ? { height: "100%" } : {}}
              transition={{ duration: 2, ease: "easeInOut" }}
              className="w-full bg-gradient-to-b from-[#D4AF37] to-[#F4D77D] origin-top"
            />
          </div>

          <div className="space-y-12 md:space-y-16">
            {timeline.map((item, index) => {
              const isEven = index % 2 === 0;
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 30, x: isEven ? -20 : 20 }}
                  animate={isInView ? { opacity: 1, y: 0, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  className={`relative flex flex-col md:flex-row gap-6 md:gap-8 ${isEven ? "md:flex-row-reverse" : ""}`}
                >
                  {/* Dot */}
                  <div className="absolute right-4 md:right-1/2 md:translate-x-1/2 top-2 z-10">
                    <div className="relative">
                      <div className="h-4 w-4 rounded-full bg-[#07090D] border-2 border-[#D4AF37] shadow-[0_0_10px_rgba(212,175,55,0.5)]" />
                      <div className="absolute inset-0 h-4 w-4 rounded-full bg-[#D4AF37] animate-ping opacity-30" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className={`flex-1 pr-12 md:pr-0 ${isEven ? "md:pl-12 md:text-left" : "md:pr-12 md:text-right"}`}>
                    <div className="group relative rounded-2xl border border-[#171C24] bg-[#10141B] p-6 hover:border-[#D4AF37]/30 hover:shadow-[0_0_30px_rgba(212,175,55,0.1)] transition-all">
                      <div className="flex items-center gap-3 mb-3 justify-start">
                        <span className="font-mono text-xs px-2 py-1 rounded bg-[#D4AF37]/10 text-[#F4D77D] border border-[#D4AF37]/20">
                          {item.year}
                        </span>
                        {item.humorous && (
                          <span className="text-[10px] font-mono text-[#8A919E]">HUMOROUS: TRUE</span>
                        )}
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#F4D77D] transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-sm text-[#8A919E] leading-relaxed mb-3">{item.description}</p>
                      {item.achievement && (
                        <div className="inline-flex items-center gap-2 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/20 px-3 py-1">
                          <span className="text-xs">🏆</span>
                          <span className="text-xs font-medium text-[#F4D77D]">{item.achievement}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Image / spacer */}
                  <div className="flex-1 hidden md:block">
                    <div className="h-full flex items-center">
                      <div className="w-full h-32 rounded-xl bg-[#10141B] border border-[#171C24] flex items-center justify-center overflow-hidden group">
                        <div className="text-center">
                          <div className="text-2xl mb-1">📸</div>
                          <div className="text-[10px] font-mono text-[#8A919E]">{item.id}.jpg</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
