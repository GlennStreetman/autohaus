import prisma from "../../../lib/prismaPool";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
    const session = await getSession({ req });
    try {
        // @ts-ignore
        if (session && session.user.role === "admin") {
            const users = await prisma.user.findMany({
                select: {
                    id: true,
                    email: true,
                    role: true,
                },
                where: {
                    email: {
                        not: session.user.email,
                    },
                    superUser: { not: true },
                },
                orderBy: [
                    {
                        email: "asc",
                    },
                ],
            });
            res.status(200).json({ msg: "success", users: users });
        } else {
            res.status(401).json({ msg: "Denied" });
        }
    } catch (err) {
        console.log("problem with get /getUsers", err);
        res.status(500).json({ msg: "Problem getting /getUsers" });
    }
}
