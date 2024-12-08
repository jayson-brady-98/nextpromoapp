import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Analytics } from '@vercel/analytics/react'

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "NextPromo | Know When Your Favorite Brands Will Be On Sale",
  description: "Never miss a sale again. Get accurate predictions for upcoming sales and promotions from your favorite brands. Shop smarter and save money with NextPromo.",
  keywords: [
    "next sale prediction",
    "upcoming promotions",
    "sales tracker",
    "brand discounts",
    "sale alerts",
    "price predictions",
    "shopping deals",
    "money saving app",
    "retail sales calendar",
    "smart shopping assistant"
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
