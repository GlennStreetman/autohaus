import { useContext, useState, useEffect } from "react";
import Image from "next/image";
import { ScreenWidth } from "./screenWidth";


function setLogoDimensions(width: number, position: number, setWidth: Function, setHeight: Function) {
    //at top of screen

    if (position === 0) {
        if (width < 640) {
            setWidth(234);
            setHeight(142);
        } else if (width < 768) {
            setWidth(234);
            setHeight(142);
        } else if (width < 1024) {
            setWidth(234);
            setHeight(142);
        } else if (width < 1280) {
            setWidth(234);
            setHeight(142);
        } else if (width < 1536) {
            setWidth(234);
            setHeight(142);
        } else {
            setWidth(234);
            setHeight(142);
        }
    } else {
        //as soon as scroll down
        if (width < 640) {
            setWidth(94);
            setHeight(57);
        } else if (width < 768) {
            setWidth(94);
            setHeight(57);
        } else if (width < 1024) {
            setWidth(94);
            setHeight(57);
        } else if (width < 1280) {
            setWidth(94);
            setHeight(57);
        } else if (width < 1536) {
            setWidth(94);
            setHeight(57);
        } else {
            setWidth(94);
            setHeight(57);
        }
    }

}

interface props {
    logo: string
    position: number
}

function TopLogo(p) {
    if (p?.src) { return <Image src={p?.src || ''} alt="logo" width={p.width} height={p.height} /> } else { return <></> }
}

function LogoLittle(p: props) {
    const screenSize = useContext(ScreenWidth);
    const [width, setWidth] = useState(234);
    const [height, setHeight] = useState(142);
    const [zeroFlag, setZeroFlag] = useState(0)

    const logoStyling = p.position === 0 ? 'absolute -bottom-[130px] ' : 'relative'
    const boxWidth = `${width}px`

    useEffect(() => {

        setLogoDimensions(screenSize.width, p.position, setWidth, setHeight);
    }, [screenSize.width]);


    useEffect(() => {
        if (zeroFlag === 0 && p.position !== 0) {
            setLogoDimensions(screenSize.width, p.position, setWidth, setHeight);
            setZeroFlag(1)
        }

        if (zeroFlag === 1 && p.position === 0) {
            setLogoDimensions(screenSize.width, p.position, setWidth, setHeight);
            setZeroFlag(0)
        }

    }, [p.position]);

    if (screenSize.width >= 1024) {
        return (
            <div key={`${width}-image`} style={{ width: boxWidth, position: 'relative' }}><div className={logoStyling}>
                <TopLogo src={p?.logo || ''} width={width} height={height} /></div>
            </div>
        );
    } else if (screenSize.width >= 768) {
        return (<></>)
    } else {
        return (<TopLogo src={p?.logo || ''} width={117} height={72} />)
    }
}

export default LogoLittle;
