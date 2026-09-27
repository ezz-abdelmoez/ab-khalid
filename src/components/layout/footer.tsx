"use client";

import { motion } from "framer-motion";
import { Link as LinkIcon, ExternalLink, Mail, MessageCircle, Crown, Heart } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { useProfile } from "@/hooks/use-api";

const iconMap: Record<string, React.ElementType> = {
  github: LinkIcon,
  linkedin: ExternalLink,
  instagram: LinkIcon,
  facebook: LinkIcon,
  whatsapp: MessageCircle,
};

export function Footer() {
  const { data: profileResponse } = useProfile();
  const profile = profileResponse?.data;
  const socialLinks = profile?.socialLinks ?? [];

  return (
    <footer className="relative border-t border-[#171C24] bg-[#07090D] overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-[#D4AF37]/[0.03] to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-16 relative">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#D4AF37] to-[#F4D77D] text-black font-black">
                {siteConfig.initials}
              </div>
              <div>
                <div className="font-bold text-lg">{siteConfig.name}</div>
                <div className="text-xs text-[#8A919E] font-mono">الملف الرسمي للأسطورة™</div>
              </div>
            </div>
            <p className="text-sm text-[#8A919E] leading-relaxed max-w-xs">
              خبير استراتيجي في حل المشاكل التي لم تكن موجودة من الأساس. متخصص في تحويل «سيبها عليا» إلى خطة تنفيذية.
            </p>
            <div className="flex items-center gap-2 text-xs font-mono text-[#D4AF37]">
              <Crown className="h-3 w-3" />
              <span>CERTIFIED LEGEND™ — 2026</span>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-bold text-sm">روابط سريعة</h4>
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: "القصة", href: "#about" },
                { label: "القدرات", href: "#skills" },
                { label: "الإنجازات", href: "#achievements" },
                { label: "المشاريع", href: "#projects" },
                { label: "التوصيات", href: "#testimonials" },
                { label: "التواصل", href: "#contact" },
              ].map((link) => (
                <button
                  key={link.label}
                  onClick={() => document.querySelector(link.href)?.scrollIntoView({ behavior: "smooth" })}
                  className="text-right text-sm text-[#8A919E] hover:text-white transition-colors"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-bold text-sm">تواصل مع الأسطورة</h4>
            <div className="flex flex-wrap gap-2">
              {socialLinks.map((social) => {
                const Icon = iconMap[social.platform] ?? LinkIcon;
                return (
                  <a
                    key={social.platform}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#171C24] bg-[#10141B] text-[#8A919E] hover:text-white hover:border-[#D4AF37]/30 hover:bg-[#171C24] transition-all"
                    aria-label={social.label}
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
            <div className="space-y-1 text-sm">
              <div className="text-[#8A919E]">📍 القاهرة، مصر</div>
              <div className="text-[#8A919E] flex items-center gap-2">
                <Mail className="h-3 w-3" />
                legend@ab-khalid.com
              </div>
              <div className="text-xs font-mono text-[#D4AF37] mt-2">متاح للمشاريع الأسطورية — بشرط توفر القهوة ☕</div>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col md:flex-row items-center justify-between gap-4 border-t border-[#171C24] pt-8">
          <div className="text-center md:text-right">
            <div className="text-sm text-[#8A919E]">
              © 2026 {siteConfig.name} — جميع الحقوق محفوظة
            </div>
            <div className="mt-1 flex items-center justify-center md:justify-start gap-1 text-xs text-[#8A919E]/70">
              <span>تم بناء هذا الموقع بكمية غير ضرورية من الثقة بالنفس</span>
              <Heart className="h-3 w-3 text-[#E45B5B] fill-[#E45B5B]" />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-[#3CCB7F] animate-pulse" />
            <span className="text-xs font-mono text-[#8A919E]">ONLINE — جاهز لمواجهة التحديات</span>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            const event = new CustomEvent("easter-egg", { detail: { id: "specialist-badge" } });
            window.dispatchEvent(event);
          }}
          className="absolute bottom-4 left-4 opacity-20 hover:opacity-100 transition-opacity"
          aria-label="للمختصين فقط"
        >
          <span className="text-[8px] font-mono border border-[#D4AF37]/30 rounded px-1.5 py-0.5 text-[#D4AF37]">
            للمختصين فقط
          </span>
        </motion.button>
      </div>
    </footer>
  );
}
