'use client'
import React, { useState, useEffect } from 'react';
import { useStateContext } from '@/context/context';
import Image from 'next/image';
import Link from 'next/link';
import { SideNavBar } from '../components';


export default function Home({ searchParams }) {

    const { allData, baseURL, movieCredits, detailCountry, setDetailLang, setDetailCountry, getGenrefromID, genreData, setParams, genreNames, getMovieDetails, movieDetails, setLanguage } = useStateContext()
    console.log(movieCredits)
    const { backdrop_path, imdb_id, vote_count, original_language, genres, vote_average, overview, original_title, poster_path, release_date, runtime } = movieDetails

    console.log(genres)
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

    useEffect(() => {
        setParams(searchParams.id)
    }, [])

    return (
        <div className=' w-full h-full flex flex-row'>
            <div className="w-1/5 min-h-screen top-0 left-0 right-0">
                <SideNavBar />
            </div>

            <div className="w-4/5 px-12 my-8 relative right-0">
                <div className='w-full h-64' >
                    <img
                        width={150}
                        height={100}
                        src={`${baseURL}${poster_path}`}
                        alt={original_title}
                        className='w-full h-full object-fill rounded-lg'
                        data-testid="movie-poster"
                    />
                </div>
                <div className="flex flex-row w-full">
                    <div className="flex flex-col w-full">
                        <div className="flex flex-row w-full py-4">
                            <div className="flex flex-row w-3/4 font-medium text-base mt-2 ">
                                <p className='alighn-middle' data-testid='movie-title'>{original_title}</p>
                                <span className="block bg-black rounded-full w-2.5 h-2 "></span>
                                <p className='alighn-middle' data-testid='movie-release-date'>{release_date}</p>
                                <span className='alighn-middle'></span>
                                <p className='alighn-middle' data-testid='movie-runtime'>{runtime}</p>
                                <span></span>
                            </div>
                            <div className="flex flex-row w-1/4 mt-2">
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
                                        <p key={index} className="text-rose-700 font-normal">{" " + director}</p>
                                    ))}
                                </p>
                            ) : (
                                <p>No directors found.</p>
                            )}
                            <p className="flex flex-row pb-4  font-light">Writers:
                                {movieCredits ? (
                                    movieCredits.crew?.filter(item => item.known_for_department == "Writing" & item.job == "Screenplay").map(item => (
                                        <p className="text-rose-700 font-normal">{" " + item.name}</p>
                                    ))
                                ) : (
                                    <p>No Writers</p>
                                )
                                }
                            </p>
                            <p className="flex flex-row pb-4 font-light">Stars:
                                {movieCredits ? (
                                    movieCredits.cast?.slice(0, 3).map((item, index) => (
                                        <p key={index} className="text-rose-700 font-normal">{index < movieCredits.cast?.slice(0, 3).length - 1 ? item.name + ", " : item.name + " "}</p>
                                    ))
                                ) : (
                                    <p className="text-rose-700">No stars</p>
                                )
                                }
                            </p>
                        </div>
                        <div className="flex flex-row pt-6 w-full">
                            <p className="p-2 bg-rose-700 rounded-lg text-center text-white w-1/3"> Top rated movie #65</p>
                            <p className="flex flex-row w-1/3 pt-4 pl-2 border-y border-r border-slate-300 rounded-r-lg">
                                <p>Awards 9 nominations</p>
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
                                className=" mr-1 mb-3 w-6 h-6"
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
                                <p  className="text-slate-400 px-2 h-6 border-r-2 border-black">{vote_average}</p>
                                <p className="text-base pl-2">{vote_count}</p>
                            </div>
                        </div>
                        <div className="mt-3">
                            <button className="p-2 px-4 bg-rose-700 text-white text-center rounded-lg w-full mb-2">See Showtimes</button>
                            <button className="p-2 px-4 bg-rose-100 rounded-lg w-full text-center border border-rose-700">More watch options</button>
                        </div>
                        <div >
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
                        </div>

                    </div>
                </div>
            </div>

        </div>
    )
}

