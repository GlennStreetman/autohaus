import Image from "next/image";
import ParseMarkdown from "../lib/parseMarkdown";
import styles from "./about.module.css";
import { PublicHOC } from "../components/publicData";
import Head from "next/head";

import {getPublicFAQ, faqPayload} from "../strapiAPI/getPublicFAQ"
import {getPublicImages, imagePayload} from "../strapiAPI/getPublicImages"
import {getTeam, teamMember} from "../strapiAPI/getTeam"
import {getContacts, contacts} from "../strapiAPI/getContacts"
import {getSiteLinks, siteLinks} from "../strapiAPI/getSiteLinks"

//flex grid elements
const gutter = " hidden lg:block lg:col-span-1 "; //2x
const gutterBlack = " hidden lg:block lg:col-span-1 bg-slate-200"; //2x
const employees = "      p-2 col-span-12 lg:col-span-10 "; //1x
const employeesBlack = " p-2 col-span-12 lg:col-span-10 bg-slate-200"; //1xmd:
const imgBoxLeft =
    " mx-auto md:m-3 col-span-12 md:col-span-auto relative rounded-md bg-slate-200 overflow-hidden h-56 w-56 md:h-80 md:w-80 lg:h-96 lg:w-96 xl::h-96 xl:w-116  float-none md:float-left  ";
const imgBoxRight =
    "mx-auto md:m-3 col-span-12 md:col-span-auto relative rounded-md bg-slate-200 overflow-hidden h-56 w-56 md:h-80 md:w-80 lg:h-96 lg:w-96 xl::h-96 xl:w-116 float-none  md:float-right ";
const largeTextStyling = `"text-center text-secondary font-extrabold lg:font-bold xl:font-normal font-banner text-1xl sm:text-2xl md:text-3xl xl:text-5xl [text-shadow:2px_2px_rgba(0,0,0,1)] antialiased whitespace-pre-line"`;

interface employees {
    id: number;
    name: string;
    title: string;
    description: string;
    filename: string; //file name
    ordernumber: string;
}



export async function getStaticProps() {

    const faqData = await getPublicFAQ()
    const imageUrls = await getPublicImages()
    const teamList = await getTeam()
    const contactData:contacts = await getContacts()
    const siteLinks:siteLinks = await getSiteLinks()

    return {
        props: {
            team: teamList,
            contacts: contactData,
            siteLinks: siteLinks,
            faq: faqData,
            images: imageUrls,
        },
    };
}

function isOddOrEven(n, length) {
    if (Math.abs(length % 2) === 1) {
        return Math.abs(n % 2) !== 1;
    } else {
        return Math.abs(n % 2) === 1;
    }
}

function Team(p: props) {
    const employeeCount = p.team.length;
    const mapEmployees = p.team.map((val, indx) => {
        return (
            <section key={`keySec-${val.name}`}>
                <div className="grid grid-cols-12 ">
                    <div className={isOddOrEven(indx, employeeCount) ? gutter : gutterBlack} />
                    <div className={isOddOrEven(indx, employeeCount) ? employees : employeesBlack}>
                        <div className={isOddOrEven(indx, employeeCount) ? imgBoxLeft : imgBoxRight}>
                            <Image
                                src={val.photoUrl}
                                alt={val.name}
                                layout="fill"
                                objectFit="fill"
                                priority
                            />
                        </div>
                        <div className="text-2xl font-bold text-secondary">{`${val.name}`}</div>
                        <div className="text-1xl font-bold text-accentBlue">{`${val.title}`}</div>
                        <div className="whitespace-pre-line">
                            <ParseMarkdown text={val.description} />
                        </div>
                    </div>
                    <div className={isOddOrEven(indx, employeeCount) ? gutter : gutterBlack} />
                </div>
            </section>
        );
    });

    return (
        <>
            <article className={styles.article}>
                <div className="flex flex-col">{mapEmployees}</div>
            </article>
        </>
    );
}

interface staticProps {
    team: teamMember[];
    contacts: contacts;
    siteLinks: siteLinks; 
    faq: faqPayload[];
    images: imagePayload;
}

interface props {
    team: teamMember[];
    faq: faqPayload[];
    images: imagePayload;
}

export default function Main(p: staticProps) {
    return (
        <PublicHOC contacts={p.contacts} siteLinks={p.siteLinks} images={p.images} >
            <Head>
                <title>{`${process.env.NEXT_PUBLIC_BUSINESS_NAME}: Meet the team`}</title>
            </Head>
            <div className="bg-white">
                <Team faq={p.faq} team={p.team} images={p.images}  />
            </div>
        </PublicHOC>
    );
}
