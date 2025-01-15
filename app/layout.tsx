import type { Metadata } from "next";
import { Funnel_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/naavbar";

const funnelDisplay = Funnel_Display({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sergio Alonso - Portfolio",
  description: "Portfolio creado por Sergio Alonso",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${funnelDisplay.variable} antialiased`}>
        <Navbar />
        <div className="pt-[55px]">{children}</div>
      </body>
    </html>
  );
}
