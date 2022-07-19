import Banner from "../components/banner";
import Why from "../components/why";
import React, { useContext } from "react";
import { PublicContext } from "../components/publicData";
import { PublicHOC } from "../components/publicData";
import prisma from "../lib/prismaPool";
import Head from "next/head";
import { useRouter } from "next/router";

const gutter = "col-span-0 lg:col-span-1 xl:col-span-3"; //2x
const body = "col-span-12 lg:col-span-10 xl:col-span-6 mb-4 text-white p-2 whitespace-pre-wrap flex flex-col"; //1x

export async function getStaticProps() {
    const data = await prisma.sitesetup.findMany({});
    return {
        props: { data: data },
    };
}

function Thankyou() {
    const router = useRouter();

    const firstName = router?.query?.first
        ? `${router.query.first},
    `
        : "";
    const publicData = useContext(PublicContext);
    const bannerText = `
${firstName}
${publicData.thanksService}

    `;
    return (
        <div className="bg-white">
            <Banner>
                <></>
            </Banner>
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
            <Why />
        </div>
    );
}

export default function Main(p) {
    return (
        <PublicHOC {...p}>
            <Head>
                <title>{`${process.env.NEXT_PUBLIC_BUSINESS_NAME}: Thank you!`}</title>
            </Head>
            <Thankyou />
        </PublicHOC>
    );
}
