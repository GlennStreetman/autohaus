
import Link from "next/link";
import {contacts} from "../strapiAPI/getContacts"
import { addDashes } from "../lib/formatPhone";

import { BsTelephoneInboundFill } from "react-icons/bs";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { MdCancelPresentation } from "react-icons/md";
import { GoCalendar } from "react-icons/go";
import {siteLinks} from "../strapiAPI/getSiteLinks"

interface props {
    show: Function;
    contacts: contacts;
    siteLinks: siteLinks;
}


function SlideOver(p: props) {

    const locationText = p?.contacts?.addressLong || "";
    const calendarText =  p?.contacts?.openShort || ""; 
    const calendarTextLong =  p?.contacts?.openLong || ""; 
    const telephoneText =  p?.contacts?.phone ? addDashes(p.contacts.phone) : "";
    const locationLink =  p?.siteLinks?.googleLink || "";
    const serviceText =  p?.contacts?.serviceEmail || "";

  return (
    <div className='h-full absolute right-0 w-[375px] bg-white outline outline-black z-30 p-2'>
        <div className='flex flex-col w-full sticky top-0 gap-2 p-2'>
            <div className='pl-2 w-full h-7 top-3 m-2 flex justify-end hover:text-highLight cursor-pointer' onClick={()=>p.show(false)}><MdCancelPresentation className="xs:h-7 xs:w-7 m-6 " /></div>
            <div className='pl-2 w-full border-b border-slate-300 p-2 font-bold text-2xl '>Site Links:</div>
            <div className='pl-2 w-full border-b border-slate-300 p-2 font-semibold hover:text-highLight cursor-pointer'><Link href='/'><a>Home</a></Link></div>
            <div className='pl-2 w-full border-b border-slate-300 p-2 font-semibold hover:text-highLight cursor-pointer'><Link href='/about'><a>About Us</a></Link></div>
            <div className='pl-2 w-full border-b border-slate-300 p-2 font-semibold hover:text-highLight cursor-pointer'><Link href='/service'><a>Services</a></Link></div>
            <div className='pl-2 w-full border-b border-slate-300 p-2 font-semibold hover:text-highLight cursor-pointer'><Link href='/contact'><a>Contact Us</a></Link></div>
            <div className='pl-2 w-full border-b border-slate-300 p-2 font-bold text-2xl '>Contact Info:</div>
            <div className='pl-2 w-full border-b border-slate-300 p-2 font-semibold hover:text-highLight cursor-pointer'><a target='_blank' href={`tel:${p.contacts.phone}`}>{telephoneText}</a></div>
            <div className='pl-2 w-full border-b border-slate-300 p-2 font-semibold hover:text-highLight cursor-pointer'><a target='_blank' href={locationLink}>{locationText}</a></div>
            <div className='pl-2 w-full border-b border-slate-300 p-2 font-semibold hover:text-highLight cursor-pointer'><a target='_blank' href={`mailto: ${serviceText}`}>{serviceText}</a></div>
            <div className='pl-2 w-full border-b border-slate-300 p-2 font-semibold hover:text-highLight cursor-pointer'><a target='/calendar'>{`${calendarText} ${calendarTextLong}`}</a></div>
        </div>
    </div>
  )
}

export default SlideOver