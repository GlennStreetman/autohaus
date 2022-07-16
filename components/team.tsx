import React, { useContext } from "react";
import Image from "next/image";
import LineLinkButton from "./lineLinkButton";
import { SiPorsche } from "react-icons/si";
import { PublicContext } from "../components/publicData";
import ParseMarkdown from "./../lib/parseMarkdown";

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
                <div className="z-10 bg-primaryDark px-2 ">Meet the team!</div>
                <div className="absolute left-20 right-20 h-0 border-y-2 top-1/2" />
            </div>
            <div className={imgContent}> 
            <a href='/team' className={imgBox}>
                <Image alt="whyImage" src={`${process.env.NEXT_PUBLIC_AWS_PUBLIC_BUCKET_URL}${publicData.aboutImage}`} layout="fill" objectFit="fill" />
            </a>
            <a href='/team' className={imgBox}>
                <Image alt="whyImage" src={`${process.env.NEXT_PUBLIC_AWS_PUBLIC_BUCKET_URL}${publicData.aboutImage}`} layout="fill" objectFit="fill" />
            </a>
        </div>
        </div>
    </div>
    );
}

export default Team;



// <div className="flex flex-col bg-primaryDark text-white py-4">
// <div className="grid grid-cols-12 justify-items-center w-screen p-1 shrink">
//     <div className={gutter} />
//     <div className={textContent}> 
//             <div className="z-10 bg-primaryDark px-2  font-bold text-3xl">Meet the team!</div> 
//             <div className="absolute left-20 right-20 h-0 border-y-2 top-1/2" />
//     </div>
//     <div className={gutter} />
//     <div className={gutter} />
//         <div className={imgContent}> 
//             <a href='/team' className={imgBox}>
//                 <Image alt="whyImage" src={`${process.env.NEXT_PUBLIC_AWS_PUBLIC_BUCKET_URL}${publicData.aboutImage}`} layout="fill" objectFit="fill" />
//             </a>
//             <a href='/team' className={imgBox}>
//                 <Image alt="whyImage" src={`${process.env.NEXT_PUBLIC_AWS_PUBLIC_BUCKET_URL}${publicData.aboutImage}`} layout="fill" objectFit="fill" />
//             </a>
//         </div>
//     <div className={gutter} />
// </div>
// </div>