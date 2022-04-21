import PrismaClient from "../../lib/prismaPool";

export default async function handler(req, res) {
    const prisma = PrismaClient;

    try {
        const findHolidays = await prisma.holidays.findMany({});
        res.status(200).json({ holidays: findHolidays });
    } catch (err) {
        console.log("problem with get /holidays", err);
        res.status(200).json({ holidays: {} });
    }
}
