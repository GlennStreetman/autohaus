import "../styles/globals.css";
import React from "react";
import ScreenWidth from "../components/screenWidth";

function MyApp({ Component, pageProps }) {
    return (
        <>
            <div className="min-h-screen  relative">
                <ScreenWidth>
                    <Component {...pageProps} />
                </ScreenWidth>
            </div>
        </>
    );
}

export default MyApp;
