import { useState, useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import produce from "immer";
import download from "downloadjs";

import Banner from "../components/banner";
import NextLinkButton from "../components/nextLinkButton";
import IconButton from "../components/iconButton";
import LabeledInput from "../components/labeledInput";

import { GrUserManager } from "react-icons/gr";
import { MdAlternateEmail, MdMiscellaneousServices } from "react-icons/md";
import { BsPeople } from "react-icons/bs";
import { GoCalendar } from "react-icons/go";

const smallTextStyling = `text-white font-heading bold text-1xl sm:text-2xl lg:text-3xl [text-shadow:2px_2px_rgba(0,0,0,1)] antialiased`;
const largeTextStyling = `text-white font-heading bold text-3xl sm:text-4xl lg:text-6xl3 [text-shadow:2px_2px_rgba(0,0,0,1)] antialiased `;

const gutter = "col-span-0 lg:col-span-1 xl:col-span-1"; //2x
const body = "col-span-12 lg:col-span-10 xl:col-span-10 mb-4"; //1x
const big = " col-span-12 lg:col-span-6";
const medium = "col-span-12 lg:col-span-4";
const small = "col-span-6 lg:col-span-3";

const serviceFilters = {
    ["Email"]: "email",
    ["Phone"]: "phone",
    ["First Name"]: "firstname",
    ["Last Name"]: "lastname",
};

interface serviceReq {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    phone: string;
    prefdate: string;
    preftime: string;
    altdate: string;
    alttime: string;
    make: string;
    model: string;
    modelyear: string;
    reason: string;
    requestdate: string;
    archive: boolean;
}

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

function manager() {
    const { data: session } = useSession();
    const [menu, setMenu] = useState("service"); //service, resume, holidays
    const [serviceRequests, setServiceRequests] = useState<serviceReq[]>([]); //returned data
    const [filterService, setFilterService] = useState(""); //text used to filter services
    const [resumes, setResumes] = useState<resumes[]>([]); //returned data
    const [filterResumes, setFilterResumes] = useState(""); //text used to filter resumes
    const [showArchived, setShowArchived] = useState(false);
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const [filterField, setFilterField] = useState("Email");
    const [showDetail, setShowDetail] = useState("-1");

    useEffect(() => {
        const data = {
            archived: showArchived, //show archived?
            filterField: filterField, //which value to filter by
            filterService: filterService, //filter text for servicess
            fromDate: fromDate, //min date
            toDate: toDate, //max date
        };

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
    }, []);

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
            console.log("Session not found, aborting fetch.");
        }
    }, [menu, filterField, filterService, showArchived, fromDate, toDate]);

    useEffect(() => {
        //update resumes
        if (menu === "resume" && session) {
            const data = {
                archived: showArchived, //show archived?
                filterField: filterField, //which value to filter by
                filterService: filterService, //filter text for servicess
                fromDate: fromDate, //min date
                toDate: toDate, //max date
            };

            fetch(`/api/getResumes`, {
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
                    setResumes(data.records);
                });
        } else {
            console.log("Session not found, aborting fetch.");
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

    function archiveService(target) {
        const data = {
            archived: !serviceRequests[target].archive,
            table: "servicerequests",
            record: serviceRequests[target].id,
        };

        fetch("/api/updateArchived", {
            method: "POST",
            body: JSON.stringify(data),
        })
            .then((response) => {
                console.log("status", response.status);
                return [response.json(), response.status];
            })
            .then(([data, status]) => {
                if (status === 200) {
                    const nextState = produce<serviceReq[]>(serviceRequests, (draft) => {
                        draft[target].archive = !draft[target].archive;
                    });
                    setServiceRequests(nextState);
                } else {
                    console.log("problem archiving", status);
                }
            });
    }

    const mapServiceRequests = Object.entries(serviceRequests).map(([key, val]) => {
        const display = key === showDetail ? "" : "hidden";
        const clickDetail = () => {
            key === showDetail ? setShowDetail("-1") : setShowDetail(key);
        };
        return (
            <>
                <tr key={`${key}-table`}>
                    <td onClick={clickDetail}>{val.requestdate.slice(0, 10)}</td>
                    <td onClick={clickDetail}>{val.firstname}</td>
                    <td onClick={clickDetail}>{val.lastname}</td>
                    <td onClick={clickDetail}>{val.email}</td>
                    <td onClick={clickDetail}>{val.phone}</td>
                    <td onClick={clickDetail}>{val.prefdate}</td>
                    <td onClick={clickDetail}>{val.preftime}</td>
                    <td onClick={clickDetail}>{val.altdate}</td>
                    <td onClick={clickDetail}>{val.alttime}</td>
                    <td onClick={clickDetail}>{val.make}</td>
                    <td onClick={clickDetail}>{val.model}</td>
                    <td onClick={clickDetail}>{val.modelyear}</td>
                    <td className="text-center">
                        <input
                            className=""
                            type="checkbox"
                            checked={val.archive}
                            onClick={() => {
                                archiveService(key);
                            }}
                        />
                    </td>
                </tr>
                <tr key={`${key}-detail`}>
                    <td className={`${display}`} colSpan={13}>
                        <p>{val.reason}</p>
                    </td>
                </tr>
            </>
        );
    });

    const serviceRequestContainer = (
        <div className="col-span-12">
            <table className="w-full">
                <thead>
                    <tr>
                        <td>Request Date</td>
                        <td>First Name</td>
                        <td>Last Name</td>
                        <td>Email</td>
                        <td>Phone</td>
                        <td>Pref Date</td>
                        <td>Pref Time</td>
                        <td>Alt Date</td>
                        <td>Alt Time</td>
                        <td>Make</td>
                        <td>Model</td>
                        <td>Year</td>
                        <td>Archived</td>
                    </tr>
                </thead>
                <tbody>{mapServiceRequests}</tbody>
            </table>
        </div>
    );

    async function getResume(e, fileKey) {
        e.preventDefault();

        fetch(`api/getFile/?fileKey=${fileKey}`)
            .then((res) => res.blob())
            .then((blob) => {
                var a = document.createElement("a");
                document.body.appendChild(a);
                let url = window.URL.createObjectURL(blob);
                a.href = url;
                a.download = fileKey;
                a.click();
                window.URL.revokeObjectURL(url);
            });
    }

    const mapResumes = Object.entries(resumes).map(([key, val]) => {
        const display = key === showDetail ? "" : "hidden";
        const clickDetail = () => {
            key === showDetail ? setShowDetail("-1") : setShowDetail(key);
        };
        return (
            <>
                <tr key={`${key}-table`}>
                    <td onClick={clickDetail}>{val.submitdate.slice(0, 10)}</td>
                    <td onClick={clickDetail}>{val.firstname}</td>
                    <td onClick={clickDetail}>{val.lastname}</td>
                    <td onClick={clickDetail}>{val.email}</td>
                    <td onClick={clickDetail}>{val.phone}</td>
                    <td onClick={clickDetail}>{val.address1}</td>
                    <td onClick={clickDetail}>{val.address2}</td>
                    <td onClick={clickDetail}>{val.city}</td>
                    <td onClick={clickDetail}>{val.state1}</td>
                    <td onClick={clickDetail}>{val.zip}</td>
                    <td>
                        <button onClick={(e) => getResume(e, val.filename)}>{val.filename}</button>
                    </td>
                    <td className="text-center">
                        <input
                            className=""
                            type="checkbox"
                            checked={val.archive}
                            onClick={() => {
                                archiveService(key);
                            }}
                        />
                    </td>
                </tr>
                <tr key={`${key}-detail`}>
                    <td className={`${display}`} colSpan={13}>
                        <p>{val.coverletter}</p>
                    </td>
                </tr>
            </>
        );
    });

    const resumesContainer = (
        <div className="col-span-12">
            <table className="w-full">
                <thead>
                    <tr>
                        <td>Submit Date</td>
                        <td>First Name</td>
                        <td>Last Name</td>
                        <td>Email</td>
                        <td>Phone</td>
                        <td>Address1</td>
                        <td>Address2</td>
                        <td>City</td>
                        <td>State</td>
                        <td>zip</td>
                        <td>Resume</td>
                        <td>Archived</td>
                    </tr>
                </thead>
                <tbody>{mapResumes}</tbody>
            </table>
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
                            {menu === "service" ? serviceRequestContainer : <></>}
                            {menu === "resume" ? resumesContainer : <></>}
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
