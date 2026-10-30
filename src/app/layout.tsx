import type { Metadata } from "next";
import localFont from "next/font/local";
import { portfolio, getNavigation } from "@/content/portfolio";
import { Header } from "@/components/header";
import { Footer } from "@/components/sections";
import { getSiteUrl, isIndexable } from "@/lib/site";
import "./globals.css";

const manrope = localFont({
  src: "../../node_modules/@fontsource-variable/manrope/files/manrope-latin-wght-normal.woff2",
  variable: "--font-manrope",
  weight: "200 800",
  style: "normal",
  display: "swap",
});

const siteUrl = getSiteUrl();
export const metadata: Metadata = {
  ...(siteUrl ? { metadataBase: new URL(siteUrl) } : {}),
  title: {
    default: `${portfolio.profile.name} — Software Developer`,
    template: `%s | ${portfolio.profile.shortName}`,
  },
  description: portfolio.profile.description,
  applicationName: `${portfolio.profile.shortName} Portfolio`,
  openGraph: {
    type: "website",
    locale: "en_US",
    title: `${portfolio.profile.name} — Software Developer`,
    description: portfolio.profile.description,
    siteName: portfolio.profile.shortName,
  },
  twitter: {
    card: "summary_large_image",
    title: `${portfolio.profile.name} — Software Developer`,
    description: portfolio.profile.description,
  },
  robots: { index: isIndexable(), follow: isIndexable() },
};

// Before-paint theme initialization. With no saved preference CSS follows the OS.
const themeScript = `(function(){try{var t=localStorage.getItem('portfolio-theme');if(t==='light'||t==='dark')document.documentElement.dataset.theme=t;}catch(e){}})();`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={manrope.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <Header
          name={portfolio.profile.shortName}
          initials={portfolio.profile.initials}
          photo={portfolio.profile.photo}
          navigation={getNavigation()}
        />
        {children}
        <Footer />
      </body>
    </html>
  );
}
