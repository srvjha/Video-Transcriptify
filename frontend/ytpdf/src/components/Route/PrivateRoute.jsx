import React from 'react';
import { Navigate, Outlet, useNavigate } from "react-router-dom"
import { useSelector } from 'react-redux';

const PrivateComponent = () => {
    const isAuthenticated = useSelector((auth)=>auth.authStatus);
    console.log("isAuthenticated: ",isAuthenticated.authStatus)
    
    return (
        <div>
            {isAuthenticated.authStatus ? (
                <Outlet />
            ) : (
                <Navigate to="/login" />
            )}
        </div>
    );
};

export default PrivateComponent;
