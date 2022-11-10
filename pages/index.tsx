import Banner from "../components/banner";
import Why from "../components/why";
import { PublicHOC } from "../components/publicData";
import Head from "next/head";
import FAQ from "../components/faq";
import Announcements from "../components/announcements";
import Intro from '../components/intro'

import { getPublicFAQ, faqPayload } from "../strapiAPI/getPublicFAQ"
import { getPublicImages, imagePayload } from "../strapiAPI/getPublicImages"
import { getContacts, contacts } from "../strapiAPI/getContacts"
import { getSiteLinks, siteLinks } from "../strapiAPI/getSiteLinks"
import { getSiteText, siteText } from "../strapiAPI/getSiteText"
import { getBannerText, bannerTextPayload } from "../strapiAPI/getBannerText"
import { getIntro, introPayload } from "../strapiAPI/getIntro"
import { getWhyChecklist, whyPayload } from "../strapiAPI/getWhyChecklist"

export async function getStaticProps() {

    const faqData: faqPayload[] = await getPublicFAQ()
    const imageUrls: imagePayload | {} = await getPublicImages()
    const contactData: contacts = await getContacts()
    const siteLinks: siteLinks = await getSiteLinks()
    const siteText: siteText = await getSiteText()
    const bannerTexts: bannerTextPayload = await getBannerText()
    const intro: introPayload = await getIntro()
    const checklist: whyPayload = await getWhyChecklist()

    return {
        props: {
            faq: faqData,
            images: imageUrls,
            contacts: contactData,
            siteLinks: siteLinks,
            siteText: siteText,
            bannerTexts: bannerTexts,
            intro: intro,
            why: checklist,
        },
    };
}

interface props {
    faq: faqPayload[];
    images: imagePayload;
    siteText: siteText;
    bannerTexts: bannerTextPayload;
    intro: introPayload;
    why: whyPayload;
}

interface staticData {
    faq: faqPayload[];
    images: imagePayload;
    contacts: contacts;
    siteLinks: siteLinks;
    siteText: siteText;
    bannerTexts: bannerTextPayload;
    intro: introPayload;
    why: whyPayload;
}

export function Home(p: props) {

    return (
        <>
            <Head>
                <title>{`${process.env.NEXT_PUBLIC_BUSINESS_NAME}: Porsche Repair Specialist - Santa Monica`}</title>
            </Head>
            <main>
                <section>
                    <Banner images={p?.images}>
                        <div className='flex flex-col'>
                            <div className='w-full h-16' />
                            <Announcements bannerTexts={p.bannerTexts} />
                        </div>
                    </Banner>
                </section>
                <section>
                    <Intro heading={p?.intro?.heading || ''} body={p?.intro?.textBody || ''} />
                </section>
                <section>
                    <Why why={p.why} />
                </section>
                <section>
                    <FAQ faq={p.faq} />
                </section>
            </main>
        </>
    );
}

export default function Main(p: staticData) {
    return (
        <PublicHOC contacts={p.contacts} siteLinks={p.siteLinks} images={p.images} >
            <Home {...p} />
        </PublicHOC>
    );
}