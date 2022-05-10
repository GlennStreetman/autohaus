import React from "react";

export const PublicData = React.createContext();

function publicData({ children }) {
    let data = require("../registers/public.json");

    return <PublicData.Provider value={data}>{children}</PublicData.Provider>;
}
export default publicData;
