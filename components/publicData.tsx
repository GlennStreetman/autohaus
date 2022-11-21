import React from "react";
import Topper from "./topper";
import Footer from "./footer";


import { imagePayload } from "../strapiAPI/getPublicImages"
import { contacts } from "../strapiAPI/getContacts"
import { siteLinks } from "../strapiAPI/getSiteLinks"
import { siteText } from "../strapiAPI/getSiteText"



interface props {
    contacts: contacts;
    siteLinks: siteLinks;
    images: imagePayload;
    siteText: siteText;
    children: JSX.Element;
}


export function PublicHOC(p: props) {
    return (
        <div className='absolute'>
            <Topper contacts={p.contacts} siteLinks={p.siteLinks} images={p.images} />
            {p.children}
            <Footer contacts={p.contacts} siteLinks={p.siteLinks} images={p.images} siteText={p.siteText} />
        </div>
    );
}
