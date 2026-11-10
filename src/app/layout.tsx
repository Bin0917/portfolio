import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import "pretendard/dist/web/variable/pretendardvariable-dynamic-subset.css";
import "./globals.css";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: site.title,
  description: site.description,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className="antialiased" suppressHydrationWarning>
      <body className="min-h-screen font-sans">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Nav />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
