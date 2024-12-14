import React from 'react'
import { Outlet } from 'react-router-dom'
import MainHeader from './components/MainHeader/MainHeader'
import Footer from './components/Footer/Footer'


const Layout = () => {
  
  return (
    <>
     <MainHeader/>
      <Outlet/>  
      <Footer/>
    </>
 
  )
}

export default Layout
