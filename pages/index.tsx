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
import { faqObj } from "./api/getFAQ";
import Announcements from "../components/announcements";

interface siteSetup {
    [index: string]: string
}


export async function getStaticProps() {
    const services = await prisma.services.findMany({
        orderBy: [
            {
                ordernumber: "asc",
            },
        ],
    });

    const data = await prisma.sitesetup.findMany({});
    const faqData = await prisma.faq.findMany({
        orderBy: [
            {
                ordernumber: "asc",
            },
        ],
    });

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
        },
    };
}

interface props {
    team: team[];
    services: service[];
    faq: faqObj[];
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
                    <Banner>
                        {/* <div className={smallTextStyling}> */}
                            <Announcements text={publicData.FPBannerText} />
                        {/* </div> */}
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
            <Home services={p.services} faq={p.faq} data={p.data} team={p.team}/>
        </PublicHOC>
    );
}
