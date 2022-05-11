import React from "react";
import Topper from "../components/topper";
import Bottom from "../components/bottom";

export const PublicContext = React.createContext();

function PublicProvider(p) {
    const formData = p.data.reduce((prev, curr) => {
        prev[curr.name] = curr.value;
        return prev;
    }, {});
    return <PublicContext.Provider value={formData}>{p.children}</PublicContext.Provider>;
}

export function PublicHOC(p) {
    return (
        <PublicProvider data={p.data}>
            <Topper />
            {p.children}
            <Bottom />
        </PublicProvider>
    );
}
