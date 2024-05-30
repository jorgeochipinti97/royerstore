import { Inter } from "next/font/google";
import "./globals.css";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
const inter = Inter({ subsets: ["latin"] });
import { Analytics } from "@vercel/analytics/react";
import { Toaster } from "@/components/ui/toaster";
export const metadata = {
  title: "Royer Store | Worldwide free shipping",
  description:
    "Royer Store: Your global e-commerce hub for import and export. Discover a world of opportunities and seamless trade.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className={inter.className}>
        {children}
        <Toaster />

        <Analytics />
      </body>
    </html>
  );
}
