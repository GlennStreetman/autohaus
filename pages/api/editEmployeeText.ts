import prisma from "../../lib/prismaPool";
import { getSession } from "next-auth/react";

interface savedFileReturn {
    fileKey: string;
}

async function updateText(query) {
    try {
        await prisma.team.update({
            where: {
                id: parseInt(query.id),
            },
            data: {
                title: query.title,
                description: query.description,
                name: query.name,
            },
        });
        const newTeam = await prisma.team.findMany({});
        return newTeam;
    } catch (err) {
        console.log("problem with POST /submitResume DB", err);
    }
}

export default async (req, res) => {
    const session = await getSession({ req });
    //@ts-ignore
    if (session && session.user.role === "admin") {
        if (req.method === "POST") {
            try {
                const newTeam = await updateText(JSON.stringify(req.body));
                res.status(200).json({ msg: "success", employees: newTeam });
            } catch (err) {
                console.log("/GET submitEmployee Error:", err);
                res.status(400).json({ msg: "denied" });
            }
        }
    }
};
