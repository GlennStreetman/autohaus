import "../styles/globals.css";
import React, { useState, useEffect } from "react";
import ScreenWidth from "../components/screenWidth";
import Topper from "../components/topper";
import Bottom from "../components/bottom";
import { SessionProvider } from "next-auth/react";

function MyApp({ Component, pageProps }) {
    return (
        <>
            <SessionProvider
                // Provider options are not required but can be useful in situations where
                // you have a short session maxAge time. Shown here with default values.
                // @ts-ignore
                options={{
                    // Stale Time controls how often the useSession in the client should
                    // contact the server to sync the session state. Value in seconds.
                    // e.g.
                    // * 0  - Disabled (always use cache value)
                    // * 60 - Sync session state with server if it's older than 60 seconds
                    staleTime: 0,
                    // Refetch Interval tells windows / tabs that are signed in to keep sending
                    // a keep alive request (which extends the current session expiry) to
                    // prevent sessions in open windows from expiring. Value in seconds.
                    //
                    // Note: If a session has expired when keep alive is triggered, all open
                    // windows / tabs will be updated to reflect the user is signed out.
                    refetchInterval: 0,
                }}
            >
                <div className="min-h-screen  relative">
                    <ScreenWidth>
                        {/* <Logo /> */}
                        <Topper />
                        <Component {...pageProps} />
                        <Bottom />
                    </ScreenWidth>
                </div>
            </SessionProvider>
        </>
    );
}

export default MyApp;
