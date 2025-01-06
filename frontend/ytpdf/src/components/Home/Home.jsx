import React from "react";
import { IoIosArrowRoundForward } from "react-icons/io";
import { motion } from "framer-motion";
import Balancer from 'react-wrap-balancer'
import { Link } from "react-router-dom";
import Explain from "../HomeContent/Explain";

const App = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center ">
     

      {/* Main Content */}
      <div className="flex flex-col md:flex-row items-center justify-between max-w-6xl w-full h-[600px]   p-4 space-y-8 md:space-y-0 md:space-x-8">
        {/* Left Section */}
        <div className="flex-1">
        <h2 className="text-4xl md:text-6xl  p-[10px] text-shadow font-bold bg-gradient-to-r from-white via-yellow-100 to-blue-200 text-transparent bg-clip-text leading-snug">
        Transform YouTube videos into personalized AI-generated notes
      </h2>

          <p className="mt-4 text-lg text-gray-300   p-1 rounded-md">
            <Balancer>– Simply paste the URL and download your notes!</Balancer>
          </p>
          <div className="mt-6">
            <Link to='/generate-notes'>
            <button className="flex items-center bg-black text-white px-4 py-4 w-[160px] justify-center rounded-lg hover:bg-gray-100 hover:text-black">
              <span className="mr-2 text-xl font-semibold">Try now</span>
              <IoIosArrowRoundForward size={28} className="mt-2 -ml-2" />
            </button>
            </Link>
          </div>
        </div>
        
        
        {/* Right Section */}
        <motion.div
          className="flex-1 max-w-lg"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <img
            src="ai-notes.png"
            alt="AI Notes"
            className="rounded-lg shadow-lg w-full"
          />
        </motion.div>
      </div>

      <Explain/>

      
    </div>
  );
};

export default App;
