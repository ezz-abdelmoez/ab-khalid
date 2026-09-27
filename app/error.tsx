"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#07090D] px-4">
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#E45B5B]/[0.03] rounded-full blur-[100px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative max-w-md w-full text-center space-y-8 rounded-2xl border border-[#171C24] bg-[#10141B] p-8"
      >
        <div className="mx-auto h-16 w-16 rounded-2xl bg-[#E45B5B]/10 border border-[#E45B5B]/20 flex items-center justify-center">
          <AlertTriangle className="h-8 w-8 text-[#E45B5B]" />
        </div>

        <div className="space-y-3">
          <h2 className="text-2xl font-bold text-white">حصل موقف بسيط</h2>
          <p className="text-[#8A919E]">متقلقش، هنحلها. حتى الأساطير بتواجه تحديات تقنية أحياناً.</p>
          <p className="text-xs font-mono text-[#8A919E]/60">ERROR: {error.message.slice(0, 100)}</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Button variant="gold" className="flex-1 gap-2" onClick={reset}>
            <RefreshCw className="h-4 w-4" />
            إعادة المحاولة
          </Button>
          <Button
            variant="outline"
            className="flex-1 gap-2"
            onClick={() => router.push("/")}
          >
            <Home className="h-4 w-4" />
            العودة للرئيسية
          </Button>
        </div>

        <div className="text-xs text-[#8A919E]/50 font-mono">حتى الأخطاء هنا فخمة ✨</div>
      </motion.div>
    </div>
  );
}
