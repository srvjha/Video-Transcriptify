import React from 'react';
import { Link } from 'react-router-dom';


const Header = () => {
  return (
    <div>
       
      {/* Banner Section */}
      <div className="bg-black text-white text-center p-1 text-sm font-medium">
        <p className="">
          Introducing <span className=' font-bold'>AI Video Transcriptify Pro</span> - Unlock the Premium Pack to effortlessly create and download personalized PDF notes from your youtube videos.
        </p>
       
      </div>

      {/* Navigation Bar */}
      <div className="flex flex-row sm:flex-row sticky top-2 z-50 bg-black justify-center text-white max-w-full sm:max-w-[500px] mx-auto min-w-[100px] h-[60px] sm:h-[60px] mt-6 rounded-full font-semibold p-5">
        <div className="flex flex-row sm:flex-row sm:mt-0 -mt-4 text-2xl">
          <Link to="/" className="hover:text-gray-400 cursor-pointer p-1 m-1 sm:ml-[5px] sm:-m-3 sm:mr-4 transition-all duration-200 hover:scale-110">
            <div className=" ">Home</div>
          </Link>
          <Link to="/register" className="hover:text-gray-400 cursor-pointer p-1 m-1 sm:-m-3 sm:mr-4 transition-all duration-200 hover:scale-110">
            <div className=''>Register</div>
          </Link>
          <Link to="/login" className="hover:text-gray-400 cursor-pointer p-1 m-1 sm:-m-3 transition-all duration-200 hover:scale-110">
            <div className=''>Login</div>
          </Link>
        </div>
      </div>

      

    </div>
  );
};

export default Header;
