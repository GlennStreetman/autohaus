

    export interface Attributes {
        Primary: string;
        secondary: string;
        link: string;
        createdAt: Date;
        updatedAt: Date;
        publishedAt: Date;
        linkText: string;
    }

    export interface Datum {
        id: number;
        attributes: Attributes;
    }

    export interface Pagination {
        page: number;
        pageSize: number;
        pageCount: number;
        total: number;
    }

    export interface Meta {
        pagination: Pagination;
    }

    export interface bannerText {
        data: Datum[];
        meta: Meta;
    }




export interface bannerTextPayload { 
    Primary: string;
    secondary: string;
    link: string;
    linkText: string;
}

export const getBannerText = async function():Promise<bannerTextPayload>{
    let get = await fetch(`${process.env.STRAPI_API}banner-text`)
    let bannerText = await get.json()
    let data:bannerTextPayload = {
        Primary: bannerText?.data?.attributes?.Primary || '',
        secondary: bannerText?.data?.attributes?.secondary || '',
        link: bannerText?.data?.attributes?.link || '',
        linkText: bannerText?.data?.attributes?.linkText || '',

    }
    return data
}