import { IncomingForm } from "formidable";
import { uploadFilePublic } from "../../lib/s3";
import { getSession } from "next-auth/react";
import prisma from "../../lib/prismaPool";

interface reqFields {
    sectionHeader: string;
    sectionText: string;
    id: number;
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
        form.parse(req, async (err, fields: reqFields, files) => {
            if (checkFileName(files.file[0].originalFilename) === true) {
                console.log("fields", fields);
                const sectionheader = fields.sectionHeader[0];
                const uploadResult = await uploadFilePublic(files.file[0], `${sectionheader}.section.${files.file[0].originalFilename}`);
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

async function saveDataPost(req, fileKey, fields: reqFields) {
    try {
        const updateObj = {
            where: {
                id: parseInt(fields.id[0]),
            },
            data: {
                sectionheader: fields.sectionHeader[0],
                sectiontext: fields.sectionText[0],
                sectionimage: fileKey,
            },
        };
        await prisma.servicesection.update(updateObj);
        return true;
    } catch (err) {
        console.log("problem with POST /editOurServices DB", err);
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
                    res.status(500).json({ msg: "Problem updating service section" });
                }
            } catch (err) {
                console.log("/POST editServuceSection Error:", err);
                res.status(500).json({ msg: "Problem updating service section" });
            }
        } else {
            res.status(500).json({ msg: "Picture file not included" });
        }
    } else {
        res.status(400).json({ msg: "denied" });
    }
};
