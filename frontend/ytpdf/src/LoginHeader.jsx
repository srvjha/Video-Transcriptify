import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginHeader = ({ name, token }) => {
    const fullName = name;
    const accessToken = token;
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
        <div className='bg-black text-white w-full max-w-[710px] mx-auto mt-6 rounded-full font-semibold p-5 text-[15px]'>
            <div className='flex flex-col md:flex-row md:space-x-6 space-y-4 md:space-y-0 items-center'>
                <Link to="/home">
                    <div className='hover:bg-blue-800 rounded-xl p-2 cursor-pointer text-center'>Home</div>
                </Link>
                <Link to="/generate-notes">
                    <div className='hover:bg-blue-800 rounded-xl p-2 cursor-pointer text-center'>GENERATE NOTES-PDF</div>
                </Link>
                <Link to="/download-video">
                    <div className='hover:bg-blue-800 rounded-xl p-2 cursor-pointer text-center'>DOWNLOAD VIDEO</div>
                </Link>
                <div className="bg-yellow-300 text-black rounded-lg p-2 text-center">{fullName}</div>
                <div className='cursor-pointer hover:bg-blue-800 rounded-md p-2 text-center' onClick={handleLogoutForm}>LOGOUT</div>
            </div>
        </div>
    );
}

export default LoginHeader;
