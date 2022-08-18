export default async function handler(req, res) {
    // Check for secret to confirm this is a valid request
    if (req.query.secret !== process.env.NEXT_REVALIDATE) {
        return res.status(401).json({ message: "Invalid token" });
    }
    try {
        // console.log("Revalidating Path: ", req.query.path);
        await res.unstable_revalidate(req.query.path);
        // console.log("Revalidate complete", req.query.path);
        return res.json({ revalidated: true });
    } catch (err) {
        console.log("revalidate error", err);
        // If there was an error, Next.js will continue
        // to show the last successfully generated page
        return res.status(500).send(`Error revalidating ${req.query.path}`);
    }
}
