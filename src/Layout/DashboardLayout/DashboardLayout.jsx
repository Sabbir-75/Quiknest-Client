import React from 'react';
import { NavLink, Outlet, useLocation } from 'react-router';

const DashboardLayout = () => {
    const location = useLocation()
    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col">
                {/* Page content here */}
                {/* Navbar */}
                <div className="navbar bg-base-300 lg:hidden w-full">
                    <div className="flex-none">
                        <label htmlFor="my-drawer-2" aria-label="open sidebar" className="btn btn-square btn-ghost">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                className="inline-block h-6 w-6 stroke-current"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                ></path>
                            </svg>
                        </label>
                    </div>
                    <div className="mx-2 flex-1 px-2">Dashboard</div>
                </div>
                {/* Page content here */}
                <div>
                    <Outlet></Outlet>

                </div>
            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
                    {/* Sidebar content here */}
                    <li className='text-base-300 font-semibold text-base'><NavLink className={`hover:bg-primary px-2 py-1 rounded-sm duration-200`} to={"/"}>Home</NavLink></li>
                    <li className='text-base-300 font-semibold text-base'><NavLink className={`hover:bg-primary px-2 py-1 rounded-sm duration-200 ${location.pathname == "/dashboard/myparcels" && "bg-primary"}`} to={"myparcels"}>My Parcels</NavLink></li>
                </ul>
            </div>
        </div>
    );
};

export default DashboardLayout;