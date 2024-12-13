import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import home from './assets/homeImg.png';
import pdf from './assets/pdf.png';
import logout from './assets/logout.png';
import { Mode } from './config/ApplicationMode';

const LoginHeader = ({ name }) => {
    const fullName = name;
    const navigate = useNavigate();
    const location = useLocation();
    const getLocation = location.pathname;

    const envNode = Mode();
    const envURL = envNode.url;

    const handleLogoutForm = (e) => {
        e.preventDefault();
        axios
            .post(`${envURL}/api/v1/users/logout`, {}, { withCredentials: true })
            .then(() => {
                localStorage.removeItem('accessToken');
                navigate("/");
            })
            .catch((error) => {
                console.error("Logout failed:", error);
            });
    };

    return (
        <div className='bg-black text-white sm:w-full sm:h h-20 sm:max-w-[710px] mx-auto mt-6 rounded-full font-semibold p-5 text-[15px]'>
            <div className='flex flex-row -mt-4 space-x-4 sm:ml-10 ml-4 sm:mt-0 sm:flex-row md:flex-row sm:space-x-6 space-y-4 sm:space-y-0 items-center'>
                <Link to="/home">
                    <div
                        className={`${
                            getLocation === "/home" ? "bg-blue-700" : "bg-none"
                        } rounded-xl p-2 cursor-pointer text-center hidden sm:block`}
                    >
                        Home
                    </div>
                    <div
                        className={`${
                            getLocation === "/home" ? "bg-blue-700" : "bg-none"
                        } rounded-xl p-2 mt-3 cursor-pointer text-center block sm:hidden`}
                    >
                        <img src={home} className="h-8 w-8" alt="Home" />
                    </div>
                </Link>
                <Link to="/generate-notes">
                    <div
                        className={`${
                            getLocation === "/generate-notes" ? "bg-blue-700" : "bg-none"
                        } rounded-xl p-2 cursor-pointer text-center hidden sm:block`}
                    >
                        Generate-Notes
                    </div>
                    <div
                        className={`${
                            getLocation === "/generate-notes" ? "bg-blue-700" : "bg-none"
                        } rounded-xl p-2 cursor-pointer text-center block sm:hidden`}
                    >
                        <img src={pdf} className="h-8 w-8" alt="Generate Notes" />
                    </div>
                </Link>
                <Link to="/download-video">
                    <div
                        className={`${
                            getLocation === "/download-video" ? "bg-blue-700" : "bg-none"
                        } rounded-xl p-2 cursor-pointer text-center hidden sm:block`}
                    >
                        Download Video
                    </div>
                    <div
                        className={`${
                            getLocation === "/download-video" ? "bg-blue-700" : "bg-none"
                        } rounded-xl p-2 cursor-pointer text-center block sm:hidden`}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-8 w-8 text-white"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M3 4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4zM5 6v8h10V6H5zm10 2H5v1h10V8zm-5 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </div>
                </Link>
                <div className="bg-yellow-300 text-black rounded-lg p-2 sm:text-[15px] text-[10px] text-center">
                    {fullName}
                </div>
                <div
                    className='cursor-pointer hover:bg-blue-800 rounded-md p-2 text-center'
                    onClick={handleLogoutForm}
                >
                    <div className="hidden sm:block">Logout</div>
                    <div className="block sm:hidden">
                        <img src={logout} className="h-8 w-8 text-white" alt="Logout" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginHeader;
