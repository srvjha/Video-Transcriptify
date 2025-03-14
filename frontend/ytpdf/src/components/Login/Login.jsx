import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Mode } from "../../config/ApplicationMode.js";
import { useDispatch } from "react-redux";
import { isAuthenticated } from "../../Redux/slices/authSlice.js";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  setTimeout(() => setError(""), 2000);

  // post data from frontend
  const handleLoginForm = (e) => {
    e.preventDefault();
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");

      return;
    }

    // Password validation

    if (password.length < 1) {
      setError("Password Cant be Empty!");
      return;
    }
    const envNode = Mode();
    let envURL;
    envURL = envNode.url;

    axios
      .post(
        `${envURL}/api/v1/users/login`,
        {
          email: email,
          password: password,
        },
        { withCredentials: true }
      )
      .then((res) => {
        //console.log(res.status)
        if (res.status === 200) {
          dispatch(isAuthenticated(true));

          navigate("/home");
        }
      })
      .catch((error) => {
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          //console.log("response", error.response.data.message);
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
  }, []);

  // cleaning the field
  const formReset = (e) => {
    e.preventDefault();
    setEmail("");
    setPassword("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-900 via-pink-600 to-blue-400 flex items-center justify-center">
      <div className=" flex flex-row  mx-auto md:h-screen lg:py-0 md:justify-center overflow-hidden">
        <div className="hidden lg:block ">
          <img src="banner.webp" alt="" className="h-[737px] w-[1000px]" />
        </div>
        <div className="w-[760px] bg-white flex items-center justify-center  ">
          <div className="p-6  flex flex-col items-center justify-center space-y-2 md:space-y-4 sm:p-8  w-[550px]">
            <div className="text-5xl font-bold  text-gray-900 ">Hey there!</div>
            <div className="text-[19px] text-gray-900 ">
              Welcome to{" "}
              <span className="font-semibold text-gray-700">
                Video Transcriptify
              </span>
              , so happy to see you!
            </div>

            <form className="space-y-4 md:space-y-6  w-[400px] p-2" action="#">
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-md font-medium text-gray-900 "
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg text-md focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                  placeholder="name@company.com"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-md font-medium text-gray-900 "
                >
                  Password
                </label>
                <div className=" flex flex-row">
                  <input
                    type={showPassword ? "password" : "text"}
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    id="password"
                    placeholder="••••••••"
                    className=" flex bg-gray-50 border border-gray-300 
                                text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 
                                focus:border-primary-600 w-full -mr-10 p-2.5"
                    required
                  />
                  <div
                    className=" mt-3 ml-2"
                    onClick={() => togglePasswordVisibility()}
                  >
                    {showPassword ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width={20}
                        height={20}
                        color={"#000000"}
                        fill={"none"}
                      >
                        <path
                          d="M19.439 15.439C20.3636 14.5212 21.0775 13.6091 21.544 12.955C21.848 12.5287 22 12.3155 22 12C22 11.6845 21.848 11.4713 21.544 11.045C20.1779 9.12944 16.6892 5 12 5C11.0922 5 10.2294 5.15476 9.41827 5.41827M6.74742 6.74742C4.73118 8.1072 3.24215 9.94266 2.45604 11.045C2.15201 11.4713 2 11.6845 2 12C2 12.3155 2.15201 12.5287 2.45604 12.955C3.8221 14.8706 7.31078 19 12 19C13.9908 19 15.7651 18.2557 17.2526 17.2526"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M9.85786 10C9.32783 10.53 9 11.2623 9 12.0711C9 13.6887 10.3113 15 11.9289 15C12.7377 15 13.47 14.6722 14 14.1421"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                        <path
                          d="M3 3L21 21"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width={20}
                        height={20}
                        color={"#000000"}
                        fill={"none"}
                      >
                        <path
                          d="M2 8C2 8 6.47715 3 12 3C17.5228 3 22 8 22 8"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                        <path
                          d="M21.544 13.045C21.848 13.4713 22 13.6845 22 14C22 14.3155 21.848 14.5287 21.544 14.955C20.1779 16.8706 16.6892 21 12 21C7.31078 21 3.8221 16.8706 2.45604 14.955C2.15201 14.5287 2 14.3155 2 14C2 13.6845 2.15201 13.4713 2.45604 13.045C3.8221 11.1294 7.31078 7 12 7C16.6892 7 20.1779 11.1294 21.544 13.045Z"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        />
                        <path
                          d="M15 14C15 12.3431 13.6569 11 12 11C10.3431 11 9 12.3431 9 14C9 15.6569 10.3431 17 12 17C13.6569 17 15 15.6569 15 14Z"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        />
                      </svg>
                    )}
                  </div>
                </div>
              </div>

              <button
                type="submit"
                onClick={(e) => {
                  handleLoginForm(e);
                  formReset(e);
                }}
                className="w-full dark:text-white text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-black bg-black dark:hover:bg-primary-700 hover:bg-primary-700 "
              >
                Sign in
              </button>
              {error && (
                <div className=" flex flex-row ">
                  <div class="h-[44px] mt-[4px] w-2 border  rounded-s-lg bg-red-700 mx-4 ml-[1px]  "></div>
                  <div className="text-white-600  p-2 border rounded-e-lg  bg-gray-200 text-black font-semibold -ml-4 mt-1">
                    {error}
                  </div>
                </div>
              )}
              <p className="text-sm font-light text-gray-900 ">
                Don’t have an account yet?
                <Link
                  to="/register"
                  className="font-medium ml-1 text-primary-600 hover:underline dark:text-black"
                >
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
