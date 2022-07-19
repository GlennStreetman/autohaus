import prisma from "../lib/prismaPool";
import Image from "next/image";
import Banner from "../components/banner";
import ParseMarkdown from "./../lib/parseMarkdown";
import styles from "./team.module.css";
import { PublicHOC } from "../components/publicData";
import Head from "next/head";

//flex grid elements
const gutter = " hidden lg:block lg:col-span-1 "; //2x
const gutterBlack = " hidden lg:block lg:col-span-1 bg-slate-200"; //2x
const employees = "      p-2 col-span-12 lg:col-span-10 "; //1x
const employeesBlack = " p-2 col-span-12 lg:col-span-10 bg-slate-200"; //1xmd:
const imgBoxLeft =
    " mx-auto md:m-3 col-span-12 md:col-span-auto relative rounded-md bg-slate-200 overflow-hidden h-56 w-56 md:h-80 md:w-80 lg:h-96 lg:w-96 xl::h-96 xl:w-116  float-none md:float-left  ";
const imgBoxRight =
    "mx-auto md:m-3 col-span-12 md:col-span-auto relative rounded-md bg-slate-200 overflow-hidden h-56 w-56 md:h-80 md:w-80 lg:h-96 lg:w-96 xl::h-96 xl:w-116 float-none  md:float-right ";
const largeTextStyling = `text-white font-heading bold text-3xl sm:text-4xl lg:text-6xl3 [text-shadow:2px_2px_rgba(0,0,0,1)] antialiased `;

interface employees {
    id: number;
    name: string;
    title: string;
    description: string;
    filename: string; //file name
    ordernumber: string;
}

interface props {
    employees: employees[];
}

export async function getStaticProps() {
    const employees = await prisma.team.findMany({
        orderBy: [
            {
                ordernumber: "asc",
            },
        ],
    });
    const data = await prisma.sitesetup.findMany({});
    return {
        props: {
            employees,
            data: data,
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
    const employeeCount = Object.keys(p.employees).length;
    const mapEmployees = Object.values(p.employees).map((val, indx) => {
        return (
            <section key={`keySec-${val.name}`}>
                <div className="grid grid-cols-12 ">
                    <div className={isOddOrEven(indx, employeeCount) ? gutter : gutterBlack} />
                    <div className={isOddOrEven(indx, employeeCount) ? employees : employeesBlack}>
                        <div className={isOddOrEven(indx, employeeCount) ? imgBoxLeft : imgBoxRight}>
                            <Image
                                src={`${process.env.NEXT_PUBLIC_AWS_PUBLIC_BUCKET_URL}${val.filename}`}
                                alt={val.name}
                                layout="fill"
                                objectFit="fill"
                                priority
                            />
                        </div>
                        <div className="text-2xl font-bold">{`${val.name}`}</div>
                        <div className="text-1xl font-bold">{`${val.title}`}</div>
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
            <Banner>
                <div className={largeTextStyling}>Meet The Werkstatt Team</div>
            </Banner>
            <article className={styles.article}>
                <div className="flex flex-col">{mapEmployees}</div>
            </article>
        </>
    );
}

export default function Main(p: props) {
    return (
        <PublicHOC {...p}>
            <Head>
                <title>{`${process.env.NEXT_PUBLIC_BUSINESS_NAME}: Meet the team`}</title>
            </Head>
            <div className="bg-white">
                <Team {...p} />
            </div>
        </PublicHOC>
    );
}
