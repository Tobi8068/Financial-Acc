import { Link } from 'react-router-dom';
import { Mail, Lock, User, Phone } from 'lucide-react';

export default function SignUp() {
  return (
    <div className="bg-gray-50">
      <div className="flex ">
        <div className="flex-1 flex flex-col justify-center px-16">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Sign Up</h1>
          <p className="text-gray-600 mb-8 max-w-md">
            Some Description Text, Some Description Text, Some Description Text, Some Description Text,
            Some Description Text, Some Description Text, Some Description Text, Some Description Text.
          </p>
          <div className="text-sm text-gray-600 mb-8">
            Already have an account?{' '}
            <Link to="/signin" className="text-indigo-600 hover:text-indigo-500 font-medium">
              Sign In
            </Link>
          </div>
        </div>
        
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
            <form className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                    First Name
                  </label>
                  <div className="mt-1 relative">
                    <input
                      type="text"
                      id="firstName"
                      className="block w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="First Name"
                    />
                    <User className="absolute right-3 top-3.5 h-5 w-5 text-gray-400" />
                  </div>
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                    Last Name
                  </label>
                  <div className="mt-1 relative">
                    <input
                      type="text"
                      id="lastName"
                      className="block w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Last Name"
                    />
                    <User className="absolute right-3 top-3.5 h-5 w-5 text-gray-400" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <div className="mt-1 relative">
                    <input
                      type="email"
                      id="email"
                      className="block w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Email"
                    />
                    <Mail className="absolute right-3 top-3.5 h-5 w-5 text-gray-400" />
                  </div>
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                    Phone Number
                  </label>
                  <div className="mt-1 relative">
                    <input
                      type="tel"
                      id="phone"
                      className="block w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Phone Number"
                    />
                    <Phone className="absolute right-3 top-3.5 h-5 w-5 text-gray-400" />
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="mt-1 relative">
                  <input
                    type="password"
                    id="password"
                    className="block w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Password"
                  />
                  <Lock className="absolute right-3 top-3.5 h-5 w-5 text-gray-400" />
                </div>
                <ul className="mt-2 text-xs text-gray-600 space-y-1">
                  <li className="text-green-600">• Atleast 8 Characters</li>
                  <li className="text-green-600">• Atleast 1 Lower case(a-z) and 1 Upper case letter(A-B)</li>
                  <li className="text-green-600">• 1 Number</li>
                  <li className="text-red-600">• 1 Special Character</li>
                </ul>
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                  Confirm Password
                </label>
                <div className="mt-1 relative">
                  <input
                    type="password"
                    id="confirmPassword"
                    className="block w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Confirm Password"
                  />
                  <Lock className="absolute right-3 top-3.5 h-5 w-5 text-gray-400" />
                </div>
              </div>

              <div className="flex items-start">
                <input
                  type="checkbox"
                  id="terms"
                  className="h-4 w-4 mt-1 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                  By Selecting this, I agree to the{' '}
                  <Link to="/terms" className="text-indigo-600 hover:text-indigo-500">
                    Terms & Conditions
                  </Link>
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                Sign Up
              </button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">OR</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  className="w-full py-3 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 flex items-center justify-center space-x-2"
                >
                  <img src="https://www.google.com/favicon.ico" alt="Google" className="h-5 w-5" />
                  <span>Continue with Google</span>
                </button>
                <button
                  type="button"
                  className="w-full py-3 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 flex items-center justify-center space-x-2"
                >
                  <img src="" alt="Facebook" className="h-5 w-5" />
                  <span>Continue with Facebook</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}