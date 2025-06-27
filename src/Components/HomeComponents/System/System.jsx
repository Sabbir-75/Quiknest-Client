import React from 'react';
import system1 from "../../../assets/live-tracking.png"
import system2 from "../../../assets/safe-delivery.png"
import system3 from "../../../assets/callcenter.png"

const System = () => {
    return (
        <div>
            <section className="max-w-[1280px] mx-auto px-2 md:px-3 lg:px-8 my-8 md:my-10 lg:my-14">
                <div className="space-y-4">
                   
                    <div className="flex shadow-sm shadow-base-300 rounded-xl bg-base-100 p-4">
                        <div className="flex flex-col md:flex-row items-center gap-4 pb-4">
                            <div className="w-[200px] h-[200px] flex-shrink-0 border-r-2 pr-6 border-dashed">
                                <img src={system1} alt="Live Tracking" className="w-full h-full object-contain" />
                            </div>
                            <div className='ml-6'>
                                <h3 className="text-2xl font-extrabold text-base-content">Live Parcel Tracking</h3>
                                <p className="text-base mt-4 font-medium text-base-300">Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment's journey and get instant status updates for complete peace of mind.</p>
                            </div>
                        </div>
                    </div>

                    
                    <div className="flex shadow-sm shadow-base-300 rounded-xl bg-base-100 p-4">
                        <div className="flex flex-col md:flex-row items-center gap-4 pb-4">
                            <div className="w-[200px] h-[200px] flex-shrink-0 border-r-2 pr-6 border-dashed">
                                <img src={system2} alt="Safe Delivery" className="w-full h-full object-contain" />
                            </div>
                
                            <div className='ml-6'>
                                <h3 className="text-2xl font-extrabold text-base-content">100% Safe Delivery</h3>
                                <p className="ext-base mt-4 font-medium text-base-300">We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time.</p>
                            </div>
                        </div>
                    </div>

                  
                    <div className="flex shadow-sm shadow-base-300 rounded-xl bg-base-100 p-4">
                        <div className="flex flex-col md:flex-row items-center gap-4 pb-4">
                            <div className="w-[200px] h-[200px] flex-shrink-0 border-r-2 pr-6 border-dashed">
                                <img src={system3} alt="24/7 Support" className="w-full h-full object-contain" />
                            </div>
                            <div className='ml-6'>
                                <h3 className="text-2xl font-extrabold text-base-content">24/7 Call Center Support</h3>
                                <p className="ext-base mt-4 font-medium text-base-300">Our dedicated support team is available around the clock to assist you with any questions, updates, or delivery concerns—anytime you need us.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default System;