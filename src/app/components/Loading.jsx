import React, { useState } from 'react'
import { useStateContext } from '@/context/context'
import { Banner, Footer, MovieList } from '.'

const Loading = () => {
    const { allData } = useStateContext()
    return (
        <div className="flex justify-center items-center h-screen w-full h-full">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-rose-500 border-solid"></div>
      </div>
    )
}

export default Loading;
