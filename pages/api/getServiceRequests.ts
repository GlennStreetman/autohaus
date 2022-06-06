import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "./../../lib/prismaPool";
import { getSession } from "next-auth/react";
import Body from "../../components/manager/body";

export interface filters {
    archived: boolean; //show archived?
    filterField: string; //which value to filter by
    filterService: string; //filter text for services
    fromDate: string; //min date
    toDate: string; //max date
    limit: string; //20,24,60,'max'
}

function buildFilters(req) {
    try {
        const filters = {};
        const body = req.body;
        if (body.archived === false) filters["archive"] = { not: true };
        if (body.filterService !== "") filters[body.filterField] = { contains: body.filterService, mode: "insensitive" };
        if (body.fromDate !== "" || body.toDate !== "") filters["requestdate"] = {};
        if (body.fromDate !== "") filters["requestdate"].gte = `${body.fromDate}T00:00:00Z`;
        if (body.toDate !== "") filters["requestdate"].lte = `${body.toDate}T00:00:00Z`;
        return filters;
    } catch (err) {
        console.log("/getServiceRequests buildFilters", err);
    }
}

const getServiceRequests = async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getSession({ req });
    const limit = req.body.limit !== "max" ? parseInt(req.body.limit) : 9999;
    // @ts-ignore
    if (session && session.user.role === "admin") {
        const filters = buildFilters(req);
        const findServiceRequests = await prisma.servicerequests.findMany({
            where: filters,
            take: limit,
            orderBy: {
                lastname: "desc",
            },
        });
        res.status(200).json({ records: findServiceRequests });
    } else {
        console.log("not signed in");
        res.status(401).json({ records: [] });
    }
};

export default getServiceRequests;
