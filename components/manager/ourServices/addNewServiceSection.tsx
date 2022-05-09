import React from "react";
import { service } from "../ourServices";
import { useState } from "react";
import LabeledInput from "./../../labeledInput";
import LabeledtextArea from "./../../labeledTextArea";
import IconButton from "./../../iconButton";
import FileUploadDragBox from "./../../fileUploadDragBox";
import { addServiceSectionTextReq } from "./../../../pages/api/services/addServiceSectionText";
import { addServiceSectionReq } from "./../../../pages/api/services/addServiceSection";

interface props {
    service: service;
    getServices: Function;
}

function addNewServiceSection(p: props) {
    const [openForm, setOpenForm] = useState(false);
    const [sectionHeader, setSectionHeader] = useState("");
    const [sectionBody, sectionBodyText] = useState("");
    const [fileRef, setFileRef] = useState<any>("pass");
    const [fileName, setFileName] = useState("");
    const [ready, setReady] = useState(false);
    const [formMessage, setFormMessage] = useState("");

    function cancel() {
        setSectionHeader("");
        sectionBodyText("");
        setFileRef("pass");
        setFileName("");
        setOpenForm(false);
        setFormMessage("");
    }

    function addSection() {
        if (ready) {
            const fields: addServiceSectionReq = {
                sectionName: sectionHeader,
                sectionBody: sectionBody,
                serviceID: p.service.id,
                serviceName: p.service.name,
            };
            const data = fileRef;
            Object.entries(fields).forEach(([key, val]) => {
                data.append(key, val);
            });
            fetch(`/api/services/addServiceSection`, {
                method: "POST",
                body: data,
            })
                .then(async (res) => {
                    if (res.status === 413) {
                        setFormMessage("Choose file 1mb or smaller.");
                    } else {
                        return res.json();
                    }
                })
                .then((data) => {
                    if (data.msg === "success") {
                        p.getServices();
                        setFormMessage("");
                        cancel();
                    } else {
                        setFormMessage(data.msg);
                    }
                })
                .catch((err) => {
                    console.log("error submitting employee update", err);
                });
        } else {
            const data: addServiceSectionTextReq = {
                sectionName: sectionHeader,
                sectionBody: sectionBody,
                serviceID: p.service.id,
                serviceName: p.service.name,
            };
            fetch(`/api/services/addServiceSectionText`, {
                method: "POST",
                body: JSON.stringify(data),
            })
                .then(async (res) => res.json())
                .then((data) => {
                    if (data.msg === "success") {
                        p.getServices();
                        setFormMessage("");
                        cancel();
                    } else {
                        setFormMessage(data.msg);
                    }
                })
                .catch((err) => {
                    console.log("error submitting employee update", err);
                });
        }
    }

    function processAddService() {
        let processRequest = true;
        if (sectionHeader === "") processRequest = false;
        if (sectionBody === "") processRequest = false;

        if (processRequest) {
            setFormMessage("");
            addSection();
        } else {
            setFormMessage("Check that section name and text are filled out, and that picture file is attached.");
            console.log("Check name and image upload.");
        }
    }

    if (openForm) {
        return (
            <div className="flex flex-col gap-4">
                <div className="text-center font-bold text-xl text-accent">{`${p.service.name}: Add New Section`}</div>
                <LabeledInput id="newSectionName" label="New Section Name" value={sectionHeader} onClickCallback={setSectionHeader} />
                <LabeledtextArea label="New Section Text" id="newsSectionBody" value={sectionBody} callback={sectionBodyText} />
                <FileUploadDragBox
                    fileName={fileName}
                    fileTypes={["png", "jpg", "svg"]}
                    fileNameCallback={setFileName}
                    refCallback={setFileRef}
                    readyCallback={setReady}
                />
                <div className="flex justify-center gap-2 m-1">
                    <IconButton text="Cancel" callback={cancel} icon={<></>}></IconButton>
                    <IconButton text="Save Section" callback={processAddService} icon={<></>}></IconButton>
                </div>
                <div className="text-center font-bold text-xl text-accent">{formMessage}</div>
            </div>
        );
    } else {
        return (
            <div className="flex flex-col gap-4">
                <div className="flex justify-left gap-2 m-1">
                    <IconButton text="Add New Section" callback={() => setOpenForm(!openForm)} icon={<></>}></IconButton>
                </div>
            </div>
        );
    }
}

export default addNewServiceSection;
