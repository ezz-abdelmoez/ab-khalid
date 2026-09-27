import { AboutSection } from "@/components/about/about-section";
import { TimelineSection } from "@/components/about/timeline-section";

export default function AboutPage() {
  return (
    <div className="pt-16">
      <AboutSection />
      <TimelineSection />
    </div>
  );
}
