import Image from "next/image";
import ParseMarkdown from "../lib/parseMarkdown";
import FAQ from '../components/faq'
import { PublicHOC } from "../components/publicData";
import Head from "next/head";
import NextLinkButton from '../components/nextLinkButton'

import { getPublicFAQ, faqPayload } from "../strapiAPI/getPublicFAQ"
import { getPublicImages, imagePayload } from "../strapiAPI/getPublicImages"
// import {getTeam, teamMember} from "../strapiAPI/getTeam"
import { getContacts, contacts } from "../strapiAPI/getContacts"
import { getSiteLinks, siteLinks } from "../strapiAPI/getSiteLinks"
import { getStory, storyPayload } from "../strapiAPI/getStory"
import { getGoogle, googleAPIPayload } from "../strapiAPI/getGoogleApi"
import { getSiteText, siteText } from "../strapiAPI/getSiteText"
import { getTeam, teamMember } from "../strapiAPI/getTeam"

export async function getStaticProps() {

    const faqData = await getPublicFAQ()
    const imageUrls = await getPublicImages()
    const contactData: contacts = await getContacts()
    const siteLinks: siteLinks = await getSiteLinks()
    const story: storyPayload = await getStory()
    const mapAPI: googleAPIPayload = await getGoogle()
    const siteText: siteText = await getSiteText()
    const teamList: teamMember[] = await getTeam()

    return {
        props: {
            story: story,
            contacts: contactData,
            siteLinks: siteLinks,
            faq: faqData,
            images: imageUrls,
            mapAPI: mapAPI,
            siteText: siteText,
            teamList: teamList
        },
        revalidate: 86400
    };
}

interface staticProps {
    story: storyPayload;
    contacts: contacts;
    siteLinks: siteLinks;
    faq: faqPayload[];
    images: imagePayload;
    mapAPI: googleAPIPayload;
    siteText: siteText;
    teamList: teamMember[];
}

interface props {
    story: storyPayload;
    faq: faqPayload[];
    mapAPI: googleAPIPayload;
    teamList: teamMember[];
}

const gutter = "col-span-0 sm:col-span-1 lg:col-span-2 "; //2x
const body = "col-span-12 sm:col-span-10 lg:col-span-8  my-4"; //1x

function Story(p: props) {

    const mapTeamMembers = p.teamList.sort((a, b) => a.order - b.order).map((el) =>
        <div key={`${el.name}-key`} className='col-span-12 lg:col-span-6 p-2'>
            <div className='flex flex-col'>
                <div className='relative h-[300px] w-[300px] mx-auto my-3 xl:my-0 rounded-full overflow-hidden '>
                    <Image
                        src={el?.photoUrl || ''}
                        alt={el?.title || 'employee picutre'}
                        layout="fill"
                        objectFit="fill"
                    />
                </div>
                <div className=' text-4xl font-bold text-black pb-1'>{el.name}</div>
                <div className=' text-2xl font-bold text-primary pb-1'>{el.title}</div>
                <div className=''><ParseMarkdown text={el.description} /></div>
            </div>
        </div>
    )

    return (
        <div className="grid grid-row grid-cols-12 p-1 bg-white">
            <div className={gutter} />
            <div className={body}>
                <div className=' text-center sectionHeading mb-8'>{p?.story?.title || ''}</div>
                <div className=' m-2 grid grid-cols-12 flex-row gap-2'>
                    <div className='col-span-12 lg:col-span-6 flex flex-col justfiy-center'>
                        <ParseMarkdown text={p?.story?.story || ''} />
                        <div className='m-auto'>
                            <NextLinkButton text='Contact Us Today!' textSize='text-xl' link='/contact' icon={<></>} />
                        </div>
                    </div>
                    <div className='col-span-12 lg:col-span-6 relative h-[300px] lg:h-[300px] xl:h-[400px]  w-[400px] lg:w-[400px] xl:w-[500px] mx-auto my-3 lg:my-0'>
                        {p.story.picture ?
                            <Image
                                src={p?.story?.picture || ''}
                                alt={p?.story?.pictureName || ''}
                                layout="fill"
                                objectFit="cover"
                            /> : <></>}
                    </div>
                </div>
                {/* team list */}
                <div className='grid grid-cols-12 gap-4 mt-4 mb-4'>
                    {mapTeamMembers}
                </div>
                <div className='flex my-8'>
                    <iframe
                        width="1800"
                        height="450"
                        loading="lazy"
                        allowFullScreen
                        referrerPolicy="no-referrer-when-downgrade"
                        src={`https://www.google.com/maps/embed/v1/place?key=${p?.mapAPI?.secretAPIKey || ''}
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
        <PublicHOC contacts={p.contacts} siteLinks={p.siteLinks} images={p.images} siteText={p.siteText} >
            <>
                <Head>
                    <title>{`About Us`}</title>
                </Head>
                <div className="bg-white">
                    <div className='h-0 lg:h-20' />
                    <Story story={p.story} faq={p.faq} mapAPI={p.mapAPI} teamList={p.teamList} />
                </div>
            </>
        </PublicHOC>
    );
}


