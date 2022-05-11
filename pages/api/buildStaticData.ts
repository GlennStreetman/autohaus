import { buildPublicData } from "../../lib/buildPublicData.js";
import { getSession } from "next-auth/react";

export default async (req, res) => {
    const session = await getSession({ req });
    // @ts-ignore
    if (session && session.user.role === "admin") {
        try {
            buildPublicData();
        } catch (err) {
            console.log("POST /addHoliday: Problem creating record: ", err);
            res.status(400).json("problem archiving record");
        }
    } else {
        console.log("not signed in");
        res.status(401);
    }
    res.end();
};
