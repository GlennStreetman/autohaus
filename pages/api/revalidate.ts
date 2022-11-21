const staticRoutes = ["/", "/about",  "/calendar", "/careers",  "/contact", "/resumeSubmitted", "/service", "/thankyou" ];

export default async function handler(req, res) {

    const revalidateLookup = {
        faq: staticRoutes, 
        holiday: ["/calendar"], 
        holliday: ["/calendar"], 
        service: function(){
            console.log('revalidating Now', req.query.name)
            return [`/service/${req.query.name.replaceAll(' ', '_')}`, '/service']
        }(), 
        team: ['/about'], 
        bannertext: staticRoutes, 
        contact: staticRoutes, 
        googleMap: [ "/about", "/contact"], 
        homepageintro: ['/'], 
        ourstory: ['/', '/about'], 
        pagetitle: ['/about'], 
        servicehome: ["/service"], 
        bannerimage: staticRoutes, 
        sitelink: staticRoutes, 
        sitetext: staticRoutes,
    }

    // Check for secret to confirm this is a valid request
    if (req.query.secret !== process.env.NEXT_REVALIDATE) {
        return res.status(401).json({ message: "Invalid token" });
    } else {
        try {

            const revalidateList = revalidateLookup?.[req?.query?.update] || []
            console.log('revalidating:', revalidateList)
            for(const el of revalidateList){
                console.log('revaliding:', el)
                await res.revalidate(`${el}`);
                console.log( el, 'revalid complete')
            }
            return res.json({ revalidated: true });
        } catch (err) {
            console.log("revalidate error", err);
            // If there was an error, Next.js will continue
            // to show the last successfully generated page
            return res.status(500).send(`Error revalidating ${req.query.path}`);
        }
    }
}
