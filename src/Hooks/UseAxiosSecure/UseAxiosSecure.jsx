import React, { useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../UseAuth/UseAuth';


const axiosInstance = axios.create({
    baseURL: "https://quiknest-server.vercel.app"
})

const UseAxiosSecure = () => {
    const { user, logoutAccount,loading } = useAuth()

    useEffect(() => {
        if (!loading && user?.accessToken) {
            // Add request interceptor
            const requestInterceptor = axiosInstance.interceptors.request.use(config => {
                config.headers.Authorization = `Bearer ${user?.accessToken}`
                return config
            },
                error => {
                    return Promise.reject(error);
                })

            // Add response interceptor
            const responseInterceptor = axiosInstance.interceptors.response.use(
                res => res,
                error => {
                    console.log(error);
                    if (error.status === 401 || error.status === 403) {
                        logoutAccount()
                            .then(() => {
                                console.log(`You are Logout because of an error with ${error.status} code`);
                            })
                            .catch(error => {
                                console.log(error.message);
                            })
                    }
                    return Promise.reject(error);
                }
            )

            // Cleanup to prevent multiple interceptors on re-renders
            return () => {
                axiosInstance.interceptors.request.eject(requestInterceptor);
                axiosInstance.interceptors.response.eject(responseInterceptor);
            };
        }
    }, [user, logoutAccount, loading]);

    return axiosInstance
};

export default UseAxiosSecure;