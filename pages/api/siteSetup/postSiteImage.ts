import type { NextApiRequest, NextApiResponse } from "next";
import { IncomingForm } from "formidable";
import { uploadFilePublic } from "./../../../lib/s3";
import prisma from "../../../lib/prismaPool";
import { getSession } from "next-auth/react";

export interface postSiteImageReq {
    name: string;
    value: string;
}

export interface postSiteImageresBody {
    msg: string;
}

type postSiteImageRes = NextApiResponse<postSiteImageresBody>;

export const config = {
    api: {
        bodyParser: false,
    },
};

interface savedFileReturn {
    fileKey: string;
}

function checkFileName(fileName) {
    if (fileName !== "" && ["png", "jpg", "svg"].includes(fileName.split(".").pop())) {
        return true;
    } else {
        return false;
    }
}

async function saveFile(req) {
    const form = new IncomingForm();
    const data = await new Promise((resolve, reject) => {
        form.parse(req, async (err, fields: postSiteImageReq, files) => {
            if (err) {
                console.log("Problem parsing image", err);
                reject("problem updating image");
            }
            if (checkFileName(files.file[0].originalFilename) === true) {
                const uploadResult = await uploadFilePublic(files.file[0], `${fields.value[0]}`);
                console.log("uploadResult", uploadResult);
                const returnData: savedFileReturn = { fileKey: uploadResult["key"] };
                resolve([true, returnData, fields]);
            } else {
                resolve([false, false, false]);
            }
        });
    });
    return data;
}

async function saveData(fields: postSiteImageReq) {
    try {
        await prisma.sitesetup.upsert({
            where: {
                name: fields.name[0],
            },
            update: {
                value: fields.value[0],
            },
            create: {
                name: fields.name[0],
                value: fields.value[0],
            },
        });
    } catch (err) {
        console.log("problem with POST /postSiteImage DB", err);
    }
}

const postSiteImage = async (req: NextApiRequest, res: postSiteImageRes) => {
    const session = await getSession({ req });
    // @ts-ignore
    if (session && session.user.role === "admin") {
        try {
            const [pass, savedFile, fileds]: any = await saveFile(req);
            if (pass) {
                saveData(fileds);
                res.status(200).json({ msg: "success" });
            } else {
                res.status(401).json({ msg: "denied" });
            }
        } catch (err) {
            console.log("/POST postSiteImage Error:", err);
            res.status(400).json({ msg: "Problem saving banner image." });
        }
    } else {
        console.log("not signed in");
        res.status(401);
    }
};

export default postSiteImage;
