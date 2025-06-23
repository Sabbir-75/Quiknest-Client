import React from 'react';
import brands1 from "../../../assets/brands/amazon.png"
import brands2 from "../../../assets/brands/amazon_vector.png"
import brands3 from "../../../assets/brands/casio.png"
import brands4 from "../../../assets/brands/moonstar.png"
import brands5 from "../../../assets/brands/randstad.png"
import brands6 from "../../../assets/brands/start-people 1.png"
import brands7 from "../../../assets/brands/start.png"
import Marquee from 'react-fast-marquee';

const Brands = () => {
    const brandsArray = [
        {
            id: 1,
            image: brands1
        },
        {
            id: 2,
            image:brands2
        },
        {
            id: 3,
            image: brands3
        },
        {
            id: 4,
            image: brands4
        },
        {
            id: 5,
            image: brands5
        },
        {
            id: 6,
            image: brands6
        },
        {
            id: 7,
            image: brands7
        }  
    ]
    return (
        <div className='max-w-[1280px] mx-auto px-2 md:px-3 lg:px-8 my-8 md:my-10 lg:my-14'>
            <Marquee>
                <div className='py-6 flex items-center gap-[80px]'>
                  {
                    brandsArray.map(brand => <img key={brand.id} src={brand.image}></img>)
                  }
                </div>
            </Marquee>
        </div>
    );
};
Brands
export default Brands;