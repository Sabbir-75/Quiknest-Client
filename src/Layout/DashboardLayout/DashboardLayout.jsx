import React from 'react';
import { NavLink, Outlet, useLocation } from 'react-router';
import { FaBox, FaMoneyCheckAlt, FaHome, FaHourglassHalf, FaBiking, FaUserShield, FaMotorcycle, FaTruckMoving, FaCheckCircle, FaMoneyBillWave, FaSearchLocation } from "react-icons/fa";
import USeRole from '../../Hooks/UseRole/USeRole';

const DashboardLayout = () => {
    const location = useLocation()
    const { role } = USeRole()

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
                            <FaHome className="mr-2" /> Home
                        </NavLink>
                    </li>
                    <li className='text-base-300 font-semibold text-base'>
                        <NavLink to="/dashboard/myparcels" className={linkClasses("/dashboard/myparcels")}>
                            <FaBox className="mr-2" /> My Parcels
                        </NavLink>
                    </li>
                    <li className='text-base-300 font-semibold text-base'>
                        <NavLink to="/dashboard/payment-history" className={linkClasses("/dashboard/payment-history")}>
                            <FaMoneyCheckAlt className="mr-2" /> Payment History
                        </NavLink>
                    </li>
                    <li className="text-base-300 font-semibold text-base">
                        <NavLink
                            to="/dashboard/tracking"
                            className={linkClasses("/dashboard/tracking")}
                        >
                            <FaSearchLocation className="mr-2" /> TrackingPage
                        </NavLink>
                    </li>
                    {
                        role === "rider" && <>
                            <li className="text-base-300 font-semibold text-base">
                                <NavLink
                                    to="/dashboard/pending_deliveries"
                                    className={linkClasses("/dashboard/pending_deliveries")}
                                >
                                    <FaTruckMoving className="mr-2" /> Pending Deliveries
                                </NavLink>
                            </li>
                            <li className="text-base-300 font-semibold text-base">
                                <NavLink
                                    to="/dashboard/complete_delivered"
                                    className={linkClasses("/dashboard/complete_delivered")}
                                >
                                    <FaCheckCircle className="mr-2" /> Complete Delivered
                                </NavLink>
                            </li>
                            <li className="text-base-300 font-semibold text-base">
                                <NavLink
                                    to="/dashboard/earning"
                                    className={linkClasses("/dashboard/earning")}
                                >
                                    <FaMoneyBillWave className="mr-2" /> Earning
                                </NavLink>
                            </li>
                        </>
                    }

                    {
                        (role === "admin") &&
                        <>
                            {/* Assign Riders menu */}
                            <li className="text-base-300 font-semibold text-base">
                                <NavLink
                                    to="/dashboard/assignrider"
                                    className={linkClasses("/dashboard/assignrider")}
                                >
                                    <FaMotorcycle className="mr-2" /> Assign Rider
                                </NavLink>
                            </li>
                            {/* Active Riders menu */}
                            <li className="text-base-300 font-semibold text-base">
                                <NavLink
                                    to="/dashboard/active_riders"
                                    className={linkClasses("/dashboard/active_riders")}
                                >
                                    <FaBiking /> Active Riders
                                </NavLink>
                            </li>

                            {/* Pending Riders menu */}
                            <li className="text-base-300 font-semibold text-base">
                                <NavLink
                                    to="/dashboard/pending_riders"
                                    className={linkClasses("/dashboard/pending_riders")}
                                >
                                    <FaHourglassHalf /> Pending Riders
                                </NavLink>
                            </li>
                            {/* Admin Portal */}
                            <li className="text-base-300 font-semibold text-base">
                                <NavLink
                                    to="/dashboard/make_admin"
                                    className={linkClasses("/dashboard/make_admin")}
                                >
                                    <FaUserShield className="mr-2" /> Make Admin
                                </NavLink>
                            </li>
                        </>
                    }

                </ul>
            </div>
        </div>
    );
};

export default DashboardLayout;