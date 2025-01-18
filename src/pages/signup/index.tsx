import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Lock, User, Phone } from 'lucide-react';
import FbIcon from '@/assets/img/fb.png';

export default function SignUp() {

  const validateLength = (password: string) => password.length >= 8;
  const validateCase = (password: string) => /(?=.*[a-z])(?=.*[A-Z])/.test(password);
  const validateNumber = (password: string) => /\d/.test(password);
  const validateSpecial = (password: string) => /[!@#$%^&*(),.?":{}|<>]/.test(password);

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    password: '',
    role: "supplier",
    organization: 1
  });

  const [confirmPassword, setConfirmPassword] = useState('');

  const [validations, setValidations] = useState({
    length: false,
    case: false,
    number: false,
    special: false,
    match: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'password') {
      setValidations({
        length: validateLength(value),
        case: validateCase(value),
        number: validateNumber(value),
        special: validateSpecial(value),
        match: value === confirmPassword
      });
    }
    if (name === 'confirmPassword') {
      setValidations({ ...validations, match: confirmPassword === formData.password });
    }
    setFormData({ ...formData, [name]: value });
  }

  const handleSignUp = async () => {
    if (Object.values(validations).every(Boolean)) {
      try {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });
        if (response.ok) {
          console.log('Sign-up successful');
        } else {
          console.log('Error:', response.status);
        }
      } catch (err) {
        console.log(err);
      }
    }
  }

  return (
    <div className="bg-transparent max-w-7xl w-full h-full">
      <div className="flex md:flex-row flex-col md:gap-0 gap-6">
        <div className="flex-1 flex flex-row items-end md:flex-col justify-center px-4 lg:px-8 xl:px-16 max-w-fit md:max-w-[280px] lg:max-w-fit">
          <div className='max-w-[60%] md:max-w-fit'>
            <h1 className="text-6xl font-bold text-gray-800 mb-4">Sign Up</h1>
            <p className="text-gray-600">
              Some Description Text, Some Description Text, Some Description Text,
              Some Description Text, Some Description Text, Some Description Text,
              Some Description Text, Some Description Text, Some Description Text,
              Some Description Text, Some Description Text, Some Description Text,
            </p>
          </div>
          <div className="text-sm mt-0 md:mt-24 text-gray-600 flex flex-col justify-center items-center w-full gap-4">
            <span>Already have an account?</span>
            <Link to="/signin" className="py-3 px-4 max-w-sm w-full text-center border border-transparent rounded-lg shadow-sm text-sm font-medium text-[#414651] bg-white">
              Sign In
            </Link>
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center md:w-fit w-full">
          <div className="w-full max-w-xl bg-white p-8 rounded-2xl shadow-lg">
            <form className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">
                    First Name
                  </label>
                  <div className="mt-1 relative">
                    <input
                      type="text"
                      name="first_name"
                      value={formData.first_name}
                      onChange={handleChange}
                      className="block w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="First Name"
                    />
                    <User className="absolute right-3 top-3.5 h-5 w-5 text-gray-400" />
                  </div>
                </div>
                <div>
                  <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">
                    Last Name
                  </label>
                  <div className="mt-1 relative">
                    <input
                      type="text"
                      name="last_name"
                      value={formData.last_name}
                      onChange={handleChange}
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
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="block w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Email"
                    />
                    <Mail className="absolute right-3 top-3.5 h-5 w-5 text-gray-400" />
                  </div>
                </div>
                <div>
                  <label htmlFor="phone_number" className="block text-sm font-medium text-gray-700">
                    Phone Number
                  </label>
                  <div className="mt-1 relative">
                    <input
                      type="tel"
                      name="phone_number"
                      value={formData.phone_number}
                      onChange={handleChange}
                      className="block w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Phone Number"
                    />
                    <Phone className="absolute right-3 top-3.5 h-5 w-5 text-gray-400" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <div className="mt-1 relative">
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="block w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Password"
                    />
                    <Lock className="absolute right-3 top-3.5 h-5 w-5 text-gray-400" />
                    <ul className={`mt-2 text-xs text-gray-600 space-y-1 ${formData.password.length == 0 ? "hidden" : "block"}`}>
                      <li className={validations.length ? "text-green-600" : "text-red-600"}>
                        • Atleast 8 Characters
                      </li>
                      <li className={validations.case ? "text-green-600" : "text-red-600"}>
                        • Atleast 1 Lower case(a-z) and 1 Upper case letter(A-B)
                      </li>
                      <li className={validations.number ? "text-green-600" : "text-red-600"}>
                        • 1 Number
                      </li>
                      <li className={validations.special ? "text-green-600" : "text-red-600"}>
                        • 1 Special Character
                      </li>
                    </ul>
                  </div>
                </div>
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                    Confirm Password
                  </label>
                  <div className="mt-1 relative">
                    <input
                      type="password"
                      name="confirmPassword"
                      value={confirmPassword}
                      onChange={(e) => {
                        if (formData.password === e.target.value) {
                          setValidations({ ...validations, match: true })
                        } else {
                          setValidations({ ...validations, match: false })
                        }
                        setConfirmPassword(e.target.value)
                      }}
                      className="block w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Confirm Password"
                    />
                    <Lock className="absolute right-3 top-3.5 h-5 w-5 text-gray-400" />
                    <ul className={`mt-2 text-xs text-gray-600 space-y-1 ${(formData.password.length == 0) || validations.match ? "hidden" : "block"}`}>
                      <li className="text-red-600">
                        • Password does not match
                      </li>
                    </ul>
                  </div>
                </div>

              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="terms"
                  className="h-4 w-4 border-gray-300 rounded"
                />
                <label htmlFor="terms" className="ml-2 block text-sm text-[#414651]">
                  By Selecting this, I agree to the{' '}
                  <Link to="/terms" className="text-[#414651]">
                    <u>Terms & Conditions</u>
                  </Link>
                </label>
              </div>

              <button
                type="button"
                onClick={handleSignUp}
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
                  <span>Continue with Google</span>
                  <img src="https://www.google.com/favicon.ico" alt="Google" className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  className="w-full py-3 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 flex items-center justify-center space-x-2"
                >
                  <span>Continue with Facebook</span>
                  <img src={FbIcon} alt="Facebook" className="h-5 w-5" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}