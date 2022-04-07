import React from "react";
import "tippy.js/dist/tippy.css"; // optional
import HighlightButton from "./highlightButton";
import { BsTelephoneInboundFill } from "react-icons/bs";
import IconButton from "./iconButton";
import { GiAutoRepair } from "react-icons/gi";
import { HiOutlineLocationMarker } from "react-icons/hi";

function Topper() {
    const telephone = <BsTelephoneInboundFill className="h-7 w-7 text-primary hover:text-accent" />;
    const location = <HiOutlineLocationMarker className="h-7 w-7 text-primary hover:text-accent" />;
    const repair = <GiAutoRepair className="h-7 w-7 text-primary hover:text-accent" />;

    return (
        <div className="z-10 w-screen top-0 fixed p-2 bg-black-500 grid grid-cols-12 ">
            <div className="col-span-1"></div>
            <div className="col-span-4 ">
                <div className="">
                    <h1 className="font-logo text-pRed font-medium">AutoHaus: Santa Monica</h1>
                </div>
            </div>
            <div className="col-span-6 flex justify-end gap-1">
                <a href="https://goo.gl/maps/J17sGmyvTLv2JDWQ8">
                    <IconButton text="2621 Pico Blvd, Santa Monica" callback={() => {}} icon={location} />
                </a>

                <a href="tel:555-555-5555">
                    <IconButton text="555-555-5555" callback={() => {}} icon={telephone} />
                </a>
                <HighlightButton text="Schedule Service" callback={() => {}} icon={repair} />
            </div>
        </div>
    );
}

export default Topper;

//About, Location, Social Schedule Appointment
