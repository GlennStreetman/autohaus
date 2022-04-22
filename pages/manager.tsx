import { useState } from "react";
import { useSession } from "next-auth/react";
import Holidays from "../components/manager/holidays";
import Resumes from "../components/manager/resumes";
import ServiceRequests from "../components/manager/serviceRequests";

import Banner from "../components/banner";
import NextLinkButton from "../components/nextLinkButton";
import IconButton from "../components/iconButton";

import { GrUserManager } from "react-icons/gr";
import { MdMiscellaneousServices } from "react-icons/md";
import { BsPeople } from "react-icons/bs";
import { GoCalendar } from "react-icons/go";

const smallTextStyling = `text-white font-heading bold text-1xl sm:text-2xl lg:text-3xl [text-shadow:2px_2px_rgba(0,0,0,1)] antialiased`;
const largeTextStyling = `text-white font-heading bold text-3xl sm:text-4xl lg:text-6xl3 [text-shadow:2px_2px_rgba(0,0,0,1)] antialiased `;

const gutter = "col-span-0 lg:col-span-1 xl:col-span-1"; //2x
const body = "col-span-12 lg:col-span-10 xl:col-span-10 mb-4"; //1x
const big = " col-span-12 lg:col-span-6";
const medium = "col-span-12 lg:col-span-4";
const small = "col-span-6 lg:col-span-3";

interface resumes {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    phone: string;
    address1: string;
    address2: string;
    city: string;
    state1: string;
    zip: string;
    coverletter: string;
    archive: boolean;
    submitdate: string;
    filename: string;
}

interface holidays {
    id: number;
    targetdate: string;
    holiday: string;
    daysclosed: string;
}

function manager() {
    const { data: session } = useSession();
    const [menu, setMenu] = useState("service"); //service, resume, holidays

    const selectors = (
        <div className="col-span-12 flex gap-2">
            <IconButton
                highlight={menu === "service" ? true : false}
                text="Service Requests"
                callback={() => {
                    setMenu("service");
                }}
                icon={<MdMiscellaneousServices className="h-7 w-7" />}
            />
            {/* </div> */}
            {/* <div className="col-span-6 flex justify-center"> */}
            <IconButton
                highlight={menu === "resume" ? true : false}
                text="Resumes"
                callback={() => {
                    setMenu("resume");
                }}
                icon={<BsPeople className="h-7 w-7" />}
            />
            <IconButton
                highlight={menu === "holidays" ? true : false}
                text="holidays"
                callback={() => {
                    setMenu("holidays");
                }}
                icon={<GoCalendar className="h-7 w-7" />}
            />
        </div>
    );

    if (session) {
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
                        </div>
                    </div>
                    <div className={gutter} />
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

export default manager;
