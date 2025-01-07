import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import videoIcon from '../../assets/vidicon.png'
import user from '../../assets/user.png'


const Header = () => {
  const[isScrolled,setIsScrolled] = useState(false);
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
    <div>
       
      {/* Banner Section */}
      <div className="bg-black text-white text-center p-1 text-sm font-medium">
        <p className="">
          Introducing <span className=' font-bold'>AI Video Transcriptify Pro</span> - Unlock the Premium Pack to effortlessly create and download personalized PDF notes from your youtube videos.
        </p>
       
      </div>
      
      <div className={`fixed space-x-[220px] z-[1000] flex flex-row sm:flex-row w-full  h-[110px] ${isScrolled ? "-mt-7 backdrop-blur-md":""} `}>
        <div className='mt-8  ml-52  w-10 h-12 object-cover'>
          <img src="webIcon.png" alt="videoIcon"   className='w-12 h-12'/>
        </div>
        <div className=" flex flex-row sm:flex-row  z-50 bg-black  justify-center text-white max-w-full sm:max-w-[500px] mx-auto min-w-[100px] h-[60px] sm:h-[60px] mt-6 rounded-full font-semibold p-8">
        <div className="flex flex-row sm:flex-row sm:-mt-2 -mt-8 text-2xl space-x-6 ">
          <div className="hover:text-gray-400 cursor-pointer p-1 m-1 sm:ml-[5px] sm:-m-3 sm:mr-4 transition-all duration-200 hover:scale-110">
            <div onClick={(e)=>handleHome(e)}>Home</div>
          </div>
          <div  className="hover:text-gray-400 cursor-pointer p-1 m-1 sm:-m-3 sm:mr-4 transition-all duration-200 hover:scale-110">
            <div onClick={(e)=>handleFeatures(e)}>Features</div>
          </div>
          <div  className="hover:text-gray-400 cursor-pointer p-1 m-1 sm:-m-3 sm:mr-4 transition-all duration-200 hover:scale-110">
            <div  onClick={(e)=>handleFaqs(e)}>FAQs</div>
          </div>
          <div  className="hover:text-gray-400 cursor-pointer p-1 m-1 sm:-m-3 sm:mr-4 transition-all duration-200 hover:scale-110">
            <div onClick={()=>alert("Coming Soon....")}>Pricing</div>
          </div>
         
          
        </div>
      </div>
      <div className='mt-1 mr-7 '>
      {/* <Link to="/register" className="hover:text-gray-400 cursor-pointer p-1 m-1 sm:-m-3 sm:mr-4 transition-all duration-200 hover:scale-110">
            <div className=''>Register</div>
          </Link> */}
          <Link to="/login" className="hover:text-gray-400 cursor-pointer p-1 m-1 sm:-m-3 transition-all duration-200 hover:scale-110">
            <div className='bg-black text-white rounded-full p-4 flex flex-row items-center font-semibold '>
              <img src={user} alt="User"  className='w-6 h-6'/>
              SignUp/Login
              </div>
          </Link>
     </div>
      </div>
      {/* Navigation Bar */}
     

      

    </div>
  );
};

export default Header;
