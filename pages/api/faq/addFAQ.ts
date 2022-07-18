import prisma from "../../../lib/prismaPool";
import { getSession } from "next-auth/react";

const addFAQ = async (req, res) => {  
    const session = await getSession({ req });

    //@ts-ignore
    if (session && session.user.role === "admin") {
        if (req.method === "POST") {
            try {
                const body = JSON.parse(req.body);
                await prisma.faq.create({
                    data: {
                        question: body.question,
                        answer: body.answer,
                    },
                });
            fetch(`${process.env.NEXTAUTH_URL}/api/revalidate?secret=${process.env.NEXT_REVALIDATE}&path=/`);
            res.status(200).json({ msg: "success" });
        } catch (err) {
            console.log("/POST addFAQ Error:", err);
            res.status(400).json({ msg: "denied" });
        }
        }
    }
};

export default addFAQ;
