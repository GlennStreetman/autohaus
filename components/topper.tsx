import { useContext } from "react";
import { ScreenWidth } from "../components/screenWidth";
// import "tippy.js/dist/tippy.css"; // optional
import HighlightButton from "./highlightButton";
import { BsTelephoneInboundFill } from "react-icons/bs";
import IconButton from "./iconButton";
import { GiAutoRepair } from "react-icons/gi";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { FaBars } from "react-icons/fa";
import { GoCalendar } from "react-icons/go";
import Link from "next/link";
import { useRouter } from "next/router";

function Topper() {
    const router = useRouter();
    const path = router.pathname;
    const screenSize = useContext(ScreenWidth);
    const telephone = <BsTelephoneInboundFill className="h-7 w-7 text-primary hover:text-accent" />;
    const telephoneText = screenSize.width >= 1024 ? process.env.NEXT_PUBLIC_PHONE : "";
    const location = <HiOutlineLocationMarker className="h-7 w-7 text-primary hover:text-accent" />;
    const locationText = screenSize.width >= 1024 ? process.env.NEXT_PUBLIC_ADDRESS_SHORT : "";
    const repair = (
        <Link href="/quote">
            <GiAutoRepair className="h-7 w-7 text-primary hover:text-accent text-red-600" />
        </Link>
    );
    const repairText = screenSize.width >= 1024 ? <Link href="/quote">Request Quote</Link> : "";
    const calendar = (
        <Link href="/calendar">
            <GoCalendar className="h-7 w-7 text-primary hover:text-accent" />
        </Link>
    );
    const calendarText = screenSize.width >= 1024 ? <Link href="/calendar"> "Open: Mon-Fri 8am-5pm" </Link> : <Link href="/quote">""</Link>;
    const bars = <FaBars className="h-7 w-7 text-primary hover:text-accent" />;

    return (
        <div className="z-10 flex w-screen right-0 fixed flex justify-end p-2 gap-2 ">
            {path !== "/calendar" && screenSize.width > 768 ? <IconButton text={calendarText} callback={() => {}} icon={calendar} /> : <></>}
            <a href={process.env.NEXT_PUBLIC_ADDRESS_MAP_LINK}>
                <IconButton text={locationText} callback={() => {}} icon={location} />
            </a>
            <a href={`tel:${process.env.NEXT_PUBLIC_PHONE}`}>
                <IconButton text={telephoneText} callback={() => {}} icon={telephone} />
            </a>

            {path !== "/quote" ? <HighlightButton text={repairText} callback={() => {}} icon={repair} /> : <></>}

            <IconButton text="" callback={() => {}} icon={bars} />
        </div>
    );
}

export default Topper;

//About, Location, Social Schedule Appointment
