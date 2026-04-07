"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const flavors = [
  {
    src:    "/cans/green.png",
    name:   "CLASSIC GREEN",
    tagline:"THE ORIGINAL BEAST",
    copy:   "Born in 2002. Still untamed. The drink that built an empire — raw, unfiltered, relentless. This isn't a beverage. It's a manifesto in a can.",
    stats:  [{ label: "CAFFEINE", val: "160MG" }, { label: "FLAVOR", val: "RAW" }, { label: "LEGACY", val: "20YRS" }],
    bg:     "#0a0a0a",
    glow:   "rgba(57,255,20,0.22)",
    accent: "#39ff14",
    number: "01",
    badge:  "ORIGINAL",
  },
  {
    src:    "/cans/mango.png",
    name:   "MANGO LOCO",
    tagline:"TROPICAL MADNESS",
    copy:   "When paradise goes feral. Sun-scorched mango meets Monster intensity. Dangerously smooth. Wildly addictive. Your new obsession has a name.",
    stats:  [{ label: "CAFFEINE", val: "160MG" }, { label: "FLAVOR", val: "MANGO" }, { label: "VIBE", val: "FERAL" }],
    bg:     "#100800",
    glow:   "rgba(255,140,0,0.22)",
    accent: "#ff8c00",
    number: "02",
    badge:  "TROPICAL",
  },
  {
    src:    "/cans/white.png",
    name:   "ULTRA WHITE",
    tagline:"ZERO CALORIES. ZERO LIMITS.",
    copy:   "Ghost-light, hit-hard. Zero sugar, full send. The clean slate that still hits like a freight train. For those who want it all and leave nothing behind.",
    stats:  [{ label: "CAFFEINE", val: "150MG" }, { label: "CALORIES", val: "ZERO" }, { label: "LIMITS", val: "NONE" }],
    bg:     "#06060f",
    glow:   "rgba(100,200,255,0.2)",
    accent: "#64c8ff",
    number: "03",
    badge:  "ULTRA",
  },
  {
    src:    "/cans/punch.png",
    name:   "PIPELINE PUNCH",
    tagline:"RIDE THE WAVE",
    copy:   "Named after the most dangerous wave on Earth. Violet-sweet, electric-deep, absolutely reckless. Catch it or get crushed. There is no middle ground.",
    stats:  [{ label: "CAFFEINE", val: "160MG" }, { label: "FLAVOR", val: "PUNCH" }, { label: "WAVE", val: "∞" }],
    bg:     "#0a000f",
    glow:   "rgba(180,0,255,0.2)",
    accent: "#b400ff",
    number: "04",
    badge:  "PIPELINE",
  },
];

