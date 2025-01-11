import { Wallet } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Navbar() {
  return (
    <nav className="flex items-center justify-between px-6 py-4 h-[8%] shadow-lg">
      <Link to="/" className="flex items-center space-x-2">
        <Wallet className="h-8 w-8 text-indigo-600" />
        <span className="text-xl font-semibold">
          <span className="text-[#3A3B55]">Finances</span>
          <span className="text-[#636692]">App</span>
        </span>
      </Link>
      <div className="flex items-center space-x-10">
        <Link to="/" className="text-[#636692] hover:text-gray-800">Home</Link>
        <Link to="/about" className="text-[#636692] hover:text-gray-800">About Us</Link>
        <Link to="/services" className="text-[#636692] hover:text-gray-800">Our Services</Link>
        <Link to="/contact" className="text-[#636692] hover:text-gray-800">Contact Us</Link>
      </div>
      <Link to="/signin" className="px-4 py-2 rounded-lg bg-[#3A3B55] text-white hover:bg-gray-700">
        Sign In
      </Link>
    </nav>
  );
}