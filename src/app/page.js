"use client"
import Image from 'next/image'
import { Banner, Footer, LandingPage, MovieList } from './components'

export default function Home() {
  return (
    <div className='w-full flex flex-col'>
            <Banner />
         
            <MovieList />
        
            <Footer />
        </div>
  )
}
