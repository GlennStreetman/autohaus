import Banner from "../components/banner";
import Faq from "../components/faq";
import { PublicHOC } from "../components/publicData";
import Head from "next/head";
import { useRouter } from "next/router";

const gutter = "col-span-0 lg:col-span-1 xl:col-span-3"; //2x
const body = "col-span-12 lg:col-span-10 xl:col-span-6 mb-4 text-white p-2 whitespace-pre-wrap flex flex-col"; //1x


import {getPublicFAQ, faqPayload} from "../strapiAPI/getPublicFAQ"
import {getPublicImages, imagePayload} from "../strapiAPI/getPublicImages"
import {getTeam, teamMember} from "../strapiAPI/getTeam"
import {getContacts, contacts} from "../strapiAPI/getContacts"
import {getSiteLinks, siteLinks} from "../strapiAPI/getSiteLinks"
import {getSiteText, siteText} from "../strapiAPI/getSiteText"
import {getServices, ServicePayload} from "../strapiAPI/getServices"


export async function getStaticProps() {

    const faqData = await getPublicFAQ()
    const imageUrls = await getPublicImages()
    const teamList = await getTeam()
    const contactData:contacts = await getContacts()
    const siteLinks:siteLinks = await getSiteLinks()
    const siteText:siteText = await getSiteText()
    const allServices:ServicePayload[] = await getServices()


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

function Thankyou(p: props) {
    const router = useRouter();

    const firstName = router?.query?.first
        ? `${router.query.first},
    `
        : "";
    const bannerText = `
${firstName}
${p.siteText.thanksService}

    `;
    return (
        <div className="bg-white">
            <Banner images={p.images} />
            <div className="grid grid-row grid-cols-12 p-1 bg-black">
                <div className={gutter}></div>
                <div className={body}>
                    <div className="grow"></div>
                    <div className="shrink">
                        {bannerText}
                        <pre>
                            Sincerely,
                            <br />
                            The Werkstatt Team
                        </pre>
                    </div>
                    <div className="grow"></div>
                </div>
                <div className={gutter}></div>
            </div>
            <Faq faq={p.faq} />
        </div>
    );
}

export default function Main(p: staticData) {
    return (
        <PublicHOC contacts={p.contacts} siteLinks={p.siteLinks}>
            <Head>
                <title>{`${process.env.NEXT_PUBLIC_BUSINESS_NAME}: Thank you!`}</title>
            </Head>
            <Thankyou faq={p.faq} data={p.data} team={p.team} images={p.images} siteText={p.siteText} allServices={p.allServices}/>
        </PublicHOC>
    );
}
