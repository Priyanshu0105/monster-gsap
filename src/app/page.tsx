"use client";
import Cursor from "@/components/Cursor";
import Hero from "@/components/Hero";
import ScrollSection from "@/components/ScrollSection";
import History from "@/components/History";
import Details from "@/components/Details";
import { Analytics } from "@vercel/analytics/next"
export default function Home() {
  return (
    <main>
      <Cursor/>
      <Analytics />
      <Hero />
      <ScrollSection />
      <History />
      <Details />
    </main>
  );
}