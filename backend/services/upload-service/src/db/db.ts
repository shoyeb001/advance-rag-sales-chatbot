import { Pool } from "pg";

export const pool = new Pool({
    host: process.env.DB_HOST,
    port: Number(process.env.RDS_DB_PORT),
    user: process.env.RDS_DB_USER,
    password: process.env.RDS_DB_PASSWORD,
    database: process.env.DB_NAME,
})