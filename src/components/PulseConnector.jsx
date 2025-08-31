// PulseConnector.jsx
import React, { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";




/**
 * Props:
 *  - mode: "default" | "accent" (optional)
 *  - height: CSS height string (optional)
 */
export default function PulseConnector({ mode = "default", height = "160px" }) {
  const containerRef = useRef(null);
  const [active, setActive] = useState(false);

  // intersection observer: start/stop animation when visible
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setActive(entry.isIntersecting && entry.intersectionRatio > 0.25);
        });
      },
      { threshold: [0, 0.25, 0.5] }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const colors = {
    default: { base: "#60A5FA", accent: "#2563EB", ripple: "#60a5fa" },
    accent: { base: "#10B981", accent: "#059669", ripple: "#34d399" },
  }[mode];

  return (
    <div
      ref={containerRef}
      className="w-full flex justify-center items-center"
      style={{ height, position: "relative" }}
    >
      {/* Accessibility */}
      <span className="sr-only">
        Connection animation: continuing the flow to active fundraisers
      </span>

      <Canvas
        style={{ width: "100%", height: "100%", pointerEvents: "none", display: "block" }}
        camera={{ position: [0, 0, 6], fov: 55 }}
      >
        <ambientLight intensity={0.7} />
        <pointLight position={[0, 0, 3]} intensity={1.2} color={colors.accent} />
        <PulseScene active={active} colors={colors} />
      </Canvas>
    </div>
  );
}

/* ------------------ Scene & subcomponents ------------------ */

function PulseScene({ active, colors }) {
  const curve = useMemo(() => {
    const pts = [
      new THREE.Vector3(-3.2, 0.6, 0),
      new THREE.Vector3(-1.6, 0.9, 0),
      new THREE.Vector3(0, 0.7, 0),
      new THREE.Vector3(1.6, 0.2, 0),
      new THREE.Vector3(3.2, -0.2, 0),
    ];
    return new THREE.CatmullRomCurve3(pts, false, "catmullrom", 0.5);
  }, []);

  const points = useMemo(() => curve.getPoints(100), [curve]);

  const progressRef = useRef(0);
  const pulseFiredRef = useRef(false);

  useFrame((state, delta) => {
    if (active) {
      progressRef.current = Math.min(1, progressRef.current + delta * 0.6);
    } else {
      progressRef.current = Math.max(0, progressRef.current - delta * 0.9);
    }

    if (!pulseFiredRef.current && progressRef.current > 0.98) {
      pulseFiredRef.current = true;
      window.dispatchEvent(new CustomEvent("pulse:started"));
    }
    if (pulseFiredRef.current && progressRef.current < 0.02) {
      pulseFiredRef.current = false;
    }
  });

  return (
    <group>
      <DottedPath points={points} progressRef={progressRef} colors={colors} />
      <PulseDot points={points} progressRef={progressRef} colors={colors} />
      <FloatingAccent colors={colors} />
     
   
    </group>
  );
}

function DottedPath({ points, progressRef, colors }) {
  const step = 6;
  const dots = useMemo(() => {
    const arr = [];
    for (let i = 0; i < points.length; i += step) arr.push(points[i].clone());
    return arr;
  }, [points]);

  return (
    <group>
      {dots.map((pos, i) => (
        <Dot key={i} position={pos} index={i} total={dots.length} progressRef={progressRef} colors={colors} />
      ))}
    </group>
  );
}

function Dot({ position, index, total, progressRef, colors }) {
  const ref = useRef();
  useFrame(() => {
    if (!ref.current) return;
    const p = progressRef.current;
    const threshold = index / total;
    const local = Math.max(0, Math.min(1, (p - threshold) * 6));
    const scale = 0.18 + local * 0.4;
    ref.current.scale.setScalar(scale);
    ref.current.material.emissiveIntensity = 0.6 + local * 1.3;
    ref.current.material.opacity = 0.55 + local * 0.45;
  });

  return (
    <mesh position={position} ref={ref}>
      <sphereGeometry args={[0.14, 20, 20]} />
      <meshStandardMaterial
        transparent
        opacity={0.7}
        color={colors.base}
        emissive={colors.base}
        emissiveIntensity={0.6}
        roughness={0.35}
        metalness={0.3}
      />
  
    </mesh>
    
  );
}

