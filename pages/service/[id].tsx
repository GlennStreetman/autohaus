import React from "react";
import NextLinkButton from '../../components/nextLinkButton'
import { PublicHOC } from "../../components/publicData";
import Head from "next/head";
import Screen, { ScreenWidth } from "../../components/screenWidth";
import ServiceSlice from '../../components/serviceSlice'
import MapChecklist from '../../components/MapChecklist'

import { getPublicFAQ, faqPayload } from "../../strapiAPI/getPublicFAQ"
import { getPublicImages, imagePayload } from "../../strapiAPI/getPublicImages"
import { getContacts, contacts } from "../../strapiAPI/getContacts"
import { getSiteLinks, siteLinks } from "../../strapiAPI/getSiteLinks"
import { getSiteText, siteText } from "../../strapiAPI/getSiteText"
import { getServiceDetail, serviceDetailPayload } from "../../strapiAPI/getServiceDetail"
import { getServices, ServicePayload } from "../../strapiAPI/getServices"
import { getServiceHome, serviceHomePayload } from "../../strapiAPI/getServiceHome"




interface staticData {
    faq: faqPayload[];
    contacts: contacts;
    siteLinks: siteLinks;
    siteText: siteText;
    thisService: serviceDetailPayload
    images: imagePayload;
    serviceName: string;
    serviceHome: serviceHomePayload;
}

interface props {
    faq: faqPayload[];
    images: imagePayload;
    siteText: siteText;
    service: serviceDetailPayload;
    contacts: contacts;
    serviceName: string;
    serviceHome: serviceHomePayload;
}

export async function getStaticProps(context) {

    const faqData = await getPublicFAQ()
    const contactData: contacts = await getContacts()
    const siteLinks: siteLinks = await getSiteLinks()
    const siteText: siteText = await getSiteText()
    const thisService: serviceDetailPayload[] = await getServiceDetail(context.params.id.replace(/[^a-z0-9]+/gi, " "))
    const imageUrls = await getPublicImages()
    const serviceHome: serviceHomePayload = await getServiceHome()

    return {
        props: {
            faq: faqData,
            contacts: contactData,
            siteLinks: siteLinks,
            siteText: siteText,
            thisService: thisService,
            images: imageUrls,
            serviceName: context.params.id,
            serviceHome: serviceHome,
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
    return Object.values(service).map(el => (<ServiceSlice key={`slice-${el.sectionText}`} slice={el} />))
}

function ContactForm(p: props) {
    return (
        <div className='mx-auto grid grid-cols-12'>
            <div className='w-full col-span-12 flex flex-col p-2'>
                <div >
                    <div className='sectionHeading pb-2'>{`At ${p?.siteText?.businessName || ''} all repairs include: `}</div>
                    <div><MapChecklist checklist={p?.serviceHome?.checkList || []} /></div>
                </div>
            </div>
            <div className='w-full col-span-12 p-auto justify-center mx-auto my-4 flex'>
                <div className='grow' />
                <NextLinkButton
                    text={`Schedule ${p?.serviceName && typeof p.serviceName === 'string' ? p.serviceName.replaceAll('_', ' ') : 'Service Now'}`}
                    textSize='text-xl'
                    link={`/contact?text=Im interested in ${p?.serviceName && typeof p.serviceName === 'string' ? p.serviceName.replaceAll('_', ' ') : 'Service Now'}`} icon={<></>} />
                <div className='grow' />
            </div>
        </div>
    )
}

function ThisService(p: props) {

    return (
        <div className='bg-white p-2'>
            <Head>
                <title>{`${process.env.NEXT_PUBLIC_BUSINESS_NAME}: ${p.serviceName}`}</title>
            </Head>
            <div className="mx-auto pt-8 pb-4 lg:pt-20 px-2 w-full lg:w-3/5 relative bg-white">
                {mapServiceSections(p.service)}
                <ContactForm {...p} />
            </div>
        </div>
    );
}

export default function SpecialService(p: staticData) {

    return (
        <PublicHOC contacts={p.contacts} siteLinks={p.siteLinks} images={p.images} siteText={p.siteText}>
            <Screen>
                <ThisService faq={p.faq} images={p.images} siteText={p.siteText} service={p.thisService} contacts={p.contacts} serviceName={p.serviceName} serviceHome={p.serviceHome} />
            </Screen>
        </PublicHOC>
    );
}
