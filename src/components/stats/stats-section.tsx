"use client";

import { useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useStatistics } from "@/hooks/use-api";
import { toast } from "sonner";

function AnimatedCounter({ value, suffix = "" }: { value: number | string; suffix?: string }) {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const numericValue = typeof value === "string" ? null : value;

  useEffect(() => {
    if (!isInView || numericValue === null) return;

    let start = 0;
    const duration = 2000;
    const increment = numericValue / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= numericValue) {
        setDisplayValue(numericValue);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [isInView, numericValue]);

  if (typeof value === "string") {
    return (
      <span ref={ref} className="font-mono font-black">
        {value}
      </span>
    );
  }

  return (
    <span ref={ref} className="font-mono font-black">
      {displayValue}
      {suffix}
    </span>
  );
}

export function StatsSection() {
  const { data: statsResponse, isLoading } = useStatistics();
  const statistics = statsResponse?.data ?? [];
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const handleStatClick = (stat: { id: string; value: string | number; label: string }) => {
    if (stat.value === "∞" || stat.id === "ideas") {
      toast("الرقم خارج نطاق النظام", {
        description: "حاول النظام حساب العظمة... وفشل. الرقم غير قابل للقياس.",
        icon: "♾️",
      });
      const event = new CustomEvent("easter-egg", { detail: { id: "infinity-click" } });
      window.dispatchEvent(event);
    }
  };

  if (isLoading) {
    return (
      <section className="py-20 bg-[#07090D]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="h-32 bg-[#10141B] animate-pulse rounded-xl" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section ref={ref} className="relative py-20 md:py-32 bg-[#07090D] overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#07090D] via-[#10141B]/50 to-[#07090D]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#D4AF37]/[0.02] rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 space-y-4"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/20 bg-[#D4AF37]/5 px-4 py-1.5">
            <span className="text-xs font-mono text-[#D4AF37]">STATISTICS // غير قابلة للقياس</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight">
            <span className="text-white">أرقام لا تحتاج</span>
            <span className="block bg-gradient-to-r from-[#D4AF37] to-[#F4D77D] bg-clip-text text-transparent">
              إلى تفسير
            </span>
          </h2>
          <p className="text-[#8A919E] max-w-2xl mx-auto">
            بعض الأرقام تتحدث عن نفسها. وبعضها الآخر... يحاول النظام حسابها ويفشل.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {statistics.map((stat, index) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              whileHover={{ y: -4, scale: 1.02 }}
              onClick={() => handleStatClick(stat)}
              className="group relative overflow-hidden rounded-2xl border border-[#171C24] bg-gradient-to-br from-[#10141B] to-[#10141B]/50 p-6 backdrop-blur-sm hover:border-[#D4AF37]/30 hover:shadow-[0_0_30px_rgba(212,175,55,0.1)] transition-all duration-300 cursor-pointer"
            >
              {/* Gold shine on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#D4AF37]/[0.03] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

              <div className="relative space-y-3">
                <div className="flex items-start justify-between">
                  <div className="text-3xl md:text-4xl font-black tracking-tight">
                    <span className="bg-gradient-to-br from-white to-[#8A919E] bg-clip-text text-transparent group-hover:from-[#F4D77D] group-hover:to-[#D4AF37] transition-all">
                      <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                    </span>
                  </div>
                  <div className="h-8 w-8 rounded-lg bg-[#171C24] group-hover:bg-[#D4AF37]/20 flex items-center justify-center transition-colors">
                    <div className="h-2 w-2 rounded-full bg-[#D4AF37] group-hover:animate-pulse" />
                  </div>
                </div>

                <div className="space-y-1">
                  <h3 className="font-bold text-white group-hover:text-[#F4D77D] transition-colors">
                    {stat.label}
                  </h3>
                  <p className="text-xs text-[#8A919E] leading-relaxed">{stat.description}</p>
                </div>

                {stat.humorous && (
                  <div className="pt-2">
                    <span className="inline-flex items-center gap-1 text-[10px] font-mono text-[#D4AF37]/60 border border-[#D4AF37]/20 rounded-full px-2 py-0.5">
                      <span>◐</span> HUMOROUS: TRUE
                    </span>
                  </div>
                )}
              </div>

              {/* Bottom accent */}
              <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-[#D4AF37] to-[#F4D77D] group-hover:w-full transition-all duration-500" />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="mt-12 text-center"
        >
          <p className="text-xs font-mono text-[#8A919E]/60">
            * جميع الإحصائيات فكاهية وتهدف للتفخيم الكوميدي. لا تمثل مقاييس مهنية حقيقية. 😊
          </p>
        </motion.div>
      </div>
    </section>
  );
}
