import { useContext } from "react";
import { ScreenWidth } from "../components/screenWidth";
import IconButton2 from "./iconButton";
import { useRouter } from "next/router";

import { BsTelephoneInboundFill } from "react-icons/bs";
import { GiAutoRepair } from "react-icons/gi";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { FaBars } from "react-icons/fa";
import { GoCalendar } from "react-icons/go";

function Topper() {
    const router = useRouter();
    const path = router.pathname;
    const screenSize = useContext(ScreenWidth);

    const telephoneText =
        screenSize.width >= 1024 ? (
            <a href={`tel:${process.env.NEXT_PUBLIC_PHONE}`}>{process.env.NEXT_PUBLIC_PHONE}</a>
        ) : (
            <a href={`tel:${process.env.NEXT_PUBLIC_PHONE}`} />
        );

    const locationText =
        screenSize.width >= 1024 ? (
            <a href={process.env.NEXT_PUBLIC_ADDRESS_MAP_LINK}>{process.env.NEXT_PUBLIC_ADDRESS_SHORT}</a>
        ) : (
            <a href={process.env.NEXT_PUBLIC_ADDRESS_MAP_LINK} />
        );

    const repairText = screenSize.width >= 1024 ? "Request Quote" : "";

    const calendarText = screenSize.width >= 1024 ? "Open: Mon-Fri 8am-5pm" : "";

    return (
        <div className="z-10 flex w-screen right-0 fixed flex justify-end p-2 gap-2 ">
            {path !== "/calendar" && screenSize.width > 768 ? (
                <IconButton2 text={calendarText} callback={() => {}} icon={<GoCalendar className="h-7 w-7" />} link="/calendar" />
            ) : (
                <></>
            )}

            <IconButton2 text={locationText} callback={() => {}} icon={<HiOutlineLocationMarker className="h-7 w-7" />} />

            <IconButton2 text={telephoneText} callback={() => {}} icon={<BsTelephoneInboundFill className="h-7 w-7" />} />
            {/* </a> */}

            {path !== "/quote" ? (
                <IconButton2 text={repairText} callback={() => {}} icon={<GiAutoRepair className="h-7 w-7" />} link="/quote" highlight={true} />
            ) : (
                <></>
            )}

            <IconButton2 text="" callback={() => {}} icon={<FaBars className="h-7 w-7" />} />
        </div>
    );
}

export default Topper;
