import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { FaUserCheck } from "react-icons/fa";
import Swal from "sweetalert2";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure/UseAxiosSecure";

const AssignRider = () => {
    const useSecure = UseAxiosSecure()
    const queryClient = useQueryClient();
    const [district, setDistrict] = useState(null);
    const [parceId, setParcelId] = useState(null)

    // 1. Fetch Parcels with paid & pending status
    const { data: parcels = [], isLoading } = useQuery({
        queryKey: ["assignableParcels", "pending", "paid", "delivery_status", "payment_status"],
        queryFn: async () => {
            const res = await useSecure.get("/riders/assign?payment_status=paid&delivery_status=pending");
            return res.data;
        },
    });

    const { data: districyData = [], isLoading: isRidersLoading } = useQuery({
        queryKey: ["senderName", district],
        queryFn: async () => {
            const data = await useSecure.get(`/riders/dist/${district}`)
            return data.data
        }
    })

    const modalHandler = (senderDistrict,id) => {
        setDistrict(senderDistrict)
        setParcelId(id)
    }

    // 2. Assign Rider Mutation
    const { mutateAsync: assignRider } = useMutation({
        mutationFn: async ({ parcelId, rider }) => {
            const res = await useSecure.patch(`/riders/parcels/${parcelId}/assign`, {
                riderId: rider._id,
                riderName: rider.name,
                riderContact:rider.contact,
                riderEmail: rider.email

            });
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["assignableParcels"]);
            Swal.fire("Success", "Rider assigned successfully!", "success");
            document.getElementById("assignModal").close();
        },
        onError: () => {
            Swal.fire("Error", "Failed to assign rider", "error");
        },
    });


    return (
        <div className="p-5">
            <h1 className='text-center py-3 md:py-6 lg:py-10 text-4xl font-extrabold text-base-content'>Assign Riders</h1>

            {isLoading ? (
                <p>Loading parcels...</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="table table-zebra w-full">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Customer</th>
                                <th>From</th>
                                <th>To</th>
                                <th>Payment</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {parcels.map((parcel, index) => (
                                <tr key={parcel._id}>
                                    <td>{index + 1}</td>
                                    <td>{parcel.senderName}</td>
                                    <td>{parcel.senderService}</td>
                                    <td>{parcel.receiverService}</td>
                                    <td>{parcel.payment_status}</td>
                                    <td>{parcel.delivery_status}</td>
                                    <td>
                                        <button
                                            onClick={() => {
                                                modalHandler(parcel.senderService,parcel._id);
                                                document.getElementById("assignModal").showModal();
                                            }}
                                            className="btn btn-success btn-sm flex items-center gap-1"
                                        >
                                            <FaUserCheck /> Assign Rider
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Modal */}
            <dialog id="assignModal" className="modal">
                <div className="modal-box w-11/12 max-w-3xl">
                    <h3 className="font-bold text-2lg text-base-content">Assign Rider</h3>

                    {isRidersLoading ? (
                        <p>Loading riders...</p>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="table table-sm">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {districyData.map((rider, idx) => (
                                        <tr key={rider._id}>
                                            <td>{idx + 1}</td>
                                            <td>{rider.name}</td>
                                            <td>{rider.email}</td>
                                            <td>{rider.rider_status}</td>
                                            <td>
                                                <button
                                                    className="btn btn-sm btn-success"
                                                    onClick={() =>
                                                        assignRider({
                                                            parcelId: parceId,
                                                            rider: rider,
                                                        })
                                                    }
                                                >
                                                    Assign
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    <div className="modal-action">
                        <form method="dialog">
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default AssignRider;