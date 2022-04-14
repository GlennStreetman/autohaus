// db.js
import { Pool } from "pg";

let conn;

if (!conn) {
    conn = new Pool({
        user: process.env.pguser,
        host: process.env.pghost,
        database: process.env.pgdatabase,
        password: process.env.pgpassword,
        port: process.env.pgporInternal,
        max: 20,
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis: 2000,
    });
}

export default conn;
