"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Crown, MessageCircle, Sparkles, ArrowRight } from "lucide-react";
import { useProfile } from "@/hooks/use-api";
import { toast } from "sonner";

export function FinalCtaSection() {
  const { data: profileResponse } = useProfile();
  const profile = profileResponse?.data;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} id="contact" className="relative py-20 md:py-40 bg-[#07090D] overflow-hidden">
      {/* Cinematic background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-t from-[#D4AF37]/[0.08] via-[#10141B]/50 to-[#07090D]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[800px] bg-[radial-gradient(ellipse_at_center,_rgba(212,175,55,0.15)_0%,_transparent_70%)] blur-[60px]" />
        {/* Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#171C24_1px,transparent_1px),linear-gradient(to_bottom,#171C24_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_100%,#000_70%,transparent_110%)] opacity-10" />
      </div>

      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/20 bg-[#D4AF37]/5 px-4 py-2 backdrop-blur-sm"
          >
            <Crown className="h-4 w-4 text-[#D4AF37]" />
            <span className="text-xs font-mono text-[#F4D77D] tracking-widest">FINAL CALL // النداء الأخير</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="space-y-6"
          >
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[0.9]">
              <span className="block text-white">هل تحتاج إلى</span>
              <span className="block bg-gradient-to-r from-[#D4AF37] via-[#F4D77D] to-[#D4AF37] bg-clip-text text-transparent">
                شخص استثنائي؟
              </span>
            </h2>

            <div className="space-y-4 pt-4">
              <p className="text-xl md:text-2xl text-[#F5F5F5] font-medium">أنت تعرف من تتصل به.</p>
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={isInView ? { scale: 1, opacity: 1 } : {}}
                transition={{ delay: 0.5, type: "spring" }}
                className="inline-flex items-center gap-3 rounded-2xl border border-[#D4AF37]/20 bg-[#10141B]/50 backdrop-blur-sm px-6 py-3"
              >
                <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-[#D4AF37] to-[#F4D77D] flex items-center justify-center font-black text-black">
                  {profile?.initials ?? "ع خ"}
                </div>
                <div className="text-right">
                  <div className="font-bold text-white">{profile?.name ?? "عبدالله خالد"}</div>
                  <div className="text-xs font-mono text-[#D4AF37]">CERTIFIED LEGEND™ • ONLINE</div>
                </div>
                <div className="h-2 w-2 rounded-full bg-[#3CCB7F] animate-pulse mr-2" />
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center pt-8"
          >
            <Button
              variant="gold"
              size="lg"
              className="group text-base px-8 py-6 h-auto"
              onClick={() => {
                toast.success("تم نسخ معلومات التواصل!", {
                  description: "المشاريع الكبيرة تبدأ بخطوة... والخطوة تبدأ برسالة واتساب.",
                });
                if (profile?.socialLinks) {
                  const whatsapp = profile.socialLinks.find((s) => s.platform === "whatsapp");
                  if (whatsapp) window.open(whatsapp.url, "_blank");
                }
              }}
            >
              <MessageCircle className="h-5 w-5" />
              <span>تواصل مع الأسطورة</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="px-8 py-6 h-auto border-[#171C24] hover:border-[#D4AF37]/30"
              onClick={() => {
                document.querySelector("#hero")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <Sparkles className="h-5 w-5" />
              العودة للبداية
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 1 }}
            className="pt-12 space-y-3"
          >
            <p className="text-[#8A919E]">المشاريع الكبيرة تبدأ بخطوة...</p>
            <p className="text-sm text-[#D4AF37] font-medium">والخطوة تبدأ برسالة واتساب. ☕</p>

            <div className="flex items-center justify-center gap-6 pt-6 text-xs font-mono text-[#8A919E]/60">
              <span>📍 القاهرة، مصر</span>
              <span>•</span>
              <span>✉️ legend@ab-khalid.com</span>
              <span>•</span>
              <span>⚡ 24/7 نظرياً</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom glow */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent" />
    </section>
  );
}
