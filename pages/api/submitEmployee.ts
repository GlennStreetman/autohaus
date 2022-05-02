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
    // console.log("FILENAME-----", fileName);
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
                // var oldPath = files.file[0].filepath;
                // var newPath = `./public/uploads/${fields.email[0]}.${files.file[0].originalFilename}`;
                // mv(oldPath, newPath, function (err) {
                //     if (err !== null) console.log("POST /submitResume problem saving file", err);
                // });

                // console.log("resume submitted:", fields.email[0]);
                const name = fields.name[0];
                //.replaceAll(" ", "_");
                const uploadResult = await uploadFilePublic(files.file[0], `${name}.portrait.${files.file[0].originalFilename}`);
                console.log("s3 Resulte: ", uploadResult);
                const returnData: savedFileReturn = { fileKey: uploadResult["key"] };
                resolve([true, returnData, fields]);
            } else {
                resolve([false, false, false]);
            }
        });

        // });
    });

    return data;
}

async function saveData(req, fileKey, fields) {
    const formObject = {
        name: fields.name[0],
        title: fields.title[0],
        description: fields.description[0],
    };

    try {
        // console.log("update db");
        const update = await prisma.team.upsert({
            where: {
                name: formObject.name,
            },
            update: {
                title: formObject.title,
                descrition: formObject.description,
                filename: fileKey,
            },
            create: {
                name: formObject.name,
                title: formObject.title,
                descrition: formObject.description,
                filename: fileKey,
            },
        });
        const newTeam = await prisma.team.findMany({});
        return newTeam;
    } catch (err) {
        console.log("problem with POST /submitResume DB", err);
    }
    // });
}

export default async (req, res) => {
    try {
        const session = await getSession({ req });
        //@ts-ignore
        if (session && session.user.roll === "admin") {
            const [pass, savedFile, fileds]: any = await saveFile(req);
            // console.log("file saved", pass, savedFile, fileds);

            if (pass) {
                const newTeam = await saveData(req, savedFile.fileKey, fileds);
                // console.log("newteam", newTeam);
                res.status(200).json({ msg: "success", employees: newTeam });
            } else {
                console.log("denied file save!");
                res.status(401).json({ msg: "denied" });
            }
        }
    } catch (err) {
        console.log("/POST submitResume Error:", err);
        res.status(400).json({ msg: "denied" });
    }
};
