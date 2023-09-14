import { useStateContext } from "@/context/context";
import React, { useState } from "react"
import Image from "next/image";


const Footer = () => {

  return (
    <div className="w-full h-full px-44 py-4 pl-48 mx-auto">
      <div className="flex flex-row justify-center ml-6">
        <Image
          src="/images/Vector(2).png"
          alt='imdb logo'
          width={20}
          height={25}
          className="mr-6 mb-4 w-4 h-4"
        />
        <Image
          src="/images/Vector(3).png"
          alt='imdb logo'
          width={20}
          height={25}
          className="mr-6 mb-4 w-4 h-4"
        />
        <Image
          src="/images/Vector(4).png"
          alt='imdb logo'
          width={20}
          height={25}
          className="mr-6 mb-4 w-4 h-4"
        />
        <Image
          src="/images/fa-brands_youtube.png"
          alt='imdb logo'
          width={20}
          height={25}
          className="mr-6 mb-4 w-4 h-4"
        />
      </div>
      <div className="text-center flex flex-row justify-center font-medium mt-3">
        <p className="mr-6 ">Conditions of use</p>
        <p className="mr-6 ">Privacy & Policy</p>
        <p>Press Room</p>
      </div>
      <div className="text-center mt-3 text-slate-500 text-sm">
        <p>2021 MovieBox by Adriana Eka Prayudha</p>
      </div>
    </div>
  )
}

export default Footer;