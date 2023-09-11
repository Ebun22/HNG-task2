import { useStateContext } from "@/context/context";
import React, { useState } from "react"
import { Carousel } from "./ui/Carousel";
import Image from "next/image";


const Banner = () => {
    const { bannerData, baseURL } = useStateContext()
    return (
        <div className="h-screen">
            <Carousel />
        </div>
    )
}

export default Banner;