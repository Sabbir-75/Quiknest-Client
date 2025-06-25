import React from 'react';
import Arrow from '../../Arrow/Arrow';

const Questions = () => {
    const faqData = [
        {
            id: 1,
            question: "What is Quiknest?",
            answer: "Quiknest is an online platform where users can buy and sell various products, post ads, and access local services like delivery, repair, and more — all in one place."
        },
        {
            id: 2,
            question: "How do I post a product or service on Quiknest?",
            answer: "To post an ad, simply sign in to your account, go to the 'Post Ad' section, fill in your product or service details, and submit. Your post will be live after a quick review."
        },
        {
            id: 3,
            question: "Is it free to use Quiknest?",
            answer: "Yes! Browsing and posting ads on Quiknest is free. However, we offer optional premium features such as ad boosting and top placements for better visibility."
        },
        {
            id: 4,
            question: "How can I trust a seller or buyer on the platform?",
            answer: "We recommend checking user ratings, reviews, and verified badges before making a deal. Always communicate through our platform for safety and avoid making payments outside Quiknest."
        },
        {
            id: 5,
            question: "Can I edit or remove my ad after posting?",
            answer: "Yes, you can edit or delete your ad anytime by logging into your account and going to the 'My Ads' section. You’ll have full control over your listings."
        }
    ];

    return (
        <div className='max-w-[1000px] mx-auto px-2 md:px-3 lg:px-8 my-8 md:my-10 lg:my-14'>
            <div className='text-center mb-8'>
                <h1 className='text-3xl text-base-content md:text-4xl font-extrabold mb-4'>Frequently Asked Question (FAQ)</h1>
                <h1 className='text-lg text-base-300 max-w-[832px] mx-auto'>Find quick answers to the most common questions our users ask. If you don't find what you're looking for, feel free to reach out — we’re here to help!</h1>
            </div>
            <div className="join join-vertical w-full space-y-2 bg-base-100">
                {
                    faqData.map(data => <div key={data.id} className="collapse collapse-arrow join-item border-base-300 border">
                    <input type="radio" name="my-accordion-4" defaultChecked />
                    <div className={`collapse-title font-semibold bg-info`}>{data.question}</div>
                    <div className="collapse-content text-sm bg-info">{data.answer}</div>
                </div>)
                }
            </div>
        </div>
    );
};

export default Questions;