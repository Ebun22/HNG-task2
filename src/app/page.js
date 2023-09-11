"use client"
import Image from 'next/image'
import { LandingPage } from './components'

export default function Home() {
  return (
    <main className="flex w-full max-w-screen-xl min-h-screen flex-col justify-between overflow-x-hidden">
     <LandingPage />
    </main>
  )
}
