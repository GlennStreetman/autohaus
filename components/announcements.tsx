// import { useState, useEffect, useRef } from "react";
import { bannerTextPayload } from "../strapiAPI/getBannerText"
import NextLinkButton from './nextLinkButton'

interface props {
    bannerTexts: bannerTextPayload
}
function Announcements(p: props) {

    return (
        <div className='flex flex-col'>
            <div className='text-highLight w-4/5 mx-auto text-center subpixel-antialiased [text-shadow:2px_2px_rgba(0,0,0,1)]  font-body font-black text-5xl whitespace-normal my-7'>{p?.bannerTexts?.Primary || ''}</div>
            <div className='text-amber-500 tracking-wide w-3/5 mx-auto text-center whitespace-normal subpixel-antialiased [text-shadow:2px_2px_rgba(0,0,0,1)] font-semibold text-3xl my-7 '>{p?.bannerTexts?.secondary || ''}</div>
            <div className='mb-2 subpixel-antialiased font-body w-3/5 mx-auto flex '>{p?.bannerTexts?.link ? <NextLinkButton text={p.bannerTexts.linkText} link={p.bannerTexts.link} icon={<></>} textSize="text-2xl" /> : ''}</div>
        </div>
    );
}

export default Announcements;
