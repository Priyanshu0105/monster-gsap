"use client";

import { useEffect, useRef, useState, Suspense, useMemo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF, Environment, ContactShadows } from "@react-three/drei";
import * as THREE from "three";

gsap.registerPlugin(ScrollTrigger);

const flavors = [
  {
    model:   "/models/green_monster.glb",
    name:    "CLASSIC GREEN",
    tagline: "THE ORIGINAL BEAST",
    copy:    "Born in 2002. Still untamed.",
    detail:  "The drink that built an empire — raw, unfiltered, relentless.",
    stats:   [{ label: "CAFFEINE", val: "160MG" }, { label: "FLAVOR", val: "RAW" }, { label: "LEGACY", val: "20YRS" }],
    tags:    ["TAURINE", "B-VITAMINS", "L-CARNITINE"],
    bg: "#040a04", glow: "rgba(57,255,20,0.3)", glowRgb: "57,255,20", accent: "#39ff14",
    number: "01", badge: "ORIGINAL",
  },
  {
    model:   "/models/mango_monster.glb",
    name:    "MANGO LOCO",
    tagline: "TROPICAL MADNESS",
    copy:    "When paradise goes feral.",
    detail:  "Sun-scorched mango meets Monster intensity. Dangerously smooth.",
    stats:   [{ label: "CAFFEINE", val: "160MG" }, { label: "FLAVOR", val: "MANGO" }, { label: "VIBE", val: "FERAL" }],
    tags:    ["TROPICAL", "SMOOTH", "ADDICTIVE"],
    bg: "#0a0500", glow: "rgba(255,140,0,0.3)", glowRgb: "255,140,0", accent: "#ff8c00",
    number: "02", badge: "TROPICAL",
  },
  {
    model:   "/models/white_monster.glb",
    name:    "ULTRA WHITE",
    tagline: "ZERO LIMITS",
    copy:    "Ghost-light. Hit-hard.",
    detail:  "Zero sugar, full send. The clean slate that still hits like freight.",
    stats:   [{ label: "CAFFEINE", val: "150MG" }, { label: "CALORIES", val: "ZERO" }, { label: "LIMITS", val: "NONE" }],
    tags:    ["ZERO SUGAR", "ULTRA", "CLEAN"],
    bg: "#02040a", glow: "rgba(100,200,255,0.25)", glowRgb: "100,200,255", accent: "#64c8ff",
    number: "03", badge: "ULTRA",
  },
  {
    model:   "/models/pipeline_monster.glb",
    name:    "PIPELINE PUNCH",
    tagline: "RIDE THE WAVE",
    copy:    "Named after the deadliest wave.",
    detail:  "Violet-sweet, electric-deep, absolutely reckless. No middle ground.",
    stats:   [{ label: "CAFFEINE", val: "160MG" }, { label: "FLAVOR", val: "PUNCH" }, { label: "WAVE", val: "∞" }],
    tags:    ["ELECTRIC", "DEEP", "RECKLESS"],
    bg: "#06000a", glow: "rgba(180,0,255,0.25)", glowRgb: "180,0,255", accent: "#b400ff",
    number: "04", badge: "PIPELINE",
  },
];

flavors.forEach((f) => useGLTF.preload(f.model));

/* ── Energy torus rings ─────────────────────────────────────────────────── */
function EnergyRings({ accent }: { accent: string }) {
  const group = useRef<THREE.Group>(null);
  const color = new THREE.Color(accent);

  useFrame(({ clock }) => {
    if (!group.current) return;
    const t = clock.getElapsedTime();
    group.current.children.forEach((child, i) => {
      const mesh = child as THREE.Mesh;
      mesh.rotation.z = t * (i % 2 === 0 ? 0.18 : -0.12) + i;
      mesh.rotation.x = Math.sin(t * 0.4 + i) * 0.15;
      const mat = mesh.material as THREE.MeshBasicMaterial;
      mat.opacity = 0.07 + Math.sin(t * 1.6 + i * 1.1) * 0.04;
    });
  });

  return (
    <group ref={group}>
      {[1.55, 1.78, 2.05, 2.38].map((r, i) => (
        <mesh key={i} rotation={[Math.PI / 2, 0, i * 0.4]}>
          <torusGeometry args={[r, 0.003 + i * 0.0015, 3, 128]} />
          <meshBasicMaterial color={color} transparent opacity={0.09} />
        </mesh>
      ))}
    </group>
  );
}

