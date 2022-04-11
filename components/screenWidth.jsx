import React, { useState, useEffect } from "react";

function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
        width,
        // height,
    };
}

export const ScreenWidth = React.createContext();

function screenWidth({ children }) {
    const [width, setWidth] = useState(0);

    useEffect(() => {
        setWidth(getWindowDimensions());
    }, []);

    useEffect(() => {
        //handle resize
        function handleResize() {
            setWidth(getWindowDimensions());
        }

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return <ScreenWidth.Provider value={width}>{children}</ScreenWidth.Provider>;
}

export default screenWidth;
