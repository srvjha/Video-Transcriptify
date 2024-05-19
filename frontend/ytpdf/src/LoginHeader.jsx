import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';



const LoginHeader = ({name,token}) => {

    const fullName = name
    const accessToken = token
    const navigate = useNavigate();

    const handleLogoutForm = (e) => {
        e.preventDefault();
        axios.post("/api/v1/users/logout", null, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        .then((res) => {
            console.log(res);
            navigate("/");
           
        })
        .catch((error) => {
            console.error("Logout failed:", error);
        });
    }

    


  return (
    <div>
      <div className=' bg-black  text-white w-[710px] ml-[450px] mt-6  rounded-full font-semibold p-5 text-[15px]'>
             <div className=' flex flex-row space-x-6'>
                <Link to={{ pathname: '/home'}}>
                <div className='hover:bg-blue-800 rounded-xl p-2 cursor-pointer' >Home</div>
                </Link>
                
                  <Link to={{ pathname: '/generate-notes'}}>
                    <div className='hover:bg-blue-800 rounded-xl p-2 cursor-pointer'>GENERATE NOTES-PDF</div>
                    </Link>
                    <Link to={{ pathname: '/download-video'}}>
                  <div className='hover:bg-blue-800 rounded-xl p-2 cursor-pointer' >DOWNLOAD VIDEO</div>
                  </Link>
                  <div className=" bg-yellow-300 text-black rounded-lg p-2">{fullName}</div>
                  <div className=' cursor-pointer hover:bg-blue-800 rounded-md p-2' onClick={(e) => handleLogoutForm(e)}>LOGOUT</div>
             </div>
     </div>
    </div>
  )
}

export default LoginHeader
