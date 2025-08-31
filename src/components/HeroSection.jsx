import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sphere, MeshDistortMaterial } from "@react-three/drei";
import { ReactTyped } from "react-typed";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-b from-blue-50 to-white min-h-[80vh] flex items-center">
      <div className="max-w-7xl mx-auto px-10 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        
        {/* LEFT: Text */}
        <div className="space-y-6">
          <h1 className="text-5xl font-extrabold text-gray-900 leading-tight">
            Empower{" "}
            <span className="text-blue-600">
              <ReactTyped
                strings={["Causes", "Dreams", "Lives"]}
                typeSpeed={80}
                backSpeed={40}
                backDelay={1500}
                loop
              />
            </span>{" "}
            with OpenCause
          </h1>

          {/* Normal supporting text */}
          <p className="text-lg text-gray-600">
            Start a fundraiser, donate, and bring transparency with blockchain.
          </p>

          {/* CTA Buttons */}
          <div className="flex gap-4">
            {/* Gradient Primary Button with 3D hover */}
            <a
              href="/signup"
              className="px-6 py-3 rounded-lg font-semibold text-white 
                         bg-gradient-to-r from-blue-600 via-sky-500 to-indigo-600
                         hover:from-indigo-600 hover:via-sky-500 hover:to-blue-600
                         transform transition-all duration-300 ease-out
                         hover:-translate-y-1 hover:scale-105 hover:shadow-2xl"
            >
              Start a Campaign
            </a>

            {/* Gradient Soft Button with 3D hover */}
            <a
              href="/projects"
              className="px-6 py-3 rounded-lg font-semibold text-blue-700 
                         bg-gradient-to-r from-blue-100 via-sky-50 to-indigo-100
                         hover:from-blue-200 hover:via-sky-100 hover:to-indigo-200
                         transform transition-all duration-300 ease-out
                         hover:-translate-y-1 hover:scale-105 hover:shadow-xl"
            >
              Support a Cause
            </a>
          </div>
        </div>

        {/* RIGHT: 3D Floating Heart of Hope */}
<div className="h-[500px] md:h-[700px]"> {/* 🔹 Adjust height here */}
  <Canvas camera={{ position: [0, 0, 6] }}>
    <ambientLight intensity={0.6} />
    <directionalLight position={[5, 5, 5]} intensity={1.2} />

    {/* 🔹 Group to adjust vertical placement */}
    <group position={[0, -0.5, 0]}> {/* tweak Y here (e.g., -1, -2, 0.5) */}

      {/* Floating Heart (torus knot shaped like heart) */}
      <mesh>
        <torusKnotGeometry args={[1, 0.3, 200, 32]} />
        <meshStandardMaterial
          color="#3B82F6"
          metalness={0.6}
          roughness={0.3}
          emissive="#2563EB"
          emissiveIntensity={0.4}
        />
      </mesh>

      
    </group>

    {/* Floating animation effect */}
    <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1.2} />
  </Canvas>
</div>

      </div>
    </section>
  );
}
