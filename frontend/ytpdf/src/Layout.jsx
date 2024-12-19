import React from 'react';
import { Outlet } from 'react-router-dom';
import MainHeader from './components/MainHeader/MainHeader';
import Footer from './components/Footer/Footer';

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <MainHeader />
      <div className="flex-grow">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
