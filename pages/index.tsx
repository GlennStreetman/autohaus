import React, { useContext } from "react";
import prisma from "./../lib/prismaPool";
import Banner from "../components/banner";
import Team, {team} from "../components/team";
import Services from "../components/services";
import Why from "../components/why";
import { service } from "../components/manager/ourServices";
import { PublicContext, PublicHOC } from "../components/publicData";
import Head from "next/head";
import FAQ from "../components/faq";
import Announcements from "../components/announcements";

import {getPublicFAQ, faqPayload} from "../strapiAPI/getPublicFAQ"
import {getPublicImages, imagePayload} from "../strapiAPI/getPublicImages"

export async function getStaticProps() {

    const faqData = await getPublicFAQ()
    const imageUrls = await getPublicImages()


    const services = await prisma.services.findMany({
        orderBy: [
            {
                ordernumber: "asc",
            },
        ],
    });

    const data = await prisma.sitesetup.findMany({});



    const team = await prisma.team.findMany({
        orderBy: [
            {
                ordernumber: "asc",
            },
        ],
    });

    return {
        props: {
            services: services,
            data: data,
            faq: faqData,
            team: team,
            images: imageUrls
        },
    };
}

interface props {
    faq: faqPayload[];
    images: imagePayload;
    team: team[];
    services: service[];
    data: string[]
}

export function Home(p: props) {
    const publicData: any = useContext(PublicContext);

    return (
        <>
            <Head>
                <title>{`${process.env.NEXT_PUBLIC_BUSINESS_NAME}: Home`}</title>
            </Head>
            <main>
                <section>
                    <Banner images={p.images}>
                            <Announcements text={publicData.FPBannerText} />
                    </Banner>
                </section>
                <section>
                    <Services services={p.services} />
                </section>
                <section>
                    <Why />
                </section>
                <section>
                <Team team={p.team}/>
                </section>
                <section>
                    <FAQ faq={p.faq} />
                </section>
            </main>
        </>
    );
}

export default function Main(p: props) {
    return (
        <PublicHOC {...p}>
            {/* <Home services={p.services} faq={p.faq} /> */}
            <Home services={p.services} faq={p.faq} data={p.data} team={p.team} images={p.images}/>
        </PublicHOC>
    );
}
