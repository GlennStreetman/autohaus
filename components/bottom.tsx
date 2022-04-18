import React from "react";
import { useRouter } from "next/router";
import NextLinkButton from "./nextLinkButton";
import LinkButton from "./linkButton";

import { BsTelephoneInboundFill } from "react-icons/bs";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { FcGoogle } from "react-icons/fc";
import { GiMechanicGarage } from "react-icons/gi";
import { MdOutlineMailOutline } from "react-icons/md";
import { GoCalendar } from "react-icons/go";
import { AiOutlineInstagram, AiOutlineHome } from "react-icons/ai";
import { GiAutoRepair } from "react-icons/gi";

//flex grid elements
const gutter = "p-2 col-span-0  md:col-span-1 lg:col-span-1 xl:col-span-2"; //2x
const spacer = "p-2 col-span-0  md:col-span-0 lg:col-span-0 xl:col-span-2"; //1x
const data = "p-2   col-span-12 md:col-span-5 lg:col-span-5 xl:col-span-3"; //2x

function bottom() {
    const router = useRouter();
    const path = router.pathname;

    return (
        <>
            <div className="grid grid-cols-12 w-full bg-neutral-900 p-2">
                <div className={gutter}></div>
                <div className={data}>
                    <div className="flex flex-col gap-2">
                        <div className="text-white">Contact Details:</div>
                        <LinkButton
                            text={process.env.NEXT_PUBLIC_PHONE}
                            link={`tel:${process.env.NEXT_PUBLIC_PHONE}`}
                            icon={<BsTelephoneInboundFill className="h-7 w-7" />}
                        />
                        <LinkButton
                            text={process.env.NEXT_PUBLIC_EMAIL}
                            link={`mailto: ${process.env.NEXT_PUBLIC_EMAIL}`}
                            // callback={() => {
                            //     if (navigator.clipboard) navigator.clipboard.writeText(process.env.NEXT_PUBLIC_EMAIL);
                            // }}
                            icon={<MdOutlineMailOutline className="h-7 w-7" />}
                        />
                        <LinkButton
                            text={process.env.NEXT_PUBLIC_ADDRESS_LONG}
                            link={process.env.NEXT_PUBLIC_ADDRESS_MAP_LINK}
                            icon={<HiOutlineLocationMarker className="h-7 w-7" />}
                        />
                        {path !== "/calendar" ? (
                            <NextLinkButton text="Open: Mon-Fri 8am-5pm : Closed Weekend/Holidays" icon={<GoCalendar className="h-7 w-7" />} link="/calendar" />
                        ) : (
                            <></>
                        )}
                    </div>
                </div>
                <div className={spacer} />
                <div className={data}>
                    <div className="flex flex-col gap-2">
                        <div className="text-white">Other Actions:</div>
                        {path !== "/" ? <NextLinkButton text="Back" link="/" icon={<AiOutlineHome className="h-7 w-7" />} /> : <></>}
                        {path !== "/quote" ? (
                            <NextLinkButton text="Request Service Quote" icon={<GiAutoRepair className="h-7 w-7" />} link="/quote" highlight={true} />
                        ) : (
                            <></>
                        )}
                        <LinkButton text="Social" link={process.env.NEXT_PUBLIC_SOCIAL} icon={<AiOutlineInstagram className="h-7 w-7" />} />
                        <LinkButton text="Google Reviews" link={process.env.NEXT_PUBLIC_GOOGLE} icon={<FcGoogle className="h-7 w-7 " />} />
                        <NextLinkButton text="Careers" icon={<GiMechanicGarage className="h-7 w-7" />} link="/careers" />
                    </div>
                </div>

                <div className={gutter}></div>
            </div>
        </>
    );
}

export default bottom;
