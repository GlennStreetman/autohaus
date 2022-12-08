

    export interface Attributes {
        name: string;
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






export const getAllServices = async function():Promise<string[]>{


    const endpoint = process.env.STRAPI_GQL

    const headers = {
        "content-type": "application/json",
    };
    const graphqlQuery = {
        "query": `query {
            services{
              data {
                attributes {
                  name
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
    const data:RootObject = await response.json();


    const dataPackage = data?.data?.services?.data || []
    const payload = dataPackage.map((el)=>{
        const name = el?.attributes?.name.replaceAll(" ", "_") || ''
        const route = `/service/${name}`
        return route
    })

    // console.log('service detail', payload)

    return payload
}
