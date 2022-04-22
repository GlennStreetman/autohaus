import { useState, useEffect } from "react";
import produce from "immer";
import { useSession, signIn, signOut } from "next-auth/react";
import LabeledInput from "./../labeledInput";
import LabeledSelect from "./../labeledSelect";

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

interface props {
    show: boolean;
}

function ServiceRequests(p: props) {
    const { data: session } = useSession();
    const [serviceRequests, setServiceRequests] = useState<serviceReq[]>([]); //returned data
    const [filterService, setFilterService] = useState(""); //text used to filter services
    const [showArchived, setShowArchived] = useState(false);
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const [filterField, setFilterField] = useState("email");
    const [showDetail, setShowDetail] = useState("-1");

    useEffect(() => {
        //update service
        if (session) {
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
                    // console.log("response", data);
                    setServiceRequests(data.records);
                });
        } else {
            // console.log("Session not found, aborting fetch.");
        }
    }, [filterField, filterService, showArchived, fromDate, toDate]);

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

    const filters = (
        <div className={p.show === true ? "col-span-12 flex flex-row gap-2" : "hidden"}>
            {filterDropDown}
            <LabeledInput
                id="serviceSearch"
                label={`Filter services by ${serviceFilters2[filterField]}:`}
                value={filterService}
                onClickCallback={setFilterService}
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
        <div className={p.show === true ? "col-span-12 flex flex-row gap-2" : "hidden"}>
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
        <div className={p.show === true ? "col-span-12 " : "hidden"}>
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

    return (
        <>
            {filters}
            {filterDates}
            {serviceRequestContainer}
        </>
    );
}

export default ServiceRequests;
