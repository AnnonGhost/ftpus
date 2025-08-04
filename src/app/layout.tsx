import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Future Plus - Daily Earning Platform",
  description: "Earn ₹500-₹2000 daily with Future Plus. Join India's trusted microtask platform with wallet recharge, referral bonuses, and earning plans.",
  keywords: ["Future Plus", "earn money", "microtask", "India", "daily earning", "referral", "wallet", "UPI"],
  authors: [{ name: "Future Plus Team" }],
  openGraph: {
    title: "Future Plus - Daily Earning Platform",
    description: "Earn ₹500-₹2000 daily with Future Plus. Join India's trusted microtask platform.",
    url: "https://futureplus.com",
    siteName: "Future Plus",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Future Plus - Daily Earning Platform",
    description: "Earn ₹500-₹2000 daily with Future Plus. Join India's trusted microtask platform.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
