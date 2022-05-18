import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "./../../lib/prismaPool";
import { getSession } from "next-auth/react";

export interface filters {
    archived: boolean; //show archived?
    filterField: string; //which value to filter by
    filterService: string; //filter text for services
    fromDate: string; //min date
    toDate: string; //max date
    limit: string; //20,24,60,'max'
}

function buildFilters(req) {
    const filters = {};
    const body: filters = req.body;
    if (body.archived === false) filters["archive"] = { not: true };
    if (body.filterService !== "") filters[body.filterField] = { contains: body.filterService, mode: "insensitive" };
    if (body.fromDate !== "" || body.toDate !== "") filters["submitdate"] = {};
    if (body.fromDate !== "") filters["submitdate"].gte = `${body.fromDate}T00:00:00Z`;
    if (body.toDate !== "") filters["submitdate"].lte = `${body.toDate}T00:00:00Z`;
    return filters;
}

const getResumes = async (req, res) => {
    const session = await getSession({ req });
    const limit = req.body.limit !== "max" ? parseInt(req.body.limit) : 9999;
    // @ts-ignore
    if (session && session.user.role === "admin") {
        const filters = buildFilters(req);
        const findResumes = await prisma.resumes.findMany({
            where: filters,
            take: limit,
            orderBy: {
                lastname: "desc",
            },
        });
        // console.log("resumes", findResumes, "filters", filters);
        res.status(200).json({ records: findResumes });
    } else {
        console.log("not signed in");
        res.status(401);
    }
};

export default getResumes;
