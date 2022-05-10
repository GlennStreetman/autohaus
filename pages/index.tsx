import React, { useContext } from "react";
import prisma from "./../lib/prismaPool";
import Banner from "../components/banner";
import Services from "../components/services";
import Why from "../components/why";
import { service } from "../components/manager/ourServices";
import { PublicData } from "../components/publicData";

const smallTextStyling = `text-white font-heading bold text-1xl sm:text-2xl lg:text-3xl [text-shadow:2px_2px_rgba(0,0,0,1)] antialiased whitespace-pre-line`;

export async function getStaticProps() {
    const services = await prisma.services.findMany({
        orderBy: [
            {
                ordernumber: "asc",
            },
        ],
    });
    return {
        props: {
            services: services,
        },
    };
}

interface props {
    services: service[];
}

export default function Home(p: props) {
    const publicData = useContext(PublicData);

    return (
        <>
            <main>
                <section>
                    <Banner>
                        <div className={smallTextStyling}>{publicData.FPBannerText}</div>
                    </Banner>
                </section>
                <section>
                    <Services services={p.services} />
                </section>
                <section>
                    <Why />
                </section>
            </main>

            <footer></footer>
        </>
    );
}
