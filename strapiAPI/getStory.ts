

export interface Thumbnail {
    name: string;
    hash: string;
    ext: string;
    mime: string;
    path?: any;
    width: number;
    height: number;
    size: number;
    url: string;
}

export interface Small {
    name: string;
    hash: string;
    ext: string;
    mime: string;
    path?: any;
    width: number;
    height: number;
    size: number;
    url: string;
}

export interface Large {
    name: string;
    hash: string;
    ext: string;
    mime: string;
    path?: any;
    width: number;
    height: number;
    size: number;
    url: string;
}

export interface Medium {
    name: string;
    hash: string;
    ext: string;
    mime: string;
    path?: any;
    width: number;
    height: number;
    size: number;
    url: string;
}

export interface Formats {
    thumbnail: Thumbnail;
    small: Small;
    large: Large;
    medium: Medium;
}

export interface Attributes2 {
    name: string;
    alternativeText: string;
    caption: string;
    width: number;
    height: number;
    formats: Formats;
    hash: string;
    ext: string;
    mime: string;
    size: number;
    url: string;
    previewUrl?: any;
    provider: string;
    provider_metadata?: any;
    createdAt: Date;
    updatedAt: Date;
}

export interface Datum {
    id: number;
    attributes: Attributes2;
}

export interface ShopPicture {
    data: Datum[];
}

export interface Attributes {
    Title: string;
    Story: string;
    createdAt: Date;
    updatedAt: Date;
    publishedAt: Date;
    shopPicture: ShopPicture;
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

export interface storyPayload {
    title: string;
    story: string;
    picture: string;
    pictureName: string;
}



export const getStory = async function():Promise<storyPayload>{
    let get = await fetch(`${process.env.STRAPI_API}our-story?populate=*`)
    let story:RootObject = await get.json()
    let payload:storyPayload = {
        title: story?.data?.attributes?.Title || '',
        story: story?.data?.attributes?.Story || '',
        picture: story?.data?.attributes?.shopPicture?.data?.[0]?.attributes?.url || '',
        pictureName: story?.data?.attributes?.shopPicture?.data?.[0]?.attributes?.name || '',
    }
    return payload
}