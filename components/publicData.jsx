import React from "react";
import Topper from "./topper";
import Bottom from "./bottom";
import {contacts} from "../strapiAPI/getContacts"
import {siteLinks} from "../strapiAPI/getSiteLinks"

export const PublicContext = React.createContext();

export function PublicHOC(p) {
    return (
        <>
            <Topper contacts={p.contacts} siteLinks={p.siteLinks}/>
            {p.children}
            <Bottom contacts={p.contacts} siteLinks={p.siteLinks}/>
        </>
    );
}
