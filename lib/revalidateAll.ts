import prisma from "./prismaPool";
const staticRoutes = ["/", "/calendar", "/careers", "/manager", "/quote", "/resumeSubmitted", "/team", "/thankyou"];

const dynamicRoutes = {
    service: () => {
        return prisma.services.findMany({});
    },
};

const revalidateAll = async function () {
    const serviceRoutes: string[] = await (await dynamicRoutes.service()).map((el) => `/services/${el.name.replace(/[^a-z0-9+]+/gi, "")}`);
    const allRoutes = staticRoutes.concat(serviceRoutes);
    for (const el of allRoutes) {
        await fetch(`${process.env.NEXTAUTH_URL}/api/revalidate?secret=${process.env.NEXT_REVALIDATE}&path=${el}`); //home page carousel
    }
};

export default revalidateAll;
