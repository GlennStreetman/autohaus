
import { PublicHOC } from "../components/publicData";
import Head from "next/head";
import FAQ from "../components/faq";
import Intro from '../components/intro'
import ParseMarkdown from "../lib/parseMarkdown";
import {getPublicFAQ, faqPayload} from "../strapiAPI/getPublicFAQ"
import {getPublicImages, imagePayload} from "../strapiAPI/getPublicImages"
import {getContacts, contacts} from "../strapiAPI/getContacts"
import {getSiteLinks, siteLinks} from "../strapiAPI/getSiteLinks"
import {getSiteText, siteText} from "../strapiAPI/getSiteText"
import {getServiceHome, serviceHomePayload} from "../strapiAPI/getServiceHome"
import {getServices, ServicePayload} from "../strapiAPI/getServices"

import Image from "next/image";



export async function getStaticProps() {

    const faqData:faqPayload[]  = await getPublicFAQ()
    const imageUrls:imagePayload | {} = await getPublicImages()
    const contactData:contacts = await getContacts()
    const siteLinks:siteLinks = await getSiteLinks()
    const siteText:siteText = await getSiteText()
    const serviceHome:serviceHomePayload = await getServiceHome()
    const serviceList:ServicePayload[] = await getServices()

    return {
        props: {
            faq: faqData,
            images: imageUrls,
            contacts: contactData,
            siteLinks: siteLinks,
            siteText: siteText,
            serviceHome: serviceHome,
            serviceList:serviceList,
        },
    };
}

interface props {
    serviceHome: serviceHomePayload;
    faq: faqPayload[];
    serviceList: ServicePayload[]
}

interface staticData {
    siteLinks: siteLinks;
    siteText: siteText;
    images: imagePayload;
    faq: faqPayload[];
    contacts: contacts;
    serviceHome: serviceHomePayload;
    serviceList: ServicePayload[]

}



export function ServiceHome(p: props) {

    const mapServiceList = p.serviceList.map((el)=>
        <div key={`${el.name}-key`} className='col-span-4'>
            <div className='flex flex-col'>
                <div className='relative h-[200px] w-[200px] mx-auto my-3 lg:my-0 rounded-full overflow-hidden '>
                    <Image
                        src={el.bannerImage}
                        alt={el.bannerText}
                        layout="fill"
                        objectFit="fill"
                    />
                </div>
                <div className='sectionHeading text-highlight'>{el.bannerText}</div>
                <div className=''><ParseMarkdown text={el.shortDescription} /></div>
            </div>
        </div>
    )
    
    return (
        <div className='bg-white'>
            <Head>
                <title>{`${process.env.NEXT_PUBLIC_BUSINESS_NAME}: Porsche Repair Specialist - Santa Monica`}</title>
            </Head>
            <main>
                <div className='h-20' />
                <section>
                    <Intro override='text-center mb-4 text-4xl' heading={p?.serviceHome?.heading ? p.serviceHome.heading : ''} body={p?.serviceHome?.topText ? p.serviceHome.topText : ''} />
                </section>
                <section className='defaultWidth'>
                    <div className='grid grid-cols-12 gap-3 my-2 mb-4'>
                        {mapServiceList}
                    </div>
                </section>
                <section >
                    <FAQ  faq={p.faq} />
                </section>

            </main>
        </div>
    );
}

export default function Main(p: staticData) {
    return (
        <PublicHOC contacts={p.contacts} siteLinks={p.siteLinks} images={p.images} >
            <ServiceHome {...p} />
        </PublicHOC>
    );
}