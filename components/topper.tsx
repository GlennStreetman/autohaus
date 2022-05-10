import { useContext } from "react";
import { ScreenWidth } from "../components/screenWidth";
import { PublicData } from "../components/publicData";
import NextLinkButton from "./nextLinkButton";
import LinkButton from "./linkButton";
import { useRouter } from "next/router";
import addDashes from "../lib/formatPhone";

import { BsTelephoneInboundFill } from "react-icons/bs";
import { GiAutoRepair } from "react-icons/gi";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { AiOutlineHome } from "react-icons/ai";
import { GoCalendar } from "react-icons/go";

function Topper() {
    const router = useRouter();
    const path = router.pathname;
    const screenSize = useContext(ScreenWidth);
    const publicData = useContext(PublicData);

    const telephoneText = screenSize.width >= 1024 && publicData.phone ? addDashes(publicData.phone) : "";

    const locationText = screenSize.width >= 1024 && publicData.address ? publicData.address : "";

    const repairText = screenSize.width >= 1024 ? "Request Quote" : "";

    const calendarText = screenSize.width >= 1024 && publicData.openShort ? publicData.openShort : "";

    return (
        <div className="z-20 flex right-0 fixed flex justify-end p-2 gap-2 ">
            {path !== "/calendar" && screenSize.width > 768 ? (
                <NextLinkButton text={calendarText} icon={<GoCalendar className="h-5 w-5 xs:h-7  xs:w-7" />} link="/calendar" />
            ) : (
                <></>
            )}

            <LinkButton
                text={locationText}
                link={`${process.env.NEXT_PUBLIC_ADDRESS_MAP_LINK}`}
                icon={<HiOutlineLocationMarker className="h-5 w-5 xs:h-7  xs:w-7" />}
            />

            <LinkButton text={telephoneText} link={`tel:${publicData.phone}`} icon={<BsTelephoneInboundFill className="h-5 w-5 xs:h-7  xs:w-7" />} />

            {path !== "/quote" ? (
                <NextLinkButton text={repairText} icon={<GiAutoRepair className="h-5 w-5 xs:h-7  xs:w-7" />} link="/quote" highlight={true} />
            ) : (
                <></>
            )}

            {path !== "/" ? <NextLinkButton text="" link="/" icon={<AiOutlineHome className="h-5 w-5 xs:h-7  xs:w-7" />} /> : <></>}
        </div>
    );
}

export default Topper;
