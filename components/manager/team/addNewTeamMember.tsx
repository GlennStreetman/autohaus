import React, { useState, useEffect, useContext, useRef } from "react";
import FileUploadDragBox from "../../fileUploadDragBox";
import LabeledInput from "../../labeledInput";
import { ScreenWidth } from "../../screenWidth";
import OutlinedSurface from "./../../outlinedSurface";
import IconButton from "./../../iconButton";

interface employees {
    id: number;
    name: string;
    title: string;
    description: string;
    filename: string; //file name
    ordernumber: string;
}

interface props {
    setAdd: Function;
    setEmployees: Function;
    getEmployees: Function;
}

function AddNewTeamMember(p: props) {
    const [empName, setEmpName] = useState("");
    const [empTitle, setEmpTitle] = useState("");
    const [empDescription, setEmpDescription] = useState("");
    const [empPictureRef, setEmpPictureRef] = useState<any>("pass");
    const [empPictureName, setEmpPictureName] = useState("");
    const [requestAdditional, setRequestAdditional] = useState(false);
    const [serverMsg, setServerMsg] = useState("");
    const [ready, setReady] = useState(false);
    const screenSize = useContext(ScreenWidth);

    function cancelRequest() {
        p.setAdd(false);
    }

    function processRequest() {
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

            fetch(`/api/employee/submitEmployee`, {
                method: "POST",
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
                        p.getEmployees();
                        cancelRequest();
                    } else {
                        setServerMsg(data.msg);
                    }
                })
                .catch((err) => {
                    console.log("error submitting employee update", err);
                });
        }
    }

    const filtersFormat = screenSize.width <= 700 ? "col-span-12 flex flex-wrap flex-row gap-2 mb-4" : "col-span-12 flex flex-row gap-2  mb-4";
    return (
        <OutlinedSurface label={`Add New Employee`}>
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
                refCallback={setEmpPictureRef}
                readyCallback={setReady}
            />
            <div className="col-span-12 flex justify-center gap-12">
                <IconButton text="Cancel" icon={<></>} callback={cancelRequest} />
                <IconButton text="Add Employee" icon={<></>} callback={processRequest} />
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
        </OutlinedSurface>
    );
}

export default AddNewTeamMember;
