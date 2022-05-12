import { useContext, useState, useEffect } from "react";
import Image from "next/image";
import { ScreenWidth } from "../components/screenWidth";
// import { useRouter } from "next/router";

import { PublicContext } from "../components/publicData";

function setLogoDimensions(width: number, setWidth: Function, setHeight: Function) {
    if (width < 640) {
        setWidth(100);
        setHeight(100);
    } else if (width < 768) {
        setWidth(100);
        setHeight(100);
    } else if (width < 1024) {
        setWidth(125);
        setHeight(125);
    } else if (width < 1280) {
        setWidth(150);
        setHeight(150);
    } else if (width < 1536) {
        setWidth(150);
        setHeight(150);
    } else {
        setWidth(175);
        setHeight(175);
    }
}

function Logo() {
    // const router = useRouter();
    // const path = router.pathname;
    const publicData = useContext(PublicContext);
    const screenSize = useContext(ScreenWidth);
    const [width, setWidth] = useState("250");
    const [height, setHeight] = useState("250");

    const myLoader = () => {
        return `${process.env.NEXT_PUBLIC_AWS_PUBLIC_BUCKET_URL}${publicData.logoImage}`;
    };

    const logoImage = (
        // path === "/" ? (
        <Image loader={myLoader} src="logo" alt="logo" width={width} height={height} />
    );
    // ) : (
    //     <div
    //         className="cursor-pointer"
    //         onClick={() => {
    //             router.push("/");
    //         }}
    //     >
    //         <Image src="/log_transparent.png" width={width} height={height} />
    //     </div>
    // );

    useEffect(() => {
        setLogoDimensions(screenSize.width, setWidth, setHeight);
    }, [screenSize.width]);

    return (
        // <div className="z-10 absolute top-0 left-0 ">
        <div className="w-full h-auto">{logoImage}</div>
    );
}

export default Logo;

//About, Location, Social Schedule Appointment
