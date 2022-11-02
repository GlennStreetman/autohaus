import React from "react";
import Banner from "../components/banner";
import { PublicHOC } from "../components/publicData";
import Head from "next/head";
import FAQ from "../components/faq";

import {getPublicFAQ, faqPayload} from "../strapiAPI/getPublicFAQ"
import {getPublicImages, imagePayload} from "../strapiAPI/getPublicImages"
import {getTeam, teamMember} from "../strapiAPI/getTeam"
import {getContacts, contacts} from "../strapiAPI/getContacts"
import {getSiteLinks, siteLinks} from "../strapiAPI/getSiteLinks"
import {getSiteText, siteText} from "../strapiAPI/getSiteText"
import {getServices, ServicePayload} from "../strapiAPI/getServices"
import {getHoliday, holiday} from "../strapiAPI/getHolidays"

export async function getStaticProps() {

    const faqData = await getPublicFAQ()
    const imageUrls = await getPublicImages()
    const teamList = await getTeam()
    const contactData:contacts = await getContacts()
    const siteLinks:siteLinks = await getSiteLinks()
    const siteText:siteText = await getSiteText()
    const allServices:ServicePayload[] = await getServices()
    const holidays:holiday[] = await getHoliday()


    return {
        props: {
            faq: faqData,
            team: teamList,
            images: imageUrls,
            contacts: contactData,
            siteLinks: siteLinks,
            siteText: siteText,
            allServices: allServices,
            holidays: holidays,
        },
    };

}

const days = {
    0: "Sunday",
    1: "Monday",
    2: "Tuesday",
    3: "Wednesday",
    4: "Thursday",
    5: "Friday",
    6: "Saturday",
};

interface holidayObject {
    targetdate: string;
    holiday: string;
    daysclosed: string;
    images: imagePayload;
}

const tableCell = "p-2 ";


function Calendar(p: props) {
    const gutter = "col-span-0 lg:col-span-1 xl:col-span-3"; //2x
    const body = "col-span-12 lg:col-span-10 xl:col-span-6 mb-4  text-white p-2"; //1x

    function mapCalendar(calendar: holiday[]) {
        const mapped = Object.values(calendar).map((el) => {
            const date = el.targetDate.replace("T00:00:00.000Z", "").split("-");
            const dateNumber = new Date(parseInt(date[0]), parseInt(date[1]) - 1, parseInt(date[2])).getDay();
            return (
                <tr key={`calendarRow-${el.holiday}`}>
                    <td className={tableCell}>{el.targetDate.replace("T00:00:00.000Z", "")}</td>
                    <td className={tableCell}>{el.holiday}</td>
                    <td className={tableCell}>{days[dateNumber]}</td>
                    <td className="p-2 text-center">{el.daysClosed}</td>
                </tr>
            );
        });
        return mapped;
    }

    return (
        <>
            <Head>
                <title>{`${process.env.NEXT_PUBLIC_BUSINESS_NAME}: Calendar`}</title>
            </Head>
            <main>
                <section>
                    <Banner images={p.images} />
                </section>
                <section>
                    <div className="grid grid-row grid-cols-12 bg-white">
                        <div className={gutter}></div>
                        <div className={body}>
                            <div className="flex flex-col content-center">
                                <div className="flex justify-center text-accentRed active:bg-strong text-3xl font-bold p-3">{`Open: ${p.contacts.openShort}`}</div>
                                <div className="flex justify-center text-accentRed active:bg-strong text-3xl font-bold p-3">{`${p.contacts.openLong}`}</div>
                                <div className="flex justify-center text-accentRed active:bg-strong text-3xl font-bold p-3">Upcoming holidays</div>
                                <table className="text-black border-2 border-black">
                                    <thead className="border-2 border-black">
                                        <tr className="border-black">
                                            <td className={tableCell}>Date:</td>
                                            <td className={tableCell}>Holiday:</td>
                                            <td className={tableCell}>Day:</td>
                                            <td className="p-2 text-center">Days Closed:</td>
                                        </tr>
                                    </thead>
                                    <tbody>{mapCalendar(p.holidays)}</tbody>
                                </table>
                            </div>
                        </div>
                        <div className={gutter}></div>
                    </div>
                </section>
                <section>
                    <FAQ faq={p.faq} />
                </section>
            </main>
        </>
    );
}

interface props {
    faq: faqPayload[];
    images: imagePayload;
    team: teamMember[];
    data: string[];
    siteText: siteText;
    allServices: ServicePayload[];
    holidays: holiday[]
    contacts: contacts
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
    holidays: holiday[];
}

export default function Main(p: staticData) {
    return (
        <PublicHOC {...p}>
            <Calendar faq={p.faq} data={p.data} team={p.team} images={p.images} siteText={p.siteText} allServices={p.allServices} holidays={p.holidays} contacts={p.contacts} />
        </PublicHOC>
    );
}
