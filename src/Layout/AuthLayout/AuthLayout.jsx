import React from 'react';
import Logo from '../../Components/Logo/Logo';
import { Outlet } from 'react-router';
import Container from '../../Components/Container/Container';
import authImage from "../././../assets/authImage.png"

const AuthLayout = () => {
    return (
        <Container>
            <div className='flex md:flex-row flex-col bg-100 urbanist'>
                <div className='flex-1 pt-6 pl-[10px]'>
                    <Logo></Logo>
                    <div className='pt-5 md:pt-10 lg:pt-15 pl-8 md:pl-[70px] lg:pl-[150px]'>
                        <Outlet></Outlet>
                    </div>
                </div>
                <div className='flex-1 flex justify-center items-center bg-info-content'>
                    <img src={authImage} alt={authImage} />
                </div>
            </div>
        </Container>

    );
};

export default AuthLayout;