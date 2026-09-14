import type { Metadata } from "next";
import { preload } from "react-dom";
import "./globals.css";
import { SITE_DESCRIPTION, SITE_TITLE, SITE_URL } from "./site-config";
import oranienbaumCyrillic from "./fonts/oranienbaum-cyrillic.woff2?inline";
import oranienbaumLatin from "./fonts/oranienbaum-latin.woff2?inline";
import ysabeauCyrillic from "./fonts/ysabeau-office-400-cyrillic.woff2?inline";
import ysabeauLatin from "./fonts/ysabeau-office-400-latin.woff2?inline";
import ysabeauItalicCyrillic from "./fonts/ysabeau-office-400-italic-cyrillic.woff2?inline";
import ysabeauItalicLatin from "./fonts/ysabeau-office-400-italic-latin.woff2?inline";
import ptMonoCyrillic from "./fonts/pt-mono-400-cyrillic.woff2?inline";
import ptMonoLatin from "./fonts/pt-mono-400-latin.woff2?inline";

// Decode the same data URLs used by CSS before laying out the Hero.
// Inline CSS alone can still resolve font metrics after its first layout.
const initialFonts = [oranienbaumCyrillic, oranienbaumLatin, ysabeauCyrillic, ysabeauLatin,
  ysabeauItalicCyrillic, ysabeauItalicLatin, ptMonoCyrillic, ptMonoLatin];

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
  icons: { icon: [{ url: "/favicon.svg", type: "image/svg+xml" }] },
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    type: "website",
    url: "/",
    images: [{ url: "/og-grebenik.png", width: 1731, height: 909, alt: SITE_TITLE }],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/og-grebenik.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  initialFonts.forEach(href => preload(href, { as: "font", type: "font/woff2", crossOrigin: "anonymous" }));
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
