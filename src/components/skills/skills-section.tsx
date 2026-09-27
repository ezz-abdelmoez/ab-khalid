"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useSkills } from "@/hooks/use-api";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function SkillsSection() {
  const { data: skillsResponse } = useSkills();
  const skills = skillsResponse?.data ?? [];
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} id="skills" className="relative py-20 md:py-32 bg-[#07090D] overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#D4AF37]/[0.03] rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16 space-y-4"
        >
          <Badge variant="gold" className="font-mono">SUPER SKILLS // قدرات خارقة</Badge>
          <h2 className="text-4xl md:text-5xl font-black">
            <span className="text-white">القدرات</span>{" "}
            <span className="bg-gradient-to-r from-[#D4AF37] to-[#F4D77D] bg-clip-text text-transparent">
              الخارقة
            </span>
          </h2>
          <p className="text-[#8A919E] max-w-2xl mx-auto">
            ليس مجرد مهارات... بل قدرات تم تطويرها عبر سنوات من قول «سيبها عليا» وتنفيذها فعلاً.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.08, duration: 0.5 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="group"
            >
              <Card className="h-full relative overflow-hidden hover:border-[#D4AF37]/30 hover:shadow-[0_0_40px_rgba(212,175,55,0.1)] transition-all duration-300">
                {/* Gradient accent */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#D4AF37] to-[#F4D77D] opacity-0 group-hover:opacity-100 transition-opacity" />

                <CardContent className="p-6 space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-[#171C24] to-[#10141B] border border-[#171C24] flex items-center justify-center text-2xl group-hover:from-[#D4AF37]/20 group-hover:to-[#F4D77D]/10 group-hover:border-[#D4AF37]/30 transition-all">
                        {skill.icon}
                      </div>
                      <div>
                        <h3 className="font-bold text-white group-hover:text-[#F4D77D] transition-colors">
                          {skill.title}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-[10px] font-mono text-[#8A919E]">LEVEL:</span>
                          <Badge variant="gold" className="text-[10px] px-2 py-0">
                            {skill.level}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>

                  <p className="text-sm text-[#8A919E] leading-relaxed">{skill.description}</p>

                  <div className="flex items-center justify-between pt-2 border-t border-[#171C24]/50">
                    <span className="text-[10px] font-mono text-[#8A919E]/60">{skill.category.toUpperCase()}</span>
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <div
                          key={i}
                          className={`h-1 w-6 rounded-full transition-colors ${
                            i < 4 ? "bg-[#D4AF37]" : "bg-[#171C24]"
                          } group-hover:bg-[#F4D77D]`}
                          style={{ transitionDelay: `${i * 50}ms` }}
                        />
                      ))}
                    </div>
                  </div>
                </CardContent>

                {/* Hover shine */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.02] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none" />
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
