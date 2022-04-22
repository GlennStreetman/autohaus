import prisma from "../../lib/prismaPool";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
    const session = await getSession({ req });
    if (session) {
        const deleteHolidays = await prisma.holidays.delete({
            where: {
                id: parseInt(req.query.id),
            },
        });
        const findHolidays = await prisma.holidays.findMany({});
        res.status(200).json({ holidays: findHolidays });
    } else {
        res.status(400);
    }
}
