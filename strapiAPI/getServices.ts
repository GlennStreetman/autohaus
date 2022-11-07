

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

    export interface Data {
        id: number;
        attributes: Attributes2;
    }

    export interface BannerImage {
        data: Data;
    }

    export interface Section {
        id: number;
        sectionText: string;
        sectionHeader: string;
        orderNumber: number;
    }

    export interface Attributes {
        name: string;
        bannerText: string;
        shortDescription: string;
        orderNumber: number;
        createdAt: Date;
        updatedAt: Date;
        publishedAt: Date;
        bannerImage: BannerImage;
        section: Section[];
    }

    export interface allServices {
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
        data: allServices[];
        meta: Meta;
    }

export interface sectionDetails {

}

export interface subSection {
  sectionHeader: string;
  sectionText: string;
  orderNumber: string;
  url: string;
}


export interface ServicePayload {
    name: string;
    bannerText: string;
    shortDescription: string;
    orderNumber: number;
    bannerImage: string;
    serviceSection: subSection[];
}



export const getServices = async function():Promise<ServicePayload[]>{


    const endpoint = process.env.STRAPI_GQL

    const headers = {
        "content-type": "application/json",
    };
    const graphqlQuery = {
        "query": `query{
            services {
              data {
                attributes {
                  name,
                  bannerText,
                  orderNumber,
                  shortDescription,
                  bannerImage {
                    data{
                      attributes{
                        name,
                        url
                      }
                    }
                  },
                  serviceSection{
                    sectionHeader,
                    sectionText,
                    orderNumber,
                    sectionImage{
                      data{
                        attributes{
                          url
                        }
                      }
                    }
                  }
                }
              }
            }
          }`,
        "variables": {}
    };
    
    const options = {
        "method": "POST",
        "headers": headers,
        "body": JSON.stringify(graphqlQuery)
    };


    
    const response = await fetch(endpoint, options);
    const data = await response.json();

    const dataPackage = data.data.services.data
    const trimPackage:ServicePayload[] = dataPackage.reduce((acc, el, indx)=>{
      acc.push({})
      const elAt = el.attributes
      acc[indx].name = elAt.name
      acc[indx].bannerText = elAt.bannerText
      acc[indx].shortDescription = elAt.shortDescription
      acc[indx].orderNumber = elAt.orderNumber
      acc[indx].bannerImage = elAt.bannerImage.data.attributes.url
      acc[indx].serviceSection = []
      
      elAt.serviceSection.forEach((e, indx2)=>{
        acc[indx].serviceSection.push({})

        acc[indx].serviceSection[indx2].sectionHeader = e?.sectionHeader || ''
        acc[indx].serviceSection[indx2].sectionText = e?.sectionText || ''
        acc[indx].serviceSection[indx2].orderNumber = e?.orderNumber || 0
        acc[indx].serviceSection[indx2].url = e?.sectionImage?.data?.attributes?.url || ''
      })
      
      return acc

    },[])

    return trimPackage
}


