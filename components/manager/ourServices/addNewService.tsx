import React, { useState, useContext, useRef } from "react";
import { ScreenWidth } from "../../screenWidth";
// import { service } from "../ourServices";
import LabeledInput from "./../../labeledInput";
import FileUploadDragBox from "./../../fileUploadDragBox";
import IconButton from "./../../iconButton";

interface props {
    getServices: Function;
}

function addNewService(p: props) {
    const [addNew, setAddNew] = useState(false);
    const [newServiceName, setNewServiceName] = useState("");
    const [newServiceBannerText, setNewServiceBannerText] = useState("");
    const [fileName, setFileName] = useState("");
    const [fileRef, setFileRef] = useState<any>("pass");
    const [serverMsg, setServerMsg] = useState("");
    const [requestAdditional, setRequestAdditional] = useState(false);
    // const [edit, setEdit] = useState<false | service>(false);
    const [ready, setReady] = useState(false);
    const screenSize = useContext(ScreenWidth);

    function processAddService(e) {
        e.preventDefault();
        let processRequest = true;
        if (newServiceName === "") processRequest = false;
        if (fileName === "") processRequest = false;
        if (fileRef === "pass") processRequest = false;

        if (processRequest) {
            setRequestAdditional(false);
            addService();
        } else {
            setRequestAdditional(true);
            console.log("Check name and image upload.");
        }
    }

    function cancelRequest() {
        setNewServiceName("");
        setNewServiceBannerText("");
        setFileRef("");
        // setEdit(false);
        setServerMsg("");
        setAddNew(false);
    }

    function addService() {
        if (ready) {
            const data = fileRef;
            data.append("name", newServiceName);
            data.append("bannerText", newServiceBannerText);

            fetch(`/api/addOurServices`, {
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
                        p.getServices();
                        // setEdit(false);
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

    const addNewService = (
        <div className="mt-4">
            <div className="text-center font-bold text-xl text-accent m-4">Add New Service</div>
            <div className={filtersFormat}>
                <LabeledInput id="newServiceName" label="New Service Name" value={newServiceName} onClickCallback={setNewServiceName} />
                <LabeledInput id="newServiceBanner" label={`Banner Text`} value={newServiceBannerText} onClickCallback={setNewServiceBannerText} />
            </div>
            <FileUploadDragBox
                fileName={fileName}
                fileTypes={["png", "jpg", "svg"]}
                fileNameCallback={setFileName}
                refCallback={setFileRef}
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
                    onClick={processAddService}
                >
                    Add Service
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
    if (addNew) {
        return addNewService;
    } else {
        return (
            <div className="flex justify-left gap-2 mt-4 p-2">
                <IconButton text="Add New Service" callback={() => setAddNew(true)} icon={<></>}></IconButton>
            </div>
        );
    }
}

export default addNewService;
