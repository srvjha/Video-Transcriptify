import React, { useState,useEffect } from "react";
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function Register() {
  const [username, setUsername] = useState('');
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword,setShowPassword] = useState(false)
  const [error, setError] = useState("");
  const [box,setBox] = useState(false)
  const [passwordError,setPasswordError] = useState(false)
  const navigate = useNavigate();
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  setTimeout(() => setError(""), 3000);

  // post data from frontend
  const handleRegisterForm = (e) => {
    e.preventDefault();
    setError("");
     // Username validation
     const userNameRegex = /^[a-zA-Z_]+$/
     if(!userNameRegex.test(username))
      {
        setError("Username must contain only alphabets.")
        setPasswordError(false)
        
        return
      }
      // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      setPasswordError(false)
      return;
    }

    // Password validation
    const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8}$/;
    if (!passwordRegex.test(password)) {
      setPasswordError(true)
      setError("Password must be only 8 characters long, contain at least one uppercase letter, one number, and one special character (!@#$%^&*)");
      return;
    }

    if(!box)
      {
        setError("Accept the terms and conditons to proceed..")
        setPasswordError(false)
        return
      }


    axios
      .post("/api/v1/users/register", {
        fullName: fullname, username: username, email: email, password: password
      })
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
    <>
      <div className="bg-gray-200 dark:bg-gray-900 sm:mt-0 sm:ml-0 sm:mr-0 mt-5 ml-2 mr-2">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white  border-[2px] border-blue-800  rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Create an account
              </h1>
              <form className="space-y-4 md:space-y-6" action="#">
                <div>
                  <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                  <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} name="username" id="username" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="username" required />
                </div>
                <div>
                  <label htmlFor="fullname" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">FullName</label>
                  <input type="text" value={fullname} onChange={(e) => setFullname(e.target.value)} name="fullname" id="fullname" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="fullname" required />
                </div>
                <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                  <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@gmail.com" required />
                </div>
                <div>
                  <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                  <div className=" flex flex-row">                 
                  <input
                   type={showPassword?"password":"text"} 
                   name="password" 
                   value={password} 
                   onChange={(e) => setPassword(e.target.value)} 
                   id="password"
                   placeholder="••••••••" 
                   className=" flex bg-gray-50 border border-gray-300 
                   text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 
                   focus:border-primary-600 w-full -mr-10 p-2.5 dark:bg-gray-700 dark:border-gray-600
                    dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 autofill:bg-lime-700
                     dark:focus:border-blue-500" required />
                  <div className=" mt-3 ml-2" onClick={()=>togglePasswordVisibility()}>
                    {showPassword?
                     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={20} height={20} color={"#000000"} fill={"none"}>
                     <path d="M19.439 15.439C20.3636 14.5212 21.0775 13.6091 21.544 12.955C21.848 12.5287 22 12.3155 22 12C22 11.6845 21.848 11.4713 21.544 11.045C20.1779 9.12944 16.6892 5 12 5C11.0922 5 10.2294 5.15476 9.41827 5.41827M6.74742 6.74742C4.73118 8.1072 3.24215 9.94266 2.45604 11.045C2.15201 11.4713 2 11.6845 2 12C2 12.3155 2.15201 12.5287 2.45604 12.955C3.8221 14.8706 7.31078 19 12 19C13.9908 19 15.7651 18.2557 17.2526 17.2526" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                     <path d="M9.85786 10C9.32783 10.53 9 11.2623 9 12.0711C9 13.6887 10.3113 15 11.9289 15C12.7377 15 13.47 14.6722 14 14.1421" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                     <path d="M3 3L21 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                 </svg>
                    :
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={20} height={20} color={"#000000"} fill={"none"}>
                        <path d="M2 8C2 8 6.47715 3 12 3C17.5228 3 22 8 22 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                        <path d="M21.544 13.045C21.848 13.4713 22 13.6845 22 14C22 14.3155 21.848 14.5287 21.544 14.955C20.1779 16.8706 16.6892 21 12 21C7.31078 21 3.8221 16.8706 2.45604 14.955C2.15201 14.5287 2 14.3155 2 14C2 13.6845 2.15201 13.4713 2.45604 13.045C3.8221 11.1294 7.31078 7 12 7C16.6892 7 20.1779 11.1294 21.544 13.045Z" stroke="currentColor" strokeWidth="1.5" />
                        <path d="M15 14C15 12.3431 13.6569 11 12 11C10.3431 11 9 12.3431 9 14C9 15.6569 10.3431 17 12 17C13.6569 17 15 15.6569 15 14Z" stroke="currentColor" strokeWidth="1.5" />
                    </svg>}
                 
                  </div>
                  </div>
                 
                 
                </div>
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input id="terms" aria-describedby="terms" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="terms" className="font-light text-gray-500 dark:text-gray-300" onClick={()=>setBox(true)} required>I accept the <a className="font-medium text-primary-600 hover:underline dark:text-primary-500" href="https://www.termsandconditionsgenerator.com/live.php?token=PKXA1MVVzVzdAVqgUKdpwMsYiJ0lbkf2">Terms and Conditions</a></label>
                  </div>
                </div>
                <button onClick={(e) => handleRegisterForm(e)} className="w-full dark:text-white text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 bg-blue-600 dark:hover:bg-primary-700 hover:bg-primary-700 ">
                  Create an account
                </button>
                {error &&
                  <div className='flex flex-row'>
                   
                    {passwordError? 
                     <div className=" flex flex-row">
                     <div className="h-[83px] mt-[4px] w-2 border rounded-s-lg bg-red-700 mx-4 ml-[1px]"></div>
                    <div className="text-white-600 p-2 text-[13px] border rounded-e-lg bg-gray-200 text-black font-semibold -ml-4 mt-1">{error}</div>
                    </div>
                    :
                    <div  className=" flex flex-row">
                       <div className="h-[44px] mt-[4px] w-2 border rounded-s-lg bg-red-700 mx-4 ml-[1px]"></div>
                    <div className="text-white-600 p-2 border rounded-e-lg bg-gray-200 text-black font-semibold -ml-4 mt-1">{error}</div>
                    </div>}
                  </div>
                }
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Already have an account? 
                  <Link to="/login" className="font-medium text-primary-600 hover:underline dark:text-blue-500"> Login here</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Register;
