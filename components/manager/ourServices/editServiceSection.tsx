import React, { useState, useContext, useEffect } from "react";
import { section } from "../ourServices";
import LabeledInput from "./../../labeledInput";
import LabeledtextArea from "./../../labeledTextArea";
import FileUploadDragBox from "./../../fileUploadDragBox";
import IconButton from "./../../iconButton";

interface props {
    section: section;
    getServices: Function;
    setEditSection: Function;
}

function editServiceSection(p: props) {
    const [newSectionHeader, setnewSectionHeader] = useState(p.section.sectionheader);
    const [sectionText, setSectionText] = useState(p.section.sectiontext);
    const [fileName, setFileName] = useState("");
    const [fileRef, setFileRef] = useState<any>("pass");
    const [serverMsg, setServerMsg] = useState("");
    const [requestAdditional, setRequestAdditional] = useState(false);
    const [ready, setReady] = useState(false);

    useEffect(() => {
        setnewSectionHeader(p.section.sectionheader);
        setSectionText(p.section.sectiontext);
    }, [p.section.id]);

    function cancelRequest() {
        setnewSectionHeader("");
        setSectionText("");
        setFileRef("");
        setServerMsg("");
        p.setEditSection(false);
    }

    function processEditSection() {
        if (newSectionHeader !== "") {
            setRequestAdditional(false);
            postEditSection();
        } else {
            setRequestAdditional(true);
            console.log("Check name and banner text.");
        }
    }

    function postEditSection() {
        if (ready) {
            //process update with picture
            const data = fileRef;
            data.append("sectionHeader", newSectionHeader);
            data.append("sectionText", sectionText);
            data.append("id", p.section.id);

            fetch(`/api/editServiceSection`, {
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
                sectionHeader: newSectionHeader,
                sectionText: sectionText,
                id: p.section.id,
            };
            const upload = JSON.stringify(data);
            fetch(`/api/editServiceSectionText`, {
                method: "POST", // or 'PUT'
                body: upload,
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

    const editServiceForm = (
        <div className="flex flex-col gap-4 mt-4">
            <div className="text-center font-bold text-xl text-accent m-4">{`Edit Section: ${p.section.sectionheader}`}</div>
            <LabeledInput id="newSectionHeader" label="Section Heading" value={newSectionHeader} onClickCallback={setnewSectionHeader} />
            <LabeledtextArea id="editSectionBody" label="Edit Section Text" value={sectionText} callback={setSectionText} />
            <FileUploadDragBox
                fileName={fileName}
                fileTypes={["png", "jpg", "svg"]}
                fileNameCallback={setFileName}
                refCallback={setFileRef}
                readyCallback={setReady}
            />
            <div className="col-span-12 flex justify-center gap-12 mb-2">
                <IconButton text="Cancel" callback={cancelRequest} icon={<></>} />
                <IconButton text="Update Section" callback={processEditSection} icon={<></>} />
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

    return <>{editServiceForm}</>;
}

export default editServiceSection;
