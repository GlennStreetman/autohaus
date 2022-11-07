

    export interface Attributes {
        heading: string;
        textBody: string;
        linkName: string;
        link: string;
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

export interface introPayload {
    heading: string;
    textBody: string;
    linkName: string;
    link: string;
}



export const getIntro = async function():Promise<introPayload>{
    let get = await fetch(`${process.env.STRAPI_API}homepage-intro`)
    let intro:RootObject = await get.json()
    
    let payload:introPayload = {
        heading: intro?.data?.attributes?.heading || '',
        textBody: intro?.data?.attributes?.textBody || '',
        linkName: intro?.data?.attributes?.linkName || '',
        link: intro?.data?.attributes?.link || '',
    }

    return payload
}