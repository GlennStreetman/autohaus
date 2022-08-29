import mailgun from "mailgun.js";
import formData from "form-data";
import prisma from "./../../lib/prismaPool";
import { stripPhone, addDashes } from "./../../lib/formatPhone";


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

function emailRequest(req, publicData) {
    try {
        const servicePhone = addDashes(publicData.phone)
        const userPhone = addDashes(req.body.phone)
        const API_KEY = process.env.MAILGUN_API_KEY;
        const DOMAIN = process.env.DOMAIN;
        const mailGun = new mailgun(formData);
        const client = mailGun.client({ username: "api", key: API_KEY });
        const mailGunEmail = publicData.serviceEmail;
        const serviceRequest = `<!DOCTYPE html>
        <html lang="en" xmlns:v="urn:schemas-microsoft-com:vml">
        <head>
          <meta charset="utf-8">
          <meta name="x-apple-disable-message-reformatting">
          <meta http-equiv="x-ua-compatible" content="ie=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <meta name="format-detection" content="telephone=no, date=no, address=no, email=no">
          <meta name="color-scheme" content="light dark">
          <meta name="supported-color-schemes" content="light dark">
          <!--[if mso]>
          <noscript>
            <xml>
              <o:OfficeDocumentSettings xmlns:o="urn:schemas-microsoft-com:office:office">
                <o:PixelsPerInch>96</o:PixelsPerInch>
              </o:OfficeDocumentSettings>
            </xml>
          </noscript>
          <style>
            td,th,div,p,a,h1,h2,h3,h4,h5,h6 {font-family: "Segoe UI", sans-serif; mso-line-height-rule: exactly;}
          </style>
          <![endif]-->
          <title>Service Request</title>
          <style>
            @media (max-width: 600px) {
              .sm-w-full {
                width: 100% !important;
              }
              .sm-px-8 {
                padding-left: 32px !important;
                padding-right: 32px !important;
              }
              .sm-px-6 {
                padding-left: 24px !important;
                padding-right: 24px !important;
              }
            }
          </style>
        </head>
        <body style="word-break: break-word; -webkit-font-smoothing: antialiased; margin: 0; width: 100%; background-color: #e5e7eb; padding: 0">
          <div role="article" aria-roledescription="email" aria-label="Service Request" lang="en">
            <table style="width: 100%; font-family: ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif" cellpadding="0" cellspacing="0" role="presentation">
              <tr>
                <td align="center" style="background-color: #e5e7eb; padding-top: 24px; padding-bottom: 24px">
                  <table class="sm-w-full" style="width: 600px" cellpadding="0" cellspacing="0" role="presentation">
                    <tr>
                      <td align="center" class="sm-px-8">
                        <table class="sm-w-full" style="width: 75%" cellpadding="0" cellspacing="0" role="presentation">
                          <tr>
                            <table class="sm-w-full" style="width: 75%" cellpadding="0" cellspacing="0" role="presentation">
                              <td style="padding-bottom: 16px; text-align: center; font-size: 12px; color: #4b5563"> <a href="${process.env.NEXTAUTH_URL}" target="_blank">
                                  <img src="${process.env.NEXT_PUBLIC_AWS_PUBLIC_BUCKET_URL}${publicData.emailImage}" alt="The Werkstatt">
                                </a>
                              </td>
                            </table>
                          </tr>
                          <tr>
                            <td class="sm-px-6" style="background-color: #fff; padding: 48px; font-weight: 500">
                              <b>New Service Request:</b>
                              <ul>
                                <li> ${req.body.firstName} ${req.body.lastName}</li>
                                <li>${req.body.email}</li>
                                <li><a href="tel:${req.body.phone}">${userPhone}</a></li>
                                <li>Preferrred Date: ${req.body.prefDate} - ${req.body.prefTime}</li>
                                <li>Alternative Date: ${req.body.altDate} - ${req.body.altTime}</li>
                                <li>Make: ${req.body.year} ${req.body.make} ${req.body.model}</li>
                                <li>Vin: ${req.body.vinNumber}</li>
                              </ul>
                              <b>Reason for visit:</b> <br>
                              <pre classname="whitespace-pre-line">${req.body.reason}</pre>
                            </td>
                          </tr>
                          <tr>
                            <td style="height: 2px; background-color: #d1d5db"></td>
                          </tr>
                          <tr>
                            <td style="padding: 32px; text-align: center; font-size: 12px; color: #4b5563">
                              <p style="margin: 0; font-style: italic"><b>The Werkstatt LLC</b></p>
                              <p style="margin: 0; font-style: italic"><a href="tel:${publicData.phone}">${servicePhone}</a></p>
                              <p style="margin: 0; font-style: italic"><a href="${publicData.googleLink}">${publicData.addressLong}</a></p>
                              <p style="margin: 0; font-style: italic">This message was sent to you as a result of your request to: ${process.env.NEXTAUTH_URL}</p>
                              <p style="margin: 0; font-style: italic">If these messages are being sent in error please contact: <a href="${process.env.NEXT_PUBLIC_ITADMIN}">${process.env.NEXT_PUBLIC_ITADMIN}</a></p>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </div>
        </body>
        </html>`
        const data = {
            from: mailGunEmail,
            to: publicData.serviceEmail,
            subject: `Service Request: ${req.body.firstName} ${req.body.lastName} ${req.body.make} ${req.body.model}`,
            html: serviceRequest,
        };

        client.messages
            .create(DOMAIN, data)
            .then((res) => {
                console.log("Service Request sent to:",  publicData.serviceEmail);
            })
            .catch((err) => {
                console.error("mailgun error /requestQuote:", err);
            });
    } catch (err) {
        console.log("Problem emailing service request:", err);
    }
}
function emailClient(req, publicData) {
  try {
      const servicePhone = addDashes(publicData.phone)
      const userPhone = addDashes(req.body.phone)
      const API_KEY = process.env.MAILGUN_API_KEY;
      const DOMAIN = process.env.DOMAIN;
      const mailGun = new mailgun(formData);
      const client = mailGun.client({ username: "api", key: API_KEY });
      const mailGunEmail = publicData.serviceEmail;
      const serviceRequest = `<!DOCTYPE html>
      <html lang="en" xmlns:v="urn:schemas-microsoft-com:vml">
      <head>
        <meta charset="utf-8">
        <meta name="x-apple-disable-message-reformatting">
        <meta http-equiv="x-ua-compatible" content="ie=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="format-detection" content="telephone=no, date=no, address=no, email=no">
        <meta name="color-scheme" content="light dark">
        <meta name="supported-color-schemes" content="light dark">
        <!--[if mso]>
        <noscript>
          <xml>
            <o:OfficeDocumentSettings xmlns:o="urn:schemas-microsoft-com:office:office">
              <o:PixelsPerInch>96</o:PixelsPerInch>
            </o:OfficeDocumentSettings>
          </xml>
        </noscript>
        <style>
          td,th,div,p,a,h1,h2,h3,h4,h5,h6 {font-family: "Segoe UI", sans-serif; mso-line-height-rule: exactly;}
        </style>
        <![endif]-->
        <title>Service Request</title>
        <style>
          @media (max-width: 600px) {
            .sm-w-full {
              width: 100% !important;
            }
            .sm-px-8 {
              padding-left: 32px !important;
              padding-right: 32px !important;
            }
            .sm-px-6 {
              padding-left: 24px !important;
              padding-right: 24px !important;
            }
          }
        </style>
      </head>
      <body style="word-break: break-word; -webkit-font-smoothing: antialiased; margin: 0; width: 100%; background-color: #e5e7eb; padding: 0">
        <div role="article" aria-roledescription="email" aria-label="Service Request" lang="en">
          <table style="width: 100%; font-family: ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif" cellpadding="0" cellspacing="0" role="presentation">
            <tr>
              <td align="center" style="background-color: #e5e7eb; padding-top: 24px; padding-bottom: 24px">
                <table class="sm-w-full" style="width: 600px" cellpadding="0" cellspacing="0" role="presentation">
                  <tr>
                    <td align="center" class="sm-px-8">
                      <table class="sm-w-full" style="width: 75%" cellpadding="0" cellspacing="0" role="presentation">
                        <tr>
                          <table class="sm-w-full" style="width: 75%" cellpadding="0" cellspacing="0" role="presentation">
                            <td style="padding-bottom: 16px; text-align: center; font-size: 12px; color: #4b5563"> <a href="${process.env.NEXTAUTH_URL}" target="_blank">
                                <img src="${process.env.NEXT_PUBLIC_AWS_PUBLIC_BUCKET_URL}${publicData.emailImage}" alt="The Werkstatt">
                              </a>
                            </td>
                          </table>
                        </tr>
                        <tr>
                          <td class="sm-px-6" style="background-color: #fff; padding: 48px; font-weight: 500">
                            <p> ${req.body.firstName},</p>
                            <p>${publicData.thanksService}</p>
                            <b>Your Service Request Details:</b>
                            <ul>
                              <li> ${req.body.firstName} ${req.body.lastName}</li>
                              <li>${req.body.email}</li>
                              <li>${userPhone}</li>
                              <li>Preferrred Date: ${req.body.prefDate} - ${req.body.prefTime}</li>
                              <li>Alternative Date: ${req.body.altDate} - ${req.body.altTime}</li>
                              <li>Make: ${req.body.year} ${req.body.make} ${req.body.model}</li>
                              <li>Vin: ${req.body.vinNumber}</li>
                            </ul>
                            <b>Reason for visit:</b> <br>
                            <pre style="font-weight: 500">${req.body.reason}</pre>
                            Sincerely,<br>
                            The Werkstatt Team
                          </td>
                        </tr>
                        <tr>
                          <td style="height: 2px; background-color: #d1d5db"></td>
                        </tr>
                        <tr>
                          <td style="padding: 32px; text-align: center; font-size: 12px; color: #4b5563">
                            <p style="margin: 0; font-style: italic"><b>The Werkstatt LLC</b></p>
                            <p style="margin: 0; font-style: italic"><a href="tel:${publicData.phone}">${servicePhone}</a></p>
                            <p style="margin: 0; font-style: italic"><a href="${publicData.googleLink}">${publicData.addressLong}</a></p>
                            <p style="margin: 0; font-style: italic">This message was sent to you as a result of your request to: ${process.env.NEXTAUTH_URL}</p>
                            <p style="margin: 0; font-style: italic">If these messages are being sent in error please contact: <a href="mailto:itadmin@werkstattla.com">itadmin@werkstattla.com</a></p>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </div>
      </body>
      </html>`
      const data = {
          from: mailGunEmail,
          to: req.body.email,
          subject: `Service Request: ${req.body.firstName} ${req.body.lastName} ${req.body.make} ${req.body.model}`,
          html: serviceRequest,
      };

      client.messages
          .create(DOMAIN, data)
          .then((res) => {
              // console.log("mailgun success:", res);
          })
          .catch((err) => {
              console.error("mailgun error /requestQuote:", err);
          });
  } catch (err) {
      console.log("Problem emailing service request:", err);
  }
}


export default async function handler(req, res) {

    let publicData:any = await prisma.sitesetup.findMany({})
    publicData = publicData.reduce((prev, curr)=>{
        prev[curr.name] = curr.value
        return prev
    },{})

    if (req.method === "POST") {
        saveRequestToDB(req);
        emailRequest(req, publicData);
        emailClient(req, publicData)
        res.status(200).json({message: 'success'});
    }
}
