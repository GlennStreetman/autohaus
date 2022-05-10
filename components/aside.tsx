import React, { useContext } from "react";
import LineLinkButton from "./lineLinkButton";
import { MdOutlineMailOutline } from "react-icons/md";
import { GiAutoRepair } from "react-icons/gi";
import { BsTelephoneInboundFill } from "react-icons/bs";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { GoCalendar } from "react-icons/go";
import { PublicData } from "../components/publicData";
import addDashes from "../lib/formatPhone";

function aside() {
    const publicData = useContext(PublicData);
    const telephoneText = publicData.phone ? addDashes(publicData.phone) : "";
    const email = publicData.serviceEmail ? publicData.serviceEmail : "";
    const long = publicData.addressLong ? publicData.addressLong : "";
    const openLong = publicData.openLong ? publicData.openLong : "";
    const openShort = publicData.openShort ? publicData.openShort : "";

    return (
        <div className="flex flex-col justify-center p-2 col-span-12 md:col-span-12 lg:col-span-4 my-4 p-4">
            <div className="grow" />
            <div className="flex flex-row">
                <div className="grow" />
                <div className="flex flex-col border-2 border-black rounded-md">
                    <div>
                        <div className="font-bold bg-black text-white text-center">Contact/Location</div>

                        <LineLinkButton text="Request Service Quote" icon={<GiAutoRepair className="h-7 w-7" />} link="/quote" textSize="small" />
                        <LineLinkButton
                            text={telephoneText}
                            link={`tel:${publicData.phone}`}
                            icon={<BsTelephoneInboundFill className="h-7 w-7" />}
                            textSize="small"
                        />
                        <LineLinkButton text={email} link={`mailto: ${email}`} icon={<MdOutlineMailOutline className="h-7 w-7" />} textSize="small" />
                        <LineLinkButton
                            text={long}
                            link={process.env.NEXT_PUBLIC_ADDRESS_MAP_LINK}
                            icon={<HiOutlineLocationMarker className="h-7 w-7" />}
                            textSize="small"
                        />

                        <div className="font-bold bg-black text-white text-center">Hours of Opperation</div>

                        <LineLinkButton text={openShort} icon={<GoCalendar className="h-7 w-7" />} link="/calendar" textSize="small" />
                        <LineLinkButton text={openLong} icon={<GoCalendar className="h-7 w-7" />} link="/calendar" textSize="small" />
                    </div>
                </div>
                <div className="grow" />
            </div>
            <div className="grow" />
        </div>
    );
}

export default aside;
