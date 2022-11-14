
interface req {
    body: reqPayload
}

interface reqPayload { 
    event: string, //entry.update
    createdAt: string,
    model: string, //faq, holiday, service, team, banner-text, contact, google-map, homepage-intro, our-story, page-title, service-home, banner-image, service-home, site-link, site-text
    entry: {},
}

const test = async (req:req, res) => {
    console.log('revalidate request received')
    try {
        const update = req?.body?.model ? req.body.model.replaceAll('-', '') : []
        fetch(`${process.env.NEXTAUTH_URL}/api/revalidate?secret=${process.env.NEXT_REVALIDATE}&update=${update}`)
        res.status(200).json({update: update})
    } catch (err) {
        console.log("/api/revalidateHook Error test Error:", req.body ,err);
        res.status(400).json({ msg: "Error" });
    }
};

export default test;
