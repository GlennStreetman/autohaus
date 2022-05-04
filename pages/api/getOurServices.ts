import prisma from "./../../lib/prismaPool";
import { getSession } from "next-auth/react";

interface section {
    id: number;
    serviceid: number;
    sectionimage: string;
    sectiontext: string;
    sectionheader: string;
    ordernumber: number;
}

interface service {
    id: number;
    name: string;
    bannerimage: string;
    bannertext: string;
    ordernumber: number;
    sections: section[];
}

interface allServices {
    id: service;
}

export default async (req, res) => {
    const session = await getSession({ req });
    // @ts-ignore
    if (session && session.user.role === "admin") {
        const getServices = await prisma.services.findMany({
            orderBy: [
                {
                    ordernumber: "asc",
                },
            ],
        });
        const getSections = await prisma.servicesection.findMany({
            orderBy: [
                {
                    ordernumber: "asc",
                },
            ],
        });
        const serviceList = getServices.reduce((prev, curr) => {
            prev[curr.id] = curr;
            curr["sections"] = [];
            return prev;
        }, []);
        console.log("serviceList", serviceList);
        getSections.forEach((el) => {
            serviceList[el.serviceid].sections.push(el);
        });

        const mapServiceList = Object.values(serviceList);

        res.status(200).json({ ourServices: mapServiceList });
    } else {
        console.log("not signed in");
        res.status(401);
    }
    res.end();
};
