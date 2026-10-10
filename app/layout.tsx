import type { Metadata, Viewport } from "next";
import { Geist, IBM_Plex_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });
const plexMono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-plex-mono" });
const instrument = Instrument_Serif({ subsets: ["latin"], weight: "400", style: "italic", variable: "--font-instrument" });

export const metadata: Metadata = {
  title: "Nexillum — Same cloud. Higher possibilities.",
  description:
    "Nexillum is a technology consultancy built from Africa. AWS architecture, cloud credits and expert support for African startups — and a technically fluent partner for organisations building into Africa.",
};

export const viewport: Viewport = {
  themeColor: "#121214",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geist.variable} ${plexMono.variable} ${instrument.variable}`}>
      <body>{children}</body>
    </html>
  );
}
