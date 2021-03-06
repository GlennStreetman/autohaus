import prisma from "../../../lib/prismaPool";
import { getSession } from "next-auth/react";

const getSiteContact = async (req, res) => {
    const session = await getSession({ req });
    // @ts-ignore
    if (session && session.user.role === "admin") {
        try {
            const siteContacts = await prisma.sitesetup.findMany({
                where: {
                    name: {
                        in: ["phone", "serviceEmail", "address", "addressLong", "openShort", "openLong"],
                    },
                },
            });
            const returnData = siteContacts.reduce((prev, curr) => {
                prev[curr.name] = curr.value;
                return prev;
            }, {});
            res.status(200).json(returnData);
        } catch (err) {
            console.log("GET /getSiteContact: Problem creating record: ", err);
            res.status(400).json("problem getting site contacts");
        }
    } else {
        console.log("not signed in");
        res.status(401);
    }
};

export default getSiteContact;
