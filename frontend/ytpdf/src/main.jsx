import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {Route,RouterProvider,createBrowserRouter,createRoutesFromElements} from "react-router-dom"
import Register from './components/Register/Register.jsx'
import Login from './components/Login/Login.jsx'
import LoginLayout from './LoginLayout.jsx'
import Landing_Page from './Landing_Page.jsx'
import Home from './components/Home/Home.jsx'
import NotesGenerate from './components/NotesGenerate/NotesGenerate.jsx'
import VideoDownload from './components/VideoDownload/VideoDownload.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>   
      <Route path='' element={<Landing_Page/>}/>   
      <Route path='register' element={<Register/>}/>
      <Route path="login" element={<Login/>}/>        
      <Route path='/' element={<LoginLayout/>}>
      <Route path="home" element={<Home/>}/> 
      <Route path="generate-notes" element={<NotesGenerate/>}/>  
      <Route path='download-video' element={<VideoDownload/>}/>
      </Route> 
    </Route>
    
   
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   <RouterProvider router={router}/>
  </React.StrictMode>
)
