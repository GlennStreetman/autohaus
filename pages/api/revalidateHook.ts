
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

const test = async (req:req, res) => {
        try {
            if (req.headers.secret === process.env.NEXT_REVALIDATE) {
                const update = req?.body?.model ? req.body.model.replaceAll('-', '') : []
                const serviceName = update === 'service' ? req.body.entry.name : false
                console.log('revalidate request received: ', update)
                fetch(`${process.env.NEXTAUTH_URL}/api/revalidate?secret=${process.env.NEXT_REVALIDATE}&update=${update}&name=${serviceName}`)
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
