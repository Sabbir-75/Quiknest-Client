import React, { useRef, useState } from 'react';
import Slider from 'react-slick';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import "./SliderSection.css"
import review from "../../../assets/reviewQuote.png"

// Sample cards data
const cards = [
    {
        id: 1,
        name: 'Awlad Hossain',
        title: 'Senior Product Designer',
        description: 'Working with this team has been a fantastic experience. Their attention to detail and creative approach make every project successful.',
        image: 'https://randomuser.me/api/portraits/men/32.jpg',
    },
    {
        id: 2,
        name: 'Sarah Jahan',
        title: 'UI/UX Researcher',
        description: 'The depth of user research and empathy in design exceeded my expectations. Highly professional and inspiring.',
        image: 'https://randomuser.me/api/portraits/women/68.jpg',
    },
    {
        id: 3,
        name: 'Jahidul Karim',
        title: 'Frontend Engineer',
        description: 'Their UI implementation is pixel-perfect and performance-optimized. It’s always a pleasure collaborating with this team.',
        image: 'https://randomuser.me/api/portraits/men/85.jpg',
    },
    {
        id: 4,
        name: 'Maya Akter',
        title: 'Visual Designer',
        description: 'Creative, consistent, and always aligned with the brand’s vision — Maya’s design sense is outstanding.',
        image: 'https://randomuser.me/api/portraits/women/45.jpg',
    },
    {
        id: 5,
        name: 'Tanvir Rahman',
        title: 'Product Manager',
        description: 'Strategic planning, clear communication, and efficient delivery — Tanvir ensures the product moves forward flawlessly.',
        image: 'https://randomuser.me/api/portraits/men/51.jpg',
    },
    {
        id: 6,
        name: 'Nusrat Jahan',
        title: 'Marketing Strategist',
        description: 'The team blends creative design with strong business goals. I was amazed by how well they understood the target audience.',
        image: 'https://randomuser.me/api/portraits/women/75.jpg',
    },
];


// Bottom arrow button components
const NextButton = ({ onClick }) => (
    <button onClick={onClick} className="bg-white hover:bg-primary duration-300 p-2 -mt-1 cursor-pointer z-10 rounded-full shadow mx-2">
        <FaArrowRight />
    </button>
);

const PrevButton = ({ onClick }) => (
    <button onClick={onClick} className="bg-white hover:bg-primary duration-300 p-2 -mt-1 cursor-pointer z-10 rounded-full shadow mx-2">
        <FaArrowLeft />
    </button>
);

const SliderSection = () => {
    const sliderRef = useRef(null);
    const [activeSlide, setActiveSlide] = useState(0);

    const settings = {
        centerMode: true,
        centerPadding: '0px',
        slidesToShow: 3,
        autoplay: true,
        autoplaySpeed: 3000,
        dots: true,
        beforeChange: (current, next) => setActiveSlide(next),
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    arrows: false,
                    centerMode: true,
                    centerPadding: '0px',
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    arrows: false,
                    centerMode: true,
                    centerPadding: '0px',
                    slidesToShow: 1,
                },
            },
        ],
    };

    return (
        <div className="max-w-[1000px] mx-auto pb-10">
            <Slider {...settings} ref={sliderRef}>
                {
                    cards.map((card, index) => {
                        const isActive = index === activeSlide;
                        const isSide = Math.abs(index - activeSlide) === 1;

                        return (
                            <div key={card.id} className="p-2 transition-opacity duration-300">
                                <div
                                    className={`rounded-xl shadow p-6 max-w-[410px] h-full mb-10 text-white text-center transition-all duration-300 ${isActive
                                        ? 'bg-base-100 opacity-100'
                                        : isSide
                                            ? 'bg-base-100 opacity-50 translate-y-6'
                                            : 'bg-base-100 opacity-30 translate-y-6'
                                        }`}>
                                    <img src={review} alt={review} />
                                    <p className="text-base-300 text-start mb-6">{card.description}</p>
                                    <div className="flex gap-3 items-center border-t-2 border-dashed border-base-content pt-4">
                                        <img src={card.image} className="object-cover w-12 h-12 rounded-full shadow dark:bg-gray-500" />
                                        <div className='text-start'>
                                            <h1 className="text-xl font-extrabold text-base-content">{card.name}</h1>
                                            <h1 className="text-base font-medium text-base-300">{card.title}</h1>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    }
                    )}
            </Slider>

            {/* ✅ Bottom navigation buttons */}
            <div className="flex justify-center gap-50 items-center">
                <PrevButton onClick={() => sliderRef.current?.slickPrev()} />
                <NextButton onClick={() => sliderRef.current?.slickNext()} />
            </div>
        </div>
    );
};

export default SliderSection;
