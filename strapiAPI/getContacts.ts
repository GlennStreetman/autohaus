export interface contacts {
    phone: number;
    serviceEmail: string;
    address: string;
    addressLong: string;
    openShort: string;
    openLong: string;
    createdAt: Date | string;
    updatedAt: Date | string;
    publishedAt: Date | string;
}

export interface Data {
    id: number;
    attributes: contacts;
}

export interface Meta {
}

export interface RootObject {
    data: Data;
    meta: Meta;
}


export const getContacts = async function():Promise<contacts>{
    let get = await fetch(`${process.env.STRAPI_API}contact`)
    let contacts = await get.json()
    if (contacts?.data?.attributes){
        let data:contacts = contacts.data.attributes
        return data
    } else {
        return({
            phone: 0,
            serviceEmail: "",
            address: "",
            addressLong: "",
            openShort: "",
            openLong: "",
            createdAt: "",
            updatedAt: "",
            publishedAt: ""
        })
    }
}