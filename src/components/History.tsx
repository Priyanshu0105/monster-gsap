"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const timeline = [
  {
    year:    "1935",
    era:     "THE ROOT",
    heading: "HANSEN'S IS BORN",
    body:    "Hubert Hansen and his sons begin selling fresh juice to film studios and retailers across Southern California. A modest start. A giant seed.",
    stat:    { val: "1935", label: "FOUNDED" },
    side:    "left",
  },
  {
    year:    "1977",
    era:     "THE PIVOT",
    heading: "NATURAL SODAS",
    body:    "Hansen's Natural Sodas launches, riding the health-conscious wave of the late '70s. The brand finds its groove in the alternative beverage space — setting the stage for something wilder.",
    stat:    { val: "40+", label: "SKUs" },
    side:    "right",
  },
  {
    year:    "1992",
    era:     "THE SPARK",
    heading: "ENERGY CATEGORY IGNITES",
    body:    "Red Bull launches in Austria and rewires the world's relationship with energy. Hansen's watches. Hansen's learns. Hansen's waits for its moment.",
    stat:    { val: "1992", label: "THE CATALYST" },
    side:    "left",
  },
  {
    year:    "2002",
    era:     "YEAR ZERO",
    heading: "MONSTER IS UNLEASHED",
    body:    "April 2002. Hansen Natural Corporation drops Monster Energy — a 16oz black can with a neon green claw mark. Twice the size of Red Bull. Half the price. The energy drink market would never recover.",
    stat:    { val: "16OZ", label: "ORIGINAL SIZE" },
    side:    "right",
    highlight: true,
  },
  {
    year:    "2006",
    era:     "THE SPREAD",
    heading: "FLAVORS MULTIPLY",
    body:    "Lo-Carb Monster, Assault, Khaos. Monster starts building a family — each variant targeting a different tribe. Athletes. Gamers. Rebels. The shelf real estate expands rapidly.",
    stat:    { val: "5+", label: "VARIANTS" },
    side:    "left",
  },
  {
    year:    "2012",
    era:     "THE EMPIRE",
    heading: "ULTRA SERIES DROPS",
    body:    "Monster Ultra White launches — zero sugar, crisp, clean. A new demographic enters. Monster stops being just a gas station drink and becomes a lifestyle statement.",
    stat:    { val: "ZERO", label: "SUGAR" },
    side:    "right",
  },
  {
    year:    "2015",
    era:     "THE DEAL",
    heading: "COCA-COLA ALLIANCE",
    body:    "Coca-Cola acquires a 16.7% stake in Monster Beverage Corporation for $2.15 billion. The rebel brand now has the world's largest distribution network behind it. Global domination unlocked.",
    stat:    { val: "$2.15B", label: "INVESTMENT" },
    side:    "left",
    highlight: true,
  },
  {
    year:    "2024",
    era:     "THE NOW",
    heading: "40+ COUNTRIES. $7B+ REVENUE.",
    body:    "Monster Beverage Corporation is one of the highest-performing stocks of the last two decades. From a juice truck in LA to a global cultural force — the beast is very much awake.",
    stat:    { val: "#2", label: "ENERGY WORLDWIDE" },
    side:    "right",
  },
];

