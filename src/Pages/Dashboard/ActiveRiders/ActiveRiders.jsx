import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { MdBlock } from 'react-icons/md';
import { FaEye } from 'react-icons/fa';
import { useAuth } from '../../../Hooks/UseAuth/UseAuth';
import UseAxiosSecure from '../../../Hooks/UseAxiosSecure/UseAxiosSecure';
import Swal from 'sweetalert2';
import Container from '../../../Components/Container/Container';
import { IoSearch } from 'react-icons/io5';


const ActiveRiders = () => {
    const [searchTerm, setSearchTerm] = useState("")
    const [selectSearch, setSelectSearch] = useState("")
    const { user } = useAuth()
    const [selectedRider, setSelectedRider] = useState(null);
    const useSecure = UseAxiosSecure()


    const { data: active = {}, refetch } = useQuery({
        queryKey: ["active", user?.email, selectSearch, searchTerm],
        queryFn: async () => {
            const data = await useSecure.get(`/active/riders?search=${selectSearch}&typing=${searchTerm}`);
            return data.data
        }
    })

    const handleSearch = () => {
        setSelectSearch(searchTerm)
    }


    const handleDeactivate = (rider, id, action) => {
        Swal.fire({
            title: `Deactivate rider "${rider.name}"?`,
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Deactivate",
            cancelButtonText: "Cancel",
            confirmButtonColor: "#16a34a", // green
        }).then(async (result) => {
            if (result.isConfirmed) {
                const data = {
                    rider_status: action,
                    feedback: "You have been completely deactivated."
                }
                const res = await useSecure.patch(`/riders/status/${id}`, data)
                if (res.data.modifiedCount) {
                    refetch()
                    Swal.fire({
                        title: "Deactivate!",
                        text: `Rider ${rider.name} has been Deactivated.`,
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
    }
    return (
        <Container>
            <div className="overflow-x-auto pt-6 space-y-10 rounded-2xl shadow mt-6">
                <h1 className='text-5xl text-center text-base-content font-extrabold'>Active Riders</h1>

                {/* search */}

                <div className="flex items-center justify-center mb-6 md:mb-12 lg:mb-20">
                    <div className="flex items-center w-full max-w-md bg-gray-100 rounded-l-full px-4 py-2 shadow-sm">
                        <IoSearch className="text-2xl text-black mr-3" />
                        <input
                            type="number"
                            className="bg-transparent focus:outline-none w-full text-base-300 placeholder-base-300"
                            placeholder="Search Phone..."
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <button
                        className="bg-primary text-primary-content font-semibold px-4 py-[8px] rounded-r-full shadow-sm"
                        onClick={handleSearch}
                    >
                        Search
                    </button>
                </div>
                <table className="min-w-full bg-base-100 text-base-content">
                    <thead className="bg-base-200 text-left">
                        <tr>
                            <th className="p-4">#</th>
                            <th className="p-4">Name</th>
                            <th className="p-4">Phone</th>
                            <th className="p-4">Email</th>
                            <th className="p-4">Status</th>
                            <th className="p-4">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {active?.length ? (
                            active.map((rider, index) => (
                                <tr key={rider.id || index}>
                                    <td className="p-4">{index + 1}</td>
                                    <td className="p-4">{rider.name}</td>
                                    <td className="p-4">{rider.contact}</td>
                                    <td className="p-4">{rider.email}</td>
                                    {
                                        rider.rider_status === "active" && <td className="p-4 text-center"><p className='px-2 py-1 rounded-sm bg-green-800 text-white'>Active</p></td>
                                    }

                                    <td>
                                        <div className="p-4 flex justify-center items-center gap-2">
                                            <button
                                                className="btn btn-xs bg-blue-500 text-white hover:bg-blue-600"
                                                onClick={() => setSelectedRider(rider)}
                                            >
                                                <FaEye /> View
                                            </button>
                                            <button
                                                className="btn btn-xs bg-red-500 text-white hover:bg-red-600"
                                                onClick={() => handleDeactivate(rider, rider._id, "deactive")}
                                            >
                                                <MdBlock /> Deactivate
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

export default ActiveRiders;