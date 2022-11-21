
    export interface SubChecklist {
        serviceChecklist: string;
    }

    export interface Attributes2 {
        alternativeText: string;
        url: string;
    }

    export interface Data2 {
        attributes: Attributes2;
    }

    export interface SectionImage {
        data: Data2;
    }

    export interface SectionDetail {
        id: string;
        sectionText: string;
        sectionHeader: string;
        orderNumber: number;
        subChecklist: SubChecklist[];
        sectionImage: SectionImage;
    }

    export interface Attributes {
        name: string;
        secvicedetail: SectionDetail[];
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



export interface serviceDetailPayload {
    sectionText: string;
    sectionHeader: string;
    sectionImage: Attributes2 
    sectionChecklist: string[];
}

export const getServiceDetail = async function(service: string):Promise<serviceDetailPayload[]>{


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


    const dataPackage:SectionDetail[] = data?.data?.services?.data?.[0]?.attributes?.secvicedetail || []
    const payload = dataPackage.map((el)=>{
        const thisEl = {
            sectionText: el?.sectionText,
            sectionHeader: el?.sectionHeader,
            sectionImage: el?.sectionImage?.data?.attributes || {alternativeText: '', url: ''},
            sectionChecklist: el?.subChecklist ? mapChecklist(el.subChecklist) : [],
        }
        return thisEl
    })

    // console.log('service detail', payload)

    return payload
}
