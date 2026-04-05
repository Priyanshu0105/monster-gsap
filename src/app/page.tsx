"use client";

import Hero from "@/components/Hero";
import ScrollSection from "@/components/ScrollSection";
import History from "@/components/History";
import Details from "@/components/Details";

export default function Home() {
  return (
    <main>
      <Hero />
      <ScrollSection />
      <History />
      <Details />
    </main>
  );
}