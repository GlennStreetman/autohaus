import prisma from "../../../lib/prismaPool";
import { getSession } from "next-auth/react";

interface deleteOurServicesParams {
    id: string;
    name: string;
}

async function rerenderRoutes() {
    fetch(`${process.env.NEXTAUTH_URL}/api/revalidate?secret=${process.env.NEXT_REVALIDATE}&path=/`); //home page carousel
}

export default async function handler(req, res) {
    const session = await getSession({ req });
    // @ts-ignore
    if (session && session.user.role === "admin") {
        const query: deleteOurServicesParams = req.query;
        console.log("query", query);
        await prisma.servicesection.deleteMany({
            where: {
                serviceid: parseInt(query.id),
            },
        });
        await prisma.services.delete({
            where: {
                id: parseInt(query.id),
            },
        });
        rerenderRoutes();
        res.status(200).json({ msg: "success" });
    } else {
        res.status(400);
    }
}
