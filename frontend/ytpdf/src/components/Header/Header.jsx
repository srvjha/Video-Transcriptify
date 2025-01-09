import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import videoIcon from '../../assets/vidicon.png'
import user from '../../assets/user.png'
import { Menu, X } from 'lucide-react';


const Header = () => {
  const[isScrolled,setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const handleScroll = ()=>{
    if(window.scrollY > 0 ){
     // console.log("Scroll Started: ",window.scrollY);
      setIsScrolled(true);
    }
    else{
     // console.log("Scroll Stopped: ",window.scrollY);
      setIsScrolled(false)
    }
  }

  useEffect(()=>{
    window.addEventListener('scroll',handleScroll);
    return ()=>{
      window.removeEventListener('scroll',handleScroll);
      }
  },[])
  
  const handleHome = (e)=>{
    e.preventDefault();
    let getFeatureSectionById = document.getElementById("home");
    console.log({getFeatureSectionById})
    getFeatureSectionById.scrollIntoView({behavior: "smooth"})

  }

  const handleFeatures = (e)=>{
    e.preventDefault();
    let getFeatureSectionById = document.getElementById("features");
    console.log({getFeatureSectionById})
    getFeatureSectionById.scrollIntoView({behavior: "smooth"})

  }

  const handleFaqs = (e)=>{
    e.preventDefault();
    let getFeatureSectionById = document.getElementById("faqs");
    console.log({getFeatureSectionById})
    getFeatureSectionById.scrollIntoView({behavior: "smooth"})

  }
  return (
    <div className='mb-32 '>
       
      {/* Banner Section */}
      <div className="bg-black text-white text-center p-1 text-sm font-medium">
        <p className="">
          Introducing <span className=' font-bold'>AI Video Transcriptify Pro</span> - Unlock the Premium Pack to effortlessly create and download personalized PDF notes from your youtube videos.
        </p>
       
      </div>
      
    
    <nav className={`fixed w-full z-[1000] ${isScrolled ? "backdrop-blur-md" : ""}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[110px]">
          {/* Logo */}
          <div className="flex-shrink-0">
            <img 
              src="webIcon.png" 
              alt="videoIcon" 
              className="w-12 h-12 object-cover"
            />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="flex items-center bg-black rounded-full px-8 py-4">
              <div className="flex space-x-6 text-2xl text-white">
                <button 
                  onClick={handleHome}
                  className="hover:text-gray-400 transition-all duration-200 hover:scale-110"
                >
                  Home
                </button>
                <button 
                  onClick={handleFeatures}
                  className="hover:text-gray-400 transition-all duration-200 hover:scale-110"
                >
                  Features
                </button>
                <button 
                  onClick={handleFaqs}
                  className="hover:text-gray-400 transition-all duration-200 hover:scale-110"
                >
                  FAQs
                </button>
                <button 
                  onClick={() => alert("Coming Soon....")}
                  className="hover:text-gray-400 transition-all duration-200 hover:scale-110"
                >
                  Pricing
                </button>
              </div>
            </div>
          </div>

          {/* Login Button */}
          <div className="hidden md:block">
            <Link 
              to="/login" 
              className="bg-black text-white rounded-full px-6 py-4 flex items-center space-x-2 hover:bg-gray-800 transition-all duration-200"
            >
              <img src={user} alt="User" className="w-6 h-6" />
              <span className="font-semibold">SignUp/Login</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-white bg-black hover:bg-gray-800"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-black bg-opacity-95 backdrop-blur-md">
          <div className="px-4 pt-2 pb-4 space-y-2">
            <button
              onClick={(e) => {
                handleHome(e);
                setIsMenuOpen(false);
              }}
              className="block w-full text-left px-4 py-2 text-white hover:bg-gray-800 rounded-lg"
            >
              Home
            </button>
            <button
              onClick={(e) => {
                handleFeatures(e);
                setIsMenuOpen(false);
              }}
              className="block w-full text-left px-4 py-2 text-white hover:bg-gray-800 rounded-lg"
            >
              Features
            </button>
            <button
              onClick={(e) => {
                handleFaqs(e);
                setIsMenuOpen(false);
              }}
              className="block w-full text-left px-4 py-2 text-white hover:bg-gray-800 rounded-lg"
            >
              FAQs
            </button>
            <button
              onClick={() => {
                alert("Coming Soon....");
                setIsMenuOpen(false);
              }}
              className="block w-full text-left px-4 py-2 text-white hover:bg-gray-800 rounded-lg"
            >
              Pricing
            </button>
            <Link 
              to="/login"
              className="block w-full px-4 py-2 text-white hover:bg-gray-800 rounded-lg"
              onClick={() => setIsMenuOpen(false)}
            >
              <div className="flex items-center space-x-2">
                <img src={user} alt="User" className="w-6 h-6" />
                <span>SignUp/Login</span>
              </div>
            </Link>
          </div>
        </div>
      )}
    </nav>

      {/* Navigation Bar */}
     

      

    </div>
  );
};

export default Header;
