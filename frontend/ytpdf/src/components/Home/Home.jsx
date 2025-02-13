import React from "react";
import { IoIosArrowRoundForward } from "react-icons/io";
import { motion } from "framer-motion";
import Balancer from 'react-wrap-balancer'
import { Link } from "react-router-dom";
import Explain from "../HomeContent/Explain";

const App = () => {
  return (
    <>
    <div id="home"></div>
    <div className="min-h-screen flex flex-col justify-center items-center -mt-36 pt-16 sm:pt-24 px-4 ">     

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row items-center justify-between max-w-6xl w-full lg:h-[600px] p-4 space-y-8 lg:space-y-0 lg:space-x-8">
      {/* Left Section */}
        <div className="flex-1 text-center lg:text-left">
        <h2 className="text-3xl sm:text-4xl lg:text-6xl p-[10px] text-shadow font-bold bg-gradient-to-r from-white via-yellow-100 to-blue-200 text-transparent bg-clip-text leading-snug">
               Transform YouTube videos into personalized AI-generated notes
      </h2>

      <p className="mt-4 text-base sm:text-lg text-gray-300 p-1 rounded-md">
          <Balancer>– Simply paste the URL and download your notes!</Balancer>
      </p>

          <div className="mt-6 flex justify-center lg:justify-start">
               <Link to='/generate-notes'>
               <button className="flex items-center bg-black text-white px-4 py-3 sm:py-4 w-[160px] justify-center rounded-lg hover:bg-gray-100 hover:text-black transition-colors">
                  <span className="mr-2 text-lg sm:text-xl font-semibold">Try now</span>
                  <IoIosArrowRoundForward size={28} className="mt-1 -ml-2" />
                </button>
            </Link>
          </div>
        </div>
        
        
        {/* Right Section */}
        <div class="w-full p-1  max-w-[522px] [background:linear-gradient(45deg,#172033,theme(colors.yellow.600)_50%,#172033)_padding-box,conic-gradient(from_var(--border-angle),theme(colors.yellow.600)_80%,_theme(colors.pink.500)_86%,_theme(colors.pink.300)_90%,_theme(colors.pink.500)_94%,_theme(colors.yellow.600/.48))_border-box] rounded-2xl border-2 border-transparent animate-border">
        <div
            className="flex-1 max-w-full lg:max-w-lg px-4 sm:px-8 lg:px-0"
            // initial={{ x: 100, opacity: 0 }}
            // animate={{ x: 0, opacity: 1 }}
            // transition={{ duration: 1 }}
          >
            <img
              src="ai-notes.png"
              alt="AI Notes"
              className="rounded-lg shadow-lg w-full"
            />
        </div>
      </div>
      </div>

      <Explain/>

      
    </div>
    </>
  );
};

export default App;
