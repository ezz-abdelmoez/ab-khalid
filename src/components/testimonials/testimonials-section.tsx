"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useTestimonials } from "@/hooks/use-api";
import { Badge } from "@/components/ui/badge";
import { Quote, Star } from "lucide-react";

export function TestimonialsSection() {
  const { data: testimonialsResponse } = useTestimonials();
  const testimonials = testimonialsResponse?.data ?? [];
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} id="testimonials" className="relative py-20 md:py-32 bg-[#10141B]/30 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#07090D] via-[#10141B]/20 to-[#07090D]" />

      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16 space-y-4"
        >
          <Badge variant="gold" className="font-mono">TESTIMONIALS // ماذا يقول عنه الناس؟</Badge>
          <h2 className="text-4xl md:text-5xl font-black">
            <span className="text-white">ماذا يقول</span>{" "}
            <span className="bg-gradient-to-r from-[#D4AF37] to-[#F4D77D] bg-clip-text text-transparent">
              عنه الناس؟
            </span>
          </h2>
          <p className="text-[#8A919E] max-w-2xl mx-auto">
            آراء حقيقية... بأسلوب فكاهي تفخيمي. جميع التوصيات إيجابية ومحبة، لأن الأسطورة تستحق.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ y: -4 }}
              className="group relative"
            >
              <div className="relative h-full rounded-2xl border border-[#171C24] bg-[#10141B] p-6 hover:border-[#D4AF37]/20 hover:shadow-[0_0_30px_rgba(212,175,55,0.08)] transition-all">
                <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Quote className="h-8 w-8 text-[#D4AF37]" />
                </div>

                <div className="relative space-y-4">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-[#D4AF37] text-[#D4AF37]" />
                    ))}
                  </div>

                  <blockquote className="text-[#F5F5F5] leading-relaxed">&quot;{testimonial.quote}&quot;</blockquote>

                  <div className="flex items-center gap-3 pt-4 border-t border-[#171C24]/50">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#D4AF37]/20 to-[#F4D77D]/10 border border-[#D4AF37]/20 flex items-center justify-center font-bold text-[#D4AF37] text-sm">
                      {testimonial.author.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-white text-sm truncate">{testimonial.author}</div>
                      <div className="text-xs text-[#8A919E] truncate">{testimonial.role}</div>
                    </div>
                  </div>

                  {testimonial.relation && (
                    <div className="text-[10px] font-mono text-[#D4AF37]/60 bg-[#D4AF37]/5 border border-[#D4AF37]/10 rounded-full px-2 py-1 w-fit">
                      {testimonial.relation}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
