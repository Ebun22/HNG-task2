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
            <div className="w-1/4 min-h-screen top-0 left-0 right-0">
                <SideNavBar />
            </div>

            <div className="w-3/4 px-12 my-8 relative right-0">
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
                        <div className="flex flex-row w-full">
                            <div className="flex flex-row w-full text-medium text-base">
                                <p>{original_title}</p>
                                <span></span>
                                <p>{release_date}</p>
                                <span></span>
                                <p>{release_date}</p>
                                <span></span>
                                <p>{runtime}</p>
                                <span></span>
                            </div>
                            <div className="flex flex-row w-full text-rose-700 p-1 border-solid border border-rose-700 rounded-lg">
                                {genres?.map((item, index) => {
                                    <p key={index}>{item.name}</p>
                                })}
                            </div>
                        </div>
                        <p>
                            {overview}
                        </p>
                        <div>
                            {directors ? (
                                <p className="flex flex-row">
                                    Directors:
                                    {directors?.map((director, index) => (
                                        <p key={index}>{" " + director}</p>
                                    ))}
                                </p>
                            ) : (
                                <p>No directors found.</p>
                            )}
                            <p className="flex flex-row">Writers:
                                {movieCredits ? (
                                    movieCredits.crew?.filter(item => item.known_for_department == "Writing" & item.job == "Screenplay").map(item => (
                                        <p>{" " + item.name}</p>
                                    ))
                                ) : (
                                    <p>No Writers</p>
                                )
                                }
                            </p>
                            <p className="flex flex-row">Stars:
                                {movieCredits ? (
                                    movieCredits.cast?.slice(0, 3).map((item, index) => (
                                        <p key={index}>{index < movieCredits.cast?.slice(0, 3).length - 1 ? item.name + ", " : item.name + " "}</p>
                                    ))
                                ) : (
                                    <p>No stars</p>
                                )
                                }
                            </p>
                        </div>
                        <div className="flex flex-row">
                            <p className="p-2 bg-rose-700 rounded-lg"> Top rated movie #65</p>
                            <p clasName="flex flex-row"><p>Awards 9 nominations</p><p>V</p></p>
                        </div>
                    </div>
                    <div>
                        <div clasName="w-full flex flex-row">
                            <Image
                                src="/images/Heart.png"
                                alt="movie"
                                width={25}
                                height={25}
                                className="mr-2 mb-4"
                            />
                            <Image
                                src="/images/Share.png"
                                alt="movie"
                                width={25}
                                height={25}
                                className="mr-2 mb-4 bg-red-700"
                            />
                            <Image
                                src="/images/Bookmark.png"
                                alt="movie"
                                width={25}
                                height={25}
                                className="mr-2 mb-4 bg-red-700"
                            />
                            <div clasName=" w-full flex flex-row">
                                <Image
                                    src="/images/Star"
                                    alt="movie"
                                    width={100}
                                    height={200}
                                />
                                <p>{vote_average}</p>
                                <p>{vote_count}</p>
                            </div>
                        </div>
                        <div>
                            <button className="p-2 px-4 bg-rose-700 rounded-lg">See Showtimes</button>
                            <button className="p-2 px-4 bg-rose-100 rounded-lg">More watch options</button>
                        </div>
                        <div>
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