function PulseDot({ points, progressRef, colors }) {
  const dotRef = useRef();
  const ringRef1 = useRef();
  const ringRef2 = useRef();
  const tmp = useMemo(() => new THREE.Vector3(), []);

  useFrame(({ clock }) => {
    const t = progressRef.current;
    const idx = Math.floor(t * (points.length - 1));
    const target = points[Math.max(0, Math.min(points.length - 1, idx))];
    if (dotRef.current && target) {
      tmp.copy(dotRef.current.position).lerp(target, 0.24);
      tmp.y += Math.sin(clock.getElapsedTime() * 1.6) * 0.01;
      dotRef.current.position.copy(tmp);
    }

    [ringRef1, ringRef2].forEach((ref, i) => {
      if (!ref.current) return;
      const speed = 1.5 + i * 0.5;
      const scale = 1 + Math.sin(clock.getElapsedTime() * speed) * 0.4 + i * 0.5;
      ref.current.scale.setScalar(scale);
      ref.current.material.opacity = 0.15 - i * 0.05;
    });
  });

  return (
    <group>
      {/* Main glowing dot */}
      <mesh ref={dotRef}>
        <sphereGeometry args={[0.25, 32, 32]} />
        <meshStandardMaterial
          color={colors.accent}
          emissive={colors.accent}
          emissiveIntensity={2.2} // 🔥 Stronger glow
          roughness={0.15}
          metalness={0.7}
        />
      </mesh>

      {/* Gradient glow rings */}
      <mesh ref={ringRef1} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.4, 0.7, 64]} />
        <meshBasicMaterial color={colors.ripple} transparent opacity={0.15} depthWrite={false} />
      </mesh>

      <mesh ref={ringRef2} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.6, 1.0, 64]} />
        <meshBasicMaterial color={colors.ripple} transparent opacity={0.1} depthWrite={false} />
      </mesh>
    </group>
  );
}

function FloatingAccent({ colors }) {
  const innerRef = useRef();
  const midRef = useRef();
  const outerRef = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    if (innerRef.current) {
      innerRef.current.material.emissiveIntensity =
        1.5 + Math.sin(t * 2) * 0.8; // pulsing core
    }

    if (midRef.current) {
      midRef.current.material.opacity = 0.2 + Math.sin(t * 1.2) * 0.1;
      midRef.current.scale.setScalar(1.05 + Math.sin(t * 0.5) * 0.05);
    }

    if (outerRef.current) {
      outerRef.current.material.opacity = 0.07 + Math.sin(t * 0.8) * 0.03;
      outerRef.current.scale.setScalar(1.2 + Math.sin(t * 0.3) * 0.05);
    }
  });

  return (
    <group>
      {/* Inner neon blue glowing core */}
      <mesh ref={innerRef} position={[0, 0.2, -1]}>
        <sphereGeometry args={[0.8, 64, 64]} />
        <meshStandardMaterial
          color={colors.accent}
          emissive={colors.accent}
          emissiveIntensity={2.5}
          roughness={0.1}
          metalness={0.8}
        />
      </mesh>

      {/* Mid-layer gradient aura */}
      <mesh ref={midRef} position={[0, 0.2, -1]}>
        <sphereGeometry args={[1.3, 64, 64]} />
        <meshPhongMaterial
          color={colors.base}
          transparent
          opacity={0.25}
          shininess={200}
          emissive={colors.base}
          emissiveIntensity={1.2}
        />
      </mesh>

      {/* Outer soft glow field */}
      <mesh ref={outerRef} position={[0, 0.2, -1]}>
        <sphereGeometry args={[2.0, 64, 64]} />
        <meshBasicMaterial
          color={colors.base}
          transparent
          opacity={0.1}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}