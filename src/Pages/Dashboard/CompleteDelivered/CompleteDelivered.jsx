import { useMutation, useQuery } from '@tanstack/react-query';
import React from 'react';
import UseAxiosSecure from '../../../Hooks/UseAxiosSecure/UseAxiosSecure';

const CompleteDelivered = () => {
    const useSecure = UseAxiosSecure()
    const { data: parcels = [], isLoading, refetch } = useQuery({
        queryKey: ['deliveredParcels', 'delivered'],
        queryFn: async () => {
            const data = await useSecure.get(`/parcel/complete/?delivery_status=delivered`)
            return data.data
        },
    });

    const calculateCashout = (parcel) => {
        const sameDistrict =
            parcel.senderService.toLowerCase() === parcel.receiverService.toLowerCase();

        const percentage = sameDistrict ? 0.4 : 0.5;
        return Math.round(parcel.cost * percentage); // Round to nearest Taka
    };


    const { mutateAsync: cashOutmutation } = useMutation({
        mutationFn: async ({ parcelId, rider_amount }) => {
            const data = await useSecure.patch(`/parcel/paid/${parcelId}`, {
                rider_amount
            })
            return data.data
        }
    })

    const handleCashout = async (parcel) => {
        const cashoutAmount = calculateCashout(parcel);
        const data = await cashOutmutation({ parcelId: parcel._id, rider_amount: cashoutAmount })
        if (data.modifiedCount) {
            refetch()
        }
    };

    if (isLoading) return <p className="text-center">Loading...</p>;
    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Complete Delivered Parcels</h2>

            {parcels.length === 0 ? (
                <p className="text-gray-500">No delivered parcels found.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="table table-zebra w-full">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Rider Name</th>
                                <th>Sender Location</th>
                                <th>Receiver Location</th>
                                <th>Cost (৳)</th>
                                <th>Earning</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {parcels.map((parcel, index) => {
                                const cashout = calculateCashout(parcel);
                                return (
                                    <tr key={parcel._id}>
                                        <td>{index + 1}</td>
                                        <td>{parcel.riderName}</td>
                                        <td>{parcel.senderService}</td>
                                        <td>{parcel.receiverService}</td>
                                        <td>৳{parcel.cost}</td>
                                        <td className="font-semibold text-green-600">৳{cashout}</td>
                                        <td>
                                            {parcel.cashout_tk ? (
                                                <span className="text-sm text-green-700">Cashout Done</span>
                                            ) : (
                                                <button
                                                    className="btn btn-sm btn-success"
                                                    onClick={() => handleCashout(parcel)}
                                                    disabled={cashOutmutation.isPending}
                                                >
                                                    Cashout
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default CompleteDelivered;