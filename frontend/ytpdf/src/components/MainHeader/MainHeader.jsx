import React, { useEffect, useState } from 'react';
import LoginHeader from "../../LoginHeader";
import Header from "../Header/Header";
import axios from 'axios';
import {Mode} from '../../config/ApplicationMode.js'
import { useCookies } from 'react-cookie';

const MainHeader = () => {
  const [cookies, setCookie] = useCookies(['accessToken']); 
  const token = localStorage.getItem('accessToken');
  console.log("TOKEN:",token)
  const [name,setName] = useState(""); 
  const envNode = Mode();
  let envURL;    
  envURL = envNode.url;
  
  useEffect(() => {
    if (token && cookies.accessToken !== token) {
      console.log("SETTING COOKIE");
      setCookie("accessToken", token, {
        sameSite: "None",
        secure: window.location.protocol === "https:" ,
      });
    }
  }, [token, cookies.accessToken, setCookie]);

  console.log("COOKIE:",cookies)

  const getUserDetails = ()=>{
    axios.get(`${envURL}/api/v1/users/get-current-user`,
      
      { withCredentials: true,}
    )
    .then((res)=>{
        //console.log("DATA:",res)
        setName(res.data.data.fullName)
       
    })

  }
   
    useEffect(()=>{
      if(token){
        getUserDetails()
      }
      
    },[token])
  
  
  return token ? <LoginHeader name={name} /> : <Header />;
};

export default MainHeader;
