import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { getFileStream } from "./../../lib/s3";
import fs from "fs";

export default async (req, res) => {
    const session = await getSession({ req });
    // @ts-ignore
    if (session && session.user.roll === "admin") {
        console.log("query", req.query);
        const key = req.query.fileKey;
        // const file = getFileStream(key);
        // console.log("file", file);
        const readStream = getFileStream(key);
        // const outputStream = fs.createWriteStream(`./public/uploads/${key}`);
        // readStream.pipe(outputStream);
        res.writeHead(200, {
            "Content-Type": "application/CSV",
        });
        // readStream.pipe(res);
        await new Promise(function (resolve) {
            readStream.pipe(res);
            readStream.on("end", resolve);
        });
    } else {
        console.log("not signed in");
        res.status(401);
    }
    res.end();
};
