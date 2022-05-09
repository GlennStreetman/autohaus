import prisma from "../../../lib/prismaPool";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
    const session = await getSession({ req });
    // @ts-ignore
    if (session && session.user.role === "admin") {
        await prisma.team.delete({
            where: {
                id: parseInt(req.query.id),
            },
        });
        fetch(`${process.env.NEXTAUTH_URL}/api/revalidate?secret=${process.env.NEXT_REVALIDATE}&path=/team`);
        res.status(200).json({ msg: "success" });
    } else {
        res.status(400);
    }
}
