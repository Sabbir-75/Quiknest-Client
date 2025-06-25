import React from 'react';
import {
    FaSearchLocation,
    FaUserFriends,
    FaCalendarAlt,
    FaDoorOpen,
} from "react-icons/fa";

const Works = () => {
    const steps = [
        {
            icon: <FaSearchLocation className="text-4xl text-base-content" />,
            title: "Find Your Spot",
            description: "Browse through hundreds of verified room and flat listings on QuikNest.",
        },
        {
            icon: <FaUserFriends className="text-4xl text-base-content" />,
            title: "Connect Easily",
            description: "Reach out to owners or roommates directly via in-app messaging.",
        },
        {
            icon: <FaCalendarAlt className="text-4xl text-base-content" />,
            title: "Schedule a Visit",
            description: "Book a convenient time to visit and inspect the place.",
        },
        {
            icon: <FaDoorOpen className="text-4xl text-base-content" />,
            title: "Move In",
            description: "Pack your bags and move into your new home — quick and easy!",
        },
    ];
    return (
        <div className='max-w-[1280px] mx-auto px-2 md:px-3 lg:px-8 my-8 md:my-10 lg:my-14'>
            <h1 className='text-4xl font-extrabold text-base-content mb-2 md:mb-6 lg:mb-8'>How it Works</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {steps.map((step, index) => (
                    <div
                        key={index}
                        className="bg-base-100 shadow-sm rounded-2xl p-6 flex flex-col items-start hover:shadow-md transition-shadow shadow-base-content"
                    >
                        <div className="mb-4">{step.icon}</div>
                        <h3 className="text-xl font-semibold text-base-content mb-2">
                            {step.title}
                        </h3>
                        <p className="text-base-300 text-sm">{step.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Works;