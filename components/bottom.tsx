import React from "react";
import { BsTelephoneInboundFill } from "react-icons/bs";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { FcGoogle } from "react-icons/fc";
import IconButton from "./iconButton";
import { GiMechanicGarage } from "react-icons/gi";
import { MdOutlineMailOutline } from "react-icons/md";
import { GoCalendar } from "react-icons/go";
import { AiOutlineInstagram } from "react-icons/ai";
import HighlightButton from "./highlightButton";
import { GiAutoRepair } from "react-icons/gi";

function bottom() {
    const telephone = <BsTelephoneInboundFill className="h-7 w-7 text-primary" />;
    const location = <HiOutlineLocationMarker className="h-7 w-7 text-primary" />;
    const google = <FcGoogle className="h-7 w-7 text-primary" />;
    const mechanic = <GiMechanicGarage className="h-7 w-7 text-primary" />;
    const email = <MdOutlineMailOutline className="h-7 w-7 text-primary" />;
    const calendar = <GoCalendar className="h-7 w-7 text-primary hover:text-accent" />;
    const instagram = <AiOutlineInstagram className="h-7 w-7 text-primary hover:text-accent" />;
    const repair = <GiAutoRepair className="h-7 w-7 text-primary hover:text-accent text-red-600" />;

    return (
        <>
            <div className="grid grid-cols-12 w-full bg-neutral-900 p-2">
                <div className="p-2 col-span-2"></div>
                <div className="p-2 col-span-3">
                    <div className="flex flex-col gap-2">
                        <div className="text-white">Contact Details:</div>
                        <div>
                            <IconButton text="555-555-5555" callback={() => {}} icon={telephone} />
                        </div>
                        <div>
                            <a href="mailto: testemail@test.com">
                                <IconButton text="testemail@test.com" callback={() => {}} icon={email} />
                            </a>
                        </div>
                        <div>
                            <a href="https://goo.gl/maps/J17sGmyvTLv2JDWQ8">
                                <IconButton text="2621 Pico Blvd, Santa Monica, CA 90404" callback={() => {}} icon={location} />
                            </a>
                        </div>
                        <div>
                            <IconButton text="Open: Mon-Fri 8am-5pm : Closed Weekend/Holidays" callback={() => {}} icon={calendar} />;
                        </div>
                    </div>
                </div>
                <div className="p-2 col-span-2">{/* spacer */}</div>
                <div className="p-2 col-span-3">
                    <div className="flex flex-col gap-2">
                        <div className="text-white">Other Actions:</div>
                        <div>
                            <HighlightButton text="Request Service Quote" callback={() => {}} icon={repair} />
                        </div>
                        <div>
                            <a href="https://instagramlink.test">
                                <IconButton text="Social" callback={() => {}} icon={instagram} />
                            </a>
                        </div>
                        <div>
                            {/* <div className="text-white">Reviews:</div> */}
                            <a href="">
                                <IconButton text="Google Reviews" callback={() => {}} icon={google} />
                            </a>
                        </div>
                        <div>
                            {/* <div className="text-white">Reviews:</div> */}
                            <a href="">
                                <IconButton text="Careers" callback={() => {}} icon={mechanic} />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="p-2 col-span-2"></div>
            </div>
        </>
    );
}

export default bottom;

//hours
//  social
//get service quote / apply for job

// OTHER
// get quote
// careers
// reviews
// social