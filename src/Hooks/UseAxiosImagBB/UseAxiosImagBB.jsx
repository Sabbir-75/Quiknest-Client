import axios from 'axios';
import React from 'react';

const axiosInstance = axios.create({
    baseURL: "https://quiknest-server.vercel.app"
})

const UseAxiosImagBB = () => {
    return axiosInstance
};

export default UseAxiosImagBB;