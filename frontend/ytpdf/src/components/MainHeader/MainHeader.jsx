import React, { useEffect, useState } from 'react';
import LoginHeader from "../../LoginHeader";
import Header from "../Header/Header";
import axios from 'axios';
import {Mode} from '../../config/ApplicationMode.js'
import { useCookies } from 'react-cookie';

const MainHeader = () => {
  const token = localStorage.getItem('accessToken');
  const [cookies, setCookie] = useCookies(['accessToken']);
  setCookie('accessToken', token)
  const [name,setName] = useState(""); 
  const envNode = Mode();
  let envURL;    
  envURL = envNode.url;
  

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
      getUserDetails()
    },[])
  
  
  return token ? <LoginHeader name={name} /> : <Header />;
};

export default MainHeader;
