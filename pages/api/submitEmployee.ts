import prisma from "../../lib/prismaPool";
import { IncomingForm } from "formidable";
import { uploadFilePublic } from "../../lib/s3";
import { getSession } from "next-auth/react";
// import mv from "mv";

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
        form.parse(req, async (err, fields, files) => {
            if (checkFileName(files.file[0].originalFilename) === true) {
                const name = fields.name[0];
                const uploadResult = await uploadFilePublic(files.file[0], `${name}.portrait.${files.file[0].originalFilename}`);
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
        name: fields.name[0],
        title: fields.title[0],
        description: fields.description[0],
        id: fields.id[0],
    };

    try {
        const maxNumber = await prisma.team.findMany({
            orderBy: [
                {
                    orderNumber: "desc",
                },
            ],
            take: 1,
        });
        const maxNum = maxNumber[0].orderNumber + 1;
        const update = await prisma.team.upsert({
            where: {
                id: parseInt(formObject.id),
            },
            update: {
                title: formObject.title,
                descrition: formObject.description,
                filename: fileKey,
                name: formObject.name,
            },
            create: {
                name: formObject.name,
                title: formObject.title,
                descrition: formObject.description,
                filename: fileKey,
                orderNumber: maxNum,
            },
        });
        const newTeam = await prisma.team.findMany({});
        return newTeam;
    } catch (err) {
        console.log("problem with POST /submitResume DB", err);
    }
}

async function saveDataGet(query) {
    try {
        const update = await prisma.team.upsert({
            where: {
                id: parseInt(query.id),
            },
            update: {
                title: query.title,
                descrition: query.description,
                name: query.name,
            },
            create: {
                name: query.name,
                title: query.title,
                descrition: query.description,
            },
        });
        const newTeam = await prisma.team.findMany({});
        return newTeam;
    } catch (err) {
        console.log("problem with POST /submitResume DB", err);
    }
}

export default async (req, res) => {
    const session = await getSession({ req });
    //@ts-ignore
    if (session && session.user.role === "admin") {
        if (req.method === "POST") {
            try {
                const [pass, savedFile, fileds]: any = await saveFile(req);
                // console.log("file saved", pass, savedFile, fileds);

                if (pass) {
                    const newTeam = await saveDataPost(req, savedFile.fileKey, fileds);
                    // console.log("newteam", newTeam);
                    res.status(200).json({ msg: "success", employees: newTeam });
                } else {
                    console.log("denied file save!");
                    res.status(401).json({ msg: "denied" });
                }
            } catch (err) {
                console.log("/POST submitEmployee Error:", err);
                res.status(400).json({ msg: "denied" });
            }
        } else {
            try {
                const newTeam = await saveDataGet(req.query);
                res.status(200).json({ msg: "success", employees: newTeam });
            } catch (err) {
                console.log("/GET submitEmployee Error:", err);
                res.status(400).json({ msg: "denied" });
            }
        }
    }
};
