import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {Route,RouterProvider,createBrowserRouter,createRoutesFromElements} from "react-router-dom"
import Home from './components/Home/Home.jsx'
import Register from './components/Register/Register.jsx'
import Login from './components/Login/Login.jsx'
import MainPage from './components/MainPage/MainPage.jsx'
import GeneratePDF from './components/GeneratePDF/GeneratePDF.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
    <Route path='' element={<Home/>}/>
    <Route path='register' element={<Register/>}/>
    <Route path="login" element={<Login/>}/>   
    <Route path="mainPage" element={<MainPage/>}/>
    <Route path="generatePDF" element={<GeneratePDF/>}/>
    
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   <RouterProvider router={router}/>
  </React.StrictMode>
)
