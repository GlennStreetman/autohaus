import { useState, useEffect, useContext } from "react";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { RiCheckboxBlankCircleFill, RiCheckboxBlankCircleLine } from "react-icons/ri";
import { ScreenWidth } from "../components/screenWidth";
import Image from "next/image";
import Link from "next/link";
import { service } from "../components/manager/ourServices";

export interface serviceBox {
    service: string;
    image: string;
    link: string | undefined;
}

const imgBox = "relative bg-black overflow-hidden h-52 w-52 xs:h-64 xs:w-64 md:h-64 md:w-64 lg:h-72 lg:w-72 xl::h-72 xl:w-72 ";

function mapServices(target: number, showCount: number, ourServices: serviceBox[]) {
    const selectServices = ourServices.slice(target, target + showCount);

    const mapSlides = Object.values(selectServices).map((el) => {
        return (
            <div key={el.service} className="flex flex-col cursor-pointer bg-red-600 hover:bg-accent">
                <Link href={el.link}>
                    <div>
                        <div className={imgBox}>
                            <a>
                                <Image
                                    src={`${process.env.NEXT_PUBLIC_AWS_PUBLIC_BUCKET_URL}${el.image}`}
                                    alt={`${el.service} picture`}
                                    layout="fill"
                                    objectFit="fill"
                                />
                            </a>
                        </div>
                        <div className="text-white font-primary font-bold text-center uppercase">{el.service}</div>
                    </div>
                </Link>
            </div>
        );
    });

    return mapSlides;
}

function updateTareget(change: number, target: number, setTarget: Function, showCount: number, ourServices: serviceBox[]) {
    const serviceCount = ourServices.length;
    if (target + change < 0) {
        return false;
    } else if (target + change > serviceCount - showCount) {
        return false;
    } else {
        setTarget(target + change);
    }
}

function makeDots(showCount: number, target: number, setTarget: Function, ourServices: serviceBox[]) {
    const serviceCount = ourServices.length;
    const dotCount = serviceCount - showCount + 1;
    const dotArray = Array.from({ length: dotCount }, (v, k) => k);
    const dotMap = Object.values(dotArray).map((el) => {
        if (el === target) {
            return (
                <RiCheckboxBlankCircleFill
                    className="text-accent cursor-pointer h-6 w-6"
                    key={`dots-${el}`}
                    onClick={(e) => {
                        e.preventDefault();
                        setTarget(el);
                    }}
                />
            );
        } else {
            return (
                <RiCheckboxBlankCircleLine
                    className="text-accent cursor-pointer h-6 w-6"
                    key={`dots-${el}`}
                    onClick={(e) => {
                        e.preventDefault();
                        setTarget(el);
                    }}
                />
            );
        }
    });
    return dotMap;
}

function setSlideCount(width: number, setShowCount: Function, setTarget: Function) {
    if (width < 728) {
        setTarget(0);
        setShowCount(1);
    } else if (width < 1028) {
        setTarget(0);
        setShowCount(2);
    } else if (width < 1536) {
        setTarget(0);
        setShowCount(3);
    } else {
        setTarget(0);
        setShowCount(4);
    }
}

function preventDoubleClick(e) {
    e.preventDefault();
}

interface props {
    services: service[];
}

function CustomCarousel(p: props) {
    const [target, setTarget] = useState(0);
    const [showCount, setShowCount] = useState(4);
    const screenSize = useContext(ScreenWidth);

    const ourServices: serviceBox[] = p.services.map((el) => {
        return {
            service: el.bannertext,
            image: el.bannerimage,
            link: `/services/${el.name.replace(/[^a-z0-9+]+/gi, "")}`,
        };
    });

    useEffect(() => {
        setSlideCount(screenSize.width, setShowCount, setTarget);
    }, [screenSize.width]);

    return (
        <>
            <div className="flex flex-inline justify-center p-2 gap-2">
                <div className="bg-slate-200 text-primary hover:text-white hover:bg-accent  rounded-md flex justify-center" onMouseDown={preventDoubleClick}>
                    <AiOutlineArrowLeft
                        className="h-auto w-7 cursor-pointer"
                        onClick={(e) => {
                            e.preventDefault();
                            updateTareget(-1, target, setTarget, showCount, ourServices);
                        }}
                    />
                </div>
                <div className="flex flex-row gap-2">{mapServices(target, showCount, ourServices)}</div>
                <div className="bg-slate-200 text-primary hover:text-white hover:bg-accent rounded-md flex justify-center" onMouseDown={preventDoubleClick}>
                    <AiOutlineArrowRight
                        className="h-auto w-7 cursor-pointer"
                        onClick={(e) => {
                            e.preventDefault();
                            updateTareget(+1, target, setTarget, showCount, ourServices);
                        }}
                    />
                </div>
            </div>
            <div className="flex justify-center">{makeDots(showCount, target, setTarget, ourServices)}</div>
        </>
    );
}

export default CustomCarousel;
