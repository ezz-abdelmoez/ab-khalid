"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Home, Search, Crown } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#07090D] px-4 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#10141B] via-[#07090D] to-[#07090D]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#D4AF37]/[0.03] rounded-full blur-[120px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#171C24_1px,transparent_1px),linear-gradient(to_bottom,#171C24_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)] opacity-10" />
      </div>

      <div className="relative max-w-2xl w-full text-center space-y-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <div className="mx-auto h-24 w-24 rounded-3xl bg-gradient-to-br from-[#D4AF37] to-[#F4D77D] flex items-center justify-center shadow-[0_0_40px_rgba(212,175,55,0.3)]">
            <span className="text-4xl font-black text-black">404</span>
          </div>

          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-black tracking-tight">
              <span className="text-white">واضح إنك دخلت</span>
              <span className="block bg-gradient-to-r from-[#D4AF37] to-[#F4D77D] bg-clip-text text-transparent">
                مكان مش موجود
              </span>
            </h1>
            <p className="text-lg text-[#8A919E]">حتى الأساطير مش بتعرف كل الطرق.</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="rounded-2xl border border-[#171C24] bg-[#10141B]/50 backdrop-blur-sm p-8 space-y-6"
        >
          <div className="flex items-center justify-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/20 flex items-center justify-center">
              <Crown className="h-6 w-6 text-[#D4AF37]" />
            </div>
            <div className="text-right">
              <div className="font-bold text-white">كنت مستنيك هنا؟</div>
              <div className="text-xs font-mono text-[#8A919E]">— الأسطورة، وهو بيستناك في الصفحة الصح</div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/">
              <Button variant="gold" size="lg" className="gap-2 w-full sm:w-auto">
                <Home className="h-4 w-4" />
                العودة إلى الملف الرسمي
              </Button>
            </Link>
            <Button
              variant="outline"
              size="lg"
              className="gap-2"
              onClick={() => window.history.back()}
            >
              <Search className="h-4 w-4" />
              الرجوع للخلف
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-xs font-mono text-[#8A919E]/50"
        >
          ERROR 404 • الصفحة غير موجودة • لكن الأسطورة موجودة دائماً ✨
        </motion.div>
      </div>
    </div>
  );
}
