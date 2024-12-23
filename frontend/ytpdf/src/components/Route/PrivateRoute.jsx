import React from 'react';
import { Navigate, Outlet, useNavigate } from "react-router-dom"

const PrivateComponent = () => {
  
    const token = localStorage.getItem('accessToken');
   // console.log("token: ",token)
   // here we are checking if the token is present in the local storage or not
   // also want to ensure that the token is not null
    // if the token is present then we are rendering the Outlet component
    // else we are redirecting the user to the login page
    
   
    
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
