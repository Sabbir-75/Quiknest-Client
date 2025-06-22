import React from 'react';
import logo from "../../assets/logo.png"
import { Link } from 'react-router';

const Logo = () => {
    return (
        <Link to={"/"} className='max-w-[150px] flex items-end'>
            <img src={logo} alt={logo} />
            <p className='text-neutral font-bold text-3xl -ml-4.5 -mb-1'>Quiknest</p>
        </Link>
    );
};

export default Logo;