import React from 'react';
import Container from '../../../Components/Container/Container';
import { Link, NavLink } from 'react-router';
import { HiMiniArrowUpRight } from "react-icons/hi2";
import Logo from '../../../Components/Logo/Logo';
import "./navbar.css"
import { useAuth } from '../../../Hooks/UseAuth/UseAuth';
import { Bounce, toast } from 'react-toastify';

const Navbar = () => {

    const { user, logoutAccount } = useAuth()

    const logoutHandler = () => {
        logoutAccount()
            .then(() => {
                toast.success('Logout Successfully', {
                    position: "top-right",
                    autoClose: 500,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    transition: Bounce
                });
            })
            .then(error => {
                toast.error(`${error.code}`, {
                    position: "top-right",
                    autoClose: 500,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    transition: Bounce
                });
            })
    }
    const nav = <>
        <li className='text-base-300 font-semibold text-base'><NavLink className={`hover:bg-primary px-2 py-1 rounded-sm duration-200`} to={"/"}>Home</NavLink></li>
        <li className='text-base-300 font-semibold text-base'><NavLink className={`hover:bg-primary px-2 py-1 rounded-sm duration-200`} to={"/services"}>Services</NavLink></li>
        <li className='text-base-300 font-semibold text-base'><NavLink className={`hover:bg-primary px-2 py-1 rounded-sm duration-200`} to={"/coverage"}>Coverage</NavLink></li>
        <li className='text-base-300 font-semibold text-base'><NavLink className={`hover:bg-primary px-2 py-1 rounded-sm duration-200`} to={"/about"}>About Us</NavLink></li>
        <li className='text-base-300 font-semibold text-base'><NavLink className={`hover:bg-primary px-2 py-1 rounded-sm duration-200`} to={"/addparcel"}>Add Parcel</NavLink></li>
        <li className='text-base-300 font-semibold text-base'><NavLink className={`hover:bg-primary px-2 py-1 rounded-sm duration-200`} to={"/rider"}>Be a Rider</NavLink></li>
        {
            user &&  <li className='text-base-300 font-semibold text-base'><NavLink className={`hover:bg-primary px-2 py-1 rounded-sm duration-200`} to={"/dashboard"}>Dashboard</NavLink></li>
        }
    </>
    return (
        <div className="bg-base-100 shadow-sm py-4">
            <Container>
                <div className='navbar'>
                    <div className="navbar-start flex gap-0.5">
                        <div className="dropdown">
                            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                            </div>
                            <ul
                                tabIndex={0}
                                className="myclassName menu-sm dropdown-content mt-3 w-52 p-2 shadow">
                                {nav}
                            </ul>
                        </div>
                        <Logo></Logo>
                    </div>
                    <div className="navbar-center hidden lg:flex">
                        <ul className="myclassName flex items-center gap-6 menu-horizontal px-1">
                            {nav}
                        </ul>
                    </div>
                    <div className="flex gap-3 items-center navbar-end">
                        {
                            user ?
                                <Link onClick={logoutHandler} className={`relative  inline-flex items-center cursor-pointer justify-start px-5 py-2 overflow-hidden font-bold rounded-lg group`}>
                                    <span className="w-12 h-12 rotate-45 translate-x-12 -translate-y-2 absolute left-0 top-0 bg-primary opacity-[3%]"></span>
                                    <span className="absolute top-0 left-0 w-48 h-48 -mt-1 transition-all duration-300 ease-in-out rotate-45 -translate-x-56 -translate-y-24 bg-primary opacity-100 group-hover:-translate-x-8"></span>
                                    <span className={`relative w-full text-left text-base-300 transition-colors duration-200 ease-in-out group-hover:text-primary-content flex justify-center text-lg items-center gap-2`}>Logout</span>
                                    <span className="absolute inset-0 border-2 border-base-300 hover:border-primary rounded-lg duration-200"></span>
                                </Link>
                                :
                                <Link to={"/login"} className={`relative  inline-flex items-center cursor-pointer justify-start px-5 py-2 overflow-hidden font-bold rounded-lg group`}>
                                    <span className="w-32 h-32 rotate-45 translate-x-12 -translate-y-2 absolute left-0 top-0 bg-primary opacity-[3%]"></span>
                                    <span className="absolute top-0 left-0 w-48 h-48 -mt-1 transition-all duration-300 ease-in-out rotate-45 -translate-x-56 -translate-y-24 bg-primary opacity-100 group-hover:-translate-x-8"></span>
                                    <span className={`relative w-full text-left text-base-300 transition-colors duration-200 ease-in-out group-hover:text-primary-content flex justify-center text-lg items-center gap-2`}>Sign In</span>
                                    <span className="absolute inset-0 border-2 border-base-300 hover:border-primary rounded-lg duration-200"></span>
                                </Link>
                        }

                        <div className='flex justify-center items-center'>
                            <button className="btn btn-primary bt-sm text-base md:text-lg font-bold px-5 py-5 rounded-lg">Secondary</button>
                            <div className='w-6 h-6 bg-neutral rounded-full flex justify-center items-center'>
                                <HiMiniArrowUpRight color='#B7D55C' size={25} />
                            </div>
                        </div>

                    </div>
                </div>

            </Container>

        </div>
    );
};

export default Navbar;