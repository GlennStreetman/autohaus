import React, { useContext } from "react";
import { useRouter } from "next/router";
import NextLinkButton from "./nextLinkButton";
import LinkButton from "./linkButton";
import { PublicContext } from "../components/publicData";
import { BsTelephoneInboundFill } from "react-icons/bs";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { FcGoogle } from "react-icons/fc";
import { GiMechanicGarage } from "react-icons/gi";
import { MdOutlineMailOutline } from "react-icons/md";
import { GoCalendar } from "react-icons/go";
import { AiOutlineInstagram, AiOutlineHome, AiOutlineTeam } from "react-icons/ai";
import { GiAutoRepair } from "react-icons/gi";
import { addDashes } from "../lib/formatPhone";

//flex grid elements
const gutter = "p-2 col-span-0  md:col-span-1 lg:col-span-1 xl:col-span-2"; //2x
const spacer = "p-2 col-span-0  md:col-span-0 lg:col-span-0 xl:col-span-2"; //1x
const data = "p-2   col-span-12 md:col-span-5 lg:col-span-5 xl:col-span-3"; //2x

function Bottom() {
    const router = useRouter();
    const path = router.pathname;
    const publicData = useContext(PublicContext);

    const telephoneText = publicData.phone ? addDashes(publicData.phone) : "";
    const email = publicData.serviceEmail ? publicData.serviceEmail : "";
    const longAddress = publicData.addressLong ? publicData.addressLong : "";
    const locationLink = publicData.googleLink ? publicData.googleLink : "";
    const socialLink = publicData.socialLink ? publicData.socialLink : "";
    const reviewLink = publicData.reviewLink ? publicData.reviewLink : "";
    const openShort = publicData.openShort ? publicData.openShort : "";
    const openLong = publicData.openLong ? publicData.openLong : "";

    return (
        <div>
            <div className="grid grid-cols-12 w-full bg-neutral-900 p-2 relative ">
                <div className={gutter}></div>
                <div className={data}>
                    <div className="flex flex-col gap-2">
                        <div className="text-white font-semibold tracking-wider">Contact Details:</div>
                        <LinkButton text={telephoneText} link={`tel:${publicData.phone}`} icon={<BsTelephoneInboundFill className="h-7 w-7" />} />
                        <LinkButton text={email} link={`mailto: ${email}`} icon={<MdOutlineMailOutline className="h-7 w-7" />} />
                        <LinkButton text={longAddress} link={locationLink} icon={<HiOutlineLocationMarker className="h-7 w-7" />} />
                        {path !== "/calendar" ? (
                            <NextLinkButton text={`${openShort} ${openLong}`} icon={<GoCalendar className="h-7 w-7" />} link="/calendar" />
                        ) : (
                            <></>
                        )}
                        
                    </div>
                </div>
                <div className={spacer} />
                <div className={data}>
                    <div className="flex flex-col gap-2">
                        <div className="text-white font-semibold tracking-wider">Other Actions:</div>
                        {path !== "/" ? <NextLinkButton text="Back" link="/" icon={<AiOutlineHome className="h-7 w-7" />} /> : <></>}
                        {path !== "/quote" ? (
                            <NextLinkButton text="Request Service Appointment" icon={<GiAutoRepair className="h-7 w-7" />} link="/quote" highlight={true} />
                        ) : (
                            <></>
                        )}
                        <LinkButton text="Social" link={socialLink} icon={<AiOutlineInstagram className="h-7 w-7" />} />
                        <LinkButton text="Google Reviews" link={reviewLink} icon={<FcGoogle className="h-7 w-7 " />} />
                        <NextLinkButton text="Careers" icon={<GiMechanicGarage className="h-7 w-7" />} link="/careers" />
                        <NextLinkButton text='Our Team' link={`/team`} icon={<AiOutlineTeam className="h-7 w-7" />} />
                    </div>
                </div>
                <div className="text-slate-500 absolute bottom-2 right-8">{process.env.NEXT_PUBLIC_BUSINESS_NAME_LEGAL}</div>
                <div className={gutter}></div>
            </div>
        </div>
    );
}

export default Bottom;
