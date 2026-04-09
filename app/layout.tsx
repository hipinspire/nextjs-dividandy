import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { getFooterSettings, getHeaderSettings } from "@/lib/strapi";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { getMediaAlt, getMediaUrl } from "@/lib/strapi";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dividandy",
  description: "Master the market. Play the game.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [header, footer] = await Promise.all([
    getHeaderSettings(),
    getFooterSettings(),
  ]);

  const nav = header?.primaryNav ?? [];
  const headerCta = header?.cta ?? null;
  const headerLogoUrl = getMediaUrl(header?.logo);
  const headerLogoAlt = getMediaAlt(header?.logo);

  const logoSubtitle = footer?.logoSubtitle ?? null;
  const legalMenu = footer?.legalMenu ?? null;
  const contactBlock = footer?.contactBlock ?? null;
  const socialsBlock = footer?.socialsBlock ?? null;
  const separatorText = footer?.separatorText ?? null;
  const copyrightText = footer?.copyrightText ?? null;
  const languages = footer?.languages ?? [];

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body
        className="min-h-full flex flex-col bg-background text-foreground"
        suppressHydrationWarning
      >
        <Header
          nav={nav}
          cta={headerCta}
          logoUrl={headerLogoUrl}
          logoAlt={headerLogoAlt}
          languages={languages}
        />
        <div className="flex-1 pt-20">{children}</div>
        <Footer
          logoUrl={headerLogoUrl}
          logoAlt={headerLogoAlt}
          logoSubtitle={logoSubtitle}
          legalMenu={legalMenu}
          contactBlock={contactBlock}
          socialsBlock={socialsBlock}
          separatorText={separatorText}
          copyrightText={copyrightText}
          languages={languages}
        />
      </body>
    </html>
  );
}
