import React from "react";
import "tippy.js/dist/tippy.css"; // optional
import HighlightButton from "./highlightButton";
import { BsTelephoneInboundFill } from "react-icons/bs";
import IconButton from "./iconButton";
import { GiAutoRepair } from "react-icons/gi";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { FaBars } from "react-icons/fa";
import { GoCalendar } from "react-icons/go";

function Topper() {
    const telephone = <BsTelephoneInboundFill className="h-7 w-7 text-primary hover:text-accent" />;
    const location = <HiOutlineLocationMarker className="h-7 w-7 text-primary hover:text-accent" />;
    const repair = <GiAutoRepair className="h-7 w-7 text-primary hover:text-accent" />;
    const bars = <FaBars className="h-7 w-7 text-primary hover:text-accent" />;
    const calendar = <GoCalendar className="h-7 w-7 text-primary hover:text-accent" />;

    return (
        <div className="z-10 flex w-screen right-0 fixed flex justify-end p-2 gap-2 ">
            <IconButton text="Open: Mon-Fri 8am-5pm : Closed Weekend/Holidays" callback={() => {}} icon={calendar} />
            <a href="https://goo.gl/maps/J17sGmyvTLv2JDWQ8">
                <IconButton text="2621 Pico Blvd, Santa Monica" callback={() => {}} icon={location} />
            </a>
            <a href="tel:555-555-5555">
                <IconButton text="555-555-5555" callback={() => {}} icon={telephone} />
            </a>
            <HighlightButton text="Get Service Quote" callback={() => {}} icon={repair} />
            {/* </div> */}
            <IconButton text="" callback={() => {}} icon={bars} />
        </div>
    );
}

export default Topper;

//About, Location, Social Schedule Appointment
