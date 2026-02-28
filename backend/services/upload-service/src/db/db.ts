import path from "path";
import { Pool } from "pg";
import { migrate } from "postgres-migrations";

export const pool = new Pool({
    host: process.env.DB_HOST,
    port: Number(process.env.RDS_DB_PORT),
    user: process.env.RDS_DB_USER,
    password: process.env.RDS_DB_PASSWORD?.toString(),
    database: process.env.DB_NAME,
})

export const runMigrate = async () => {
    const client = await pool.connect()
    try {
        await migrate({ client }, path.resolve(__dirname, "migrations/sql"))
    } catch (e) {
        console.log("Error running migrations")
    } finally {
        client.release()
    }
}