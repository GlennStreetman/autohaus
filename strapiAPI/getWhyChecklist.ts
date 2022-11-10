
    export interface Checklist {
        whyItem: string;
    }

    export interface Attributes2 {
        url: string;
    }

    export interface Data3 {
        attributes: Attributes2;
    }

    export interface WhyPicture {
        data: Data3;
    }

    export interface Attributes {
        whyHeading: string;
        Checklist: Checklist[];
        whyPicture: WhyPicture;
    }

    export interface Data2 {
        attributes: Attributes;
    }

    export interface HomepageWhyChecklist {
        data: Data2;
    }

    export interface Data {
        homepageWhyChecklist: HomepageWhyChecklist;
    }

    export interface RootObject {
        data: Data;
    }

const endpoint = process.env.STRAPI_GQL

const headers = {
    "content-type": "application/json",
};

const graphqlQuery =  {
    "query": `query{
    homepageWhyChecklist {
      data{
        attributes{
          whyHeading
          Checklist{
            whyItem
          } 
          whyPicture {
            data{
              attributes {
                url
              }
            }
          }
        }
      }
    }
  }
`,
"variables": {}
};

const options = {
    "method": "POST",
    "headers": headers,
    "body": JSON.stringify(graphqlQuery)
};

export interface whyPayload {
    heading: string,
    checkList: Checklist[] | [],
    picture: string
}

export const getWhyChecklist = async function():Promise<whyPayload>{
    const response = await fetch(endpoint, options);
    const data = await response.json();
    const dataAtts = data?.data?.homepageWhyChecklist?.data?.attributes ? data.data.homepageWhyChecklist.data.attributes : {}
    let payload:whyPayload = {
        heading: dataAtts?.whyHeading || '',
        checkList: dataAtts?.Checklist || [],
        picture: dataAtts?.whyPicture?.data?.attributes?.url || '',
    }

    return payload
}
