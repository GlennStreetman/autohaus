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

function Topper() {
    const screenSize = useContext(ScreenWidth);
    const telephone = <BsTelephoneInboundFill className="h-7 w-7 text-primary hover:text-accent" />;
    const telephoneText = screenSize.width >= 1024 ? "555-555-5555" : "";
    const location = <HiOutlineLocationMarker className="h-7 w-7 text-primary hover:text-accent" />;
    const locationText = screenSize.width >= 1024 ? "2621 Pico Blvd" : "";
    const repair = <GiAutoRepair className="h-7 w-7 text-primary hover:text-accent text-red-600" />;
    const repairText = screenSize.width >= 1024 ? "Request Quote" : "";
    const calendar = <GoCalendar className="h-7 w-7 text-primary hover:text-accent" />;
    const calendarText = screenSize.width >= 1024 ? "Open: Mon-Fri 8am-5pm" : "";
    const bars = <FaBars className="h-7 w-7 text-primary hover:text-accent" />;

    return (
        <div className="z-10 flex w-screen right-0 fixed flex justify-end p-2 gap-2 ">
            {screenSize.width > 768 ? <IconButton text={calendarText} callback={() => {}} icon={calendar} /> : <></>}
            <a href="https://goo.gl/maps/J17sGmyvTLv2JDWQ8">
                <IconButton text={locationText} callback={() => {}} icon={location} />
            </a>
            <a href={`tel:555-555-5555`}>
                <IconButton text={telephoneText} callback={() => {}} icon={telephone} />
            </a>
            <HighlightButton text={repairText} callback={() => {}} icon={repair} />
            {/* </div> */}
            <IconButton text="" callback={() => {}} icon={bars} />
        </div>
    );
}

export default Topper;

//About, Location, Social Schedule Appointment
