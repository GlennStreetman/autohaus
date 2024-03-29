
const staticRoutes = ["/", "/about",  "/calendar", "/careers", "/manager", "/contact", "/resumeSubmitted", "service", "/thankyou" ];

// const dynamicRoutes = {
//     service: () => {
//         return prisma.services.findMany({});
//     },
// };

const revalidateAll = async function () {
    // const serviceRoutes: string[] = await (await dynamicRoutes.service()).map((el) => `/services/${el.name.replace(/[^a-z0-9+]+/gi, "")}`);
    // const allRoutes = staticRoutes.concat(serviceRoutes);
    // console.log("allRoutes", allRoutes);
    for (const el of staticRoutes) { //allRoutes
        console.log("revalidating:", el);
        await fetch(`${process.env.domain}/api/revalidate?secret=${process.env.NEXT_REVALIDATE}&path=${el}`); //home page carousel
    }
};

export default revalidateAll;
