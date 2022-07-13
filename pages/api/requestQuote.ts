import mailgun from "mailgun.js";
import formData from "form-data";
import prisma from "./../../lib/prismaPool";
import { stripPhone, addDashes } from "./../../lib/formatPhone";
import { PublicContext } from "../../components/publicData";

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
    vinNumber: string;
}

async function saveRequestToDB(req) {
    try {

        const saveRequest = await prisma.servicerequests.create({
            data: {
                firstname:  req.body.firstName,
                lastname: req.body.lastName,
                email: req.body.email,
                phone:  stripPhone(req.body.phone),
                prefdate:  req.body.prefDate,
                preftime: req.body.prefTime,
                altdate:  req.body.altDate,
                alttime: req.body.altTime,
                make: req.body.make,
                model: req.body.model,
                modelyear: req.body.year,
                reason: req.body.reason,
                vin: req.body.vinNumber,
            },
        });

        console.log(saveRequest);
    } catch (err) {
        console.log("Problem saving request to db: ", err);
    }
}

function emailRequest(req, logoImage) {
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
                    <a href="${process.env.NEXTAUTH_URL}" target="_blank">
                        <img src="${process.env.NEXT_PUBLIC_AWS_PUBLIC_BUCKET_URL}${logoImage}" alt="logo" width="200px" height="200px" />
                    </a>
                </div>
                <div className="w-full h-auto">
                <b>New Service Request:</b>
                    <ul>
                        <li> ${req.body.firstName} ${req.body.lastName}</li>
                        <li>${req.body.email}</li>
                        <li><a href="tel:${addDashes(req.body.phone)}">${addDashes(req.body.phone)}</a></li>
                        <li>Preferrred Date: ${req.body.prefDate} - ${req.body.prefTime}</li>
                        <li>Alternative Date: ${req.body.altDate} - ${req.body.altTime}</li>
                        <li>Make: ${req.body.year} ${req.body.make} ${req.body.model}</li>
                        <li>Vin: ${req.body.vinNumber}</li> 
                    </ul>
                <b>Reason for visit:</b> <br />
                ${req.body.reason}
                </div>
            </body>
        </html>
    `;
        const data = {
            from: mailGunEmail,
            to: req.body.email,
            subject: `Service Request: ${req.body.firstName} ${req.body.lastName} ${req.body.make} ${req.body.model}`,
            html: emailBody,
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
    const logoImage = await prisma.sitesetup.findMany({
        where: {
            name: 'logoImage'
        }
    });
    if (req.method === "POST") {
        saveRequestToDB(req);
        emailRequest(req, logoImage[0].value);
        res.status(200).json("Quote Saved");
    }
}
