import { useStateContext } from '@/context/context';
import React, { useEffect, useState } from 'react';

export function Carousel() {
    const { bannerData, baseURL, setCarouselItem, currentIndex, setCurrentIndex, newBanner, setNewBanner, nextSlide,
        prevSlide, } = useStateContext()

        useEffect(() => {
            setNewBanner(bannerData.slice(0, 5))
        }, [bannerData])
    

    return (
        <>
            {
                newBanner?.map((item, index) => (
                    <div
                        key={index}
                        className={`relative h-screen w-full m-auto group ${index === currentIndex ? "" : "hidden"
                            }`}
                    >
                        <img
        
                            src={`${baseURL}${item.backdrop_path}`}
                            alt={item.title}
                            className='w-full h-full object-cover'
                        />
                        <div onClick={prevSlide} className='h-full w-6 top-72 bottom-0 left-0 opacity-20 group-hover:block absolute -translate-x-0 translate-y-[-50%] z-30 text-2xl  p-2  text/white cursor-pointer'>
                            <span className="prev z-30" >&#10094;</span>
                        </div>
                        <div onClick={nextSlide} className='h-full w-8 top-72 bottom-0 right-0 opacity-20 group-hover:block absolute -translate-x-0 translate-y-[-50%] z-30 text-2xl  p-2 bg-Black/20 text/white cursor-pointer'>
                            <span className="next z-30" >&#10095;</span>
                        </div>
                    </div>

                ))
            }
        </>
    );
}
