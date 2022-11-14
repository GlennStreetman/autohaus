

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

    export interface attributesData {
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

    export interface photoAttributes {
        id: number;
        attributes: attributesData;
    }

    export interface Photo {
        data: photoAttributes;
    }

    export interface Attributes {
        name: string;
        title: string;
        order: number;
        description: string;
        createdAt: Date;
        updatedAt: Date;
        publishedAt: Date;
        photo: Photo;
    }

    export interface team {
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

    export interface RootObject {
        data: team[];
        meta: Meta;
    }


    export interface teamMember {
        name: string;
        title: string;
        order: number;
        description: string;
        photoUrl: string;
    }

export const getTeam = async function():Promise<teamMember[]>{
    let get = await fetch(`${process.env.STRAPI_API}teams?populate=*`)
    let teamData:RootObject = await get.json()
    let teamListRaw: team[]  = teamData.data
    let teamList: teamMember[] = teamListRaw.reduce((acc, tm:team)=>{
        let teamMember = {
            name: tm?.attributes?.name || '',
            title: tm?.attributes?.title || '',
            order: tm?.attributes?.order || '',
            description: tm?.attributes?.description || '',
            photoUrl: tm?.attributes?.photo?.data?.attributes?.url || '',
        }
        acc.push(teamMember)
        return acc
    }, [])
    return teamList
}
