import React, { useState, useEffect, useContext, useRef } from "react";
import FileUploadDragBox from "../../fileUploadDragBox";
import LabeledInput from "../../labeledInput";
import { ScreenWidth } from "../../screenWidth";

interface employees {
    id: number;
    name: string;
    title: string;
    description: string;
    filename: string; //file name
    ordernumber: string;
}

interface props {
    edit: employees;
    setEdit: Function;
    setEmployees: Function;
}

function editTeamMember(p: props) {
    const [empName, setEmpName] = useState("");
    const [empTitle, setEmpTitle] = useState("");
    const [empDescription, setEmpDescription] = useState("");
    const [empPictureRef, setEmpPictureRef] = useState<any>("pass");
    const [empPictureName, setEmpPictureName] = useState("");
    const [requestAdditional, setRequestAdditional] = useState(false);
    const [edit, setEdit] = useState<false | employees>(false);
    const [serverMsg, setServerMsg] = useState("");
    const [ready, setReady] = useState(false);
    const screenSize = useContext(ScreenWidth);

    useEffect(() => {
        setEmpName(p.edit.name);
        setEmpTitle(p.edit.title);
        setEmpDescription(p.edit.description);
    }, [p.edit.id]);

    function cancelRequest() {
        p.setEdit(false);
    }

    function processRequest(e) {
        e.preventDefault();
        let processRequest = true;
        if (empName === "") processRequest = false;
        if (empTitle === "") processRequest = false;
        if (empDescription === "") processRequest = false;

        if (processRequest) {
            setRequestAdditional(false);
            postEmployee();
        } else {
            setRequestAdditional(true);
            console.log("problem processing request");
        }
    }

    function postEmployee() {
        if (ready) {
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
                        p.setEmployees(data.employees);
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
                        p.setEmployees(data.employees);
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

    const filtersFormat = screenSize.width <= 700 ? "col-span-12 flex flex-wrap flex-row gap-2 mb-4" : "col-span-12 flex flex-row gap-2  mb-4";
    return (
        <div className="mt-4">
            <div className="text-center font-bold text-xl text-accent">Edit Team Member</div>
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

            <FileUploadDragBox
                fileName={empPictureName}
                fileTypes={["png", "jpg", "svg"]}
                fileNameCallback={setEmpPictureName}
                refCallback={empPictureRef}
                readyCallback={setReady}
            />
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
}

export default editTeamMember;
