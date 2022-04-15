import React from "react";
import { useRouter } from "next/router";
import IconButton2 from "./iconButton";

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
                        <div>
                            <IconButton2
                                text={<a href={`tel:${process.env.NEXT_PUBLIC_PHONE}`}>{process.env.NEXT_PUBLIC_PHONE}</a>}
                                callback={() => {}}
                                icon={<BsTelephoneInboundFill className="h-7 w-7" />}
                            />
                        </div>
                        <div>
                            <IconButton2
                                text={<a href={`mailto: ${process.env.NEXT_PUBLIC_EMAIL}`}>{process.env.NEXT_PUBLIC_EMAIL}</a>}
                                callback={() => {
                                    if (navigator.clipboard) navigator.clipboard.writeText(process.env.NEXT_PUBLIC_EMAIL);
                                }}
                                icon={<MdOutlineMailOutline className="h-7 w-7" />}
                            />
                        </div>
                        <div>
                            <IconButton2
                                text={<a href={process.env.NEXT_PUBLIC_ADDRESS_MAP_LINK}>{process.env.NEXT_PUBLIC_ADDRESS_LONG}</a>}
                                callback={() => {}}
                                icon={<HiOutlineLocationMarker className="h-7 w-7" />}
                            />
                        </div>
                        <div>
                            {path !== "/calendar" ? (
                                <IconButton2
                                    text="Open: Mon-Fri 8am-5pm : Closed Weekend/Holidays"
                                    callback={() => {}}
                                    icon={<GoCalendar className="h-7 w-7" />}
                                    link={"/calendar"}
                                    nextLink={true}
                                />
                            ) : (
                                <></>
                            )}
                        </div>
                    </div>
                </div>
                <div className={spacer} />
                <div className={data}>
                    <div className="flex flex-col gap-2">
                        <div className="text-white">Other Actions:</div>
                        <div>
                            {path !== "/" ? (
                                <IconButton2
                                    text="Back"
                                    callback={() => {
                                        router.push("/");
                                    }}
                                    icon={<AiOutlineHome className="h-7 w-7" />}
                                />
                            ) : (
                                <></>
                            )}
                        </div>
                        <div>
                            {path !== "/quote" ? (
                                <IconButton2
                                    text="Request Service Quote"
                                    link="/quote"
                                    callback={() => {}}
                                    icon={<GiAutoRepair className="h-7 w-7" />}
                                    highlight={true}
                                    nextLink={true}
                                />
                            ) : (
                                <></>
                            )}
                        </div>

                        <div>
                            <IconButton2
                                text={<a href={process.env.NEXT_PUBLIC_SOCIAL}>Social</a>}
                                callback={() => {}}
                                icon={<AiOutlineInstagram className="h-7 w-7" />}
                            />
                        </div>
                        <div>
                            <IconButton2
                                text={<a href={process.env.NEXT_PUBLIC_GOOGLE}>Google Reviews</a>}
                                callback={() => {}}
                                icon={<FcGoogle className="h-7 w-7 " />}
                            />
                        </div>
                        <div>
                            <IconButton2 text="Careers" callback={() => {}} icon={<GiMechanicGarage className="h-7 w-7" />} link="/careers" nextLink={true} />
                        </div>
                    </div>
                </div>

                <div className={gutter}></div>
            </div>
        </>
    );
}

export default bottom;
