
import { PublicHOC } from "../components/publicData";
import Head from "next/head";
import FAQ from "../components/faq";
import Intro from '../components/intro'
import ParseMarkdown from "../lib/parseMarkdown";
import MapChecklist from '../components/MapChecklist'
import { getPublicFAQ, faqPayload } from "../strapiAPI/getPublicFAQ"
import { getPublicImages, imagePayload } from "../strapiAPI/getPublicImages"
import { getContacts, contacts } from "../strapiAPI/getContacts"
import { getSiteLinks, siteLinks } from "../strapiAPI/getSiteLinks"
import { getSiteText, siteText } from "../strapiAPI/getSiteText"
import { getServiceHome, serviceHomePayload } from "../strapiAPI/getServiceHome"
import { getServices, ServicePayload } from "../strapiAPI/getServices"

import Image from "next/image";
import Link from 'next/link'

export async function getStaticProps() {

    const faqData: faqPayload[] = await getPublicFAQ()
    const imageUrls: imagePayload | {} = await getPublicImages()
    const contactData: contacts = await getContacts()
    const siteLinks: siteLinks = await getSiteLinks()
    const siteText: siteText = await getSiteText()
    const serviceHome: serviceHomePayload = await getServiceHome()
    const serviceList: ServicePayload[] = await getServices()

    return {
        props: {
            faq: faqData,
            images: imageUrls,
            contacts: contactData,
            siteLinks: siteLinks,
            siteText: siteText,
            serviceHome: serviceHome,
            serviceList: serviceList,
        },
        revalidate: 86400
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

    const mapServiceList = p.serviceList.sort((a, b) => a.orderNumber - b.orderNumber).map((el) =>

        // <div key={`${el.name}-key`} className='col-span-12 sm:col-span-6 xl:col-span-4 p-2 hover:bg-red-200 cursor-pointer'>
        <div key={`${el.name}-key`} className='box-border min-w-[100%] max-w-[100%] sm:min-w-[50%] sm:max-w-[50%] xl:min-w-[33.33%] xl:max-w-[33.33%] p-3 hover:bg-red-200 cursor-pointer'>
            <Link href={`/service/${el.name.replace(/[^a-z0-9]+/gi, "_")}`}>
                <a>
                    <div className='flex flex-col'>
                        <div className='relative h-[200px] w-[200px] mx-auto my-3 xl:my-0 rounded-full overflow-hidden '>
                            <Image
                                src={el.bannerImage}
                                alt={el.bannerText}
                                layout="fill"
                                objectFit="fill"
                            />
                        </div>
                        <div className='sectionHeading text-primary'>{el.bannerText}</div>
                        <div className=''><ParseMarkdown text={el.shortDescription} /></div>
                    </div>
                </a>
            </Link>
        </div>
    )

    return (
        <div className='bg-white'>
            <Head>
                <title>{`Our Services`}</title>
            </Head>
            <main>
                <div className='h-4 md:h-20' />
                <section>
                    <Intro override='text-center mb-4 text-4xl' heading={p?.serviceHome?.heading || ''} body={p?.serviceHome?.topText || ''} />
                </section>
                <section>
                    <div className='w-full lg:w-3/5 mx-auto flex justify-center'>
                        <MapChecklist checklist={p.serviceHome.checkList} />
                    </div>
                </section>
                <section>
                    {/* <div className='grid grid-cols-12 gap-3 my-2 mb-4 place-content-around justify-between'> */}
                    <div className='flex flex-row flex-wrap w-full lg:w-3/5 mx-auto grow my-2 mb-4 place-content-around '>
                        {mapServiceList}
                    </div>
                </section>
                <section >
                    <div className='w-full lg:w-3/5 mx-auto'>
                        <FAQ faq={p.faq} />
                    </div>
                </section>

            </main>
        </div>
    );
}

export default function Main(p: staticData) {
    return (
        <PublicHOC contacts={p.contacts} siteLinks={p.siteLinks} images={p.images} siteText={p.siteText} >
            <ServiceHome {...p} />
        </PublicHOC>
    );
}