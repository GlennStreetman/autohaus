import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prismaPool";
import { getSession } from "next-auth/react";

export interface getSiteImageReq {
    name: string;
}

export interface getSiteImageResBody {
    msg: string;
    name?: string;
}

export type getSiteImageRes = NextApiResponse<getSiteImageResBody>;

export default async (req, res: getSiteImageRes) => {
    const session = await getSession({ req });
    // @ts-ignore
    if (session && session.user.role === "admin") {
        const query = req.query;
        try {
            const image = await prisma.sitesetup.findUnique({
                where: {
                    name: query.name,
                },
            });
            res.status(200).json({ msg: "success", name: image.value });
        } catch (err) {
            console.log("GET /getSiteContact: Problem creating record: ", err);
            res.status(400).json({ msg: "Problem getting site contacts" });
        }
    } else {
        console.log("not signed in");
        res.status(401).json({ msg: "Forbidden" });
    }
};
