"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, Sun, Moon, Crown } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { navigation, siteConfig } from "@/lib/site-config";
import { useLegendMode } from "@/hooks/use-legend-mode";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [logoClicks, setLogoClicks] = useState(0);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const legendMode = useLegendMode();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogoClick = () => {
    const newCount = logoClicks + 1;
    setLogoClicks(newCount);
    if (newCount === 5) {
      const event = new CustomEvent("easter-egg", { detail: { id: "logo-click" } });
      window.dispatchEvent(event);
      setLogoClicks(0);
    }
  };

  const scrollToSection = (href: string) => {
    setIsMobileMenuOpen(false);
    if (href.startsWith("#")) {
      const element = document.querySelector(href);
      element?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={cn(
          "fixed top-0 z-40 w-full border-b transition-all duration-300",
          isScrolled
            ? "border-[#171C24]/50 bg-[#07090D]/80 backdrop-blur-xl supports-[backdrop-filter]:bg-[#07090D]/60"
            : "border-transparent bg-transparent"
        )}
      >
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6 lg:px-8">
          <button
            onClick={handleLogoClick}
            className="flex items-center gap-3 group"
            aria-label="العودة للرئيسية - اضغط 5 مرات لمفاجأة"
          >
            <div className="relative">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-[#D4AF37] to-[#F4D77D] text-black font-black text-sm shadow-[0_0_15px_rgba(212,175,55,0.3)] group-hover:shadow-[0_0_25px_rgba(212,175,55,0.5)] transition-all">
                {siteConfig.initials}
              </div>
              <div className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-[#3CCB7F] animate-pulse" />
            </div>
            <div className="hidden sm:block text-right">
              <div className="text-sm font-bold leading-none">{siteConfig.shortName}</div>
              <div className="text-[10px] text-[#8A919E] font-mono">LEGEND™</div>
            </div>
          </button>

          <nav className="hidden md:flex items-center gap-1">
            {navigation.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.href)}
                className="relative px-4 py-2 text-sm font-medium text-[#8A919E] hover:text-white transition-colors group"
              >
                {item.label}
                <span className="absolute bottom-0 left-1/2 h-[2px] w-0 bg-[#D4AF37] transition-all duration-300 group-hover:w-full group-hover:left-0" />
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={legendMode.toggleLegendMode}
              className={cn(
                "hidden sm:flex gap-2 border-[#D4AF37]/30 hover:bg-[#D4AF37]/10",
                legendMode.isLegendMode && "bg-[#D4AF37]/20 border-[#D4AF37] text-[#F4D77D]"
              )}
            >
              <Crown className="h-4 w-4" />
              <span className="font-mono text-xs">LEGEND</span>
            </Button>

            {mounted && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="h-9 w-9"
                aria-label="تبديل المظهر"
              >
                {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>
            )}

            <Button
              variant="gold"
              size="sm"
              className="hidden sm:flex"
              onClick={() => scrollToSection("#contact")}
            >
              تواصل مع الأسطورة
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden h-9 w-9"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="فتح القائمة"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </motion.header>

      <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
        <SheetContent side="right" className="w-[85%] bg-[#07090D]">
          <SheetHeader>
            <SheetTitle className="text-right font-bold">القائمة</SheetTitle>
          </SheetHeader>
          <div className="mt-8 flex flex-col gap-2">
            {navigation.map((item, index) => (
              <motion.button
                key={item.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => scrollToSection(item.href)}
                className="flex items-center justify-between rounded-lg px-4 py-3 text-right hover:bg-[#10141B] transition-colors group"
              >
                <span className="text-[#8A919E] group-hover:text-white font-medium">{item.label}</span>
                <span className="text-xs font-mono text-[#D4AF37]">0{index + 1}</span>
              </motion.button>
            ))}

            <div className="mt-6 space-y-3">
              <Button
                variant="outline"
                className="w-full justify-center gap-2 border-[#D4AF37]/30"
                onClick={() => {
                  legendMode.toggleLegendMode();
                  setIsMobileMenuOpen(false);
                }}
              >
                <Crown className="h-4 w-4" />
                {legendMode.isLegendMode ? "إيقاف وضع الأسطورة" : "تفعيل وضع الأسطورة"}
              </Button>
              <Button
                variant="gold"
                className="w-full"
                onClick={() => scrollToSection("#contact")}
              >
                تواصل مع الأسطورة
              </Button>
            </div>

            <div className="mt-auto pt-8 border-t border-[#171C24]">
              <div className="text-center">
                <div className="text-xs text-[#8A919E] font-mono">CERTIFIED LEGEND™</div>
                <div className="text-sm font-bold mt-1">{siteConfig.name}</div>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
