import React, { useState} from 'react';
import { useRef } from 'react';
import HomeSectionCard from '../HomeSectionCard/HomeSectionCard';
import AliceCarousel from 'react-alice-carousel';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { Button } from '@mui/material';
import { mens_kurta } from '../../../Data/Mens/mens_kurta';


function HomeSectionCarousel({data,section}) {
    const carouselRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);

    const responsive = {
        0: { items: 1 },
        720: { items: 3 },
        1024: { items: 5, itemsFit: 'contain' },
    };

    const items = data.map((item, index) => (
        <HomeSectionCard key={item.id || index} product={item} />
    ));

    const handleSlideChanged = (e) => {
        setActiveIndex(e.item);
    };

    const slidePrev = () => {
        carouselRef.current?.slidePrev();



    }
    const slideNext = () => {
        carouselRef.current?.slideNext();

    }

    return (
        <div className="relative px-4 lg:px-8">
            <h2 className='text-2xl font-extrabold text-gray-800 py-5'>{section}</h2>
            <div className="relative p-5">
                <AliceCarousel
                    ref={carouselRef}
                    items={items}
                    responsive={responsive}
                    buttonsDisabled
                    
                    dotsDisabled
                    infinite
                // onSlideChanged={handleSlideChanged}
                />

                {/* Right Button */}

                <Button
                    variant="contained"
                    className="z-50"
                    onClick={slideNext}
                    sx={{
                        position: 'absolute',
                        top: '13rem',
                        right: '0rem',
                        transform: 'translateX(50%) rotate(90deg)',
                        bgcolor: 'white',
                    }}
                >
                    <KeyboardArrowLeftIcon sx={{ transform: 'rotate(90deg)', color: 'black' }} />
                </Button>



                <Button
                    variant="contained"
                    className="z-50"
                    onClick={slidePrev}
                    sx={{
                        position: 'absolute',
                        top: '13rem',
                        left: '0rem',
                        transform: 'translateX(-50%) rotate(-90deg)',
                        bgcolor: 'white',
                    }}
                >
                    <KeyboardArrowLeftIcon sx={{ transform: 'rotate(90deg)', color: 'black' }} />
                </Button>

            </div>
        </div>
    );
}

export default HomeSectionCarousel;
