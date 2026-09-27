"use client";

import { useState } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useProjects } from "@/hooks/use-api";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Lock, ExternalLink, Sparkles } from "lucide-react";
import { toast } from "sonner";

export function ProjectsSection() {
  const { data: projectsResponse } = useProjects();
  const projects = projectsResponse?.data ?? [];
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedProject, setSelectedProject] = useState<(typeof projects)[0] | null>(null);
  const [showClassifiedDialog, setShowClassifiedDialog] = useState(false);

  const handleProjectClick = (project: (typeof projects)[0]) => {
    if (project.status === "TOP SECRET") {
      setShowClassifiedDialog(true);
      const event = new CustomEvent("easter-egg", { detail: { id: "classified-click" } });
      window.dispatchEvent(event);
      return;
    }
    setSelectedProject(project);
  };

  return (
    <section ref={ref} id="projects" className="relative py-20 md:py-32 bg-[#10141B]/30 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#07090D] via-[#10141B]/30 to-[#07090D]" />

      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16 space-y-4"
        >
          <Badge variant="outline" className="font-mono">PROJECTS // العمليات الكبرى</Badge>
          <h2 className="text-4xl md:text-5xl font-black">
            <span className="text-white">العمليات</span>{" "}
            <span className="bg-gradient-to-r from-[#D4AF37] to-[#F4D77D] bg-clip-text text-transparent">
              الكبرى
            </span>
          </h2>
          <p className="text-[#8A919E] max-w-2xl mx-auto">
            لا نسميها مشاريع عادية... نسميها عمليات. لأن كل مشروع كان يبدو مستحيلاً حتى تم إنجازه.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ y: -6 }}
              onClick={() => handleProjectClick(project)}
              className="group relative rounded-2xl border border-[#171C24] bg-[#10141B] overflow-hidden hover:border-[#D4AF37]/30 hover:shadow-[0_0_50px_rgba(212,175,55,0.1)] transition-all cursor-pointer"
            >
              {/* Image area */}
              <div className="relative h-48 bg-gradient-to-br from-[#171C24] to-[#07090D] overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center space-y-2">
                    <div className="h-16 w-16 mx-auto rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/20 flex items-center justify-center">
                      <span className="text-2xl">🚀</span>
                    </div>
                    <div className="text-xs font-mono text-[#8A919E]">{project.id}.jpg</div>
                  </div>
                </div>

                {/* Status badge */}
                <div className="absolute top-4 right-4">
                  <Badge
                    variant={project.status === "TOP SECRET" ? "destructive" : "success"}
                    className="font-mono text-[10px] gap-1"
                  >
                    {project.status === "TOP SECRET" && <Lock className="h-3 w-3" />}
                    {project.status}
                  </Badge>
                </div>

                {/* Featured badge */}
                {project.featured && (
                  <div className="absolute top-4 left-4">
                    <Badge variant="gold" className="text-[10px] gap-1">
                      <Sparkles className="h-3 w-3" />
                      FEATURED
                    </Badge>
                  </div>
                )}

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#10141B] via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                <div className="absolute inset-0 bg-[#D4AF37]/0 group-hover:bg-[#D4AF37]/5 transition-colors" />
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-white group-hover:text-[#F4D77D] transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-[#8A919E] mt-2 leading-relaxed line-clamp-2">{project.description}</p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <Badge key={tech} variant="outline" className="text-[10px]">
                      {tech}
                    </Badge>
                  ))}
                  {project.technologies.length > 3 && (
                    <Badge variant="secondary" className="text-[10px]">
                      +{project.technologies.length - 3}
                    </Badge>
                  )}
                </div>

                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-white">أبرز النقاط:</h4>
                  <div className="space-y-1">
                    {project.highlights.slice(0, 2).map((highlight, i) => (
                      <div key={i} className="flex gap-2 text-xs text-[#8A919E]">
                        <span className="text-[#D4AF37]">•</span>
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <span className="text-[10px] font-mono text-[#8A919E]/60">MISSION ID: {project.id.toUpperCase()}</span>
                  <div className="flex items-center gap-1 text-xs text-[#D4AF37] group-hover:gap-2 transition-all">
                    <span>عرض التفاصيل</span>
                    <ExternalLink className="h-3 w-3" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Project Detail Dialog */}
      <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent className="max-w-2xl">
          {selectedProject && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-3 mb-2">
                  <Badge variant={selectedProject.status === "TOP SECRET" ? "destructive" : "success"} className="font-mono text-xs">
                    {selectedProject.status}
                  </Badge>
                  {selectedProject.featured && <Badge variant="gold" className="text-xs">FEATURED</Badge>}
                </div>
                <DialogTitle className="text-2xl">{selectedProject.title}</DialogTitle>
                <DialogDescription className="text-base leading-relaxed">
                  {selectedProject.longDescription ?? selectedProject.description}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6 pt-4">
                <div>
                  <h4 className="font-bold mb-3">التقنيات المستخدمة</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies.map((tech) => (
                      <Badge key={tech} variant="outline">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-bold mb-3">الإنجازات</h4>
                  <div className="space-y-2">
                    {selectedProject.highlights.map((highlight, i) => (
                      <div key={i} className="flex gap-2 text-sm">
                        <span className="text-[#D4AF37]">✓</span>
                        <span className="text-[#8A919E]">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button variant="gold" className="flex-1" onClick={() => toast.success("تم إرسال طلب التواصل!")}>
                    تواصل حول هذا المشروع
                  </Button>
                  <Button variant="outline" onClick={() => setSelectedProject(null)}>
                    إغلاق
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Classified Dialog */}
      <Dialog open={showClassifiedDialog} onOpenChange={setShowClassifiedDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5 text-[#E45B5B]" />
              مستوى التصريح غير كافٍ
            </DialogTitle>
            <DialogDescription className="space-y-3 text-right">
              <p>هذا المشروع مصنف سري للغاية. المعلومات المتاحة فقط للأشخاص الحاصلين على تصريح أمني من المستوى الأسطوري.</p>
              <div className="rounded-lg bg-[#D4AF37]/10 border border-[#D4AF37]/20 p-4 mt-4">
                <p className="text-[#F4D77D] font-medium">بس بيني وبينك... المشروع اتعمل. 😂</p>
                <p className="text-xs text-[#8A919E] mt-2">واتعمل حلو كمان. بس متقولش لحد.</p>
              </div>
            </DialogDescription>
          </DialogHeader>
          <div className="flex gap-3 pt-4">
            <Button variant="gold" className="flex-1" onClick={() => setShowClassifiedDialog(false)}>
              مفهوم، مش هقول لحد 🤫
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
