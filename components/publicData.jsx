import React from "react";
import Topper from "./topper";
import Bottom from "./bottom";



export const PublicContext = React.createContext();

export function PublicHOC(p) {
    return (
        <div className='absolute'>
            <Topper contacts={p.contacts} siteLinks={p.siteLinks} images={p.images}/>
            {p.children}
            <Bottom contacts={p.contacts} siteLinks={p.siteLinks} images={p.images}/>
        </div>
    );
}
