"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    number: "01", label: "160MG", unit: "PER CAN", desc: "CAFFEINE",
    detail: "More than a double espresso. Engineered for the long haul, not the faint-hearted. Every sip is a decision.",
  },
  {
    number: "02", label: "TAURINE", unit: "2000MG", desc: "AMINO ACID",
    detail: "Keeps your mind razor-sharp when everything else is going sideways. The backbone of the formula.",
  },
  {
    number: "03", label: "B-COMPLEX", unit: "4 TYPES", desc: "ENERGY VITAMINS",
    detail: "B3, B6, B12, B5. The full arsenal. Your metabolism's best friend. Science dressed in a black can.",
  },
  {
    number: "04", label: "ZERO", unit: "EXCUSES", desc: "COMPROMISE",
    detail: "Ultra White proves you can have it all. Zero sugar. Zero calories. Full Monster. No apologies.",
  },
];

export default function Details() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".details-heading-line", {
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        y: 100, opacity: 0, duration: 1.1, stagger: 0.1, ease: "power4.out",
      });
      gsap.from(".ingredient-card", {
        scrollTrigger: { trigger: sectionRef.current, start: "top 65%" },
        y: 70, opacity: 0, stagger: 0.1, duration: 0.85, ease: "power3.out",
      });
      gsap.from(".bottom-strip", {
        scrollTrigger: { trigger: ".bottom-strip", start: "top 90%" },
        y: 40, opacity: 0, duration: 0.9, ease: "power3.out",
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} style={{
      minHeight: "100vh", display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      padding: "7rem 5vw", background: "#0a0a0a",
      borderTop: "1px solid rgba(57,255,20,0.08)",
      position: "relative", overflow: "hidden",
    }}>

      {/* watermark */}
      <div style={{
        position: "absolute", bottom: "-6rem", left: "-2rem",
        fontFamily: "Bebas Neue, sans-serif",
        fontSize: "clamp(8rem,20vw,22rem)", color: "transparent",
        WebkitTextStroke: "1px rgba(57,255,20,0.04)", lineHeight: 1,
        pointerEvents: "none", userSelect: "none", letterSpacing: "-0.02em",
      }}>
        MONSTER
      </div>

      <div style={{ textAlign: "center", marginBottom: "5rem" }}>
        <div className="details-heading-line" style={{
          fontFamily: "Bebas Neue, sans-serif", fontSize: "clamp(0.6rem,1.2vw,0.8rem)",
          letterSpacing: "0.6em", color: "rgba(57,255,20,0.4)", marginBottom: "0.8rem",
        }}>
          FORMULA BREAKDOWN
        </div>
        <div style={{ overflow: "hidden" }}>
          <h2 className="details-heading-line" style={{
            fontFamily: "Bebas Neue, sans-serif",
            fontSize: "clamp(3rem,9vw,7.5rem)", letterSpacing: "0.03em",
            lineHeight: 0.9, color: "#fff",
          }}>
            WHAT&apos;S<br />
            <span style={{ color: "#39ff14", textShadow: "0 0 40px rgba(57,255,20,0.5)" }}>INSIDE</span>
          </h2>
        </div>
      </div>

      <div style={{
        display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
        gap: "1px", width: "100%", maxWidth: "1100px",
        border: "1px solid rgba(57,255,20,0.1)",
      }}>
        {features.map((f, i) => (
          <div
            key={f.label}
            className="ingredient-card"
            style={{
              padding: "2.5rem 2rem", background: "rgba(57,255,20,0.02)",
              borderRight: i < features.length - 1 ? "1px solid rgba(57,255,20,0.1)" : "none",
              cursor: "default", position: "relative", overflow: "hidden",
              transition: "background 0.3s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(57,255,20,0.06)";
              const glow = e.currentTarget.querySelector<HTMLElement>(".card-glow");
              if (glow) gsap.to(glow, { opacity: 1, scale: 1.2, duration: 0.4 });
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(57,255,20,0.02)";
              const glow = e.currentTarget.querySelector<HTMLElement>(".card-glow");
              if (glow) gsap.to(glow, { opacity: 0, scale: 1, duration: 0.4 });
            }}
          >
            <div className="card-glow" style={{
              position: "absolute", top: "-50%", left: "-50%", width: "200%", height: "200%",
              background: "radial-gradient(circle at 50% 50%,rgba(57,255,20,0.08) 0%,transparent 60%)",
              opacity: 0, pointerEvents: "none", borderRadius: "50%",
            }} />
            <div style={{ fontFamily: "Bebas Neue, sans-serif", fontSize: "0.6rem", letterSpacing: "0.4em", color: "rgba(57,255,20,0.3)", marginBottom: "1.5rem" }}>{f.number}</div>
            <div style={{ fontFamily: "Bebas Neue, sans-serif", fontSize: "clamp(1.8rem,3.5vw,2.8rem)", lineHeight: 1, color: "#39ff14", textShadow: "0 0 20px rgba(57,255,20,0.3)", letterSpacing: "0.05em" }}>{f.label}</div>
            <div style={{ fontFamily: "Bebas Neue, sans-serif", fontSize: "0.6rem", letterSpacing: "0.4em", color: "rgba(57,255,20,0.4)", margin: "4px 0 6px" }}>{f.unit}</div>
            <div style={{ fontFamily: "Bebas Neue, sans-serif", fontSize: "clamp(0.9rem,1.6vw,1.1rem)", letterSpacing: "0.15em", color: "rgba(255,255,255,0.65)", marginBottom: "1rem" }}>{f.desc}</div>
            <div style={{ width: "24px", height: "1px", background: "rgba(57,255,20,0.3)", marginBottom: "0.8rem" }} />
            <p style={{ fontFamily: "Bebas Neue, sans-serif", fontSize: "0.75rem", letterSpacing: "0.08em", lineHeight: 1.75, color: "rgba(255,255,255,0.25)" }}>{f.detail}</p>
          </div>
        ))}
      </div>

      <div className="bottom-strip" style={{
        marginTop: "4rem", display: "flex", alignItems: "center",
        gap: "2.5rem", flexWrap: "wrap", justifyContent: "center",
      }}>
        <div style={{ fontFamily: "Bebas Neue, sans-serif", fontSize: "clamp(0.8rem,1.5vw,1.1rem)", letterSpacing: "0.3em", color: "rgba(255,255,255,0.18)" }}>
          AVAILABLE IN 4 FLAVORS
        </div>
        <div style={{ width: "1px", height: "28px", background: "rgba(57,255,20,0.15)" }} />
        <div style={{ display: "flex", gap: "10px" }}>
          {[["#39ff14","GREEN"],["#ff8c00","MANGO"],["#64c8ff","WHITE"],["#b400ff","PUNCH"]].map(([color, name]) => (
            <div key={name} title={name} style={{
              width: "10px", height: "10px", borderRadius: "50%",
              background: color, boxShadow: `0 0 10px ${color}`,
            }} />
          ))}
        </div>
        <div style={{ width: "1px", height: "28px", background: "rgba(57,255,20,0.15)" }} />
        <div style={{ fontFamily: "Bebas Neue, sans-serif", fontSize: "clamp(0.8rem,1.5vw,1.1rem)", letterSpacing: "0.3em", color: "rgba(255,255,255,0.18)" }}>
          ZERO COMPROMISE
        </div>
      </div>
    </section>
  );
}