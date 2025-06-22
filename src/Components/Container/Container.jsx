import React from 'react';

const Container = ({children}) => {
    return (
        <div className='max-w-[1500px] mx-auto px-2 md:px-3 lg:px-8'>
            {children}
        </div>
    );
};

export default Container;