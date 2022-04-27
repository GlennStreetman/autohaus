import { useState, useEffect, useContext, useRef } from "react";
import { useSession } from "next-auth/react";
import IconButton from "./../iconButton";
import LabeledInput from "./../labeledInput";
import LabeledSelect from "./../labeledSelect";
import { GoCalendar } from "react-icons/go";
import { ScreenWidth } from "../screenWidth";
import { BiUpload } from "react-icons/bi";
import { AiFillCheckCircle } from "react-icons/ai";
import { HiOutlineEmojiSad } from "react-icons/hi";

interface employees {
    id: number;
    name: string;
    title: string;
    description: string;
    picture: string; //file name
}

import React from "react";

interface props {
    show: boolean;
}

function team(p: props) {
    const { data: session } = useSession();
    const [employees, setEmployees] = useState();
    const [empName, setEmpName] = useState("");
    const [empTitle, setEmpTitle] = useState("");
    const [empDescription, setEmpDescription] = useState("");

    const [empPictureRef, setEmpPictureRef] = useState<any>();
    const [empPictureName, setEmpPictureName] = useState("");

    const [enableSubmit, setEnableSubmit] = useState(false);
    const [requestAdditional, setRequestAdditional] = useState(false);

    const inputReference = useRef<HTMLInputElement>(null);

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

            fetch(`/api/submitEmployee`, {
                method: "POST", // or 'PUT'
                body: data,
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data.msg === "success") {
                        setEmployees(data.employees);
                    }
                });
        }
    }

    const filtersFormat = screenSize.width <= 700 ? "col-span-12 flex flex-wrap flex-row gap-2" : "col-span-12 flex  flex-row gap-2";
    const addTeamMember = (
        <>
            <div className={p.show === true ? filtersFormat : "hidden"}>
                <LabeledInput id="empName_add" label="Full Name" value={empName} onClickCallback={setEmpName} />
                <LabeledInput id="empTitle_id" label={`Employee Title`} value={empTitle} onClickCallback={setEmpTitle} />
            </div>

            <div className="col-span-12 border-2 p-2 relative">
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
                className="col-span-12 border-2 p-2 relative bg-slate-100 cursor-pointer h-32 flex flex-col place-content-center"
                onClick={fileUploadAction}
                onDrop={dropHandler}
                onDragOver={(e) => {
                    // let event = e as Event;
                    e.stopPropagation();
                    e.preventDefault();
                }}
            >
                <input type="file" className="hidden" ref={inputReference} onChange={selectFile} />
                <div className="flex justify-center">
                    {empPictureName === "" ? <BiUpload className="h-7 w-7" /> : <></>}
                    {empPictureName !== "" && checkFileName().upload === true ? <AiFillCheckCircle className="h-7 w-7 text-emerald-500" /> : <></>}
                    {empPictureName !== "" && checkFileName().upload === false ? <HiOutlineEmojiSad className="h-7 w-7 text-red-500" /> : <></>}

                    {/* <AiFillCheckCircle className="h-7 w-7" /> */}
                </div>
                <div className="flex justify-center">{checkFileName().msg}</div>
            </div>
            <div className="col-span-12 flex justify-center">
                <button
                    className="h-[78px] border-2 p-2 rounded-md bg-secondary shadow-sm shadow-slate-600 hover:bg-weak hover:border-black hover:text-accent active:bg-strong text-2x font-bold"
                    onClick={processRequest}
                >
                    Add Employee
                </button>
            </div>
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
        </>
    );

    return (
        <>
            {addTeamMember}
            {/* {holidayContainer} */}
        </>
    );
}

export default team;
