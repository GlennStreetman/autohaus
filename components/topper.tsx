import dynamic from "next/dynamic";
import React from "react";
// import Gutter from "./gutter";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css"; // optional
import Link from "next/link";
import BgButton from "./bgButton";
import HighlightButton from "./highlightButton";

import { useRouter } from "next/router";

function Topper() {
    const router = useRouter();

    return (
        <div className="w-screen top-0 fixed p-2 bg-black-500 grid grid-cols-12 ">
            <div className="col-span-1"></div>
            <div className="col-span-4 ">
                <div className="">
                    <h1 className="font-logo text-pRed font-medium">AutoHaus: Santa Monica</h1>
                </div>
            </div>
            <div className="col-span-3 ">
                <div className="flex justify-items-center gap-4">
                    {/* <button className=''>About</button> */}
                    {/* <BgButton onClick={() => {}}>Reviews</BgButton> */}
                    {/* <BgButton onClick={() => {}}>Social</BgButton> */}
                </div>
            </div>
            <div className="col-span-3 flex justify-end">
                <HighlightButton>Schedule Service</HighlightButton>
            </div>
        </div>
    );
}

export default Topper;

//About, Location, Social Schedule Appointment
