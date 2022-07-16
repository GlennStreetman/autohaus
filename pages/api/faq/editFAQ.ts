import prisma from "../../../lib/prismaPool";
import { getSession } from "next-auth/react";



async function updateText(query) {
    try {
        await prisma.faq.update({
            where: {
                id: parseInt(query.id),
            },
            data: {
                question: query.question,
                answer: query.answer,
            },
        });
        return true;
    } catch (err) {
        console.log("problem with POST /faq/editFAQ DB", err);
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
                fetch(`${process.env.NEXTAUTH_URL}/api/revalidate?secret=${process.env.NEXT_REVALIDATE}&path=/`);
                res.status(200).json({ msg: "success" });
            } catch (err) {
                console.log("/POST /faq/editFAQ Error:", err);
                res.status(400).json({ msg: "denied" });
            }
        }
    }
};

export default editEmployeeText;
