import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useStateContext } from '@/context/context';
import Image from 'next/image';
import Link from 'next/link';


const MovieList = () => {
    const { allData, baseURL, getGenrefromID, genreData, genreNames, getMovieDetails, language, setParams, setLanguage } = useStateContext()

    const searchParam = useSearchParams();
    return (
        <div className='w-full h-full p-24 grid grid-cols-4 gap-12'>
            {allData.map((item, index) => (
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
                        className="w-full h-3/4"
                        data-testid="movie-card"
                    >
                        <div className='w-full h-3/4' >
                            <img
                                width={250}
                                height={250}
                                src={`${baseURL}${item.poster_path}`}
                                alt={item.title}
                                className='w-full h-full object-fill'
                                data-testid="movie-poster"
                            />
                        </div>

                        <div className='text-left w-full'>
                            <p data-testid="movie-release-date">{item.release_date.slice(0, 4)}</p>
                            <p className='text-left text-bold' data-testid="movie-title">{item.title}</p>
                            <div className='flex flex-row '>
                                <span></span>
                                <span className="flex flex-row w-1/2 ">
                                    <Image src="/images/IMDB.png" alt='imdb logo' width={25} height={25} />
                                    <span>{item.vote_average}/10</span>
                                </span>
                                <span className="flex flex-row justify-end w-1/2">
                                    <Image src="/images/tomatoes.png" alt='imdb logo' width={10} height={10} />
                                    <span>67%</span>
                                </span>

                            </div>
                            {

                                getGenrefromID(item.genre_ids).join(', ')
                            }
                        </div>

                    </div>
                </Link>
            ))
            }
        </div >
    )
}

export default MovieList;
