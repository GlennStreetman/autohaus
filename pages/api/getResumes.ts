import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "./../../lib/prismaPool";
import { getSession } from "next-auth/react";

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
        const filters = buildFilters(req);
        const findResumes = await prisma.resumes.findMany({
            where: filters,
        });
        res.status(200).json({ records: findResumes });
    } else {
        console.log("not signed in");
        res.status(401);
    }
    res.end();
};
