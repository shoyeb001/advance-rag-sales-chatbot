import path from "path";
import { Pool } from "pg";
import { migrate } from "postgres-migrations";

export const pool = new Pool({
    host: process.env.VECTOR_DB_HOST,
    port: Number(process.env.VECTOR_DB_PORT),
    user: process.env.VECTOR_DB_USER,
    password: process.env.VECTOR_DB_PASSWORD,
    database: process.env.VECTOR_DB_NAME,
})

export const runMigrate = async () => {
    const client = await pool.connect()
    try {
        await migrate({ client }, path.resolve(process.cwd(), "src/db/migrations"));
    } catch (e) {
        console.error("Error running migrations:", e)
        throw e
    } finally {
        client.release()
    }
}