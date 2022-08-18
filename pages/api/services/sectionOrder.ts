import prisma from "../../../lib/prismaPool";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
    const session = await getSession({ req });
    //@ts-ignore
    if (session && session.user.role === "admin") {
        if (req.method === "POST") {
            try {
                const newOrder = req.body.newOrder;
                const updateList = newOrder.map(
                    (el, index) =>
                        new Promise(async (res, rej) => {
                            await prisma.servicesection.update({
                                where: {
                                    id: el,
                                },
                                data: {
                                    ordernumber: index + 1,
                                },
                            });
                            res(true);
                        })
                );

                Promise.all(updateList).then(async () => {
                    const revlidateString = req.body.service.replace(/[^a-z0-9+]+/gi, "");
                    fetch(`${process.env.NEXTAUTH_URL}/api/revalidate?secret=${process.env.NEXT_REVALIDATE}&path=/services/${revlidateString}`);
                    res.status(200).json({ msg: "success" });
                });
            } catch (err) {
                console.log("update service order err", err);
                res.status(500);
            }
        }
    } else {
        console.log("not signed in");
        res.status(401);
    }
}
