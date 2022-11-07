

export interface siteTextRaw {
    FPBannerText: string;
    aboutHeading: string;
    thanksResume: string;
    holidayMessage: string;
    thanksService: string;
    createdAt: Date;
    updatedAt: Date;
    publishedAt: Date;
    aboutBody: string;
    contactPageSiteText: string;
    LegalBusinessName: string;
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
    FPBannerText: string;
    aboutHeading: string;
    thanksResume: string;
    holidayMessage: string;
    thanksService: string;
    aboutBody: string;
    contactPageSiteText: string;
    LegalBusinessName: string;
}

export const getSiteText = async function():Promise<siteText>{
    let get = await fetch(`${process.env.STRAPI_API}site-text`)
    let siteText = await get.json()
    let data:siteText = {
        FPBannerText: siteText?.data?.attributes?.FPBannerText || '',
        aboutHeading: siteText?.data?.attributes?.aboutHeading || '',
        thanksResume: siteText?.data?.attributes?.thanksResume || '',
        holidayMessage: siteText?.data?.attributes?.holidayMessage || '',
        thanksService: siteText?.data?.attributes?.thanksService || '',
        aboutBody: siteText?.data?.attributes?.aboutBody || '',
        contactPageSiteText: siteText?.data?.attributes?.contactPageSiteText || '',
        LegalBusinessName: siteText?.data?.attributes?.LegalBusinessName || '',
    }
    return data
}