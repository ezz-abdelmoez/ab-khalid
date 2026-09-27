"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowDown, Sparkles, Coffee, Crown, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useProfile } from "@/hooks/use-api";
import { useLegendMode } from "@/hooks/use-legend-mode";
import { cn } from "@/lib/utils";

const loadingMessages = [
  "جاري استدعاء البيانات...",
  "جاري حساب مستوى الخبرة...",
  "جاري قياس العظمة...",
  "النتيجة غير قابلة للقياس.",
];

export function HeroSection() {
  const { data: profileResponse, isLoading } = useProfile();
  const profile = profileResponse?.data;
  const [loadingStep, setLoadingStep] = useState(0);
  const [showContent, setShowContent] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const springY = useSpring(y, { stiffness: 100, damping: 30 });
  const legendMode = useLegendMode();

  useEffect(() => {
    if (!isLoading) {
      const interval = setInterval(() => {
        setLoadingStep((prev) => {
          if (prev >= loadingMessages.length - 1) {
            clearInterval(interval);
            setTimeout(() => setShowContent(true), 300);
            return prev;
          }
          return prev + 1;
        });
      }, 400);
      return () => clearInterval(interval);
    }
  }, [isLoading]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        setMousePosition({
          x: (e.clientX - rect.left - rect.width / 2) / 30,
          y: (e.clientY - rect.top - rect.height / 2) / 30,
        });
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const scrollToNext = () => {
    document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToAchievements = () => {
    document.querySelector("#achievements")?.scrollIntoView({ behavior: "smooth" });
  };

  if (isLoading || !showContent) {
    return (
      <div className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-[#07090D]">
        <div className="absolute inset-0 bg-gradient-to-br from-[#10141B] via-[#07090D] to-[#07090D]" />
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#D4AF37]/[0.03] rounded-full blur-[100px]" />
        </div>
        <div className="relative z-10 text-center space-y-6">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#D4AF37] to-[#F4D77D] shadow-[0_0_40px_rgba(212,175,55,0.3)]"
          >
            <Crown className="h-8 w-8 text-black" />
          </motion.div>
          <div className="space-y-3">
            <motion.p
              key={loadingStep}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-lg font-medium text-white font-mono"
            >
              {loadingMessages[loadingStep]}
            </motion.p>
            <div className="flex justify-center gap-1">
              {loadingMessages.map((_, index) => (
                <motion.div
                  key={index}
                  className={cn(
                    "h-1 w-8 rounded-full transition-colors",
                    index <= loadingStep ? "bg-[#D4AF37]" : "bg-[#171C24]"
                  )}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: index <= loadingStep ? 1 : 0.3 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative flex min-h-screen w-full items-center overflow-hidden bg-[#07090D]"
    >
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#10141B] via-[#07090D] to-[#07090D]" />
        <motion.div style={{ y: springY }} className="absolute inset-0 opacity-30">
          <div className="absolute top-[10%] right-[10%] w-[400px] h-[400px] bg-[#D4AF37]/[0.05] rounded-full blur-[80px]" />
          <div className="absolute bottom-[20%] left-[10%] w-[600px] h-[600px] bg-[#10141B] rounded-full blur-[100px]" />
        </motion.div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#171C24_1px,transparent_1px),linear-gradient(to_bottom,#171C24_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)] opacity-20" />
      </div>

      <motion.div style={{ opacity }} className="relative z-10 container mx-auto px-4 md:px-6 lg:px-8 py-20">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
          <div className="space-y-8 text-center lg:text-right order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/20 bg-[#D4AF37]/10 px-4 py-1.5 backdrop-blur-sm"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#3CCB7F] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#3CCB7F]"></span>
              </span>
              <span className="text-xs font-mono text-[#F4D77D]">● ONLINE — متاح للمشاريع الأسطورية</span>
            </motion.div>

            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="space-y-4"
              >
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[0.9]">
                  <span className="block text-white">{profile?.name ?? "عبدالله خالد"}</span>
                  <span className="block bg-gradient-to-r from-[#D4AF37] via-[#F4D77D] to-[#D4AF37] bg-clip-text text-transparent mt-2">
                    الأسطورة
                  </span>
                </h1>
                <div className="h-1 w-24 bg-gradient-to-r from-[#D4AF37] to-transparent mx-auto lg:mx-0 lg:mr-0" />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="space-y-3"
              >
                <h2 className="text-xl md:text-2xl font-bold text-[#F5F5F5] leading-relaxed">
                  {profile?.title ?? "خبير استراتيجي في حل المشاكل التي لم تكن موجودة من الأساس"}
                </h2>
                <p className="text-base md:text-lg text-[#8A919E] leading-relaxed max-w-2xl mx-auto lg:mx-0">
                  {profile?.subtitle ?? "Senior Professional في مجال «سيبها عليا»"}
                </p>
                <p className="text-sm md:text-base text-[#8A919E]/80 italic border-r-2 border-[#D4AF37]/30 pr-4 mr-4 lg:mr-0 lg:ml-auto max-w-xl">
                  &quot;شخص لا يبحث عن المشاكل... المشاكل هي التي تعرف طريقها إليه.&quot;
                </p>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start"
            >
              <Button variant="gold" size="lg" onClick={scrollToNext} className="group">
                <span>اكتشف الأسطورة</span>
                <motion.span
                  animate={{ y: [0, 3, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  <ArrowDown className="h-4 w-4" />
                </motion.span>
              </Button>
              <Button variant="outline" size="lg" onClick={scrollToAchievements} className="border-[#171C24] hover:border-[#D4AF37]/50">
                <Crown className="h-4 w-4" />
                شاهد الإنجازات
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="flex flex-wrap gap-2 justify-center lg:justify-start pt-4"
            >
              <Badge variant="gold" className="gap-1.5">
                <Sparkles className="h-3 w-3" />
                CERTIFIED LEGEND™
              </Badge>
              <Badge variant="outline" className="gap-1.5">
                <Coffee className="h-3 w-3" />
                قهوة واحدة = Turbo Mode
              </Badge>
              <Badge variant="success" className="gap-1.5">
                <Zap className="h-3 w-3" />
                99.9% ثقة
              </Badge>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
            className="relative order-1 lg:order-2 flex justify-center"
          >
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-[#D4AF37]/20 via-[#F4D77D]/20 to-[#D4AF37]/20 rounded-[2rem] blur-2xl" />
              
              <motion.div
                style={{
                  x: mousePosition.x,
                  y: mousePosition.y,
                }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
                className="relative"
              >
                <div className="relative h-[400px] w-[300px] md:h-[500px] md:w-[380px] overflow-hidden rounded-[1.5rem] border border-[#D4AF37]/20 bg-[#10141B] shadow-[0_0_60px_rgba(212,175,55,0.15)]">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#10141B] via-[#171C24] to-[#07090D] flex items-center justify-center">
                    <div className="text-center space-y-4">
                      <div className="mx-auto h-24 w-24 rounded-2xl bg-gradient-to-br from-[#D4AF37] to-[#F4D77D] flex items-center justify-center text-black font-black text-3xl shadow-[0_0_30px_rgba(212,175,55,0.3)]">
                        {profile?.initials ?? "ع خ"}
                      </div>
                      <div className="space-y-1">
                        <div className="text-white font-bold">{profile?.name}</div>
                        <div className="text-xs text-[#8A919E] font-mono">PORTRAIT.jpg</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-[#07090D] via-transparent to-transparent opacity-60" />
                  
                  <div className="absolute inset-0 rounded-[1.5rem] border border-[#D4AF37]/30 pointer-events-none" />
                  <motion.div
                    animate={{ x: ["-100%", "200%"] }}
                    transition={{ duration: 3, repeat: Infinity, repeatDelay: 2, ease: "easeInOut" }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-[#F4D77D]/20 to-transparent skew-x-12 pointer-events-none"
                  />
                </div>

                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -top-4 -right-4 bg-[#10141B] border border-[#D4AF37]/30 rounded-xl px-3 py-2 shadow-xl backdrop-blur-sm"
                >
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-[#3CCB7F] animate-pulse" />
                    <span className="text-xs font-mono text-white">AVAILABLE</span>
                  </div>
                </motion.div>

                <motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                  className="absolute -bottom-4 -left-4 bg-gradient-to-r from-[#D4AF37] to-[#F4D77D] rounded-xl px-4 py-2 shadow-[0_0_20px_rgba(212,175,55,0.4)]"
                >
                  <div className="text-xs font-black text-black">LEVEL: LEGEND™</div>
                </motion.div>
              </motion.div>

              {legendMode?.isLegendMode && (
                <>
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.1 }}
                      style={{
                        top: `${20 + i * 12}%`,
                        right: `${-10 + (i % 2) * 20}%`,
                      }}
                      className="absolute w-1 h-1 bg-[#F4D77D] rounded-full"
                    >
                      <motion.div
                        animate={{
                          y: [0, -20, 0],
                          opacity: [1, 0.3, 1],
                        }}
                        transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                        className="w-full h-full bg-[#F4D77D] rounded-full"
                      />
                    </motion.div>
                  ))}
                </>
              )}
            </div>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] font-mono text-[#8A919E] tracking-widest">SCROLL</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="h-8 w-[1px] bg-gradient-to-b from-[#D4AF37] to-transparent"
        />
      </motion.div>

      {legendMode?.isLegendMode && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,_rgba(212,175,55,0.08)_0%,_transparent_70%)]"
        />
      )}
    </section>
  );
}
