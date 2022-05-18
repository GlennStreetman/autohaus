import "../styles/globals.css";
import Head from "next/head";

import React from "react";
import ScreenWidth from "../components/screenWidth";

function MyApp({ Component, pageProps }) {
    return (
        <>
            <div className="min-h-screen  relative">
                <Head>
                    <meta keywords="Porsche, Porche, Auto Repair, Oil Change, Brake Repair, Emissions Testing, Emissions Check, Check Engine Light, Car Inspection" />
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
