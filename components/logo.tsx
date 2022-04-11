import { useContext, useState, useEffect } from "react";
import Image from "next/image";
import { ScreenWidth } from "../components/screenWidth";

function setLogoDimensions(width: number, setWidth: Function, setHeight: Function) {
    if (width < 640) {
        setWidth(100);
        setHeight(100);
    } else if (width < 768) {
        setWidth(100);
        setHeight(100);
    } else if (width < 1024) {
        setWidth(150);
        setHeight(150);
    } else if (width < 1280) {
        setWidth(185);
        setHeight(185);
    } else if (width < 1536) {
        setWidth(250);
        setHeight(250);
    } else {
        setWidth(250);
        setHeight(250);
    }
}

function Logo() {
    const screenSize = useContext(ScreenWidth);
    const [width, setWidth] = useState("250");
    const [height, setHeight] = useState("250");

    useEffect(() => {
        setLogoDimensions(screenSize.width, setWidth, setHeight);
    }, [screenSize.width]);

    return (
        <div className="z-10 absolute top-0 left-0 ">
            <Image src="/log_transparent.png" width={width} height={height} />
        </div>
    );
}

export default Logo;

//About, Location, Social Schedule Appointment
