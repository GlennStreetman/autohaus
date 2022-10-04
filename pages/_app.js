import "../styles/globals.css";
import Head from "next/head";

import Script from 'next/script'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import * as gtag from '../lib/gtag'

import React from "react";
import ScreenWidth from "../components/screenWidth";

function MyApp({ Component, pageProps }) {

    const router = useRouter()
    useEffect(() => {
        const handleRouteChange = (url) => {
        gtag.pageview(url)
        }
        router.events.on('routeChangeComplete', handleRouteChange)
        router.events.on('hashChangeComplete', handleRouteChange)
        return () => {
        router.events.off('routeChangeComplete', handleRouteChange)
        router.events.off('hashChangeComplete', handleRouteChange)
        }
    }, [router.events])

    return (
        <>
        <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
        />
        <Script
            id="gtag-init"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
            __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gtag.GA_TRACKING_ID}', {
                page_path: window.location.pathname,
                });
            `,
            }}
        />
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


{/* <Script strategy="afterInteractive" async='true' src="https://www.googletagmanager.com/gtag/js?id=AW-10950223307" />          
<Script
strategy="afterInteractive"
onLoad={() => {
    console.log('google adds')
    window.dataLayer = window.dataLayer || [];
    function gtag(){
        dataLayer.push(arguments)
    }
    gtag('js', new Date());
    gtag('config', 'AW-10950223307');
}} /> */}