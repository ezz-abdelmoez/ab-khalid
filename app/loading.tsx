"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Crown } from "lucide-react";
import { funnyLoadingMessages } from "@/lib/site-config";

export default function Loading() {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % funnyLoadingMessages.length);
    }, 600);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#07090D]">
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#D4AF37]/[0.03] rounded-full blur-[100px]" />
      </div>

      <div className="relative text-center space-y-8">
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
          className="mx-auto h-20 w-20 rounded-2xl bg-gradient-to-br from-[#D4AF37] to-[#F4D77D] flex items-center justify-center shadow-[0_0_40px_rgba(212,175,55,0.3)]"
        >
          <Crown className="h-10 w-10 text-black" />
        </motion.div>

        <div className="space-y-4">
          <motion.p
            key={messageIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-lg font-medium text-white font-mono min-h-[28px]"
          >
            {funnyLoadingMessages[messageIndex]}
          </motion.p>

          <div className="flex justify-center gap-1">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                className="h-2 w-2 rounded-full bg-[#D4AF37]"
              />
            ))}
          </div>
        </div>

        <div className="text-xs font-mono text-[#8A919E]/60">جاري تحميل الأسطورة...</div>
      </div>
    </div>
  );
}
