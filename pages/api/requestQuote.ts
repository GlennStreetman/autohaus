import mailgun from "mailgun.js";
import formData from "form-data";
import prisma from "./../../lib/prismaPool";
import { stripPhone } from "./../../lib/formatPhone";

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
    try {
        const firstName = req.body.firstName;
        const lastName = req.body.lastName;
        const email = req.body.email;
        const phone = stripPhone(req.body.phone);
        const prefDate = req.body.prefDate;
        const prefTime = req.body.prefTime;
        const altDate = req.body.altDate;
        const altTime = req.body.altTime;
        const make = req.body.make;
        const model = req.body.model;
        const year = req.body.year;
        const reason = req.body.reason;

        const saveRequest = await prisma.servicerequests.create({
            data: {
                firstname: firstName,
                lastname: lastName,
                email: email,
                phone: phone,
                prefdate: prefDate,
                preftime: prefTime,
                altdate: altDate,
                alttime: altTime,
                make: make,
                model: model,
                modelyear: year,
                reason: reason,
            },
        });

        console.log(saveRequest);
    } catch (err) {
        console.log("Problem saving request to db: ", err);
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
        <!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="UTF-8" />
                <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Document</title>
            </head>
            <body>
                <div className="w-full h-auto">
                    <a href="autohaus.gstreet.dev" target="_blank">
                        <img src="/public/mockLogo.png" alt="logo" width="100px" height="'100px" />
                    </a>
                </div>
                <div className="w-full h-auto">
                    <ul>
                        <li>firstName: ${req.body.firstName}</li>
                        <li>lastName: ${req.body.lastName}</li>
                        <li>email: ${req.body.email}</li>
                        <li>phone: ${req.body.phone}</li>
                        <li>prefDate: ${req.body.prefDate}</li>
                        <li>prefTime: ${req.body.prefTime}</li>
                        <li>altDate: ${req.body.altDate}</li>
                        <li>altTime: ${req.body.altTime}</li>
                        <li>make: ${req.body.make}</li>
                        <li>model: ${req.body.model}</li>
                        <li>year: ${req.body.year}</li>
                        <li>reason: ${req.body.reason}</li>
                    </ul>
                </div>
            </body>
        </html>
    `;
        const data = {
            from: mailGunEmail,
            to: req.body.email,
            subject: `Service Request: ${req.body.firstName} ${req.body.lastName} ${req.body.make} ${req.body.model}`,
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
        console.log("Problem emailing service request:", err);
    }
}

export default async function handler(req, res) {
    if (req.method === "POST") {
        saveRequestToDB(req);
        emailRequest(req);
        res.status(200).json("Quote Saved");
    }
}
