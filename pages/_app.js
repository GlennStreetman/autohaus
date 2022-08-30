import "../styles/globals.css";
import Head from "next/head";

import React from "react";
import ScreenWidth from "../components/screenWidth";

function MyApp({ Component, pageProps }) {
    return (
        <>
            <div className="min-h-screen relative bg-neutral-900">
                <Head>
                    <meta
                        name='keywords'
                        content="Porsche, Porche, Auto Repair, Oil Change, Brake Repair, Emissions Testing, Emissions Check, Check Engine Light, Car Inspection"
                    />
                    <meta name='description' content={`${process.env.NEXT_PUBLIC_BUSINESS_NAME} ${process.env.NEXT_PUBLIC_META_DESCRIPTION}`} />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                </Head>
                <ScreenWidth>
                    <Component {...pageProps} />
                </ScreenWidth>
            </div>
        </>
    );
}

export default MyApp;
