import { useState, useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import Banner from "../components/banner";
import NextLinkButton from "../components/nextLinkButton";
import IconButton from "../components/iconButton";
import LabeledInput from "../components/labeledInput";

import { GrUserManager } from "react-icons/gr";
import { MdAlternateEmail, MdMiscellaneousServices } from "react-icons/md";
import { BsPeople } from "react-icons/bs";

const smallTextStyling = `text-white font-heading bold text-1xl sm:text-2xl lg:text-3xl [text-shadow:2px_2px_rgba(0,0,0,1)] antialiased`;
const largeTextStyling = `text-white font-heading bold text-3xl sm:text-4xl lg:text-6xl3 [text-shadow:2px_2px_rgba(0,0,0,1)] antialiased `;

const gutter = "col-span-0 lg:col-span-1 xl:col-span-2"; //2x
const body = "col-span-12 lg:col-span-10 xl:col-span-8 mb-4"; //1x
const big = " col-span-12 lg:col-span-6";
const medium = "col-span-12 lg:col-span-4";
const small = "col-span-6 lg:col-span-3";

const serviceFilters = {
    ["Email"]: "email",
    ["Phone"]: "phone",
    ["First Name"]: "firstname",
    ["Last Name"]: "lastname",
};

function manager() {
    const { data: session } = useSession();
    const [menu, setMenu] = useState("service"); //service or resume selector
    const [serviceRequests, setServiceRequests] = useState([]); //returned data
    const [filterService, setFilterService] = useState(""); //text used to filter services
    const [resumes, setResumes] = useState({}); //returned data
    const [filterResumes, setFilterResumes] = useState(""); //text used to filter resumes
    const [showArchived, setShowArchived] = useState(false);
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const [filterField, setFilterField] = useState("Email");

    // useEffect(() => {
    //     console.log("setting up event listener");
    //     const listen = document.getElementById("testid");
    //     console.log(document, listen);
    //     const myObject = {
    //         handleEvent: (event) => {
    //             console.log("type", event.type, event.value, listen.value);
    //             // console.log("value", listen.value);
    //         },
    //     };
    //     if (listen) listen.addEventListener("click", myObject);
    // }, [session]);

    useEffect(() => {
        //update service
        if (menu === "service" && session) {
            const data = {
                archived: showArchived, //show archived?
                filterField: filterField, //which value to filter by
                filterService: filterService, //filter text for servicess
                fromDate: fromDate, //min date
                toDate: toDate, //max date
            };
            if (menu === "service") {
                fetch(`/api/getServiceRequests`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "User-Agent": "*",
                    },

                    body: JSON.stringify(data),
                })
                    .then((response) => response.json())
                    .then((data) => {
                        console.log("response", data);
                        setServiceRequests(data.records);
                    });
            } else {
                console.log("no session");
            }
        }
    }, [menu, filterField, filterService, showArchived, fromDate, toDate]);

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
        </div>
    );

    const mapFilterOptions = Object.entries(serviceFilters).map(([key, val]) => {
        return (
            <option key={`${key}-key`} value={val}>
                {key}
            </option>
        );
    });

    const filterDropDown = (
        <>
            {/* <label htmlFor="filter_DD">Filter: </label> */}
            <select
                value={filterField}
                onChange={(e) => {
                    setFilterField(e.target.value);
                }}
                id="filter_DD"
            >
                {mapFilterOptions}
            </select>
        </>
    );

    const filters = (
        <div className="col-span-12 flex flex-row gap-2">
            {filterDropDown}
            <LabeledInput
                id="filter"
                label={`Filter ${menu}:`}
                value={menu === "service" ? filterService : filterResumes}
                onClickCallback={menu === "service" ? setFilterService : setFilterResumes}
            />
            <div className="flex flex-row justify-center m-auto gap-1">
                <label htmlFor="checkbox">{`Archived:`}</label>
                <input
                    className="h-7 w-7 m-auto"
                    type="checkbox"
                    checked={showArchived}
                    onChange={() => {
                        setShowArchived(!showArchived);
                    }}
                />
            </div>
            {/*  */}
        </div>
    );

    const filterDates = (
        <div className="col-span-12 flex flex-row gap-2">
            <div>
                <LabeledInput fieldType="date" id="fromdate" label="From Date" value={fromDate} onClickCallback={setFromDate} helperText="From Date:" />
            </div>
            <div>
                <LabeledInput fieldType="date" id="toDate" label="To Date" value={toDate} onClickCallback={setToDate} helperText="To Date:" />
            </div>
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
                            {filters}
                            {filterDates}
                            <div className="col-span-12 bg-yellow-500">body</div>
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
