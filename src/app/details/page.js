'use client'
import React, { useState, useEffect } from 'react';
import { useStateContext } from '@/context/context';
import Image from 'next/image';
import Link from 'next/link';
import { SideNavBar } from '../components';


export default function Home({ searchParams }) {

    const { allData, baseURL, movieCredits, detailCountry, setDetailLang, setDetailCountry, getGenrefromID, genreData, setParams, genreNames, getMovieDetails, movieDetails, setLanguage } = useStateContext()
    console.log(movieCredits)
    const { backdrop_path, imdb_id, original_language, genres, production_countries, overview, original_title, poster_path, release_date, runtime } = movieDetails

    if (typeof movieCredits === 'undefined') {
        return [];
    }const getCrew = () => {
        const directorNames = movieCredits.crew
            .filter(item => item.known_for_department === "Directing")
            .map(name => name.name);

        const uniqueDirectorNames = [...new Set(directorNames)];
        // console.log(uniqueDirectorNames);
        uniqueDirectorNames.forEach(item => {
            return item
        })
    }
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
                                <p>
                                    {directors.map((director, index) => (
                                        <p key={index}>{director}</p>
                                    ))}
                                </p>
                            ) : (
                                <p>No directors found.</p>
                            )}
                            <p>Writers:
                                {/* {
                                    movieCredits.crew.filter(item => item.known_for_department == "Writing" & item.job == "Screenplay").map(item => (
                                        <p>{item.name}</p>
                                    ))
                                } */}
                            </p>
                            <p className="flex flex-row">Stars:
                                {/* {
                                    movieCredits.cast?.slice(0, 3).map((item, index) => (
                                        <p key={index}>{index < movieCredits.cast?.slice(0, 3).length - 1 ? item.name + ", " : item.name + " "}</p>
                                    ))
                                } */}
                            </p>
                        </div>
                    </div>
                    <div></div>
                </div>
            </div>

        </div>
    )
}

