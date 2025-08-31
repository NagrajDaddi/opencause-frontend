import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

export function BlockchainCube() {
  return (
    <group scale={0.6} rotation={[0.3, 0.5, 0]}>
      {/* === Cubes (Blocks) === */}
      <mesh position={[-3, 0, 0]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#2563EB" metalness={0.7} roughness={0.3} />
      </mesh>

      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#3B82F6" metalness={0.7} roughness={0.3} />
      </mesh>

      <mesh position={[3, 0, 0]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#60A5FA" metalness={0.7} roughness={0.3} />
      </mesh>

      {/* === Chain Links Between Cubes === */}
      {[-2, -1].map((x, i) => (
        <mesh
          key={i}
          position={[x, 0, 0]}
          rotation={[0, i % 2 === 0 ? Math.PI / 2 : 0, 0]}
        >
          <torusGeometry args={[0.3, 0.07, 16, 32]} />
          <meshStandardMaterial color="#1E40AF" metalness={0.9} roughness={0.25} />
        </mesh>
      ))}

      {[1, 2].map((x, i) => (
        <mesh
          key={i}
          position={[x, 0, 0]}
          rotation={[0, i % 2 === 0 ? Math.PI / 2 : 0, 0]}
        >
          <torusGeometry args={[0.3, 0.07, 16, 32]} />
          <meshStandardMaterial color="#1E40AF" metalness={0.9} roughness={0.25} />
        </mesh>
      ))}
    </group>
  );
}

export default function BlockchainTransparencyCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{
        scale: 1.05,
        rotateX: 5,
        rotateY: -5,
        boxShadow: "0px 20px 40px rgba(37, 99, 235, 0.25)",
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      viewport={{ once: true }}
      className=" relative max-w-6xl mx-auto my-20
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
          <BlockchainCube />
          <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1.8} />
        </Canvas>
      </div>

    
      {/* RIGHT: Text */}
      <div className="w-full md:w-1/2 space-y-4 text-center md:text-left"> <h2 className="text-3xl font-bold text-gray-900">🔗 Blockchain Transparency</h2> <p className="text-gray-600 text-lg leading-relaxed"> Every donation is recorded immutably on the{" "} <span className="font-semibold text-blue-600">blockchain</span>. Donors can track exactly{" "} <span className="font-semibold text-blue-600">where every dollar goes</span>. </p> </div>
    </motion.div>
  );
}
