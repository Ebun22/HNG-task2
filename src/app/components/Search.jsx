import { useStateContext } from '@/context/context';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const Search= () => {
    const { bannerData, baseURL, searchData,getGenrefromID, SearchParam, genreData, genreNames, getCountries, getMovieDetails, language, setParams, setLanguage } = useStateContext()

    return (
        <>
            {
                searchData?.map((item, index) => (
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
                        className="w-full h-full pb-"
                        data-testid="movie-card"
                    >
                        <div className='w-full' >
                            <Image
                                width={250}
                                height={370}
                                src={`${baseURL}${item.poster_path}`}
                                alt={item.title}
                                className='w-full h-full object-fill'
                                data-testid="movie-poster"
                            />
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
        </>
    );
}

export default Search;