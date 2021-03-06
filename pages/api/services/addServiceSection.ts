import { IncomingForm } from "formidable";
import { uploadFilePublic } from "../../../lib/s3";
import { getSession } from "next-auth/react";
import prisma from "../../../lib/prismaPool";

export interface addServiceSectionReq {
    sectionName: string;
    sectionBody: string;
    serviceID: number;
    serviceName: string;
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
        const shortName = service.replaceAll(" ", "");
        fetch(`${process.env.NEXTAUTH_URL}/api/revalidate?secret=${process.env.NEXT_REVALIDATE}&path=/`); //home page carousel
        fetch(`${process.env.NEXTAUTH_URL}/api/revalidate?secret=${process.env.NEXT_REVALIDATE}&path=/services/${shortName}`); //route to service
    } catch (err) {
        console.log("/addOurServiceSection rerenderRoutes", err);
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
        console.log("/addServiceSection rerenderRoutes", err);
    }
}

async function saveFile(req) {
    try {
        const form = new IncomingForm();
        const data = await new Promise((resolve, reject) => {
            form.parse(req, async (err, fields: addServiceSectionReq, files) => {
                if (checkFileName(files.file[0].originalFilename) === true) {
                    console.log("fields", fields);
                    const sectionheader = fields.sectionName[0];
                    const uploadResult = await uploadFilePublic(files.file[0], `${sectionheader}.section.${files.file[0].originalFilename}`);
                    const returnData: savedFileReturn = { fileKey: uploadResult["key"] };
                    resolve([true, returnData, fields]);
                } else {
                    resolve([false, false, false]);
                }
            });
        });

        return data;
    } catch (err) {
        console.log("/addOurServiceSection saveFile", err);
    }
}

async function saveDataPost(fileKey, fields: addServiceSectionReq) {
    try {
        const maxNumber = await prisma.servicesection.findMany({
            where: {
                serviceid: parseInt(fields.serviceID[0]),
            },
            orderBy: [
                {
                    ordernumber: "desc",
                },
            ],
            take: 1,
        });
        const maxNum = maxNumber?.[0]?.ordernumber ? maxNumber[0].ordernumber + 1 : 1;

        const formObject = {
            sectionheader: fields.sectionName[0],
            sectiontext: fields.sectionBody[0],
            serviceid: parseInt(fields.serviceID[0]),
            sectionimage: fileKey,
            ordernumber: maxNum,
        };

        const createObj = {
            data: formObject,
        };
        await prisma.servicesection.create(createObj);
        return true;
    } catch (err) {
        console.log("problem with POST /submitResume DB", err);
        return false;
    }
}

const addServiceSection = async (req, res) => {
    const session = await getSession({ req });
    //@ts-ignore
    if (session && session.user.role === "admin") {
        if (req.method === "POST") {
            try {
                const [pass, savedFile, fields]: any = await saveFile(req);
                if (pass) {
                    const servicesUpdated = await saveDataPost(savedFile.fileKey, fields);
                    if (servicesUpdated) {
                        rerenderRoutes(fields.serviceName[0]);
                        res.status(200).json({ msg: "success" });
                    } else {
                        res.status(500).json({ msg: "problem saving service section." });
                    }
                } else {
                    console.log("denied file save!");
                    res.status(401).json({ msg: "denied" });
                }
            } catch (err) {
                console.log("/POST addNewService Error:", err);
                res.status(400).json({ msg: "denied" });
            }
        }
    }
};

export default addServiceSection;
