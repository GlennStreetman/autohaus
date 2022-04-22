import prisma from "../../lib/prismaPool";

export default async function handler(req, res) {
    try {
        const findHolidays = await prisma.holidays.findMany({});
        res.status(200).json({ holidays: findHolidays });
    } catch (err) {
        console.log("problem with get /holidays", err);
        res.status(200).json({ holidays: {} });
    }
}
