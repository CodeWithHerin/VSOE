import type { Metadata } from "next";
import { Playfair_Display, Inter, Cinzel, Montserrat } from "next/font/google";
import "./globals.css";
import { SessionProvider } from 'next-auth/react';
import { auth } from '@/auth';

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="en">
      <body
        className={`${playfair.variable} ${cinzel.variable} ${montserrat.variable} ${inter.variable} antialiased bg-vsoe-midnight text-vsoe-cream overflow-x-hidden cursor-none`}
      >
        <SessionProvider session={session}>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
