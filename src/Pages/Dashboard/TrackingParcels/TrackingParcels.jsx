import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure/UseAxiosSecure";

const TrackingParcels = () => {
    const [submittedId, setSubmittedId] = useState("");
    const axiosSecure = UseAxiosSecure();

    const { data: trackingLogs = [], isLoading } = useQuery({
        queryKey: ["trackingLogs", submittedId],
        queryFn: async () => {
            const data = await axiosSecure.get(`/tracking/${submittedId}`);
            return data.data;
        },
    });

    const statusColor = {
        parcel_created: "text-blue-500",
        rider_assigned: "text-yellow-500",
        in_transit: "text-orange-500",
        delivered: "text-green-600",
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const id = e.target.track.value
        setSubmittedId(id)
    };

    return (
        <div className="p-6 max-w-4xl mx-auto space-y-6">
            <h2 className="text-3xl font-bold mb-4">📦 Parcel Tracking</h2>

            <form onSubmit={handleSubmit} className="flex gap-4 items-center">
                <input
                    type="text"
                    name="track"
                    placeholder="Enter Tracking ID"
                    className="input input-bordered w-full max-w-xs"
                />
                <button className="btn btn-primary">Track</button>
            </form>

            {isLoading ? (
                <p className="text-gray-500">Loading...</p>
            ) : submittedId && trackingLogs.length === 0 ? (
                <p className="text-red-500 mt-4">No tracking history found for ID: {submittedId}</p>
            ) : (
                <ul className="timeline timeline-vertical mt-6">
                    {trackingLogs.map((log, index) => (
                        <li key={index}>
                            <div className={`timeline-start font-semibold ${statusColor[log.status]}`}>
                                {log.status.replace("_", " ").toUpperCase()}
                            </div>
                            <div className="timeline-middle">
                                <div className="w-3 h-3 bg-primary rounded-full"></div>
                            </div>
                            <div className="timeline-end mb-10">
                                <div className="bg-base-200 p-4 rounded-xl shadow w-full">
                                    <p className="text-sm text-gray-600">{log.details}</p>
                                    <p className="text-sm text-gray-500 mt-1">
                                        Updated by: <span className="font-medium">{log.updated_by}</span>
                                    </p>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default TrackingParcels;
