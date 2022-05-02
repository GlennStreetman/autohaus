import prisma from "../../lib/prismaPool";

export default async function handler(req, res) {
    try {
        const findEmployees = await prisma.team.findMany({
            orderBy: [
                {
                    orderNumber: "asc",
                },
            ],
        });
        res.status(200).json({ employees: findEmployees });
    } catch (err) {
        console.log("problem with get /holidays", err);
        res.status(200).json({ employees: [] });
    }
}
