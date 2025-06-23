import React from 'react';
import customerLogo from "../../../assets/customer-top.png"
import SliderSection from './Slider/SliderSection';
import Container from '../../Container/Container';

const Customers = () => {
    return (
        <Container>
            <div className='mb-8 md:mb-10 lg:mb-14 space-y-10'>
                <div className='max-w-[220px] mx-auto'>
                    <img className='w-full' src={customerLogo} alt={customerLogo} />
                </div>
                <div className='text-center'>
                    <h1 className='text-3xl text-base-content md:text-4xl font-extrabold mb-4'>What our customers are sayings</h1>
                    <h1 className='text-lg text-base-300 max-w-[832px] mx-auto'>Enhance posture, mobility, and well-being effortlessly with Posture Pro. Achieve proper alignment, reduce pain, and strengthen your body with ease!</h1>
                </div>
                <SliderSection></SliderSection>
            </div>
        </Container>
    );
};

export default Customers;