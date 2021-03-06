import React, { useState, useEffect, useContext } from "react";
import produce from "immer";
import { useSession, signIn, signOut } from "next-auth/react";
import LabeledInput from "./../labeledInput";
import LabeledSelect from "./../labeledSelect";
import { filters } from "./../../pages/api/getResumes";
import { addDashes } from "./../../lib/formatPhone";
import { ScreenWidth } from "../screenWidth";
import OutlinedSurface from "./../outlinedSurface";

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

const serviceFilters = {
    ["Email"]: "email",
    ["Phone"]: "phone",
    ["First Name"]: "firstname",
    ["Last Name"]: "lastname",
};

const serviceFilters2 = {
    ["email"]: "Email",
    ["phone"]: "Phone",
    ["firstname"]: "First Name",
    ["lastname"]: "Last Name",
};

interface props {
    show: boolean;
}

function Resumes(p: props) {
    const { data: session } = useSession();
    const [resumes, setResumes] = useState<resumes[]>([]); //returned data
    const [filterResumes, setFilterResumes] = useState(""); //text used to filter resumes
    const [showArchived, setShowArchived] = useState(false);
    const [fromDate, setFromDate] = useState(" ");
    const [toDate, setToDate] = useState(" ");
    const [filterField, setFilterField] = useState("email");
    const [showDetail, setShowDetail] = useState("-1");
    const [limitResults, setLimitResults] = useState("20");

    const screenSize = useContext(ScreenWidth);

    useEffect(() => {
        //update resumes
        if (session) {
            const data: filters = {
                archived: showArchived, //show archived?
                filterField: filterField, //which value to filter by
                filterService: filterResumes, //filter text for servicess
                fromDate: fromDate !== " " ? fromDate : "", //min date
                toDate: toDate !== " " ? toDate : "", //max date
                limit: limitResults, //max returned
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
                    // console.log("response", data);
                    setResumes(data.records);
                });
        } else {
            console.log("Session not found, aborting fetch.");
        }
    }, [filterField, filterResumes, showArchived, fromDate, toDate, limitResults]);

    const mapFilterOptions = Object.entries(serviceFilters).map(([key, val]) => {
        return (
            <option key={`${key}-key`} value={val}>
                {key}
            </option>
        );
    });

    const filterDropDown = (
        <>
            <LabeledSelect
                label=""
                value={filterField}
                onClickCallback={(e) => {
                    setFilterField(e);
                }}
                id="newDay_ID"
            >
                {mapFilterOptions}
            </LabeledSelect>
        </>
    );

    const filtersFormat = screenSize.width <= 500 ? "col-span-12 flex flex-wrap  flex-row gap-2 mb-4" : "col-span-12 flex  flex-row gap-2 mb-4";
    const filters = (
        <div className={filtersFormat}>
            {filterDropDown}
            <LabeledInput
                id="resumeSearch"
                label={screenSize.width <= 500 ? `Filter:` : `Filter resumes by ${serviceFilters2[filterField]}:`}
                value={filterResumes}
                onClickCallback={setFilterResumes}
            />
            <div className={screenSize.width <= 500 ? "flex flex-row gap-1" : "flex flex-row justify-center m-auto gap-1"}>
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
        </div>
    );

    const mapResultLimit = Object.entries({ "10": "10", "20": "20", "40": "40", "60": "60", max: "max" }).map(([key, val]) => {
        return (
            <option key={`${key}-limit`} value={val}>
                {key}
            </option>
        );
    });

    const limitResultsSelect = (
        <>
            <LabeledSelect
                label="Results"
                value={limitResults}
                onClickCallback={(e) => {
                    console.log("LIMIT", e);
                    setLimitResults(e.toString());
                }}
                id="newDay_ID"
            >
                {mapResultLimit}
            </LabeledSelect>
        </>
    );

    const filterDates = (
        <div className="col-span-12 flex flex-wrap flex-row gap-2 mb-4">
            <div>
                <LabeledInput fieldType="date" id="fromdate" label="From Date" value={fromDate} onClickCallback={setFromDate} />
            </div>
            <div>
                <LabeledInput fieldType="date" id="toDate" label="To Date" value={toDate} onClickCallback={setToDate} />
            </div>
            <div>{limitResultsSelect}</div>
        </div>
    );

    function archiveResumes(target) {
        const data = {
            archived: !resumes[target].archive,
            table: "resumes",
            record: resumes[target].id,
        };

        fetch("/api/updateArchived", {
            method: "POST",
            body: JSON.stringify(data),
        })
            .then((response) => {
                return [response.json(), response.status];
            })
            .then(([data, status]) => {
                if (status === 200) {
                    const nextState = produce<resumes[]>(resumes, (draft) => {
                        draft[target].archive = !draft[target].archive;
                    });
                    setResumes(nextState);
                } else {
                    console.log("problem archiving", status);
                }
            });
    }

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
            <React.Fragment key={`${val.id}-empty-resumes`}>
                <tr key={`${key}-table`}>
                    <td onClick={clickDetail}>{val.submitdate.slice(0, 10)}</td>
                    <td onClick={clickDetail}>{val.firstname}</td>
                    <td onClick={clickDetail}>{val.lastname}</td>
                    <td>
                        <a href={`mailto:${val.email}`}>{val.email}</a>
                    </td>
                    <td>
                        <a href={`tel:${val.phone}`}>{addDashes(val.phone)}</a>
                    </td>
                    <td onClick={clickDetail}>{val.address1}</td>
                    <td onClick={clickDetail}>{val.address2}</td>
                    <td onClick={clickDetail}>{val.city}</td>
                    <td onClick={clickDetail}>{val.state1}</td>
                    <td onClick={clickDetail}>{val.zip}</td>
                    <td>
                        <button onClick={(e) => getResume(e, val.filename)}>
                            <a className="underline">{val.filename}</a>
                        </button>
                    </td>
                    <td className="text-center">
                        <input
                            className=""
                            type="checkbox"
                            checked={val.archive}
                            onChange={() => {
                                archiveResumes(key);
                            }}
                        />
                    </td>
                </tr>
                <tr key={`${key}-detail`}>
                    <td className={`${display}`} colSpan={13}>
                        <p>{val.coverletter}</p>
                    </td>
                </tr>
            </React.Fragment>
        );
    });

    const resumesContainer = (
        <div className="col-span-12 overflow-auto">
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

    return (
        <div className={p.show === true ? "col-span-12 overflow-auto" : "hidden"}>
            <OutlinedSurface label="Review Resumes">
                {filters}
                {filterDates}
                {resumesContainer}
            </OutlinedSurface>
        </div>
    );
}

export default Resumes;
