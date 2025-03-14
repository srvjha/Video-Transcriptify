import React, { useEffect, useState } from "react";
import LoginHeader from "../Header/LoginHeader";
import Header from "../Header/Header";
import axios from "axios";
import { Mode } from "../../config/ApplicationMode.js";
import { useSelector } from 'react-redux';

const MainHeader = () => {
  const [tokenStatus, setTokenStatus] = useState("");
  const [name, setName] = useState("");
  const envNode = Mode();
  const envURL = envNode.url;
   

  // Function to get user details
  const getUserDetails =() => {
    axios
      .get(`${envURL}/api/v1/users/get-current-user`, { withCredentials: true })
      .then((res) => {
        setName(res.data.data.fullName);
        setTokenStatus(""); // Reset token status on success
      })
      .catch((error) => {
        if (error.response?.status === 401) {
          setTokenStatus(401); // Trigger token refresh if 401
        }
      });
  };

  // Handle token refresh when access token is expired
  useEffect(() => {
    if (tokenStatus === 401) {
      axios
        .post(
          `${envURL}/api/v1/users/refresh-token`,
          { withCredentials: true }
        )
        .then((res) => {
          if(res.statusCode === 200){
            // Fetch user details with the refreshed token
             getUserDetails();
          }
        })
        .catch((error) => {
          console.log("ERROR refreshing token:", error);
          setTokenStatus(401); // Reset token status on failure
         // console.log("Refresh token expired. Logging out.");
        });
    }
  }, [tokenStatus, envURL, getUserDetails]);
   

  useEffect(()=>{
    getUserDetails();
  },[])

  const isAuthenticated = useSelector((auth)=>auth.authStatus);  
  return (isAuthenticated.authStatus && name) ? <LoginHeader name={name} /> : <Header />;
};

export default MainHeader;
