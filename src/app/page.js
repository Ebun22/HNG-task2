"use client"
import Image from 'next/image'
import { Banner, Footer, LandingPage, MovieList, Search } from './components'
import { useStateContext } from '@/context/context'

export default function Home() {

  const { searchParam, search } = useStateContext()
  return (
    <div className='w-full flex flex-col'>
      {search ? (
        <Search />
      ) : (
        <>
          <Banner />
          <MovieList />
        </>
      )
      }
      <Footer />
    </div>
  )
}
