"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const timeline = [
  {
    year: "1935", era: "THE ROOT", heading: "HANSEN'S IS BORN",
    body: "Hubert Hansen and his sons begin selling fresh juice to film studios and retailers across Southern California. A modest start. A giant seed.",
    stat: { val: "1935", label: "FOUNDED" }, side: "left",
  },
  {
    year: "1977", era: "THE PIVOT", heading: "NATURAL SODAS",
    body: "Hansen's Natural Sodas launches, riding the health-conscious wave of the late '70s. The brand finds its groove in the alternative beverage space — setting the stage for something wilder.",
    stat: { val: "40+", label: "SKUs" }, side: "right",
  },
  {
    year: "1992", era: "THE SPARK", heading: "ENERGY CATEGORY IGNITES",
    body: "Red Bull launches in Austria and rewires the world's relationship with energy. Hansen's watches. Hansen's learns. Hansen's waits for its moment.",
    stat: { val: "1992", label: "THE CATALYST" }, side: "left",
  },
  {
    year: "2002", era: "YEAR ZERO", heading: "MONSTER IS UNLEASHED",
    body: "April 2002. Hansen Natural Corporation drops Monster Energy — a 16oz black can with a neon green claw mark. Twice the size of Red Bull. Half the price. The energy drink market would never recover.",
    stat: { val: "16OZ", label: "ORIGINAL SIZE" }, side: "right", highlight: true,
  },
  {
    year: "2006", era: "THE SPREAD", heading: "FLAVORS MULTIPLY",
    body: "Lo-Carb Monster, Assault, Khaos. Monster starts building a family — each variant targeting a different tribe. Athletes. Gamers. Rebels. The shelf real estate expands rapidly.",
    stat: { val: "5+", label: "VARIANTS" }, side: "left",
  },
  {
    year: "2012", era: "THE EMPIRE", heading: "ULTRA SERIES DROPS",
    body: "Monster Ultra White launches — zero sugar, crisp, clean. A new demographic enters. Monster stops being just a gas station drink and becomes a lifestyle statement.",
    stat: { val: "ZERO", label: "SUGAR" }, side: "right",
  },
  {
    year: "2015", era: "THE DEAL", heading: "COCA-COLA ALLIANCE",
    body: "Coca-Cola acquires a 16.7% stake in Monster Beverage Corporation for $2.15 billion. The rebel brand now has the world's largest distribution network behind it. Global domination unlocked.",
    stat: { val: "$2.15B", label: "INVESTMENT" }, side: "left", highlight: true,
  },
  {
    year: "2024", era: "THE NOW", heading: "40+ COUNTRIES. $7B+ REVENUE.",
    body: "Monster Beverage Corporation is one of the highest-performing stocks of the last two decades. From a juice truck in LA to a global cultural force — the beast is very much awake.",
    stat: { val: "#2", label: "ENERGY WORLDWIDE" }, side: "right",
  },
];

// ── helper: longhand animation style ────────────────────────────────────────
function anim(
  name: string,
  duration: string,
  delay = "0s",
  timing = "ease-in-out",
  count = "infinite"
): React.CSSProperties {
  return {
    animationName:           name,
    animationDuration:       duration,
    animationDelay:          delay,
    animationTimingFunction: timing,
    animationIterationCount: count,
  };
}

function GlitchYear({ year, active }: { year: string; active: boolean }) {
  const [glitch, setGlitch] = useState(false);
  useEffect(() => {
    if (!active) return;
    const id = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 100);
    }, 2200 + Math.random() * 1800);
    return () => clearInterval(id);
  }, [active]);

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <div style={{
        fontFamily:  "Bebas Neue, sans-serif",
        fontSize:    "clamp(2.5rem,4vw,3.5rem)",
        lineHeight:  0.9, letterSpacing: "0.05em",
        color:       active ? "#39ff14" : "rgba(255,255,255,0.1)",
        textShadow:  active ? "0 0 30px rgba(57,255,20,0.5)" : "none",
        filter:      glitch ? "drop-shadow(3px 0 0 #ff0040) drop-shadow(-3px 0 0 #00ffff)" : "none",
        transition:  glitch ? "none" : "filter 0.08s",
      }}>
        {year}
      </div>
      {glitch && (
        <div style={{
          position: "absolute", top: "2px", left: "3px",
          fontFamily:    "Bebas Neue, sans-serif",
          fontSize:      "clamp(2.5rem,4vw,3.5rem)",
          lineHeight:    0.9, letterSpacing: "0.05em",
          color:         "#ff0040", opacity: 0.4, pointerEvents: "none",
        }}>
          {year}
        </div>
      )}
    </div>
  );
}

