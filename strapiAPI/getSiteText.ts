

export interface siteTextRaw {
    // FPBannerText: string;
    // aboutHeading: string;
    thanksResume: string;
    // holidayMessage: string;
    thanksService: string;
    createdAt: Date;
    updatedAt: Date;
    publishedAt: Date;
    // aboutBody: string;
    // contactPageSiteText: string;
    LegalBusinessName: string;
    businessName: string;
}

export interface Data {
    id: number;
    attributes: siteTextRaw;
}

export interface Meta {
}

export interface RootObject {
    data: Data;
    meta: Meta;
}

export interface siteText {
    thanksResume: string;
    thanksService: string;
    LegalBusinessName: string;
    businessName: string;
}

export const getSiteText = async function():Promise<siteText>{
    let get = await fetch(`${process.env.STRAPI_API}site-text`)
    let siteText = await get.json()
    let data:siteText = {
        thanksResume: siteText?.data?.attributes?.thanksResume || '',
        thanksService: siteText?.data?.attributes?.thanksService || '',
        LegalBusinessName: siteText?.data?.attributes?.LegalBusinessName || '',
        businessName: siteText?.data?.attributes?.businessName || '',
    }
    return data
}