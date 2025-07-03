import React from 'react';
import { FaLock } from 'react-icons/fa';
import { useNavigate } from 'react-router';

const Forbidden = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-red-600 flex flex-col items-center justify-center text-white px-4">
            <FaLock className="text-7xl text-white animate-pulse mb-4" />
            <h1 className="text-5xl font-bold mb-2">Access Forbidden</h1>
            <p className="text-lg mb-6 text-center max-w-md">
                You don't have permission to view this page. This section is restricted to administrators only.
            </p>
            <button
                onClick={() => navigate('/')}
                className="bg-primary text-primary-content px-6 py-2 rounded-full text-lg font-semibold hover:bg-green-500 transition"
            >
                ⬅ Go Back Home
            </button>
        </div>
    );
};

export default Forbidden;
