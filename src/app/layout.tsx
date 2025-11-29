import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import ChatWidget from "@/components/ui/ChatWidget";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Project Vitesse | Venice Simplon-Orient-Express",
  description: "A next-generation journey through the golden age of travel.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${playfair.variable} ${inter.variable} antialiased bg-vsoe-midnight text-vsoe-steam`}
      >
        {children}
        <ChatWidget />
      </body>
    </html>
  );
}
