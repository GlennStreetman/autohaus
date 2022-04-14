import db from "../../lib/dbPool";

export default async function handler(req, res) {
    console.log("post submitResume", req.body);
    // try {
    //     const getHolidays = `SELECT * FROM holidays`;

    //     const holidays = await db.query(getHolidays, (err, rows) => {
    //         if (err) {
    //             console.log("problem saving requestQuote", getHolidays, err);
    //             res.status(200).json({ holidays: {} });
    //         } else {
    //             res.status(200).json({ holidays: rows.rows });
    //         }
    //     });
    //     return holidays;
    // } catch (err) {
    //     console.log("problem with get /holidays", err);
    //     res.status(200).json({ holidays: {} });
    // }
}
