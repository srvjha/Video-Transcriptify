import React from 'react';
import { Navigate, Outlet, useNavigate } from "react-router-dom"

const PrivateComponent = () => {
  
    const token = localStorage.getItem('accessToken');
   // console.log("token: ",token)
   
    
    return (
        <div>
            {token ? (
                <Outlet />
            ) : (
                <Navigate to="/login" />
            )}
        </div>
    );
};

export default PrivateComponent;
