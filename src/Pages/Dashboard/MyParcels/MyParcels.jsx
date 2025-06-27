import React from 'react';
import { useAuth } from '../../../Hooks/UseAuth/UseAuth';
import { useQuery, } from '@tanstack/react-query'
import UseAxiosSecure from '../../../Hooks/UseAxiosSecure/UseAxiosSecure';
import Swal from 'sweetalert2';

const MyParcels = () => {
    const { user } = useAuth()
    const useSecure = UseAxiosSecure()
    const { data: userParcels = [], refetch } = useQuery({
        queryKey: ["my-parcels", user?.email],
        queryFn: async () => {
            const data = await useSecure.get(`/parcels?email=${user?.email}`)
            return data.data
        }
    })

    const deleteHandler = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                useSecure.delete(`/parcels/${id}`)
                    .then(data => {
                        if (data.data.deletedCount) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your parcel has been deleted.",
                                icon: "success"
                            });
                            refetch()
                        }
                    })
            }
        });

    }

    return (
        <div className="overflow-x-auto rounded-2xl shadow">
            <table className="min-w-full bg-base-100 text-base-content">
                <thead className="bg-base-200 text-left">
                    <tr>
                        <th className="p-4">#</th>
                        <th className="p-4">Title</th>
                        <th className="p-4">Type</th>
                        <th className="p-4">Created At</th>
                        <th className="p-4">Cost</th>
                        <th className="p-4">Payment</th>
                        <th className="p-4">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {userParcels?.length ? (
                        userParcels.map((item, index) => (
                            <tr key={item.id || index}>
                                <td className="p-4">{index + 1}</td>
                                <td className="p-4">{item.name}</td>
                                <td className="p-4">{item.type}</td>
                                <td className="p-4">{item.creation_date.split("T")[0]}</td>
                                <td className="p-4">৳{item.cost}</td>
                                <td className={`p-4 ${(item.payment_status) === "unpaid" ? "text-red-600" : "text-green-700"}`}>{item.payment_status}</td>
                                <td className="p-4 flex gap-2">
                                    <button
                                        className="btn btn-xs bg-blue-500 text-white hover:bg-blue-600"
                                        onClick={() => console.log("View", item)}
                                    >
                                        View
                                    </button>
                                    <button
                                        className="btn btn-xs bg-green-500 text-white hover:bg-green-600"
                                        onClick={() => console.log("Pay", item)}
                                    >
                                        Pay
                                    </button>
                                    <button
                                        className="btn btn-xs bg-red-500 text-white hover:bg-red-600"
                                        onClick={() => deleteHandler(item._id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="7" className="p-4 text-center text-gray-500">
                                No data available.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default MyParcels;