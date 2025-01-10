import { Link } from 'react-router-dom';
import { Mail, Lock } from 'lucide-react';

export default function SignIn() {
  return (
    <div className="bg-gray-50">
      <div className="flex ">
        <div className="flex-1 flex flex-col justify-center px-16">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Sign In</h1>
          <p className="text-gray-600 mb-8 max-w-md">
            Some Description Text, Some Description Text, Some Description Text, Some Description Text,
            Some Description Text, Some Description Text, Some Description Text, Some Description Text.
          </p>
          <div className="text-sm text-gray-600 mb-8">
            Don't have an account yet?{' '}
            <Link to="/signup" className="text-indigo-600 hover:text-indigo-500 font-medium">
              Sign Up
            </Link>
          </div>
        </div>
        
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
            <form className="space-y-6">
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
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">
                  Remember Me
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                Sign In
              </button>

              <div className="text-sm text-center">
                <Link to="/forgot-password" className="text-indigo-600 hover:text-indigo-500">
                  Forgot Password? Click here
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}