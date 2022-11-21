import Banner from "../components/banner";
import React, { useContext } from "react";
import { PublicHOC } from "../components/publicData";
import Head from "next/head";

import { getPublicFAQ, faqPayload } from "../strapiAPI/getPublicFAQ"
import { getPublicImages, imagePayload } from "../strapiAPI/getPublicImages"
import { getTeam, teamMember } from "../strapiAPI/getTeam"
import { getContacts, contacts } from "../strapiAPI/getContacts"
import { getSiteLinks, siteLinks } from "../strapiAPI/getSiteLinks"
import { getSiteText, siteText } from "../strapiAPI/getSiteText"
import { getServices, ServicePayload } from "../strapiAPI/getServices"


export async function getStaticProps() {

    const faqData = await getPublicFAQ()
    const imageUrls = await getPublicImages()
    const teamList = await getTeam()
    const contactData: contacts = await getContacts()
    const siteLinks: siteLinks = await getSiteLinks()
    const siteText: siteText = await getSiteText()
    const allServices: ServicePayload[] = await getServices()


    return {
        props: {
            faq: faqData,
            team: teamList,
            images: imageUrls,
            contacts: contactData,
            siteLinks: siteLinks,
            siteText: siteText,
            allServices: allServices,
        },
    };
}

interface props {
    faq: faqPayload[];
    images: imagePayload;
    team: teamMember[];
    data: string[];
    siteText: siteText;
    allServices: ServicePayload[];
}

interface staticData {
    faq: faqPayload[];
    images: imagePayload;
    team: teamMember[];
    data: string[];
    contacts: contacts;
    siteLinks: siteLinks;
    siteText: siteText;
    allServices: ServicePayload[];
}

const gutter = "col-span-0 lg:col-span-1 xl:col-span-3"; //2x
const body = "text-black col-span-12 lg:col-span-10 xl:col-span-6 mb-4  text-white p-2 whitespace-pre-line"; //1x

function Thankyou(p: props) {
    return (
        <div className="bg-white">
            <Head>
                <title>{`${process.env.NEXT_PUBLIC_BUSINESS_NAME}: Thank you!`}</title>
            </Head>
            <Banner images={p.images}>
                <></>
            </Banner>
            <div className="grid grid-row grid-cols-12 p-1 bg-white">
                <div className={gutter}></div>
                <div className={body}>{p.siteText.thanksResume}</div>
                <div className={gutter}></div>
            </div>
        </div>
    );
}

export default function Main(p: staticData) {
    return (
        <PublicHOC contacts={p.contacts} siteLinks={p.siteLinks} images={p.images} siteText={p.siteText} >
            <Thankyou faq={p.faq} data={p.data} team={p.team} images={p.images} siteText={p.siteText} allServices={p.allServices} />
        </PublicHOC>
    );
}
