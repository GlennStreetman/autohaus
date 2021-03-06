import prisma from "../../lib/prismaPool";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
    const session = await getSession({ req });
    // @ts-ignore
    if (session && session.user.role === "admin") {
        try {
            await prisma.holidays.delete({
                where: {
                    id: parseInt(req.query.id),
                },
            });
            fetch(`${process.env.NEXTAUTH_URL}/api/revalidate?secret=${process.env.NEXT_REVALIDATE}&path=/calendar`);
            const findHolidays = await prisma.holidays.findMany({});
            res.status(200).json({ holidays: findHolidays });
        } catch (err) {
            console.log("problem deleting: /deleteHoliday", err);
        }
    } else {
        res.status(400);
    }
}
