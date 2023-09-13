'use client'
import React, { useState, useEffect } from 'react';
import { useStateContext } from '@/context/context';
import Image from 'next/image';
import Link from 'next/link';
import { SideNavBar } from '../components';


export default function Home({ searchParams }) {

    const { allData, baseURL, getGenrefromID, genreData,setParams,  genreNames, getMovieDetails, movieDetails, setLanguage } = useStateContext()

    console.log(searchParams.id)
    useEffect(() => {
        setParams(searchParams.id)
    }, [])
    
   

    // const { backdrop_path, imdb_id, original_language,
    //     overview, original_title, poster_path, release_date, runtime } = movieDetails

    return (
        <div className=' w-full h-full flex flex-row'>
            <div className="w-1/4 min-h-screen top-0 left-0 right-0">
                <SideNavBar />
            </div>

            <div className="w-3/4 px-12 my-8 relative right-0">
                    {/* <div className='w-full h-64' >
                        <img
                            width={150}
                            height={100}
                            src={`${baseURL}${poster_path}`}
                            alt={original_title}
                            className='w-full h-full object-fill rounded-lg'
                            data-testid="movie-poster"
                        />
                </div> */}
            </div>

        </div>
    )
}

