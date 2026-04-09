"use client";
import Cursor from "@/components/Cursor";
import Hero from "@/components/Hero";
import ScrollSection from "@/components/ScrollSection";
import History from "@/components/History";
import Details from "@/components/Details";
import { Analytics } from "@vercel/analytics/next";
import Loader from "@/components/Loader";

export default function Home(){

  return(

    <>
    
      <Loader/>

      <main
      style={{
        visibility:"visible"
      }}
      >

        <Cursor/>

        <Hero/>
        <Analytics/>
        <ScrollSection/>

        <History/>

        <Details/>

      </main>

    </>

  );

}
