import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { useState } from "react";

function Shield3D() {
  return (
    <mesh rotation={[0.5, 0.5, 0]}>
      {/* Shield Shape: Using ExtrudeGeometry */}
      <extrudeGeometry
        args={[
          (() => {
            const shape = new THREE.Shape();
            shape.moveTo(0, 1);
            shape.lineTo(0.6, 0.4);
            shape.lineTo(0.4, -1);
            shape.lineTo(-0.4, -1);
            shape.lineTo(-0.6, 0.4);
            shape.lineTo(0, 1);
            return shape;
          })(),
          { depth: 0.2, bevelEnabled: true, bevelThickness: 0.05 },
        ]}
      />
      <meshStandardMaterial color="#2563EB" metalness={0.6} roughness={0.3} />
    </mesh>
  );
}

export default function DonorProtectionCard() {
  const [hovered, setHovered] = useState(false);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const { clientX, clientY, currentTarget } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();

    // Normalize mouse position
    const x = (clientX - left - width / 2) / 30;
    const y = (clientY - top - height / 2) / 30;

    setRotation({ x: y, y: -x });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        setRotation({ x: 0, y: 0 });
      }}
      onMouseMove={handleMouseMove}
      animate={{
        rotateX: rotation.x,
        rotateY: rotation.y,
        scale: hovered ? 1.03 : 1,
      }}
      transition={{ type: "spring", stiffness: 200, damping: 15, duration: 1 }}
      className="relative max-w-6xl mx-auto my-20
    bg-white/70 backdrop-blur-md
    rounded-2xl shadow-xl p-10
    flex flex-col md:flex-row items-center gap-10
    before:content-[''] before:absolute before:inset-0 before:rounded-2xl
    before:bg-gradient-to-r before:from-blue-400 before:to-blue-600
    before:blur-2xl before:opacity-20 before:-z-10"
      style={{
        boxShadow: hovered
          ? "0 0 40px rgba(37, 99, 235, 0.4), 0 15px 40px rgba(0,0,0,0.2)"
          : "0 10px 30px rgba(0,0,0,0.15)",
      }}
    >
      {/* Blue glow gradient background */}
      <div className="absolute inset-0 rounded-2xl pointer-events-none bg-gradient-to-br from-blue-400/20 via-blue-500/10 to-transparent blur-2xl" />

      {/* LEFT: 3D Shield */}
      <div className="w-full md:w-1/2 h-[300px] relative z-10">
        <Canvas camera={{ position: [0, 0, 3] }}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[2, 2, 2]} />
          <Shield3D />
          <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1.5} />
        </Canvas>
      </div>

      {/* RIGHT: Text Content */}
      <div className="w-full md:w-1/2 space-y-4 text-center md:text-left relative z-10">
        <h2 className="text-3xl font-bold text-gray-900">
          🛡️ Built-in Donor Protection
        </h2>
        <p className="text-gray-600 text-lg">
          Beneficiaries request to use raised funds. Donors{" "}
          <span className="text-blue-600 font-semibold">vote</span> to approve —
          if rejected, donations are{" "}
          <span className="text-blue-600 font-semibold">safely refunded</span>{" "}
          back. 100% secure, powered by blockchain.
        </p>
      </div>
    </motion.div>
  );
}