export default function History() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // heading
      gsap.from(".history-heading", {
        scrollTrigger: { trigger: ".history-heading", start: "top 85%" },
        y: 80, opacity: 0, duration: 1.2, ease: "power4.out",
      });

      // vertical line draw
      gsap.from(".timeline-line", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
          end:   "bottom 80%",
          scrub: 1.5,
        },
        scaleY:       0,
        transformOrigin: "top center",
        ease:         "none",
      });

      // each card
      gsap.utils.toArray<HTMLElement>(".timeline-card").forEach((card) => {
        const isLeft = card.dataset.side === "left";
        gsap.from(card, {
          scrollTrigger: { trigger: card, start: "top 85%" },
          x:       isLeft ? -70 : 70,
          opacity: 0,
          duration: 0.85,
          ease:    "power3.out",
        });
      });

      // year markers
      gsap.utils.toArray<HTMLElement>(".year-dot").forEach((dot) => {
        gsap.from(dot, {
          scrollTrigger: { trigger: dot, start: "top 85%" },
          scale:   0,
          opacity: 0,
          duration: 0.5,
          ease:    "back.out(2)",
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        background:  "#0a0a0a",
        padding:     "8rem 0 10rem",
        position:    "relative",
        overflow:    "hidden",
        borderTop:   "1px solid rgba(57,255,20,0.08)",
      }}
    >
      {/* giant watermark */}
      <div style={{
        position:         "absolute",
        top:              "50%",
        left:             "50%",
        transform:        "translate(-50%, -50%)",
        fontFamily:       "Bebas Neue, sans-serif",
        fontSize:         "clamp(10rem, 25vw, 28rem)",
        color:            "transparent",
        WebkitTextStroke: "1px rgba(57,255,20,0.03)",
        lineHeight:       1,
        pointerEvents:    "none",
        userSelect:       "none",
        whiteSpace:       "nowrap",
        letterSpacing:    "-0.03em",
      }}>
        LEGACY
      </div>

      {/* scan lines */}
      <div style={{
        position:      "absolute",
        inset:         0,
        background:    "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(57,255,20,0.008) 3px, rgba(57,255,20,0.008) 4px)",
        pointerEvents: "none",
      }} />

      {/* heading */}
      <div className="history-heading" style={{ textAlign: "center", padding: "0 1.5rem", marginBottom: "6rem" }}>
        <div style={{
          fontFamily:    "Bebas Neue, sans-serif",
          fontSize:      "clamp(0.6rem, 1.2vw, 0.8rem)",
          letterSpacing: "0.6em",
          color:         "rgba(57,255,20,0.4)",
          marginBottom:  "1rem",
        }}>
          EST. 1935 · UNLEASHED 2002
        </div>
        <h2 style={{
          fontFamily:    "Bebas Neue, sans-serif",
          fontSize:      "clamp(3.5rem, 10vw, 8rem)",
          lineHeight:    0.9,
          letterSpacing: "0.03em",
          color:         "#fff",
        }}>
          THE MAKING<br />
          <span style={{ color: "#39ff14", textShadow: "0 0 50px rgba(57,255,20,0.4)" }}>OF A BEAST</span>
        </h2>
        <p style={{
          fontFamily:    "Bebas Neue, sans-serif",
          fontSize:      "clamp(0.75rem, 1.5vw, 0.95rem)",
          letterSpacing: "0.2em",
          color:         "rgba(255,255,255,0.25)",
          marginTop:     "1.5rem",
          maxWidth:      "480px",
          margin:        "1.5rem auto 0",
          lineHeight:    1.8,
        }}>
          From a juice truck in Los Angeles to a $50 billion global empire.
          This is the timeline of Monster Energy.
        </p>
      </div>

      {/* timeline */}
      <div style={{
        position:  "relative",
        maxWidth:  "1000px",
        margin:    "0 auto",
        padding:   "0 1.5rem",
      }}>
        {/* vertical line */}
        <div
          className="timeline-line"
          style={{
            position:   "absolute",
            left:       "50%",
            top:        0,
            bottom:     0,
            width:      "1px",
            background: "linear-gradient(to bottom, transparent, rgba(57,255,20,0.3) 10%, rgba(57,255,20,0.3) 90%, transparent)",
            transform:  "translateX(-50%)",
          }}
        />

        {timeline.map((item, i) => (
          <div
            key={item.year}
            style={{
              display:       "flex",
              justifyContent: item.side === "left" ? "flex-start" : "flex-end",
              marginBottom:  "4rem",
              position:      "relative",
            }}
          >
            {/* center dot */}
            <div
              className="year-dot"
              style={{
                position:     "absolute",
                left:         "50%",
                top:          "1.8rem",
                transform:    "translate(-50%, -50%)",
                width:        item.highlight ? "20px" : "12px",
                height:       item.highlight ? "20px" : "12px",
                borderRadius: "50%",
                background:   item.highlight ? "#39ff14" : "rgba(57,255,20,0.4)",
                boxShadow:    item.highlight ? "0 0 20px rgba(57,255,20,0.8), 0 0 40px rgba(57,255,20,0.3)" : "0 0 8px rgba(57,255,20,0.4)",
                zIndex:       2,
              }}
            />

            {/* card */}
            <div
              className="timeline-card"
              data-side={item.side}
              style={{
                width:        "44%",
                padding:      "2rem",
                background:   item.highlight
                  ? "rgba(57,255,20,0.05)"
                  : "rgba(255,255,255,0.02)",
                border:       `1px solid ${item.highlight ? "rgba(57,255,20,0.25)" : "rgba(255,255,255,0.06)"}`,
                borderRadius: "2px",
                position:     "relative",
                overflow:     "hidden",
              }}
              onMouseEnter={(e) => {
                gsap.to(e.currentTarget, {
                  borderColor: "rgba(57,255,20,0.3)",
                  background:  "rgba(57,255,20,0.06)",
                  duration:    0.3,
                });
              }}
              onMouseLeave={(e) => {
                gsap.to(e.currentTarget, {
                  borderColor: item.highlight ? "rgba(57,255,20,0.25)" : "rgba(255,255,255,0.06)",
                  background:  item.highlight ? "rgba(57,255,20,0.05)" : "rgba(255,255,255,0.02)",
                  duration:    0.3,
                });
              }}
            >
              {/* highlight bar */}
              {item.highlight && (
                <div style={{
                  position:   "absolute",
                  top:        0,
                  left:       0,
                  right:      0,
                  height:     "2px",
                  background: "linear-gradient(to right, transparent, #39ff14, transparent)",
                  boxShadow:  "0 0 10px rgba(57,255,20,0.5)",
                }} />
              )}

              {/* era label */}
              <div style={{
                fontFamily:    "Bebas Neue, sans-serif",
                fontSize:      "0.6rem",
                letterSpacing: "0.5em",
                color:         "rgba(57,255,20,0.4)",
                marginBottom:  "0.4rem",
              }}>
                {item.era}
              </div>

              {/* year */}
              <div style={{
                fontFamily:    "Bebas Neue, sans-serif",
                fontSize:      "clamp(2.5rem, 4vw, 3.5rem)",
                lineHeight:    0.9,
                color:         item.highlight ? "#39ff14" : "rgba(255,255,255,0.15)",
                textShadow:    item.highlight ? "0 0 30px rgba(57,255,20,0.4)" : "none",
                letterSpacing: "0.05em",
                marginBottom:  "0.6rem",
              }}>
                {item.year}
              </div>

              {/* heading */}
              <h3 style={{
                fontFamily:    "Bebas Neue, sans-serif",
                fontSize:      "clamp(1rem, 1.8vw, 1.4rem)",
                letterSpacing: "0.12em",
                color:         "#fff",
                marginBottom:  "0.8rem",
                lineHeight:    1.2,
              }}>
                {item.heading}
              </h3>

              {/* divider */}
              <div style={{
                width:        "30px",
                height:       "1px",
                background:   item.highlight ? "#39ff14" : "rgba(255,255,255,0.15)",
                marginBottom: "0.8rem",
              }} />

              {/* body */}
              <p style={{
                fontFamily:    "Bebas Neue, sans-serif",
                fontSize:      "clamp(0.75rem, 1.1vw, 0.88rem)",
                letterSpacing: "0.06em",
                lineHeight:    1.9,
                color:         "rgba(255,255,255,0.35)",
                marginBottom:  "1.2rem",
              }}>
                {item.body}
              </p>

              {/* stat pill */}
              <div style={{
                display:       "inline-flex",
                alignItems:    "center",
                gap:           "8px",
                padding:       "4px 12px",
                border:        "1px solid rgba(57,255,20,0.15)",
                borderRadius:  "2px",
              }}>
                <span style={{
                  fontFamily:    "Bebas Neue, sans-serif",
                  fontSize:      "1rem",
                  color:         "#39ff14",
                  letterSpacing: "0.05em",
                }}>
                  {item.stat.val}
                </span>
                <span style={{
                  fontFamily:    "Bebas Neue, sans-serif",
                  fontSize:      "0.6rem",
                  letterSpacing: "0.3em",
                  color:         "rgba(255,255,255,0.2)",
                }}>
                  {item.stat.label}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* end marker */}
      <div style={{
        textAlign:  "center",
        marginTop:  "2rem",
        fontFamily: "Bebas Neue, sans-serif",
      }}>
        <div style={{
          display:        "inline-flex",
          alignItems:     "center",
          gap:            "1rem",
          fontSize:       "0.65rem",
          letterSpacing:  "0.5em",
          color:          "rgba(57,255,20,0.3)",
        }}>
          <div style={{ width: "40px", height: "1px", background: "rgba(57,255,20,0.2)" }} />
          THE STORY CONTINUES
          <div style={{ width: "40px", height: "1px", background: "rgba(57,255,20,0.2)" }} />
        </div>
      </div>
    </section>
  );
}