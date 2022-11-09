import { useState, useEffect, useContext } from "react";
import { ScreenWidth } from "../components/screenWidth";
import { useRouter } from "next/router";
import { addDashes } from "../lib/formatPhone";

import SlideOver from '../components/slideOver'

import { BsTelephoneInboundFill } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import { HiOutlineLocationMarker } from "react-icons/hi";
// import { AiOutlineHome } from "react-icons/ai";
import { GoCalendar } from "react-icons/go";
// import {GrServices} from 'react-icons/gr'

import {contacts} from "../strapiAPI/getContacts"
import {siteLinks} from "../strapiAPI/getSiteLinks"
import {imagePayload} from "../strapiAPI/getPublicImages"

import {NextLinkButtonBlack} from "./linkButtonBlack";
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
    const telephoneText =  p?.contacts?.phone ? addDashes(p.contacts.phone) : ""; //screenSize.width >= 1024 &&
    const locationText = p?.contacts?.address || "";  //screenSize.width >= 1024 &&
    const locationLink =  p?.siteLinks?.googleLink || "";
    const repairText = "Contact Us" ; //screenSize.width >= 1024 ? 
    const calendarText =  p?.contacts?.openShort || ""; //screenSize.width >= 1024 && p?.contacts?.openShort ?

    const [sideMenu, setSideMenu] = useState(false)

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
    
    if (screenSize.width >= 768) {

        if (sideMenu) setSideMenu(false)

        return (
            <>
            <div className='h-14 lg:h-10 bg-zinc-700'>
                <div className='w-full lg:w-4/5 mx-auto flex justify-center gap-8'>
                    <NextLinkButtonTopper text={calendarText} icon={<GoCalendar className="h-4 w-4 xs:h-7  xs:w-7" />} link="/calendar" />
                    <LinkButtonTopper text={locationText} link={locationLink} icon={<HiOutlineLocationMarker className="h-4 w-4 xs:h-7 xs:w-7" />} />
                    <LinkButtonTopper text={telephoneText} link={`tel:${p.contacts.phone}`} icon={<BsTelephoneInboundFill className="h-4 w-4 xs:h-7 xs:w-7" />} />
                </div>
            </div>
            <div className="z-20 flex right-0 sticky top-0 justify-center p-2 gap-2 bg-highLight w-screen my-auto">
                <NextLinkButtonBlack text="Home" link="/" icon={<></>} />
                <NextLinkButtonBlack text='About Us' icon={<></>} link="/about" />      
                <LogoLittle logo={p?.images?.logoImage || ''} position={scrollPosition}/>
                <NextLinkButtonBlack text='Services' icon={<></>} link="/service" />       
                <NextLinkButtonBlack text={repairText} icon={<></>} link="/contact" />
            </div>
            </>

        );
    } else {

        return (
            <>
                {sideMenu ? <SlideOver show={setSideMenu} contacts={p.contacts} siteLinks={p.siteLinks}/>: ''}
                <div className="z-20 flex right-0 sticky top-0 p-2 gap-2 bg-highLight w-screen my-auto px-12">    
                    <div className='mx-auto'><LogoLittle logo={p?.images?.logoImage || ''} position={scrollPosition}/></div>    
                    <div className='cursor-pointer hover:text-white my-auto flex ' onClick={()=>setSideMenu(!sideMenu)}><GiHamburgerMenu className="h-9 w-9 " /></div>
            </div>
            
            </>
        )
    }
}

export default Topper;
