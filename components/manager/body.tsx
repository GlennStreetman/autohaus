import { useContext } from "react";
import Holidays from "./holidays";
import Resumes from "./resumes";
import ServiceRequests from "./serviceRequests";
import Team from "./team";
import OurServices from "./ourServices";
import IconButton from "../iconButton";
import Banner from "../banner";
import NextLinkButton from "../nextLinkButton";
import { ScreenWidth } from "../screenWidth";

import { useState } from "react";
import { useSession } from "next-auth/react";

import { GrUserManager } from "react-icons/gr";
import { MdMiscellaneousServices, MdOutlineMedicalServices } from "react-icons/md";
import { BsPeople } from "react-icons/bs";
import { GoCalendar } from "react-icons/go";
import { AiOutlineTeam } from "react-icons/ai";

const smallTextStyling = `text-white font-heading bold text-1xl sm:text-2xl lg:text-3xl [text-shadow:2px_2px_rgba(0,0,0,1)] antialiased`;
const largeTextStyling = `text-white font-heading bold text-3xl sm:text-4xl lg:text-6xl3 [text-shadow:2px_2px_rgba(0,0,0,1)] antialiased `;

const gutter = "col-span-0 lg:col-span-1 xl:col-span-1"; //2x
const body = "col-span-12 lg:col-span-10 xl:col-span-10 mb-4"; //1x
// const big = " col-span-12 lg:col-span-6";
// const medium = "col-span-12 lg:col-span-4";
// const small = "col-span-6 lg:col-span-3";

function Body() {
    const { data: session } = useSession();
    const [menu, setMenu] = useState("service"); //service, resume, holidays
    const screenSize = useContext(ScreenWidth);

    const selectors = (
        <div className="col-span-12 flex flex-wrap gap-2">
            <IconButton
                highlight={menu === "service" ? true : false}
                text="Service Requests"
                callback={() => {
                    setMenu("service");
                }}
                icon={<MdMiscellaneousServices className={screenSize.width >= 500 ? "h-7 w-7" : "h-5 w-5"} />}
            />
            {/* </div> */}
            {/* <div className="col-span-6 flex justify-center"> */}
            <IconButton
                highlight={menu === "resume" ? true : false}
                text="Resumes"
                callback={() => {
                    setMenu("resume");
                }}
                icon={<BsPeople className={screenSize.width >= 500 ? "h-7 w-7" : "h-5 w-5"} />}
            />
            <IconButton
                highlight={menu === "holidays" ? true : false}
                text="holidays"
                callback={() => {
                    setMenu("holidays");
                }}
                icon={<GoCalendar className={screenSize.width >= 500 ? "h-7 w-7" : "h-5 w-5"} />}
            />
            <IconButton
                highlight={menu === "team" ? true : false}
                text="Team"
                callback={() => {
                    setMenu("team");
                }}
                icon={<AiOutlineTeam className={screenSize.width >= 500 ? "h-7 w-7" : "h-5 w-5"} />}
            />
            <IconButton
                highlight={menu === "ourservices" ? true : false}
                text="Our Services"
                callback={() => {
                    setMenu("ourservices");
                }}
                icon={<MdOutlineMedicalServices className={screenSize.width >= 500 ? "h-7 w-7" : "h-5 w-5"} />}
            />
        </div>
    );

    // @ts-ignore
    if (session && session.user.role === "admin") {
        //IF LOGGED IN.
        return (
            <>
                <Banner>
                    <div>
                        <div className={largeTextStyling}>Management Portal</div>
                        <div className={smallTextStyling}>User: {session.user.email}</div>
                    </div>
                </Banner>
                <div className="grid grid-row grid-cols-12 p-1">
                    <div className={gutter} />
                    <div className={body}>
                        <div className="w-full min-h-52 p-2 justify-center grid grid-cols-12 gap-5">
                            {selectors}
                            <Holidays show={menu === "holidays" ? true : false} />
                            <ServiceRequests show={menu === "service" ? true : false} />
                            <Resumes show={menu === "resume" ? true : false} />
                            <Team show={menu === "team" ? true : false} />
                            <OurServices show={menu === "ourservices" ? true : false} />
                        </div>
                    </div>
                    <div className={gutter} />
                </div>
            </>
        );
        // @ts-ignore
    } else if (session && session.user.role !== "admin") {
        return (
            <>
                <Banner>
                    <div>
                        <div className={largeTextStyling}>Management Portal</div>
                        <div className={smallTextStyling}>Not signed in</div>
                    </div>
                </Banner>
                <div className="w-full h-52 p-2 flex justify-center ">
                    <div className="flex flex-col">
                        <div className="flex grow" />
                        Access Denied, contact support.
                        <div className="flex grow" />
                    </div>
                </div>
            </>
        );
    } else {
        //login link
        return (
            <>
                <Banner>
                    <div>
                        <div className={largeTextStyling}>Management Portal</div>
                        <div className={smallTextStyling}>Not signed in</div>
                    </div>
                </Banner>
                <div className="w-full h-52 p-2 flex justify-center ">
                    <div className="flex flex-col">
                        <div className="flex grow" />
                        <NextLinkButton text={"Sign into management portal"} icon={<GrUserManager className="h-7 w-7" />} link="/api/auth/signin" />
                        <div className="flex grow" />
                    </div>
                </div>
            </>
        );
    }
}

export default Body;
