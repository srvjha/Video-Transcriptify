import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import home from './assets/homeImg.png'
import pdf from './assets/pdf.png'
import logout from './assets/logout.png'


const LoginHeader = ({ name }) => {
    const fullName = name;  
    const navigate = useNavigate();
    const [active,setActive] = useState('btn1')
    
    

    const handleLogoutForm = (e) => {
        e.preventDefault();
        axios.post("/api/v1/users/logout")
        .then((res) => {
           
            navigate("/");
            localStorage.removeItem('accessToken');
        })
        .catch((error) => {
            console.error("Logout failed:", error);
        });
       
    }

    

    return (
        <div className='bg-black text-white sm:w-full sm:h h-20 sm:max-w-[710px] mx-auto mt-6 rounded-full font-semibold p-5 text-[15px]'>
            <div className='flex flex-row -mt-4 space-x-4 sm:ml-10 ml-4 sm:mt-0 sm:flex-row md:flex-row sm:space-x-6 space-y-4 sm:space-y-0 items-center'>
                <Link to="/home">
                    {/* Show text "Home" on larger screens */}
                    <div className={`${active === 'btn1' ? 'bg-blue-700' : 'bg-none'} rounded-xl p-2 cursor-pointer text-center hidden sm:block`} onClick={() => setActive('btn1')}>Home</div>
                    {/* Show icon on smaller screens */}
                    <div className={`${active === 'btn1' ? 'bg-blue-700' : 'bg-none'} rounded-xl p-2 mt-3 cursor-pointer text-center block sm:hidden`} onClick={() => setActive('btn1')}>
                        <img src={home} className="h-8 w-8"/>
                    </div>
                </Link>
                <Link to="/generate-notes">
                    {/* Show text "Home" on larger screens */}
                    <div className={`${active === 'btn2' ? 'bg-blue-700' : 'bg-none'} rounded-xl p-2 cursor-pointer text-center hidden sm:block`} onClick={() => setActive('btn2')}>Generate-Notes</div>
                    {/* Show icon on smaller screens */}
                    <div className={`${active === 'btn2' ? 'bg-blue-700' : 'bg-none'} rounded-xl p-2 cursor-pointer text-center block sm:hidden`} onClick={() => setActive('btn2')}>
                        <img src={pdf} className="h-8 w-8"/>
                    </div>
                </Link>
                <Link to="/download-video">
                    {/* Show text "Home" on larger screens */}
                    <div className={`${active === 'btn3' ? 'bg-blue-700' : 'bg-none'} rounded-xl p-2 cursor-pointer text-center hidden sm:block`} onClick={() => setActive('btn3')}>Download Video</div>
                    {/* Show icon on smaller screens */}
                    <div className={`${active === 'btn3' ? 'bg-blue-700' : 'bg-none'} rounded-xl p-2 cursor-pointer text-center block sm:hidden`} onClick={() => setActive('btn3')}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-89 text-white" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M3 4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4zM5 6v8h10V6H5zm10 2H5v1h10V8zm-5 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" clipRule="evenodd" />
                    </svg>
                    </div>
                </Link>
                <div className="bg-yellow-300 text-black rounded-lg p-2 sm:text-[15px] text-[10px] text-center">{fullName}</div>
                <div className='cursor-pointer hover:bg-blue-800 rounded-md p-2 text-center' onClick={handleLogoutForm}>
                    {/* Show text "Logout" on larger screens */}
                    <div className="hidden sm:block">Logout</div>
                    {/* Show white color logout icon on smaller screens */}
                    <div className="block sm:hidden">
                        <img src={logout} className="h-8 w-8 text-white" />
                            
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginHeader;
