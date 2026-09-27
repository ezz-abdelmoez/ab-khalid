"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useExperience } from "@/hooks/use-api";
import { Badge } from "@/components/ui/badge";
import { Briefcase, Calendar } from "lucide-react";

export function ExperienceSection() {
  const { data: expResponse } = useExperience();
  const experiences = expResponse?.data ?? [];
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative py-20 md:py-32 bg-[#10141B]/50 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#07090D] via-[#10141B]/50 to-[#07090D]" />

      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16 space-y-4"
        >
          <Badge variant="outline" className="font-mono">CAREER // المسيرة المهنية</Badge>
          <h2 className="text-4xl md:text-5xl font-black">
            <span className="text-white">المسيرة</span>{" "}
            <span className="bg-gradient-to-r from-[#D4AF37] to-[#F4D77D] bg-clip-text text-transparent">
              المهنية
            </span>
          </h2>
          <p className="text-[#8A919E] max-w-2xl mx-auto">
            مسيرة مهنية تبدو وكأنها كُتبت بعناية فائقة... لكنها في الحقيقة سلسلة من «سيبها عليا» الناجحة.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-8">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.15, duration: 0.6 }}
              whileHover={{ scale: 1.01 }}
              className="group relative rounded-2xl border border-[#171C24] bg-gradient-to-br from-[#10141B] to-[#07090D] p-6 md:p-8 hover:border-[#D4AF37]/20 hover:shadow-[0_0_40px_rgba(212,175,55,0.08)] transition-all"
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/20 flex items-center justify-center">
                      <Briefcase className="h-5 w-5 text-[#D4AF37]" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white group-hover:text-[#F4D77D] transition-colors">
                        {exp.position}
                      </h3>
                      <p className="text-sm text-[#D4AF37] font-medium">{exp.company}</p>
                    </div>
                  </div>

                  {exp.humorousSubtitle && (
                    <p className="text-xs italic text-[#8A919E] border-r-2 border-[#D4AF37]/20 pr-3 max-w-xl">
                      &quot;{exp.humorousSubtitle}&quot;
                    </p>
                  )}
                </div>

                <div className="flex flex-col gap-2 md:items-end">
                  <Badge variant="gold" className="w-fit gap-1.5">
                    <Calendar className="h-3 w-3" />
                    {exp.year}
                  </Badge>
                  <span className="text-xs font-mono text-[#8A919E]">{exp.duration}</span>
                </div>
              </div>

              <p className="text-[#8A919E] leading-relaxed mb-6">{exp.description}</p>

              <div className="space-y-3">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <span className="h-1 w-6 bg-[#D4AF37] rounded-full" />
                  أبرز الإنجازات
                </h4>
                <div className="grid md:grid-cols-2 gap-3">
                  {exp.achievements.map((achievement, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.5 + index * 0.15 + i * 0.05 }}
                      className="flex items-start gap-2 text-sm text-[#8A919E] group-hover:text-[#F5F5F5] transition-colors"
                    >
                      <span className="text-[#D4AF37] mt-1">▸</span>
                      <span>{achievement}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Hover accent */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-[#D4AF37]/10 to-transparent rounded-bl-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
