import { getSession } from "next-auth/react";
import prisma from "../../../lib/prismaPool";

export interface editOurServicesTextReq {
    name: string; //this could be a new name!
    bannerText: string;
    id: string;
}

async function rerenderRoutes(service) {
    const shortName = service.replaceAll(" ", "");
    fetch(`${process.env.NEXTAUTH_URL}/api/revalidate?secret=${process.env.NEXT_REVALIDATE}&path=/`); //home page carousel
    fetch(`${process.env.NEXTAUTH_URL}/api/revalidate?secret=${process.env.NEXT_REVALIDATE}&path=/services/${shortName}`); //route to service
}

async function saveTextEdit(params: editOurServicesTextReq) {
    try {
        const updateObj = {
            where: {
                id: parseInt(params.id),
            },
            data: {
                name: params.name,
                bannertext: params.bannerText,
            },
        };
        console.log;
        await prisma.services.update(updateObj);
    } catch (err) {
        console.log("problem with POST /editOurServicesText DB", err);
        return false;
    }
}

const editOurServicesText = async (req, res) => {
    const session = await getSession({ req });
    //@ts-ignore
    if (session && session.user.role === "admin") {
        if (req.method === "POST") {
            try {
                console.log("body", req.body);
                const body: editOurServicesTextReq = JSON.parse(req.body);
                await saveTextEdit(body);
                rerenderRoutes(body.name);
                res.status(200).json({ msg: "success" });
            } catch (err) {
                console.log("/POST editOurServices Error:", err);
                res.status(400).json({ msg: "denied" });
            }
        }
    }
};

export default editOurServicesText;
