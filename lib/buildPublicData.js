import fs from "fs";
import prisma from "./prismaPool.js";

export const buildPublicData = async () => {
    const findSiteData = await prisma.sitesetup.findMany({});
    console.log("findSiteData", findSiteData);
    const formData = findSiteData.reduce((prev, curr) => {
        prev[curr.name] = curr.value;
        return prev;
    }, {});
    const dataString = JSON.stringify(formData);
    fs.writeFileSync("./registers/public.json", dataString, "utf8");
};

buildPublicData();
