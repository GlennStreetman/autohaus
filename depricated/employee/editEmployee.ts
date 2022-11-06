import { IncomingForm } from "formidable";
import { uploadFilePublic } from "../../../lib/s3";
import { getSession } from "next-auth/react";
import prisma from "../../../lib/prismaPool";

export const config = {
    api: {
        bodyParser: false,
    },
};

async function updateText(savedFile, fields) {
        try {
            console.log('updatetext', savedFile, fields)
        await prisma.team.update({
            where: {
                id: parseInt(fields.id),
            },
            data: {
                title: fields.title[0],
                description: fields.description[0],
                name: fields.name[0],
                filename: savedFile.fileKey
            },
        });
        return true;
    } catch (err) {
        console.log("problem with POST /employee/editEmployeeText DB", err);
    }
}

interface savedFileReturn {
    fileKey: string;
}

function checkFileName(fileName) {
    try {
        if (fileName !== "" && ["png", "jpg", "svg"].includes(fileName.split(".").pop())) {
            return true;
        } else {
            return false;
        }
    } catch (err) {
        console.log("/editEmployee checkFileName", err);
    }
}

async function saveFile(req) {
    try {
        const form = new IncomingForm();
        const data = await new Promise((resolve, reject) => {
            form.parse(req, async (err, fields, files) => {
                if (checkFileName(files.file[0].originalFilename) === true) {
                    const name = fields.name[0];
                    const uploadResult = await uploadFilePublic(files.file[0], `${name}.portrait.${files.file[0].originalFilename}`);
                    const returnData: savedFileReturn = { fileKey: uploadResult["key"] };
                    resolve([true, returnData, fields]);
                } else {
                    resolve([false, false, false]);
                }
            });
        });

        return data;
    } catch (err) {
        console.log("/editEmployee saveFile", err);
    }
}

const editEmployee = async (req, res) => {
    const session = await getSession({ req });
    //@ts-ignore
    if (session && session.user.role === "admin") {
        if (req.method === "POST") {
            try {
                const [pass, savedFile, fields]: any = await saveFile(req);
                if (pass) {
                    await updateText(savedFile, fields);
                    fetch(`${process.env.NEXTAUTH_URL}/api/revalidate?secret=${process.env.NEXT_REVALIDATE}&path=/about`);
                    fetch(`${process.env.NEXTAUTH_URL}/api/revalidate?secret=${process.env.NEXT_REVALIDATE}&path=/`);
                    res.status(200).json({ msg: "success" });
                } else {
                    console.log("denied file save!");
                    res.status(401).json({ msg: "denied" });
                }
            } catch (err) {
                console.log("/POST editEmployee Error:", err);
                res.status(400).json({ msg: "denied" });
            }
        } else {
            res.status(400).json({ msg: "denied" });
        }
    }
};

export default editEmployee; 
