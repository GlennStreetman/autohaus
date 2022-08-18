import { IncomingForm } from "formidable";
import { uploadFilePublic } from "../../../lib/s3";
import { getSession } from "next-auth/react";
import prisma from "../../../lib/prismaPool";

export interface editOurServicesReq {
    name: string; //this could be a new name!
    bannerText: string;
    id: number | string;
}

interface savedFileReturn {
    fileKey: string;
}

export const config = {
    api: {
        bodyParser: false,
    },
};

async function rerenderRoutes(service) {
    try {
        let shortName = service.replace(/[^a-z0-9+]+/gi, "");
        fetch(`${process.env.NEXTAUTH_URL}/api/revalidate?secret=${process.env.NEXT_REVALIDATE}&path=/`); //home page carousel
        fetch(`${process.env.NEXTAUTH_URL}/api/revalidate?secret=${process.env.NEXT_REVALIDATE}&path=/services/${shortName}`); //route to service
    } catch (err) {
        console.log("/editOUrServices rerenderRoutes", err);
    }
}

function checkFileName(fileName) {
    try {
        if (fileName !== "" && ["png", "jpg", "svg"].includes(fileName.split(".").pop())) {
            return true;
        } else {
            return false;
        }
    } catch (err) {
        console.log("/editOurServices checkFileName", err);
    }
}

async function saveFile(req) {
    const form = new IncomingForm();
    const data = await new Promise((resolve, reject) => {
        form.parse(req, async (err, fields: editOurServicesReq, files) => {
            console.log("FIELDS", fields);
            if (checkFileName(files.file[0].originalFilename) === true) {
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
    try {
        const updateObj = {
            where: {
                id: parseInt(fields.id[0]),
            },
            data: {
                name: fields.name[0],
                bannertext: fields.bannerText[0],
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

const editOurServices = async (req, res) => {
    const session = await getSession({ req });
    //@ts-ignore
    if (session && session.user.role === "admin") {
        if (req.method === "POST") {
            try {
                const [pass, savedFile, fields]: any = await saveFile(req);
                if (pass) {
                    const servicesUpdated = await saveDataPost(req, savedFile.fileKey, fields);
                    if (servicesUpdated) {
                        rerenderRoutes(fields.name[0]);
                        res.status(200).json({ msg: "success" });
                    } else {
                        res.status(500).json({ msg: "problem saving service." });
                    }
                } else {
                    console.log("denied file save!");
                    res.status(500).json({ msg: "Problem saving service." });
                }
            } catch (err) {
                console.log("/POST addNewService Error:", err);
                res.status(400).json({ msg: "denied" });
            }
        }
    }
};

export default editOurServices;
