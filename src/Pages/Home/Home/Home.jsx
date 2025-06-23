import React from 'react';
import Carosale from '../../../Components/HomeComponents/carosel/Carosale';
import Works from '../../../Components/HomeComponents/Works/Works';
import Services from '../../../Components/HomeComponents/Services/Services';
import Brands from '../../../Components/HomeComponents/Brands/Brands';
import System from '../../../Components/HomeComponents/System/System';
import Satisfaction from '../../../Components/HomeComponents/Satisfaction/Satisfaction';
import Customers from '../../../Components/HomeComponents/Customers/customers';

const Home = () => {
    return (
        <div>
           <Carosale></Carosale>
           <Works></Works>
           <Services></Services>
           <Brands></Brands>
           <System></System>
           <Satisfaction></Satisfaction>
           <Customers></Customers>
          
        </div>
    );
};

export default Home;