import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars, Float, Sphere, MeshWobbleMaterial } from "@react-three/drei";
import { motion } from "framer-motion";

function ThreeBackground() {
  return (
    <Canvas className="absolute inset-0 z-0" camera={{ position: [0, 0, 5] }}>
      {/* Lights */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[3, 3, 3]} intensity={1} />

      {/* Floating Globe */}
      <Float speed={2} rotationIntensity={1} floatIntensity={2}>
        <Sphere args={[1.2, 64, 64]} scale={2.5}>
          <MeshWobbleMaterial
            color="#2563EB"
            factor={0.5}
            speed={1}
            opacity={0.7}
            transparent
          />
        </Sphere>
      </Float>

      {/* Stars */}
      <Stars radius={80} depth={50} count={3000} factor={4} fade speed={1.5} />

      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
    </Canvas>
  );
}

export default function FinalCTA() {
  return (
    <section className="relative overflow-hidden py-32">
      {/* Gradient overlay to blend 3D background */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900/80 via-blue-800/60 to-blue-900/90 z-0" />
      <ThreeBackground />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="font-sans text-5xl md:text-6xl font-extrabold tracking-tight leading-tight text-white drop-shadow-lg"
        >
          Ready to{" "}
          <motion.span
            animate={{ color: ["#93C5FD", "#60A5FA", "#2563EB", "#1E3A8A"] }}
            transition={{ duration: 5, repeat: Infinity, repeatType: "mirror" }}
            className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600"
          >
            Make a Difference?
          </motion.span>
        </motion.h2>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 1 }}
          className="mt-6 text-lg md:text-xl text-blue-100 font-light tracking-wide"
        >
          Start your campaign in minutes or support one today —{" "}
          <span className="font-semibold text-white">transparent, secure, and zero fees.</span>
        </motion.p>

        {/* Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-6">
          <motion.a
            href="/signup"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-gradient-to-r from-blue-400 to-blue-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-blue-500/50 backdrop-blur-lg"
          >
             Start a Campaign
          </motion.a>
          <motion.a
            href="/projects"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 border border-white/70 text-white font-semibold rounded-xl bg-white/10 backdrop-blur-md hover:bg-white/20 hover:text-blue-50 transition"
          >
             Support a Cause
          </motion.a>
        </div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="mt-14 flex flex-wrap justify-center gap-6"
        >
          {["✅ Zero Fees", "🔗 100% Transparency", "🌍 Global Access"].map((item, i) => (
            <span
              key={i}
              className="px-5 py-2 rounded-full bg-white/10 border border-white/20 text-blue-100 text-sm font-medium backdrop-blur-sm hover:bg-white/20 hover:text-white transition"
            >
              {item}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
