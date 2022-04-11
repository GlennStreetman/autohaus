import "../styles/globals.css";
import React, { useState, useEffect } from "react";
import ScreenWidth from "../components/screenWidth";

function MyApp({ Component, pageProps }) {
    return (
        <ScreenWidth>
            <Component {...pageProps} />
        </ScreenWidth>
    );
}

export default MyApp;
