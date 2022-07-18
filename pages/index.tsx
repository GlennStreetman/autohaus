import React, { useContext } from "react";
import prisma from "./../lib/prismaPool";
import Banner from "../components/banner";
import Team from "../components/team";
import Services from "../components/services";
import Why from "../components/why";
import { service } from "../components/manager/ourServices";
import { PublicContext, PublicHOC } from "../components/publicData";
import Head from "next/head";
import FAQ from "../components/faq";
import { faqObj } from "./api/getFAQ";
import Announcements from "../components/announcements";

const smallTextStyling = `text-white font-heading bold text-1xl sm:text-2xl lg:text-3xl [text-shadow:2px_2px_rgba(0,0,0,1)] antialiased whitespace-pre-line`;

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

    return {
        props: {
            services: services,
            data: data,
            faq: faqData,
        },
    };
}

interface props {
    services: service[];
    faq: faqObj[];
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
                        <div className={smallTextStyling}>
                            <Announcements text={publicData.FPBannerText} />
                        </div>
                    </Banner>
                </section>
                <section>
                    <Services services={p.services} />
                </section>
                <section>
                    <Why />
                </section>
                {/* <section>
                <Team />
                </section> */}
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
            <Home services={p.services} faq={p.faq} />
        </PublicHOC>
    );
}
