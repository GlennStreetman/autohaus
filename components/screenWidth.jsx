import React, { useState, useEffect } from "react";

function getWindowDimensions() {
    const { width: width, width: height } = window.visualViewport;
    return {
        width,
        // height,
    };
}

export const ScreenWidth = React.createContext();

function ScreenWidthComponent({ children }) {
    const [width, setWidth] = useState(0);

    useEffect(() => {
        setWidth(getWindowDimensions());
    }, []);

    useEffect(() => {
        //handle resize
        function handleResize() {
            setWidth(getWindowDimensions());
        }

        setTimeout(() => setWidth(getWindowDimensions(), 2000));
        setTimeout(() => setWidth(getWindowDimensions(), 10000));
        setTimeout(() => setWidth(getWindowDimensions(), 200000));

        window.visualViewport.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return <ScreenWidth.Provider value={width}>{children}</ScreenWidth.Provider>;
}

export default ScreenWidthComponent;
