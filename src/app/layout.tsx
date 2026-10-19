import type { Metadata } from "next";
import "./globals.css";
import "./dumemearts.css";
import { cn } from "@/lib/utils";
import { SmoothScroll } from "@/components/SmoothScroll";
import { AgentationProvider } from "@/components/AgentationProvider";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Preloader } from "@/components/Preloader";

export const metadata: Metadata = {
  title: "Make My Vid | Professional Video Production & Editing Services",
  description: "MakeMyVid – Professional video editing services for creators & businesses. From multi-camera edits to motion graphics, we bring your vision to life!",
  icons: {
    icon: "https://storage.googleapis.com/mkv_imagesbackend/favicon/67500cbb6555f_favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", "font-sans")}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} forcedTheme="light">
          <Preloader />
          <SmoothScroll>
            {children}
          </SmoothScroll>
          <AgentationProvider />
        </ThemeProvider>
      </body>
    </html>
  );
}
