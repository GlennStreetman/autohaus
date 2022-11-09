import Image from "next/image";
import ParseMarkdown from "../lib/parseMarkdown";
import FAQ from '../components/faq'
import styles from "./about.module.css";
import { PublicHOC } from "../components/publicData";
import Head from "next/head";

import { getPublicFAQ, faqPayload } from "../strapiAPI/getPublicFAQ"
import { getPublicImages, imagePayload } from "../strapiAPI/getPublicImages"
// import {getTeam, teamMember} from "../strapiAPI/getTeam"
import { getContacts, contacts } from "../strapiAPI/getContacts"
import { getSiteLinks, siteLinks } from "../strapiAPI/getSiteLinks"
import { getStory, storyPayload } from "../strapiAPI/getStory"
import { getGoogle, googleAPIPayload } from "../strapiAPI/getGoogleApi"




export async function getStaticProps() {

    const faqData = await getPublicFAQ()
    const imageUrls = await getPublicImages()
    // const teamList = await getTeam()
    const contactData: contacts = await getContacts()
    const siteLinks: siteLinks = await getSiteLinks()
    const story: storyPayload = await getStory()
    const mapAPI: googleAPIPayload = await getGoogle()

    return {
        props: {
            story: story,
            contacts: contactData,
            siteLinks: siteLinks,
            faq: faqData,
            images: imageUrls,
            mapAPI: mapAPI,
        },
    };
}


interface staticProps {
    story: storyPayload;
    contacts: contacts;
    siteLinks: siteLinks;
    faq: faqPayload[];
    images: imagePayload;
    mapAPI: googleAPIPayload;
}

interface props {
    story: storyPayload;
    faq: faqPayload[];
    mapAPI: googleAPIPayload;
}

const gutter = "col-span-0 sm:col-span-1 lg:col-span-2 xl:col-span-3"; //2x
const body = "col-span-12 sm:col-span-10 lg:col-span-10 xl:col-span-6 my-4"; //1x

function Story(p: props) {

    return (
        <div className="grid grid-row grid-cols-12 p-1 bg-white">
            <div className={gutter} />
            <div className={body}>
                <div className=' text-center sectionHeading mb-8'>{p.story.title}</div>
                <div className=' m-2 grid grid-cols-12 flex-row gap-2'>
                    <div className='col-span-12 lg:col-span-6'><ParseMarkdown text={p.story.story} /></div>
                    <div className='col-span-12 lg:col-span-6 relative h-[300px] lg:h-[300px] xl:h-[400px]  w-[400px] lg:w-[400px] xl:w-[500px] mx-auto my-3 lg:my-0'>
                        <Image
                            src={p.story.picture}
                            alt={p.story.pictureName}
                            layout="fill"
                            objectFit="cover"
                        />
                    </div>
                </div>
                <div className='flex my-8'>
                    <iframe
                        width="1800"
                        height="450"
                        loading="lazy"
                        allowFullScreen
                        referrerPolicy="no-referrer-when-downgrade"
                        src={`https://www.google.com/maps/embed/v1/place?key=${p.mapAPI.secretAPIKey}
                        &q=${p.mapAPI.searchString}`}>
                    </iframe>
                </div>
                <FAQ faq={p.faq} />
            </div>
            <div className={gutter} />
        </div>
    )
}

export default function About(p: staticProps) {
    return (
        <PublicHOC contacts={p.contacts} siteLinks={p.siteLinks} images={p.images} >
            <Head>
                <title>{`${process.env.NEXT_PUBLIC_BUSINESS_NAME}: About Us`}</title>
            </Head>
            <div className="bg-white">
                <div className='h-0 lg:h-20' />
                <Story story={p.story} faq={p.faq} mapAPI={p.mapAPI} />
            </div>
        </PublicHOC>
    );
}


