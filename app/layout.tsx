import type { Metadata } from "next";
import { Inter_Tight, JetBrains_Mono } from "next/font/google";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import "./globals.css";

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SholaX",
  description: "SholaX marketing site, dashboard, and admin panel",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${interTight.variable} ${jetbrainsMono.variable} dark h-full antialiased`}
    >
      <body className="noise-layer min-h-full flex flex-col bg-canvas text-primary">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
