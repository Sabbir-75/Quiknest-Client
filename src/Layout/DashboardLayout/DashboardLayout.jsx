import React from 'react';
import { NavLink, Outlet, useLocation } from 'react-router';
import { FaBox, FaMoneyCheckAlt, FaClipboardList, FaFileInvoice, FaCog, FaSearchLocation, FaHome } from "react-icons/fa";

const DashboardLayout = () => {
    const location = useLocation()

    const linkClasses = (path) =>
        `flex items-center gap-2 hover:bg-primary/80 text-base-content px-3 py-2 rounded duration-200 ${location.pathname === path && "bg-primary shadow-md"
        }`;

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
                    <li className='text-base-300 font-semibold text-base'>
                        <NavLink to={"/"} className={`hover:bg-primary`}>
                            <FaHome /> Home
                        </NavLink>
                    </li>
                    <li className='text-base-300 font-semibold text-base'>
                        <NavLink to="/dashboard/myparcels" className={linkClasses("/dashboard/myparcels")}>
                            <FaBox /> My Parcels
                        </NavLink>
                    </li>
                    <li className='text-base-300 font-semibold text-base'>
                        <NavLink to="/dashboard/payment-history" className={linkClasses("/dashboard/payment_history")}>
                            <FaMoneyCheckAlt /> Payment History
                        </NavLink>
                    </li>
                    <li className='text-base-300 font-semibold text-base'>
                        <NavLink to="/dashboard/track-package" className={linkClasses("/dashboard/track-package")}>
                            <FaSearchLocation /> Track a Package
                        </NavLink>
                    </li>
                    <li className='text-base-300 font-semibold text-base'>
                        <NavLink to="/dashboard/my-orders" className={linkClasses("/dashboard/my-orders")}>
                            <FaClipboardList /> My Orders
                        </NavLink>
                    </li>
                    <li className='text-base-300 font-semibold text-base'>
                        <NavLink to="/dashboard/invoices" className={linkClasses("/dashboard/invoices")}>
                            <FaFileInvoice /> Invoices
                        </NavLink>
                    </li>
                    <li className='text-base-300 font-semibold text-base'>
                        <NavLink to="/dashboard/settings" className={linkClasses("/dashboard/settings")}>
                            <FaCog /> Settings
                        </NavLink>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default DashboardLayout;