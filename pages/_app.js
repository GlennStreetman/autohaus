import "../styles/globals.css";
import React from "react";
import ScreenWidth from "../components/screenWidth";
import PublicData from "../components/publicData";
import Topper from "../components/topper";
import Bottom from "../components/bottom";

function MyApp({ Component, pageProps }) {
    return (
        <>
            <div className="min-h-screen  relative">
                <ScreenWidth>
                    <PublicData>
                        <Topper />
                        <Component {...pageProps} />
                        <Bottom />
                    </PublicData>
                </ScreenWidth>
            </div>
        </>
    );
}

export default MyApp;
