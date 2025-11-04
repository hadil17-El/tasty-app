import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tasty App",
  description: "Recipe app built with Next.js and CSS",
  icons: {
    icon: "/imgs/Ticon.png",
    shortcut: "/imgs/Ticon.png",
    apple: "/imgs/Ticon.png"
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
