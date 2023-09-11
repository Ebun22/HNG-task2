import React, { useState } from 'react'
import { useStateContext } from '@/context/context'
import { Banner, Footer, MovieList } from '.'

const LandingPage = () => {
    const { allData } = useStateContext()
    console.log(allData)
    return (
        <div className='w-full h-full'>
            <Banner />
           <div>
            <MovieList />
           </div>
            <Footer />
        </div>
    )
}

export default LandingPage;
