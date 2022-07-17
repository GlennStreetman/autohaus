import React, { useContext } from "react";
import Image from "next/image";
import { PublicContext } from "../components/publicData";

//flex grid elements
const gutter = " hidden lg:block col-span-0 lg:col-span-1 "; //2x
const imgContent = "p-2 col-span-12 md:col-span-12 lg:col-span-10 flex items-center "; //2x
const textContent = 'p-2 col-span-12 md:col-span-12 lg:col-span-10 flex items-center grow relative'
const imgBox = "relative rounded-md bg-black overflow-hidden h-36 w-36 md:h-72 md:w-72 lg:h-72 lg:w-72 xl:h-80 xl:w-80 float-left m-2 ";

function Team() {
    const publicData = useContext(PublicContext);

    return (
        <div className="w-full flex justify-center bg-primaryDark p-4">
        <div className="flex flex-col">
            <div className="flex justify-center text-white font-bold text-3xl relative">
                <div className="z-10 bg-primaryDark px-2 text-center">Meet the team!</div>
                <div className="absolute left-20 right-20 h-0 border-y-2 top-1/2" />
            </div>
            <div className={imgContent}> 
            <a href='/team' className={imgBox}>
                <Image alt="whyImage" src={`${process.env.NEXT_PUBLIC_AWS_PUBLIC_BUCKET_URL}${publicData.teamOne}`} layout="fill" objectFit="fill" />
            </a>
            <a href='/team' className={imgBox}>
                <Image alt="whyImage" src={`${process.env.NEXT_PUBLIC_AWS_PUBLIC_BUCKET_URL}${publicData.teamTwo}`} layout="fill" objectFit="fill" />
            </a>
        </div>
        </div>
    </div>
    );
}

export default Team;



