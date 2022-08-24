import React, { useState, useEffect, useContext, useRef } from "react";
import FileUploadDragBox from "../../fileUploadDragBox";
import LabeledInput from "../../labeledInput";
import { ScreenWidth } from "../../screenWidth";
import OutlinedSurface from "./../../outlinedSurface";
import IconButton from "./../../iconButton";
import {employees} from './mapTeamMembers'

interface props {
    edit: employees;
    setEdit: Function;
    setEmployees: Function;
    getEmployees: Function;
    setShowAdd: Function;
}

function EditTeamMember(p: props) {
    const [empName, setEmpName] = useState("");
    const [empTitle, setEmpTitle] = useState("");
    const [empDescription, setEmpDescription] = useState("");
    const [empPictureRef, setEmpPictureRef] = useState<any>("pass");
    const [empPictureName, setEmpPictureName] = useState("");
    const [requestAdditional, setRequestAdditional] = useState(false);
    const [serverMsg, setServerMsg] = useState("");
    const [ready, setReady] = useState(false);
    const screenSize = useContext(ScreenWidth);

    useEffect(() => {
        setEmpName(p.edit.name);
        setEmpTitle(p.edit.title);
        setEmpDescription(p.edit.description);
    }, [p.edit.id]);

    function cancelRequest() {
        p.setShowAdd(true);
        p.setEdit(false);
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
            data.append("filename", empPictureName);
            data.append("id", p.edit.id);

            fetch(`/api/employee/editEmployee`, {
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
                        p.setEdit(false);
                        cancelRequest();
                    } else {
                        setServerMsg(data.msg);
                    }
                })
                .catch((err) => {
                    console.log("error submitting employee update", err);
                });
        } else {
            const data = {
                name: empName,
                title: empTitle,
                description: empDescription,
                id: p.edit.id,
            };
            fetch("/api/employee/editEmployeeText", {
                method: "POST",
                body: JSON.stringify(data),
            })
                .then((res) => {
                    return res.json();
                })
                .then((data) => {
                    if (data.msg === "success") {
                        p.getEmployees();
                        p.setEdit(false);
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
        <OutlinedSurface label={`Edit Team Member: ${p.edit.name}`}>
            {/* <div className="text-center font-bold text-xl text-accent mb-4">Edit Team Member</div> */}
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
                backgroundImage={p.edit.filename}
                bgSize={"w-[300px] h-[300px]"} 
            />
            <div className="col-span-12 flex justify-center gap-12">
                <IconButton text="Cancel" icon={<></>} callback={cancelRequest} />
                <IconButton text="Save" icon={<></>} callback={processRequest} />
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
            {serverMsg ? <div>{serverMsg}</div> : <></>}
            </div>
        </OutlinedSurface>
    );
}

export default EditTeamMember;
