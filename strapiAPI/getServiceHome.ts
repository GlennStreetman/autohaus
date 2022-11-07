
export interface Attributes {
    Heading: string;
    topText: string;
    createdAt: Date;
    updatedAt: Date;
    publishedAt: Date;
}

export interface Data {
    id: number;
    attributes: Attributes;
}

export interface Meta {
}

export interface RootObject {
    data: Data;
    meta: Meta;
    }

export interface serviceHomePayload {
    heading: string;
    topText: string;
}

export const getServiceHome = async function():Promise<serviceHomePayload>{
    let get = await fetch(`${process.env.STRAPI_API}service-home`)
    let siteText = await get.json()
    let data:serviceHomePayload = {
        heading: siteText?.data?.attributes?.Heading || '',
        topText: siteText?.data?.attributes?.topText || '',

    }
    return data
}