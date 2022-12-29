import React from "react";
import Image from 'next/image'
import NextLinkButton from '../../components/nextLinkButton'
import { PublicHOC } from "../../components/publicData";
import Head from "next/head";
import Screen, { ScreenWidth } from "../../components/screenWidth";
import ServiceSlice from '../../components/serviceSlice'
import MapChecklist from '../../components/MapChecklist'
import LinkButtonSide, { NextLinkButtonSide } from '../../components/linkButtonSide'
import { addDashes } from "../../lib/formatPhone";


import { getPublicFAQ, faqPayload } from "../../strapiAPI/getPublicFAQ"
import { getPublicImages, imagePayload } from "../../strapiAPI/getPublicImages"
import { getContacts, contacts } from "../../strapiAPI/getContacts"
import { getSiteLinks, siteLinks } from "../../strapiAPI/getSiteLinks"
import { getSiteText, siteText } from "../../strapiAPI/getSiteText"
import { getServiceDetail, ServiceDetailPayload } from "../../strapiAPI/getServiceDetail"
import { getServices, ServicePayload } from "../../strapiAPI/getServices"
import { getServiceHome, serviceHomePayload } from "../../strapiAPI/getServiceHome"


import { BsTelephoneInboundFill } from "react-icons/bs";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { MdOutlineMailOutline } from "react-icons/md";
import { GoCalendar } from "react-icons/go";
import { GiAutoRepair } from "react-icons/gi";


interface staticData {
    faq: faqPayload[];
    contacts: contacts;
    siteLinks: siteLinks;
    siteText: siteText;
    thisService: ServiceDetailPayload
    images: imagePayload;
    serviceName: string;
    serviceHome: serviceHomePayload;
}

interface props {
    faq: faqPayload[];
    images: imagePayload;
    siteText: siteText;
    service: ServiceDetailPayload;
    contacts: contacts;
    serviceName: string;
    serviceHome: serviceHomePayload;
    siteLinks: siteLinks;
}

export async function getStaticProps(context) {

    const faqData = await getPublicFAQ()
    const contactData: contacts = await getContacts()
    const siteLinks: siteLinks = await getSiteLinks()
    const siteText: siteText = await getSiteText()
    const thisService: ServiceDetailPayload = await getServiceDetail(context.params.id.replace(/[^a-z0-9]+/gi, " "))
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
        revalidate: 86400
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

function mapServiceSections(service: ServiceDetailPayload) {
    return Object.values(service.payload).sort((a, b) => a.orderNumber - b.orderNumber).map(el => (<ServiceSlice key={`slice-${el.sectionText}`} slice={el} />))
}

function ContactForm(p: props) {
    return (
        <div className='mx-auto '>
            <div className='w-full flex flex-col p-2'>
                <div >
                    <div className='sectionHeading pb-2'>{`At ${p?.siteText?.businessName || ''} all repairs include: `}</div>
                    <div><MapChecklist checklist={p?.serviceHome?.checkList || []} /></div>
                </div>
            </div>
            <div className='w-full p-auto justify-center mx-auto my-4 flex'>
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

function StickySidecar(p) {

    const telephoneText = p?.contacts?.phone ? addDashes(p.contacts.phone) : "";
    const email = p?.contacts?.serviceEmail ? p.contacts.serviceEmail : "";
    const longAddress = p?.contacts?.addressLong ? p.contacts.addressLong : "";
    const locationLink = p?.siteLinks?.googleLink ? p.siteLinks.googleLink : "";
    const openLong = p?.contacts?.openLong ? p.contacts.openLong : "";

    return <div className='box-border p-2 sticky top-[149px]'>
        <div className='flex flex-col'>
            <div className='relative h-[200px] w-[200px] mx-auto my-3 xl:my-0 rounded-full overflow-hidden '>
                <Image
                    src={p.image.url}
                    alt={p.image.alternativeText}
                    layout="fill"
                    objectFit="fill"
                />
            </div>
            <div className="flex flex-col gap-1">
                <NextLinkButtonSide
                    text="Schedule Service"
                    icon={<GiAutoRepair className="h-7 w-7" />}
                    link={`/contact?text=Im interested in ${p.service?.serviceName && typeof p.service?.serviceName === 'string' ? p.service.serviceName.replaceAll('_', ' ') : 'Service Now'}`} />
                <LinkButtonSide text={telephoneText} link={`tel:${p.contacts.phone}`} icon={<BsTelephoneInboundFill className="h-7 w-7" />} />
                <LinkButtonSide text={email} link={`mailto: ${email}`} icon={<MdOutlineMailOutline className="h-7 w-7" />} />
                <LinkButtonSide text={longAddress} link={locationLink} icon={<HiOutlineLocationMarker className="h-7 w-7" />} />
                <NextLinkButtonSide text={`${openLong}`} icon={<GoCalendar className="h-7 w-7" />} link="/calendar" />
            </div>
        </div>
    </div>

}

function ThisService(p: props) {
    return (
        <div className='bg-white p-2'>
            <Head>
                <title>{`${process.env.NEXT_PUBLIC_BUSINESS_NAME}: ${p.serviceName}`}</title>
            </Head>
            <div className="grid grid-cols-12 grid-flow-row mx-auto pt-8 pb-4 lg:pt-20 px-2 w-full lg:w-4/5 2xl:w-3/5  relative bg-white">
                <div className='col-span-12 lg:col-span-9' >
                    {mapServiceSections(p.service)}
                    <ContactForm {...p} />
                </div>
                <div className='hidden lg:block col-span-0 lg:col-span-3'>
                    <StickySidecar image={p.service.img} service={p.service.payload} contacts={p.contacts} siteLinks={p.siteLinks} />
                </div>
            </div>
        </div>
    );
}

export default function SpecialService(p: staticData) {
    return (
        <PublicHOC contacts={p.contacts} siteLinks={p.siteLinks} images={p.images} siteText={p.siteText}>
            <Screen>
                <ThisService faq={p.faq} images={p.images} siteText={p.siteText} service={p.thisService} contacts={p.contacts} siteLinks={p.siteLinks} serviceName={p.serviceName} serviceHome={p.serviceHome} />
            </Screen>
        </PublicHOC>
    );
}
