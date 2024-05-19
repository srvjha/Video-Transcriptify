import React from 'react'
import { Link, useLocation,useNavigate } from 'react-router-dom';
import Home from './components/Home/Home';

const Landing_Page = () => {
  return (
    <div>
       <div className='flex flex-row bg-black justify-center  text-white w-[500px] h-[60px] ml-[510px] mt-6 rounded-full font-semibold p-5  text-[20px]'>
                        <div className=' flex flex-row text-2xl   '>
                            <div className='hover:text-gray-400 cursor-pointer p-1 ml-[5px] -m-3 mr-4 '>Home</div>
                            <Link to="/register">
                                <div className="hover:text-gray-400 cursor-pointer p-1 -m-3 mr-4 ">Register</div>
                            </Link>
                            <Link to="/login">
                                <div className=' cursor-pointer hover:text-gray-400  rounded-lg p-1 -m-3'>Login</div>
                            </Link>
                        </div>
                    </div>
        <Home/>
    </div>
  )
}

export default Landing_Page
