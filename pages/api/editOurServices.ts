import { IncomingForm } from "formidable";
import { uploadFilePublic } from "../../lib/s3";
import { getSession } from "next-auth/react";
import prisma from "../../lib/prismaPool";

interface reqBody {
    name: string;
    bannerText: string;
    edit: number | false;
}

interface savedFileReturn {
    fileKey: string;
}

export const config = {
    api: {
        bodyParser: false,
    },
};

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
        form.parse(req, async (err, fields, files) => {
            if (checkFileName(files.file[0].originalFilename) === true) {
                console.log("fields", fields);
                const name = fields.name[0];
                const uploadResult = await uploadFilePublic(files.file[0], `${name}.serviceBanner.${files.file[0].originalFilename}`);
                // console.log("s3 Resulte: ", uploadResult);
                const returnData: savedFileReturn = { fileKey: uploadResult["key"] };
                resolve([true, returnData, fields]);
            } else {
                resolve([false, false, false]);
            }
        });
    });

    return data;
}

async function saveDataPost(req, fileKey, fields) {
    const formObject = {
        serviceName: fields.name[0],
        bannerText: fields.bannerText[0],
        id: fields.id[0],
    };

    try {
        const updateObj = {
            where: {
                id: parseInt(formObject.id),
            },
            data: {
                name: formObject.serviceName,
                bannertext: formObject.bannerText,
                bannerimage: fileKey,
            },
        };
        await prisma.services.update(updateObj);
        return true;
    } catch (err) {
        console.log("problem with POST /editOurServices DB", err);
        return false;
    }
}

async function saveTextEdit(params) {
    try {
        const updateObj = {
            where: {
                id: parseInt(params.id),
            },
            data: {
                name: params.serviceName,
                bannertext: params.bannerText,
            },
        };
        await prisma.services.update(updateObj);
    } catch (err) {
        console.log("problem with GET /editOurServices DB", err);
        return false;
    }
}

export default async (req, res) => {
    const session = await getSession({ req });
    //@ts-ignore
    if (session && session.user.role === "admin") {
        if (req.method === "POST") {
            //post if new new picture
            try {
                const [pass, savedFile, fields]: any = await saveFile(req);
                if (pass) {
                    const servicesUpdated = await saveDataPost(req, savedFile.fileKey, fields);
                    if (servicesUpdated) {
                        res.status(200).json({ msg: "success" });
                    } else {
                        res.status(500).json({ msg: "problem saving service." });
                    }
                } else {
                    console.log("denied file save!");
                    res.status(401).json({ msg: "denied" });
                }
            } catch (err) {
                console.log("/POST addNewService Error:", err);
                res.status(400).json({ msg: "denied" });
            }
        } else {
            //no picture, GET
            try {
                await saveTextEdit(req.query);
                res.status(200).json({ msg: "success" });
            } catch (err) {
                console.log("/GET submitEmployee Error:", err);
                res.status(400).json({ msg: "denied" });
            }
        }
    }
};
