import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

import GeneratePDF from '../GeneratePDF/GeneratePDF.jsx';

const Home = () => {
    const location = useLocation();
    const fullName = location.state && location.state.fullName;
    const accessToken = location.state && location.state.accessToken;
    const [active, setActive] = useState(true);
    const [activePDF, setActivePDF] = useState(false);
   
    // const name = "Saurav Jha"
    
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
            setActive(false);
        })
        .catch((error) => {
            console.error("Logout failed:", error);
        });
    }

    const generatePDF = () => {
        setActivePDF(true);
    }

   

    return (
        <>
            {active && fullName ? (
                <>
                    <div className='flex flex-row bg-black  text-white w-[610px] ml-[500px] mt-6  rounded-full font-semibold p-5 justify-end text-[15px]'>
                        <div className=' flex flex-row '>
                            <div className=' flex flex-row mr-10  '>
                                <div className=' hover:bg-blue-800 rounded-xl p-2 cursor-pointer' onClick={generatePDF}>GENERATE NOTES-PDF</div>
                                <Link to = {`/downloadPDF?name=${fullName}`}>
                                <div className='hover:bg-blue-800 rounded-xl p-2 cursor-pointer' >DOWNLOAD VIDEO</div>
                                </Link>
                               
                            </div>
                            <div className=' flex flex-row space-x-3'>
                                <div className=" bg-yellow-300 text-black rounded-lg p-2">{fullName}</div>
                                <div className=' cursor-pointer hover:bg-blue-800 rounded-md p-2' onClick={(e) => handleLogoutForm(e)}>LOGOUT</div>
                            </div>
                        </div>
                    </div>
                    {activePDF ? <GeneratePDF /> : (
                        <div className=' text-center text-[40px] text-black'>
                            <div className=" py-10">
                                <div className="max-w-6xl mx-auto px-4">
                                    <h1 className="text-4xl font-bold text-center mb-8">Welcome to Youtube Explo</h1>
                                    <p className="text-lg text-center mb-8">At Youtube Explo, we provide you with a seamless solution to download <span className='font-bold'>Free</span> YouTube videos and convert them into PDF notes effortlessly. Whether you're a student preparing for exams, a professional gathering research material, or simply someone who enjoys learning from online videos, we've got you covered.</p>
                                    <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
                                        <h2 className="text-2xl font-bold mb-4">Features:</h2>
                                        <ul className="list-disc pl-5 text-xl text-left">
                                            <li className="mb-2"><span className='font-bold'>Download YouTube Videos</span> : Easily download your favorite YouTube videos in various formats. With just a few clicks, you can save videos directly to your device for offline viewing.</li>
                                            <li className="mb-2"><span className='font-bold'>Convert to PDF Notes</span>: Turn YouTube videos into concise, organized PDF notes. Our intuitive tool extracts key information from the video and formats it into easily digestible notes, perfect for study sessions or reference.</li>
                                            <li className="mb-2"><span className='font-bold'>Transcript Generation</span> : Gain access to the transcript of the downloaded video. Our platform automatically generates accurate transcripts, allowing you to review content quickly and efficiently.</li>
                                            <li className="mb-2"><span className='font-bold'>User-Friendly Interface</span> : Our website offers a user-friendly interface designed for seamless navigation. Whether you're a tech-savvy individual or new to online tools, you'll find our platform intuitive and easy to use.</li>
                                            <li className="mb-2"> <span className='font-bold'>Secure and Reliable</span> : Rest assured, your data's security and privacy are our top priorities. We employ robust security measures to safeguard your information throughout the download and conversion process.</li>
                                        </ul>
                                    </div>
                                    <div className="bg-white rounded-lg shadow-lg p-8 mb-8 text-left">
                                        <h2 className="text-2xl font-bold mb-4">Get Started:</h2>
                                        <p className="text-lg mb-4">Ready to enhance your learning experience? Start by entering the URL of the YouTube video you'd like to download. Our platform will guide you through the process, ensuring a smooth and hassle-free experience from start to finish.</p>
                                        <p className="text-lg ">Join the countless users who rely on Youtube Explo to simplify their online learning journey. Begin exploring our features today and unlock the potential of YouTube videos as powerful study aids.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </>
            ) : (
                <>
                    <div className='flex flex-row bg-black justify-center  text-white w-[500px] h-[60px] ml-[510px] mt-6 rounded-full font-semibold p-5  text-[20px]'>
                        <div className=' flex flex-row text-2xl   '>
                            <div className='hover:text-gray-400 cursor-pointer p-1 ml-[5px] -m-3 mr-4 '>Home</div>
                            <Link to="/register">
                                <div className="hover:text-gray-400 cursor-pointer p-1 -m-3 mr-4 ">Register</div>
                            </Link>
                            <Link to="/login">
                                <div className=' cursor-pointer hover:text-gray-400  rounded-lg p-1 -m-3'>Login</div>
                            </Link>
                        </div>
                    </div>
                    <div className=' text-center text-[40px] text-black'>
                        <div className=" py-10">
                            <div className="max-w-6xl mx-auto px-4">
                                <h1 className="text-4xl font-bold text-center mb-8">Welcome to Youtube Explo</h1>
                                <p className="text-lg text-center mb-8">At Youtube Explo, we provide you with a seamless solution to download <span className='font-bold'>Free</span> YouTube videos and convert them into PDF notes effortlessly. Whether you're a student preparing for exams, a professional gathering research material, or simply someone who enjoys learning from online videos, we've got you covered.</p>
                                <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
                                    <h2 className="text-2xl font-bold mb-4">Features:</h2>
                                    <ul className="list-disc pl-5 text-xl text-left">
                                        <li className="mb-2"><span className='font-bold'>Download YouTube Videos</span> : Easily download your favorite YouTube videos in various formats. With just a few clicks, you can save videos directly to your device for offline viewing.</li>
                                        <li className="mb-2"><span className='font-bold'>Convert to PDF Notes</span>: Turn YouTube videos into concise, organized PDF notes. Our intuitive tool extracts key information from the video and formats it into easily digestible notes, perfect for study sessions or reference.</li>
                                        <li className="mb-2"><span className='font-bold'>Transcript Generation</span> : Gain access to the transcript of the downloaded video. Our platform automatically generates accurate transcripts, allowing you to review content quickly and efficiently.</li>
                                        <li className="mb-2"><span className='font-bold'>User-Friendly Interface</span> : Our website offers a user-friendly interface designed for seamless navigation. Whether you're a tech-savvy individual or new to online tools, you'll find our platform intuitive and easy to use.</li>
                                        <li className="mb-2"> <span className='font-bold'>Secure and Reliable</span> : Rest assured, your data's security and privacy are our top priorities. We employ robust security measures to safeguard your information throughout the download and conversion process.</li>
                                    </ul>
                                </div>
                                <div className="bg-white rounded-lg shadow-lg p-8 mb-8 text-left">
                                    <h2 className="text-2xl font-bold mb-4">Get Started:</h2>
                                    <p className="text-lg mb-4">Ready to enhance your learning experience? Start by entering the URL of the YouTube video you'd like to download. Our platform will guide you through the process, ensuring a smooth and hassle-free experience from start to finish.</p>
                                    <p className="text-lg ">Join the countless users who rely on Youtube Explo to simplify their online learning journey. Begin exploring our features today and unlock the potential of YouTube videos as powerful study aids.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default Home;
