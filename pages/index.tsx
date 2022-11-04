import Banner from "../components/banner";
import Team from "../components/team";
import Services from "../components/services";
import Why from "../components/why";
import { PublicHOC } from "../components/publicData";
import Head from "next/head";
import FAQ from "../components/faq";
import Announcements from "../components/announcements";
import Intro from '../components/intro'

import {getPublicFAQ, faqPayload} from "../strapiAPI/getPublicFAQ"
import {getPublicImages, imagePayload} from "../strapiAPI/getPublicImages"
import {getTeam, teamMember} from "../strapiAPI/getTeam"
import {getContacts, contacts} from "../strapiAPI/getContacts"
import {getSiteLinks, siteLinks} from "../strapiAPI/getSiteLinks"
import {getSiteText, siteText} from "../strapiAPI/getSiteText"
import {getServices, ServicePayload} from "../strapiAPI/getServices"
import {getBannerText, bannerTextPayload} from "../strapiAPI/getBannerText"
import {getIntro, introPayload} from "../strapiAPI/getIntro"
import {getWhyChecklist, whyPayload} from "../strapiAPI/getWhyChecklist"

export async function getStaticProps() {

    const faqData:faqPayload[]  = await getPublicFAQ()
    const imageUrls:imagePayload | {} = await getPublicImages()
    const teamList:teamMember[] = await getTeam()
    const contactData:contacts = await getContacts()
    const siteLinks:siteLinks = await getSiteLinks()
    const siteText:siteText = await getSiteText()
    const allServices:ServicePayload[] = await getServices()
    const bannerTexts:bannerTextPayload = await getBannerText()
    const intro:introPayload = await getIntro()
    const checklist:whyPayload = await getWhyChecklist()


    return {
        props: {
            faq: faqData,
            team: teamList,
            images: imageUrls,
            contacts: contactData,
            siteLinks: siteLinks,
            siteText: siteText,
            allServices: allServices,
            bannerTexts: bannerTexts,
            intro: intro,
            why: checklist,
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
    bannerTexts:bannerTextPayload;
    intro: introPayload;
    why: whyPayload;
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
    bannerTexts:bannerTextPayload;
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
                    <Banner images={p.images}>
                            <div className='flex flex-col'>
                            <div className='w-full h-16' />
                            <Announcements bannerTexts={p.bannerTexts} />
                            </div>
                    </Banner>
                </section>
                <section>
                    <Intro intro={p.intro} />
                </section>
                <section>
                    <Why why={p.why} />
                </section>
                {/* <section>
                <section></section>
                    <Services services={p.allServices} />
                </section>
                <section>
                    <Why siteText={p.siteText} />
                </section>
                <section>
                <Team team={p.team}/>
                </section>
                <section>
                    <FAQ faq={p.faq} />
                </section> */}
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
