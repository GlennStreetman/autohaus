import { useState, useEffect, useContext } from "react";
import { ScreenWidth } from "../components/screenWidth";


import { useRouter } from "next/router";
import { addDashes } from "../lib/formatPhone";

import { BsTelephoneInboundFill } from "react-icons/bs";
import { GiAutoRepair } from "react-icons/gi";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { AiOutlineHome } from "react-icons/ai";
import { GoCalendar } from "react-icons/go";
import {GrServices} from 'react-icons/gr'

import {contacts} from "../strapiAPI/getContacts"
import {siteLinks} from "../strapiAPI/getSiteLinks"
import {imagePayload} from "../strapiAPI/getPublicImages"

// import NextLinkButton from "./nextLinkButton";
// import LinkButton from "./linkButton";
import LinkButtonBlack, {NextLinkButtonBlack} from "./linkButtonBlack";
import LinkButtonTopper, {NextLinkButtonTopper} from "./linkButtonTopper";
import LogoLittle from './logoLittle'

interface props {
    contacts: contacts;
    siteLinks: siteLinks;
    images: imagePayload;
}

function Topper(p: props) {

    const [scrollPosition, setScrollPosition] = useState(0);

    const router = useRouter();
    const path = router.pathname;
    const screenSize = useContext(ScreenWidth);
    const telephoneText = screenSize.width >= 1024 && p?.contacts?.phone ? addDashes(p.contacts.phone) : "";
    const locationText = screenSize.width >= 1024 && p?.contacts?.address ? p.contacts.address : "";
    const locationLink = p?.siteLinks?.googleLink ? p.siteLinks.googleLink : "";
    const repairText = screenSize.width >= 1024 ? "Contact Us" : "";
    const calendarText = screenSize.width >= 1024 && p?.contacts?.openShort ? p.contacts.openShort : "";


    const handleScroll = () => {
        const position = window.pageYOffset;
        setScrollPosition(position);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    

    return (
        <>
        <div className='h-10 bg-zinc-700'>
            <div className='w-4/5 mx-auto flex justify-center gap-8'>
            {path !== "/calendar" && screenSize.width > 768 ? (
                <NextLinkButtonTopper text={calendarText} icon={<GoCalendar className="h-4 w-4 xs:h-7  xs:w-7" />} link="/calendar" />
            ) : (
                <></>
            )}
            <LinkButtonTopper text={locationText} link={locationLink} icon={<HiOutlineLocationMarker className="h-4 w-4 xs:h-7 xs:w-7" />} />
            <LinkButtonTopper text={telephoneText} link={`tel:${p.contacts.phone}`} icon={<BsTelephoneInboundFill className="h-4 w-4 xs:h-7 xs:w-7" />} />
            </div>
        </div>
        <div className="z-20 flex right-0 sticky top-0 justify-center p-2 gap-2 bg-highLight w-screen my-auto">
            
            {path !== "/service" ? (
                    <NextLinkButtonBlack text='Services' icon={<></>} link="/service" />
                ) : (
                    <></>
                )}
                
            <LogoLittle logo={p?.images?.logoImage ? p.images.logoImage : ''} position={scrollPosition}/>
                


            {path !== "/quote" ? (
                <NextLinkButtonBlack text={repairText} icon={<></>} link="/quote" />
            ) : (
                <></>
            )}

            {/* {path !== "/" ? <LinkButtonBlack text="" link="/" icon={<AiOutlineHome className="h-5 w-5 xs:h-7  xs:w-7" />} /> : <></>} */}
        </div>
        </>

    );
}

export default Topper;


//         <div className='h-10 bg-zinc-700'></div>