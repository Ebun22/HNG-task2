"use client"
import Image from 'next/image'
import { LandingPage } from './components'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col justify-between p-24">
     <LandingPage />
    </main>
  )
}
