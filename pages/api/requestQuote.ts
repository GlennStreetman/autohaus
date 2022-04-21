import mailgun from "mailgun.js";
import formData from "form-data";
import PrismaClient from "./../../lib/prismaPool";

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
        const phone = req.body.phone;
        const prefDate = req.body.prefDate;
        const prefTime = req.body.prefTime;
        const altDate = req.body.altDate;
        const altTime = req.body.altTime;
        const make = req.body.make;
        const model = req.body.model;
        const year = req.body.year;
        const reason = req.body.reason;

        const prisma = PrismaClient;

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
    firstName: ${req.body.firstName}
    lastName: ${req.body.lastName}
    email: ${req.body.email}
    phone: ${req.body.phone}
    prefDate: ${req.body.prefDate}
    prefTime: ${req.body.prefTime}
    altDate: ${req.body.altDate}
    altTime: ${req.body.altTime}
    make: ${req.body.make}
    model: ${req.body.model}
    year: ${req.body.year}
    reason: ${req.body.reason}
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
