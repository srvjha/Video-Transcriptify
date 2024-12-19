import React from 'react';
import { FaWhatsapp } from "react-icons/fa";
import { RiTwitterXLine } from "react-icons/ri";
import { FaLinkedinIn } from "react-icons/fa";
import { IoLogoInstagram } from "react-icons/io5";

const Footer = () => {
  return (
    <div className="p-5 text-center shadow-2xl mx-4 sm:mx-16 flex flex-col rounded-xl mb-4 bg-transparent/10 ">
      <div className=' mt-5'>
        <div className="text-black text-xl font-bold font-sans">
          Made with 💖 by Saurav Jha
        </div>
        <div className="text-sm text-gray-200 mt-1">
          &copy; <span>2024 Copyright</span>
          <a
            href="https://personal-portfolio-srvjha.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-black cursor-pointer hover:underline hover:text-gray-700 transition duration-300 ease-in-out ml-1 font-medium"
          >
            Visit My Website
          </a>
        </div>
      </div>

      {/* Social Icons */}
      <div className="flex justify-center space-x-4 mt-3 p-2">
        <div className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-transform duration-300 hover:scale-125">
          <FaWhatsapp size={23} className="text-gray-200 cursor-pointer hover:text-green-500 transition duration-300" />
        </div>
        <div className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-transform duration-300 hover:scale-125">
          <RiTwitterXLine size={23} className="text-gray-200 cursor-pointer hover:text-black transition duration-300" />
        </div>
        <div className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-transform duration-300 hover:scale-125">
          <FaLinkedinIn size={23} className="text-gray-200 cursor-pointer hover:text-blue-500 transition duration-300" />
        </div>
        <div className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-transform duration-300 hover:scale-125">
          <IoLogoInstagram size={23} className="text-gray-200 cursor-pointer hover:text-pink-500 transition duration-300" />
        </div>
      </div>
    </div>
  );
};

export default Footer;
