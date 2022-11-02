import ParseMarkdown from "./../lib/parseMarkdown";
import React, { useState } from "react";
import LabeledtextArea from "../components/labeledTextArea";
import { PublicHOC } from "../components/publicData";
import Banner from "../components/banner";
import Link from "next/link";
import OutlinedSurface from "../components/outlinedSurface";
import Head from "next/head";

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

const largeTextStyling = `text-white font-heading bold text-3xl sm:text-4xl lg:text-6xl3 [text-shadow:2px_2px_rgba(0,0,0,1)] antialiased `;

function FormattingHelp() {
    const [text, setText] = useState(rawtext);

    return (
        <div className="p-6 flex flex-col gap-4">
            <LabeledtextArea id="fpBanner" label="Enter Test Text Here" value={text} callback={setText} />

            <OutlinedSurface label="Light Section">
                {" "}
                <ParseMarkdown text={text} />{" "}
            </OutlinedSurface>

            <OutlinedSurface dark={true} label="Dark Section">
                {" "}
                <ParseMarkdown dark={true} text={text} />{" "}
            </OutlinedSurface>

            <Link href="/">Return Home</Link>
        </div>
    );
}

export default function Main(p) {
    return (
        <PublicHOC contacts={p.contacts} siteLinks={p.siteLinks}>

            <Head>
                <title>{`${process.env.NEXT_PUBLIC_BUSINESS_NAME}: Formatting Text`}</title>
            </Head>
            <Banner images={p.images}>
                <div className={largeTextStyling}>Text Formating: Guide by example</div>
            </Banner>

            <FormattingHelp {...p} />
        </PublicHOC>
    );
}

const rawtext = `### hi
## hi
# hi
*b Lorem Ipsum *b *i is simply  dummy text of the printing *i and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum

--- Point one
--- point two
#--- Important point
##--- A different point
###--- Again

*Q Quote from a very important person!*Q
![text](911s_logo.png)
[Link to external site](https://gstreet.dev)
[Link to home page](/)
[Link to Quote page](/quote)
 `;
