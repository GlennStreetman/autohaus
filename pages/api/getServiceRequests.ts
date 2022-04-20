import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { getSession } from "next-auth/react";

import React from "react";
import { constants } from "crypto";

interface filters {
    archived: string; //show archived?
    filterField: string; //which value to filter by
    filterService: string; //filter text for services
    fromDate: string; //min date
    toDate: string; //max date
}

interface reqBody {
    filters: filters;
}

function buildFilters(req) {
    console.log("req.body", req.body);
    const filters = {};
    const body = req.body;
    if (body.archived === false) filters["archive"] = { not: true };
    if (body.filterService !== "") filters[body.filterField] = { contains: body.filterService };
    if (body.fromDate !== "" || body.toDate !== "") filters["requestdate"] = {};
    if (body.fromDate !== "") filters["requestdate"].gte = `${body.fromDate}T00:00:00Z`;
    if (body.toDate !== "") filters["requestdate"].lte = `${body.toDate}T00:00:00Z`;
    return filters;
}

export default async (req, res) => {
    const session = await getSession({ req });
    if (session) {
        console.log("signed in");
        const filters = buildFilters(req);
        console.log(filters);
        const prisma = new PrismaClient({});
        const findServiceRequests = await prisma.servicerequests.findMany({
            where: filters,
        });
        console.log("findServiceRequests", findServiceRequests);
        res.status(200).json({ records: findServiceRequests });
    } else {
        console.log("not signed in");
        res.status(401);
    }
    res.end();
};

// async function handler(req, res) {
//     const session = await getSession({ req });
//     console.log("----FOUND SESSION----");
//     if (session) {
//         console.log("Session", JSON.stringify(session, null, 2));
//         const prisma = new PrismaClient({});
//         const findServiceRequests = await prisma.servicerequests.findMany({
//             where: req.body.filters,
//         });
//         // console.log("findServiceRequests", findServiceRequests);
//         res.status(200).json({ records: findServiceRequests });
//     } else {
//         res.status(403).json("not logged in");
//     }
// }

// export default handler;
