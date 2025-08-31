// src/components/ActiveFundraisers.jsx
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

/* ---------- Local UI helpers ---------- */
function Card({ children, className = "" }) {
  return (
    <div className={`rounded-2xl shadow-lg bg-white border border-gray-200 ${className}`}>
      {children}
    </div>
  );
}

function CardContent({ children, className = "" }) {
  return <div className={`p-4 ${className}`}>{children}</div>;
}

function Button({ children, className = "", ...props }) {
  return (
    <button
      className={`px-4 py-2 rounded-lg font-medium transition ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

/* ---------- Main component ---------- */
export default function ActiveFundraisers() {
  const allFundraisers = [
    { id: 1, title: "Medical Aid for Rural Families", description: "Support free health checkups and medicines.", goal: 8000, raised: 4000, image: "https://placehold.co/600x360?text=Medical", category: "Medical" },
    { id: 2, title: "Help Build School for Kids", description: "Funds for classrooms and study materials.", goal: 5000, raised: 3200, image: "https://placehold.co/600x360?text=Education", category: "Education" },
    { id: 3, title: "Relief Fund for Flood Victims", description: "Food, shelter & clothes for displaced families.", goal: 12000, raised: 9600, image: "https://placehold.co/600x360?text=Emergency", category: "Emergency" },
    { id: 4, title: "Clean Drinking Water Project", description: "Install handpumps & filters in villages.", goal: 10000, raised: 7500, image: "https://placehold.co/600x360?text=Business", category: "Business" },
    { id: 5, title: "Animal Rescue Mission", description: "Shelter & medical care for abandoned animals.", goal: 7000, raised: 5000, image: "https://placehold.co/600x360?text=Animals", category: "Animals" },
  ];

  const [category, setCategory] = useState("All");
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on outside click / ESC
  useEffect(() => {
    const onClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const fundraisers =
    category === "All" ? allFundraisers : allFundraisers.filter((f) => f.category === category);

  return (
    <section className="py-16 bg-gradient-to-b from-blue-50 to-white" id="fundraisers">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10 gap-4">
          <h2 className="text-3xl font-bold text-gray-900">
            Discover fundraisers in the <span className="text-blue-600">Blockchain World</span>
          </h2>

          {/* Glassy Dropdown */}
          <div ref={dropdownRef} className="relative">
            <button
              onClick={() => setOpen((v) => !v)}
              className="px-5 py-2 rounded-xl bg-white/30 backdrop-blur-md border border-white/40
                         shadow-lg text-gray-800 font-medium hover:bg-white/40 transition"
            >
              {category} ▾
            </button>

            <AnimatePresence>
              {open && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.18 }}
                  className="absolute right-0 mt-2 w-52 bg-white/40 backdrop-blur-xl border border-white/50
                             rounded-xl shadow-xl overflow-hidden z-20"
                >
                  {["All", "Medical", "Education", "Emergency", "Business", "Animals"].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => {
                        setCategory(cat);
                        setOpen(false);
                      }}
                      className={`block w-full text-left px-4 py-2 text-gray-800 hover:bg-blue-100/60
                                  ${category === cat ? "font-semibold text-blue-700" : ""}`}
                    >
                      {cat}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Grid (uniform card sizes) */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {fundraisers.map((f) => {
            const progress = Math.min(f.raised / f.goal, 1);
            return (
              <motion.div
                key={f.id}
                whileHover={{ scale: 1.02, y: -4 }}
                transition={{ type: "spring", stiffness: 220, damping: 18 }}
              >
                <Card className="overflow-hidden flex flex-col h-full">
                  <img src={f.image} alt={f.title} className="w-full h-48 object-cover" />
                  <CardContent className="flex flex-col justify-between flex-grow space-y-2">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">{f.title}</h3>
                      <p className="text-sm text-gray-600">{f.description}</p>
                    </div>

                    {/* Progress */}
                    <div>
                      <div className="w-full bg-gray-200 h-2 rounded-lg overflow-hidden mt-2">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${progress * 100}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.1, ease: "easeOut" }}
                          className="h-full bg-gradient-to-r from-blue-400 to-blue-600"
                        />
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        Raised ${f.raised} of ${f.goal}
                      </p>
                    </div>

                    <div className="pt-3">
                      <Link to="/login">
                        <Button className="w-full bg-gradient-to-tr from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white px-5 py-2 shadow-md hover:shadow-lg transition-transform transform hover:-translate-y-0.5">
                          Donate
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
