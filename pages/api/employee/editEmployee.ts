import prisma from "../../../lib/prismaPool";
import { IncomingForm } from "formidable";
import { uploadFilePublic } from "../../../lib/s3";
import { getSession } from "next-auth/react";

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
                const returnData: savedFileReturn = { fileKey: uploadResult["key"] };
                resolve([true, returnData, fields]);
            } else {
                resolve([false, false, false]);
            }
        });
    });

    return data;
}

const editEmployee = async (req, res) => {
    const session = await getSession({ req });
    //@ts-ignore
    if (session && session.user.role === "admin") {
        if (req.method === "POST") {
            try {
                const [pass, savedFile, fields]: any = await saveFile(req);
                if (pass) {
                    fetch(`${process.env.NEXTAUTH_URL}/api/revalidate?secret=${process.env.NEXT_REVALIDATE}&path=/team`);
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
