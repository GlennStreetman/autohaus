import prisma from "./prismaPool";
const staticRoutes = ["/", "/calendar", "/careers", "/manager", "/quote", "/resumeSubmitted", "/team", "/thankyou"];

const dynamicRoutes = {
    service: () => {
        return prisma.services.findMany({});
    },
};

const revalidateAll = async function () {
    const secviceRoutes: string[] = await (await dynamicRoutes.service()).map((el) => `/services/${el.name.replaceAll(" ", "")}`);
    const allRoutes = staticRoutes.concat(secviceRoutes);
    for (const el of allRoutes) {
        await fetch(`${process.env.NEXTAUTH_URL}/api/revalidate?secret=${process.env.NEXT_REVALIDATE}&path=${el}`); //home page carousel
    }
};

export default revalidateAll;
