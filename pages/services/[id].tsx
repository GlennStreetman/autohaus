import React from "react";
import Banner from "../../components/banner";
import QuickQuote from "../../components/quickQuote";
import Image from "next/image";
import ParseMarkdown from "./../../lib/parseMarkdown";
import FAQ from "../../components/faq";
import { PublicHOC } from "../../components/publicData";
import Head from "next/head";
import Screen, { ScreenWidth } from "../../components/screenWidth";

import {getPublicFAQ, faqPayload} from "../../strapiAPI/getPublicFAQ"
import {getContacts, contacts} from "../../strapiAPI/getContacts"
import {getSiteLinks, siteLinks} from "../../strapiAPI/getSiteLinks"
import {getSiteText, siteText} from "../../strapiAPI/getSiteText"
import {getServices, ServicePayload} from "../../strapiAPI/getServices"
import {getPublicImages, imagePayload} from "../../strapiAPI/getPublicImages"


const imgBoxLeft = "relative rounded-md bg-black overflow-hidden h-36 w-36 md:h-80 md:w-80 lg:h-96 lg:w-96 xl::h-96 xl:w-96 float-left m-4 ";
const imgBoxRight = "relative rounded-md bg-black overflow-hidden h-36 w-36 md:h-80 md:w-80 lg:h-96 lg:w-96 xl::h-96 xl:w-96 float-right m-4 ";

export async function getStaticProps(context) {

    const faqData = await getPublicFAQ()
    const contactData:contacts = await getContacts()
    const siteLinks:siteLinks = await getSiteLinks()
    const siteText:siteText = await getSiteText()
    const allServices:ServicePayload[] = await getServices()
    const imageUrls = await getPublicImages()

    const findService = allServices.find((el) => {
        const compName = el.name.replace(/[^a-z0-9]+/gi, "");
        const compID = context.params.id.replace(/[^a-z0-9]+/gi, "");
        // console.log("Test", compName, compID, compName === compID);
        return compName === compID;
    });

    return {
        props: {
            faq: faqData,
            contacts: contactData,
            siteLinks: siteLinks,
            siteText: siteText,
            thisService: findService,
            images: imageUrls,
        },
    };
}

function getPaths() {
    
    return new Promise(async (res) => {
        const allServices:ServicePayload[] = await getServices()
        const serviceList = allServices.map((el) => {
            const name = el.name.replace(/[^a-z0-9]+/gi, "");
            return {
                params: {
                    id: name,
                },
            };
        });
        // console.log(serviceList);
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

function isOddOrEven(n, length) {
    if (Math.abs(length % 2) === 1) {
        return Math.abs(n % 2) !== 1;
    } else {
        return Math.abs(n % 2) === 1;
    }
}

function mapServiceSections(service: ServicePayload, contacts:contacts) {
    console.log(service)
    const sectionCount = service.serviceSection.length;
    const sectionMap = service.serviceSection.map((val, indx) => {
        const odd = !isOddOrEven(indx, sectionCount);
        return (
            <React.Fragment key={`${val.orderNumber}-Seckey`}>
                <div className={`lg:block col-span-0 lg:col-span-1 xl:col-span-2 ${odd ? "bg-primaryDark" : "bg-primary"}`} />
                <section className="flex flex-col col-span-12 md:col-span-12 lg:col-span-10 xl:col-span-8">
                    <div className={`p-2 bg-primary dark:bg-primaryDark ${odd ? "bg-primaryDark" : "bg-primary"}`}>
                        {val.url ? (
                            <div className={isOddOrEven(indx, sectionCount) ? imgBoxLeft : imgBoxRight}>
                                {
                                    <Image
                                        src={val.url}
                                        alt={val.sectionHeader}
                                        layout="fill"
                                        objectFit="fill"
                                        priority
                                    />
                                }
                            </div>
                        ) : (
                            <></>
                        )}
                        <div className="text-3xl font-bold text-secondary mt-4 mx-4">{`${val.sectionHeader}`}</div>

                        <div className={`whitespace-pre-line ${odd ? "text-white" : "text-black"} mx-4 mb-2`}>
                            <br />
                            <ParseMarkdown dark={odd} text={val.sectionText} />{" "}
                        </div>
                    </div>
                    <div className={`p-2 bg-primary dark:bg-primaryDark ${odd ? "bg-primaryDark" : "bg-primary"}`}>
                    <QuickQuote description={service.name} contacts={contacts} />
                    </div>
                </section>
                <div className={`lg:block col-span-0 lg:col-span-1 xl:col-span-2 ${odd ? "bg-primaryDark" : "bg-primary"}`} />
            </React.Fragment>
        );
    });
    {
    }
    return sectionMap;
}

interface props {
    faq: faqPayload[];
    images: imagePayload;
    siteText: siteText;
    service: ServicePayload;
    contacts: contacts;
}

function Services(p: props) {
    // const screenSize = useContext(ScreenWidth);

    return (
        <div>
            <Head>
                <title>{`${process.env.NEXT_PUBLIC_BUSINESS_NAME}: ${p.service.name}`}</title>
            </Head>
            <Banner images={p.images} />
            <div className="grid grid-cols-12 relative bg-white">
                {mapServiceSections(p.service, p.contacts )}
                <div
                    className="h-full flex flex-col justify-center shrink"
                    style={{
                        gridArea: "1 / 11 / 1 / 11",
                        position: "absolute",
                    }}
                >
                    <div className="grow" />
                    <div className="grow" />
                </div>
            </div>
           
        </div>
    );
}


interface staticData {
    faq: faqPayload[];
    contacts: contacts;
    siteLinks: siteLinks;
    siteText: siteText;
    thisService: ServicePayload
    images: imagePayload;
}


export default function Main(p: staticData) {

    return (
        <PublicHOC contacts={p.contacts} siteLinks={p.siteLinks}>
            <Screen>
                <Services faq={p.faq} images={p.images} siteText={p.siteText} service={p.thisService} contacts={p.contacts} />
                <FAQ faq={p.faq} />
            </Screen>
        </PublicHOC>
    );
}
