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

export interface Formats {
    thumbnail: Thumbnail;
    small: Small;
    medium: Medium;
    large: Large;
}

export interface imageAttributes {
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

export interface imageData {
    id: number;
    attributes: imageAttributes;
}

export interface Image {
    data: imageData;
}


export interface Attributes {
    createdAt: Date;
    updatedAt: Date;
    publishedAt: Date;
    Banner: Image;
    aboutImage: Image;
    logoImage: Image;
    emailLight: Image;
    emailDark: Image;
    emailImage: Image;
}

export interface imageList {
    id: number;
    attributes: Attributes;
}

export interface Meta {
}

export interface RootObject {
    data: imageList;
    meta: Meta;
}

export interface imagePayload {
    banner: string,
    aboutImage: string,
    logoImage: string,
    emailLight: string,
    emailDark: string,
    emailImage: string
}

export const getPublicImages = async function():Promise<imagePayload | {}>{
    let get = await fetch(`${process.env.STRAPI_API}banner-image?populate=*`)
    let imageBlob:RootObject = await get.json()
    if (imageBlob?.data?.attributes) {
        let imageRaw = imageBlob.data.attributes
        let images:imagePayload = {
            banner: imageRaw?.Banner?.data?.attributes?.url ? imageRaw?.Banner?.data?.attributes?.url : null,
            aboutImage: imageRaw?.aboutImage?.data?.attributes?.url ? imageRaw?.aboutImage?.data?.attributes?.url : null,
            logoImage: imageRaw?.logoImage?.data?.attributes?.url ? imageRaw?.logoImage?.data?.attributes?.url : null,
            emailLight: imageRaw?.emailLight?.data?.attributes?.url ? imageRaw?.emailLight?.data?.attributes?.url : null,
            emailDark: imageRaw?.emailDark?.data?.attributes?.url ? imageRaw?.emailDark?.data?.attributes?.url : null,
            emailImage: imageRaw?.emailImage?.data?.attributes?.url ? imageRaw?.emailImage?.data?.attributes?.url : null,
        }
        return images
    } else {
        return({})
    }
}