import { useState, useEffect, useContext } from "react";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { RiCheckboxBlankCircleFill, RiCheckboxBlankCircleLine } from "react-icons/ri";
import { ScreenWidth } from "../components/screenWidth";
import Image from "next/image";

export interface services {
    service: string;
    image: string;
    link: string | undefined;
}

const ourServices: services[] = [
    {
        service: "oil change",
        image: "/oil.jpg",
        link: undefined,
    },
    {
        service: "preventative maint",
        image: "/prevent.jpg",
        link: undefined,
    },
    {
        service: "brake repair",
        image: "/brake.jpg",
        link: undefined,
    },
    {
        service: "steering/suspension",
        image: "/steering.jpg",
        link: undefined,
    },
    {
        service: "transmission",
        image: "/trans.jpg",
        link: undefined,
    },
    {
        service: "diagnostics",
        image: "/diagnostic.jpg",
        link: undefined,
    },
];

const imgBox = "relative bg-black overflow-hidden h-52 w-52 xs:h-64 xs:w-64 md:h-64 md:w-64 lg:h-72 lg:w-72 xl::h-72 xl:w-72 ";

function mapServices(target: number, showCount: number) {
    const selectServices = ourServices.slice(target, target + showCount);

    const mapSlides = Object.values(selectServices).map((el) => {
        return (
            <div key={el.service} className="flex flex-col cursor-pointer bg-red-600 hover:bg-accent">
                <div className={imgBox}>
                    <Image src={el.image} alt={`${el.service} picture`} layout="fill" objectFit="fill" />
                </div>
                <div className="text-white font-primary font-bold text-center uppercase">{el.service}</div>
            </div>
        );
    });

    return mapSlides;
}

function updateTareget(change: number, target: number, setTarget: Function, showCount: number) {
    const serviceCount = ourServices.length;
    if (target + change < 0) {
        // console.log("no change1");
        return false;
    } else if (target + change > serviceCount - showCount) {
        // console.log("no change2");
        return false;
    } else {
        // console.log("Change!");
        setTarget(target + change);
    }
}

function makeDots(showCount: number, target: number, setTarget: Function) {
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

function customCarousel() {
    const [target, setTarget] = useState(0);
    const [showCount, setShowCount] = useState(4);
    const screenSize = useContext(ScreenWidth);

    useEffect(() => {
        setSlideCount(screenSize.width, setShowCount, setTarget);
    }, [screenSize.width]);

    return (
        <>
            <div className="flex flex-inline justify-center p-2 gap-2">
                <div className="bg-slate-200 text-primary hover:text-accent rounded-md flex justify-center" onMouseDown={preventDoubleClick}>
                    <AiOutlineArrowLeft
                        className="h-auto w-7 cursor-pointer"
                        onClick={(e) => {
                            e.preventDefault();
                            updateTareget(-1, target, setTarget, showCount);
                        }}
                    />
                </div>
                <div className="flex flex-row gap-2">{mapServices(target, showCount)}</div>
                <div className="bg-slate-200 text-primary hover:text-accent rounded-md flex justify-center" onMouseDown={preventDoubleClick}>
                    <AiOutlineArrowRight
                        className="h-auto w-7 cursor-pointer"
                        onClick={(e) => {
                            e.preventDefault();
                            updateTareget(+1, target, setTarget, showCount);
                        }}
                    />
                </div>
            </div>
            <div className="flex justify-center">{makeDots(showCount, target, setTarget)}</div>
        </>
    );
}

export default customCarousel;
