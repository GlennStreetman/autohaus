import React, { useState, useContext } from "react";
import { ScreenWidth } from "../../screenWidth";
import { service } from "../ourServices";
import LabeledInput from "./../../labeledInput";
import FileUploadDragBox from "./../../fileUploadDragBox";
import IconButton from "./../../iconButton";
import MapServiceSections from "./mapServiceSections";
import { editOurServicesReq } from "./../../../pages/api/services/editOurServices";
import { editOurServicesTextReq } from "./../../../pages/api/services/editOurServicesText";
import OutlinedSurface from "./../../outlinedSurface";

interface props {
    service: service;
    getServices: Function;
    setEditService: Function;
}

function EditService(p: props) {
    const [newServiceName, setNewServiceName] = useState(p.service.name);
    const [newServiceBannerText, setNewServiceBannerText] = useState(p.service.bannertext);
    const [fileName, setFileName] = useState("");
    const [fileRef, setFileRef] = useState<any>("pass");
    const [serverMsg, setServerMsg] = useState("");
    const [requestAdditional, setRequestAdditional] = useState(false);
    const [ready, setReady] = useState(false);
    const screenSize = useContext(ScreenWidth);
    const filtersFormat = screenSize.width <= 700 ? "col-span-12 flex flex-wrap flex-row gap-2 mb-4" : "col-span-12 flex flex-row gap-2  mb-4";

    function cancelRequest() {
        setNewServiceName("");
        setNewServiceBannerText("");
        setFileRef("");
        setServerMsg("");
        p.setEditService(false);
    }

    function processEditService() {
        if (newServiceName !== "") {
            setRequestAdditional(false);
            postEditService();
        } else {
            setRequestAdditional(true);
            console.log("Check name and banner text.");
        }
    }

    function postEditService() {
        if (ready) {
            const body: editOurServicesReq = {
                name: newServiceName,
                bannerText: newServiceBannerText,
                id: p.service.id,
            };

            const data = fileRef;
            Object.entries(body).forEach(([key, val]) => {
                data.append(key, val);
            });

            console.log("data", data);

            fetch(`/api/services/editOurServices`, {
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
        } else {
            const data: editOurServicesTextReq = {
                name: newServiceName,
                bannerText: newServiceBannerText,
                id: p.service.id.toString(),
            };
            console.log("data", data);
            fetch(`/api/services/editOurServicesText`, {
                method: "POST",
                body: JSON.stringify(data),
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

    const editServiceForm = (
        <div>
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
            <div className="col-span-12 flex justify-center gap-12 mb-2">
                <IconButton text="Cancel" callback={cancelRequest} icon={<></>} />
                <IconButton text="Update Service" callback={processEditService} icon={<></>} />
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

    return (
        <>
            <OutlinedSurface label={`Edit Service: ${p.service.name}`}>{editServiceForm}</OutlinedSurface>
            <MapServiceSections service={p.service} getServices={p.getServices} />
        </>
    );
}

export default EditService;

{
    /* <OutlinedSurface label={`Edit Service: ${editService.bannertext}`}> */
}
