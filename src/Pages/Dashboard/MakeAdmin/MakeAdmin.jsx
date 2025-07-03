import axios from 'axios';
import React, { useState } from 'react';
import { FaSearch, FaUserShield, FaUserTimes } from 'react-icons/fa';
import Container from '../../../Components/Container/Container';
import { RiAdminFill } from "react-icons/ri";
import Swal from 'sweetalert2';
import UseAxiosSecure from '../../../Hooks/UseAxiosSecure/UseAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const MakeAdmin = () => {
    const useSecure = UseAxiosSecure()
    const [email, setEmail] = useState("");
    const [searchEmail, setSearchEmail] = useState("")
    const [user, setUser] = useState(null);
    const [error, setError] = useState("");

    const { refetch } = useQuery({
        queryKey: ["searchUser", searchEmail],
        queryFn: async () => {
            const data = await useSecure.get(`/users/search?email=${searchEmail}`)
            setUser(data.data)
            return data.data
        }
    })
    const handleSearch = () => {
        setError("");
        try {
            setSearchEmail(email)
        } catch (error) {
            setUser(null);
            setError("⚠️User not found or server problem for", error.message);
        }
    };

    const changeRole = (role) => {
        Swal.fire({
            title: "Are you sure?",
            text: `Do you want to make him ${role === "makeAdmin" ? "Admin" : "User"} ?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: `Yes, ${role === "makeAdmin" ? "Admin" : "User"} !`
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await useSecure.patch(`/users/${role}/${user.email}`)
                console.log(res.data)
                if (res.data.modifiedCount) {
                    Swal.fire({
                        title: "Updated!",
                        text: `This user has become ${role === "makeAdmin" ? "Admin" : "User"}.`,
                        icon: "success"
                    });
                    setSearchEmail(user.email)
                    refetch()

                }
            }
        });
    };

    return (
        <Container>
            <div className="max-w-full my-10 p-6 bg-base-200 rounded-xl shadow-lg">
                <h2 className="flex justify-center items-center gap-2 text-2xl font-bold mb-6 text-center text-[red]">
                    <RiAdminFill color='red' /> Admin Management Panel
                </h2>

                <div className="max-w-[600px] mx-auto flex gap-2 mb-4">
                    <input
                        type="text"
                        className="input input-bordered w-full"
                        placeholder="Enter email..."
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <button
                        onClick={handleSearch}
                        className="btn btn-primary">
                        <FaSearch className="mr-2" /> Search
                    </button>
                </div>

                {error && (
                    <div className="alert alert-error shadow-sm mb-4">
                        <span>{error}</span>
                    </div>
                )}

                {user ?
                    (
                        <div className="card bg-base-100 shadow-md border">
                            <div className="card-body p-6 md:p-10 lg:p-20 space-y-2">
                                <div className='flex flex-col gap-3 md:flex-row justify-between items-center'>
                                    <div className="space-y-4">
                                        <h3 className="text-lg font-semibold text-neutral">
                                            👤 User Information
                                        </h3>
                                        <p>
                                            <span className="font-medium">Email:</span> {user.email}
                                        </p>
                                        <p>
                                            <span className="font-medium">Created:</span>{" "}
                                            {new Date(user.created_at).toLocaleString()}
                                        </p>
                                        <p>
                                            <span className="font-medium">Role:</span>{" "}
                                            <span
                                                className={`badge ${user.role === "admin" ? "badge-success" : "badge-neutral"
                                                    }`}
                                            >
                                                {user.role}
                                            </span>
                                        </p>
                                    </div>
                                    <div className='w-[200px] rounded-lg border-2 border-base-content'>
                                        <img className='w-full' src={user.photo} alt={user.photo} />
                                    </div>
                                </div>


                                <div className="mt-4">
                                    {user.role !== "admin" ? (
                                        <button
                                            onClick={() => changeRole("makeAdmin")}
                                            className="btn btn-success w-full flex items-center gap-2"
                                        >
                                            <FaUserShield />
                                            Make Admin
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => changeRole("renoveAdmin")}
                                            className="btn btn-error w-full flex items-center gap-2"
                                        >
                                            <FaUserTimes />
                                            Remove Admin
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    )
                    :
                    <div className='text-center flex justify-center'>
                        <p className="alert alert-error text-base-content text-lg shadow-sm mb-4">
                            ⚠️User not found
                        </p>
                    </div>
                }
            </div>
        </Container>

    );
};

export default MakeAdmin;