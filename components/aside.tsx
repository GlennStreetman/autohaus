import React, { useContext } from "react";
import LineLinkButton from "./lineLinkButton";
import { MdOutlineMailOutline } from "react-icons/md";
import { GiAutoRepair } from "react-icons/gi";
import { BsTelephoneInboundFill } from "react-icons/bs";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { GoCalendar } from "react-icons/go";
import { PublicContext } from "../components/publicData";
import { addDashes } from "../lib/formatPhone";
import { AiOutlineInstagram, AiOutlineHome } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";

function Aside() {
    const publicData = useContext(PublicContext);
    const telephoneText = publicData.phone ? addDashes(publicData.phone) : "";
    const email = publicData.serviceEmail ? publicData.serviceEmail : "";
    const longAddress = publicData.addressLong ? publicData.addressLong : "";
    const openLong = publicData.openLong ? publicData.openLong : "";
    const openShort = publicData.openShort ? publicData.openShort : "";
    const locationLink = publicData.googleLink ? publicData.googleLink : "";
    const socialLink = publicData.socialLink ? publicData.socialLink : "";
    const reviewLink = publicData.reviewLink ? publicData.reviewLink : "";

    return (
        <div className="flex flex-col border-4 border-accent rounded-md bg-primary overflow-hidden">
            <div className="font-bold bg-black text-white text-center">Contact/Location</div>
            <LineLinkButton text="Request Service Appointment" icon={<GiAutoRepair className="h-7 w-7" />} link="/quote" textSize="small" />
            <LineLinkButton text={telephoneText} link={`tel:${publicData.phone}`} icon={<BsTelephoneInboundFill className="h-7 w-7" />} textSize="small" />
            <LineLinkButton text={email} link={`mailto: ${email}`} icon={<MdOutlineMailOutline className="h-7 w-7" />} textSize="small" />
            <LineLinkButton text={longAddress} link={locationLink} icon={<HiOutlineLocationMarker className="h-7 w-7" />} textSize="small" />

            <div className="font-bold bg-black text-white text-center">Hours of Opperation</div>
            <LineLinkButton text={openShort} icon={<GoCalendar className="h-7 w-7" />} link="/calendar" textSize="small" />
            <LineLinkButton text={openLong} icon={<GoCalendar className="h-7 w-7" />} link="/calendar" textSize="small" />

            <div className="font-bold bg-black text-white text-center">Social</div>
            <LineLinkButton text="Social" link={socialLink} icon={<AiOutlineInstagram className="h-7 w-7" />} textSize="small" />
            <LineLinkButton text="Google Reviews" link={reviewLink} icon={<FcGoogle className="h-7 w-7 " />} textSize="small" />
        </div>
    );
}

export default Aside;
