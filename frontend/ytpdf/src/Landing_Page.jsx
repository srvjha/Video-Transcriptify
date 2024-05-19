import React from 'react';
import { Link } from 'react-router-dom';
import Home from './components/Home/Home';

const Landing_Page = () => {
  return (
    <div>
      <div className='flex flex-row sm:flex-row bg-black justify-center text-white max-w-full sm:max-w-[500px] mx-auto min-w-[100px] h-[60px] sm:h-[60px] mt-6 rounded-full font-semibold p-5 text-[20px]'>
        <div className='flex flex-row sm:flex-row sm:mt-0 -mt-4 text-2xl'>
          <Link to="/" className='hover:text-gray-400 cursor-pointer p-1 m-1 sm:ml-[5px] sm:-m-3 sm:mr-4'>
            <div>Home</div>
          </Link>
          <Link to="/register" className='hover:text-gray-400 cursor-pointer p-1 m-1 sm:-m-3 sm:mr-4'>
            <div>Register</div>
          </Link>
          <Link to="/login" className='hover:text-gray-400 cursor-pointer p-1 m-1 sm:-m-3'>
            <div>Login</div>
          </Link>
        </div>
      </div>
      <Home />
    </div>
  );
}

export default Landing_Page;
