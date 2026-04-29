import type { Metadata } from "next";
import { Poppins, Space_Grotesk } from "next/font/google";

import "./globals.css";
import { SmoothScroll } from "@/components/smooth-scroll";

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700", "800"],
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Zytex Poster",
  description: "Interactive poster website with print-ready export",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} ${spaceGrotesk.variable} antialiased`}>
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
