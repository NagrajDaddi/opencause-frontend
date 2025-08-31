// MicroHeadlineTransition.jsx
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export default function MicroHeadlineTransition() {
  const ref = useRef(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.2) {
            setStarted(true);
          }
        });
      },
      { threshold: [0.2, 0.5] }
    );
    io.observe(el);

    const onPulse = () => setStarted(true);
    window.addEventListener("pulse:started", onPulse);

    return () => {
      io.disconnect();
      window.removeEventListener("pulse:started", onPulse);
    };
  }, []);

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.25 } },
  };
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <section
      ref={ref}
      className="relative w-full py-20 flex flex-col items-center text-center bg-white"
    >
      {/* Headings */}
      <motion.div
        variants={container}
        initial="hidden"
        animate={started ? "show" : "hidden"}
        className="space-y-2"
      >
        <motion.h2 variants={item} className="text-3xl md:text-4xl font-bold text-blue-700">
          From Promise
        </motion.h2>

        <motion.h2 variants={item} className="text-3xl md:text-4xl font-bold text-blue-600">
          to Reality
        </motion.h2>

        <motion.h2 variants={item} className="text-3xl md:text-4xl font-extrabold text-blue-500">
          Live Fundraising
        </motion.h2>
      </motion.div>

      {/* Live badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={
          started
            ? { opacity: 1, scale: [1, 1.05, 1] }
            : { opacity: 0, scale: 0.95 }
        }
        transition={{
          delay: 1.0,
          duration: 1.2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="mt-4 px-4 py-1 rounded-full bg-blue-600 text-white text-sm font-semibold"
      >
        ✨ Live Now
      </motion.div>

      {/* Horizontal connector */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={started ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ delay: 1.2, duration: 0.8, ease: "easeOut" }}
        className="mt-8 h-[3px] w-40 bg-blue-500 rounded-full origin-left"
      />

      {/* Vertical dotted line starting from horizontal center */}
<motion.div
  initial={{ height: 0, opacity: 0 }}
  animate={
    started
      ? { height: 280, opacity: 1, backgroundPositionY: [0, 16] }
      : { height: 0, opacity: 0 }
  }
  transition={{ 
    delay: 1.5, 
    duration: 1.5, 
    ease: "easeInOut",
    repeat: Infinity,
    repeatType: "loop"
  }}
  className="absolute top-[100%] left-1/2 transform -translate-x-1/2 w-[4px] rounded-full
             bg-[repeating-linear-gradient(to bottom,#3b82f6,#3b82f6_4px,transparent_4px,transparent_8px)]"
/>



      {/* Animated dot */}
<motion.div
  animate={
    started
      ? { y: [0, 80], opacity: [2, 0] }
      : {}
  }
  transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
  className="absolute top-full left-1/2 transform -translate-x-1/2 w-3 h-3 bg-blue-500 rounded-full"
/>

    </section>
  );
}
