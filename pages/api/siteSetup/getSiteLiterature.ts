import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prismaPool";
import { getSession } from "next-auth/react";

interface savedContact {
    FPBannerText?: string;
    aboutHeading?: string;
    aboutBody?: string;
    thanksResume?: string;
    thanksService?: string;
}

export default async (req, res) => {
    const session = await getSession({ req });
    // @ts-ignore
    if (session && session.user.role === "admin") {
        try {
            const siteContacts = await prisma.sitesetup.findMany({
                where: {
                    name: {
                        in: ["FPBannerText", "aboutHeading", "aboutBody", "thanksResume", "thanksService"],
                    },
                },
            });
            const returnData = siteContacts.reduce((prev, curr) => {
                prev[curr.name] = curr.value;
                return prev;
            }, {});
            res.status(200).json(returnData);
        } catch (err) {
            console.log("GET /getSiteLiterature: Problem creating record: ", err);
            res.status(400).json("problem getSiteLiterature");
        }
    } else {
        console.log("not signed in");
        res.status(401);
    }
    res.end();
};
