"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useProfile } from "@/hooks/use-api";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Quote } from "lucide-react";

export function AboutSection() {
  const { data: profileResponse } = useProfile();
  const profile = profileResponse?.data;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} id="about" className="relative py-20 md:py-32 bg-[#07090D] overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#07090D] to-[#10141B]/30" />

      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="space-y-8 order-2 lg:order-1"
          >
            <div className="space-y-4">
              <Badge variant="gold" className="gap-2">
                <Sparkles className="h-3 w-3" />
                القصة الحقيقية
              </Badge>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[0.9]">
                <span className="text-white">كيف بدأت</span>
                <span className="block bg-gradient-to-r from-[#D4AF37] to-[#F4D77D] bg-clip-text text-transparent">
                  الحكاية؟
                </span>
              </h2>
            </div>

            <div className="space-y-6 text-lg leading-relaxed">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="text-[#F5F5F5]"
              >
                في البداية كان شخصًا عاديًا...
              </motion.p>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="relative"
              >
                <div className="absolute -right-4 top-0 bottom-0 w-1 bg-gradient-to-b from-[#D4AF37] to-transparent" />
                <div className="bg-[#10141B] border border-[#171C24] rounded-2xl p-6 md:p-8 relative overflow-hidden">
                  <Quote className="absolute top-4 right-4 h-8 w-8 text-[#D4AF37]/20" />
                  <p className="text-xl md:text-2xl font-bold text-white pr-8">
                    ثم قال في أحد الأيام:
                  </p>
                  <p className="text-2xl md:text-3xl font-black bg-gradient-to-r from-[#D4AF37] to-[#F4D77D] bg-clip-text text-transparent mt-3">
                    &quot;سيبها عليا.&quot;
                  </p>
                  <p className="text-[#8A919E] mt-4">ومن هنا بدأت الرحلة.</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="space-y-4 text-[#8A919E] leading-relaxed"
              >
                <p>
                  {profile?.longBio ??
                    "عبدالله خالد ليس مجرد اسم، بل هو منهجية عمل. خبرة تمتد لسنوات من التعامل مع المواقف التي لم تكن موجودة في الـ Job Description."}
                </p>
                <p>
                  عندما تظهر المشكلة، لا نبحث عن حل... <span className="text-white font-bold">نبحث عن عبدالله.</span>
                </p>
                <p className="text-sm italic border-r-2 border-[#D4AF37]/20 pr-4">
                  &quot;وصل لمرحلة من الخبرة جعلت كلمة «متقلقش» تُعتبر خطة عمل معتمدة من الإدارة العليا.&quot;
                </p>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="grid grid-cols-3 gap-4 pt-4"
            >
              {[
                { value: "∞", label: "أفكار" },
                { value: "99.9%", label: "ثقة" },
                { value: "24/7", label: "جاهزية" },
              ].map((item) => (
                <div key={item.label} className="text-center p-3 rounded-xl bg-[#10141B] border border-[#171C24]">
                  <div className="text-xl font-black text-[#D4AF37] font-mono">{item.value}</div>
                  <div className="text-xs text-[#8A919E] mt-1">{item.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Image Stack - Polaroid style */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative order-1 lg:order-2 flex justify-center"
          >
            <div className="relative w-[320px] h-[400px]">
              {/* Stack effect */}
              <motion.div
                initial={{ rotate: -8, y: 10 }}
                animate={isInView ? { rotate: -8, y: 10 } : {}}
                className="absolute inset-0 bg-[#F5F5F5] rounded-lg shadow-xl p-3 pb-12"
              >
                <div className="w-full h-full bg-[#171C24] rounded flex items-center justify-center">
                  <span className="text-xs font-mono text-[#8A919E]">PHOTO_02.jpg</span>
                </div>
                <div className="absolute bottom-3 right-3 left-3 text-center">
                  <p className="text-xs text-black font-handwriting">قبل الاجتماع الحاسم</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ rotate: 5, y: -5 }}
                animate={isInView ? { rotate: 5, y: -5 } : {}}
                transition={{ delay: 0.1 }}
                className="absolute inset-0 bg-[#F5F5F5] rounded-lg shadow-xl p-3 pb-12"
              >
                <div className="w-full h-full bg-gradient-to-br from-[#10141B] to-[#07090D] rounded flex items-center justify-center">
                  <span className="text-xs font-mono text-[#8A919E]">PHOTO_01.jpg</span>
                </div>
                <div className="absolute bottom-3 right-3 left-3 text-center">
                  <p className="text-xs text-black">الهدوء الذي يسبق الإنجاز</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ rotate: -2 }}
                animate={isInView ? { rotate: -2 } : {}}
                transition={{ delay: 0.2 }}
                whileHover={{ rotate: 0, scale: 1.02 }}
                className="absolute inset-0 bg-[#F5F5F5] rounded-lg shadow-2xl p-3 pb-16 cursor-pointer group"
              >
                <div className="w-full h-full bg-gradient-to-br from-[#D4AF37]/20 via-[#10141B] to-[#07090D] rounded relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="h-20 w-20 mx-auto rounded-2xl bg-gradient-to-br from-[#D4AF37] to-[#F4D77D] flex items-center justify-center text-black font-black text-2xl shadow-lg">
                        ع خ
                      </div>
                      <div className="mt-3 text-xs font-mono text-white">PORTRAIT.jpg</div>
                      <div className="mt-1 text-[10px] text-[#D4AF37]">الشخصية الرئيسية</div>
                    </div>
                  </div>
                  {/* Gold shine */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                </div>
                <div className="absolute bottom-3 right-3 left-3 text-center">
                  <p className="text-sm text-black font-bold">لحظة تاريخية</p>
                  <p className="text-[10px] text-black/60 font-mono">2026 • LEGEND MODE</p>
                </div>
              </motion.div>

              {/* Floating badge */}
              <motion.div
                initial={{ scale: 0, rotate: -10 }}
                animate={isInView ? { scale: 1, rotate: 3 } : {}}
                transition={{ delay: 0.8, type: "spring" }}
                className="absolute -top-4 -left-6 bg-[#D4AF37] text-black text-xs font-black px-3 py-1 rounded-full shadow-lg rotate-3"
              >
                CERTIFIED™
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
