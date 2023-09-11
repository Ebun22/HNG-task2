import { useStateContext } from '@/context/context';
import React, { useState } from 'react';

export function Carousel() {
    const { bannerData, baseURL } = useStateContext()
    const [currentIndex, setCurrentIndex] = useState(0)
    const [endStep, setEndStep] = useState(false)
    const newBanner = bannerData.slice(0, 5)
    const index = [1, 2, 3, 4, 5]

    const prevSlide = () => {
        setCurrentIndex(currentIndex <= 0 ? newBanner.length - 1 : currentIndex - 1);
    }
    const nextSlide = () => {
        setCurrentIndex(currentIndex === 4 ? 0 : currentIndex + 1)
    }
    const goTo = (index) => {
        setCurrentIndex(index)
    }

    return (
        <>
            {
                newBanner.map((item, index) => (
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
                        <div onClick={prevSlide} className='hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-Black/20 text/white cursor-pointer'>
                            <span className="prev" >&#10094;</span>
                        </div>
                        <div onClick={nextSlide} className='hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-Black/20 text/white cursor-pointer'>
                            <span className="next" >&#10095;</span>
                        </div>
                        <div>
                            {/* {
                           
                            index.map((item, key) => {
                                <p onClick={goTo(item-1)}>{item}</p>
                            })
                            } */}
                        </div>
                    </div>

                ))
            }
        </>
    );
}
