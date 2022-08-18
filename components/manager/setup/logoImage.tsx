import React, { useState, useEffect } from "react";
import OutlinedSurface from "../../outlinedSurface";
import IconButton from "../../iconButton";
import FileUploadDragBox from "../../fileUploadDragBox";

import { postSiteImageReq, postSiteImageresBody } from "../../../pages/api/siteSetup/postSiteImage";
import { getSiteImageReq, getSiteImageResBody } from "../../../pages/api/siteSetup/getSiteImage";

function LogoImage() {
    const [imageSaved, setImageSaved] = useState("");
    const [imageName, setImageName] = useState("");
    const [imageRef, setImageRef] = useState<any>();
    const [ready, setReady] = useState(false);
    const [serverMsg, setServerMsg] = useState("");

    useEffect(() => {
        getSiteImages();
    }, []);

    function getSiteImages() {
        const reqParams: getSiteImageReq = {
            name: "logoImage",
        };
        const reqString = Object.entries(reqParams).reduce((prev, [key, val]) => {
            return `${prev}${key}=${val}`;
        }, "/api/siteSetup/getSiteImage?");
        fetch(reqString)
            .then((res) => res.json())
            .then((data: getSiteImageResBody) => {
                if (data.name) setImageSaved(data.name);
                setReady(false);
            });
    }

    function cancel() {
        setReady(false);
        setImageName("");
    }

    function processSaveImage() {
        if (ready) {
            const body: postSiteImageReq = {
                name: "logoImage",
                value: `logo.${imageName}`,
            };

            const data = imageRef;
            Object.entries(body).forEach(([key, val]) => data.append(key, val));
            fetch(`/api/siteSetup/postSiteImage`, {
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
                .then((data: postSiteImageresBody) => {
                    if (data.msg === "success") {
                        getSiteImages();
                        cancel();
                    } else {
                        setServerMsg(data.msg);
                        cancel();
                    }
                })
                .catch((err) => {
                    console.log("error submitting employee update", err);
                });
        }
    }

    return (
        <OutlinedSurface label="Logo Image">
            <div className="flex flex-col gap-2 w-full h-80  items-center">
                <FileUploadDragBox
                    fileName={imageName}
                    fileTypes={["png", "jpg", "svg"]}
                    fileNameCallback={setImageName}
                    refCallback={setImageRef}
                    readyCallback={setReady}
                    backgroundImage={imageSaved}
                    bgSize={"w-[300px] h-[300px]"}
                />
                <div className="flex justify-center">
                    {ready ? <IconButton text="Update Logo Image" callback={() => processSaveImage()} icon={<></>} /> : <></>}
                </div>
                {serverMsg ? <div>{serverMsg}</div> : <></>}
            </div>
        </OutlinedSurface>
    );
}

export default LogoImage;
