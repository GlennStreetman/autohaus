import React, { useContext } from "react";
import prisma from "./../../lib/prismaPool";
import { service } from "./../../components/manager/ourServices";
import Banner from "../../components/banner";
import Image from "next/image";
import ParseMarkdown from "./../../lib/parseMarkdown";
// import Aside from "../../components/aside";
import { PublicHOC } from "../../components/publicData";
import Head from "next/head";
import Screen, { ScreenWidth } from "../../components/screenWidth";

const imgBoxLeft = "relative rounded-md bg-black overflow-hidden h-36 w-36 md:h-80 md:w-80 lg:h-96 lg:w-96 xl::h-96 xl:w-96 float-left m-4 ";
const imgBoxRight = "relative rounded-md bg-black overflow-hidden h-36 w-36 md:h-80 md:w-80 lg:h-96 lg:w-96 xl::h-96 xl:w-96 float-right m-4 ";

export async function getStaticProps(context) {
    const serviceProps = await prisma.services.findMany({});
    // console.log("service props: ", serviceProps, "params: ", context);
    const findService = serviceProps.find((el) => {
        const compName = el.name.replace(/[^a-z0-9+]+/gi, "");
        const compID = context.params.id.replace(/[^a-z0-9+]+/gi, "");
        // console.log("Test", compName, compID, compName === compID);
        return compName === compID;
    });
    const sections = await prisma.servicesection.findMany({
        where: {
            serviceid: {
                equals: findService.id,
            },
        },
    });

    const data = await prisma.sitesetup.findMany({});

    findService["sections"] = sections;

    return {
        props: {
            services: findService,
            data: data,
        },
    };
}

function getPaths() {
    return new Promise(async (res) => {
        const services = await prisma.services.findMany({});
        const serviceList = services.map((el) => {
            const name = el.name.replace(/[^a-z0-9+]+/gi, "");
            return {
                params: {
                    id: name,
                },
            };
        });
        // console.log(serviceList);
        res(serviceList);
    });
}

export async function getStaticPaths() {
    const paths = await getPaths();
    return {
        paths,
        fallback: "blocking",
    };
}

function isOddOrEven(n, length) {
    if (Math.abs(length % 2) === 1) {
        return Math.abs(n % 2) !== 1;
    } else {
        return Math.abs(n % 2) === 1;
    }
}

function mapServiceSections(p: service) {
    const sectionCount = Object.keys(p.sections).length;
    const sectionMap = p.sections.map((val, indx) => {
        const odd = !isOddOrEven(indx, sectionCount);
        return (
            <React.Fragment key={`${val.serviceid}${val.ordernumber}-key`}>
                <div className={`lg:block col-span-0 lg:col-span-1 xl:col-span-2 ${odd ? "bg-primaryDark" : ""}`} />
                <section className="flex flex-col col-span-12 md:col-span-12 lg:col-span-10 xl:col-span-8">
                    <div className={`p-2 bg-primary dark:bg-primaryDark ${odd ? "bg-primaryDark" : ""}`}>
                        {val.sectionimage ? (
                            <div className={isOddOrEven(indx, sectionCount) ? imgBoxLeft : imgBoxRight}>
                                {
                                    <Image
                                        src={`${process.env.NEXT_PUBLIC_AWS_PUBLIC_BUCKET_URL}${val.sectionimage}`}
                                        alt={val.sectionheader}
                                        layout="fill"
                                        objectFit="fill"
                                        priority
                                    />
                                }
                            </div>
                        ) : (
                            <></>
                        )}
                        <div className="text-3xl font-bold text-accent mt-4 mx-4">{`${val.sectionheader}`}</div>

                        <div className={`whitespace-pre-line ${odd ? "text-white" : "text-black"} mx-4 mb-2`}>
                            <br />
                            <ParseMarkdown dark={odd} text={val.sectiontext} />{" "}
                        </div>
                    </div>
                </section>
                <div className={`lg:block col-span-0 lg:col-span-1 xl:col-span-2 ${odd ? "bg-primaryDark" : ""}`} />
            </React.Fragment>
        );
    });
    {
    }
    return sectionMap;
}

function Services(p: service) {
    const screenSize = useContext(ScreenWidth);

    return (
        <div>
            <Head>
                <title>{`${process.env.NEXT_PUBLIC_BUSINESS_NAME}: ${p.name}`}</title>
            </Head>
            <Banner />
            <div className="grid grid-cols-12 relative bg-white">
                {mapServiceSections(p)}
                <div
                    className="h-full flex flex-col justify-center shrink"
                    style={{
                        gridArea: "1 / 11 / 1 / 11",
                        position: "absolute",
                    }}
                >
                    <div className="grow" />
                    {/* {screenSize.width > 1285 ? (
                        <div>
                            <Aside />
                        </div>
                    ) : (
                        <></>
                    )} */}
                    <div className="grow" />
                </div>
            </div>
        </div>
    );
}

export default function Main(p) {
    return (
        <PublicHOC {...p}>
            <Screen>
                <Services {...p.services} />
            </Screen>
        </PublicHOC>
    );
}
