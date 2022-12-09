
  export interface Attributes2 {
      url: string;
      alternativeText: string;
  }

  export interface Data2 {
      attributes: Attributes2;
  }

  export interface BannerImage {
      data: Data2;
  }

  export interface SubChecklist {
      serviceChecklist: string;
  }

  export interface Attributes3 {
      alternativeText: string;
      url: string;
  }

  export interface Data3 {
      attributes: Attributes3;
  }

  export interface SectionImage {
      data: Data3;
  }

  export interface serviceDetail {
      id: string;
      sectionText: string;
      sectionHeader: string;
      orderNumber: number;
      subChecklist: SubChecklist[];
      sectionImage: SectionImage;
  }

  export interface Attributes {
      name: string;
      bannerImage: BannerImage;
      secvicedetail: serviceDetail[];
  }

  export interface Datum {
      attributes: Attributes;
  }

  export interface Services {
      data: Datum[];
  }

  export interface Data {
      services: Services;
  }

  export interface RootObject {
      data: Data;
  }


  export interface MappedPayload {
  sectionText: string;
  sectionHeader: string;
  sectionImage: Attributes2;
  sectionChecklist: string[];
  orderNumber: number;
}


export interface ServiceDetailPayload {
  img: Attributes2;
  payload: MappedPayload[];
}

export const getServiceDetail = async function(service: string):Promise<ServiceDetailPayload>{

    const endpoint = process.env.STRAPI_GQL

    const headers = {
        "content-type": "application/json",
    };
    const graphqlQuery = {
        "query": `query {
            services(filters: { name: { eq: "${service}" }})  {
              data {
                attributes {
                  name
                  bannerImage {
                    data {
                      attributes {
                        url
                        alternativeText
                      }
                    }
                  }
                  secvicedetail(sort: "orderNumber:asc"){
                    id
                    sectionText
                    sectionHeader
                    orderNumber
                    subChecklist {
                      serviceChecklist
                    }
                    sectionImage {
                      data {
                        attributes {
                          alternativeText
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

    function mapChecklist(el):string[]{
        let mappedChecklist = el.map(el => el.serviceChecklist)
        return mappedChecklist
    }
    
    const response = await fetch(endpoint, options);
    const data = await response.json();


    const dataPackage:serviceDetail[] = data?.data?.services?.data?.[0]?.attributes?.secvicedetail || []
    const payload:MappedPayload[] = dataPackage.map((el)=>{
        const thisEl = {
            sectionText: el?.sectionText,
            sectionHeader: el?.sectionHeader,
            sectionImage: el?.sectionImage?.data?.attributes || {alternativeText: '', url: ''},
            sectionChecklist: el?.subChecklist ? mapChecklist(el.subChecklist) : [], //need to redo data definition.
            orderNumber: el?.orderNumber 
        }


        return thisEl
    })

    // const img = data.data.service.ba
    const img = data?.data?.services?.data?.[0]?.attributes?.bannerImage?.data?.attributes || {} //?.BannerImage?.data?.attributes
    const thisPayload: ServiceDetailPayload = {
      img: img,
      payload: payload,
    }
    return thisPayload
}
