import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SiteIntegrations } from "@/components/integrations/SiteIntegrations";
import { CookieNotice } from "@/components/integrations/CookieNotice";
import { MarquizWidget } from "@/components/integrations/MarquizWidget";
import { buildPageMetadata } from "@/lib/metadata";
import "./globals.css";

export const metadata: Metadata = {
  ...buildPageMetadata({}),
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <SiteIntegrations />
        <MarquizWidget />
        <CookieNotice />
      </body>
    </html>
  );
}
