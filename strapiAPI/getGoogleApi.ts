

export interface Attributes {
    secretAPIKey: string;
    searchString: string;
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

export interface googleAPIPayload {
    secretAPIKey: string;
    searchString: string;
}

export const getGoogle = async function():Promise<googleAPIPayload>{
    let get = await fetch(`${process.env.STRAPI_API}google-map`)
    let apiData:RootObject = await get.json()
    
    let payload:googleAPIPayload = {
        secretAPIKey: apiData?.data?.attributes?.secretAPIKey || '',
        searchString: apiData?.data?.attributes?.searchString || '',
    }

    return payload
}