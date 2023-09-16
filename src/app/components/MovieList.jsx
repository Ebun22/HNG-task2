import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useStateContext } from '@/context/context';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import Image from 'next/image';
import Link from 'next/link';


const MovieList = () => {
    const { allData, baseURL, getGenrefromID, favourite, setFavourite, genreNames, getCountries, getMovieDetails, language, setParams, setLanguage } = useStateContext()

    const toggleFavourite = (event, index) => {
        event.preventDefault();
        const updatedFavourites = [...favourite];
        updatedFavourites[index] = !updatedFavourites[index];
        setFavourite(updatedFavourites);
    }

    return (
        <>
            <div className="flex flex-col md:flex-row p-4 md:p-24 pt-6 md:pt-28 pb-0 w-full">
                <p className="flex flex-row w-full md:w-1/2 text-4xl font-bold text-left">Featured Movie</p>
                <p className="flex flex-row w-full md:w-1/2 text-base text-rose-700 justify-end mt-2 md:mt-0">See More
                    <span>
                        <Image
                            src="/images/Chevron right.png"
                            alt='right'
                            width={25}
                            height={25}
                            className="ml-3"
                        />
                    </span>
                </p>
            </div>
            <div className='w-full h-full px-4 md:px-24 pb-4 md:pb-24 pt-6 md:pt-14 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-12'>
                {allData.slice(0, 10).map((item, index) => (
                    <Link
                        href={{
                            pathname: "/details",
                            query: {
                                id: item.id
                            },
                        }}
                        onClick={() => getMovieDetails()}>
                        <div
                            key={index}
                            className="relative w-full h-full pb-"
                            data-testid="movie-card"
                        >
                            <div className='w-full relative' >
                                <img
                                    width={250}
                                    height={370}
                                    src={`${baseURL}${item.poster_path}`}
                                    alt={item.title}
                                    className='w-full h-full object-fill'
                                    data-testid="movie-poster"
                                />

                                <div className="absolute top-0 right-0 z-10">
                                    <div onClick={(event) => toggleFavourite(event, index)} className="relative z-20 bg-white w-8 h-8 p-2 rounded-full">
                                        {favourite[index] ? <AiFillHeart className="text-rose-700" /> : <AiOutlineHeart />}
                                    </div>

                                </div>


                            </div>

                            <div className='text-left w-full pt-1 h-32'>
                                <p className='text-left text-sm text-slate-500 w-full pb-3' data-testid="movie-release-date">
                                    {/* {getCountries(item.id)} */}
                                    {/* {getCountryNames(item.original_language.toUpperCase())} */}
                                    <span>USA, </span>
                                    {item.release_date.slice(0, 4)}</p>
                                <p className='text-left font-bold pb-0 pt-1' data-testid="movie-title">{item.title}</p>
                                <div className='flex flex-row text-sm'>

                                    <span className="flex flex-row w-1/2 ">
                                        <Image src="/images/IMDB.png" alt='imdb logo' width={40} height={15} />
                                        <span className='ml-2 mt-2'>{item.vote_average}/10</span>
                                    </span>
                                    <span className="flex flex-row justify-end w-1/2">
                                        <Image src="/images/tomatoes.png" alt='imdb logo' width={15} height={5} className='h-4 mt-3' />
                                        <span className='ml-2 mt-2'>67%</span>
                                    </span>

                                </div>
                                <p className='text-sm text-slate-500'>
                                    {
                                        getGenrefromID(item.genre_ids).join(', ')
                                    }
                                </p>

                            </div>

                        </div>
                    </Link>
                ))
                }
            </div >
        </>
    )
}

export default MovieList;
