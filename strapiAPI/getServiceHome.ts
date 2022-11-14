

export interface ServiceChecklistItem {
    serviceChecklist: string;
}

export interface Attributes {
    Heading: string;
    topText: string;
    serviceChecklistItem: ServiceChecklistItem[];
}

export interface Data2 {
    attributes: Attributes;
}

export interface ServiceHome {
    data: Data2;
}

export interface Data {
    serviceHome: ServiceHome;
}

export interface RootObject {
    data: Data;
}

export interface serviceHomePayload {
  heading: string;
  topText: string;
  checkList: string[]

}


const endpoint = process.env.STRAPI_GQL

const headers = {
    "content-type": "application/json",
};
const graphqlQuery = {
    "query": `query{
      serviceHome {
        data{
          attributes{
            Heading, topText, serviceChecklistItem {
              serviceChecklist
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

export const getServiceHome = async function():Promise<serviceHomePayload>{

    const response = await fetch(endpoint, options);
    const rawData:RootObject = await response.json();
    const siteText = rawData?.data?.serviceHome?.data?.attributes || {Heading: '', topText: '', serviceChecklistItem: []}



    let checklistMap = siteText?.serviceChecklistItem.reduce((itr, el)=>{
        itr.push(el.serviceChecklist)
        return itr
    }, [])

    console.log('service Text:', checklistMap)

    let data:serviceHomePayload = {
        heading: siteText?.Heading || '',
        topText: siteText?.topText || '',
        checkList: checklistMap,

    }
    return data
}