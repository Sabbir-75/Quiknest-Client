import React, { useState } from 'react';
import { useAuth } from '../../../Hooks/UseAuth/UseAuth';
import UseAxiosImagBB from '../../../Hooks/UseAxiosImagBB/UseAxiosImagBB';
import { useMutation, useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import useTrackingLogger from '../../../Hooks/TrakingLogger/TrakingLogger';

const PendingDeliveries = () => {
    const { user } = useAuth()
    const useSecure = UseAxiosImagBB()
    const { logTracking } = useTrackingLogger()

    const { data: parcels = [], isLoading, refetch } = useQuery({
        queryKey: ["parcels", user],
        queryFn: async () => {
            const data = await useSecure.get(`/riders/parcels/${user?.email}`)
            return data.data
        }
    })


    const { mutateAsync: stateChange } = useMutation({
        mutationFn: async ({ parcel, status }) => {
            const data = await useSecure.patch(`/parcels/stateChange/${parcel._id}`, { status })
            return data.data
        }

    })
    const handleStatusUpdate = (parcel, status) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const response = await stateChange({ parcel, status })
                if (response.modifiedCount) {
                    refetch()
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success"
                    });
                    await logTracking({
                        tracking_id: parcel.tracking_id,
                        status: "parcel_Delivered",
                        details: `Created by ${user.displayName}`,
                        updated_by: user.email,
                    })
                }

            }
        });

    }
    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Pending Deliveries</h2>
            {isLoading ? (
                <p>Loading...</p>
            ) : parcels.length === 0 ? (
                <p className="text-gray-500">No assigned deliveries.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="table table-zebra w-full">
                        <thead>
                            <tr>
                                <th>Tracking ID</th>
                                <th>Title</th>
                                <th>Type</th>
                                <th>Receiver</th>
                                <th>Receiver Center</th>
                                <th>Cost</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {parcels.map((parcel) => (
                                <tr key={parcel._id}>
                                    <td>{parcel.tracking_id}</td>
                                    <td>{parcel.name}</td>
                                    <td>{parcel.type}</td>
                                    <td>{parcel.receiverName}</td>
                                    <td>{parcel.receiverService}</td>
                                    <td>৳{parcel.cost}</td>
                                    <td className="capitalize">{parcel.delivery_status.replace("_", " ")}</td>
                                    <td>
                                        {parcel.delivery_status === "assigned" && (
                                            <button
                                                className="btn btn-sm py-6 btn-primary text-black"
                                                onClick={() =>
                                                    handleStatusUpdate(parcel, "in_transit")
                                                }
                                            >
                                                Mark In Transit
                                            </button>
                                        )}
                                        {parcel.delivery_status === "in_transit" && (
                                            <button
                                                className="btn btn-sm py-6 btn-success text-black"
                                                onClick={() =>
                                                    handleStatusUpdate(parcel, "delivered")
                                                }
                                            >
                                                Mark Delivered
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default PendingDeliveries;