import { useState, useEffect, useContext, useRef } from "react";
import { useSession } from "next-auth/react";
import LabeledInput from "./../labeledInput";
import LabeledSelect from "./../labeledSelect";
import { ScreenWidth } from "../screenWidth";
import { BiUpload } from "react-icons/bi";
import { AiFillCheckCircle } from "react-icons/ai";
import { HiOutlineEmojiSad } from "react-icons/hi";

interface employees {
    id: number;
    name: string;
    title: string;
    description: string;
    filename: string; //file name
    ordernumber: string;
}

import React from "react";
import { json } from "stream/consumers";

interface props {
    show: boolean;
}

function team(p: props) {
    const { data: session } = useSession();
    const [employees, setEmployees] = useState<employees[]>([]);
    const [empName, setEmpName] = useState("");
    const [empTitle, setEmpTitle] = useState("");
    const [empDescription, setEmpDescription] = useState("");
    const [empPictureRef, setEmpPictureRef] = useState<any>("pass");
    const [empPictureName, setEmpPictureName] = useState("");
    const [requestAdditional, setRequestAdditional] = useState(false);
    const inputReference = useRef<HTMLInputElement>(null);
    const [showDetail, setShowDetail] = useState("-1");
    const [edit, setEdit] = useState<false | employees>(false);
    const [serverMsg, setServerMsg] = useState("");

    useEffect(() => {
        //update service
        if (session) {
            fetch(`/api/getEmployees`)
                .then((response) => response.json())
                .then((data) => {
                    setEmployees(data.employees);
                });
        } else {
            console.log("Session not found, aborting team fetch.");
        }
    }, []);

    const screenSize = useContext(ScreenWidth);

    function fileUploadAction() {
        if (inputReference.current !== null) inputReference.current.click();
    }

    function dropHandler(ev) {
        console.log("File(s) dropped");
        ev.preventDefault();
        if (ev.dataTransfer.items) {
            // Use DataTransferItemList interface to access the file(s)
            if (ev.dataTransfer.items[0].kind === "file") {
                var file = ev.dataTransfer.items[0].getAsFile();
                const data = new FormData();
                data.append("file", file);
                setEmpPictureRef(data);
                setEmpPictureName(file.name);
            }
        } else {
            // Use DataTransfer interface to access the file(s)
            const data = new FormData();
            data.append("file", ev.dataTransfer.files[0]);
            setEmpPictureRef(data);
            setEmpPictureName(ev.dataTransfer.files[0].name);
            console.log("... file[" + 0 + "].name = " + ev.dataTransfer.files[0].name);
        }
    }

    function checkFileName() {
        if (empPictureName !== "" && ["png", "jpg", "svg"].includes(empPictureName.split(".").pop())) {
            return { upload: true, msg: `Ready to submit: ${empPictureName}` };
        } else if (empPictureName !== "" && !["png", "jpg", "svg"].includes(empPictureName.split(".").pop())) {
            return { upload: false, msg: `Please submit an image file ending in .png, .jpg, or .svg` };
        } else {
            return { upload: false, msg: `<-- Drop picture here or Click-->` };
        }
    }

    function selectFile(e) {
        e.preventDefault();
        const data = new FormData();
        data.append("file", e.target.files[0]);
        setEmpPictureRef(data);
        setEmpPictureName(e.target.files[0].name);
    }

    function processRequest(e) {
        e.preventDefault();
        let processRequest = true;
        if (empName === "") processRequest = false;
        if (empTitle === "") processRequest = false;
        if (empDescription === "") processRequest = false;

        if (processRequest) {
            //all tests passed.
            // console.log("requests passed.");
            setRequestAdditional(false);
            postEmployee();
        } else {
            setRequestAdditional(true);
            console.log("problem processing request");
        }
    }

    function postEmployee() {
        if (checkFileName().upload) {
            const data = empPictureRef;
            data.append("name", empName);
            data.append("title", empTitle);
            data.append("description", empDescription);
            if (edit) data.append("id", edit.id);

            fetch(`/api/submitEmployee`, {
                method: "POST", // or 'PUT'
                body: data,
            })
                .then(async (res) => {
                    if (res.status === 413) {
                        setServerMsg("Choose file 1mb or smaller.");
                    } else {
                        return res.json();
                    }
                })
                .then((data) => {
                    if (data.msg === "success") {
                        setEmployees(data.employees);
                        setEdit(false);
                        cancelRequest();
                    } else {
                        setServerMsg(data.msg);
                    }
                })
                .catch((err) => {
                    console.log("error submitting employee update", err);
                });
        } else if (edit !== false) {
            let queryString = `/api/submitEmployee?name=${empName}&title=${empTitle}&description=${empDescription}&id=${edit.id}`;
            fetch(queryString)
                .then((res) => {
                    console.log("status", res.status);
                    return res.json();
                })
                .then((data) => {
                    if (data.msg === "success") {
                        setEmployees(data.employees);
                        setEdit(false);
                        cancelRequest();
                    } else {
                        setServerMsg(data.msg);
                    }
                })
                .catch((err) => {
                    console.log("error getting update", err);
                });
        }
    }

    function cancelRequest() {
        setEmpName("");
        setEmpTitle("");
        setEmpDescription("");
        setEmpPictureRef("");
        setEmpPictureName("");
        setEdit(false);
        setServerMsg("");
    }

    const filtersFormat = screenSize.width <= 700 ? "col-span-12 flex flex-wrap flex-row gap-2 mb-4" : "col-span-12 flex flex-row gap-2  mb-4";
    const addTeamMember = (
        <div className="mt-4">
            <div className={filtersFormat}>
                <LabeledInput id="empName_add" label="Full Name" value={empName} onClickCallback={setEmpName} />
                <LabeledInput id="empTitle_id" label={`Employee Title`} value={empTitle} onClickCallback={setEmpTitle} />
            </div>

            <div className="col-span-12 border-2 p-2 relative mb-4">
                <label className="absolute -top-4 left-4 z-2  text-accent bg-primary">Employee Descriptions:</label>
                <textarea
                    rows={6}
                    className="bg-primary outline-none w-full"
                    value={empDescription}
                    onChange={(e) => {
                        e.preventDefault();
                        setEmpDescription(e.target.value);
                    }}
                />
            </div>

            <div
                id="drop_zone"
                className="col-span-12 border-2 p-2 relative bg-slate-100 cursor-pointer h-32 flex flex-col place-content-center mb-4"
                onClick={fileUploadAction}
                onDrop={dropHandler}
                onDragOver={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                }}
            >
                <input type="file" className="hidden" ref={inputReference} onChange={selectFile} />
                <div className="flex justify-center">
                    {empPictureName === "" ? <BiUpload className="h-7 w-7" /> : <></>}
                    {empPictureName !== "" && checkFileName().upload === true ? <AiFillCheckCircle className="h-7 w-7 text-emerald-500" /> : <></>}
                    {empPictureName !== "" && checkFileName().upload === false ? <HiOutlineEmojiSad className="h-7 w-7 text-red-500" /> : <></>}
                </div>
                <div className="flex justify-center">{checkFileName().msg}</div>
            </div>
            <div className="col-span-12 flex justify-center gap-12">
                <button
                    className="h-[78px] border-2 p-2 rounded-md bg-secondary shadow-sm shadow-slate-600 hover:bg-weak hover:border-black hover:text-accent active:bg-strong text-2x font-bold mb-4"
                    onClick={cancelRequest}
                >
                    Cancel
                </button>
                <button
                    className="h-[78px] border-2 p-2 rounded-md bg-secondary shadow-sm shadow-slate-600 hover:bg-weak hover:border-black hover:text-accent active:bg-strong text-2x font-bold mb-4"
                    onClick={processRequest}
                >
                    {edit ? `Save Edit` : "Add Employee"}
                </button>
            </div>
            <div className="col-span-12 text-red-500 font-bold text-center">{serverMsg}</div>
            <div className="col-span-12 flex justify-center">
                {requestAdditional ? (
                    <div className="col-span-12">
                        <div className="flex justify-center text-accent active:bg-strong text-1xl font-bold p-6">
                            <div> fill out all fields and check image.</div>
                        </div>
                    </div>
                ) : (
                    <></>
                )}
            </div>
        </div>
    );
    // @ts-ignore
    const mapResultLimit = Object.keys(Array.from({ length: Object.keys(employees).length })).map((key) => {
        return (
            <option key={`${key}-limit`} value={parseInt(key) + 1}>
                {parseInt(key) + 1}
            </option>
        );
    });

    function updateOrder(newPlacement, oldId) {
        let employeeOrder = employees.reduce((prev, curr) => {
            prev.push(curr.id);
            return prev;
        }, []);
        employeeOrder = employeeOrder.filter((n) => {
            return n != oldId;
        });
        employeeOrder.splice(newPlacement - 1, 0, oldId);

        fetch("/api/employeeOrder", {
            method: "POST", // or 'PUT'
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                newOrder: employeeOrder,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                // console.log(data);
                setEmployees(data.order);
            });
    }

    const mapTeamMembers = employees.map((el) => {
        const display = el.id.toString() === showDetail ? "" : "hidden";
        const clickDetail = () => {
            el.id.toString() === showDetail ? setShowDetail("-1") : setShowDetail(el.id.toString());
        };
        return (
            <React.Fragment key={`${el.id}-employee-team-empty`}>
                <tr key={`${el.id}-employee-team-edit`}>
                    <td className="text-center">
                        {" "}
                        <input
                            className=""
                            type="checkbox"
                            checked={edit !== false && el.id === edit.id}
                            onChange={async (e) => {
                                // e.preventDefault();
                                setEdit(el);
                                setEmpName(el.name);
                                setEmpTitle(el.title);
                                setEmpDescription(el.description);
                                setEmpPictureRef(el.filename);
                            }}
                        />
                    </td>
                    {/* <td>{order}</td> */}
                    <td>
                        <LabeledSelect
                            label=""
                            value={el.ordernumber}
                            onClickCallback={(e) => {
                                console.log("LIMIT", e);
                                updateOrder(parseInt(e), el.id);
                            }}
                            id="newDay_ID"
                        >
                            {mapResultLimit}
                        </LabeledSelect>
                    </td>
                    <td onClick={clickDetail}>{el.name}</td>
                    <td onClick={clickDetail}>{el.title}</td>
                    <td>{el.filename}</td>
                    <td className="text-center">
                        <input
                            className=""
                            type="checkbox"
                            checked={false}
                            onChange={async (e) => {
                                // e.preventDefault();
                                fetch(`/api/deleteEmployee?id=${el.id}`)
                                    .then((response) => response.json())
                                    .then((data) => {
                                        setEmployees(data.team);
                                    });
                            }}
                        />
                    </td>
                </tr>
                <tr key={`${el.id}-employee-team-delete`}>
                    <td className={`${display}`} colSpan={6}>
                        <p>{el.description}</p>
                    </td>
                </tr>
            </React.Fragment>
        );
    });

    const teamMembersContainer = (
        <>
            <div className={"col-span-12 overflow-auto"}>
                <table className="w-full">
                    <thead>
                        <tr>
                            <td>Edit</td>
                            <td>Order</td>
                            <td>Name</td>
                            <td>Title</td>
                            <td>Picture</td>
                            <td>Delete</td>
                        </tr>
                    </thead>
                    <tbody>{mapTeamMembers}</tbody>
                </table>
            </div>
        </>
    );

    return (
        <div className={p.show === true ? "col-span-12 overflow-auto" : "hidden"}>
            {!edit ? (
                <div className="text-center font-bold text-xl text-accent">Review Team</div>
            ) : (
                <div className="text-center font-bold text-xl text-accent">Edit Team Member</div>
            )}
            {addTeamMember}
            {!edit ? teamMembersContainer : <></>}
        </div>
    );
}

export default team;
