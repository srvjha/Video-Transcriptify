import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import Register from './components/Register/Register.jsx';
import Login from './components/Login/Login.jsx';
import Landing_Page from './Landing_Page.jsx';
import Home from './components/Home/Home.jsx';
import NotesGenerate from './components/NotesGenerate/NotesGenerate.jsx';
import VideoDownload from './components/VideoDownload/VideoDownload.jsx';
import PrivateRoute from './components/Route/PrivateRoute.jsx';
import Layout from './Layout.jsx'; // Main layout with header and footer
import { Provider } from 'react-redux';
import { store } from './Redux/store/store';


const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Main Layout with Header and Footer */}
      <Route path="/" element={<Layout />}>
        <Route path="" element={<Landing_Page />} />
        <Route element={<PrivateRoute />}>
          <Route path="home" element={<Home />} />
          <Route path="generate-notes" element={<NotesGenerate />} />
          <Route path="download-video" element={<VideoDownload />} />
        </Route>
      </Route>

      {/* Login and Register Layout without Header and Footer */}
      <Route >
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
      </Route>
    </>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store = {store}>
    <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
