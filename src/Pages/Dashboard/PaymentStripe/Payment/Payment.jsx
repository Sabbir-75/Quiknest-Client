import { Elements } from '@stripe/react-stripe-js';
import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from '../CheckoutForm/CheckoutForm';

const stripePromise = loadStripe(import.meta.env.VITE_PUBLIC_KEY_STRIPE)

const Payment = () => {
  return (
    <div className='mt-3 md:mt-6 lg:mt-10'>
      <Elements stripe={stripePromise}>
        <CheckoutForm></CheckoutForm>
      </Elements>
    </div>

  );
};

export default Payment;