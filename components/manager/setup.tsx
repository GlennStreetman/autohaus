import React, { useState, useEffect } from "react";
import OutlinedSurface from "./../outlinedSurface";
import ContactInfo from "./setup/contactInfo";
import Links from "./setup/links";
import Literature from "./setup/Literature";

interface props {
    show: boolean;
}

function setup(p: props) {
    const [savedImages, setSavedImages] = useState("");
    const [logo, setLogo] = useState("");
    const [banner, setBanner] = useState();
    const [homeWhite, setHomeWhite] = useState();

    return (
        <div className={p.show === true ? "col-span-12 overflow-auto" : "hidden"}>
            <ContactInfo />
            <Links />
            <Literature />
        </div>
    );
}

export default setup;
