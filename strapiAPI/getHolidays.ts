

    export interface all {
        targetDate: string;
        holiday: string;
        daysClosed: number;
        createdAt: Date;
        updatedAt: Date;
        publishedAt: Date;
    }

    export interface holidayList {
        id: number;
        attributes: all;
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
        data: holidayList[];
        meta: Meta;
    }

export interface holiday {
    targetDate: string;
    holiday: string;
    daysClosed: number;
}

export const getHoliday = async function():Promise<holiday[]>{
    let get = await fetch(`${process.env.STRAPI_API}hollidays`)
    let holiday = await get.json()
    let payload = holiday.data.reduce((acc, el)=>{
        
        let data:holiday = {
            targetDate: el?.attributes?.targetDate ? el.attributes.targetDate : '',
            holiday: el?.attributes?.holiday ? el.attributes.holiday : '',
            daysClosed: el?.attributes?.daysClosed ? el.attributes.daysClosed : '',
        }
        console.log('holiday day', holiday)
        acc.push(data)
        return acc
    },[])

    payload.sort((a, b) => (a.targetDate > b.targetDate) ? 1 : -1)

    return payload
}