
import { BsTelephoneInboundFill } from "react-icons/bs";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { FcGoogle } from "react-icons/fc";
import { GiMechanicGarage } from "react-icons/gi";
import { MdOutlineMailOutline } from "react-icons/md";
import { GoCalendar } from "react-icons/go";
import { AiOutlineInstagram, AiOutlineHome, AiOutlineTeam } from "react-icons/ai";
import { GiAutoRepair } from "react-icons/gi";
import { addDashes } from "../lib/formatPhone";

import {contacts} from "../strapiAPI/getContacts"
import {siteLinks} from "../strapiAPI/getSiteLinks"
import LinkButtonBottom, {NextLinkButtonBottom} from './linkButtonBottom'

interface props {
    contacts: contacts;
    siteLinks: siteLinks;
}

const gutter = "p-2 col-span-0  md:col-span-1 lg:col-span-1 xl:col-span-2"; //2x
const spacer = "p-2 col-span-0  md:col-span-0 lg:col-span-0 xl:col-span-2"; //1x
const data = "p-2 col-span-12 md:col-span-5 lg:col-span-5 xl:col-span-3"; //2x

function Bottom(p: props) {

    const telephoneText = p?.contacts?.phone ? addDashes(p.contacts.phone) : "";
    const email = p?.contacts?.serviceEmail ? p.contacts.serviceEmail : "";
    const longAddress = p?.contacts?.addressLong ? p.contacts.addressLong : "";
    const locationLink = p?.siteLinks?.googleLink ? p.siteLinks.googleLink : "";
    const socialLink = p?.siteLinks?.socialLink ? p.siteLinks.socialLink : "";
    const reviewLink = p?.siteLinks?.reviewLink ? p.siteLinks.reviewLink : "";
    const openShort = p?.contacts?.openShort ? p.contacts.openShort : "";
    const openLong = p?.contacts?.openLong ? p.contacts.openLong : "";
    console.log('cat')
    return (

        <div>
            <div className="grid grid-cols-12 w-full bg-neutral-900 p-2 relative ">
                <div className={gutter}></div>
                <div className={data}>
                    <div className="flex flex-col gap-2">
                        <div className="text-highLight font-semibold tracking-wider">Contact Details:</div>
                        <LinkButtonBottom text={telephoneText} link={`tel:${p.contacts.phone}`} icon={<BsTelephoneInboundFill className="h-7 w-7" />} />
                        <NextLinkButtonBottom text="Contact Us / Request Appointment" icon={<GiAutoRepair className="h-7 w-7" />} link="/contact" />
                        <LinkButtonBottom text={email} link={`mailto: ${email}`} icon={<MdOutlineMailOutline className="h-7 w-7" />} />
                        <LinkButtonBottom text={longAddress} link={locationLink} icon={<HiOutlineLocationMarker className="h-7 w-7" />} />
                        <NextLinkButtonBottom text={`${openShort} ${openLong}`} icon={<GoCalendar className="h-7 w-7" />} link="/calendar" />
                    </div>
                </div>
                <div className={spacer} />
                <div className={data}>
                    <div className="flex flex-col gap-2">
                        <div className="text-highLight font-semibold tracking-wider">Other Actions:</div>
                        <NextLinkButtonBottom text="Home" link="/" icon={<AiOutlineHome className="h-7 w-7" />} /> 
                        <NextLinkButtonBottom text='About Us' link={`/team`} icon={<AiOutlineTeam className="h-7 w-7" />} />
                        <LinkButtonBottom text="Social" link={socialLink} icon={<AiOutlineInstagram className="h-7 w-7" />} />
                        <LinkButtonBottom text="Google Reviews" link={reviewLink} icon={<FcGoogle className="h-7 w-7 " />} />
                        <NextLinkButtonBottom text="Careers" icon={<GiMechanicGarage className="h-7 w-7" />} link="/careers" />

                    </div>
                </div>
                <div className="text-slate-500 absolute bottom-2 right-8">{process.env.NEXT_PUBLIC_BUSINESS_NAME_LEGAL}</div>
                <div className={gutter}></div>
            </div>
        </div>
    );
}

export default Bottom;
