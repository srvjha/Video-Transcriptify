import React, { useState,useEffect } from "react";
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import {Mode} from '../../config/ApplicationMode.js'

function Register() {
  const [username, setUsername] = useState('');
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [box, setBox] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleRegisterForm = (e) => {
    e.preventDefault();
    setError("");

    // Username validation
    const userNameRegex = /^[a-zA-Z_]+$/;
    if (!userNameRegex.test(username)) {
      setError("Username must contain only alphabets.");
      setPasswordError(false);
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      setPasswordError(false);
      return;
    }

    // Password validation
    const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,15}$/;
    if (!passwordRegex.test(password)) {
      setPasswordError(true);
      setError("Password must be 8-15 characters long, contain at least one uppercase letter, one number, and one special character (!@#$%^&*).");
      return;
    }

    if (!box) {
      setError("Accept the terms and conditions to proceed.");
      return;
    }
    
    const envNode = Mode();
    let envURL;    
    envURL = envNode.url;
   
   
    axios
      .post(`${envURL}/api/v1/users/register`, {
        fullName: fullname, username: username, email: email, password: password
      },{withCredentials: true,})
      .then((res) => {
        formReset(e);
        navigate("/login", { state: { fullName: res.data.data.fullName } });
      })
      .catch((error) => {
        if (error.response && error.response.data && error.response.data.message) {
          setError(error.response.data.message);
          setTimeout(() => setError(""), 2000);
        } else {
          setError("An unexpected error occurred.");
          setTimeout(() => setError(""), 2000);
        }
      });
  };
    useEffect(() => {
      setShowPassword(true);
      setBox(false)
      
    }, []);
  
  
    // cleaning the field
    const formReset = (e) => {
      e.preventDefault();
      setUsername("");
      setFullname("");
      setEmail("");
      setPassword("");
    };

  return (
   
    <div className="min-h-screen bg-gradient-to-r from-purple-900 via-pink-600 to-blue-400 flex items-center justify-center">
    <div className=" flex flex-row  mx-auto md:h-screen lg:py-0 md:justify-center overflow-hidden">
         <div className='hidden lg:block '>
            <img src="banner.webp" alt="" className='h-[737px] w-[1000px]' />
         </div>
          <div className="w-[760px] bg-white flex items-center justify-center">
            <div className="p-6 mt-16  flex flex-col items-center justify-center space-y-2 md:space-y-2 sm:p-8 w-[550px]">
              <div className="text-5xl font-bold text-gray-900">
                Welcome!
              </div>
              <div className="text-[19px] text-gray-900">
                Join <span className="font-semibold text-gray-700">Video Transcriptify</span> today!
              </div>

              <form
                className="space-y-4 md:space-y-6 w-[400px] p-2"
                onSubmit={handleRegisterForm}
              >
                <div>
                  <label
                    htmlFor="username"
                    className="block mb-2 text-md font-medium text-gray-900"
                  >
                    Username
                  </label>
                  <input
                    type="text"
                    name="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    id="username"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg text-md focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="Username"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="fullname"
                    className="block mb-2 text-md font-medium text-gray-900"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="fullname"
                    value={fullname}
                    onChange={(e) => setFullname(e.target.value)}
                    id="fullname"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg text-md focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="Full Name"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-md font-medium text-gray-900"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg text-md focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="name@company.com"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-md font-medium text-gray-900"
                  >
                    Password
                  </label>
                  <div className="flex flex-row">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      id="password"
                      placeholder="••••••••"
                      className="flex bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 w-full -mr-10 p-2.5"
                      required
                    />
                    <div
                      className="mt-3 ml-2 cursor-pointer"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? (
                        // Eye-off SVG
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          width={20}
                          height={20}
                          color="#000000"
                          fill="none"
                        >
                          <path
                            d="M19.439 15.439C20.3636 14.5212 21.0775 13.6091 21.544 12.955..."
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      ) : (
                        // Eye SVG
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          width={20}
                          height={20}
                          color="#000000"
                          fill="none"
                        >
                          <path
                            d="M2 8C2 8 6.47715 3 12 3..."
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                          />
                        </svg>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="terms"
                    className="w-4 h-4 border border-gray-300 rounded focus:ring-primary-600"
                    onChange={() => setBox(!box)}
                  />
                  <label
                    htmlFor="terms"
                    className="ml-2 text-sm font-medium text-gray-900"
                  >
                    I accept the <span className="text-primary-600">Terms and Conditions</span>
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full text-white bg-black hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Sign up
                </button>

                {error && (
                  <div className="flex flex-row mt-4">
                    <div className="h-[44px] w-2 border rounded-s-lg bg-red-700 mx-4 ml-[1px]"></div>
                    <div className="p-2 border rounded-e-lg bg-gray-200 text-black font-semibold -ml-4">
                      {error}
                    </div>
                  </div>
                )}

                <p className="text-sm font-light text-gray-900">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="font-medium ml-1 text-primary-600 hover:underline"
                  >
                    Sign in
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
   
  );
}

export default Register;
