import prisma from "./../../lib/prismaPool";
import { IncomingForm } from "formidable";
import mv from "mv";
import { uploadFile } from "./../../lib/s3";

export const config = {
    api: {
        bodyParser: false,
    },
};

interface savedFileReturn {
    fileKey: string;
}

async function saveFile(req) {
    const form = new IncomingForm();
    const data = await new Promise((resolve, reject) => {
        form.parse(req, async (err, fields, files) => {
            // if (err) return reject(err);
            // console.log("---1---", fields);
            var oldPath = files.file[0].filepath;
            // console.log("FILE", files.file[0]);
            var newPath = `./public/uploads/${fields.email[0]}.${files.file[0].originalFilename}`;
            mv(oldPath, newPath, function (err) {
                if (err !== null) console.log("POST /submitResume problem saving file", err);
            });

            // console.log("resume submitted:", fields.email[0]);
            const uploadResult = await uploadFile(files.file[0], `${fields.email[0]}.${files.file[0].originalFilename}`);
            console.log("s3 Resulte: ", uploadResult);
            const returnData: savedFileReturn = { fileKey: uploadResult["key"] };
            resolve([returnData, fields]);
        });
        // });
    });

    return data;
}

async function saveData(req, fileKey, fields) {
    const formObject = {
        firstName: fields.firstName[0],
        lastName: fields.lastName[0],
        email: fields.email[0],
        phone: fields.phone[0],
        address1: fields.address[0],
        address2: fields.address2[0],
        city: fields.city[0],
        state1: fields.state[0],
        zip: fields.zip[0],
        coverletter: fields.coverLetter[0],
    };

    try {
        console.log("update db");
        const update = await prisma.resumes.create({
            data: {
                firstname: formObject.firstName,
                lastname: formObject.lastName,
                email: formObject.email,
                phone: formObject.phone,
                address1: formObject.address1,
                address2: formObject.address2,
                city: formObject.city,
                state1: formObject.state1,
                zip: formObject.zip,
                coverletter: formObject.coverletter,
                filename: fileKey,
            },
        });
        console.log("update complete", update);
    } catch (err) {
        console.log("problem with POST /submitResume DB", err);
    }
    // });
}

export default async (req, res) => {
    const [savedFile, fileds]: any = await saveFile(req);
    saveData(req, savedFile.fileKey, fileds);
    res.status(200).json({});
};
