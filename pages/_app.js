import "../styles/globals.css";
import React, { useState, useEffect } from "react";
import ScreenWidth from "../components/screenWidth";
import Topper from "../components/topper";
import Bottom from "../components/bottom";
// import { SessionProvider } from "next-auth/react";

function MyApp({ Component, pageProps }) {
    return (
        <>
            {/* <SessionProvider
                // @ts-ignore
                options={{
                    staleTime: 0,
                    refetchInterval: 0,
                }}
            > */}
            <div className="min-h-screen  relative">
                <ScreenWidth>
                    {/* <Logo /> */}
                    <Topper />
                    <Component {...pageProps} />
                    <Bottom />
                </ScreenWidth>
            </div>
            {/* </SessionProvider> */}
        </>
    );
}

export default MyApp;
