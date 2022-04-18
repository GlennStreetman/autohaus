import { useContext } from "react";
import { ScreenWidth } from "../components/screenWidth";
import NextLinkButton from "./nextLinkButton";
import LinkButton from "./linkButton";
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

    const telephoneText = screenSize.width >= 1024 ? process.env.NEXT_PUBLIC_PHONE : "";

    const locationText = screenSize.width >= 1024 ? process.env.NEXT_PUBLIC_ADDRESS_SHORT : "";

    const repairText = screenSize.width >= 1024 ? "Request Quote" : "";

    const calendarText = screenSize.width >= 1024 ? "Open: Mon-Fri 8am-5pm" : "";

    return (
        <div className="z-10 flex w-screen right-0 fixed flex justify-end p-2 gap-2 ">
            {path !== "/calendar" && screenSize.width > 768 ? (
                <NextLinkButton text={calendarText} icon={<GoCalendar className="h-7 w-7" />} link="/calendar" />
            ) : (
                <></>
            )}

            <LinkButton text={locationText} link={`${process.env.NEXT_PUBLIC_ADDRESS_MAP_LINK}`} icon={<HiOutlineLocationMarker className="h-7 w-7" />} />

            <LinkButton text={telephoneText} link={`tel:${process.env.NEXT_PUBLIC_PHONE}`} icon={<BsTelephoneInboundFill className="h-7 w-7" />} />
            {/* </a> */}

            {path !== "/quote" ? <NextLinkButton text={repairText} icon={<GiAutoRepair className="h-7 w-7" />} link="/quote" highlight={true} /> : <></>}

            <LinkButton text="" link="/siteMap" icon={<FaBars className="h-7 w-7" />} />
        </div>
    );
}

export default Topper;
