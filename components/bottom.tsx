import React from "react";
import { useRouter } from "next/router";

import { BsTelephoneInboundFill } from "react-icons/bs";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { FcGoogle } from "react-icons/fc";
import IconButton from "./iconButton";
import { GiMechanicGarage } from "react-icons/gi";
import { MdOutlineMailOutline } from "react-icons/md";
import { GoCalendar } from "react-icons/go";
import { AiOutlineInstagram, AiOutlineHome } from "react-icons/ai";
import HighlightButton from "./highlightButton";
import { GiAutoRepair } from "react-icons/gi";
import Link from "next/link";

const telephone = <BsTelephoneInboundFill className="h-7 w-7 text-primary hover:text-accent" />;
const location = <HiOutlineLocationMarker className="h-7 w-7 text-primary hover:text-accent" />;
const google = <FcGoogle className="h-7 w-7 text-primary" />;
const mechanic = <GiMechanicGarage className="h-7 w-7 text-primary hover:text-accent" />;
const email = <MdOutlineMailOutline className="h-7 w-7 text-primary hover:text-accent" />;
const calendar = <GoCalendar className="h-7 w-7 text-primary hover:text-accent" />;
const instagram = <AiOutlineInstagram className="h-7 w-7 text-primary hover:text-accent" />;
const repair = (
    <Link href="/quote">
        <GiAutoRepair className="h-7 w-7 text-primary hover:text-accent text-red-600" />
    </Link>
);
const home = <AiOutlineHome className="h-7 w-7 text-primary hover:text-accent" />;

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
                            <a href={`tel:${process.env.NEXT_PUBLIC_PHONE}`}>
                                <IconButton text={process.env.NEXT_PUBLIC_PHONE} callback={() => {}} icon={telephone} />
                            </a>
                        </div>
                        <div>
                            <a href={`mailto: ${process.env.NEXT_PUBLIC_EMAIL}`}>
                                <IconButton
                                    text={process.env.NEXT_PUBLIC_EMAIL}
                                    callback={() => {
                                        if (navigator.clipboard) navigator.clipboard.writeText(process.env.NEXT_PUBLIC_EMAIL);
                                    }}
                                    icon={email}
                                />
                            </a>
                        </div>
                        <div>
                            <a href={process.env.NEXT_PUBLIC_ADDRESS_MAP_LINK}>
                                <IconButton text={process.env.NEXT_PUBLIC_ADDRESS_LONG} callback={() => {}} icon={location} />
                            </a>
                        </div>
                        <div>
                            <IconButton text="Open: Mon-Fri 8am-5pm : Closed Weekend/Holidays" callback={() => {}} icon={calendar} />;
                        </div>
                    </div>
                </div>
                <div className={spacer} />
                <div className={data}>
                    <div className="flex flex-col gap-2">
                        <div className="text-white">Other Actions:</div>
                        <div>
                            {path !== "/quote" ? (
                                <HighlightButton text={<Link href="/quote">Request Service Quote</Link>} callback={() => {}} icon={repair} />
                            ) : (
                                <></>
                            )}
                        </div>
                        <div>
                            {path !== "/" ? (
                                <IconButton
                                    text="Back"
                                    callback={() => {
                                        router.push("/");
                                    }}
                                    icon={home}
                                />
                            ) : (
                                <></>
                            )}
                        </div>
                        <div>
                            <a href={process.env.NEXT_PUBLIC_SOCIAL}>
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

                <div className={gutter}></div>
            </div>
        </>
    );
}

export default bottom;
