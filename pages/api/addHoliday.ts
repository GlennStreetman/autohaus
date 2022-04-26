import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "./../../lib/prismaPool";
import { getSession } from "next-auth/react";

interface newHoliday {
    targetDate: string;
    holiday: string;
    daysclosed: string;
}

export default async (req, res) => {
    const session = await getSession({ req });
    // @ts-ignore
    if (session && session.user.roll === "admin") {
        try {
            const body = JSON.parse(req.body);

            const findServiceRequests = await prisma.holidays.create({
                data: {
                    targetdate: body.targetDate,
                    holiday: body.holiday,
                    daysclosed: body.daysclosed,
                },
            });
            // console.log("req", `/api/revalidate?secret=${process.env.NEXT_REVALIDATE}&path=http://autohaus.gstreet.test/calendar`);
            fetch(`${process.env.NEXTAUTH_URL}/api/revalidate?secret=${process.env.NEXT_REVALIDATE}&path=/calendar`);

            const newHolidaySchedule = await prisma.holidays.findMany({});
            // console.log("newHolidaySchedule", newHolidaySchedule);
            res.status(200).json({ holidays: newHolidaySchedule });
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
