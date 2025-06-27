import React from 'react';
import satisfactionImg from "../../../assets/location-merchant.png"
import AOS from 'aos';
import 'aos/dist/aos.css';


const Satisfaction = () => {
    AOS.init({
        duration: 1000,
        once: true,
    });
    return (
        <section className='max-w-[1280px] mx-auto px-2 md:px-3 lg:px-8 my-8 md:my-10 lg:my-14'>
            <div className="bg-secondary bg-[url(assets/be-a-merchant-bg.png)] bg-no-repeat bg-top rounded-3xl flex py-8 md:py-16 lg:py-20 px-4 md:px-12 lg:px-20">
                <div data-aos="fade-left" className="max-w-[670px]">
                    <h2 className="text-4xl text-secondary-content md:text-4xl font-bold mb-4">Merchant and Customer Satisfaction is Our First Priority</h2>
                    <p className="text-lg text-secondary-content max-w-[516px]">
                        We offer the lowest delivery charge with the highest value along with 100% safety of your product. Pathao courier delivers your parcels in every corner of Bangladesh right on time.
                    </p>
                    <div className='flex gap-4 mt-8'>
                        <button className="btn btn-sm md:btn-md btn-outline rounded-full btn-primary">Become a Merchant</button>
                        <button className="btn btn-sm md:btn-md btn-outline rounded-full btn-primary">Earn with Profast Courier</button>
                    </div>
                </div>
                <div data-aos="fade-right" className='max-w-[600px] flex items-center'>
                    <img src={satisfactionImg} alt={satisfactionImg} />
                </div>
            </div>
        </section>

    );
};

export default Satisfaction;