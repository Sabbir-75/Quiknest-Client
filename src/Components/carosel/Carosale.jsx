import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import banner1 from "../../assets/banner/banner1.png"
import banner2 from "../../assets/banner/banner2.png"
import banner3 from "../../assets/banner/banner3.png"
import Container from '../Container/Container';

const Carosale = () => {
    return (
        <Container>
            <Carousel className='mt-8 md:mt-10 lg:mt-14' autoPlay={true} showThumbs={false} showStatus={false} infiniteLoop={true} showArrows={false} stopOnHover={true}>
                <div>
                    <img src={banner1} />
                </div>
                <div>
                    <img src={banner2} />
                </div>
                <div>
                    <img src={banner3} />
                </div>
            </Carousel>
        </Container>


    );
};

export default Carosale;