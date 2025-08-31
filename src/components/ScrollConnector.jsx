import { motion, useScroll } from "framer-motion";
import { useRef } from "react";

export default function ScrollConnector() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  return (
    <div ref={ref} className="relative flex justify-center my-10">
      {/* Line */}
      <motion.div
        style={{ scaleY: scrollYProgress }}
        className="w-1 h-20 bg-gradient-to-b from-blue-500 to-blue-300 origin-top rounded-full"
      />

      {/* Glowing Node at bottom */}
      <div className="absolute bottom-0 w-4 h-4 bg-blue-600 rounded-full shadow-lg shadow-blue-400 animate-pulse" />
    </div>
  );
}
