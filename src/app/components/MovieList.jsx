import React, { useState } from 'react'
import { useStateContext } from '@/context/context'


const MovieList = () => {
    const { allData,baseURL } = useStateContext()

    return (
        <div className='w-full h-full'>
           { allData.map((item, index) => (
            <div
                key={index}
                className="p-98 grid grid-cols-4 gap-12"
            >
                <div className='w-1/4 h-3/4'>
                <img
                    width={250}
                    height={250}
                    src={`${baseURL}${item.backdrop_path}`}
                    alt={item.title}
                    className='w-full h-full object-fill'
                />
                </div>
               
            </div>
            ))}
        </div>
    )
}

export default MovieList;
