import { useContext } from "react";
import { ScreenWidth } from "../components/screenWidth";
import { PublicContext } from "../components/publicData";
import NextLinkButton from "./nextLinkButton";
import LinkButton from "./linkButton";
import { useRouter } from "next/router";
import { addDashes } from "../lib/formatPhone";

import { BsTelephoneInboundFill } from "react-icons/bs";
import { GiAutoRepair } from "react-icons/gi";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { AiOutlineHome } from "react-icons/ai";
import { GoCalendar } from "react-icons/go";

import {contacts} from "../strapiAPI/getContacts"
import {siteLinks} from "../strapiAPI/getSiteLinks"

interface props {
    contacts: contacts;
    siteLinks: siteLinks;
}

function Topper(p: props) {
    const router = useRouter();
    const path = router.pathname;
    const screenSize = useContext(ScreenWidth);


    const telephoneText = screenSize.width >= 1024 && p?.contacts?.phone ? addDashes(p.contacts.phone) : "";
    const locationText = screenSize.width >= 1024 && p?.contacts?.address ? p.contacts.address : "";
    const locationLink = p.siteLinks.googleLink ? p?.siteLinks?.googleLink : "";
    const repairText = screenSize.width >= 1024 ? "Request Service" : "";
    const calendarText = screenSize.width >= 1024 && p?.contacts?.openShort ? p.contacts.openShort : "";

    return (
        <div className="z-20 flex right-0 fixed justify-end p-2 gap-2 ">
            {path !== "/calendar" && screenSize.width > 768 ? (
                <NextLinkButton text={calendarText} icon={<GoCalendar className="h-5 w-5 xs:h-7  xs:w-7" />} link="/calendar" />
            ) : (
                <></>
            )}

            <LinkButton text={locationText} link={locationLink} icon={<HiOutlineLocationMarker className="h-5 w-5 xs:h-7  xs:w-7" />} />

            <LinkButton text={telephoneText} link={`tel:${p.contacts.phone}`} icon={<BsTelephoneInboundFill className="h-5 w-5 xs:h-7  xs:w-7" />} />

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
