import prisma from "../../../lib/prismaPool";
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
        return true;
    } catch (err) {
        console.log("problem with POST /employee/editEmployeeText DB", err);
    }
}

const editEmployeeText = async (req, res) => {
    const session = await getSession({ req });
    //@ts-ignore
    if (session && session.user.role === "admin") {
        if (req.method === "POST") {
            try {
                const body = JSON.parse(req.body);
                await updateText(body);
                fetch(`${process.env.NEXTAUTH_URL}/api/revalidate?secret=${process.env.NEXT_REVALIDATE}&path=/team`);
                res.status(200).json({ msg: "success" });
            } catch (err) {
                console.log("/POST /employee/editEmployeeText Error:", err);
                res.status(400).json({ msg: "denied" });
            }
        }
    }
};

export default editEmployeeText;
