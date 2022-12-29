// import prisma from "./../../lib/prismaPool";
import { IncomingForm } from "formidable";
import { uploadFile } from "./../../lib/s3";

export const config = {
    api: {
        bodyParser: false,
    },
};

interface savedFileReturn {
    fileKey: string;
}

function checkFileName(fileName) {
    try {
        if (fileName !== "" && ["txt", "doc", "docx"].includes(fileName.split(".").pop())) {
            return true;
        } else {
            return false;
        }
    } catch (err) {
        console.log("/submitResume checkFileName", err);
    }
}

async function saveFile(req) {
    try {
        const form = new IncomingForm();
        const data = await new Promise((resolve, reject) => {
            form.parse(req, async (err, fields, files) => {
                if (checkFileName(files.file[0].originalFilename) === true) {
                    if (err) return reject(err);
                    const uploadResult = await uploadFile(files.file[0], `${fields.email[0]}.${files.file[0].originalFilename}`);
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
        console.log("/submitResume saveFile", err);
    }
}

// async function saveData(req, fileKey, fields) {
//     try {
//         const formObject = {
//             firstName: fields.firstName[0],
//             lastName: fields.lastName[0],
//             email: fields.email[0],
//             phone: stripPhone(fields.phone[0]),
//             address1: fields.address[0],
//             address2: fields.address2[0],
//             city: fields.city[0],
//             state1: fields.state[0],
//             zip: fields.zip[0],
//             coverletter: fields.coverLetter[0],
//         };

//         await prisma.resumes.create({
//             data: {
//                 firstname: formObject.firstName,
//                 lastname: formObject.lastName,
//                 email: formObject.email,
//                 phone: formObject.phone,
//                 address1: formObject.address1,
//                 address2: formObject.address2,
//                 city: formObject.city,
//                 state1: formObject.state1,
//                 zip: formObject.zip,
//                 coverletter: formObject.coverletter,
//                 filename: fileKey,
//             },
//         });
//     } catch (err) {
//         console.log("problem with POST /submitResume DB", err);
//     }
// }

const submitResume = async (req, res) => {
    const [pass, savedFile, fileds]: any = await saveFile(req);
    try {
        if (pass) {
            // saveData(req, savedFile.fileKey, fileds);
            res.status(200).json({ msg: "success" });
        } else {
            res.status(401).json({ msg: "denied" });
        }
    } catch (err) {
        console.log("/POST submitResume Error:", err);
        res.status(400).json({ msg: "denied" });
    }
};

export default submitResume;
