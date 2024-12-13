import React from 'react'
import { Outlet } from 'react-router-dom'
import MainHeader from './components/MainHeader/MainHeader'


const Layout = () => {
  
  return (
    <>
     <MainHeader/>
      <Outlet/>  
    </>
 
  )
}

export default Layout