/* ── Floating sparks ────────────────────────────────────────────────────── */
function Sparks({ accent }: { accent: string }) {
  const ref   = useRef<THREE.Points>(null);
  const color = new THREE.Color(accent);
  const COUNT = 70;

  const pos = useMemo(() => {
    const arr = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      const a = Math.random() * Math.PI * 2;
      const r = 1.1 + Math.random() * 1.3;
      arr[i*3]   = Math.cos(a) * r;
      arr[i*3+1] = (Math.random() - 0.5) * 4;
      arr[i*3+2] = Math.sin(a) * r;
    }
    return arr;
  }, []);

  const vel = useMemo(() => {
    const arr = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      arr[i*3]   = (Math.random() - 0.5) * 0.007;
      arr[i*3+1] = 0.005 + Math.random() * 0.01;
      arr[i*3+2] = (Math.random() - 0.5) * 0.007;
    }
    return arr;
  }, []);

  useFrame(() => {
    if (!ref.current) return;
    const arr = ref.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < COUNT; i++) {
      arr[i*3]   += vel[i*3];
      arr[i*3+1] += vel[i*3+1];
      arr[i*3+2] += vel[i*3+2];
      if (arr[i*3+1] > 2.4) {
        const a = Math.random() * Math.PI * 2;
        const r = 1.1 + Math.random() * 1.1;
        arr[i*3]   = Math.cos(a) * r;
        arr[i*3+1] = -2.4;
        arr[i*3+2] = Math.sin(a) * r;
      }
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[pos, 3]} />
      </bufferGeometry>
      <pointsMaterial color={color} size={0.025} transparent opacity={0.75} sizeAttenuation />
    </points>
  );
}

/* ── Can mesh ───────────────────────────────────────────────────────────── */
function CanMesh({ modelPath, accentHex, groupRef }: {
  modelPath: string;
  accentHex: string;
  groupRef: React.RefObject<THREE.Group | null>;
}) {
  const { scene } = useGLTF(modelPath);
  const { gl }    = useThree();
  const cloned    = useRef<THREE.Group>(scene.clone(true));

  useEffect(() => { cloned.current = scene.clone(true); }, [scene]);

  useEffect(() => {
    gl.toneMapping         = THREE.ACESFilmicToneMapping;
    gl.toneMappingExposure = 0.5;
    const ec = new THREE.Color(accentHex);
    cloned.current.traverse((c) => {
      if (!(c as THREE.Mesh).isMesh) return;
      const mats = Array.isArray((c as THREE.Mesh).material)
        ? (c as THREE.Mesh).material as THREE.MeshStandardMaterial[]
        : [(c as THREE.Mesh).material as THREE.MeshStandardMaterial];
      mats.forEach((m) => {
        if (!m) return;
        m.metalness         = 0.92;
        m.roughness         = 0.15;
        m.envMapIntensity   = 4.0;
        m.emissive          = ec;
        m.emissiveIntensity = 0.05;
        m.needsUpdate       = true;
      });
    });
  }, [accentHex, gl]);

  return (
    <group ref={groupRef} rotation={[0.04, Math.PI * 1.5, 0]} position={[0, -0.5, 0]}>
      <primitive object={cloned.current} />
    </group>
  );
}

