import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Monster Energy",
  description: "Monster Energy GSAP Scroll Experience",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}