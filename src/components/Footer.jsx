// src/components/Footer.jsx
import { Link } from "react-router-dom";
import { FaFacebook, FaYoutube, FaXTwitter, FaInstagram, FaMedium, FaPodcast } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 pt-10 pb-6 text-sm text-gray-600">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
        {/* Donate */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-3">Donate</h3>
          <ul className="space-y-2">
            <li><Link to="/donate/categories" className="hover:text-blue-600">Medical</Link></li>
            <li><Link to="/donate/crisis" className="hover:text-blue-600">Emergency</Link></li>
            <li><Link to="/donate/impact" className="hover:text-blue-600">Education</Link></li>
            <li><Link to="/donate/supporters" className="hover:text-blue-600">Animals</Link></li>
            <li><Link to="/donate/nonprofits" className="hover:text-blue-600">Business</Link></li>
          </ul>
        </div>

        {/* Fundraise */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-3">Fundraise</h3>
          <ul className="space-y-2">
            <li><Link to="/fundraise/start" className="hover:text-blue-600">How to start</Link></li>
            <li><Link to="/fundraise/categories" className="hover:text-blue-600">Categories</Link></li>
            <li><Link to="/fundraise/team" className="hover:text-blue-600">Team fundraising</Link></li>
            <li><Link to="/fundraise/blog" className="hover:text-blue-600">Blog</Link></li>
            <li><Link to="/fundraise/charity" className="hover:text-blue-600">Charity fundraising</Link></li>
            <li><Link to="/fundraise/nonprofit" className="hover:text-blue-600">Sign up as nonprofit</Link></li>
          </ul>
        </div>

        {/* About */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-3">About</h3>
          <ul className="space-y-2">
            <li><Link to="/about/how-it-works" className="hover:text-blue-600">How it works</Link></li>
            <li><Link to="/about/guarantee" className="hover:text-blue-600">Giving Guarantee</Link></li>
            <li><Link to="/about/countries" className="hover:text-blue-600">Supported countries</Link></li>
            <li><Link to="/about/pricing" className="hover:text-blue-600">Pricing</Link></li>
            <li><Link to="/about/help" className="hover:text-blue-600">Help Center</Link></li>
            <li><Link to="/about/opencause" className="hover:text-blue-600">About OpenCause</Link></li>
          </ul>
        </div>

        {/* Other */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-3">More</h3>
          <ul className="space-y-2">
            <li><Link to="/newsroom" className="hover:text-blue-600">Newsroom</Link></li>
            <li><Link to="/careers" className="hover:text-blue-600">Careers</Link></li>
            <li><Link to="/partners" className="hover:text-blue-600">Partnerships</Link></li>
            <li><Link to="/opencause-org" className="hover:text-blue-600">OpenCause.org</Link></li>
            <li><Link to="/nonprofits-pro" className="hover:text-blue-600">For nonprofits</Link></li>
          </ul>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="max-w-7xl mx-auto px-6 mt-10 pt-6 border-t border-gray-200 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Language selector */}
        <div className="flex items-center gap-2 text-sm text-gray-700">
          <span role="img" aria-label="flag">🇺🇸</span> India · English
        </div>

        {/* Footer Links */}
        <div className="flex flex-wrap gap-4 text-xs text-gray-500">
          <Link to="/terms" className="hover:text-blue-600">Terms</Link>
          <Link to="/privacy" className="hover:text-blue-600">Privacy Notice</Link>
          <Link to="/legal" className="hover:text-blue-600">Legal</Link>
          <Link to="/accessibility" className="hover:text-blue-600">Accessibility</Link>
          <Link to="/cookies" className="hover:text-blue-600">Cookie Policy</Link>
        </div>

        {/* Social Icons */}
        <div className="flex gap-4 text-xl text-gray-600">
          <a href="https://facebook.com" target="_blank" rel="noreferrer"><FaFacebook /></a>
          <a href="https://youtube.com" target="_blank" rel="noreferrer"><FaYoutube /></a>
          <a href="https://twitter.com" target="_blank" rel="noreferrer"><FaXTwitter /></a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer"><FaInstagram /></a>
          <a href="https://medium.com" target="_blank" rel="noreferrer"><FaMedium /></a>
          <a href="#" target="_blank" rel="noreferrer"><FaPodcast /></a>
        </div>
      </div>

      {/* Bottom copyright */}
      <div className="max-w-7xl mx-auto px-6 mt-6 text-xs text-gray-400 text-center">
        © {new Date().getFullYear()} OpenCause · All rights reserved
      </div>
    </footer>
  );
}
