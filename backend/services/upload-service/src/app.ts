import express, { Response, Request } from "express";
import dotenv from "dotenv";
dotenv.config()
import routes from "./routes/routes";
import { runMigrate } from "./db/db";
import { connectQueue } from "./queue/queue";
import { startEmbeddingConsumer } from "./services/embedding-consumer.service";

const app = express()
app.use(express.json())
app.get("/health", (req: Request, res: Response) => {
    res.status(200).json({ status: "ok" })
})

app.use("/api/v1", routes);

app.listen(8001, async () => {
    try {
        console.log(`DEBUG: Server is running on port 8001`);
        await connectQueue();
        console.log("DEBUG:Connected to RabbitMQ")
        await runMigrate()
        console.log("DEBUG: Migrations completed")
        await startEmbeddingConsumer();
    } catch (error) {
        console.error("ERROR: Error starting the server:", error);
        process.exit(1);
    }

})