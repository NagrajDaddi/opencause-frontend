import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import WalletConnect from "../components/WalletConnect";
import ProjectList from "../components/ProjectList";
import { Link } from "react-router-dom";
import HowItWorks from "../components/HowItWorks";
import DonorProtectionCard from "../components/DonorProtectionCard";
import ScrollConnector from "../components/ScrollConnector"; 
import NoMiddlemenCard from "../components/NoMiddlemenCard";
import BlockchainTransparencyCard from "../components/BlockchainTransparencyCard";
import PulseConnector from "../components/PulseConnector";
import MicroHeadlineTransition from "../components/MicroHeadlineTransition";
import ActiveFundraisers from "../components/ActiveFundraisers";
import FinalCTA from "../components/FinalCTA"
import Footer from "../components/Footer"

export default function GuestDashboard() {
  // 👉 Define handler here so error is gone
  const handlePulse = () => {
    console.log("Pulse animation finished, now show headline transition");
  };

  return (
    <div className="bg-gradient-to-b from-blue-50 to-white min-h-screen">
      <HeroSection />
      <HowItWorks />
      <ScrollConnector />
      <DonorProtectionCard />
      <ScrollConnector />
      <NoMiddlemenCard />
      <ScrollConnector />
      <BlockchainTransparencyCard />

      {/* 🔵 New interactive transition */}
      <PulseConnector onPulseComplete={handlePulse} />
       <MicroHeadlineTransition />
      <ActiveFundraisers />
      <FinalCTA  />
      <Footer   />
    </div>
  );
}
