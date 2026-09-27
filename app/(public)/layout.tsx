import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { LegendModeProvider } from "@/components/easter-eggs/legend-mode-provider";
import { EasterEggsManager } from "@/components/easter-eggs/easter-eggs-manager";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <LegendModeProvider>
      <div className="min-h-screen flex flex-col bg-[#07090D]">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <EasterEggsManager />
      </div>
    </LegendModeProvider>
  );
}
