"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function Hero() {
  const canRef   = useRef<HTMLImageElement>(null);
  const glowRef  = useRef<HTMLDivElement>(null);
  const glowRef2 = useRef<HTMLDivElement>(null);
  const [glitch, setGlitch] = useState(false);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    tl.from(".hero-eyebrow",    { y: 30,  opacity: 0, duration: 0.6, delay: 0.1 })
      .from(".hero-line-1",     { y: 140, opacity: 0, duration: 1.1 }, "-=0.3")
      .from(".hero-line-2",     { y: 140, opacity: 0, duration: 1.0 }, "-=0.8")
      .from(".hero-line-3",     { y: 140, opacity: 0, duration: 1.0 }, "-=0.8")
      .from(canRef.current,     { y: 220, opacity: 0, rotation: -40, scale: 0.75, duration: 1.8, ease: "power3.out" }, "-=1.2")
      .from(".hero-divider",    { scaleX: 0, duration: 0.8, ease: "power3.out" }, "-=0.4")
      .from(".hero-tag",        { y: 20, opacity: 0, stagger: 0.06, duration: 0.5 }, "-=0.4")
      .from(".hero-stat-block", { y: 30, opacity: 0, stagger: 0.08, duration: 0.5 }, "-=0.3")
      .from(".hero-scroll-cue", { opacity: 0, duration: 0.6 }, "-=0.2");

    gsap.to(canRef.current, { y: -30, duration: 3.2, ease: "sine.inOut", yoyo: true, repeat: -1 });
    gsap.to(glowRef.current,  { scale: 1.25, opacity: 0.65, duration: 3,   ease: "sine.inOut", yoyo: true, repeat: -1 });
    gsap.to(glowRef2.current, { scale: 0.85, opacity: 0.4,  duration: 4,   ease: "sine.inOut", yoyo: true, repeat: -1, delay: 1.5 });

    const handleMouse = (e: MouseEvent) => {
      const nx = e.clientX / window.innerWidth  - 0.5;
      const ny = e.clientY / window.innerHeight - 0.5;
      gsap.to(canRef.current,  { rotationY: nx * 22, rotationX: ny * -12, duration: 0.7, ease: "power2.out" });
      gsap.to(glowRef.current, { x: nx * 30, y: ny * 20, duration: 1, ease: "power2.out" });
    };
    window.addEventListener("mousemove", handleMouse);

    const interval = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 130);
    }, 4500);

    return () => { window.removeEventListener("mousemove", handleMouse); clearInterval(interval); };
  }, []);

  const stats = [
    { val: "160",  unit: "MG", label: "CAFFEINE"  },
    { val: "2002", unit: "",   label: "FOUNDED"    },
    { val: "40+",  unit: "",   label: "COUNTRIES"  },
    { val: "$7B",  unit: "+",  label: "REVENUE"    },
  ];

  return (
    <section style={{
      minHeight: "100vh", display: "grid", gridTemplateColumns: "1fr 1fr",
      alignItems: "center", position: "relative", overflow: "hidden",
      background: "#0a0a0a", padding: "0 5vw", gap: "0",
    }}>

      {/* glows */}
      <div ref={glowRef} style={{
        position: "absolute", right: "5%", top: "40%", transform: "translateY(-50%)",
        width: "clamp(400px,65vw,800px)", height: "clamp(400px,65vw,800px)",
        borderRadius: "50%", background: "radial-gradient(circle,rgba(57,255,20,0.1) 0%,transparent 65%)",
        pointerEvents: "none",
      }} />
      <div ref={glowRef2} style={{
        position: "absolute", right: "20%", top: "60%",
        width: "clamp(200px,30vw,400px)", height: "clamp(200px,30vw,400px)",
        borderRadius: "50%", background: "radial-gradient(circle,rgba(57,255,20,0.07) 0%,transparent 70%)",
        pointerEvents: "none",
      }} />

      {/* scanlines */}
      <div style={{
        position: "absolute", inset: 0,
        background: "repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(57,255,20,0.012) 2px,rgba(57,255,20,0.012) 3px)",
        pointerEvents: "none", zIndex: 0,
      }} />

      {/* corner brackets */}
      {(["topLeft","topRight","bottomLeft","bottomRight"] as const).map((pos) => (
        <div key={pos} style={{
          position: "absolute",
          ...(pos.includes("top")    ? { top:    "1.5rem" } : { bottom: "1.5rem" }),
          ...(pos.includes("Left")   ? { left:   "1.5rem" } : { right:  "1.5rem" }),
          width: "24px", height: "24px",
          borderTop:    pos.includes("top")    ? "1px solid rgba(57,255,20,0.3)" : "none",
          borderBottom: pos.includes("bottom") ? "1px solid rgba(57,255,20,0.3)" : "none",
          borderLeft:   pos.includes("Left")   ? "1px solid rgba(57,255,20,0.3)" : "none",
          borderRight:  pos.includes("Right")  ? "1px solid rgba(57,255,20,0.3)" : "none",
        }} />
      ))}

      {/* LEFT — text */}
      <div style={{ zIndex: 1, position: "relative", paddingRight: "2vw" }}>
        <div className="hero-eyebrow" style={{
          fontFamily: "Bebas Neue, sans-serif", fontSize: "clamp(0.6rem,1vw,0.75rem)",
          letterSpacing: "0.6em", color: "rgba(57,255,20,0.5)", marginBottom: "1.2rem",
          display: "flex", alignItems: "center", gap: "12px",
        }}>
          <div style={{ width: "20px", height: "1px", background: "#39ff14", boxShadow: "0 0 6px #39ff14" }} />
          EST. 2002 · MONSTER ENERGY
          <div style={{ width: "20px", height: "1px", background: "#39ff14", boxShadow: "0 0 6px #39ff14" }} />
        </div>

        {[
          { text: "UNLEASH", cls: "hero-line-1", color: "#39ff14",     shadow: "0 0 60px rgba(57,255,20,0.6)", stroke: "none"         },
          { text: "THE",     cls: "hero-line-2", color: "#fff",        shadow: "none",                          stroke: "none"         },
          { text: "BEAST",   cls: "hero-line-3", color: "transparent", shadow: "none",                          stroke: "2px #39ff14"  },
        ].map(({ text, cls, color, shadow, stroke }) => (
          <div key={text} style={{ overflow: "hidden", lineHeight: 0.92 }}>
            <div className={cls} style={{
              fontFamily: "Bebas Neue, sans-serif", fontSize: "clamp(4rem,10.5vw,10rem)",
              letterSpacing: "0.02em", color, textShadow: shadow, WebkitTextStroke: stroke,
              filter: glitch && text === "BEAST"
                ? "drop-shadow(3px 0 0 #ff0040) drop-shadow(-3px 0 0 #00ffff)" : "none",
              transition: glitch ? "none" : "filter 0.1s",
            }}>
              {text}
            </div>
          </div>
        ))}

        <div className="hero-divider" style={{
          width: "100px", height: "2px",
          background: "linear-gradient(to right,#39ff14,transparent)",
          margin: "2.2rem 0", boxShadow: "0 0 12px rgba(57,255,20,0.6)",
          transformOrigin: "left",
        }} />

        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "2.5rem" }}>
          {["160MG CAFFEINE","TAURINE","B-VITAMINS","ZERO SUGAR OPTION","ZERO APOLOGIES"].map((tag) => (
            <div key={tag} className="hero-tag" style={{
              fontFamily: "Bebas Neue, sans-serif", fontSize: "0.6rem",
              letterSpacing: "0.3em", color: "rgba(57,255,20,0.6)",
              border: "1px solid rgba(57,255,20,0.15)", padding: "4px 10px", borderRadius: "2px",
            }}>
              {tag}
            </div>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1px", border: "1px solid rgba(57,255,20,0.1)", maxWidth: "380px" }}>
          {stats.map((s) => (
            <div key={s.label} className="hero-stat-block" style={{
              padding: "1rem 1.2rem", background: "rgba(57,255,20,0.02)",
              borderRight: "1px solid rgba(57,255,20,0.08)", borderBottom: "1px solid rgba(57,255,20,0.08)",
            }}>
              <div style={{
                fontFamily: "Bebas Neue, sans-serif", fontSize: "clamp(1.6rem,2.5vw,2.2rem)",
                color: "#39ff14", textShadow: "0 0 15px rgba(57,255,20,0.4)", lineHeight: 1,
              }}>
                {s.val}<span style={{ fontSize: "0.55em", opacity: 0.6 }}>{s.unit}</span>
              </div>
              <div style={{
                fontFamily: "Bebas Neue, sans-serif", fontSize: "0.58rem",
                letterSpacing: "0.35em", color: "rgba(255,255,255,0.25)", marginTop: "3px",
              }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT — can */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "center",
        zIndex: 1, perspective: "1400px", position: "relative",
      }}>
        <div style={{ position: "absolute", width: "clamp(280px,38vw,480px)", height: "clamp(280px,38vw,480px)", borderRadius: "50%", border: "1px solid rgba(57,255,20,0.06)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", width: "clamp(340px,48vw,580px)", height: "clamp(340px,48vw,580px)", borderRadius: "50%", border: "1px solid rgba(57,255,20,0.03)", pointerEvents: "none" }} />
        <img
          ref={canRef}
          src="/cans/green.png"
          alt="Monster Energy"
          style={{
            width: "clamp(260px,38vw,460px)", height: "auto", objectFit: "contain",
            transform: "rotate(-15deg)", zIndex: 1,
            filter: "drop-shadow(0 45px 65px rgba(0,0,0,0.55)) drop-shadow(0 18px 32px rgba(57,255,20,0.2)) contrast(1.08) saturate(1.08)",
            transformStyle: "preserve-3d",
            backfaceVisibility: "hidden",
            willChange: "transform, filter",
          }}
        />
      </div>

      {/* scroll cue */}
      <div className="hero-scroll-cue" style={{
        position: "absolute", bottom: "2.5vh", left: "50%", transform: "translateX(-50%)",
        display: "flex", flexDirection: "column", alignItems: "center", gap: "6px",
      }}>
        <div style={{ fontFamily: "Bebas Neue, sans-serif", fontSize: "0.6rem", letterSpacing: "0.6em", color: "rgba(255,255,255,0.15)" }}>
          SCROLL
        </div>
        <div style={{ width: "1px", height: "50px", background: "linear-gradient(to bottom,rgba(57,255,20,0.6),transparent)", animation: "scrollPulse 2s ease-in-out infinite" }} />
      </div>

      <style>{`
        @keyframes scrollPulse { 0%,100%{opacity:0.3}50%{opacity:1} }
        @media(max-width:768px){section{grid-template-columns:1fr!important;padding:5rem 1.5rem 3rem!important}}
      `}</style>
    </section>
  );
}
