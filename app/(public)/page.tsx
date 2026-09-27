import { HeroSection } from "@/components/hero/hero-section";
import { AboutSection } from "@/components/about/about-section";
import { TimelineSection } from "@/components/about/timeline-section";
import { StatsSection } from "@/components/stats/stats-section";
import { SkillsSection } from "@/components/skills/skills-section";
import { ExperienceSection } from "@/components/experience/experience-section";
import { AchievementsSection } from "@/components/achievements/achievements-section";
import { CertificateSection } from "@/components/achievements/certificate-section";
import { ProjectsSection } from "@/components/projects/projects-section";
import { PerformanceDashboard } from "@/components/dashboard/performance-dashboard";
import { TestimonialsSection } from "@/components/testimonials/testimonials-section";
import { GallerySection } from "@/components/gallery/gallery-section";
import { FinalCtaSection } from "@/components/layout/final-cta";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <AboutSection />
      <TimelineSection />
      <SkillsSection />
      <ExperienceSection />
      <AchievementsSection />
      <ProjectsSection />
      <PerformanceDashboard />
      <CertificateSection />
      <TestimonialsSection />
      <GallerySection />
      <FinalCtaSection />
    </>
  );
}
