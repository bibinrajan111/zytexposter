import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";
import { SmoothScroll } from "@/components/smooth-scroll";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Zytex Poster",
  description: "Interactive poster website with PDF export",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
