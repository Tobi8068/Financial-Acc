import { Wallet } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="bg-[#1D1E2B] flex items-center text-white py-8 px-6 max-h-[21%]">
      <div className="max-w-7xl w-full mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Wallet className="h-8 w-8 text-white" />
          <span className="text-xl font-semibold">
            <span className="text-white">Finances</span>
            <span className="text-indigo-400">App</span>
          </span>
        </div>
        <div className="flex items-center space-x-6">
          <Link to="/" className="text-gray-300 hover:text-white">Home</Link>
          <Link to="/about" className="text-gray-300 hover:text-white">About Us</Link>
          <Link to="/services" className="text-gray-300 hover:text-white">Our Services</Link>
          <Link to="/contact" className="text-gray-300 hover:text-white">Contact Us</Link>
          <Link to="/terms" className="text-gray-300 hover:text-white">Terms & Conditions</Link>
          <Link to="/privacy" className="text-gray-300 hover:text-white">Privacy Policy</Link>
          <Link to="/contact" className="px-4 py-2 rounded-lg bg-white text-gray-900 hover:bg-gray-100">
            Contact Us
          </Link>
        </div>
      </div>
    </footer>
  );
}