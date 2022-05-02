import prisma from "./../../lib/prismaPool";

interface requestBody {
    newOrder: number[];
}

export default async function handler(req, res) {
    if (req.method === "POST") {
        try {
            const newOrder = req.body.newOrder;
            const updateList = newOrder.map(
                (el, index) =>
                    new Promise(async (res, rej) => {
                        await prisma.team.update({
                            where: {
                                id: el,
                            },
                            data: {
                                orderNumber: index + 1,
                            },
                        });
                        res(true);
                    })
            );

            Promise.all(updateList).then(async () => {
                const updatedOrder = await prisma.team.findMany({
                    orderBy: [
                        {
                            orderNumber: "asc",
                        },
                    ],
                });
                fetch(`${process.env.NEXTAUTH_URL}/api/revalidate?secret=${process.env.NEXT_REVALIDATE}&path=/team`);
                res.status(200).json({ order: updatedOrder });
            });
        } catch (err) {
            console.log("update employee order err", err);
            res.status(500);
        }
    }
}
