import React,{useState} from 'react';
import { Link, useLocation,useNavigate } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
    const location = useLocation();
    const fullName = location.state && location.state.fullName;
    const accessToken = location.state && location.state.accessToken;
    const [active ,setActive] = useState(true)
    
    const navigate = useNavigate();

    const handleLogoutForm = (e) => {
        e.preventDefault();
        axios.post("http://localhost:3000/api/v1/users/logout", null, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        .then((res) => {
            console.log(res);
            // Handle success response if needed
           // Redirect to the login page upon successful logout
           navigate("/")
           setActive(false)
        })
        .catch((error) => {
            console.error("Logout failed:", error);
            // Handle error if needed
        });
    }

    return (
        <>
            { active && fullName ?
                (
                    <>
                        <div className='flex flex-row bg-blue-700 text-white font-semibold p-5 justify-end space-x-20 text-[20px]'>
                            <div className=" bg-black rounded-lg p-2">{fullName}</div>
                            <div className=' cursor-pointer hover:bg-blue-300 relative hover:rounded-full p-2'
                                onClick={(e) => handleLogoutForm(e)}>Logout</div>
                        </div>
                        <div className=' text-center bg-slate-200 min-h-screen text-[40px] text-black'>
                            <div className="font-semibold">Convert your Youtube Video to PDF</div>
                            <div className="mt-10">
                                <label htmlFor="Youtube-Link" className="text-2xl font-medium ">Youtube Link:</label>
                                <input
                                    type="text"
                                    className=" ml-2 p-2 h-14 w-[700px] bg-transparent border border-black   rounded-md text-lg"
                                />
                            </div>
                        </div>


                    </>
                )
                : (
                    <>
                        <div className='flex flex-row bg-blue-700 text-white font-semibold p-5 space-x-4 text-[20px]'>
                            <Link to="/register">
                                <div className=' ml-[1300px] cursor-pointer '>Register</div>
                            </Link>
                            <Link to="/login">
                                <div className=' cursor-pointer'>Login</div>
                            </Link>
                        </div>
                        <div className=' font-semibold text-center bg-slate-200 min-h-screen text-[40px] text-black'>
                            {/* Display the user's name */}
                            Convert your Youtube Video to PDF
                        </div>
                    </>
                )
            }
        </>
    );
};

export default Home;
