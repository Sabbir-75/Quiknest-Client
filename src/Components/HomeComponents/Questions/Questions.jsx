import React from 'react';

const Questions = () => {
    return (
        <div className='max-w-[1000px] mx-auto px-2 md:px-3 lg:px-8 my-8 md:my-10 lg:my-14'>
            <div className='text-center mb-8'>
                <h1 className='text-3xl text-base-content md:text-4xl font-extrabold mb-4'>Frequently Asked Question (FAQ)</h1>
                <h1 className='text-lg text-base-300 max-w-[832px] mx-auto'>Find quick answers to the most common questions our users ask. If you don't find what you're looking for, feel free to reach out — we’re here to help!</h1>
            </div>
            <div className="join join-vertical w-full space-y-2 bg-base-100">
                <div className="collapse collapse-arrow join-item border-base-300 border">
                    <input type="radio" name="my-accordion-4" defaultChecked />
                    <div className={`collapse-title font-semibold bg-info`}>How do I create an account?</div>
                    <div className="collapse-content text-sm bg-info">Click the "Sign Up" button in the top right corner and follow the registration process.</div>
                </div>
                <div className="collapse collapse-arrow join-item border-base-300 border">
                    <input type="radio" name="my-accordion-4" />
                    <div className="collapse-title font-semibold bg-info">I forgot my password. What should I do?</div>
                    <div className="collapse-content text-sm bg-info">Click on "Forgot Password" on the login page and follow the instructions sent to your email.</div>
                </div>
                <div className="collapse collapse-arrow join-item border-base-300 border">
                    <input type="radio" name="my-accordion-4" />
                    <div className="collapse-title font-semibold bg-info">How do I update my profile information?</div>
                    <div className="collapse-content text-sm bg-info">Go to "My Account" settings and select "Edit Profile" to make changes.</div>
                </div>
            </div>
        </div>
    );
};

export default Questions;