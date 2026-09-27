import type { Metadata } from "next";
import "@fontsource/cairo/300.css";
import "@fontsource/cairo/400.css";
import "@fontsource/cairo/500.css";
import "@fontsource/cairo/600.css";
import "@fontsource/cairo/700.css";
import "@fontsource/cairo/800.css";
import "@fontsource/cairo/900.css";
import "@fontsource/jetbrains-mono/400.css";
import "@fontsource/jetbrains-mono/700.css";
import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";
import { QueryProvider } from "@/lib/query-client";
import { siteConfig } from "@/lib/site-config";
import "./globals.css";

export const metadata: Metadata = {
  title: `${siteConfig.name} | الملف الرسمي للأسطورة`,
  description: `Portfolio شخصي بأسلوب سينمائي فكاهي واستثنائي لـ ${siteConfig.name}. خبير استراتيجي في حل المشاكل التي لم تكن موجودة من الأساس.`,
  keywords: ["عبدالله خالد", "portfolio", "مطور", "خبير استراتيجي", "الأسطورة"],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.creator,
  openGraph: {
    type: "website",
    locale: "ar_EG",
    url: siteConfig.url,
    title: `${siteConfig.name} | الملف الرسمي للأسطورة`,
    description: `Portfolio سينمائي فكاهي تفخيمي مصري لـ ${siteConfig.name}`,
    siteName: "الملف الرسمي للأسطورة",
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | الملف الرسمي للأسطورة`,
    description: `Portfolio سينمائي فكاهي تفخيمي مصري لـ ${siteConfig.name}`,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground antialiased" style={{ fontFamily: "Cairo, system-ui, sans-serif" }}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          <QueryProvider>
            {children}
            <Toaster
              position="bottom-right"
              toastOptions={{
                style: {
                  background: "#10141B",
                  border: "1px solid #171C24",
                  color: "#F5F5F5",
                  direction: "rtl",
                },
              }}
              richColors
            />
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
