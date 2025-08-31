// ThreeBackground.jsx
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { useRef } from "react";

// === Campaign Scene: floating bubbles ===
function CampaignScene() {
  const group = useRef();

  useFrame(({ clock }) => {
    if (group.current) {
      group.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.3) * 0.2;
    }
  });

  const bubbles = new Array(14).fill().map((_, i) => (
    <mesh
      key={i}
      position={[
        (Math.random() - 0.5) * 4,
        (Math.random() - 0.5) * 3,
        (Math.random() - 0.5) * 2,
      ]}
    >
      <sphereGeometry args={[0.25 + Math.random() * 0.2, 32, 32]} />
      <meshStandardMaterial color="#3b82f6" transparent opacity={0.5} />
    </mesh>
  ));

  return <group ref={group}><Float>{bubbles}</Float></group>;
}

// === Donors Scene: flowing arc links ===
function DonorsScene() {
  const lineRef = useRef();

  useFrame(({ clock }) => {
    if (lineRef.current) {
      lineRef.current.rotation.y = clock.getElapsedTime() * 0.3;
    }
  });

  const curve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-2, -0.5, 0),
    new THREE.Vector3(0, 1.5, 0),
    new THREE.Vector3(2, -0.5, 0),
  ]);

  const points = curve.getPoints(100);
  const geometry = new THREE.BufferGeometry().setFromPoints(points);

  return (
    <line ref={lineRef} geometry={geometry}>
      <lineBasicMaterial color="#16a34a" linewidth={3} />
    </line>
  );
}

// === Blockchain Scene: rotating chain of cubes ===
function BlockchainScene() {
  const group = useRef();

  useFrame(({ clock }) => {
    if (group.current) {
      group.current.rotation.y = clock.getElapsedTime() * 0.4;
    }
  });

  const cubes = new Array(5).fill().map((_, i) => (
    <mesh key={i} position={[i * 1.2 - 3, 0, 0]}>
      <boxGeometry args={[0.6, 0.6, 0.6]} />
      <meshStandardMaterial color="#f59e0b" metalness={0.7} roughness={0.3} />
    </mesh>
  ));

  const links = new Array(4).fill().map((_, i) => (
    <mesh key={i} position={[i * 1.2 - 2.4, 0, 0]}>
      <cylinderGeometry args={[0.08, 0.08, 1.2, 16]} />
      <meshStandardMaterial color="#fbbf24" />
    </mesh>
  ));

  return <group ref={group}>{cubes}{links}</group>;
}

// === Global Background with modes ===
export default function ThreeBackground({ mode = "campaign" }) {
  return (
    <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
      <ambientLight intensity={0.6} />
      <directionalLight position={[4, 4, 4]} intensity={1} />
      <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />

      {mode === "campaign" && <CampaignScene />}
      {mode === "donors" && <DonorsScene />}
      {mode === "blockchain" && <BlockchainScene />}
    </Canvas>
  );
}
