import { useStateContext } from "@/context/context";
import React, { useState } from "react"
import { Carousel } from "./ui/Carousel";
import Image from "next/image";


const Banner = () => {
    const { bannerData, baseURL, carouselItem, newBanner, currentIndex, goTo,handleSearch, handleSearchInput } = useStateContext()
    const index = [1, 2, 3, 4, 5]
    return (
        <div className="h-screen">
            <div className="w-full h-full bg-black/50 text-white absolute top-0 bottom-0 left-0 right-0 pt-6 px-24 z-10">
                {/* navbar */}
                <div className="flex flex-row w-full">
                    <div className="flex flex-row">
                        <Image
                            src="/images/tv.png"
                            alt='imdb logo'
                            width={25}
                            height={25}
                            className="mr-6 w-12 h-12"
                        />
                        <p className="font-bold mt-4">MovieBox</p>
                    </div>
                    <div className="flex flex-row m-auto p-1 justify-center w-2/5 border-solid border border-white rounded-lg ">
                        <input type="text" placeholder="what do you want to search" onChange={(event) => handleSearchInput(event)} className="bg-transparent outline-none pl-1.5 w-1/2" />
                        <div className="relative top-2 bottom-0 z-20 right-0 w-1/2 h-2">
                            <Image
                                src="/images/Icon.png"
                                alt='imdb logo'
                                width={20}
                                height={20}
                                className="w-3 h-3 absolute top-0 bottom-0 z-20 right-0"
                            />
                        </div>
                    </div>
                    <div className="text-white flex flex-row z-30 w-1/5 justify-end">
                        <p className="mr-5">Sign in</p>
                        <button className="rounded-full px-2 w-8 h-8 text-center bg-rose-700" onClick={()=> handleSearch()}>
                            <Image
                                src="/images/menu.png"
                                alt='imdb logo'
                                width={25}
                                height={25}
                                className="w-6 h-6"
                            />
                        </button>
                    </div>
                </div>

                {/* details */}
                <div className="flex flex-row">
                    <div className="mt-32 w-1/2 mr-38 h-full text-white">
                        {
                            newBanner?.map((item, index) => (
                                <div
                                    key={index}
                                    className={`relative h-screen w-full m-auto group ${index === currentIndex ? "" : "hidden"
                                        }`}
                                >
                                    <h2 className="text-5xl text-bold text-white">{item.title}</h2>
                                    <div className='flex flex-row mt-2 w-1/2'>
                                        <span className="flex flex-row w-1/2 ">
                                            <Image
                                                src="/images/IMDB.png"
                                                alt='imdb logo'
                                                width={20}
                                                height={25}

                                            />
                                            <span>{item.vote_average}/10</span>
                                        </span>
                                        <span className="flex flex-row justify-end w-1/2">
                                            <Image src="/images/tomatoes.png" className="w-3.5 h-4 " alt='imdb logo' width={10} height={10} />
                                            <span>67%</span>
                                        </span>

                                    </div>
                                    <p className="mt-2">
                                        {item.overview}
                                    </p>
                                    <button className="flex flex-row bg-red-600 rounded-lg text-center p-2 mt-5"> <Image src="/images/Play.png" alt='imdb logo' width={25} height={25} />WATCH TRAILER</button>
                                </div>

                            ))
                        }

                    </div>
                    <div className="flex flex-col w-1.5 justify-end ml-96 h-full text-6 text-white text-right">
                        {index.map(num => (
                            <p onClick={() => goTo(num)}>{num}</p>
                        ))}

                    </div>

                </div>

            </div>
            <Carousel />
        </div>
    )
}

export default Banner;