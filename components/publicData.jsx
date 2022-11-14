import React from "react";
import Topper from "./topper";
import Footer from "./footer";



export const PublicContext = React.createContext();

export function PublicHOC(p) {
    return (
        <div className='absolute'>
            <Topper contacts={p.contacts} siteLinks={p.siteLinks} images={p.images}/>
            {p.children}
            <Footer contacts={p.contacts} siteLinks={p.siteLinks} images={p.images} siteText={p.siteText}/>
        </div>
    );
}
