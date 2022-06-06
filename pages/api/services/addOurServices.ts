import { IncomingForm } from "formidable";
import { uploadFilePublic } from "../../../lib/s3";
import { getSession } from "next-auth/react";
import prisma from "../../../lib/prismaPool";

interface reqBody {
    name: string;
    bannerText: string;
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
    const shortName = service.replaceAll(" ", "");
    fetch(`${process.env.NEXTAUTH_URL}/api/revalidate?secret=${process.env.NEXT_REVALIDATE}&path=/`); //home page carousel
    fetch(`${process.env.NEXTAUTH_URL}/api/revalidate?secret=${process.env.NEXT_REVALIDATE}&path=/services/${shortName}`); //route to service
}

function checkFileName(fileName) {
    if (fileName !== "" && ["png", "jpg", "svg"].includes(fileName.split(".").pop())) {
        return true;
    } else {
        return false;
    }
}

async function saveFile(req) {
    try {
        const form = new IncomingForm();
        const data = await new Promise((resolve, reject) => {
            form.parse(req, async (err, fields: reqBody, files) => {
                if (err) {
                    console.log("addOurServices saveFile error", err);
                }
                if (checkFileName(files.file[0] && files?.file[0]?.originalFilename) === true) {
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
    } catch (err) {
        console.log("problem with POST /submitResume saveFile", err);
        return false;
    }
}

async function saveDataPost(fileKey, fields) {
    try {
    const formObject = {
        serviceName: fields.name[0] ? fields.name[0] : '',
        bannerText: fields.bannerText[0] ? fields.bannerText[0] : '',
    };
        const maxNumber = await prisma.team.findMany({
            orderBy: [
                {
                    ordernumber: "desc",
                },
            ],
            take: 1,
        });
        const maxNum = maxNumber?.[0]?.ordernumber ? maxNumber[0].ordernumber + 1 : 1;
        const createObj = {
            data: {
                name: formObject.serviceName,
                bannertext: formObject.bannerText,
                bannerimage: fileKey,
                ordernumber: maxNum,
            },
        };
        await prisma.services.create(createObj);
        return true;
        // }
    } catch (err) {
        console.log("problem with POST /submitResume DB", err);
        return false;
    }
}

const addOurServices = async (req, res) => {
    const session = await getSession({ req });
    //@ts-ignore
    if (session && session.user.role === "admin") {
        if (req.method === "POST") {
            try {
                const [pass, savedFile, fields]: any = await saveFile(req);
                if (pass) {
                    const servicesUpdated = await saveDataPost(savedFile.fileKey, fields);
                    if (servicesUpdated) {
                        console.log("servicesUpdated", servicesUpdated);
                        rerenderRoutes(fields.name[0]);
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
        }
    }
};

export default addOurServices;
