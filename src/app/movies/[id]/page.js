'use client'
import React, { useState, useEffect } from 'react';
import { useStateContext } from '@/context/context';
import Image from 'next/image';
import Link from 'next/link';
import { SideNavBar } from '../../components';


export default function Home({ searchParams, params }) {

    const { date, setDate, baseURL, movieCredits, setParams, movieDetails } = useStateContext()

    const { vote_count, genres, vote_average, overview, original_title, poster_path, release_date, runtime } = movieDetails

    const getCrew = () => {
        if (!movieCredits) {
            return []; // Handle the case where movieCredits is not available
        }

        const directorNames = movieCredits.crew
            ?.filter(item => item.known_for_department === "Directing")
            .map(name => name.name);

        const uniqueDirectorNames = [...new Set(directorNames)];
        return uniqueDirectorNames;
    }

    // Call the getCrew function to obtain the director names
    const directors = getCrew();

    //to convert Date to UTC format
    const formatDateInUTC = () => {
        if (!release_date) {
            return;
        }
        const options = {
            weekday: 'short',
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            timeZone: 'UTC',
        }

        const dateObj = new Date(release_date);
        const formattedDate = dateObj.toLocaleDateString('en-US', options);
        setDate(formattedDate)
    }

    //storing the id into a state
    useEffect(() => {
        setParams(params.id)
    }, [])

    useEffect(() => {
        formatDateInUTC()
    }, [release_date])

    return (
        <div className=' w-full h-full flex flex-row md:flex-row'>
            <div className="w-1/5 min-h-screen top-0 left-0 right-0 hidden md:block">
                <SideNavBar />
            </div>

            <div className="w-4/5 md:w-full md:px-4 my-8 w-full relative right-0">
                <div className='w-full h-64'>
                    <Image
                        width={150}
                        height={100}
                        src={`${baseURL}${poster_path}`}
                        alt="movie poster"
                        className='w-full h-full object-fit rounded-lg'
                    />
                    <div className='absolute z-20 top-0 bottom-0 left-0 right-0  h-56 mt-14'>
                        <div className="flex flex-col justify-center">
                            <Image
                                width={100}
                                height={100}
                                src='/images/play-button.png'
                                alt="play"
                                className='relative z-20 m-auto mt-18'
                            />
                            <p className="flex flex-col justify-center m-auto text-white">Watch Trailer</p>
                        </div>
                    </div>
                </div>

                <div className="flex flex-row w-full md:flex flex-col w-full">
                    <div className="flex flex-col w-full md:w-full px-4">
                        <div className="flex flex-row w-full py-4 md:flex flex-col w-full">
                            <div className="flex flex-row w-full font-medium text-base space-evenly">
                                <p className='grow w-full mt-4' data-testid='movie-title'>{original_title}</p>
                                <span className="block bg-black rounded-full w- h-1 p-1 mt-6 mr-3"></span>
                                <p className='grow w-full mt-4' data-testid='movie-release-date'>{date}</p>
                                <span className="block bg-black rounded-full w- h-1 p-1 mt-6 mr-3"></span>
                                <p className="flex flex-row w-full py-4 w-12">
                                    <span data-testid='movie-runtime'>{runtime}</span><span>mins</span>
                                </p>
                            </div>
                            <div className="flex flex-row w-1/4 mt-4 h-8">
                                {genres?.map((item, index) => (
                                    <p
                                        key={index}
                                        className="text-rose-700 p-1 border-solid border border-rose-700 rounded-full px-4 h-6 py-0 mr-4 "
                                    >
                                        {item.name}
                                    </p>
                                )
                                )}
                            </div>
                        </div>
                        <p className="font-light" data-testid='movie-overview'>
                            {overview}
                        </p>
                        <div className="pt-6">
                            {directors ? (
                                <p className="flex flex-row pb-4 font-light">
                                    Directors:
                                    {directors?.map((director, index) => (
                                        <span key={index} className="text-rose-700 font-normal">{" " + director}</span>
                                    ))}
                                </p>
                            ) : (
                                <p>No directors found.</p>
                            )}
                            <div className="flex flex-row pb-4  font-light">Writers:
                                {movieCredits ? (
                                    movieCredits.crew?.filter(item => item.known_for_department == "Writing" & item.job == "Screenplay").map(item => (
                                        <span className="text-rose-700 font-normal">{" " + item.name}</span>
                                    ))
                                ) : (
                                    <p>No Writers</p>
                                )
                                }
                            </div>
                            <div className="flex flex-row pb-4 font-light">Stars:
                                {movieCredits ? (
                                    movieCredits.cast?.slice(0, 3).map((item, index) => (
                                        <span key={index} className="text-rose-700 font-normal">{index < movieCredits.cast?.slice(0, 3).length - 1 ? item.name + ", " : item.name + " "}</span>
                                    ))
                                ) : (
                                    <p className="text-rose-700">No stars</p>
                                )
                                }
                            </div>
                        </div>
                        <div className="flex flex-row pt-6 w-full">
                            <p className="p-2 bg-rose-700 rounded-lg text-center text-white w-1/3"> Top rated movie #65</p>
                            <p className="flex flex-row w-1/3 pt-4 pl-2 border-y border-r border-slate-300 rounded-r-lg md:w-full">
                                <span className="md:block w-full ">Awards 9 nominations</span>
                                <Image
                                    src="/images/arrow_down.png"
                                    alt="movie"
                                    width={25}
                                    height={25}
                                    className="mr-2 mb-4"
                                />
                            </p>
                        </div>
                    </div>

                    <div className='w-1/3 ml-2 mt-8'>
                        <div className="w-full flex flex-row">
                            <Image
                                src="/images/Heart.png"
                                alt="movie"
                                width={25}
                                height={25}
                                className="mr-1 mb-3 w-6 h-6"
                            />
                            <Image
                                src="/images/Share.png"
                                alt="movie"
                                width={25}
                                height={25}
                                className="mr-2 mb-4 w-6 h-6"
                            />
                            <Image
                                src="/images/Bookmark.png"
                                alt="movie"
                                width={25}
                                height={25}
                                className="mr-2 mb-4 w-6 h-6"
                            />
                            <div className="w-full flex flex-row">
                                <Image
                                    src="/images/Star.png"
                                    alt="movie"
                                    width={25}
                                    height={25}
                                    className="mb-4 w-6 h-6"
                                />
                                <p className="text-slate-400 px-2 h-6 border-r-2 border-black">{vote_average}</p>
                                <p className="text-base pl-2">{vote_count}</p>
                            </div>
                        </div>
                        <div className="mt-3 md:flex flex-row">
                            <button className="p-2 px-4 bg-rose-700 text-white text-center rounded-lg w-full mb-2">See Showtimes</button>
                            <button className="p-2 px-4 bg-rose-100 rounded-lg w-full text-center border border-rose-700">More watch options</button>
                        </div>
                        {/* <div >
                            <Image
                                src="/"
                                alt="movie"
                                width={100}
                                height={200}
                            />
                            <Image
                                src="/"
                                alt="movie"
                                width={100}
                                height={200}
                            />
                            <Image
                                src="/"
                                alt="movie"
                                width={100}
                                height={200}
                            />
                        </div> */}
                    </div>
                </div>
            </div>

            {/* <div className="w-1/5 min-h-screen md:hidden">
               <div className='w-2 h-2 bg-black'></div>
               <div className='w-2 h-2 bg-black'></div>
               <div className='w-2 h-2 bg-black'></div>
            </div> */}

        </div>
    )
}

