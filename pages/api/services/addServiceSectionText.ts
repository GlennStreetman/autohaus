import { getSession } from "next-auth/react";
import prisma from "../../../lib/prismaPool";

export interface addServiceSectionTextReq {
    sectionName: string;
    sectionBody: string;
    serviceID: number;
    serviceName: string;
}

async function rerenderRoutes(service) {
    try {
        if (service) {
            let shortName = service.replace(/[^a-z0-9+]+/gi, "");
            fetch(`${process.env.NEXTAUTH_URL}/api/revalidate?secret=${process.env.NEXT_REVALIDATE}&path=/`); //home page carousel
            fetch(`${process.env.NEXTAUTH_URL}/api/revalidate?secret=${process.env.NEXT_REVALIDATE}&path=/services/${shortName}`); //route to service
        }
    } catch (err) {
        console.log("problem with POST /addServiceSectionText RERENDER", err);
        return false;
    }
}

async function saveTextPost(body) {
    try {
        const maxNumber = await prisma.servicesection.findMany({
            where: {
                serviceid: parseInt(body.serviceID),
            },
            orderBy: [
                {
                    ordernumber: "desc",
                },
            ],
            take: 1,
        });
        const maxNum = maxNumber?.[0]?.ordernumber ? maxNumber[0].ordernumber + 1 : 1;

        const formObject = {
            sectionheader: body.sectionName,
            sectiontext: body.sectionBody,
            serviceid: parseInt(body.serviceID),
            ordernumber: maxNum,
        };

        const createObj = {
            data: formObject,
        };
        await prisma.servicesection.create(createObj);
        return true;
    } catch (err) {
        console.log("problem with POST /addServiceSectionText DB", err);
        return false;
    }
}

const addServiceSectionText = async (req, res) => {
    const session = await getSession({ req });
    //@ts-ignore
    if (session && session.user.role === "admin") {
        if (req.method === "POST") {
            try {
                const body = JSON.parse(req.body);
                const servicesUpdated = await saveTextPost(body);
                if (servicesUpdated) {
                    rerenderRoutes(body.name);
                    res.status(200).json({ msg: "success" });
                } else {
                    res.status(500).json({ msg: "problem saving service section." });
                }
            } catch (err) {
                console.log("/POST addServiceSectionText Error:", err);
                res;
            }
        }
    }
};

export default addServiceSectionText;
