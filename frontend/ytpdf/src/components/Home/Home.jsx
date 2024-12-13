import React from "react";
import { IoIosArrowRoundForward } from "react-icons/io";
import { motion } from "framer-motion";
import Balancer from 'react-wrap-balancer'

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
            <button className="flex items-center bg-black text-white px-4 py-4 w-[160px] justify-center rounded-lg hover:bg-gray-100 hover:text-black">
              <span className="mr-2 text-xl font-semibold">Try now</span>
              <IoIosArrowRoundForward size={28} className="mt-2 -ml-2" />
            </button>
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

      {/* Features Section */}
      <div className="w-full max-w-6xl p-4 mt-14">
        {/* <h3 className="text-3xl font-bold text-white mb-6">Features</h3> */}
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: "Download YouTube Videos",
              description:
                "Easily download your favorite YouTube videos in various formats. Save videos directly to your device.",
            },
            {
              title: "Convert to PDF Notes",
              description:
                "Turn YouTube videos into concise, organized PDF notes, perfect for study sessions or reference.",
            },
            {
              title: "Transcript Generation",
              description:
                "Automatically generate accurate transcripts for quick and efficient review of content.",
            },
            {
              title: "User-Friendly Interface",
              description:
                "Enjoy an intuitive and seamless experience, suitable for all users.",
            },
            {
              title: "Secure and Reliable",
              description:
                "Your data's security and privacy are our top priorities with robust measures.",
            },
          ].map((feature, index) => (
            <motion.li
              key={index}
              className="relative p-4 bg-gradient-to-r from-purple-600 via-pink-700 to-blue-600 rounded-lg shadow-lg text-white"
              whileHover={{
                scale: 1.05,
                rotateX: 10,
                rotateY: -5,
              }}
              transition={{
                type: "spring",
                stiffness: 150,
              }}
            >
              <h4 className="text-xl font-semibold">{feature.title}</h4>
              <p className="mt-2">{feature.description}</p>
            </motion.li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
