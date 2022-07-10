import prisma from "./../../../lib/prismaPool";
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

const getOurServices = async (req, res) => {
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
        //convert to object
        const serviceList = getServices.reduce((prev, curr) => {
            curr["sections"] = [];
            prev[curr.id] = curr;
            return prev;
        }, {});

        //add sections
        getSections.forEach((el) => {
            serviceList[el.serviceid].sections.push(el);
        });
        //sort sections
        // @ts-ignore
        const mapServiceList = Object.values(serviceList).sort((a, b) => (a.ordernumber > b.ordernumber ? 1 : -1));

        res.status(200).json({ ourServices: mapServiceList });
    } else {
        console.log("not signed in");
        res.status(401);
    }
};

export default getOurServices;
