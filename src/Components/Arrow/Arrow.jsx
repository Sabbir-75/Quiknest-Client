import React from 'react';
import { MdOutlineDoubleArrow } from "react-icons/md";

const Arrow = () => {
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    return (

        <button onClick={scrollToTop} className='fixed bottom-10 hover:-translate-y-1 duration-200 hover:border hover:border-base-content right-5 w-11 h-11 origin-center -rotate-90 cursor-pointer text-base-content bg-primary rounded-full flex justify-center items-center'>
            <MdOutlineDoubleArrow size={36} />
        </button>

    );
};

export default Arrow;