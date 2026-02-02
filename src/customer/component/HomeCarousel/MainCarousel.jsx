import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { mainCarouseldata } from './MainCarouselData';


const responsive = {
    0: { items: 1 },
    568: { items: 2 },
    1024: { items: 3 },
};



const MainCarousel = () => {
        // const items = mainCarouseldata
    
    const items = mainCarouseldata.map((items) => <div className='w-10rem h-150 p-5 pl-10 pr-10'><img className='cursor-pointer w-full h-full' role='presentation' src={items.image} alt="" /></div>)
    return (

        <AliceCarousel
            mouseTracking
            items={items}
            disableButtonsControls
            infinite
            autoPlay
            autoPlayInterval={3000}
            buttonsDisabled
            // controlsStrategy="alternate"
        />
    )
};
export default MainCarousel