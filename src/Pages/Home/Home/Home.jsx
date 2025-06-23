import React from 'react';
import Carosale from '../../../Components/carosel/Carosale';
import Works from '../../../Components/Works/Works';
import Services from '../../../Components/Services/Services';

const Home = () => {
    return (
        <div>
           <Carosale></Carosale>
           <Works></Works>
           <Services></Services>
        </div>
    );
};

export default Home;