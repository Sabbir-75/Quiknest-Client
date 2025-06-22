import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../Pages/Shared/Header/Navbar';

const Layout = () => {
    return (
        <div className='bg-base-200 urbanist'>
            <Navbar></Navbar>
            <div>
                <Outlet></Outlet>
            </div>
            <h1>Footer</h1>
        </div>
    );
};

export default Layout;