/* ── Full scene ─────────────────────────────────────────────────────────── */
function SceneContent({ modelPath, accentHex, scrollYRef, flavorIndex }: {
  modelPath:   string;
  accentHex:   string;
  scrollYRef:  React.RefObject<number>;
  flavorIndex: number;
}) {
  const groupRef  = useRef<THREE.Group | null>(null);
  const scaleRef  = useRef(1);
  const prevModel = useRef(modelPath);

  useEffect(() => {
    if (prevModel.current !== modelPath) {
      prevModel.current = modelPath;
      scaleRef.current  = 0.48; // pop-in scale animation on flavor change
    }
  }, [modelPath]);

  useFrame(() => {
    if (!groupRef.current) return;

    /*
      FIX: Previously used raw scrollYRef (0→1 for whole section), so:
        Flavor 0 started at 0.00 → rotation offset = 0          ✓ logo facing
        Flavor 1 started at 0.25 → rotation offset = 0.25×3π    ✗ wrong face
        Flavor 2 started at 0.50 → rotation offset = 0.50×3π    ✗ wrong face
        Flavor 3 started at 0.75 → rotation offset = 0.75×3π    ✗ wrong face

      Fix: compute localProgress = progress within THIS flavor's 25% band.
        Each flavor's band: [flavorIndex/4 … (flavorIndex+1)/4]
        localProgress is always 0→1 regardless of where the band sits.
        So every can starts from LOGO_Y (Math.PI*1.5) and rotates forward.
    */
    const bandStart     = flavorIndex / flavors.length;
    const bandSize      = 1 / flavors.length;
    const localProgress = Math.max(0, Math.min(1,
      (scrollYRef.current - bandStart) / bandSize
    ));

    // Always starts from logo face, spins 1.5 full rotations through the band
    groupRef.current.rotation.y = Math.PI * 1.5 + localProgress * Math.PI * 3;

    scaleRef.current += (1 - scaleRef.current) * 0.09;
    groupRef.current.scale.setScalar(scaleRef.current);
  });

  return (
    <>
      <ambientLight intensity={0.12} />
      <directionalLight position={[-4, 5, 4]}  intensity={4.5} color="#fff5e8" />
      <directionalLight position={[5, 1, 3]}   intensity={1.8} color="#e8f0ff" />
      <spotLight        position={[3, 3, -6]}   intensity={14}  angle={0.12} penumbra={0.6} color="#ffffff" />
      <directionalLight position={[0, 10, 2]}  intensity={2.5} color="#ffffff" />
      <pointLight       position={[0, -5, 3]}  intensity={1.2} color="#ffffff" />
      <pointLight       position={[-3, 0, 4]}  intensity={3.2} color={accentHex} />
      <pointLight       position={[3, 0, 4]}   intensity={1.6} color={accentHex} />
      <Environment preset="studio" />
      <Suspense fallback={null}>
        <EnergyRings accent={accentHex} />
        <Sparks      accent={accentHex} />
        <CanMesh key={modelPath} modelPath={modelPath} accentHex={accentHex} groupRef={groupRef} />
        <ContactShadows position={[0, -3.5, 0]} opacity={0.5} scale={6} blur={6} far={7} color="#000000" />
      </Suspense>
    </>
  );
}

