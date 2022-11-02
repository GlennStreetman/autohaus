import prisma from "../../../lib/prismaPool";
import { getSession } from "next-auth/react";

interface deleteServiceSectoinReq {
    id: string;
    name: string;
}

async function rerenderRoutes(service) {
    try {
        let shortName = service.replace(/[^a-z0-9+]+/gi, "");
        fetch(`${process.env.NEXTAUTH_URL}/api/revalidate?secret=${process.env.NEXT_REVALIDATE}&path=/`); //home page carousel
        fetch(`${process.env.NEXTAUTH_URL}/api/revalidate?secret=${process.env.NEXT_REVALIDATE}&path=/services/${shortName}`); //route to service
    } catch (err) {
        console.log("/deleteServiceSection rerenderRoutes", err);
    }
}

export default async function handler(req, res) {
    const session = await getSession({ req });
    // @ts-ignore
    if (session && session.user.role === "admin") {
        const params: deleteServiceSectoinReq = req.query;
        await prisma.servicesection.delete({
            where: {
                id: parseInt(params.id),
            },
        });
        rerenderRoutes(params.name);
        res.status(200).json({ msg: "success" });
    } else {
        res.status(400);
    }
}
