import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import UseAxiosSecure from '../../../Hooks/UseAxiosSecure/UseAxiosSecure';
import Swal from 'sweetalert2';
import { FaEye, FaCheck, FaTimes } from "react-icons/fa";
import Container from '../../../Components/Container/Container';
import { useAuth } from '../../../Hooks/UseAuth/UseAuth';

const PendingRiders = () => {
    const useSecure = UseAxiosSecure()
    const { user } = useAuth()
    const { data: pendings = {}, refetch } = useQuery({
        queryKey: ["pending", user?.email],
        queryFn: async () => {
            const data = await useSecure.get("/pending/riders");
            return data.data
        }
    })
    const [selectedRider, setSelectedRider] = useState(null);
    const handleReject = (rider, id, action) => {
        Swal.fire({
            title: `Reject rider "${rider.name}"?`,
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Reject",
            cancelButtonText: "Cancel",
            confirmButtonColor: "#16a34a", // green
        }).then(async (result) => {
            if (result.isConfirmed) {
                const data = {
                    rider_status: action,
                    feedback: "You are not suitable for this job."
                }
                const res = await useSecure.patch(`/riders/status/${id}`, data)
                if (res.data.modifiedCount) {
                    refetch()
                    Swal.fire({
                        title: "Rejected!",
                        text: `Rider ${rider.name} has been Rejected.`,
                        icon: "success",
                        confirmButtonText: "OK",
                        buttonsStyling: false,
                        customClass: {
                            confirmButton: "bg-green-600 text-base-content px-5 py-2 rounded hover:bg-green-700 font-semibold"
                        },
                    });
                }


            }
        });
    };

    const handleAccept = (rider, id, action,email) => {
        Swal.fire({
            title: `Accept rider "${rider.name}"?`,
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Accept",
            cancelButtonText: "Cancel",
            confirmButtonColor: "#16a34a", // green
        }).then(async (result) => {
            if (result.isConfirmed) {
                const data = {
                    rider_status: action,
                    email
                }
                const res = await useSecure.patch(`/riders/status/${id}`, data)
                if (res.data.modifiedCount) {
                    refetch()
                    Swal.fire({
                        title: "Accepted!",
                        text: `Rider ${rider.name} has been accepted.`,
                        icon: "success",
                        confirmButtonText: "OK",
                        buttonsStyling: false,
                        customClass: {
                            confirmButton: "bg-green-600 text-base-content px-5 py-2 rounded hover:bg-green-700 font-semibold"
                        },
                    });
                }


            }
        });
    };
    return (
        <Container>
            <div className="overflow-x-auto pt-6 space-y-10 rounded-2xl shadow mt-6">
                <h1 className='text-5xl text-center text-base-content font-extrabold'>Pending Riders</h1>
                <table className="min-w-full bg-base-100 text-base-content">
                    <thead className="bg-base-200 text-left">
                        <tr>
                            <th className="p-4">#</th>
                            <th className="p-4">Name</th>
                            <th className="p-4">Phone</th>
                            <th className="p-4">Email</th>
                            <th className="p-4">Applied Date</th>
                            <th className="p-4">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pendings?.length ? (
                            pendings.map((rider, index) => (
                                <tr key={rider.id || index}>
                                    <td className="p-4">{index + 1}</td>
                                    <td className="p-4">{rider.name}</td>
                                    <td className="p-4">{rider.contact}</td>
                                    <td className="p-4">{rider.email}</td>
                                    <td className="p-4">{rider.applied_date?.split("T")[0]}</td>
                                    <td>
                                        <div className="p-6 flex justify-center items-center gap-2">
                                            <button
                                                className="btn btn-xs bg-blue-500 text-white hover:bg-blue-600"
                                                onClick={() => setSelectedRider(rider)}
                                            >
                                                <FaEye /> View
                                            </button>
                                            <button
                                                className="btn btn-xs bg-green-500 text-white hover:bg-green-600"
                                                onClick={() => handleAccept(rider, rider._id, "active",user?.email)}
                                            >
                                                <FaCheck /> Accept
                                            </button>
                                            <button
                                                className="btn btn-xs bg-red-500 text-white hover:bg-red-600"
                                                onClick={() => handleReject(rider, rider._id, "reject")}
                                            >
                                                <FaTimes /> Reject
                                            </button>
                                        </div>

                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="p-4 text-center text-gray-500">
                                    No pending riders.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>

                {/* Modal for viewing rider details */}
                {selectedRider && (
                    <dialog id="viewRiderModal" className="modal modal-open">
                        <form method="dialog" className="modal-box max-w-lg">
                            <h3 className="font-bold text-lg mb-4">
                                Pending Rider Details: {selectedRider.name}
                            </h3>
                            <div className="space-y-2">
                                <p><strong>Phone:</strong> {selectedRider.contact}</p>
                                <p><strong>Email:</strong> {selectedRider.email}</p>
                                <p><strong>Address:</strong> {selectedRider.warehouse}, {selectedRider.region}</p>
                                <p><strong>Applied Date:</strong> {selectedRider.applied_date?.split("T")[0]}</p>
                                {/* Add more fields if needed */}
                            </div>
                            <div className="modal-action">
                                <button
                                    className="btn btn-primary"
                                    onClick={() => setSelectedRider(null)}
                                >
                                    Close
                                </button>
                            </div>
                        </form>
                    </dialog>
                )}
            </div>
        </Container>

    );
};

export default PendingRiders;