/* ── Shockwave rings ────────────────────────────────────────────────────── */
function ShockwaveRings({ accent, glowRgb }: { accent: string; glowRgb: string }) {
  return (
    <div style={{
      position: "absolute", inset: 0,
      display: "flex", alignItems: "center", justifyContent: "center",
      pointerEvents: "none", zIndex: 1,
    }}>
      {[0, 1, 2].map((i) => (
        <div key={i} style={{
          position: "absolute",
          width:  `${300 + i * 100}px`,
          height: `${300 + i * 100}px`,
          borderRadius: "50%",
          border: `1px solid rgba(${glowRgb},${0.22 - i * 0.06})`,
          boxShadow: `0 0 ${14 + i * 8}px rgba(${glowRgb},${0.14 - i * 0.03}), inset 0 0 ${8 + i * 4}px rgba(${glowRgb},0.04)`,
          animation: `swRing${i} ${2.6 + i * 0.7}s ease-in-out infinite`,
          animationDelay: `${i * 0.45}s`,
        }} />
      ))}

      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => (
        <div key={`line-${i}`} style={{
          position: "absolute",
          width: "1px",
          height: `${50 + (i % 3) * 18}px`,
          background: `linear-gradient(to bottom, transparent, rgba(${glowRgb},${0.45 - (i % 3) * 0.1}), transparent)`,
          transform: `rotate(${deg}deg) translateY(-${175 + (i % 2) * 25}px)`,
          animation: `lineFlicker ${1.4 + i * 0.18}s ease-in-out infinite`,
          animationDelay: `${i * 0.15}s`,
          transformOrigin: "center bottom",
        }} />
      ))}

      {["-60px,-60px", "60px,-60px", "-60px,60px", "60px,60px"].map((t, i) => {
        const [x, y] = t.split(",");
        return (
          <div key={`spark-${i}`} style={{
            position: "absolute",
            width: "4px", height: "4px",
            borderRadius: "50%",
            background: accent,
            boxShadow: `0 0 8px 3px rgba(${glowRgb},0.6)`,
            transform: `translate(${x}, ${y})`,
            animation: `sparkPulse ${0.9 + i * 0.2}s ease-in-out infinite`,
            animationDelay: `${i * 0.22}s`,
          }} />
        );
      })}

      <style>{`
        @keyframes swRing0    { 0%,100%{transform:scale(1);  opacity:0.7}  50%{transform:scale(1.05);opacity:1}    }
        @keyframes swRing1    { 0%,100%{transform:scale(1);  opacity:0.4}  50%{transform:scale(1.07);opacity:0.75} }
        @keyframes swRing2    { 0%,100%{transform:scale(1);  opacity:0.2}  50%{transform:scale(1.09);opacity:0.45} }
        @keyframes lineFlicker { 0%,100%{opacity:0.15} 50%{opacity:0.7} }
        @keyframes sparkPulse  { 0%,100%{opacity:0.4;transform:scale(1) translate(var(--sx,0),var(--sy,0))} 50%{opacity:1;transform:scale(1.8) translate(var(--sx,0),var(--sy,0))} }
      `}</style>
    </div>
  );
}

