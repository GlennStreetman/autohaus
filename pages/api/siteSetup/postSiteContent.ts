import prisma from "../../../lib/prismaPool";
import { getSession } from "next-auth/react";

interface savedContact {
    phone: string;
    serviceEmail: string;
    address: string;
    openShort: string;
    openLong: string;
}

//bespoke updates not implemented, re-render entire site.
// const actions = {
//     email: "all",
//     socialLink: "all",
//     reviewLink: "all",
//     googleLink: "all",
//     thanksService: "/thankyou",
//     FPBannerText: "/",
//     aboutBody: "/",
//     aboutHeading: "/",
//     thanksResume: "/resumeSubmitted",
//     phone: "all",
//     serviceEmail: "all",
//     openShort: "all",
//     openLong: "all",
//     addressLong: "all",
//     address: "all",
// };

const staticRoutes = ["/", "/calendar", "/careers", "/manager", "/quote", "/resumeSubmitted", "/team", "/thankyou"];

const dynamicRoutes = {
    service: () => {
        return prisma.services.findMany({});
    },
};

export default async (req, res) => {
    const session = await getSession({ req });

    // @ts-ignore
    if (session && session.user.role === "admin") {
        try {
            const body: savedContact = JSON.parse(req.body);
            const updateList = Object.entries(body).map(([key, val]) => {
                return new Promise(async (ret, rej) => {
                    await prisma.sitesetup.upsert({
                        where: {
                            name: key,
                        },
                        update: {
                            value: val,
                        },
                        create: {
                            name: key,
                            value: val,
                        },
                    });
                    ret(true);
                });
            });
            await Promise.all(updateList);

            //Updates to db complete, update routes as needed.
            // const updateSet = new Set(Object.entries(body).map(([key, val]) => actions[key]));
            // if (!updateSet.has("all")) {
            //     updateList.forEach((el) => {
            //         fetch(`${process.env.NEXTAUTH_URL}/api/revalidate?secret=${process.env.NEXT_REVALIDATE}&path=${el}`); //home page carousel
            //     });
            // } else {
            const secviceRoutes: string[] = await (await dynamicRoutes.service()).map((el) => `/services/${el.name.replaceAll(" ", "")}`);
            const allRoutes = staticRoutes.concat(secviceRoutes);
            for (const el of allRoutes) {
                await fetch(`${process.env.NEXTAUTH_URL}/api/revalidate?secret=${process.env.NEXT_REVALIDATE}&path=${el}`); //home page carousel
            }

            res.status(200).json({ msg: "success" });
        } catch (err) {
            console.log("POST /postSiteContact: Problem creating record: ", err);
            res.status(400).json({ msg: "problem getting site contacts" });
        }
    } else {
        console.log("not signed in");
        res.status(401).json({ msg: "Denied" });
    }
    res.end();
};