function ReactorDot({ highlight, active }: { highlight?: boolean; active: boolean }) {
  return (
    <div style={{
      position: "relative", display: "flex",
      alignItems: "center", justifyContent: "center",
      width: "50px", height: "50px",
    }}>
      {/* Outer ring */}
      <div style={{
        position:     "absolute",
        width:        highlight ? "46px" : "28px",
        height:       highlight ? "46px" : "28px",
        borderRadius: "50%",
        border:       `1px solid rgba(57,255,20,${highlight ? 0.45 : 0.15})`,
        ...(active ? anim(`reactorOuter`, highlight ? "1.6s" : "2.4s") : {}),
      }} />
      {/* Mid ring */}
      <div style={{
        position:     "absolute",
        width:        highlight ? "30px" : "18px",
        height:       highlight ? "30px" : "18px",
        borderRadius: "50%",
        border:       `1px solid rgba(57,255,20,${highlight ? 0.65 : 0.25})`,
        ...(active ? anim("reactorMid", highlight ? "1.2s" : "1.8s", "0.3s") : {}),
      }} />
      {/* Core */}
      <div style={{
        width:        highlight ? "14px" : "8px",
        height:       highlight ? "14px" : "8px",
        borderRadius: "50%",
        background:   active ? (highlight ? "#39ff14" : "rgba(57,255,20,0.7)") : "rgba(57,255,20,0.2)",
        boxShadow:    active
          ? highlight
            ? "0 0 0 3px rgba(57,255,20,0.2),0 0 20px rgba(57,255,20,1),0 0 50px rgba(57,255,20,0.5)"
            : "0 0 0 2px rgba(57,255,20,0.1),0 0 12px rgba(57,255,20,0.8),0 0 30px rgba(57,255,20,0.3)"
          : "none",
        zIndex:      3,
        transition:  "all 0.4s ease",
        ...(active && highlight ? anim("reactorCore", "1s") : {}),
      }} />
      {/* Spark rays */}
      {highlight && active && [0,45,90,135,180,225,270,315].map((deg, i) => (
        <div key={deg} style={{
          position:        "absolute",
          width:           "1px",
          height:          `${8 + (i % 3) * 5}px`,
          background:      "linear-gradient(to top,rgba(57,255,20,0.9),transparent)",
          transform:       `rotate(${deg}deg) translateY(-${16 + (i % 2) * 6}px)`,
          transformOrigin: "bottom center",
          ...anim("sparkRay", `${0.75 + i * 0.1}s`, `${i * 0.09}s`),
        }} />
      ))}
    </div>
  );
}

function SpineCharge() {
  return (
    <>
      {[0,1,2,3].map((i) => (
        <div key={i} style={{
          position:     "absolute", left: "50%", top: 0,
          transform:    "translateX(-50%)",
          width:        "3px", height: "3px", borderRadius: "50%",
          background:   "#39ff14",
          boxShadow:    "0 0 6px 2px rgba(57,255,20,0.9),0 0 14px rgba(57,255,20,0.5)",
          pointerEvents:"none", zIndex: 4,
          ...anim("chargeTravel", `${3.2 + i * 0.75}s`, `${i * 0.8}s`, "linear"),
        }} />
      ))}
      {[0,1,2,3].map((i) => (
        <div key={`t${i}`} style={{
          position:     "absolute", left: "50%", top: 0,
          transform:    "translateX(-50%)",
          width:        "1px", height: "22px",
          background:   "linear-gradient(to bottom,rgba(57,255,20,0.6),transparent)",
          pointerEvents:"none", zIndex: 3,
          ...anim("chargeTravel", `${3.2 + i * 0.75}s`, `${i * 0.8 + 0.025}s`, "linear"),
        }} />
      ))}
    </>
  );
}

