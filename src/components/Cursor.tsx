"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Cursor() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot  = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const onMove = (e: MouseEvent) => {
      gsap.to(dot, {
        x: e.clientX, y: e.clientY,
        duration: 0.08, ease: "power2.out",
      });
      gsap.to(ring, {
        x: e.clientX, y: e.clientY,
        duration: 0.35, ease: "power2.out",
      });
    };

    const onEnter = () => {
      gsap.to(ring, { scale: 2, opacity: 0.5, duration: 0.3 });
      gsap.to(dot,  { scale: 0, duration: 0.2 });
    };

    const onLeave = () => {
      gsap.to(ring, { scale: 1, opacity: 1, duration: 0.3 });
      gsap.to(dot,  { scale: 1, duration: 0.2 });
    };

    const onDown = () => gsap.to(ring, { scale: 0.7, duration: 0.1 });
    const onUp   = () => gsap.to(ring, { scale: 1,   duration: 0.2, ease: "back.out(2)" });

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("mouseup",   onUp);

    const hoverables = document.querySelectorAll("a, button, [data-hover]");
    hoverables.forEach((el) => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("mouseup",   onUp);
      hoverables.forEach((el) => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      });
    };
  }, []);

  return (
    <>
      {/* center dot — solid green */}
      <div
        ref={dotRef}
        style={{
          position:     "fixed",
          top:          0, left: 0,
          width:        "8px",
          height:       "8px",
          borderRadius: "50%",
          background:   "#39ff14",
          boxShadow:    "0 0 10px #39ff14, 0 0 20px #39ff14",
          pointerEvents: "none",
          zIndex:       99999,
          transform:    "translate(-50%, -50%)",
        }}
      />

      {/* outer ring — green glowing */}
      <div
        ref={ringRef}
        style={{
          position:     "fixed",
          top:          0, left: 0,
          width:        "36px",
          height:       "36px",
          borderRadius: "50%",
          border:       "1.5px solid #39ff14",
          boxShadow:    "0 0 8px #39ff14, inset 0 0 8px rgba(57,255,20,0.15)",
          background:   "rgba(57,255,20,0.05)",  // ← subtle green fill
          pointerEvents: "none",
          zIndex:       99998,
          transform:    "translate(-50%, -50%)",
        }}
      />
    </>
  );
}