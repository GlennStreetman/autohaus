// import Client from "pg";
import db from "../../lib/dbPool";
import format from "pg-format";
import mailgun from "mailgun.js";
import formData from "form-data";

interface requestBody {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    prefDate: string;
    prefTime: string;
    altDate: string;
    altTime: string;
    make: string;
    model: string;
    year: string;
    reason: string;
}

async function saveRequestToDB(req) {
    // let db = new Client.Client({
    //     sslmode: "disable",
    //     user: process.env.pguser,
    //     host: process.env.pghost,
    //     database: process.env.pgdatabase,
    //     password: process.env.pgpassword,
    //     port: process.env.pgporInternal,
    // });

    const firstName = format(req.body.firstName);
    const lastName = format(req.body.lastName);
    const email = format(req.body.email);
    const phone = format(req.body.phone);
    const prefDate = format(req.body.prefDate);
    const prefTime = format(req.body.prefTime);
    const altDate = format(req.body.altDate);
    const altTime = format(req.body.altTime);
    const make = format(req.body.make);
    const model = format(req.body.model);
    const year = format(req.body.year);
    const reason = format(req.body.reason);

    try {
        const saveRequest = `
        INSERT INTO servicerequests (firstname, lastname, email, phone, prefdate, preftime, altdate, alttime, make, model, modelyear, reason)
        VALUES ('${firstName}', '${lastName}', '${email}', '${phone}', '${prefDate}', '${prefTime}', '${altDate}', '${altTime}', '${make}', '${model}', '${year}', '${reason}')
       `;
        // await db.connect();
        await db.query(saveRequest, (err, rows) => {
            // db.end();
            if (err) {
                console.log("problem saving requestQuote", saveRequest, err);
            } else {
                console.log("quote saved");
            }
        });
    } catch (err) {
        console.log("problem with POST /requestQuote DB", err);
    }
}

function emailRequest(req) {
    try {
        const API_KEY = process.env.MAILGUN_API_KEY;
        const DOMAIN = process.env.DOMAIN;
        const mailGun = new mailgun(formData);
        const client = mailGun.client({ username: "api", key: API_KEY });
        const mailGunEmail = process.env.SUPPORT_EMAIL;
        const emailBody = `
    firstName: ${format(req.body.firstName)}
    lastName: ${format(req.body.lastName)}
    email: ${format(req.body.email)}
    phone: ${format(req.body.phone)}
    prefDate: ${format(req.body.prefDate)}
    prefTime: ${format(req.body.prefTime)}
    altDate: ${format(req.body.altDate)}
    altTime: ${format(req.body.altTime)}
    make: ${format(req.body.make)}
    model: ${format(req.body.model)}
    year: ${format(req.body.year)}
    reason: ${format(req.body.reason)}
    `;
        const data = {
            from: mailGunEmail,
            to: req.body.email,
            subject: `Service Request: ${format(req.body.firstName)} ${format(req.body.lastName)} ${format(req.body.make)} ${format(req.body.model)}`,
            text: emailBody,
        };

        client.messages
            .create(DOMAIN, data)
            .then((res) => {
                // console.log("mailgun success:", res);
            })
            .catch((err) => {
                console.error("mailgun error:", err);
            });
    } catch (err) {
        console.log("mail error1:", err);
    }
}

export default async function handler(req, res) {
    if (req.method === "POST") {
        saveRequestToDB(req);
        emailRequest(req);
        res.status(200).json("Quote Saved");
    }
}
