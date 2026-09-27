"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Badge } from "@/components/ui/badge";
import { Crown, Award } from "lucide-react";
import { useProfile } from "@/hooks/use-api";

export function CertificateSection() {
  const { data: profileResponse } = useProfile();
  const profile = profileResponse?.data;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative py-20 md:py-32 bg-[#10141B]/50 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#07090D] to-[#10141B]/50" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#D4AF37]/[0.02] rounded-full blur-[100px]" />

      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-12 space-y-4"
        >
          <Badge variant="gold" className="gap-2">
            <Award className="h-3 w-3" />
            شهادة العظمة
          </Badge>
          <h2 className="text-3xl md:text-4xl font-black text-white">شهادة العظمة</h2>
          <p className="text-[#8A919E] text-sm">وثيقة رسمية من الجهة المختصة بالعظمة</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30, rotate: -1 }}
          animate={isInView ? { opacity: 1, y: 0, rotate: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          whileHover={{ rotate: 0, scale: 1.01 }}
          className="max-w-3xl mx-auto relative"
        >
          {/* Certificate */}
          <div className="relative rounded-2xl border-2 border-[#D4AF37]/30 bg-gradient-to-br from-[#FFFEFB] to-[#F5F5F0] dark:from-[#10141B] dark:to-[#07090D] p-8 md:p-12 shadow-[0_0_80px_rgba(212,175,55,0.15)] overflow-hidden">
            {/* Decorative border */}
            <div className="absolute inset-3 border border-[#D4AF37]/20 rounded-xl pointer-events-none" />
            <div className="absolute inset-6 border border-dashed border-[#D4AF37]/10 rounded-lg pointer-events-none" />

            {/* Corner ornaments */}
            <div className="absolute top-6 right-6 h-8 w-8 border-t-2 border-r-2 border-[#D4AF37]/30" />
            <div className="absolute top-6 left-6 h-8 w-8 border-t-2 border-l-2 border-[#D4AF37]/30" />
            <div className="absolute bottom-6 right-6 h-8 w-8 border-b-2 border-r-2 border-[#D4AF37]/30" />
            <div className="absolute bottom-6 left-6 h-8 w-8 border-b-2 border-l-2 border-[#D4AF37]/30" />

            <div className="relative text-center space-y-8">
              {/* Header */}
              <div className="space-y-4">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : {}}
                  transition={{ delay: 0.5, type: "spring" }}
                  className="mx-auto h-16 w-16 rounded-2xl bg-gradient-to-br from-[#D4AF37] to-[#F4D77D] flex items-center justify-center shadow-[0_0_30px_rgba(212,175,55,0.3)]"
                >
                  <Crown className="h-8 w-8 text-black" />
                </motion.div>

                <div className="space-y-2">
                  <h3 className="text-sm font-mono tracking-[0.2em] text-[#8A919E]">الإدارة العليا للإنجازات الاستثنائية</h3>
                  <h2 className="text-2xl md:text-3xl font-black text-[#10141B] dark:text-white">تشهد بأن السيد:</h2>
                </div>
              </div>

              {/* Name */}
              <div className="py-6">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.7 }}
                  className="text-4xl md:text-5xl font-black bg-gradient-to-r from-[#D4AF37] via-[#B8941F] to-[#D4AF37] bg-clip-text text-transparent"
                >
                  {profile?.name ?? "عبدالله خالد"}
                </motion.h1>
                <div className="mt-4 h-[2px] w-32 mx-auto bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
              </div>

              {/* Content */}
              <div className="space-y-4 max-w-xl mx-auto">
                <p className="text-[#10141B]/80 dark:text-[#F5F5F5]/80 leading-relaxed">
                  قد أثبت كفاءة استثنائية في مجالات:
                </p>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  {["التفكير الاستراتيجي", "الإنجاز السريع", "الإقناع", "التعامل مع المواقف"].map((skill, i) => (
                    <motion.div
                      key={skill}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ delay: 0.8 + i * 0.1 }}
                      className="rounded-lg bg-[#D4AF37]/10 border border-[#D4AF37]/20 px-3 py-2 font-medium text-[#10141B] dark:text-white"
                    >
                      ✓ {skill}
                    </motion.div>
                  ))}
                </div>
                <p className="text-xs text-[#8A919E] italic pt-4">
                  &quot;وذلك تقديراً لقدرته المستمرة على تحويل عبارة «سيبها عليا» إلى خطة تنفيذية متكاملة&quot;
                </p>
              </div>

              {/* Stamp and signature */}
              <div className="flex items-center justify-between pt-8 border-t border-[#D4AF37]/20 mt-8">
                <div className="text-right">
                  <div className="text-xs font-mono text-[#8A919E]">التاريخ</div>
                  <div className="font-bold text-[#10141B] dark:text-white">2026</div>
                  <div className="text-[10px] font-mono text-[#8A919E]">القاهرة، مصر</div>
                </div>

                <motion.div
                  initial={{ rotate: -15, scale: 0 }}
                  animate={isInView ? { rotate: -12, scale: 1 } : {}}
                  transition={{ delay: 1, type: "spring", stiffness: 200 }}
                  className="relative"
                >
                  <div className="rounded-full border-4 border-[#D4AF37] bg-[#D4AF37]/10 px-6 py-3 rotate-[-12deg]">
                    <div className="text-center">
                      <div className="text-xs font-black text-[#D4AF37] tracking-widest">CERTIFIED</div>
                      <div className="text-sm font-black text-[#D4AF37]">LEGEND™</div>
                      <div className="text-[8px] font-mono text-[#D4AF37]/70">EST. 2026</div>
                    </div>
                  </div>
                  <div className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-[#D4AF37]" />
                </motion.div>

                <div className="text-left">
                  <div className="text-xs font-mono text-[#8A919E]">التوقيع</div>
                  <div className="font-handwriting text-[#10141B] dark:text-white italic">الإدارة العليا</div>
                  <div className="text-[10px] font-mono text-[#8A919E]">ختم رسمي</div>
                </div>
              </div>
            </div>

            {/* Shine effect */}
            <motion.div
              animate={{ x: ["-100%", "200%"] }}
              transition={{ duration: 3, repeat: Infinity, repeatDelay: 3 }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 pointer-events-none"
            />
          </div>

          {/* Floating badges */}
          <motion.div
            initial={{ scale: 0, rotate: -10 }}
            animate={isInView ? { scale: 1, rotate: 5 } : {}}
            transition={{ delay: 1.2, type: "spring" }}
            className="absolute -top-4 -right-4 bg-[#D4AF37] text-black text-xs font-black px-3 py-1 rounded-full shadow-lg rotate-3 hidden md:block"
          >
            OFFICIAL™
          </motion.div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1.5 }}
          className="text-center text-xs font-mono text-[#8A919E]/60 mt-8"
        >
          * هذه الشهادة فكاهية وتهدف للتفخيم الكوميدي المحبب • تم إصدارها بكمية غير ضرورية من الثقة بالنفس 😊
        </motion.p>
      </div>
    </section>
  );
}