export default function ScrollSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const canRef     = useRef<HTMLImageElement>(null);
  const glowRef    = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    const can     = canRef.current;
    if (!section || !can) return;

    gsap.to(can, {
      rotationY: 360, rotationZ: 10, ease: "none",
      scrollTrigger: { trigger: section, start: "top top", end: "bottom bottom", scrub: 1.5,
        onUpdate: (self) => setProgress(self.progress),
      },
    });

    flavors.forEach((flavor, i) => {
      ScrollTrigger.create({
        trigger: section,
        start:   `${i * 25}% top`,
        end:     `${(i + 1) * 25}% top`,
        onEnter:     () => updateFlavor(i),
        onEnterBack: () => updateFlavor(i === 0 ? 0 : i - 1),
      });
    });

    function updateFlavor(i: number) {
      const f = flavors[i];
      setCurrent(i);
      if (canRef.current) canRef.current.src = f.src;
      gsap.to("body", { backgroundColor: f.bg, duration: 0.9, ease: "power2.out" });
      gsap.to(glowRef.current, {
        background: `radial-gradient(circle,${f.glow} 0%,transparent 65%)`, duration: 0.9,
      });
      gsap.fromTo(".flavor-text-el",
        { y: 35, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.07, ease: "power3.out" }
      );
    }

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  const f = flavors[current];

  return (
    <section ref={sectionRef} style={{ height: "400vh", position: "relative" }}>
      <div style={{
        position: "sticky", top: 0, height: "100vh",
        display: "grid", gridTemplateColumns: "1fr 1fr",
        alignItems: "center", overflow: "hidden",
        padding: "0 5vw", gap: "4vw",
      }}>

        {/* glow */}
        <div ref={glowRef} style={{
          position: "absolute", left: "15%", top: "50%", transform: "translate(-50%,-50%)",
          width: "clamp(350px,55vw,700px)", height: "clamp(350px,55vw,700px)",
          borderRadius: "50%", background: `radial-gradient(circle,${f.glow} 0%,transparent 65%)`,
          pointerEvents: "none",
        }} />

        {/* scanlines */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: "repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(255,255,255,0.01) 3px,rgba(255,255,255,0.01) 4px)",
        }} />

        {/* progress bar top */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: "2px",
          background: "rgba(255,255,255,0.05)",
        }}>
          <div style={{
            height: "100%", width: `${progress * 100}%`,
            background: f.accent, boxShadow: `0 0 8px ${f.accent}`,
            transition: "background 0.5s",
          }} />
        </div>

        {/* LEFT — can */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "center",
          zIndex: 1, perspective: "1400px", position: "relative",
        }}>
          {/* orbit ring */}
          <div style={{
            position: "absolute", width: "clamp(260px,36vw,450px)", height: "clamp(260px,36vw,450px)",
            borderRadius: "50%", border: `1px solid ${f.accent}15`, pointerEvents: "none",
            transition: "border-color 0.5s",
          }} />
          <img
            ref={canRef}
            src={f.src}
            alt={f.name}
            style={{
              width: "clamp(220px,32vw,420px)", height: "auto", objectFit: "contain",
              transform: "rotate(-18deg)", zIndex: 1,
              filter: `drop-shadow(0 42px 64px rgba(0,0,0,0.5)) drop-shadow(0 16px 28px ${f.glow}) contrast(1.07) saturate(1.06)`,
              transformStyle: "preserve-3d",
              backfaceVisibility: "hidden",
              willChange: "transform, filter",
            }}
          />
        </div>

        {/* RIGHT — editorial text */}
        <div style={{ zIndex: 1, position: "relative" }}>

          {/* ghost number */}
          <div className="flavor-text-el" style={{
            fontFamily: "Bebas Neue, sans-serif",
            fontSize: "clamp(6rem,14vw,12rem)",
            lineHeight: 1, color: "transparent",
            WebkitTextStroke: `1px ${f.accent}18`,
            position: "absolute", top: "-3rem", right: "-1rem",
            pointerEvents: "none", userSelect: "none",
          }}>
            {f.number}
          </div>

          {/* badge */}
          <div className="flavor-text-el" style={{
            fontFamily: "Bebas Neue, sans-serif", fontSize: "0.58rem",
            letterSpacing: "0.5em", color: f.accent,
            border: `1px solid ${f.accent}40`, padding: "3px 10px", borderRadius: "2px",
            display: "inline-block", marginBottom: "1rem",
            boxShadow: `0 0 10px ${f.glow}`,
          }}>
            {f.badge}
          </div>

          {/* name */}
          <h2 className="flavor-text-el" style={{
            fontFamily: "Bebas Neue, sans-serif",
            fontSize: "clamp(2.5rem,5.5vw,5.5rem)",
            lineHeight: 0.9, letterSpacing: "0.04em",
            color: f.accent, textShadow: `0 0 40px ${f.glow}`,
            marginBottom: "0.5rem", transition: "color 0.5s",
          }}>
            {f.name}
          </h2>

          <p className="flavor-text-el" style={{
            fontFamily: "Bebas Neue, sans-serif", fontSize: "clamp(0.6rem,1.1vw,0.8rem)",
            letterSpacing: "0.45em", color: "rgba(255,255,255,0.28)", marginBottom: "1.6rem",
          }}>
            {f.tagline}
          </p>

          <div className="flavor-text-el" style={{
            width: "50px", height: "1px",
            background: f.accent, boxShadow: `0 0 10px ${f.accent}`,
            marginBottom: "1.6rem",
          }} />

          <p className="flavor-text-el" style={{
            fontFamily: "Bebas Neue, sans-serif", fontSize: "clamp(0.8rem,1.3vw,1rem)",
            lineHeight: 1.85, letterSpacing: "0.06em",
            color: "rgba(255,255,255,0.4)", maxWidth: "380px", marginBottom: "2.2rem",
          }}>
            {f.copy}
          </p>

          {/* stats */}
          <div className="flavor-text-el" style={{ display: "flex", gap: "0", border: `1px solid ${f.accent}18` }}>
            {f.stats.map((s, si) => (
              <div key={s.label} style={{
                padding: "0.8rem 1.2rem",
                borderRight: si < f.stats.length - 1 ? `1px solid ${f.accent}18` : "none",
                background: "rgba(0,0,0,0.3)",
              }}>
                <div style={{
                  fontFamily: "Bebas Neue, sans-serif", fontSize: "clamp(1.2rem,2vw,1.8rem)",
                  color: f.accent, textShadow: `0 0 15px ${f.glow}`, lineHeight: 1,
                }}>
                  {s.val}
                </div>
                <div style={{
                  fontFamily: "Bebas Neue, sans-serif", fontSize: "0.55rem",
                  letterSpacing: "0.35em", color: "rgba(255,255,255,0.22)", marginTop: "3px",
                }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>

          {/* dots */}
          <div style={{ display: "flex", gap: "8px", marginTop: "2rem" }}>
            {flavors.map((fl, i) => (
              <div key={i} style={{
                width: i === current ? "32px" : "8px", height: "3px", borderRadius: "2px",
                background: i === current ? fl.accent : "rgba(255,255,255,0.12)",
                boxShadow:  i === current ? `0 0 8px ${fl.accent}` : "none",
                transition: "all 0.4s ease",
              }} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
