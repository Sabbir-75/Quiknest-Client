import React from 'react';
import Container from '../Container/Container';

const Services = () => {
    const services = [
        {
            icon: "https://i.ibb.co/gb5Ydcpt/images.png",
            title: "Express & Standard Delivery",
            description:
                "We deliver parcels within 24–72 hours in Dhaka, Chittagong, Sylhet, Khulna, and Rajshahi. Express delivery available in Dhaka within 4–6 hours from pick-up to drop-off.",
        },
        {
            icon: "https://i.ibb.co/jZWwLHQf/delivery-service-203633-734.jpg",
            title: "Nationwide Delivery",
            description:
                "We deliver parcels nationwide with home delivery in every district, ensuring your products reach customers within 48–72 hours.",
        },
        {
            icon: "https://i.ibb.co/XktnGJN9/istockphoto-814041588-612x612-removebg-preview.png",
            title: "Fulfillment Solution",
            description:
                "We also offer customized service with inventory management support, online order processing, packaging, and after sales support.",
        },
        {
            icon: "https://i.ibb.co/M5cvxtCG/cash-delivery-569841-175.jpg",
            title: "Cash on Home Delivery",
            description:
                "100% cash on delivery anywhere in Bangladesh with guaranteed safety of your product.",
        },
        {
            icon: "https://i.ibb.co/PZsjfDPf/png-transparent-supply-chain-management-logistics-supply-chain-management-software-business-process.png",
            title: "Corporate Service / Contract In Logistics",
            description:
                "Customized corporate services which includes warehouse and inventory management support.",
        },
        {
            icon: "https://i.ibb.co/ycN9hKsk/10960572-removebg-preview.png",
            title: "Parcel Return",
            description:
                "Through our reverse logistics facility we allow end customers to return or exchange their products with online business merchants.",
        },
    ];
    return (
        <Container>
            <section className="bg-secondary rounded-3xl py-8 md:py-16 lg:py-22 px-4 md:px-12 lg:px-20">
                <div className="max-w-7xl mx-auto text-center text-secondary-content mb-12">
                    <h2 className="text-4xl md:text-4xl font-bold mb-4">Our Services</h2>
                    <p className="text-lg max-w-3xl mx-auto">
                        Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle.
                        From personal packages to business shipments — we deliver on time, every time.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                    {services.map((service, index) => (
                        <div
                            key={index}
                            className="hover:bg-primary group bg-base-100 rounded-2xl p-6 shadow-md hover:shadow-lg duration-300 "
                        >
                            <div className="w-[108px] h-[108px] mx-auto mb-4 flex justify-center items-center">
                               <img className=' rounded-full' src={service.icon} alt={service.icon} />
                            </div>
                            <h3 className="text-2xl font-bold text-center text-base-content mb-3">{service.title}</h3>
                            <p className="text-base text-base-300 text-center">{service.description}</p>
                        </div>
                    ))}
                </div>
            </section>
        </Container>
    );
};

export default Services;