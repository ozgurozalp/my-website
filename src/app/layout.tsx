import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ReactNode } from "react";
import { Poppins } from "next/font/google";
import AppHeader from "@/components/shared/AppHeader";
import { GoogleTagManager } from "@next/third-parties/google";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Özgür ÖZALP | Full Stack Developer",
  authors: {
    name: "Özgür ÖZALP",
    url: "https://linkedin.com/in/ozgurozalp",
  },
  keywords: [
    "Özgür ÖZALP",
    "Özgür",
    "ÖZALP",
    "ozgurozalp",
    "ozqurozalp",
    "ozgur ozalp",
    "ozgur",
    "ozalp",
    "ozqurozalp.com",
    "ozgurozalp.com",
    "Frontend Developer",
    "Backend Developer",
    "Full Stack Developer",
    "Software Developer",
    "JavaScript Developer",
    "TypeScript Developer",
  ],
  creator: "Özgür ÖZALP",
  publisher: "Özgür ÖZALP",
  icons: {
    icon: "/my-logo.png",
    apple: "/my-logo.png",
    shortcut: "/my-logo.png",
  },
  description: "Özgür ÖZALP is a Full Stack Developer based in Istanbul, TR.",
  other: {
    "apple-mobile-web-app-status-bar-style": "#f4f4f4",
    "msapplication-navbutton-color": "#f4f4f4",
    "msapplication-TileColor": "#f4f4f4",
    "mobile-web-app-capable": "yes",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#f4f4f4" },
    { media: "(prefers-color-scheme: light)", color: "#f4f4f4" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" className={poppins.className}>
      <head>
        <GoogleTagManager gtmId="GTM-KNSSMMKM" />
      </head>
      <body>
        <AppHeader />
        {children}
      </body>
    </html>
  );
}