function ArcConnector({ side, highlight }: { side: "left" | "right"; highlight?: boolean }) {
  return (
    <div style={{
      position: "absolute", top: "1.85rem",
      left:  side === "right" ? "50%" : "auto",
      right: side === "left"  ? "50%" : "auto",
      width: "7%", height: "1px",
    }}>
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: "1px",
        background: highlight
          ? "linear-gradient(to right,rgba(57,255,20,0.7),rgba(57,255,20,0.1))"
          : "linear-gradient(to right,rgba(57,255,20,0.25),transparent)",
        ...(side === "left" ? { transform: "scaleX(-1)", transformOrigin: "right" } : {}),
      }} />
      {[0.25, 0.55, 0.82].map((pos, i) => (
        <div key={i} style={{
          position:     "absolute",
          left:         `${pos * 100}%`,
          top:          "-2px",
          width:        "2px", height: "2px", borderRadius: "50%",
          background:   highlight ? "#39ff14" : "rgba(57,255,20,0.6)",
          boxShadow:    highlight ? "0 0 4px rgba(57,255,20,1)" : "none",
          ...anim("arcDot", `${0.85 + i * 0.28}s`, `${i * 0.18}s`),
        }} />
      ))}
    </div>
  );
}

export default function History() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeCards, setActiveCards] = useState<Set<number>>(new Set());

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".history-heading", {
        scrollTrigger: { trigger: ".history-heading", start: "top 85%" },
        y: 80, opacity: 0, duration: 1.2, ease: "power4.out",
      });
      gsap.from(".history-sub", {
        scrollTrigger: { trigger: ".history-heading", start: "top 80%" },
        y: 20, opacity: 0, duration: 0.8, delay: 0.4, ease: "power3.out",
      });
      gsap.from(".timeline-line", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%", end: "bottom 80%", scrub: 1.5,
        },
        scaleY: 0, transformOrigin: "top center", ease: "none",
      });
      gsap.utils.toArray<HTMLElement>(".timeline-card").forEach((card, i) => {
        const isLeft = card.dataset.side === "left";
        gsap.from(card, {
          scrollTrigger: {
            trigger: card, start: "top 85%",
            onEnter: () => setActiveCards((prev) => new Set([...prev, i])),
          },
          x: isLeft ? -80 : 80, opacity: 0, duration: 0.9, ease: "power3.out",
        });
      });
      gsap.utils.toArray<HTMLElement>(".reactor-wrap").forEach((dot) => {
        gsap.from(dot, {
          scrollTrigger: { trigger: dot, start: "top 85%" },
          scale: 0, opacity: 0, duration: 0.6, ease: "back.out(2.5)",
        });
      });
      gsap.utils.toArray<HTMLElement>(".era-line").forEach((line) => {
        gsap.from(line, {
          scrollTrigger: { trigger: line, start: "top 88%" },
          scaleX: 0, transformOrigin: "left", duration: 0.6, ease: "power3.out",
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} style={{
      background:  "#070707",
      padding:     "8rem 0 10rem",
      position:    "relative",
      overflow:    "hidden",
      borderTop:   "1px solid rgba(57,255,20,0.08)",
    }}>
      {/* Noise */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`,
        backgroundSize: "256px 256px", opacity: 0.4, mixBlendMode: "overlay",
      }} />
      {/* Watermark */}
      <div style={{
        position:        "absolute", top: "50%", left: "50%",
        transform:       "translate(-50%,-50%)",
        fontFamily:      "Bebas Neue, sans-serif",
        fontSize:        "clamp(10rem,25vw,28rem)",
        color:           "transparent",
        WebkitTextStroke:"1px rgba(57,255,20,0.025)",
        lineHeight:      1, pointerEvents: "none", userSelect: "none",
        whiteSpace:      "nowrap", letterSpacing: "-0.03em",
      }}>
        LEGACY
      </div>
      {/* Scanlines */}
      <div style={{
        position:   "absolute", inset: 0,
        background: "repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(57,255,20,0.007) 3px,rgba(57,255,20,0.007) 4px)",
        pointerEvents: "none",
      }} />
      {/* Side rails */}
      {[15, 85].map((left, i) => (
        <div key={i} style={{
          position:   "absolute", top: 0, left: `${left}%`,
          width:      "1px", height: "100%",
          background: "linear-gradient(to bottom,transparent,rgba(57,255,20,0.04) 20%,rgba(57,255,20,0.04) 80%,transparent)",
          transform:  "skewX(-8deg)", pointerEvents: "none",
        }} />
      ))}

      {/* Heading */}
      <div className="history-heading" style={{
        textAlign: "center", padding: "0 1.5rem", marginBottom: "6rem",
      }}>
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "center",
          gap: "16px", marginBottom: "1.2rem",
        }}>
          <div style={{ width: "60px", height: "1px", background: "linear-gradient(to right,transparent,#39ff14)", boxShadow: "0 0 8px #39ff14" }} />
          <div style={{
            fontFamily: "Bebas Neue, sans-serif", fontSize: "clamp(0.55rem,1vw,0.72rem)",
            letterSpacing: "0.7em", color: "rgba(57,255,20,0.5)",
          }}>
            EST. 1935 · UNLEASHED 2002
          </div>
          <div style={{ width: "60px", height: "1px", background: "linear-gradient(to left,transparent,#39ff14)", boxShadow: "0 0 8px #39ff14" }} />
        </div>
        <h2 style={{
          fontFamily:    "Bebas Neue, sans-serif",
          fontSize:      "clamp(3.5rem,10vw,8rem)",
          lineHeight:    0.88, letterSpacing: "0.03em", color: "#fff",
          transform:     "skewX(-1deg)", display: "inline-block",
        }}>
          THE MAKING<br />
          <span style={{ color: "#39ff14", textShadow: "0 0 50px rgba(57,255,20,0.5),0 0 100px rgba(57,255,20,0.2)" }}>
            OF A BEAST
          </span>
        </h2>
        <div className="history-sub" style={{
          fontFamily:    "Bebas Neue, sans-serif",
          fontSize:      "clamp(0.7rem,1.4vw,0.9rem)",
          letterSpacing: "0.25em", color: "rgba(255,255,255,0.2)",
          margin:        "1.8rem auto 0", lineHeight: 1.9, maxWidth: "480px",
        }}>
          From a juice truck in Los Angeles to a $50 billion global empire. This is the timeline of Monster Energy.
        </div>
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "center",
          gap: "2rem", marginTop: "2.5rem", flexWrap: "wrap",
        }}>
          {[["89","YEARS"],["40+","COUNTRIES"],["$7B+","REVENUE"],["#2","WORLDWIDE"]].map(([val,label]) => (
            <div key={label} style={{ textAlign: "center" }}>
              <div style={{
                fontFamily:  "Bebas Neue, sans-serif",
                fontSize:    "clamp(1.4rem,2.5vw,2rem)",
                color:       "#39ff14",
                textShadow:  "0 0 20px rgba(57,255,20,0.4)",
                lineHeight:  1,
              }}>
                {val}
              </div>
              <div style={{
                fontFamily:    "Bebas Neue, sans-serif",
                fontSize:      "0.5rem",
                letterSpacing: "0.45em",
                color:         "rgba(255,255,255,0.18)",
                marginTop:     "3px",
              }}>
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Timeline */}
      <div style={{ position: "relative", maxWidth: "1000px", margin: "0 auto", padding: "0 1.5rem" }}>

        {/* Energy Spine */}
        <div className="timeline-line" style={{
          position:  "absolute", left: "50%", top: 0, bottom: 0,
          transform: "translateX(-50%)",
          width:     "3px",
          background:"linear-gradient(to bottom,transparent,rgba(57,255,20,0.06) 5%,rgba(57,255,20,0.2) 15%,rgba(57,255,20,0.2) 85%,rgba(57,255,20,0.06) 95%,transparent)",
          boxShadow: "0 0 10px rgba(57,255,20,0.14),0 0 24px rgba(57,255,20,0.06)",
          zIndex:    1,
        }}>
          <div style={{
            position:   "absolute", left: "1px", top: 0, bottom: 0, width: "1px",
            background: "linear-gradient(to bottom,transparent,rgba(57,255,20,0.7) 15%,rgba(57,255,20,0.7) 85%,transparent)",
            ...anim("spineBreath", "2.8s"),
          }} />
          <SpineCharge />
          {[22,48,74].map((pct, i) => (
            <div key={i} style={{
              position:     "absolute", left: "50%", top: `${pct}%`,
              transform:    "translate(-50%,-50%)",
              width:        "5px", height: "5px", borderRadius: "50%",
              background:   "rgba(57,255,20,0.7)",
              boxShadow:    "0 0 8px rgba(57,255,20,0.9),0 0 22px rgba(57,255,20,0.4)",
              zIndex:       5,
              ...anim("flareNode", `${1.4 + i * 0.4}s`, `${i * 0.5}s`),
            }} />
          ))}
        </div>

        {timeline.map((item, i) => (
          <div key={item.year}
            className="timeline-card"
          style={{
            display:        "flex",
            justifyContent: item.side === "left" ? "flex-start" : "flex-end",
            marginBottom:   "4.5rem",
            position:       "relative",
          }}>
            {/* Reactor dot */}
            <div className="reactor-wrap" style={{
              position:  "absolute", left: "50%", top: "2rem",
              transform: "translate(-50%,-50%)", zIndex: 6,
            }}>
              <ReactorDot highlight={item.highlight} active={activeCards.has(i)} />
            </div>

            <ArcConnector side={item.side as "left" | "right"} highlight={item.highlight} />

            {/* Card */}
            <div
              className="timeline-card"
              data-side={item.side}
              style={{
                width:      "44%",
                padding:    "2rem 2rem 1.8rem",
                background: item.highlight ? "rgba(57,255,20,0.04)" : "rgba(255,255,255,0.015)",
                border:     `1px solid ${item.highlight ? "rgba(57,255,20,0.25)" : "rgba(255,255,255,0.05)"}`,
                borderRadius: "1px",
                position:   "relative",
                overflow:   "hidden",
              }}
              onMouseEnter={(e) => {
                gsap.to(e.currentTarget, { borderColor: "rgba(57,255,20,0.35)", background: "rgba(57,255,20,0.07)", duration: 0.25 });
                const shine = e.currentTarget.querySelector<HTMLElement>(".card-shine");
                if (shine) gsap.to(shine, { opacity: 1, duration: 0.25 });
              }}
              onMouseLeave={(e) => {
                gsap.to(e.currentTarget, {
                  borderColor: item.highlight ? "rgba(57,255,20,0.25)" : "rgba(255,255,255,0.05)",
                  background:  item.highlight ? "rgba(57,255,20,0.04)" : "rgba(255,255,255,0.015)",
                  duration:    0.25,
                });
                const shine = e.currentTarget.querySelector<HTMLElement>(".card-shine");
                if (shine) gsap.to(shine, { opacity: 0, duration: 0.25 });
              }}
            >
              {item.highlight && (
                <div style={{
                  position:   "absolute", top: 0, left: 0, right: 0, height: "2px",
                  background: "linear-gradient(to right,transparent,#39ff14 30%,#39ff14 70%,transparent)",
                  boxShadow:  "0 0 12px rgba(57,255,20,0.6)",
                }} />
              )}
              <div style={{
                position:   "absolute",
                left:       item.side === "left" ? 0 : "auto",
                right:      item.side === "right" ? 0 : "auto",
                top:        0, bottom: 0, width: "2px",
                background: item.highlight
                  ? "linear-gradient(to bottom,transparent,#39ff14 30%,#39ff14 70%,transparent)"
                  : "linear-gradient(to bottom,transparent,rgba(57,255,20,0.15) 30%,rgba(57,255,20,0.15) 70%,transparent)",
                boxShadow: item.highlight ? "0 0 8px rgba(57,255,20,0.4)" : "none",
              }} />
              <div className="card-shine" style={{
                position:   "absolute", inset: 0,
                background: "linear-gradient(135deg,rgba(57,255,20,0.04) 0%,transparent 50%)",
                opacity:    0, pointerEvents: "none",
              }} />
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "0.8rem" }}>
                <div className="era-line" style={{
                  width:     "20px", height: "1px",
                  background:item.highlight ? "#39ff14" : "rgba(57,255,20,0.3)",
                  boxShadow: item.highlight ? "0 0 6px #39ff14" : "none",
                }} />
                <div style={{
                  fontFamily:    "Bebas Neue, sans-serif", fontSize: "0.55rem",
                  letterSpacing: "0.55em",
                  color:         item.highlight ? "rgba(57,255,20,0.7)" : "rgba(57,255,20,0.35)",
                }}>
                  {item.era}
                </div>
              </div>
              <GlitchYear year={item.year} active={activeCards.has(i)} />
              <h3 style={{
                fontFamily:    "Bebas Neue, sans-serif",
                fontSize:      "clamp(1rem,1.8vw,1.4rem)",
                letterSpacing: "0.1em", color: "#fff",
                marginBottom:  "0.7rem", lineHeight: 1.15, marginTop: "0.4rem",
              }}>
                {item.heading}
              </h3>
              <div style={{
                width:     "28px", height: "1px",
                background:item.highlight ? "#39ff14" : "rgba(255,255,255,0.12)",
                boxShadow: item.highlight ? "0 0 6px #39ff14" : "none",
                marginBottom: "0.8rem",
              }} />
              <p style={{
                fontFamily:    "Bebas Neue, sans-serif",
                fontSize:      "clamp(0.72rem,1vw,0.85rem)",
                letterSpacing: "0.06em", lineHeight: 1.95,
                color:         "rgba(255,255,255,0.3)", marginBottom: "1.4rem",
              }}>
                {item.body}
              </p>
              <div style={{
                display:    "inline-flex", alignItems: "center", gap: "10px",
                padding:    "5px 14px",
                border:     `1px solid ${item.highlight ? "rgba(57,255,20,0.3)" : "rgba(57,255,20,0.12)"}`,
                borderRadius:"1px",
                background: item.highlight ? "rgba(57,255,20,0.06)" : "transparent",
                boxShadow:  item.highlight ? "0 0 14px rgba(57,255,20,0.1)" : "none",
              }}>
                <span style={{
                  fontFamily:  "Bebas Neue, sans-serif",
                  fontSize:    "clamp(0.9rem,1.4vw,1.1rem)",
                  color:       "#39ff14",
                  textShadow:  item.highlight ? "0 0 12px rgba(57,255,20,0.6)" : "none",
                  letterSpacing:"0.05em",
                }}>
                  {item.stat.val}
                </span>
                <span style={{
                  fontFamily:    "Bebas Neue, sans-serif", fontSize: "0.5rem",
                  letterSpacing: "0.35em", color: "rgba(255,255,255,0.18)",
                }}>
                  {item.stat.label}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* End marker */}
      <div style={{ textAlign: "center", marginTop: "2rem" }}>
        <div style={{
          display:       "inline-flex", alignItems: "center", gap: "1.2rem",
          fontFamily:    "Bebas Neue, sans-serif", fontSize: "0.6rem",
          letterSpacing: "0.55em", color: "rgba(57,255,20,0.3)",
        }}>
          <div style={{ width: "50px", height: "1px", background: "linear-gradient(to right,transparent,rgba(57,255,20,0.3))" }} />
          THE STORY CONTINUES
          <div style={{ width: "50px", height: "1px", background: "linear-gradient(to left,transparent,rgba(57,255,20,0.3))" }} />
        </div>
      </div>

      <style>{`
        @keyframes chargeTravel {
          0%   { top:-4px;  opacity:0; }
          5%   { opacity:1; }
          95%  { opacity:1; }
          100% { top:100%;  opacity:0; }
        }
        @keyframes spineBreath {
          0%,100% { opacity:0.5; }
          50%     { opacity:1;   }
        }
        @keyframes flareNode {
          0%,100% { transform:translate(-50%,-50%) scale(1);  opacity:0.5; }
          50%     { transform:translate(-50%,-50%) scale(2);  opacity:1;
                    box-shadow:0 0 14px rgba(57,255,20,1),0 0 35px rgba(57,255,20,0.5); }
        }
        @keyframes reactorOuter {
          0%,100% { transform:scale(1);    opacity:0.3; }
          50%     { transform:scale(1.15); opacity:0.7; }
        }
        @keyframes reactorMid {
          0%,100% { transform:scale(1);    opacity:0.4; }
          50%     { transform:scale(1.22); opacity:0.9; }
        }
        @keyframes reactorCore {
          0%,100% { box-shadow:0 0 0 3px rgba(57,255,20,0.2),0 0 20px rgba(57,255,20,1),0 0 50px rgba(57,255,20,0.5); }
          50%     { box-shadow:0 0 0 6px rgba(57,255,20,0.1),0 0 36px rgba(57,255,20,1),0 0 90px rgba(57,255,20,0.6); }
        }
        @keyframes sparkRay {
          0%,100% { opacity:0.2; }
          50%     { opacity:0.9; }
        }
        @keyframes arcDot {
          0%,100% { opacity:0.1; transform:translateY(0);   }
          50%     { opacity:1;   transform:translateY(-2px); }
        }
      `}</style>
    </section>
  );
}