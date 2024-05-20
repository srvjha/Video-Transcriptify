import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import axios from 'axios';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [store, setStore] = useState("");
    const [error,setError] = useState("")
    const navigate = useNavigate();
    
    

    // post data from frontend
    const handleLoginForm = (e) => {
         // Validate email and password
        
       
        e.preventDefault();
        axios
            .post("api/v1/users/login", {
                email: email, password: password
            })
            .then((res) => {
                setStore(res.data.data.user.fullName)
                formReset(e)
                // console.log(res)
                // console.log("ACCESSTOKEN: ",res.data.data.accessToken)
                navigate("/home")
            })
            .catch((error) => {
                if (error.response && error.response.data && error.response.data.message) {
                  console.log("response", error.response.data.message);
                  setError(error.response.data.message);
                  setTimeout(() => setError(""), 2000);
                } else {
                  setError("An unexpected error occurred.");
                  setTimeout(() => setError(""), 2000);
                }
              });
    };

    // cleaning the field
    const formReset = (e) => {
        e.preventDefault();
        setEmail("")
        setPassword("")
    }

    
    

    return (
        <div>
            <section className="bg-gray-50 dark:bg-gray-900 sm:mt-0 sm:ml-0 sm:mr-0 mt-[133px] ml-2 mr-2">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">

                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Sign in to your account
                            </h1>
                            <form className="space-y-4 md:space-y-6" action="#">
                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                                    <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required />
                                </div>
                                <div>
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                    <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                                </div>


                                <button type="submit" onClick={(e) => { handleLoginForm(e); formReset(e); }} className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-300 dark:focus:ring-primary-800">Sign in</button>
                                {error && 
                                    <div className=' flex flex-row '>
                                    <div class="h-[44px] mt-[4px] w-2 border  rounded-s-lg bg-red-700 mx-4 ml-[1px]  "></div>
                                    <div className="text-white-600  p-2 border rounded-e-lg  bg-gray-200 text-black font-semibold -ml-4 mt-1">{error}</div>
                                    </div>
                                }
                                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                    Don’t have an account yet?
                                    <Link to="/register" className="font-medium text-primary-600 hover:underline dark:text-blue-500">Sign up</Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Login;
