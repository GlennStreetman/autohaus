import db from "../../lib/dbPool";
import fs from "fs";
import { IncomingForm } from "formidable";
import mv from "mv";
import format from "pg-format";

export const config = {
    api: {
        bodyParser: false,
    },
};

async function saveFile(req, form) {
    // const data = await new Promise((resolve, reject) => {

    form.parse(req, (err, fields, files) => {
        // if (err) return reject(err);
        // console.log("---1---", fields);
        var oldPath = files.file[0].filepath;
        var newPath = `./public/uploads/${fields.email[0]}`;
        mv(oldPath, newPath, function (err) {
            if (err !== null) console.log("POST /submitResume problem saving file", err);
        });

        console.log("resume submitted:", fields.email[0]);
        // resolve(true);
    });
    // });
    // return data;
}

async function saveData(req, form) {
    form.parse(req, (err, fields, files) => {
        const firstName = format(fields.firstName[0]);
        const lastName = format(fields.lastName[0]);
        const email = format(fields.email[0]);
        const phone = format(fields.phone[0]);
        const address1 = format(fields.address[0]);
        const address2 = format(fields.address2[0]);
        const city = format(fields.city[0]);
        const state1 = format(fields.state[0]);
        const zip = format(fields.zip[0]);
        const coverletter = format(fields.coverLetter[0]);

        const saveRequest = `
        INSERT INTO resumes (firstname, lastname, email, phone, address1, address2, city, state1, zip, coverletter)
        VALUES ('${firstName}', '${lastName}', '${email}', '${phone}', '${address1}', '${address2}', '${city}', '${state1}', '${zip}', '${coverletter}')
       `;

        try {
            db.query(saveRequest, (err, rows) => {
                if (err) {
                    console.log("POST submitResume: Problem backing up resume to db. ", saveRequest, err);
                } else {
                    console.log("resume data saved to postgres for ", email);
                }
            });
        } catch (err) {
            console.log("problem with POST /submitResume DB", err);
        }
    });
}

export default async (req, res) => {
    const form = new IncomingForm();
    saveFile(req, form);
    saveData(req, form);
    res.status(200).json({});
};
