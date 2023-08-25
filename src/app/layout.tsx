import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import { ClerkProvider } from "@clerk/nextjs";
import { ReactNode } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Özgür ÖZALP | Full Stack Developer",
  authors: {
    name: "Özgür ÖZALP",
    url: "https://linkedin.com/in/ozgurozalp",
  },
  themeColor: "#f9fbfc",
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
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          {children}
          <Analytics />
          <Script
            async
            src="https://www.googletagmanager.com/gtag/js?id=G-YB8VDD3BXG"
          />
          <Script id="google-analytics">
            {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
        
          gtag('config', 'G-YB8VDD3BXG');
        `}
          </Script>
        </body>
      </html>
    </ClerkProvider>
  );
}
