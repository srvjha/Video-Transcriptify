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
import { persistor, store } from './Redux/store/store';
import { PersistGate } from 'redux-persist/integration/react';
import NotFoundPage from './components/NotFoundPage/NotFoundPage';
import CustomizePdf from './components/CustomizePdf/CustomizePdf';
import EditPDF from './components/CustomizePdf/EditPDF';
import PdfViewer from './components/CustomizePdf/viewPDF';


const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Main Layout with Header and Footer */}
      <Route path="/" element={<Layout />}>
        <Route path="" element={<Landing_Page />} />
        <Route path="home" element={<Home />} />
        <Route element={<PrivateRoute />}>
        <Route path="generate-notes" element={<NotesGenerate />} />
        <Route path="download-video" element={<VideoDownload />} />
        <Route path="customize-pdf" element={<CustomizePdf/>} />
        </Route>
      </Route>

      {/* Login and Register Layout without Header and Footer */}
      <Route>
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
      </Route>

      {/* 404 Not Found Page for invalid route  */}
      <Route path="*" element={ <NotFoundPage/>} />
     
     {/* edit pdf page */}
     <Route path="/edit-pdf/:id" element={ <PdfViewer/>} />
    
    </>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  
    <Provider store = {store}>
      <PersistGate loading={null} persistor={persistor}>
    <RouterProvider router={router} />
    </PersistGate>
    </Provider>

);
