interface faq {
    question: string,
    answer: string,
    orderNumber: number,
    createdAt: string,
    updatedAt: string,
    publishedAt: string
}

export interface faqPayload {
    id: number,
    attributes: faq,
}

export const getPublicFAQ = async function():Promise<faqPayload[]>{
    let get = await fetch(`${process.env.STRAPI_API}faqs`)
    let faq = await get.json()
    let data: faqPayload[] = faq.data
    return data
}