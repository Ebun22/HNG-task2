"use client"
import Image from 'next/image'
import { LandingPage } from './components'

export default function Home() {
  return (
    <main className="flex w-full min-h-screen flex-col justify-between ">
     <LandingPage />
    </main>
  )
}
