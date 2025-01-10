import { Wallet } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Navbar() {
  return (
    <nav className="flex items-center justify-between px-6 py-4 h-[8%]">
      <Link to="/" className="flex items-center space-x-2">
        <Wallet className="h-8 w-8 text-indigo-600" />
        <span className="text-xl font-semibold">
          <span className="text-gray-800">Finances</span>
          <span className="text-indigo-600">App</span>
        </span>
      </Link>
      <div className="flex items-center space-x-6">
        <Link to="/" className="text-gray-600 hover:text-gray-800">Home</Link>
        <Link to="/about" className="text-gray-600 hover:text-gray-800">About Us</Link>
        <Link to="/services" className="text-gray-600 hover:text-gray-800">Our Services</Link>
        <Link to="/contact" className="text-gray-600 hover:text-gray-800">Contact Us</Link>
        <Link to="/signin" className="px-4 py-2 rounded-lg bg-gray-800 text-white hover:bg-gray-700">
          Sign In
        </Link>
      </div>
    </nav>
  );
}