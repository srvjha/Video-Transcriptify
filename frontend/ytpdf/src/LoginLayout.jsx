import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom'
import axios from 'axios';

import LoginHeader from './LoginHeader'

const  LoginLayout = () => {
  const [name,setName] = useState("")
  

  const getUserDetails = ()=>{
    axios.get("/api/v1/users/get-current-user")
    .then((res)=>{
        //console.log("DATA:",res)
        setName(res.data.data.fullName)
       
    })

  }
   
    useEffect(()=>{
      getUserDetails()
    },[])
     
  return (
    <>
     <LoginHeader name = {name}/>
      <Outlet/>
    </>
  )
}

export default LoginLayout
