"use client";

import { useState } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useGallery } from "@/hooks/use-api";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { X } from "lucide-react";

export function GallerySection() {
  const { data: galleryResponse } = useGallery();
  const gallery = galleryResponse?.data ?? [];
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedImage, setSelectedImage] = useState<(typeof gallery)[0] | null>(null);

  return (
    <section ref={ref} className="relative py-20 md:py-32 bg-[#07090D] overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#10141B]/30 to-[#07090D]" />
      </div>

      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16 space-y-4"
        >
          <Badge variant="outline" className="font-mono">GALLERY // لحظات من مسيرة الأسطورة</Badge>
          <h2 className="text-4xl md:text-5xl font-black">
            <span className="text-white">لحظات من</span>{" "}
            <span className="bg-gradient-to-r from-[#D4AF37] to-[#F4D77D] bg-clip-text text-transparent">
              مسيرة الأسطورة
            </span>
          </h2>
        </motion.div>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6 max-w-6xl mx-auto">
          {gallery.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.05, duration: 0.5 }}
              whileHover={{ scale: 1.02 }}
              onClick={() => setSelectedImage(item)}
              className="break-inside-avoid group relative overflow-hidden rounded-2xl border border-[#171C24] bg-[#10141B] cursor-pointer hover:border-[#D4AF37]/30 hover:shadow-[0_0_30px_rgba(212,175,55,0.1)] transition-all"
            >
              <div className="relative aspect-[4/3] bg-gradient-to-br from-[#171C24] to-[#07090D] flex items-center justify-center overflow-hidden">
                <div className="text-center space-y-2 p-6">
                  <div className="h-12 w-12 mx-auto rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/20 flex items-center justify-center text-xl">
                    📸
                  </div>
                  <div className="text-xs font-mono text-[#8A919E]">{item.id}.jpg</div>
                  <div className="text-[10px] text-[#8A919E]/60">{item.category}</div>
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#07090D] via-[#07090D]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute inset-0 bg-[#D4AF37]/0 group-hover:bg-[#D4AF37]/5 transition-colors" />

                {/* Caption on hover */}
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="font-bold text-white text-sm">{item.title}</h3>
                  <p className="text-xs text-[#8A919E] mt-1 line-clamp-2">{item.caption}</p>
                </div>
              </div>

              <div className="p-4">
                <h3 className="font-bold text-white text-sm group-hover:text-[#F4D77D] transition-colors">{item.title}</h3>
                <p className="text-xs text-[#8A919E] mt-1">{item.caption}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-3xl p-0 overflow-hidden bg-[#10141B] border-[#171C24]">
          {selectedImage && (
            <div className="relative">
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 z-10 h-8 w-8 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/70 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="aspect-[16/10] bg-gradient-to-br from-[#171C24] to-[#07090D] flex items-center justify-center">
                <div className="text-center space-y-3">
                  <div className="h-20 w-20 mx-auto rounded-2xl bg-[#D4AF37]/10 border border-[#D4AF37]/20 flex items-center justify-center text-3xl">
                    🖼️
                  </div>
                  <div className="text-sm font-mono text-white">{selectedImage.title}</div>
                  <div className="text-xs text-[#8A919E]">{selectedImage.id}.jpg • {selectedImage.category}</div>
                </div>
              </div>

              <div className="p-6 space-y-3">
                <h3 className="text-xl font-bold text-white">{selectedImage.title}</h3>
                <p className="text-[#8A919E] leading-relaxed">{selectedImage.caption}</p>
                <div className="flex items-center gap-2 pt-2">
                  <Badge variant="outline" className="text-xs">
                    {selectedImage.category}
                  </Badge>
                  <span className="text-[10px] font-mono text-[#8A919E]/60">
                    {selectedImage.width}×{selectedImage.height} • CERTIFIED LEGEND™
                  </span>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
