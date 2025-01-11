import { Link } from 'react-router-dom';
import { Mail, Lock } from 'lucide-react';

export default function SignIn() {
    return (
        <div className="bg-transparent max-w-7xl w-full">
            <div className="flex ">
                <div className="flex-1 flex flex-col justify-center px-16">
                    <h1 className="text-6xl font-bold text-gray-800 mb-4">Sign In</h1>
                    <p className="text-gray-600">
                        Some Description Text, Some Description Text, Some Description Text,
                        Some Description Text, Some Description Text, Some Description Text,
                        Some Description Text, Some Description Text, Some Description Text,
                        Some Description Text, Some Description Text, Some Description Text,
                    </p>
                    <div className="text-sm mt-24 text-gray-600 flex flex-col justify-center items-center w-full gap-4">
                        <span>Don't have an account yet?</span>
                        <Link to="/signup" className="py-3 px-4 max-w-sm w-full text-center border border-transparent rounded-lg shadow-sm text-sm font-medium text-[#414651] bg-white">
                            Sign Up
                        </Link>
                    </div>
                </div>

                <div className="flex-1 flex items-center justify-center">
                    <div className="w-full max-w-sm bg-white p-8 rounded-2xl shadow-lg flex flex-col gap-16">
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
                                className="w-full py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-[#3A3B55] hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                            >
                                Sign In
                            </button>
                        </form>
                        <div className="text-sm text-center">
                            <span className='text-[#474969]'>Forgot Password? </span>
                            <Link to="/forgot-password" className="text-[#474969] hover:text-indigo-500">
                                <u>Click here</u>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}