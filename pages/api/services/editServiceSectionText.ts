import { getSession } from "next-auth/react";
import prisma from "../../../lib/prismaPool";

export interface editServiceSectionTextReq {
    sectionHeader: string;
    sectionText: string;
    id: number;
    service: string;
}

async function rerenderRoutes(service) {
    const shortName = service.replaceAll(" ", "");
    fetch(`${process.env.NEXTAUTH_URL}/api/revalidate?secret=${process.env.NEXT_REVALIDATE}&path=/`); //home page carousel
    fetch(`${process.env.NEXTAUTH_URL}/api/revalidate?secret=${process.env.NEXT_REVALIDATE}&path=/services/${shortName}`); //route to service
}

async function saveTextEdit(body) {
    try {
        const updateObj = {
            where: {
                id: parseInt(body.id),
            },
            data: {
                sectionheader: body.sectionHeader,
                sectiontext: body.sectionText,
            },
        };
        await prisma.servicesection.update(updateObj);
    } catch (err) {
        console.log("problem with POST /editServiceSectionText DB", err);
        return false;
    }
}

const editServiceSectionText = async (req, res) => {
    const session = await getSession({ req });
    //@ts-ignore
    if (session && session.user.role === "admin") {
        if (req.method === "POST") {
            try {
                const body: editServiceSectionTextReq = JSON.parse(req.body);
                await saveTextEdit(body);
                rerenderRoutes(body.service);
                res.status(200).json({ msg: "success" });
            } catch (err) {
                console.log("/POST editSectionText Error:", err);
                res.status(500).json({ msg: "Problem updating section text" });
            }
        } else {
            res.status(500).json({ msg: "Problem updating section text" });
        }
    } else {
        res.status(400).json({ msg: "denied" });
    }
};

export default editServiceSectionText;
