
export interface siteLinksRaw {
    googleLink: string;
    reviewLink: string;
    socialLink: string;
    createdAt: Date;
    updatedAt: Date;
    publishedAt: Date;
}

export interface Data {
    id: number;
    attributes: siteLinksRaw;
}

export interface Meta {
}

export interface RootObject {
    data: Data;
    meta: Meta;
}


export interface siteLinks {
    googleLink: string;
    reviewLink: string;
    socialLink: string;
}


export const getSiteLinks = async function():Promise<siteLinks>{
    let get = await fetch(`${process.env.STRAPI_API}site-link`)
    let siteLinks = await get.json()
    let data:siteLinks = {
        googleLink: siteLinks?.data?.attributes?.googleLink ? siteLinks.data.attributes.googleLink : '',
        reviewLink: siteLinks?.data?.attributes?.reviewLink ? siteLinks.data.attributes.reviewLink : '',
        socialLink: siteLinks?.data?.attributes?.socialLink ? siteLinks.data.attributes.socialLink : '',
    }
    return data
}