import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

export function Bank3D() {
  return (
    <group scale={0.6} rotation={[0.3, 0.2, 0]}>
      {/* Base Steps */}
      {[0, -0.2, -0.4].map((y, i) => (
        <mesh key={i} position={[0, y - 0.5, 0]}>
          <boxGeometry args={[2.8 - i * 0.3, 0.15, 1.8 - i * 0.3]} />
          <meshStandardMaterial 
            color={i === 0 ? "#3B82F6" : i === 1 ? "#2563EB" : "#1E40AF"} 
            roughness={0.6} 
            metalness={0.3} 
          />
        </mesh>
      ))}

      {/* Pillars */}
      {[-0.9, -0.45, 0, 0.45, 0.9].map((x, i) => (
        <mesh key={i} position={[x, 0, 0.7]}>
          <cylinderGeometry args={[0.1, 0.1, 1.5, 32]} />
          <meshStandardMaterial 
            color="#60A5FA" 
            roughness={0.5} 
            metalness={0.4} 
          />
        </mesh>
      ))}

      {/* Roof */}
      <mesh position={[0, 1.2, 0.7]}>
        <coneGeometry args={[1.8, 0.8, 4]} />
        <meshStandardMaterial 
          color="#1D4ED8" 
          metalness={0.6} 
          roughness={0.4} 
        />
      </mesh>

      {/* Arch Entrance */}
      <mesh position={[0, -0.2, 0.71]}>
        <torusGeometry args={[0.3, 0.08, 16, 50, Math.PI]} />
        <meshStandardMaterial 
          color="#1E3A8A" 
          metalness={0.5} 
          roughness={0.4} 
        />
      </mesh>
    </group>
  );
}

export default function NoMiddlemenCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ 
        scale: 1.05, 
        rotateX: 5, 
        rotateY: -5, 
        boxShadow: "0px 20px 40px rgba(37, 99, 235, 0.25)" 
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      viewport={{ once: true }}
      className="relative max-w-6xl mx-auto my-20
    bg-white/70 backdrop-blur-md
    rounded-2xl shadow-xl p-10
    flex flex-col md:flex-row items-center gap-10
    before:content-[''] before:absolute before:inset-0 before:rounded-2xl
    before:bg-gradient-to-r before:from-blue-400 before:to-blue-600
    before:blur-2xl before:opacity-20 before:-z-10"
    >
      {/* LEFT: 3D Model */}
      <div className="w-full md:w-1/2 h-[300px]">
        <Canvas camera={{ position: [0, 0, 3] }}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[2, 2, 2]} />
          <Bank3D />
          <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1.2} />
        </Canvas>
      </div>

      {/* RIGHT: Text */}
      <div className="w-full md:w-1/2 space-y-4 text-center md:text-left">
        <h2 className="text-3xl font-bold text-gray-900">🏦 No Middlemen</h2>
        <p className="text-gray-600 text-lg leading-relaxed">
          Donations go directly from <span className="font-semibold text-blue-600">donor</span> to{" "}
          <span className="font-semibold text-blue-600">beneficiary</span>.  
          No third-party banks or platforms taking cuts.
        </p>
      </div>
    </motion.div>
  );
}
