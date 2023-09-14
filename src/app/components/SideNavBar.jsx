import { useStateContext } from "@/context/context";
import React, { useState } from "react"
import Image from "next/image";
import Link from "next/link";


const SideNavBar = () => {

    return (
        <div className="h-full w-full border-solid border border-slate-700 rounded-r-lg ">
            <div className="flex flex-row w-full">
                <Image
                    src="/images/tv.png"
                    width={50}
                    height={50}
                    className="mr-4"
                />
                <p className="bold">MovieBox</p>
            </div>
            <div className="mt-16 justify-center text-sm font-medium text-slate-700">
                <p className='flex flex-row p-4'>
                    <Image
                        src="/images/Home.png"
                        alt="home"
                        width={25}
                        height={25}
                        className="mr-2 w-6 "
                    />
                    <Link href='/'>
                        Home
                    </Link>

                </p>
                <p className='flex flex-row align-middle p-4 bg-pink-200 text-rose-700 border-solid border-r-2 border-rose-700'>
                    <Image
                        src="/images/Movie Projector.png"
                        alt="projector"
                        width={20}
                        height={20}
                        className="mr-2"
                    />
                    Movies
                </p>
                <p className='flex flex-row align-middle p-4'>
                    <Image
                        src="/images/TV Show.png"
                        alt="tvShow"
                        width={25}
                        height={25}
                        className="mr-2 w-6"
                    />
                    TV Series
                </p>
                <p className='flex flex-row p-4'>
                    <Image
                        src="/images/Calendar.png"
                        alt="calender"
                        width={25}
                        height={25}
                        className="mr-2 w-6"
                    />
                    Upcoming
                </p>
            </div >
            <div className="p-1.5 m-2">
                <div className="text-sm pt-4 pb-2 px-2 border-solid border border-rose-700 rounded-lg bg-pink-100">
                    <p className='text-sm my-1 text-medium text-slate-950'>Play movie quizes and earn<br /> free tickets</p>
                    <p className="text-xs my-1 text-medium text-slate-700">50k people are playing<br /> now</p>
                    <div className="text-sm mt-2 p-1.5 bg-rose-300 text-center text-rose-900 rounded-full">Start playing</div>
                </div>
                <p className='flex flex-row p-4 my-4 text-sm text-medium text-slate-700'>
                    <Image
                        src="/images/Logout.png"
                        alt="logout"
                        width={25}
                        height={25}
                        className="mr-2 mb-4"
                    />
                    Log out
                </p>
            </div>
        </div >
    )
}

export default SideNavBar;