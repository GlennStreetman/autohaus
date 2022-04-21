import type { NextApiRequest, NextApiResponse } from "next";
import PrismaClient from "./../../lib/prismaPool";
import { getSession } from "next-auth/react";

interface filters {
    archived: boolean;
    table: "servicerequests" | "resume";
    record: number;
}

export default async (req, res) => {
    const session = await getSession({ req });
    if (session) {
        try {
            const body = JSON.parse(req.body);
            const table = body.table;
            const prisma = PrismaClient;
            const findServiceRequests = await prisma[table].update({
                where: {
                    id: body.record,
                },
                data: {
                    archive: body.archived,
                },
            });
            res.status(200).json({ records: findServiceRequests });
        } catch (err) {
            console.log("POST /updateArchived: Problem archiving record: ", err);
            res.status(400).json("problem archiving record");
        }
    } else {
        console.log("not signed in");
        res.status(401);
    }
    res.end();
};
