import { useContext, useState, useEffect } from "react";
import Image from "next/image";
import { ScreenWidth } from "../components/screenWidth";
// import { useRouter } from "next/router";

// import { PublicContext } from "../components/publicData";

function setLogoDimensions(width: number, setWidth: Function, setHeight: Function) {
    if (width < 640) {
        setWidth(202);
        setHeight(125);
    } else if (width < 768) {
        setWidth(202);
        setHeight(125);
    } else if (width < 1024) {
        setWidth(323);
        setHeight(200);
    } else if (width < 1280) {
        setWidth(323);
        setHeight(200);
    } else if (width < 1536) {
        setWidth(485);
        setHeight(300);
    } else {
        setWidth(485);
        setHeight(300);
    }
}

interface props {
    logo: string
}

function Logo(p: props) {
    // const publicData = useContext(PublicContext);
    const screenSize = useContext(ScreenWidth);
    const [width, setWidth] = useState("125");
    const [height, setHeight] = useState("125");

    const logoImage = p.logo ? <Image src={p.logo} alt="logo" width={width} height={height} />: <></>;

    useEffect(() => {
        setLogoDimensions(screenSize.width, setWidth, setHeight);
    }, [screenSize.width]);

    return (
        <>
            {/* {screenSize.width <= 640 ? <div className="w-full h-9" /> : <></>} */}
            <div className="w-full h-auto">{logoImage}</div>
        </>
    );
}

export default Logo;
