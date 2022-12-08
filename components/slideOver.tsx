
import Link from "next/link";
import { contacts } from "../strapiAPI/getContacts"
import { addDashes } from "../lib/formatPhone";

// import { BsTelephoneInboundFill } from "react-icons/bs";
// import { HiOutlineLocationMarker } from "react-icons/hi";
import { MdCancelPresentation } from "react-icons/md";
// import { GoCalendar } from "react-icons/go";
import { siteLinks } from "../strapiAPI/getSiteLinks"

import { useRouter } from "next/router";

interface props {
  show: Function;
  contacts: contacts;
  siteLinks: siteLinks;
}


function SlideOver(p: props) {

  const router = useRouter();
  const path = router.pathname;

  const locationText = p?.contacts?.addressLong || "";
  const calendarText = p?.contacts?.openShort || "";
  const calendarTextLong = p?.contacts?.openLong || "";
  const telephoneText = p?.contacts?.phone ? addDashes(p.contacts.phone) : "";
  const locationLink = p?.siteLinks?.googleLink || "";
  const serviceText = p?.contacts?.serviceEmail || "";

  return (
    <div className='h-full absolute right-0 w-[375px] bg-white outline outline-black z-30 p-2'>
      <div className='flex flex-col w-full sticky top-0 gap-2 p-2'>
        <div className='pl-2 w-full h-7 top-3 m-2 flex justify-end hover:text-primary cursor-pointer' onClick={() => p.show(false)}><MdCancelPresentation className="xs:h-7 xs:w-7 m-6 " /></div>
        <div className='pl-2 w-full border-b border-slate-300 p-2 font-bold text-2xl '>Site Links:</div>
        <Link href='/'><a><div className={`pl-2 w-full border-b border-slate-300 p-2  hover:text-primary cursor-pointer ${path === '/' ? 'font-extrabold text-primary' : 'font-semibold'}`}>Home</div></a></Link>
        <Link href='/about'><a><div className={`pl-2 w-full border-b border-slate-300 p-2  hover:text-primary cursor-pointer  ${path === '/about' ? 'font-extrabold text-primary' : 'font-semibold'}`}>About Us</div></a></Link>
        <Link href='/service'><a><div className={`pl-2 w-full border-b border-slate-300 p-2 font-semibold hover:text-primary cursor-pointer ${path === '/service' ? 'font-extrabold text-primary' : 'font-semibold'}`}>Services</div></a></Link>
        <Link href='/contact'><a><div className={`pl-2 w-full border-b border-slate-300 p-2 font-semibold hover:text-primary cursor-pointer ${path === '/contact' ? 'font-extrabold text-primary' : 'font-semibold'}`}>Contact Us</div></a></Link>
        <div className='pl-2 w-full border-b border-slate-300 p-2 font-bold text-2xl '>Contact Info:</div>
        <a target='_blank' rel="noreferrer" href={`tel:${p.contacts.phone}`}><div className='pl-2 w-full border-b border-slate-300 p-2 font-semibold hover:text-primary cursor-pointer'>{telephoneText}</div></a>
        <a target='_blank' rel="noreferrer" href={locationLink}><div className='pl-2 w-full border-b border-slate-300 p-2 font-semibold hover:text-primary cursor-pointer'>{locationText}</div></a>
        <a target='_blank' rel="noreferrer" href={`mailto: ${serviceText}`}><div className='pl-2 w-full border-b border-slate-300 p-2 font-semibold hover:text-primary cursor-pointer'>{serviceText}</div></a>
        <a target='/calendar'><div className='pl-2 w-full border-b border-slate-300 p-2 font-semibold hover:text-primary cursor-pointer'>{`${calendarTextLong}`}</div></a>
      </div>
    </div>
  )
}

export default SlideOver