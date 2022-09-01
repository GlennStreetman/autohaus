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

interface serviceProps {
    link: string,
    service: string,
    image: string,
    target: number,
    sunset: number,
}

function ServiceBox(p:serviceProps){

    const [fade, setFade] = useState('opacity-0')
    const [resetFade, setResetFade] = useState(false)
    // const [firstRender, setFirstRender] = useState(true)

    useEffect(()=>{
                setFade('fadeIn')
                setResetFade(false)
    },[])

    useEffect(()=>{
        if (resetFade === true) {
                setFade('fadeIn')
                setResetFade(false)
    }
    },[resetFade])

    useEffect(()=>{
        if (p.sunset !== 0) {
            setFade('blackOut')
            setResetFade(true)
        }
    },[p.sunset])

    return (
        <div className={fade}>
            <Link href={p.link}>
            <div className="flex flex-col cursor-pointer bg-red-600 hover:bg-accent w-[208px] xs:w-[256px] md:w-[256px] lg:w-[288px] xl:w-[288px] h-52 xs:h-64 md:h-64 lg:h-72 xl::h-72">
                <div className='relative grow bg-black overflow-hidden'>
                        <Image
                            src={`${process.env.NEXT_PUBLIC_AWS_PUBLIC_BUCKET_URL}${p.image}`}
                            alt={`${p.service} picture`}
                            layout="fill"
                            objectFit="fill"
                        />
                </div>
                <div className="text-white font-primary font-bold text-center uppercase z-10">{p.service}</div>
            </div>
        </Link>
    </div>
    )
}

interface mapProps {
    target: number, 
    showCount: number, 
    ourServices: serviceBox[]
    sunset: number
    setDetectHover: Function
}

function MappedServices(p: mapProps) {
    const selectServices = p.ourServices.slice(p.target, p.target + p.showCount);

    const mapSlides = Object.values(selectServices).map((el) => {
        return (<div onMouseOver={()=>{p.setDetectHover(true)}} onMouseLeave={()=>{p.setDetectHover(false)}} key={`${el.service}`}>
            <ServiceBox link={el.link} service={el.service} image={el.image} target={p.target} sunset={p.sunset} />
        </div>);
    });

    return <>{mapSlides}</>;
}


interface dotProps {
    showCount: number, 
    target: number, 
    setTarget: Function, 
    ourServices: serviceBox[], 
    setFirstClick: Function
}

function MakeDots(p: dotProps) {
    const serviceCount = p.ourServices.length;
    const dotCount = serviceCount - p.showCount + 1;
    const dotArray = Array.from({ length: dotCount }, (v, k) => k);
    console.log('serviceCount', serviceCount, 'dotCount', dotCount, 'dotArray', dotArray)
    const dotMap = Object.values(dotArray).map((el) => {
        if (el === p.target) {
            return (
                <RiCheckboxBlankCircleFill
                    className="text-accentRed cursor-pointer h-6 w-6"
                    key={`dots-${el}`}
                    onClick={(e) => {
                        e.preventDefault();
                        p.setTarget(el);
                        p.setFirstClick(true)
                    }}
                />
            );
        } else {
            return (
                <RiCheckboxBlankCircleLine
                    className="text-accentRed cursor-pointer h-6 w-6"
                    key={`dots-${el}`}
                    onClick={(e) => {
                        e.preventDefault();
                        p.setTarget(el);
                        p.setFirstClick(true)
                    }}
                />
            );
        }
    });
    return (<>{dotMap}</>)
}

function updateTareget(change: number, target: number, setTarget: Function, showCount: number, ourServices: serviceBox[], setSunset: Function) {
    
    setSunset()

    setTimeout(()=>{
        const serviceCount = ourServices.length;
        if (target + change < 0) {
            return setTarget( serviceCount - showCount);
        } else if (target + change > serviceCount - showCount) {
            return setTarget(0);
        } else {
            setTarget(target + change);
        }
    }, 500)
}

function setSlideCount(width: number, setShowCount: Function, setTarget: Function) {
    if (width < 728) {
        setTarget(0);
        setShowCount(1);
    } else if (width < 1028) {
        setTarget(0);
        setShowCount(2);
    } else if (width < 1028) {
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
    const [firstClick, setFirstClick] = useState(false)
    const [sunset, setSunset] = useState(0)
    const [detectHover, setDetectHover] = useState(false)

    const screenSize = useContext(ScreenWidth);
    
    const ourServices: serviceBox[] = p.services.map((el) => {
        return {
            service: el.bannertext,
            image: el.bannerimage,
            link: `/services/${el.name.replace(/[^a-z0-9+]+/gi, "")}`,
        };
    });
    
    const incrmenetSunset = ()=>{
        setSunset(sunset+1)
    }

    useEffect(() => {
        setSlideCount(screenSize.width, setShowCount, setTarget);
    }, [screenSize.width]);

    useEffect(()=>{
        const rotate = setInterval(()=>{
            if (!firstClick && ourServices.length > showCount && !detectHover) updateTareget(+1, target, setTarget, showCount, ourServices, incrmenetSunset);
        }, 8000)

        return function cleanup(){
            clearInterval(rotate)
        }
    })

    return (
        <>
            <div className="flex flex-inline justify-center p-2 gap-2">
                <div 
                    className="bg-slate-200 text-primary hover:text-white hover:bg-accent  rounded-md flex justify-center" 
                    onMouseDown={preventDoubleClick}
                    onMouseOver={()=>{setDetectHover(true)}}
                    onMouseLeave={()=>{setDetectHover(false)}}
                >
                    {showCount <= ourServices.length  ? <AiOutlineArrowLeft
                        className="h-auto w-7 cursor-pointer"
                        onClick={(e) => {
                            e.preventDefault();
                            updateTareget(-1, target, setTarget, showCount, ourServices, incrmenetSunset);
                            setFirstClick(true)
                        }}
                    /> : <></>}
                </div>
                <div className="flex flex-row gap-2">
                    <MappedServices target={target} showCount={showCount} ourServices={ourServices} sunset={sunset} setDetectHover={setDetectHover} />
                </div>
                <div 
                    className="bg-slate-200 text-primary hover:text-white hover:bg-accent rounded-md flex justify-center" 
                    onMouseDown={preventDoubleClick}                         
                    onMouseOver={()=>{setDetectHover(true)}}
                    onMouseLeave={()=>{setDetectHover(false)}}
                >
                    {showCount <= ourServices.length  ? <AiOutlineArrowRight
                        className="h-auto w-7 cursor-pointer"
                        onClick={(e) => {
                            e.preventDefault();
                            updateTareget(+1, target, setTarget, showCount, ourServices, incrmenetSunset);
                            setFirstClick(true)
                        }}


                    />: <></> }
                </div>
            </div>
            <div className="flex justify-center"><MakeDots showCount={showCount} target={target} setTarget={setTarget} ourServices={ourServices} setFirstClick={setFirstClick} /></div>
        </>
    );
}

export default CustomCarousel;
