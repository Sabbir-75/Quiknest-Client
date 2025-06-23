import React from 'react';
import { Link } from 'react-router';
import logo from "../../assets/logo.png"

const FooterLogo = () => {
    return (
        <Link to={"/"} className='max-w-[300px] flex items-end'>
            <img src={logo} alt={logo} />
            <p className='text-neutral-content font-bold text-3xl -ml-4.5 -mb-1'>Quiknest</p>
        </Link>
    );
};

export default FooterLogo;