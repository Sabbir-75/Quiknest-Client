import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Container from '../../Components/Container/Container';
import { useLoaderData } from 'react-router';
import Swal from 'sweetalert2';
import { useAuth } from '../../Hooks/UseAuth/UseAuth';
import UseAxiosSecure from '../../Hooks/UseAxiosSecure/UseAxiosSecure';

function generateTrackingIdFromDate() {
    const base = new Date().toISOString().replace(/[-:.TZ]/g, '').slice(0, 17);
    const rand = Math.floor(Math.random() * 1000); // 0–999
    return `TRK-${base}${rand}`;
}

const AddParcel = () => {
    const allData = useLoaderData()
    const { user } = useAuth()
    const useSecure = UseAxiosSecure()

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const type = watch('type');
    const weight = watch('weight');
    const senderService = watch('senderService');
    const receiverService = watch('receiverService');

    const [cost, setCost] = useState(0);
    const selectedSenderRegion = watch("senderRegion");
    const selectedReceiverRegion = watch("receiverRegion");

    // 🔹 Step 1: Get unique regions
    const uniqueRegions = [...new Set(allData.map(item => item.region))];

    // 🔹 Step 2: Filter service centers based on selected region
    const filteredSenderCenters = allData.filter(item => item.region === selectedSenderRegion);
    const filteredReceiverCenters = allData.filter(item => item.region === selectedReceiverRegion);

    const [extraTk, setExtraTk] = useState(0)
    const [extraKg, setExtraKg] = useState(0)
    const [state, setState] = useState(0)
    useEffect(() => {
        if (!type) return;

        const isOutside = senderService !== receiverService;
        setState(isOutside)
        if (type === 'document') {
            setCost(isOutside ? 80 : 60);
        }
        else if (type === 'non-document') {
            const w = parseFloat(weight || 0);
            if (w <= 3) {
                setCost(isOutside ? 150 : 110);
            }
            else {
                const extrakg = w - 3
                setExtraKg(extrakg)
                const extra = extrakg * 40;
                setExtraTk(extra)
                // setCost((isOutside ? 150 : 110) + extra + (isOutside ? 40 : 0));
                setCost((isOutside ? 150 : 110) + (isOutside ? 40 + extra : extra));
            }
        }
    }, [type, weight, senderService, receiverService]);

    const onSubmit = (data) => {

        Swal.fire({
            title: "Delivery Cost Breakdown",
            html: `
      <b>Parcel Type:</b> ${type}<br>
      <b>Weight:</b> ${weight} kg<br>
      <b>Delivery Zone:</b> ${selectedReceiverRegion}<br>
      <b>Base Price:</b> ${!state ? (type === "document" ? 60 : 110) : (type === "document" ? 80 : 150)} Tk<br>
      ${extraTk > 0 ? `<b>Extra Charge:</b> ${extraTk}Tk for extra (${extraKg})kg + 40 Tk<br>` : ''}
      <hr>
      <b style="color:green;font-size:1em;">Total: ${cost} Tk</b>
    `,
            icon: "info",
            showCancelButton: true,
            confirmButtonText: "✅ Proceed to Payment",
            cancelButtonText: "✏️ Continue Editing",
            confirmButtonColor: "green",
            cancelButtonColor: "#fbbf24",
        }).then((result) => {
            if (result.isConfirmed) {
                const finalData = {
                    ...data, // all form inputs
                    cost: cost,
                    created_by: user?.email,
                    creation_date: new Date().toISOString(),
                    payment_status: "unpaid",
                    delivery_status: "pending",
                    tracking_id: generateTrackingIdFromDate()
                };

                useSecure.post("/parcels", finalData)
                    .then(data => {
                        if (data.data.insertedId) {
                            Swal.fire({
                                icon: "success",
                                title: "Readirecting...",
                                text:"Processing to payment gateway.",
                                showConfirmButton: false,
                                timer: 1500
                            });
                        }
                    })


            }
        });

    };

    return (
        <Container>
            <div className='bg-base-100 my-3 md:my-6 lg:my-8 rounded-3xl py-4 md:py-10 lg:py-16 px-4 md:px-12 lg:px-20'>
                <h1 className='text-6xl font-extrabold text-base-content mb-3 md:mb-8 lg:mb-12'>Add Parcel</h1>
                <form onSubmit={handleSubmit(onSubmit)} className=" space-y-6">

                    {/* 1. Parcel Info */}
                    <div className="space-y-4 border p-4 rounded-lg shadow">
                        <h2 className="text-lg text-base-content font-semibold">📦 Parcel Info</h2>

                        <select {...register('type', { required: true })} className="select select-bordered w-full">
                            <option value="">Select Parcel Type</option>
                            <option value="document">Document</option>
                            <option value="non-document">Non-Document</option>
                        </select>
                        {errors.type && <p className="text-red-500 text-sm">Type is required</p>}

                        <input {...register('name', { required: true })} className="input input-bordered w-full" placeholder="Parcel Name" />
                        {errors.name && <p className="text-red-500 text-sm">Name is required</p>}

                        {type === 'non-document' && (
                            <input
                                type="number"
                                step="0.1"
                                min={0}
                                {...register('weight')}
                                onWheel={(e) => e.target.blur()}
                                className="input input-bordered w-full"
                                placeholder="Weight in kg"
                            />
                        )}
                    </div>

                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-1'>
                        {/* 2. Sender Info */}
                        <div className="space-y-4 border p-4 rounded-lg shadow">
                            <h2 className="text-lg text-shadow-base-100 font-semibold">📤 Sender Info</h2>

                            <div className="flex flex-col md:flex-col lg:flex-row gap-4">
                                <input type='text' {...register('senderName', { required: true })} className="input input-bordered w-full" placeholder="Sender Name" />
                                <input type='number' {...register('senderContact', { required: true })} className="input input-bordered w-full" placeholder="Contact" />
                            </div>

                            <div className="flex flex-col md:flex-col lg:flex-row gap-4">
                                {/* 🔸 REGION SELECT */}
                                <select
                                    {...register("senderRegion", { required: true })}
                                    className="select select-bordered w-full"
                                >
                                    <option value="">Select Region</option>
                                    {uniqueRegions.map((region, index) => (
                                        <option key={index} value={region}>
                                            {region}
                                        </option>
                                    ))}
                                </select>

                                {/* 🔸 SERVICE CENTER SELECT */}
                                <select
                                    {...register("senderService", { required: true })}
                                    className="select select-bordered w-full"
                                >
                                    <option value="">Select Service Center</option>
                                    {filteredSenderCenters.map((item, index) => (
                                        <option key={index} value={item.city}>
                                            {item.city} ({item.district})
                                        </option>
                                    ))}
                                </select>
                            </div>


                            <input {...register('senderAddress', { required: true })} className="input input-bordered w-full" placeholder="Address" />
                            <input {...register('pickupInstruction', { required: true })} className="input input-bordered w-full" placeholder="Pick-up Instruction" />
                        </div>

                        {/* 3. Receiver Info */}
                        <div className="space-y-4 border p-4 rounded-lg shadow">
                            <h2 className="text-lg text-shadow-base-100 font-semibold">📥 Receiver Info</h2>

                            <div className="flex flex-col md:flex-col lg:flex-row gap-4">
                                <input type='text' {...register('receiverName', { required: true })} className="input input-bordered w-full" placeholder="Receiver Name" />
                                <input type='number' {...register('receiverContact', { required: true })} className="input input-bordered w-full" placeholder="Contact" />
                            </div>


                            <div className="flex flex-col md:flex-col lg:flex-row gap-4">
                                {/* 🔸 REGION SELECT */}
                                <select
                                    {...register("receiverRegion", { required: true })}
                                    className="select select-bordered w-full"
                                >
                                    <option value="">Select Region</option>
                                    {uniqueRegions.map((region, index) => (
                                        <option key={index} value={region}>
                                            {region}
                                        </option>
                                    ))}
                                </select>

                                {/* 🔸 SERVICE CENTER SELECT */}
                                <select
                                    {...register("receiverService", { required: true })}
                                    className="select select-bordered w-full"
                                >
                                    <option value="">Select Service Center</option>
                                    {filteredReceiverCenters.map((item, index) => (
                                        <option key={index} value={item.city}>
                                            {item.city} ({item.district})
                                        </option>
                                    ))}
                                </select>
                            </div>


                            <input {...register('receiverAddress', { required: true })} className="input input-bordered w-full" placeholder="Address" />
                            <input {...register('deliveryInstruction', { required: true })} className="input input-bordered w-full" placeholder="Delivery Instruction" />
                        </div>
                    </div>

                    <div className='flex items-center justify-between'>
                        {/* picup time */}
                        <div className="text-xl font-semibold">
                            * PickUp Time 4pm-7pm Approx.
                        </div>
                        {/* Cost */}
                        <div className="text-xl font-semibold">
                            Total Cost: ৳{cost}
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button type="submit" className="btn btn-primary w-full">
                        Submit Parcel
                    </button>
                </form>
            </div>
        </Container>

    );
};

export default AddParcel;