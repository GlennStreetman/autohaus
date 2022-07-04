import { useContext, useState, useEffect } from "react";
import Image from "next/image";
import { ScreenWidth } from "../components/screenWidth";
// import { useRouter } from "next/router";

import { PublicContext } from "../components/publicData";

function setLogoDimensions(width: number, setWidth: Function, setHeight: Function) {
    if (width < 640) {
        setWidth(410);
        setHeight(110);
    } else if (width < 768) {
        setWidth(410);
        setHeight(110);
    } else if (width < 1024) {
        setWidth(410);
        setHeight(110);
    } else if (width < 1280) {
        setWidth(410);
        setHeight(110);
    } else if (width < 1536) {
        setWidth(820);
        setHeight(220);
    } else {
        setWidth(820);
        setHeight(220);
    }
}

function Logo() {
    const publicData = useContext(PublicContext);
    const screenSize = useContext(ScreenWidth);
    const [width, setWidth] = useState("820");
    const [height, setHeight] = useState("220");

    const logoImage = <Image src={`${process.env.NEXT_PUBLIC_AWS_PUBLIC_BUCKET_URL}${publicData.logoImage}`} alt="logo" width={width} height={height} />;

    useEffect(() => {
        setLogoDimensions(screenSize.width, setWidth, setHeight);
    }, [screenSize.width]);

    return (
        <>
            {screenSize.width <= 640 ? <div className="w-full h-9" /> : <></>}
            <div className="w-full h-auto">{logoImage}</div>
        </>
    );
}

export default Logo;
