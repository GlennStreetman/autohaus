import React from "react";
import Banner from "../../components/banner";
import QuickQuote from "../../components/quickQuote";
import Image from "next/image";
import ParseMarkdown from "../../lib/parseMarkdown";
import FAQ from "../../components/faq";
import { PublicHOC } from "../../components/publicData";
import Head from "next/head";
import Screen, { ScreenWidth } from "../../components/screenWidth";
import ServiceSlice from '../../components/serviceSlice'

const imgBoxLeft = "relative rounded-md bg-black overflow-hidden h-36 w-36 md:h-80 md:w-80 lg:h-96 lg:w-96 xl::h-96 xl:w-96 float-left m-4 ";
const imgBoxRight = "relative rounded-md bg-black overflow-hidden h-36 w-36 md:h-80 md:w-80 lg:h-96 lg:w-96 xl::h-96 xl:w-96 float-right m-4 ";

import { getPublicFAQ, faqPayload } from "../../strapiAPI/getPublicFAQ"
import { getPublicImages, imagePayload } from "../../strapiAPI/getPublicImages"
import { getContacts, contacts } from "../../strapiAPI/getContacts"
import { getSiteLinks, siteLinks } from "../../strapiAPI/getSiteLinks"
import { getSiteText, siteText } from "../../strapiAPI/getSiteText"
import { getServiceDetail, serviceDetailPayload } from "../../strapiAPI/getServiceDetail"
import { getServices, ServicePayload } from "../../strapiAPI/getServices"

export async function getStaticProps(context) {

    const faqData = await getPublicFAQ()
    const contactData: contacts = await getContacts()
    const siteLinks: siteLinks = await getSiteLinks()
    const siteText: siteText = await getSiteText()
    const thisService: serviceDetailPayload[] = await getServiceDetail(context.params.id.replace(/[^a-z0-9]+/gi, " "))
    const imageUrls = await getPublicImages()

    return {
        props: {
            faq: faqData,
            contacts: contactData,
            siteLinks: siteLinks,
            siteText: siteText,
            thisService: thisService,
            images: imageUrls,
            serviceName: context.params.id
        },
    };
}

function getPaths() {

    return new Promise(async (res) => {
        const allServices: ServicePayload[] = await getServices()
        const serviceList = allServices.map((el) => {
            const shortName = el.name.replace(/[^a-z0-9]+/gi, "_");
            return {
                params: {
                    id: shortName,
                },
            };
        });
        res(serviceList);
    });
}

export async function getStaticPaths() {
    const paths = await getPaths();
    return {
        paths,
        fallback: "blocking",
    };
}

function mapServiceSections(service: serviceDetailPayload) {
    console.log('service el', service)
    let serviceMap = Object.values(service).map(el => (<ServiceSlice key={`slice-${el.sectionText}`} slice={el} />))
    return serviceMap
}


interface props {
    faq: faqPayload[];
    images: imagePayload;
    siteText: siteText;
    service: serviceDetailPayload;
    contacts: contacts;
    serviceName: string;
}

function ThisService(p: props) {
    // const screenSize = useContext(ScreenWidth);

    return (
        <div className='bg-white'>
            <Head>
                <title>{`${process.env.NEXT_PUBLIC_BUSINESS_NAME}: ${p.serviceName}`}</title>
            </Head>
            {/* <Banner images={p.images} /> */}
            <div className="mx-auto p-2 w-full lg:w-3/5 relative bg-white">
                {mapServiceSections(p.service)}
                <FAQ faq={p.faq} />
            </div>

        </div>
    );
}


interface staticData {
    faq: faqPayload[];
    contacts: contacts;
    siteLinks: siteLinks;
    siteText: siteText;
    thisService: serviceDetailPayload
    images: imagePayload;
    serviceName: string;
}

export default function SpecialService(p: staticData) {

    return (
        <PublicHOC contacts={p.contacts} siteLinks={p.siteLinks}>
            <Screen>
                <ThisService faq={p.faq} images={p.images} siteText={p.siteText} service={p.thisService} contacts={p.contacts} serviceName={p.serviceName} />
            </Screen>
        </PublicHOC>
    );
}



// const sectionMap = service.serviceSection.map((val, indx) => {
//     const odd = !isOddOrEven(indx, sectionCount);
//     return (
//         <React.Fragment key={`${val.orderNumber}-Seckey`}>
//             <div className={`lg:block col-span-0 lg:col-span-1 xl:col-span-2 ${odd ? "bg-primaryDark" : "bg-primary"}`} />
//             <section className="flex flex-col col-span-12 md:col-span-12 lg:col-span-10 xl:col-span-8">
//                 <div className={`p-2 bg-primary dark:bg-primaryDark ${odd ? "bg-primaryDark" : "bg-primary"}`}>
//                     {val.url ? (
//                         <div className={isOddOrEven(indx, sectionCount) ? imgBoxLeft : imgBoxRight}>
//                             {
//                                 <Image
//                                     src={val.url}
//                                     alt={val.sectionHeader}
//                                     layout="fill"
//                                     objectFit="fill"
//                                     priority
//                                 />
//                             }
//                         </div>
//                     ) : (
//                         <></>
//                     )}
//                     <div className="text-3xl font-bold text-secondary mt-4 mx-4">{`${val.sectionHeader}`}</div>

//                     <div className={`whitespace-pre-line ${odd ? "text-white" : "text-black"} mx-4 mb-2`}>
//                         <br />
//                         <ParseMarkdown dark={odd} text={val.sectionText} />{" "}
//                     </div>
//                 </div>
//                 <div className={`p-2 bg-primary dark:bg-primaryDark ${odd ? "bg-primaryDark" : "bg-primary"}`}>
//                     <QuickQuote description={service.name} contacts={contacts} />
//                 </div>
//             </section>
//             <div className={`lg:block col-span-0 lg:col-span-1 xl:col-span-2 ${odd ? "bg-primaryDark" : "bg-primary"}`} />
//         </React.Fragment>
//     );
// });
// {
// }
// return sectionMap;
// }