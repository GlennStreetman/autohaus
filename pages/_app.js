import "../styles/globals.css";
import React, { useState, useEffect } from "react";
import ScreenWidth from "../components/screenWidth";
import Topper from "../components/topper";
import Logo from "../components/logo";
import Bottom from "../components/bottom";

function MyApp({ Component, pageProps }) {
    return (
        <div className="min-h-screen  relative">
            <ScreenWidth>
                <Logo />
                <Topper />
                <Component {...pageProps} />
                <Bottom />
            </ScreenWidth>
        </div>
    );
}

export default MyApp;
