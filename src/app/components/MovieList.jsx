import React, { useState, useEffect } from 'react'
import { useStateContext } from '@/context/context'


const MovieList = () => {
    const { allData, baseURL,genreID, getGenrefromID, genreData, genreNames, language, setLanguage } = useStateContext()
    console.log("this is the genre data", genreData)
    console.log("this is the languages data",  language)

    return (
        <div className='w-full h-full p-24 grid grid-cols-4 gap-12'>
            {allData.map((item, index) => (
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
                    <div className='text-left'>
                        <p data-testid="movie-release-date">{item.release_date.slice(0, 4)}</p>
                        <p className='text-left text-bold' data-testid="movie-title">{item.title}</p>
                        <div className='flex flex-row justify-between'>
                            <span></span>
                        </div>
                        {
                            
                              getGenrefromID(item.genre_ids).join(', ')
                        }
                    </div>

                </div>
            ))}
        </div>
    )
}

export default MovieList;
