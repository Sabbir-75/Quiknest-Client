import React from 'react';
import UseAxiosSecure from '../UseAxiosSecure/UseAxiosSecure';


const useTrackingLogger = () => {
    const useSecure = UseAxiosSecure();

    const logTracking = async ({ tracking_id, status, details, location, updated_by }) => {
        try {
            const payload = {
                tracking_id,
                status,
                details,
                location,
                updated_by,
            };
            await useSecure.post("/trackings", payload);
        } catch (error) {
            console.error("Failed to log tracking:", error);
        }
    };

    return { logTracking };
};

export default useTrackingLogger;