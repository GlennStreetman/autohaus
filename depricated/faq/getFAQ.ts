import prisma from "../../../lib/prismaPool";

export interface faqObj {
    id: number,
    question: string,
    answer: string,   
    ordernumber: number,
}

export default async function handler(req, res) {
    try {
        const getFAQ = await prisma.faq.findMany({});
        res.status(200).json({ faq: getFAQ });
    } catch (err) {
        console.log("problem with get /faq", err);
        res.status(200).json({ holidays: {} });
    }
}
