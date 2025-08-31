// src/components/Navbar.jsx
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

export default function Navbar() {
  const [openMenu, setOpenMenu] = useState(null);
  const closeTimerRef = useRef(null);
  const navRef = useRef(null);

  const open = (menu) => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    setOpenMenu(menu);
  };
  const startCloseTimer = () => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    closeTimerRef.current = setTimeout(() => setOpenMenu(null), 180);
  };
  const closeImmediate = () => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    setOpenMenu(null);
  };

  useEffect(() => {
    const handleClick = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) closeImmediate();
    };
    const handleEsc = (e) => {
      if (e.key === "Escape") closeImmediate();
    };
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleEsc);
    };
  }, []);

  // Glassy Dropdown Panel
  const DropdownPanel = ({ menu, title, items }) => (
    <div
      className={`absolute mt-3 w-[480px] backdrop-blur-xl bg-blue-100/70 border border-blue-200/40 
                  rounded-xl shadow-2xl p-5 z-50 transition-all duration-200
        ${openMenu === menu ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-3 pointer-events-none"}`}
      onMouseEnter={() => open(menu)}
      onMouseLeave={startCloseTimer}
    >
      <h3 className="text-gray-800 font-semibold mb-3">{title}</h3>
      <div className="grid grid-cols-2 gap-x-6 gap-y-3">
        {items.map(({ label, subtext, path }) => (
          <Link
            key={label}
            to={path}
            className="block p-3 rounded-lg transition-all 
                       bg-white/10 hover:bg-gradient-to-r hover:from-blue-400/30 hover:to-blue-600/40 
                       hover:scale-[1.02] hover:shadow-lg"
          >
            <p className="font-medium text-gray-900">{label}</p>
            <p className="text-sm text-gray-600">{subtext}</p>
          </Link>
        ))}
      </div>
    </div>
  );

  return (
    <nav ref={navRef} className="absolute top-0 left-0 w-full z-50 bg-transparent">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-3 items-center py-3">

        {/* LEFT */}
        <div className="flex items-center gap-8 px-8">
          {/* Donate */}
          <div
            className="relative"
            onMouseEnter={() => open("donate")}
            onMouseLeave={startCloseTimer}
          >
            <button className="font-medium hover:text-blue-600">Donate ▾</button>
            <DropdownPanel
              menu="donate"
              title="Browse fundraisers by category"
              items={[
                { label: "Medical", subtext: "Treatments & emergencies", path: "/donate/medical" },
                { label: "Education", subtext: "Support students & schools", path: "/donate/education" },
                { label: "Emergency", subtext: "Disaster relief", path: "/donate/emergency" },
                { label: "Animals", subtext: "Rescue & shelters", path: "/donate/animals" },
                { label: "Business", subtext: "Support small ventures", path: "/donate/business" },
              ]}
            />
          </div>

          {/* Fundraise */}
          <div
            className="relative"
            onMouseEnter={() => open("fundraise")}
            onMouseLeave={startCloseTimer}
          >
            <button className="font-medium hover:text-blue-600">Fundraise ▾</button>
            <DropdownPanel
              menu="fundraise"
              title="Start fundraising, tips and resources"
              items={[
                { label: "How to start", subtext: "Step by step guide", path: "/fundraise/start" },
                { label: "Tips & ideas", subtext: "Grow your campaign", path: "/fundraise/tips" },
                { label: "Categories", subtext: "Find the right cause", path: "/fundraise/categories" },
                { label: "Charity signup", subtext: "Register your NGO", path: "/fundraise/charity" },
              ]}
            />
          </div>
        </div>

        {/* CENTER: Logo */}
        <div className="flex justify-center items-center">
          <Link to="/" className="flex items-center justify-center">
            <img
              src={logo}
              alt="OpenCause Logo"
              className="object-contain"
              style={{ height: "120px", width: "auto" }}
            />
          </Link>
        </div>

        {/* RIGHT */}
        <div className="flex items-center justify-end gap-6 px-8 whitespace-nowrap">
          {/* About */}
          <div
            className="relative"
            onMouseEnter={() => open("about")}
            onMouseLeave={startCloseTimer}
          >
            <button className="font-medium hover:text-blue-600">About ▾</button>
            <DropdownPanel
              menu="about"
              title="Learn about OpenCause"
              items={[
                { label: "About Us", subtext: "Our mission & vision", path: "/about" },
                { label: "How It Works", subtext: "Donation workflow", path: "/about/how" },
                { label: "Why Blockchain", subtext: "Transparency & trust", path: "/about/blockchain" },
                { label: "FAQ", subtext: "Answers to questions", path: "/about/faq" },
              ]}
            />
          </div>

          {/* 🔹 Blue Gradient Buttons */}
          <Link
            to="/login"
            className="px-5 py-2 rounded-lg font-semibold text-white 
                       bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700
                       hover:from-blue-600 hover:via-blue-700 hover:to-blue-800
                       transform transition-all duration-300 ease-out
                       hover:-translate-y-1 hover:scale-105 hover:shadow-xl"
          >
            Login
          </Link>

          <Link
            to="/signup"
            className="px-5 py-2 rounded-lg font-semibold text-white 
                       bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700
                       hover:from-blue-600 hover:via-blue-700 hover:to-blue-800
                       transform transition-all duration-300 ease-out
                       hover:-translate-y-1 hover:scale-105 hover:shadow-2xl"
          >
            Start a Campaign
          </Link>
        </div>
      </div>
    </nav>
  );
}
