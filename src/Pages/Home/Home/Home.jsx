import React from 'react';
import Carosale from '../../../Components/carosel/Carosale';
import Works from '../../../Components/Works/Works';
import Services from '../../../Components/Services/Services';
import Brands from '../../../Components/Brands/Brands';
import System from '../../../Components/System/System';
import Satisfaction from '../../../Components/Satisfaction/Satisfaction';

const Home = () => {
    return (
        <div>
           <Carosale></Carosale>
           <Works></Works>
           <Services></Services>
           <Brands></Brands>
           <System></System>
           <Satisfaction></Satisfaction>
        </div>
    );
};

export default Home;