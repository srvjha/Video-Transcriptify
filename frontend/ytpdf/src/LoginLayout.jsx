import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom'
import axios from 'axios';

import LoginHeader from './LoginHeader'

const  LoginLayout = () => {
  const [name,setName] = useState("")
  const [accessToken,setAccessToken] = useState("")

  const getUserDetails = ()=>{
    axios.get("/api/v1/users/get-current-user")
    .then((res)=>{
        console.log("DATA:",res)
        setName(res.data.data.fullName)
        setAccessToken(res.data.data.accessToken)
    })

  }
   
    useEffect(()=>{
      getUserDetails()
    },[])
     
  return (
    <>
     <LoginHeader name = {name} token={accessToken}/>
      <Outlet/>
    </>
  )
}

export default LoginLayout
