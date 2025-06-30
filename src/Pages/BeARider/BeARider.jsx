import React from 'react';
import Container from '../../Components/Container/Container';
import { useForm } from 'react-hook-form';
import riderImage from "../../../src/assets/agent-pending.png"
import { useLoaderData } from 'react-router';
import { useAuth } from '../../Hooks/UseAuth/UseAuth';
import UseAxiosSecure from '../../Hooks/UseAxiosSecure/UseAxiosSecure';
import Swal from 'sweetalert2';

const BeARider = () => {
    const { register, handleSubmit, reset, formState: { errors }, watch } = useForm()
    const allDAta = useLoaderData()
    const { user } = useAuth()
    const useSecure = UseAxiosSecure()

    // regeion and city select 
    const regionSelect = watch("region");
    const allRegions = [...new Set(allDAta.map(data => data.region))]
    const allWereHouse = allDAta.filter(data => data.region === regionSelect)


    const onSubmit = async (data, e) => {
        const name = e.target.name.value
        const email = e.target.email.value
        const ridersData = {
            ...data,
            name,
            email,
            rider_status: "pending",
            applied_date: new Date().toISOString()
        }
        const res = await useSecure.post("/riders", ridersData)
        if (res.data.insertedId) {
            reset()
            Swal.fire({
                icon: "success",
                title: "Your work has been saved",
                showConfirmButton: false,
                timer: 1500
            });
        }
    }
    return (
        <Container>
            <div className='bg-base-100 my-3 md:my-6 lg:my-8 rounded-3xl py-4 md:py-10 lg:py-16 px-4 md:px-12 lg:px-20'>
                <div className='max-w-[630px] space-y-4 mb-12'>
                    <h1 className='text-6xl font-extrabold text-base-content'>Be a Rider</h1>
                    <p className='text-base font-medium text-base-300'>Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to business shipments — we deliver on time, every time.</p>
                </div>
                <div className='pt-12 mb-2 border-t-2 border-base-300'>
                    <h1 className='text-3xl font-bold text-base-content'>Tell us about yourself</h1>
                </div>

                <section className="flex flex-col md:flex-row items-center justify-center min-h-screen p-4">
                    {/* Left - Form */}
                    <div className="w-full md:w-1/2">
                        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                            <div>
                                <label className="font-medium">Your Name</label>
                                <input value={user?.displayName}
                                    name='name'
                                    className="w-full border p-2 rounded"
                                />
                            </div>

                            <div>
                                <label className="font-medium">Your Age</label>
                                <input
                                    type="number"
                                    {...register("age", { required: true, min: 18, max: 60 })}
                                    className="w-full border p-2 rounded"
                                />
                                {errors.age?.type === "required" && <p className="text-red-500">Age is required</p>}
                                {errors.age?.type === "min" && <p className="text-red-500">Age min 18</p>}
                                {errors.age?.type === "max" && <p className="text-red-500">Age max 60</p>}
                            </div>

                            <div>
                                <label className="font-medium">Your Email</label>
                                <input
                                    value={user?.email}
                                    name='email'
                                    type="email"
                                    className="w-full border p-2 rounded"
                                />
                            </div>

                            <div>
                                <label className="font-medium">Your Region</label>
                                <select
                                    {...register("region", { required: true })}
                                    className="w-full border p-2 rounded"
                                >
                                    <option value="">Select Region</option>
                                    {
                                        allRegions.map(singleRegion =>
                                            <option value={singleRegion} key={singleRegion}>{singleRegion}</option>)
                                    }

                                </select>
                                {(errors.region?.type === "required") && <p className="text-red-500">Warehouse is required</p>}
                            </div>

                            <div className="lg:col-span-2">
                                <label className="font-medium">Which Warehouse You Want to Work?</label>
                                <select
                                    {...register("warehouse", { required: true })}
                                    className="w-full border p-2 rounded"
                                >
                                    <option value="">Select Warehouse</option>
                                    {
                                        allWereHouse.map(wereHouses =>
                                            <option value={wereHouses.city} key={wereHouses.city}>{wereHouses.city}({wereHouses.city})</option>)
                                    }
                                </select>
                                {(errors.warehouse?.type === "required") && <p className="text-red-500">Warehouse is required</p>}
                            </div>

                            <div>
                                <label className="font-medium">NID No</label>
                                <input
                                    {...register("nid", { required: true })}
                                    className="w-full border p-2 rounded"
                                />
                                {errors.nid && <p className="text-red-500">NID is required</p>}
                            </div>

                            <div>
                                <label className="font-medium">Contact</label>
                                <input
                                    {...register("contact", { required: true })}
                                    className="w-full border p-2 rounded"
                                />
                                {errors.contact && <p className="text-red-500">Contact is required</p>}
                            </div>

                            {/* New input: Preferred Vehicle */}
                            <div>
                                <label className="font-medium">Preferred Vehicle Type</label>
                                <select
                                    {...register("vehicle", { required: true })}
                                    className="w-full border p-2 rounded"
                                >
                                    <option value="">Select Vehicle</option>
                                    <option value="Bicycle">Bicycle</option>
                                    <option value="Motorbike">Motorbike</option>
                                    <option value="Car">Car</option>
                                </select>
                                {errors.vehicle && <p className="text-red-500">Vehicle type is required</p>}
                            </div>

                            {/* New input: Experience Level */}
                            <div>
                                <label className="font-medium">Experience Level (years)</label>
                                <input
                                    type="number"
                                    {...register("experience", { required: true })}
                                    className="w-full border p-2 rounded"
                                />
                                {errors.experience && <p className="text-red-500">Experience is required</p>}
                            </div>

                            <button
                                type="submit"
                                className="lg:col-span-2 bg-primary text-primary-content py-3 rounded font-semibold text-lg mt-2"
                            >
                                Submit Rider Application
                            </button>
                        </form>
                    </div>

                    {/* Right - Image */}
                    <div className="w-full md:w-1/2 flex justify-center mt-8 md:mt-0 md:ml-8">
                        <img
                            src={riderImage}
                            alt={riderImage}
                            className="max-h-[550px] object-cover"
                        />
                    </div>
                </section>
            </div>
        </Container>
    );
};

export default BeARider;