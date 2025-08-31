import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages
import GuestDashboard from "./pages/GuestDashboard";
import DonorDashboard from "./pages/DonorDashboard";
import BeneficiaryDashboard from "./pages/BeneficiaryDashboard";

// Components (auth forms)
import Login from "./components/Login";
import Register from "./components/Register";

// Navbar (global navigation)
import Navbar from "./components/Navbar";

export default function App() {
  return (
    <Router>
      <div className="bg-gradient-to-b from-blue-50 to-white min-h-screen">
        {/* ✅ Global Navbar */}
        <Navbar />

        {/* ✅ Page content */}
        <div className="p-6">
          <Routes>
            {/* Landing page */}
            <Route path="/" element={<GuestDashboard />} />

            {/* Auth pages */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Register />} />

            {/* Dashboards */}
            <Route path="/donor" element={<DonorDashboard />} />
            <Route path="/beneficiary" element={<BeneficiaryDashboard />} />
            
          </Routes>
        </div>
      </div>
    </Router>
  );
}
