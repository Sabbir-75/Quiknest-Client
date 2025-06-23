import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../Pages/Shared/Header/Navbar';
import Footer from '../Pages/Shared/Footer/Footer';

const Layout = () => {
    return (
        <div className='bg-base-200 urbanist'>
            <Navbar></Navbar>
            <div className='min-h-[calc(100vh-374.89px)]'>
                <Outlet></Outlet>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default Layout;