/* ── Main ───────────────────────────────────────────────────────────────── */
export default function ScrollSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const glowRef    = useRef<HTMLDivElement>(null);
  const scrollYRef = useRef(0);
  const [current,  setCurrent]  = useState(0);
  const [progress, setProgress] = useState(0);
  const f = flavors[current];

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const mainTrigger = ScrollTrigger.create({
      trigger: section,
      start:   "top top",
      end:     "bottom bottom",
      scrub:   1.2,
      onUpdate: (self) => {
        scrollYRef.current = self.progress;
        setProgress(self.progress);

        const idx = Math.min(
          flavors.length - 1,
          Math.floor(self.progress * flavors.length)
        );

        setCurrent((prev) => {
          if (prev === idx) return prev;
          switchFlavor(idx);
          return idx;
        });
      },
    });

    function switchFlavor(i: number) {
      const fl = flavors[i];
      gsap.to("body", { backgroundColor: fl.bg, duration: 0.8, ease: "power2.out" });
      gsap.to(glowRef.current, {
        background: `radial-gradient(circle,${fl.glow} 0%,transparent 60%)`,
        duration: 0.8,
      });
      gsap.fromTo(
        ".ftxt",
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.05, ease: "power3.out", overwrite: "auto" }
      );
    }

    return () => { mainTrigger.kill(); };
  }, []);

  return (
    <section ref={sectionRef}
    className="scroll-section"

    style={{ height: "400vh", position: "relative" }}>
      <div  className="scroll-layout" style={{
        position: "sticky", top: 0, height: "100vh",
        display: "grid",
        gridTemplateColumns: "1fr minmax(280px,34vw) 1fr",
        alignItems: "center",
        overflow: "hidden",
      }}>

        {/* Central glow */}
        <div ref={glowRef} style={{
          position: "absolute", left: "50%", top: "50%",
          transform: "translate(-50%,-50%)",
          width: "clamp(420px,68vw,820px)", height: "clamp(420px,68vw,820px)",
          borderRadius: "50%",
          background: `radial-gradient(circle,${f.glow} 0%,transparent 60%)`,
          pointerEvents: "none", zIndex: 0,
        }} />

        {/* Scanlines */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0,
          background: "repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(255,255,255,0.006) 3px,rgba(255,255,255,0.006) 4px)",
        }} />

        {/* Progress bar */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: "2px",
          background: "rgba(255,255,255,0.04)", zIndex: 10,
        }}>
          <div style={{
            height: "100%", width: `${progress * 100}%`,
            background: f.accent, boxShadow: `0 0 14px ${f.accent}`,
            transition: "background 0.5s",
          }} />
        </div>

        {/* ══ LEFT ══ */}
        <div style={{
          zIndex: 2, padding: "0 2vw 0 5vw",
          display: "flex", flexDirection: "column", justifyContent: "center",
        }}>
          <div className="ftxt" style={{
            fontFamily: "Bebas Neue, sans-serif",
            fontSize: "clamp(5rem,9vw,10rem)",
            lineHeight: 1, color: "transparent",
            WebkitTextStroke: `1px ${f.accent}25`,
            marginBottom: "0.4rem", userSelect: "none",
          }}>
            {f.number}
          </div>

          <div className="ftxt" style={{
            fontFamily: "Bebas Neue, sans-serif", fontSize: "0.54rem",
            letterSpacing: "0.55em", color: f.accent,
            border: `1px solid ${f.accent}40`, padding: "3px 12px", borderRadius: "2px",
            display: "inline-block", marginBottom: "1.2rem",
            boxShadow: `0 0 14px rgba(${f.glowRgb},0.35)`,
            width: "fit-content", transition: "all 0.5s",
          }}>
            {f.badge}
          </div>

          <h2 className="ftxt" style={{
            fontFamily: "Bebas Neue, sans-serif",
            fontSize: "clamp(2rem,4.2vw,4.5rem)",
            lineHeight: 0.87, letterSpacing: "0.03em", color: "#fff",
            marginBottom: "0.4rem",
          }}>
            {f.name}
          </h2>

          <p className="ftxt" style={{
            fontFamily: "Bebas Neue, sans-serif", fontSize: "clamp(0.54rem,0.85vw,0.7rem)",
            letterSpacing: "0.55em", color: f.accent,
            textShadow: `0 0 24px rgba(${f.glowRgb},0.7)`,
            marginBottom: "1.8rem", transition: "color 0.5s",
          }}>
            {f.tagline}
          </p>

          <div className="ftxt" style={{
            width: "36px", height: "1px",
            background: f.accent, boxShadow: `0 0 10px ${f.accent}`,
            marginBottom: "1.4rem",
          }} />

          <p className="ftxt" style={{
            fontFamily: "Bebas Neue, sans-serif",
            fontSize: "clamp(0.75rem,1.1vw,0.92rem)",
            lineHeight: 1.9, letterSpacing: "0.06em",
            color: "rgba(255,255,255,0.38)", marginBottom: "0.5rem", maxWidth: "300px",
          }}>
            {f.copy}
          </p>
          <p className="ftxt" style={{
            fontFamily: "Bebas Neue, sans-serif",
            fontSize: "clamp(0.62rem,0.88vw,0.75rem)",
            lineHeight: 1.85, letterSpacing: "0.06em",
            color: "rgba(255,255,255,0.18)", maxWidth: "280px",
          }}>
            {f.detail}
          </p>
        </div>

        {/* ══ CENTER — 3D can ══ */}
        <div 
        className="flavor-can-wrap"
        style={{
          zIndex: 2, position: "relative",
          display: "flex", alignItems: "center", justifyContent: "center",
          height: "100vh",
        }}>
          <div className="shockwave-wrap">
            <ShockwaveRings accent={f.accent} glowRgb={f.glowRgb} />
          </div>
          <div className="flavor-canvas" style={{
            width: "100%", height: "100%",
            filter: `drop-shadow(0 0 50px rgba(${f.glowRgb},0.55)) drop-shadow(0 60px 100px rgba(${f.glowRgb},0.3))`,
            transition: "filter 0.9s",
          }}>
            <Canvas
              camera={{ position: [0, 0, 7.5], fov: 30 }}
              gl={{ antialias: true, alpha: true }}
              style={{ width: "100%", height: "100%", background: "transparent" }}
            >
              <SceneContent
                modelPath={f.model}
                accentHex={f.accent}
                scrollYRef={scrollYRef}
                flavorIndex={current}
              />
            </Canvas>
          </div>
        </div>

        {/* ══ RIGHT ══ */}
        <div style={{
          zIndex: 2, padding: "0 5vw 0 2vw",
          display: "flex", flexDirection: "column", justifyContent: "center",
        }}>
          {/* Stats */}
          <div className="ftxt" style={{ marginBottom: "2.4rem" }}>
            {f.stats.map((s, si) => (
              <div key={s.label} style={{
                display: "flex", alignItems: "baseline",
                justifyContent: "space-between",
                padding: "0.9rem 0",
                borderBottom: `1px solid rgba(${f.glowRgb},0.1)`,
                borderTop: si === 0 ? `1px solid rgba(${f.glowRgb},0.1)` : "none",
              }}>
                <span style={{
                  fontFamily: "Bebas Neue, sans-serif", fontSize: "0.56rem",
                  letterSpacing: "0.4em", color: "rgba(255,255,255,0.22)",
                }}>
                  {s.label}
                </span>
                <span style={{
                  fontFamily: "Bebas Neue, sans-serif",
                  fontSize: "clamp(1.4rem,2.2vw,2.1rem)",
                  color: f.accent, textShadow: `0 0 22px rgba(${f.glowRgb},0.55)`,
                  lineHeight: 1, transition: "color 0.5s",
                }}>
                  {s.val}
                </span>
              </div>
            ))}
          </div>

          {/* Tags */}
          <div className="ftxt" style={{ display: "flex", flexDirection: "column", gap: "7px", marginBottom: "2.4rem" }}>
            {f.tags.map((tag) => (
              <div key={tag} style={{
                fontFamily: "Bebas Neue, sans-serif", fontSize: "0.56rem",
                letterSpacing: "0.38em", color: `rgba(${f.glowRgb},0.55)`,
                padding: "5px 12px",
                border: `1px solid rgba(${f.glowRgb},0.14)`,
                borderRadius: "2px",
                background: `rgba(${f.glowRgb},0.04)`,
                width: "fit-content",
              }}>
                + {tag}
              </div>
            ))}
          </div>

          {/* Flavor nav */}
          <div className="ftxt" style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {flavors.map((fl, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div style={{
                  width:      i === current ? "28px" : "5px",
                  height:     "2px", borderRadius: "2px",
                  background: i === current ? fl.accent : "rgba(255,255,255,0.08)",
                  boxShadow:  i === current ? `0 0 8px ${fl.accent}` : "none",
                  transition: "all 0.4s ease",
                }} />
                <span style={{
                  fontFamily: "Bebas Neue, sans-serif", fontSize: "0.48rem",
                  letterSpacing: "0.4em",
                  color: i === current ? fl.accent : "rgba(255,255,255,0.1)",
                  transition: "color 0.4s",
                }}>
                  {fl.badge}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}