import React from "react";
import prisma from "./../../lib/prismaPool";
import { service } from "./../../components/manager/ourServices";
import Banner from "../../components/banner";
import Image from "next/image";
import ParseMarkdown from "./../../lib/parseMarkdown";
import styles from "./services.module.css";
import Aside from "../../components/aside";

const gutter = " hidden lg:block lg:col-span-1 "; //2x
const employees = "      p-2 col-span-12 md:col-span-12 lg:col-span-6"; //1x
const imgBoxLeft = "relative rounded-md bg-black overflow-hidden h-56 w-56 md:h-80 md:w-80 lg:h-96 lg:w-96 xl::h-96 xl:w-116 float-left m-2 ";
const imgBoxRight = "relative rounded-md bg-black overflow-hidden h-56 w-56 md:h-80 md:w-80 lg:h-96 lg:w-96 xl::h-96 xl:w-116 float-right m-2 ";

export async function getStaticProps(params) {
    const serviceProps = await prisma.services.findMany({});
    const findService = serviceProps.find((el) => el.name.replace(/[^a-z0-9+]+/gi, "") === params.params.id);
    const sections = await prisma.servicesection.findMany({
        where: {
            serviceid: {
                equals: findService.id,
            },
        },
    });

    findService["sections"] = sections;

    return { props: findService };
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
        console.log("servicelist", serviceList);
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
    // console.log("is odd or even");
    if (Math.abs(length % 2) === 1) {
        // console.log("odd length", length, "n", n, Math.abs(n % 2) === 1);
        return Math.abs(n % 2) !== 1;
    } else {
        // console.log("even length", length, "n", n, Math.abs(n % 2) === 1);
        return Math.abs(n % 2) === 1;
    }
}

function mapServiceSections(p: service) {
    const sectionCount = Object.keys(p.sections).length;
    const sectionMap = p.sections.map((val, indx) => {
        const myLoader = () => {
            return `${process.env.NEXT_PUBLIC_AWS_PUBLIC_BUCKET_URL}${val.sectionimage}`;
        };

        return (
            <section key={`${val.serviceid}${val.ordernumber}-key`}>
                {/* <div className="grid grid-cols-12"> */}

                <div className={isOddOrEven(indx, sectionCount) ? employees : employees}>
                    {val.sectionimage ? (
                        <div className={isOddOrEven(indx, sectionCount) ? imgBoxLeft : imgBoxRight}>
                            {<Image loader={myLoader} src={val.sectionheader} alt={val.sectionheader} layout="fill" objectFit="fill" priority />}
                        </div>
                    ) : (
                        <></>
                    )}
                    <div className="text-3xl font-bold">{`${val.sectionheader}`}</div>
                    <div className="whitespace-pre-line">
                        <ParseMarkdown text={val.sectiontext} />{" "}
                    </div>
                </div>

                {/* </div> */}
            </section>
        );
    });

    return <article className={styles.article}>{sectionMap}</article>;
}

function Services(p: service) {
    return (
        <div>
            <Banner />
            <div className="grid grid-cols-12">
                <div className={gutter} />
                <div className="flex flex-col col-span-12 md:col-span-12 lg:col-span-6">{mapServiceSections(p)}</div>
                {/* <div className={aside}> */}
                <Aside />
                {/* </div> */}
                <div className={gutter} />
            </div>
        </div>
    );
}

export default Services;
