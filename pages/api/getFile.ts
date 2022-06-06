import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { getFileStream } from "./../../lib/s3";

const getFile = async (req, res) => {
    const session = await getSession({ req });
    // @ts-ignore
    if (session && session.user.role === "admin") {
        try {
            const key = req.query.fileKey;
            const readStream = getFileStream(key);
            res.writeHead(200, {
                "Content-Type": "application/CSV",
            });
            // readStream.pipe(res);
            await new Promise(function (resolve) {
                readStream.pipe(res);
                readStream.on("end", resolve);
            });
        } catch (err) {
            console.log("/getFile", err);
        }
    } else {
        console.log("not signed in");
        res.status(401);
    }
    res.end();
};

export default getFile;
