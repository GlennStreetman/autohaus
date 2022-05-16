import prisma from "../../../lib/prismaPool";
import { getSession } from "next-auth/react";

interface quaryParams {
    email: string;
    role: string;
}

export default async function handler(req, res) {
    const session = await getSession({ req });
    try {
        // @ts-ignore
        if (session && session.user.role === "admin") {
            await prisma.user.updateMany({
                where: {
                    email: req.query.email,
                    superUser: false,
                },
                data: {
                    role: req.query.role,
                },
            });
            res.status(200).json({ msg: "success" });
        } else {
            res.status(401).json({ msg: "Denied" });
        }
    } catch (err) {
        console.log("problem with get /setUser", err);
        res.status(500).json({ msg: "Problem getting /setUser" });
    }
}
