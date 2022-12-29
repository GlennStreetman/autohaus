import {regeneratePage} from '../../lib/revalidateLambda'

interface req {
    body: reqPayload
    headers: any
}

interface reqPayload { 
    event: string, //entry.update
    createdAt: string,
    model: string, //faq, holiday, service, team, banner-text, contact, google-map, homepage-intro, our-story, page-title, service-home, banner-image, service-home, site-link, site-text
    entry: {[key:string]: any}, //based upon model
    headers: any
}

const staticRoutes = ["/", "/about",  "/calendar", "/careers",  "/contact", "/resumeSubmitted", "/service", "/thankyou" ];

const test = async (req:req, res) => {
        try {

            if (req.headers.secret === process.env.NEXT_REVALIDATE) {
                
                const update = req?.body?.model ? req.body.model.replaceAll('-', '') : ''
                const serviceName = update === 'service' ? req.body.entry.name : 'false'
                console.log('revalidate request received: ', update)

                const revalidateLookup = {
                    faq: staticRoutes, 
                    holiday: ["/calendar"], 
                    holliday: ["/calendar"], 
                    service: function(){
                        // console.log('revalidating Now', serviceName)
                        return [`/service/${serviceName.replaceAll(' ', '_')}`, '/service']
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

                const revalidateList = revalidateLookup?.[update] || []
                for(const el of revalidateList){
                    console.log('revaliding:', el)
                    await regeneratePage(`${el}`)
                    // await res.revalidate(`${el}`);
                    console.log( el, 'revalid complete')
                }
                //here
                res.status(200).json({update: update})
            } else {
                console.log('revalidateHook: Missing Secret')
                res.status(400).json({ msg: "Error" });
            }
        } catch (err) {
            console.log("/api/revalidateHook Error:", req.body ,err);
            res.status(400).json({ msg: "Error" });
        }

};

export default test;

// const updateURL = new URL( `${process.env.domain}/api/revalidate?secret=${process.env.NEXT_REVALIDATE}&update=${update}&name=${serviceName}`)
// console.log('submitting revalidate request:', `${process.env.domain}/api/revalidate?secret=${process.env.NEXT_REVALIDATE}&update=${update}&name=${serviceName}`)
// fetch(updateURL)